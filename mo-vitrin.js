(function () {
    'use strict';

    var VERSION = '20261008-1';
    var STYLE_ID = 'moVitrinStyles';
    var CARD_SELECTOR = '.jCarouselLite .productItem, .ulUrunSlider .productItem';
    var queued = false;
    var observedImages = new Set();
    var imageObserver;

    function addStyles() {
        if (document.getElementById(STYLE_ID)) return;
        if (!document.querySelector('[data-mo-filter-font], [data-mo-vitrin-font]')) {
            var font = document.createElement('link');
            font.rel = 'stylesheet';
            font.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap';
            font.setAttribute('data-mo-vitrin-font', 'true');
            document.head.appendChild(font);
        }
        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            body .homepage .mo-vitrin-carousel > .categoryTitle { display:flex; float:none; align-items:center; min-height:44px; width:100%; margin:0 0 12px!important; padding:0 90px 0 0!important; text-align:left; }
            body .homepage .mo-vitrin-carousel > .categoryTitle span { display:block; height:auto; margin:0; padding:0; border:0; background:transparent; color:#03235e; font:700 16px/1.5 'DM Sans',Arial,sans-serif; }
            body .homepage .mo-vitrin-carousel .ulUrunSlider > .owl-nav { top:var(--mo-vitrin-nav-top,-56px)!important; left:auto!important; right:0!important; bottom:auto; width:82px!important; height:44px; margin:0; padding:0; }
            body .homepage .mo-vitrin-carousel .ulUrunSlider > .owl-nav:not(.disabled) { display:flex; align-items:center; gap:6px; }
            body .homepage .mo-vitrin-carousel .ulUrunSlider > .owl-nav > * { display:flex!important; position:static!important; align-items:center; justify-content:center; float:none; width:38px!important; height:38px!important; margin:0!important; padding:0; border:1px solid #dce5e9!important; border-radius:4px!important; background:#f7fafb!important; color:#03235e!important; font-size:0; cursor:pointer; }
            body .homepage .mo-vitrin-carousel .ulUrunSlider > .owl-nav > .disabled { opacity:.4; cursor:default; }
            body .homepage .mo-vitrin-carousel .ulUrunSlider > .owl-nav > * > span,
            body .homepage .mo-vitrin-carousel .ulUrunSlider > .owl-nav > * > i { display:none; }
            body .homepage .mo-vitrin-carousel .ulUrunSlider > .owl-nav > *::before { content:none!important; }
            body .homepage .mo-vitrin-carousel .ulUrunSlider > .owl-nav > *::after { display:block!important; position:static!important; width:auto; height:auto; margin:0!important; transform:none!important; background:none!important; color:inherit!important; font:400 18px/1 'FontAwesome'!important; }
            body .homepage .mo-vitrin-carousel .ulUrunSlider > .owl-nav > :first-child::after { content:'\\f104'!important; }
            body .homepage .mo-vitrin-carousel .ulUrunSlider > .owl-nav > :last-child::after { content:'\\f105'!important; }
            body .homepage .mo-vitrin-carousel .ulUrunSlider > .owl-nav > *:focus-visible { outline:2px solid #4fa0c9; outline-offset:2px; }
            body .homepage .productItem.mo-vitrin-card {
                position:relative; box-sizing:border-box; border:1px solid #e1e8eb; border-radius:5px;
                background:#fff; overflow:hidden; text-align:left; font-family:'DM Sans',Arial,sans-serif;
            }
            .mo-vitrin-card *, .mo-vitrin-card *::before, .mo-vitrin-card *::after { box-sizing:border-box; letter-spacing:0; }
            body .homepage .mo-vitrin-card .productDetail { display:flow-root; float:none!important; clear:both; width:auto!important; max-width:none!important; padding:12px; text-align:left; }
            body .homepage .mo-vitrin-card .productName { margin:8px 0!important; padding:0!important; }
            body .homepage .mo-vitrin-card .productName a { display:-webkit-box!important; -webkit-line-clamp:2; -webkit-box-orient:vertical; height:40px!important; overflow:hidden; color:#25394a; font:500 13px/20px 'DM Sans',Arial,sans-serif!important; white-space:normal!important; text-align:left; }
            body .homepage .mo-vitrin-card .productStokKodu,
            body .homepage .mo-vitrin-card .productSatisBirimi { float:none!important; width:100%; margin:5px 0; color:#71808c; font:400 11px/1.5 'DM Sans',Arial,sans-serif; overflow-wrap:anywhere; }
            body .homepage .mo-vitrin-card .productPrice { display:flex!important; align-items:center; flex-wrap:wrap; clear:both; gap:6px; float:none!important; width:100%; height:auto!important; min-height:26px; text-align:left; }
            body .homepage .mo-vitrin-card .discountPrice span { color:#03235e; font:700 19px/1.4 'DM Sans',Arial,sans-serif; }
            body .homepage .mo-vitrin-card .cargoIcon { position:static!important; display:inline-flex!important; align-items:center; justify-content:center; gap:6px; width:auto; max-width:100%; min-height:28px; margin:0; padding:5px 9px; border:0; border-left:3px solid #4fa0c9; border-radius:3px; background:#0c4853; color:#fff; font:700 11px/16px 'DM Sans',Arial,sans-serif; text-align:left; white-space:normal; overflow-wrap:anywhere; box-shadow:none; }
            body .homepage .mo-vitrin-card .cargoIcon::before { content:'\\f0d1'; flex-shrink:0; font:400 14px/1 'FontAwesome'; color:#b9e9f2; }
            body .homepage .mo-vitrin-card .productIcon.mo-vitrin-overlay {
                position:absolute; top:var(--mo-vitrin-image-top,0px); left:0; right:auto; bottom:auto;
                width:100%; height:var(--mo-vitrin-image-height,0px); padding:0; pointer-events:none;
            }
            body .homepage .mo-vitrin-card .mo-vitrin-statuses { display:flex; flex-direction:column; align-items:flex-start; gap:5px; position:absolute; top:10px; left:10px; max-width:calc(100% - 20px); z-index:8; }
            body .homepage .mo-vitrin-card.YeniUrun .mo-vitrin-statuses { top:38px; }
            body .homepage .mo-vitrin-card .mo-vitrin-statuses .urunListStokUyari,
            body .homepage .mo-vitrin-card .mo-vitrin-statuses .urunListSonUrun,
            body .homepage .mo-vitrin-card .mo-vitrin-statuses .TukendiIco {
                display:inline-flex!important; align-items:center; gap:6px; position:static!important;
                float:none; width:auto; max-width:100%; height:auto!important; min-height:28px;
                margin:0!important; padding:6px 9px!important; border:1px solid #80333f; border-radius:4px;
                background:#963e4b; color:#fff; font:600 11px/1.4 'DM Sans',Arial,sans-serif;
                text-align:left; text-decoration:none; overflow-wrap:anywhere;
            }
            body .homepage .mo-vitrin-card .mo-vitrin-statuses .urunListStokUyari::before,
            body .homepage .mo-vitrin-card .mo-vitrin-statuses .urunListSonUrun::before { content:'\\f071'; flex-shrink:0; color:#ffe1a4; font:400 12px/1 'FontAwesome'; }
            body .homepage .mo-vitrin-card .mo-vitrin-statuses .TukendiIco { border-color:#566774; background:#566774; pointer-events:auto; }
            body .homepage .mo-vitrin-card .mo-vitrin-statuses .TukendiIco::before { content:'\\f05e'; flex-shrink:0; color:#fff; font:400 12px/1 'FontAwesome'; }
            body .homepage .mo-vitrin-card .mo-vitrin-statuses .TukendiIco span { display:block; position:static!important; float:none; width:auto!important; max-width:none; height:auto!important; max-height:none; margin:0!important; padding:0!important; border-radius:0; background:transparent!important; color:inherit; font:inherit; text-align:left; }
            body .homepage .mo-vitrin-card .mo-vitrin-actions {
                display:flex; align-items:center; justify-content:center; gap:7px; position:absolute;
                bottom:12px; left:0; right:0; width:max-content; max-width:100%; margin:0 auto; padding:5px;
                border:1px solid #dce5e9; border-radius:5px; background:rgba(255,255,255,.96);
                box-shadow:0 3px 12px rgba(3,35,94,.12); z-index:10; opacity:0; pointer-events:none;
                transform:translateY(6px); transition:opacity .15s ease,transform .15s ease;
            }
            body .homepage .mo-vitrin-card:hover .mo-vitrin-actions,
            body .homepage .mo-vitrin-card:focus-within .mo-vitrin-actions { opacity:1; pointer-events:auto; transform:none; }
            body .homepage .mo-vitrin-card .mo-vitrin-actions > .favori,
            body .homepage .mo-vitrin-card .mo-vitrin-actions > .mycartIcon,
            body .homepage .mo-vitrin-card .mo-vitrin-actions > .examineIcon { display:block!important; position:static!important; opacity:1; width:38px; height:38px; margin:0; }
            body .homepage .mo-vitrin-card .mo-vitrin-actions a {
                display:flex; align-items:center; justify-content:center; position:relative!important;
                top:auto; left:auto; float:none; width:38px; height:38px; margin:0; padding:0!important;
                border:1px solid #dce5e9; border-radius:4px; background:#fff; color:#03235e;
                font-size:0; text-decoration:none; cursor:pointer;
            }
            body .homepage .mo-vitrin-card .mo-vitrin-actions .mycartIcon a { border-color:#0c4853; background:#0c4853; color:#fff; }
            body .homepage .mo-vitrin-card .mo-vitrin-actions a > span,
            body .homepage .mo-vitrin-card .mo-vitrin-actions a > i { display:none!important; }
            body .homepage .mo-vitrin-card .mo-vitrin-actions a::after { position:static!important; display:block; width:auto; height:auto; background:none!important; opacity:1!important; color:inherit!important; font:400 16px/1 'FontAwesome'; }
            body .homepage .mo-vitrin-card .mo-vitrin-actions .mycartIcon a::after { content:'\\f217'; }
            body .homepage .mo-vitrin-card .mo-vitrin-actions .favori a::after { content:'\\f004'; }
            body .homepage .mo-vitrin-card .mo-vitrin-actions .examineIcon a::after { content:'\\f06e'; }
            body .homepage .mo-vitrin-card .mo-vitrin-actions .favori a[data-action='2'] { border-color:#e4bbc4; background:#f9eff2; color:#963e4b; }
            body .homepage .mo-vitrin-card .mo-vitrin-actions a::before { content:attr(data-mo-vitrin-label); display:block; position:absolute; bottom:calc(100% + 10px); left:50%; transform:translateX(-50%); width:max-content; max-width:120px; padding:6px 8px; border-radius:4px; background:#03235e; color:#fff; font:500 11px/1.4 'DM Sans',Arial,sans-serif; text-align:center; opacity:0; pointer-events:none; }
            body .homepage .mo-vitrin-card .mo-vitrin-actions a:hover::before,
            body .homepage .mo-vitrin-card .mo-vitrin-actions a:focus-visible::before { opacity:1; }
            body .homepage .mo-vitrin-card .mo-vitrin-actions a:focus-visible,
            body .homepage .mo-vitrin-card .TukendiIco:focus-visible { outline:2px solid #4fa0c9; outline-offset:2px; }
            body .homepage .mo-vitrin-card.mo-vitrin-sold .mo-vitrin-actions { display:none!important; }
            @media(hover:hover) {
                body .homepage .mo-vitrin-carousel .ulUrunSlider > .owl-nav > :not(.disabled):hover { border-color:#03235e; background:#03235e!important; color:#fff!important; }
                body .homepage .productItem.mo-vitrin-card:hover { border-color:#8fb8c7; }
                body .homepage .mo-vitrin-card .mo-vitrin-actions a:hover { border-color:#03235e; background:#03235e; color:#fff; }
            }
            @media(max-width:1041px), (hover:none) {
                body .homepage .mo-vitrin-card .productDetail { padding:9px; }
                body .homepage .mo-vitrin-card .cargoIcon { gap:4px; padding:4px 6px; font-size:10px; }
                body .homepage .mo-vitrin-card .discountPrice span { font-size:16px; }
                body .homepage .mo-vitrin-card .mo-vitrin-statuses { top:7px; left:7px; max-width:calc(100% - 14px); }
                body .homepage .mo-vitrin-card .mo-vitrin-statuses .urunListStokUyari,
                body .homepage .mo-vitrin-card .mo-vitrin-statuses .urunListSonUrun,
                body .homepage .mo-vitrin-card .mo-vitrin-statuses .TukendiIco { padding:5px 7px!important; font-size:10px; }
                body .homepage .mo-vitrin-card .mo-vitrin-actions { gap:5px; bottom:8px; padding:4px; opacity:1; pointer-events:auto; transform:none; }
                body .homepage .mo-vitrin-card .mo-vitrin-actions > .favori,
                body .homepage .mo-vitrin-card .mo-vitrin-actions > .mycartIcon,
                body .homepage .mo-vitrin-card .mo-vitrin-actions > .examineIcon,
                body .homepage .mo-vitrin-card .mo-vitrin-actions a { width:34px; height:36px; }
                body .homepage .mo-vitrin-card .mo-vitrin-actions a::before { display:none; }
            }
            @media(prefers-reduced-motion:reduce) { .mo-vitrin-actions { transition:none!important; } }
        `;
        document.head.appendChild(style);
    }

    function alignOverlay(image) {
        var card = image.closest('.mo-vitrin-card');
        if (!card) return;
        card.style.setProperty('--mo-vitrin-image-height', image.offsetHeight + 'px');
        card.style.setProperty('--mo-vitrin-image-top', image.offsetTop + 'px');
    }

    function decorateCard(card) {
        if (card.classList.contains('isBanner')) return;
        var image = card.querySelector('.productImage');
        var detail = card.querySelector('.productDetail');
        var overlay = card.querySelector('.productIcon');
        if (!image || !detail) return;
        if (!card.classList.contains('mo-vitrin-card')) card.classList.add('mo-vitrin-card');
        var cargo = card.querySelector('.cargoIcon');
        if (cargo && cargo.parentNode !== detail) detail.insertBefore(cargo, detail.firstChild);
        var sold = !!card.querySelector('.TukendiIco') || card.classList.contains('StokYok');
        if (card.classList.contains('mo-vitrin-sold') !== sold) card.classList.toggle('mo-vitrin-sold', sold);
        if (overlay) {
            if (!overlay.classList.contains('mo-vitrin-overlay')) overlay.classList.add('mo-vitrin-overlay');
            var statuses = overlay.querySelector('.mo-vitrin-statuses');
            card.querySelectorAll('.TukendiIco, .urunListStokUyari, .urunListSonUrun').forEach(function (badge) {
                if (!statuses) {
                    statuses = document.createElement('div');
                    statuses.className = 'mo-vitrin-statuses';
                    overlay.appendChild(statuses);
                }
                if (badge.parentNode !== statuses) statuses.appendChild(badge);
            });
            var actions = overlay.querySelector('.mo-vitrin-actions');
            [['.mycartIcon', 'Sepete Ekle'], ['.favori', 'Favorilerime Ekle'], ['.examineIcon', 'Ürünü İncele']].forEach(function (entry) {
                var control = card.querySelector(entry[0]);
                var link = control && control.querySelector('a');
                if (!link) return;
                if (!actions) {
                    actions = document.createElement('div');
                    actions.className = 'mo-vitrin-actions';
                    actions.setAttribute('role', 'group');
                    actions.setAttribute('aria-label', 'Ürün işlemleri');
                    overlay.appendChild(actions);
                }
                // Retain original Ticimax controls, IDs, and click handlers, including cloned slides.
                if (control.parentNode !== actions) actions.appendChild(control);
                var label = entry[0] === '.favori' && link.getAttribute('data-action') === '2' ? 'Favorilerimden Çıkar' : entry[1];
                link.setAttribute('aria-label', label);
                link.setAttribute('data-mo-vitrin-label', label);
                if (!link.hasAttribute('href')) {
                    link.setAttribute('role', 'button');
                    link.setAttribute('tabindex', '0');
                }
            });
        }
        alignOverlay(image);
        if (imageObserver && !observedImages.has(image)) {
            observedImages.add(image);
            imageObserver.observe(image);
        }
    }

    function init() {
        var root = document.querySelector('.homepage');
        if (!root || root.hasAttribute('data-mo-vitrin-controller')) return;
        root.setAttribute('data-mo-vitrin-controller', VERSION);
        addStyles();
        if (window.ResizeObserver) imageObserver = new ResizeObserver(function (entries) {
            entries.forEach(function (entry) { alignOverlay(entry.target); });
        });
        function prepare() {
            observedImages.forEach(function (image) {
                if (!root.contains(image)) {
                    imageObserver.unobserve(image);
                    observedImages.delete(image);
                }
            });
            root.querySelectorAll('.jCarouselLite').forEach(function (carousel) {
                if (!carousel.querySelector('.ulUrunSlider')) return;
                if (!carousel.classList.contains('mo-vitrin-carousel')) carousel.classList.add('mo-vitrin-carousel');
                var heading = carousel.querySelector('.categoryTitle');
                var slider = carousel.querySelector('.ulUrunSlider');
                if (heading) carousel.style.setProperty('--mo-vitrin-nav-top', (heading.getBoundingClientRect().top - slider.getBoundingClientRect().top) + 'px');
                carousel.querySelectorAll('.ulUrunSlider > .owl-nav > *').forEach(function (button, index) {
                    var label = index === 0 ? 'Önceki ürünler' : 'Sonraki ürünler';
                    button.setAttribute('aria-label', label);
                    button.setAttribute('title', label);
                    if (button.tagName !== 'BUTTON') {
                        button.setAttribute('role', 'button');
                        button.setAttribute('tabindex', button.classList.contains('disabled') ? '-1' : '0');
                    }
                });
            });
            root.querySelectorAll(CARD_SELECTOR).forEach(decorateCard);
        }
        function queueUpdate() {
            if (queued) return;
            queued = true;
            window.requestAnimationFrame(function () { queued = false; prepare(); });
        }
        prepare();
        new MutationObserver(function (records) {
            if (records.some(function (record) {
                if (record.type === 'attributes') return !!record.target.closest('.mo-vitrin-card');
                return record.target.closest('.jCarouselLite, .ulUrunSlider') || Array.from(record.addedNodes).some(function (node) {
                    return node.nodeType === 1 && (node.matches('.jCarouselLite, .ulUrunSlider') || node.querySelector(CARD_SELECTOR));
                });
            })) queueUpdate();
        }).observe(root, { subtree:true, childList:true, attributes:true, attributeFilter:['class', 'data-action'] });
        window.addEventListener('resize', queueUpdate, { passive:true });
        root.addEventListener('load', function (event) {
            var image = event.target.closest && event.target.closest('.mo-vitrin-card .productImage');
            if (image) alignOverlay(image);
        }, true);
        root.addEventListener('keydown', function (event) {
            var link = event.target.closest('.mo-vitrin-actions a[role="button"], .mo-vitrin-carousel .owl-nav [role="button"]');
            if (!link || (event.key !== ' ' && event.key !== 'Enter')) return;
            event.preventDefault();
            if (link.getAttribute('aria-disabled') !== 'true') link.click();
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
    else init();
}());
