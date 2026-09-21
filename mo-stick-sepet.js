(function () {
    'use strict';

    var STYLE_ID = 'moStickyCartStyle';
    var BAR_ID = 'moStickyCart';
    var READY_CLASS = 'mo-sticky-cart-ready';
    var VISIBLE_CLASS = 'mo-sc-visible';
    var SHOW_AFTER_SCROLL = 90;

    var state = {
        bar: null,
        qtyText: null,
        titleText: null,
        priceText: null,
        image: null,
        visibilityScheduled: false,
        sourceClickBound: false,
        lastAddClickAt: 0,
        ignoreSyntheticClickUntil: 0
    };

    function qs(selector, root) {
        return (root || document).querySelector(selector);
    }

    function qsa(selector, root) {
        return Array.prototype.slice.call((root || document).querySelectorAll(selector));
    }

    function textFrom(element) {
        return element ? String(element.textContent || '').replace(/\s+/g, ' ').trim() : '';
    }

    function isVisible(element) {
        if (!element) return false;
        var style = window.getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden' && element.offsetParent !== null;
    }

    function firstVisible(selectors) {
        for (var i = 0; i < selectors.length; i += 1) {
            var nodes = qsa(selectors[i]);
            for (var j = 0; j < nodes.length; j += 1) {
                if (isVisible(nodes[j]) && textFrom(nodes[j])) return nodes[j];
            }
        }
        return null;
    }

    function isUsableAddButton(element) {
        if (!element) return false;
        if (element.closest && element.closest('#' + BAR_ID)) return false;
        if (element.disabled || element.getAttribute('aria-disabled') === 'true') return false;
        if (element.classList && element.classList.contains('btnAddBasketOnQuickView')) return false;
        if (element.id === 'kendinTasarlaClickButtonId') return false;
        return true;
    }

    function firstUsableElement(selectors) {
        var fallback = null;

        for (var i = 0; i < selectors.length; i += 1) {
            var nodes = qsa(selectors[i]);
            for (var j = 0; j < nodes.length; j += 1) {
                var node = nodes[j];
                if (!isUsableAddButton(node)) continue;
                if (!fallback) fallback = node;
                if (isVisible(node)) return node;
            }
        }

        return fallback;
    }

    function getRealAddButton() {
        return firstUsableElement([
            '#divSatinAl .BasketBtn input.Addtobasket.btnAddBasketOnDetail',
            '#divSatinAl .BasketBtn .Addtobasket.btnAddBasketOnDetail',
            '#divSatinAl .Addtobasket.btnAddBasketOnDetail',
            '#divSatinAl .Addtobasket',
            '.buybutton .BasketBtn input.Addtobasket.btnAddBasketOnDetail',
            '.buybutton .BasketBtn .Addtobasket.btnAddBasketOnDetail',
            '.buybutton .Addtobasket.btnAddBasketOnDetail',
            '.basketBtn .Addtobasket.btnAddBasketOnDetail',
            '.basketBtn .Addtobasket',
            '.BasketBtn .Addtobasket',
            '.btnAddBasketOnDetail',
            '[element-addToCart="1"]'
        ]);
    }

    function getRealQtyField() {
        return qs('#txtbxurunSiparisAdedi') ||
            qs('[name="txtbxurunSiparisAdedi"]') ||
            qs('#ddlUrunSiparisAdedi');
    }

    function getProductModel() {
        return typeof window.productDetailModel === 'object' && window.productDetailModel ? window.productDetailModel : null;
    }

    function getProductCardId() {
        var model = getProductModel();
        if (!model) return 0;
        return parseInt(model.productId || (model.product && model.product.urunKartiId) || 0, 10) || 0;
    }

    function getSelectedVariantId() {
        var hidden = qs('#hddnUrunID');
        var hiddenValue = hidden ? parseInt(hidden.value, 10) : 0;
        var model = getProductModel();
        var modelProduct = model && model.product ? model.product : null;

        return hiddenValue ||
            parseInt(modelProduct && modelProduct.id, 10) ||
            parseInt(model && model.mainVariantId, 10) ||
            0;
    }

    function getScrollTop() {
        return window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
    }

    function getTitleText() {
        return textFrom(qs('.ProductName h1 span')) ||
            textFrom(qs('.ProductName h1')) ||
            textFrom(qs('.ProductName')) ||
            'Ürün';
    }

    function getPriceText() {
        var priceElement = firstVisible([
            '#fiyat2 .spanFiyat',
            '#indirimliFiyat .spanFiyat',
            '#spnSepetFiyati .spanFiyat',
            '#divFiyatAlanlari .spanFiyat',
            '#divFiyatAlanlari .urunDetayFiyat',
            '#divFiyatAlanlari .IndirimliFiyatContent',
            '#divFiyatAlanlari .discountPrice',
            '#divFiyatAlanlari .regularPrice',
            '#pnlFiyatlar [class*="Fiyat"]',
            '#divFiyatAlanlari'
        ]);

        return textFrom(priceElement) || 'Fiyat';
    }

    function getImageSrc() {
        var image = qs('#imgUrunResim') ||
            qs('.leftImage img') ||
            qs('.Images img') ||
            qs('.ProductDetailMain img') ||
            qs('.productDetail img');

        return image ? (image.currentSrc || image.src || '') : '';
    }

    function getQtyValue() {
        var field = getRealQtyField();
        var value = field ? parseFloat(String(field.value || '1').replace(',', '.')) : 1;
        return value > 0 ? value : 1;
    }

    function setQtyValue(value) {
        var next = Math.max(1, value);
        var field = getRealQtyField();

        if (state.qtyText) state.qtyText.textContent = String(next);

        if (!field) return;
        field.value = String(next);
        try {
            field.dispatchEvent(new Event('input', { bubbles: true }));
            field.dispatchEvent(new Event('change', { bubbles: true }));
        } catch (e) {}
    }

    function syncRealQtyToBar() {
        var field = getRealQtyField();
        if (!field) return;

        var desired = String(getQtyValue());
        if (field.value === desired) return;

        field.value = desired;
        try {
            field.dispatchEvent(new Event('input', { bubbles: true }));
            field.dispatchEvent(new Event('change', { bubbles: true }));
        } catch (e) {}
    }

    function fireClick(element) {
        if (!element) return false;

        var fired = false;

        try {
            element.click();
            fired = true;
        } catch (e) {}

        try {
            ['pointerdown', 'mousedown', 'mouseup', 'click'].forEach(function (type) {
                element.dispatchEvent(new MouseEvent(type, {
                    bubbles: true,
                    cancelable: true,
                    view: window
                }));
            });
            fired = true;
        } catch (e) {}

        var jq = window.jQuery || window.$;
        if (jq && typeof jq === 'function') {
            try {
                jq(element).trigger('click');
                fired = true;
            } catch (e) {}
        }

        return fired;
    }

    function addWithTicimaxCartFallback() {
        var model = getProductModel();
        var variantId = getSelectedVariantId();
        var productId = getProductCardId();
        var qty = getQtyValue();

        if (!model || !variantId || !qty) return false;

        if (typeof window.sepeteEkle === 'function') {
            try {
                window.sepeteEkle(variantId, qty, 0, 0, 0, '', true, undefined, undefined, undefined, undefined, productId);
                return true;
            } catch (e) {}
        }

        if (
            window.cart &&
            window.cart.add &&
            typeof window.cart.add.createModel === 'function' &&
            typeof window.cart.add.execute === 'function'
        ) {
            try {
                window.cart.add.model = window.cart.add.createModel();
                window.cart.add.model.productId = productId;
                window.cart.add.model.variantId = variantId;
                window.cart.add.model.piece = qty;
                window.cart.add.model.assortmentProductId = model.productIsAsorti ? parseInt(model.assortmentGroupId, 10) || 0 : 0;
                window.cart.add.model.productUrl = window.location.pathname || '';
                window.cart.add.execute();
                return true;
            } catch (e) {}
        }

        return false;
    }

    function handleAdd(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
            if (event.stopImmediatePropagation) event.stopImmediatePropagation();
        }

        var now = Date.now();
        if (now - state.lastAddClickAt < 450) return;
        state.lastAddClickAt = now;

        syncRealQtyToBar();

        var realButton = getRealAddButton();
        if (realButton && fireClick(realButton)) return;

        addWithTicimaxCartFallback();
    }

    function syncContent() {
        if (!state.bar) return;

        state.titleText.textContent = getTitleText();
        state.priceText.textContent = getPriceText();
        state.qtyText.textContent = String(getQtyValue());

        var imageSrc = getImageSrc();
        if (imageSrc) {
            state.image.src = imageSrc;
            state.image.style.display = '';
        } else {
            state.image.style.display = 'none';
        }
    }

    function injectStyles() {
        if (qs('#' + STYLE_ID)) return;

        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = [
            'body.' + READY_CLASS + ' { padding-bottom: 106px !important; }',
            '#' + BAR_ID + ', #' + BAR_ID + ' * { box-sizing: border-box; }',
            '#' + BAR_ID + ' {',
            '  position: fixed;',
            '  left: 12px;',
            '  right: 12px;',
            '  bottom: calc(12px + env(safe-area-inset-bottom));',
            '  z-index: 2147483000;',
            '  display: grid;',
            '  grid-template-columns: minmax(0, 1fr) auto;',
            '  gap: 12px;',
            '  align-items: center;',
            '  width: auto;',
            '  max-width: 1120px;',
            '  margin: 0 auto;',
            '  padding: 11px;',
            '  color: #03235e;',
            '  border: 1px solid rgba(3,35,94,.12);',
            '  border-radius: 20px;',
            '  background: rgba(255,255,255,.94);',
            '  box-shadow: 0 20px 58px rgba(3,35,94,.18);',
            '  backdrop-filter: saturate(150%) blur(16px);',
            '  transform: translateY(140%);',
            '  opacity: 0;',
            '  pointer-events: none;',
            '  transition: transform .24s ease, opacity .24s ease;',
            '}',
            '#' + BAR_ID + '::before {',
            '  content: "";',
            '  position: absolute;',
            '  inset: 0;',
            '  z-index: -1;',
            '  border-radius: inherit;',
            '  background: linear-gradient(135deg, rgba(79,160,201,.12), rgba(12,72,83,.08), rgba(255,255,255,.35));',
            '}',
            '#' + BAR_ID + '.' + VISIBLE_CLASS + ' { transform: translateY(0); opacity: 1; pointer-events: auto; }',
            '#' + BAR_ID + ' .mo-sc-info {',
            '  min-width: 0;',
            '  display: grid;',
            '  grid-template-columns: 48px minmax(0, 1fr);',
            '  gap: 10px;',
            '  align-items: center;',
            '}',
            '#' + BAR_ID + ' .mo-sc-img {',
            '  width: 48px;',
            '  height: 58px;',
            '  display: block;',
            '  object-fit: cover;',
            '  border: 1px solid rgba(3,35,94,.1);',
            '  border-radius: 13px;',
            '  background: #eef8fb;',
            '}',
            '#' + BAR_ID + ' .mo-sc-copy { min-width: 0; }',
            '#' + BAR_ID + ' .mo-sc-title {',
            '  margin: 0 0 5px;',
            '  color: #0c4853;',
            '  font: 750 12px Manrope, "DM Sans", sans-serif;',
            '  line-height: 1.24;',
            '  white-space: nowrap;',
            '  overflow: hidden;',
            '  text-overflow: ellipsis;',
            '}',
            '#' + BAR_ID + ' .mo-sc-price {',
            '  color: #111;',
            '  font: 900 16px Manrope, "DM Sans", sans-serif;',
            '  line-height: 1;',
            '  white-space: nowrap;',
            '  overflow: hidden;',
            '  text-overflow: ellipsis;',
            '}',
            '#' + BAR_ID + ' .mo-sc-actions {',
            '  display: grid;',
            '  grid-template-columns: 94px minmax(148px, 34vw);',
            '  gap: 9px;',
            '  align-items: center;',
            '}',
            '#' + BAR_ID + ' .mo-sc-qty {',
            '  height: 44px;',
            '  display: grid;',
            '  grid-template-columns: 30px 1fr 30px;',
            '  align-items: center;',
            '  overflow: hidden;',
            '  border: 1px solid rgba(3,35,94,.14);',
            '  border-radius: 14px;',
            '  background: #fff;',
            '}',
            '#' + BAR_ID + ' .mo-sc-qty button {',
            '  width: 30px;',
            '  height: 42px;',
            '  margin: 0;',
            '  padding: 0;',
            '  color: #03235e;',
            '  font-size: 20px;',
            '  font-weight: 850;',
            '  line-height: 1;',
            '  border: 0;',
            '  background: #fff;',
            '  cursor: pointer;',
            '  pointer-events: auto;',
            '  touch-action: manipulation;',
            '}',
            '#' + BAR_ID + ' .mo-sc-qty span {',
            '  display: block;',
            '  color: #03235e;',
            '  font: 850 14px Manrope, "DM Sans", sans-serif;',
            '  text-align: center;',
            '}',
            '#' + BAR_ID + ' .mo-sc-add {',
            '  position: relative !important;',
            '  width: 100% !important;',
            '  height: 44px !important;',
            '  min-height: 44px !important;',
            '  margin: 0 !important;',
            '  padding: 0 16px 0 42px !important;',
            '  color: #fff !important;',
            '  font: 900 12px Manrope, "DM Sans", sans-serif !important;',
            '  line-height: 44px !important;',
            '  letter-spacing: .035em;',
            '  text-align: center;',
            '  text-transform: uppercase;',
            '  white-space: nowrap;',
            '  border: 0 !important;',
            '  border-radius: 14px !important;',
            '  background-color: #0c4853 !important;',
            '  background-image: linear-gradient(135deg, #0c4853 0%, #03235e 100%) !important;',
            '  box-shadow: 0 16px 34px rgba(12,72,83,.22);',
            '  cursor: pointer !important;',
            '  pointer-events: auto !important;',
            '  touch-action: manipulation;',
            '  -webkit-tap-highlight-color: transparent;',
            '  transition: transform .18s ease, filter .18s ease;',
            '}',
            '#' + BAR_ID + ' .mo-sc-add::before {',
            '  content: "";',
            '  position: absolute;',
            '  left: 17px;',
            '  top: 50%;',
            '  width: 18px;',
            '  height: 18px;',
            '  transform: translateY(-50%);',
            '  background: url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"%23ffffff\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><circle cx=\\"9\\" cy=\\"21\\" r=\\"1\\"/><circle cx=\\"20\\" cy=\\"21\\" r=\\"1\\"/><path d=\\"M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6\\"/></svg>") center / contain no-repeat;',
            '}',
            '#' + BAR_ID + ' .mo-sc-add:hover { filter: brightness(1.05); transform: translateY(-1px); }',
            '#' + BAR_ID + ' .mo-sc-add:active { transform: translateY(1px); }',
            '@media (max-width: 768px) {',
            '  body.' + READY_CLASS + ' { padding-bottom: 126px !important; }',
            '  #' + BAR_ID + ' {',
            '    left: 10px;',
            '    right: 10px;',
            '    bottom: calc(10px + env(safe-area-inset-bottom));',
            '    grid-template-columns: 1fr;',
            '    gap: 9px;',
            '    padding: 10px;',
            '    border-radius: 18px;',
            '  }',
            '  #' + BAR_ID + ' .mo-sc-info { grid-template-columns: 44px minmax(0, 1fr); }',
            '  #' + BAR_ID + ' .mo-sc-img { width: 44px; height: 52px; border-radius: 12px; }',
            '  #' + BAR_ID + ' .mo-sc-title { font-size: 11px; }',
            '  #' + BAR_ID + ' .mo-sc-price { font-size: 15px; }',
            '  #' + BAR_ID + ' .mo-sc-actions { grid-template-columns: 88px minmax(0, 1fr); }',
            '}',
            '@media (prefers-reduced-motion: reduce) {',
            '  #' + BAR_ID + ', #' + BAR_ID + ' * { transition-duration: .01ms !important; }',
            '}'
        ].join('\n');

        document.head.appendChild(style);
    }

    function createBar() {
        if (state.bar) return;

        var existing = qs('#' + BAR_ID);
        if (existing) {
            state.bar = existing;
        } else {
            state.bar = document.createElement('div');
            state.bar.id = BAR_ID;
            state.bar.setAttribute('role', 'region');
            state.bar.setAttribute('aria-label', 'Motif İstanbul sepete ekleme alanı');
            state.bar.innerHTML = [
                '<div class="mo-sc-info">',
                '  <img class="mo-sc-img" alt="">',
                '  <div class="mo-sc-copy">',
                '    <p class="mo-sc-title"></p>',
                '    <div class="mo-sc-price"></div>',
                '  </div>',
                '</div>',
                '<div class="mo-sc-actions">',
                '  <div class="mo-sc-qty" aria-label="Adet">',
                '    <button type="button" class="mo-sc-minus" aria-label="Azalt">-</button>',
                '    <span class="mo-sc-value">1</span>',
                '    <button type="button" class="mo-sc-plus" aria-label="Artır">+</button>',
                '  </div>',
                '  <button type="button" class="mo-sc-add">Sepete Ekle</button>',
                '</div>'
            ].join('');
            document.body.appendChild(state.bar);
        }

        state.qtyText = qs('.mo-sc-value', state.bar);
        state.priceText = qs('.mo-sc-price', state.bar);
        state.titleText = qs('.mo-sc-title', state.bar);
        state.image = qs('.mo-sc-img', state.bar);

        qs('.mo-sc-minus', state.bar).addEventListener('click', function () {
            setQtyValue(getQtyValue() - 1);
        });

        qs('.mo-sc-plus', state.bar).addEventListener('click', function () {
            setQtyValue(getQtyValue() + 1);
        });

        qs('.mo-sc-add', state.bar).addEventListener('click', function (event) {
            if (Date.now() < state.ignoreSyntheticClickUntil) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            handleAdd(event);
        });

        qs('.mo-sc-add', state.bar).addEventListener('touchend', function (event) {
            state.ignoreSyntheticClickUntil = Date.now() + 700;
            handleAdd(event);
        }, { passive: false });

        qs('.mo-sc-add', state.bar).addEventListener('pointerup', function (event) {
            if (event.pointerType === 'mouse') return;
            state.ignoreSyntheticClickUntil = Date.now() + 700;
            handleAdd(event);
        });
    }

    function updateVisibility() {
        state.visibilityScheduled = false;

        if (!state.bar) return;

        var stockEmpty = qs('#divStokYok');
        var hasProductDetail = !!(qs('.ProductName') || qs('#pnlFiyatlar') || qs('#divSatinAl') || getRealAddButton());
        var shouldShow = hasProductDetail && getScrollTop() > SHOW_AFTER_SCROLL && !(stockEmpty && isVisible(stockEmpty));

        state.bar.classList.toggle(VISIBLE_CLASS, shouldShow);
        document.body.classList.toggle(READY_CLASS, shouldShow);

        if (shouldShow) syncContent();
    }

    function scheduleVisibilityUpdate() {
        if (state.visibilityScheduled) return;
        state.visibilityScheduled = true;
        window.requestAnimationFrame(updateVisibility);
    }

    function bindSourceChanges() {
        var qty = getRealQtyField();
        if (qty && !qty.getAttribute('data-mo-sticky-bound')) {
            qty.setAttribute('data-mo-sticky-bound', '1');
            qty.addEventListener('input', syncContent);
            qty.addEventListener('change', syncContent);
        }

        if (state.sourceClickBound) return;
        state.sourceClickBound = true;

        document.addEventListener('click', function (event) {
            if (!event.target || !event.target.closest) return;

            if (
                event.target.closest('.qtyPlus') ||
                event.target.closest('.qtyMinus') ||
                event.target.closest('#divUrunEkSecenekV2') ||
                event.target.closest('#divUrunEkSecenek') ||
                event.target.closest('.eksecenekLine') ||
                event.target.closest('.size_box')
            ) {
                window.setTimeout(function () {
                    bindSourceChanges();
                    syncContent();
                    scheduleVisibilityUpdate();
                }, 140);
            }
        });
    }

    function init() {
        if (!document.body) return;

        injectStyles();
        createBar();
        bindSourceChanges();
        updateVisibility();

        window.setTimeout(updateVisibility, 300);
        window.setTimeout(updateVisibility, 900);

        window.addEventListener('resize', scheduleVisibilityUpdate);
        window.addEventListener('scroll', scheduleVisibilityUpdate, { passive: true });
        document.addEventListener('scroll', scheduleVisibilityUpdate, { passive: true, capture: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.moStickyCartInit = init;
}());
