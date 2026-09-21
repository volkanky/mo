(function () {
    'use strict';

    var STYLE_ID = 'moStockAmountStyles';
    var STOCK_ID = 'moStockAmount';
    var lastVariantId = null;
    var lastStockAmount = null;
    var refreshTimer = null;

    function injectStyles() {
        if (document.getElementById(STYLE_ID)) return;

        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            #${STOCK_ID} {
                --mo-stock-deep: #03235e;
                --mo-stock-ink: #0c4853;
                --mo-stock-accent: #4fa0c9;
                box-sizing: border-box;
                position: relative;
                display: flex;
                align-items: center;
                gap: 12px;
                width: 100%;
                margin: 13px 0 10px;
                padding: 13px 15px;
                overflow: hidden;
                color: var(--mo-stock-deep);
                border: 1px solid rgba(79, 160, 201, .32);
                border-radius: 13px;
                background: linear-gradient(105deg, #eef8fa 0%, #f8fcfd 68%, #fff 100%);
                box-shadow: 0 8px 22px rgba(3, 35, 94, .07);
                font-family: "Manrope", "DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            }

            #${STOCK_ID}::after {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                width: 4px;
                height: 100%;
                background: var(--mo-stock-accent);
            }

            #${STOCK_ID} .mo-stock-mark {
                position: relative;
                flex: 0 0 34px;
                width: 34px;
                height: 34px;
                border: 1px solid rgba(12, 72, 83, .16);
                border-radius: 10px;
                background: rgba(255, 255, 255, .9);
            }

            #${STOCK_ID} .mo-stock-mark::before,
            #${STOCK_ID} .mo-stock-mark::after {
                content: "";
                position: absolute;
                left: 9px;
                right: 9px;
                height: 3px;
                border-radius: 3px;
                background: var(--mo-stock-ink);
                box-shadow: 0 6px 0 var(--mo-stock-ink), 0 12px 0 var(--mo-stock-ink);
            }

            #${STOCK_ID} .mo-stock-mark::before { top: 8px; }
            #${STOCK_ID} .mo-stock-mark::after {
                top: 8px;
                left: 9px;
                right: auto;
                width: 3px;
                box-shadow: 6px 0 0 var(--mo-stock-ink), 12px 0 0 var(--mo-stock-ink),
                            0 6px 0 var(--mo-stock-ink), 6px 6px 0 var(--mo-stock-ink), 12px 6px 0 var(--mo-stock-ink),
                            0 12px 0 var(--mo-stock-ink), 6px 12px 0 var(--mo-stock-ink), 12px 12px 0 var(--mo-stock-ink);
                opacity: .22;
            }

            #${STOCK_ID} .mo-stock-copy {
                display: flex;
                flex: 1 1 auto;
                flex-direction: column;
                min-width: 0;
            }

            #${STOCK_ID} .mo-stock-label {
                margin-bottom: 3px;
                color: rgba(3, 35, 94, .62);
                font-size: 10px;
                font-weight: 800;
                line-height: 1.2;
                letter-spacing: .09em;
                text-transform: uppercase;
            }

            #${STOCK_ID} .mo-stock-value {
                color: var(--mo-stock-deep);
                font-size: 16px;
                font-weight: 900;
                line-height: 1.25;
            }

            #${STOCK_ID} .mo-stock-note {
                flex: 0 0 auto;
                color: var(--mo-stock-ink);
                font-size: 12px;
                font-weight: 700;
                white-space: nowrap;
            }

            #${STOCK_ID}.mo-stock-low {
                border-color: rgba(202, 133, 20, .3);
                background: linear-gradient(105deg, #fff8e8 0%, #fffdf7 68%, #fff 100%);
            }

            #${STOCK_ID}.mo-stock-low::after { background: #ca8514; }
            #${STOCK_ID}.mo-stock-low .mo-stock-mark::before { background: #9a6410; box-shadow: 0 6px 0 #9a6410, 0 12px 0 #9a6410; }
            #${STOCK_ID}.mo-stock-low .mo-stock-note { color: #85550b; }

            #${STOCK_ID}.mo-stock-out {
                border-color: rgba(163, 43, 43, .25);
                background: linear-gradient(105deg, #fff2f2 0%, #fffafa 70%, #fff 100%);
            }

            #${STOCK_ID}.mo-stock-out::after { background: #a32b2b; }
            #${STOCK_ID}.mo-stock-out .mo-stock-value,
            #${STOCK_ID}.mo-stock-out .mo-stock-note { color: #872424; }

            @media (max-width: 575px) {
                #${STOCK_ID} {
                    gap: 10px;
                    margin: 11px 0 8px;
                    padding: 12px;
                }

                #${STOCK_ID} .mo-stock-value { font-size: 15px; }
                #${STOCK_ID} .mo-stock-note {
                    max-width: 96px;
                    font-size: 11px;
                    line-height: 1.3;
                    text-align: right;
                    white-space: normal;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function numberValue(value) {
        if (typeof value === 'number') return Number.isFinite(value) ? value : null;
        if (typeof value !== 'string' || !value.trim()) return null;

        var normalized = value.trim().replace(',', '.');
        var parsed = Number(normalized);
        return Number.isFinite(parsed) ? parsed : null;
    }

    function selectedVariantId() {
        var input = document.getElementById('hddnUrunID');
        return input ? String(input.value || '').trim() : '';
    }

    function objectId(item) {
        if (!item || typeof item !== 'object') return '';
        return String(item.id || item.urunId || item.productId || item.varyantId || item.variantId || '').trim();
    }

    function findStockIn(value, wantedId, seen, depth) {
        if (!value || typeof value !== 'object' || depth > 7 || seen.indexOf(value) !== -1) return null;
        seen.push(value);

        var stock = numberValue(value.stokAdedi);
        if (stock !== null && (!wantedId || objectId(value) === wantedId)) return stock;

        if (Array.isArray(value)) {
            for (var i = 0; i < value.length; i += 1) {
                var arrayResult = findStockIn(value[i], wantedId, seen, depth + 1);
                if (arrayResult !== null) return arrayResult;
            }
            return null;
        }

        var likelyKeys = ['product', 'products', 'variants', 'varyants', 'productVariants', 'productVariantData', 'variant', 'selectedProduct'];
        for (var j = 0; j < likelyKeys.length; j += 1) {
            if (!Object.prototype.hasOwnProperty.call(value, likelyKeys[j])) continue;
            var objectResult = findStockIn(value[likelyKeys[j]], wantedId, seen, depth + 1);
            if (objectResult !== null) return objectResult;
        }

        return null;
    }

    function currentStock() {
        var model = window.productDetailModel;
        if (!model || typeof model !== 'object') return null;

        var wantedId = selectedVariantId();
        var exact = findStockIn(model, wantedId, [], 0);
        if (exact !== null) return exact;

        return numberValue(model.product && model.product.stokAdedi);
    }

    function formatAmount(amount) {
        try {
            return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(amount);
        } catch (error) {
            return String(amount).replace('.', ',');
        }
    }

    function placementTarget() {
        return document.getElementById('pnlFiyatlar') ||
            document.getElementById('divFiyatAlanlari') ||
            document.querySelector('.PriceList');
    }

    function createStockBox() {
        var box = document.createElement('div');
        box.id = STOCK_ID;
        box.setAttribute('role', 'status');
        box.setAttribute('aria-live', 'polite');
        box.innerHTML = [
            '<span class="mo-stock-mark" aria-hidden="true"></span>',
            '<span class="mo-stock-copy">',
                '<span class="mo-stock-label">Güncel stok durumu</span>',
                '<strong class="mo-stock-value"></strong>',
            '</span>',
            '<span class="mo-stock-note"></span>'
        ].join('');
        return box;
    }

    function mountOrMove(box) {
        var target = placementTarget();
        if (!target || !target.parentNode) return false;

        if (target.nextElementSibling !== box) {
            target.parentNode.insertBefore(box, target.nextSibling);
        }
        return true;
    }

    function render() {
        injectStyles();

        var amount = currentStock();
        var existing = document.getElementById(STOCK_ID);

        if (amount === null) {
            if (existing) existing.remove();
            lastStockAmount = null;
            return;
        }

        var box = existing || createStockBox();
        if (!mountOrMove(box)) return;

        var variantId = selectedVariantId();
        if (lastVariantId === variantId && lastStockAmount === amount && existing) return;

        var value = box.querySelector('.mo-stock-value');
        var note = box.querySelector('.mo-stock-note');
        var safeAmount = Math.max(0, amount);

        box.classList.toggle('mo-stock-low', safeAmount > 0 && safeAmount <= 10);
        box.classList.toggle('mo-stock-out', safeAmount <= 0);

        if (safeAmount <= 0) {
            value.textContent = 'Stokta yok';
            note.textContent = 'Gelince haber ver';
        } else {
            value.textContent = formatAmount(safeAmount) + ' adet stokta';
            note.textContent = safeAmount <= 10 ? 'Sınırlı stok' : 'Siparişe hazır';
        }

        lastVariantId = variantId;
        lastStockAmount = amount;
    }

    function scheduleRender() {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(render, 80);
    }

    function init() {
        render();

        document.addEventListener('change', scheduleRender, true);
        document.addEventListener('click', function () {
            scheduleRender();
            window.setTimeout(render, 350);
        }, true);

        new MutationObserver(scheduleRender).observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['value', 'class', 'style']
        });

        window.setInterval(function () {
            if (selectedVariantId() !== lastVariantId || !document.getElementById(STOCK_ID)) render();
        }, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
