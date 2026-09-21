(function () {
    'use strict';

    var STYLE_ID = 'moSearchModalStyles';
    var MODAL_ID = 'moSearchModal';
    var SLOT_ID = 'moSearchFormSlot';
    var RESULTS_ID = 'moSearchResults';
    var OPEN_CLASS = 'mo-search-modal-open';
    var API_URL = '/api/product/Search?c=trtry0000&Keyword=';
    var searchTimer = null;
    var abortController = null;
    var nativeObserver = null;
    var originalSearchParent = null;
    var originalSearchNext = null;
    var lastKeyword = '';

    var quickLinks = [
        { label: 'Çanta', keyword: 'çanta', url: '/canta' },
        { label: 'Omuz Çanta', keyword: 'omuz çanta', url: '/omuz-canta' },
        { label: 'Portföy Clutch', keyword: 'portföy clutch çanta', url: '/portfoy-clutch-canta' },
        { label: 'Sırt Çantası', keyword: 'sırt çantası', url: '/sirt-cantasi' },
        { label: 'Makyaj Çantası', keyword: 'makyaj çantası', url: '/makyaj-cantasi' },
        { label: 'Cüzdan', keyword: 'cüzdan', url: '/dokuma-cuzdan' },
        { label: 'Defter', keyword: 'defter', url: '/dokuma-defter' },
        { label: 'Telefon Kılıfı', keyword: 'telefon kılıfı', url: '/dokuma-telefon-kilifi' }
    ];

    function injectStyles() {
        if (document.getElementById(STYLE_ID)) return;

        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = [
            'body.' + OPEN_CLASS + ' { overflow: hidden; }',
            'body.' + OPEN_CLASS + ' #divAramaSonuc,',
            'body.' + OPEN_CLASS + ' .searchV2,',
            'body.' + OPEN_CLASS + ' .ticimax-search-content,',
            'body.' + OPEN_CLASS + ' .quickSearchContent { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }',
            '#moSearchModal, #moSearchModal * { box-sizing: border-box; }',
            '#moSearchModal {',
            '  --mo-ink: #111827;',
            '  --mo-earth: #0c4853;',
            '  --mo-navy: #03235e;',
            '  --mo-turquoise: #4fa0c9;',
            '  --mo-cream: #f3f7f8;',
            '  --mo-soft: #f5fbfd;',
            '  position: fixed;',
            '  inset: 0;',
            '  z-index: 2147483000;',
            '  display: none;',
            '  align-items: center;',
            '  justify-content: center;',
            '  padding: 28px;',
            '  background: rgba(3, 35, 94, .58);',
            '  backdrop-filter: blur(10px);',
            '  -webkit-backdrop-filter: blur(10px);',
            '  font-family: Arial, Helvetica, sans-serif;',
            '}',
            '#moSearchModal.is-active { display: flex; }',
            '.mo-search-dialog {',
            '  position: relative;',
            '  width: min(1320px, 100%);',
            '  height: min(820px, calc(100vh - 56px));',
            '  display: grid;',
            '  grid-template-columns: minmax(0, 1.04fr) minmax(360px, .96fr);',
            '  overflow: hidden;',
            '  border: 1px solid rgba(255,255,255,.72);',
            '  border-radius: 30px;',
            '  background: #fff;',
            '  box-shadow: 0 30px 86px rgba(3,35,94,.34);',
            '}',
            '.mo-search-panel {',
            '  min-width: 0;',
            '  display: flex;',
            '  flex-direction: column;',
            '  overflow: hidden;',
            '  padding: clamp(28px, 4vw, 58px);',
            '  background:',
            '    radial-gradient(circle at 4% 8%, rgba(79,160,201,.12), transparent 26%),',
            '    linear-gradient(135deg, #fff 0%, var(--mo-soft) 100%);',
            '}',
            '.mo-search-kicker {',
            '  display: flex;',
            '  align-items: center;',
            '  gap: 12px;',
            '  margin-bottom: 20px;',
            '  color: var(--mo-navy);',
            '  font-size: 12px;',
            '  font-weight: 900;',
            '  letter-spacing: .18em;',
            '  text-transform: uppercase;',
            '}',
            '.mo-search-kicker::before { content: ""; width: 34px; height: 1px; background: currentColor; }',
            '.mo-search-title {',
            '  max-width: 690px;',
            '  margin: 0 0 16px;',
            '  color: var(--mo-ink);',
            '  font-size: clamp(38px, 5vw, 74px);',
            '  font-weight: 900;',
            '  line-height: .98;',
            '  letter-spacing: -.058em;',
            '}',
            '.mo-search-desc {',
            '  max-width: 620px;',
            '  margin: 0 0 27px;',
            '  color: #5f6b76;',
            '  font-size: 16px;',
            '  font-weight: 700;',
            '  line-height: 1.7;',
            '}',
            '#moSearchModal #divArama {',
            '  width: 100%;',
            '  display: flex !important;',
            '  align-items: stretch !important;',
            '  gap: 12px;',
            '  margin: 0;',
            '  padding: 12px;',
            '  border: 1px solid rgba(12,72,83,.16);',
            '  border-radius: 22px;',
            '  background: #fff;',
            '  box-shadow: 0 16px 42px rgba(3,35,94,.12);',
            '}',
            '#moSearchModal #divArama .ButtonMic { display: none !important; }',
            '#moSearchModal #txtbxArama {',
            '  position: static !important;',
            '  display: block !important;',
            '  flex: 1 1 auto !important;',
            '  width: 100% !important;',
            '  max-width: none !important;',
            '  height: 64px !important;',
            '  margin: 0 !important;',
            '  padding: 0 22px !important;',
            '  color: var(--mo-ink) !important;',
            '  font-size: 24px !important;',
            '  font-weight: 900 !important;',
            '  border: 1px solid rgba(12,72,83,.2) !important;',
            '  border-radius: 17px !important;',
            '  background: #fff !important;',
            '  outline: 0 !important;',
            '  box-shadow: none !important;',
            '}',
            '#moSearchModal #txtbxArama::placeholder { color: #7b8794; }',
            '#moSearchModal #txtbxArama:focus { border-color: var(--mo-navy) !important; box-shadow: 0 0 0 4px rgba(79,160,201,.24) !important; }',
            '#moSearchModal #btnKelimeAra {',
            '  position: static !important;',
            '  inset: auto !important;',
            '  flex: 0 0 138px !important;',
            '  width: 138px !important;',
            '  min-width: 138px !important;',
            '  max-width: 138px !important;',
            '  height: 64px !important;',
            '  margin: 0 !important;',
            '  padding: 0 20px !important;',
            '  display: inline-flex !important;',
            '  align-items: center;',
            '  justify-content: center;',
            '  color: #fff !important;',
            '  font-size: 15px !important;',
            '  font-weight: 900 !important;',
            '  border: 0 !important;',
            '  border-radius: 17px !important;',
            '  background: linear-gradient(135deg, var(--mo-navy), var(--mo-earth)) !important;',
            '  cursor: pointer;',
            '  transition: transform .2s, filter .2s;',
            '}',
            '#moSearchModal #btnKelimeAra::after { content: none !important; }',
            '#moSearchModal #btnKelimeAra:hover { transform: translateY(-1px); filter: brightness(.95); }',
            '.mo-search-links {',
            '  display: flex;',
            '  flex-wrap: wrap;',
            '  gap: 10px;',
            '  margin: 28px 0 0;',
            '}',
            '.mo-search-link {',
            '  display: inline-flex;',
            '  align-items: center;',
            '  gap: 8px;',
            '  padding: 11px 15px;',
            '  color: var(--mo-earth);',
            '  font-size: 14px;',
            '  font-weight: 900;',
            '  text-decoration: none;',
            '  border: 1px solid rgba(12,72,83,.16);',
            '  border-radius: 999px;',
            '  background: rgba(255,255,255,.84);',
            '  cursor: pointer;',
            '}',
            '.mo-search-link::after { content: "→"; color: var(--mo-turquoise); }',
            '.mo-search-link:hover { border-color: rgba(79,160,201,.48); background: #eef8fb; }',
            '#moSearchResults {',
            '  position: relative;',
            '  z-index: 1;',
            '  display: none;',
            '  height: 100%;',
            '  min-height: 0;',
            '  padding: 86px 34px 34px;',
            '  overflow-y: auto;',
            '  overflow-x: hidden;',
            '  scrollbar-width: thin;',
            '  scrollbar-color: rgba(255,255,255,.5) rgba(255,255,255,.14);',
            '}',
            '#moSearchResults::-webkit-scrollbar { width: 8px; }',
            '#moSearchResults::-webkit-scrollbar-track { background: rgba(255,255,255,.14); border-radius: 999px; }',
            '#moSearchResults::-webkit-scrollbar-thumb { background: rgba(255,255,255,.5); border-radius: 999px; }',
            '.mo-search-visual.has-results #moSearchResults { display: block; }',
            '.mo-search-visual.has-results .mo-search-svg,',
            '.mo-search-visual.has-results .mo-search-visual-copy { display: none; }',
            '.mo-result-empty { color: rgba(255,255,255,.86); font-size: 15px; font-weight: 800; }',
            '.mo-result-head { margin: 0 0 22px; }',
            '.mo-result-head span { display: block; margin-bottom: 8px; color: #a8e5f4; font-size: 12px; font-weight: 900; letter-spacing: .16em; text-transform: uppercase; }',
            '.mo-result-head strong { display: block; color: #fff; font-size: clamp(28px, 3vw, 42px); font-weight: 900; line-height: 1.05; letter-spacing: -.045em; }',
            '.mo-result-layout { display: grid; grid-template-columns: 1fr; gap: 22px; align-items: start; }',
            '.mo-result-title { margin: 0 0 14px; color: #fff; font-size: 18px; font-weight: 900; }',
            '.mo-category-list { display: flex; flex-wrap: wrap; gap: 9px; }',
            '.mo-category-link {',
            '  display: inline-flex;',
            '  max-width: 100%;',
            '  min-width: 0;',
            '  padding: 10px 13px;',
            '  overflow: hidden;',
            '  color: #fff;',
            '  font-size: 13px;',
            '  font-weight: 800;',
            '  line-height: 1.35;',
            '  text-overflow: ellipsis;',
            '  white-space: nowrap;',
            '  text-decoration: none;',
            '  border: 1px solid rgba(255,255,255,.22);',
            '  border-radius: 999px;',
            '  background: rgba(255,255,255,.1);',
            '}',
            '.mo-category-link:hover { color: var(--mo-ink); border-color: rgba(255,255,255,.85); background: #fff; }',
            '.mo-product-grid { display: grid !important; grid-template-columns: 1fr !important; gap: 12px; align-items: stretch; }',
            '.mo-product-card {',
            '  min-width: 0;',
            '  width: 100% !important;',
            '  display: grid;',
            '  grid-template-columns: 96px minmax(0, 1fr);',
            '  align-items: center;',
            '  gap: 13px;',
            '  min-height: 112px;',
            '  padding: 11px;',
            '  color: inherit;',
            '  text-decoration: none;',
            '  border: 1px solid rgba(255,255,255,.2);',
            '  border-radius: 17px;',
            '  background: rgba(255,255,255,.95);',
            '  box-shadow: 0 16px 34px rgba(3,35,94,.14);',
            '  transition: transform .18s, border-color .18s, box-shadow .18s;',
            '}',
            '.mo-product-card:hover { transform: translateY(-2px); border-color: rgba(255,255,255,.85); box-shadow: 0 18px 38px rgba(3,35,94,.22); }',
            '.mo-product-card > span { display: block !important; min-width: 0 !important; overflow: hidden !important; }',
            '.mo-product-image { display: block !important; width: 96px !important; min-width: 96px !important; height: 96px !important; object-fit: contain; border-radius: 13px; background: var(--mo-cream); }',
            '.mo-product-category { display: block; max-width: 100%; margin: 4px 0 5px; overflow: hidden; color: #7b8a94; font-size: 12px; font-weight: 900; text-overflow: ellipsis; white-space: nowrap; }',
            '.mo-product-name { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; color: var(--mo-ink); font-size: 15px; font-weight: 900; line-height: 1.28; }',
            '.mo-product-price { display: flex; max-width: 100%; gap: 8px; align-items: baseline; margin-top: 8px; overflow: hidden; color: var(--mo-navy); font-size: 15px; font-weight: 900; white-space: nowrap; }',
            '.mo-product-old-price { color: #9aa4ad; font-size: 13px; text-decoration: line-through; }',
            '.mo-search-visual {',
            '  position: relative;',
            '  overflow: hidden;',
            '  color: #fff;',
            '  background:',
            '    radial-gradient(circle at 22% 18%, rgba(79,160,201,.38), transparent 28%),',
            '    linear-gradient(135deg, #0c4853 0%, #03235e 100%);',
            '}',
            '.mo-search-visual::before {',
            '  content: "";',
            '  position: absolute;',
            '  inset: 0;',
            '  opacity: .18;',
            '  background-image: linear-gradient(45deg, rgba(255,255,255,.42) 1px, transparent 1px), linear-gradient(-45deg, rgba(255,255,255,.2) 1px, transparent 1px);',
            '  background-size: 26px 26px;',
            '}',
            '.mo-search-svg { position: absolute; width: min(530px, 86%); right: 5%; top: 16%; opacity: .88; }',
            '.mo-search-visual-copy { position: absolute; left: 42px; right: 42px; bottom: 42px; z-index: 1; }',
            '.mo-search-visual-copy strong { display: block; max-width: 430px; font-size: 34px; font-weight: 900; line-height: 1.04; letter-spacing: -.04em; }',
            '.mo-search-visual-copy span { display: block; max-width: 380px; margin-top: 14px; color: rgba(255,255,255,.76); font-size: 14px; font-weight: 700; line-height: 1.65; }',
            '.mo-search-close {',
            '  position: absolute;',
            '  top: 22px;',
            '  right: 22px;',
            '  z-index: 2;',
            '  width: 52px;',
            '  height: 52px;',
            '  display: inline-flex;',
            '  align-items: center;',
            '  justify-content: center;',
            '  color: var(--mo-ink);',
            '  font-size: 32px;',
            '  font-weight: 400;',
            '  border: 0;',
            '  border-radius: 50%;',
            '  background: rgba(255,255,255,.92);',
            '  cursor: pointer;',
            '}',
            '@media (max-width: 920px) {',
            '  #moSearchModal { padding: 14px; align-items: flex-start; overflow: auto; }',
            '  .mo-search-dialog { height: auto; min-height: calc(100vh - 28px); grid-template-columns: 1fr; border-radius: 24px; }',
            '  .mo-search-visual { min-height: 190px; order: -1; }',
            '  .mo-search-svg { width: 270px; right: -10px; top: -38px; opacity: .45; }',
            '  .mo-search-visual-copy { left: 24px; right: 90px; bottom: 24px; }',
            '  .mo-search-visual-copy strong { font-size: 25px; }',
            '  .mo-search-visual-copy span { display: none; }',
            '  .mo-search-panel { padding: 26px 18px 22px; }',
            '  .mo-search-title { font-size: 35px; }',
            '  .mo-search-desc { font-size: 14px; }',
            '  #moSearchModal #divArama { flex-direction: column !important; gap: 9px; padding: 9px; border-radius: 18px; }',
            '  #moSearchModal #txtbxArama, #moSearchModal #btnKelimeAra { width: 100% !important; min-width: 0 !important; max-width: none !important; flex: 0 0 auto !important; height: 54px !important; font-size: 18px !important; border-radius: 14px !important; }',
            '  #moSearchResults { max-height: 58vh; padding: 76px 18px 20px; }',
            '  .mo-product-grid { grid-template-columns: 1fr; }',
            '  .mo-search-close { top: 18px; right: 18px; width: 46px; height: 46px; }',
            '}'
        ].join('\n');

        document.head.appendChild(style);
    }

    function escapeHtml(value) {
        return String(value || '').replace(/[&<>"']/g, function (char) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }[char];
        });
    }

    function normalizeUrl(url) {
        if (!url) return '#';
        if (/^https?:\/\//i.test(url)) return url;
        return url.charAt(0) === '/' ? url : '/' + url;
    }

    function normalizeImageUrl(url) {
        if (!url) return '';

        url = String(url).trim();
        if (!url || /load\.gif|resim-hazirlaniyor|blank|placeholder/i.test(url)) return '';
        if (/^\/\//.test(url)) return 'https:' + url;
        if (/^http:\/\//i.test(url)) return 'https://' + url.slice(7);
        if (/^https?:\/\//i.test(url)) return url;
        if (/^(?:uploads[\\/]|urunresimleri[\\/])/i.test(url)) {
            return 'https://static.ticimax.cloud/38550/' + url.replace(/^\/+/, '').replace(/\\/g, '/');
        }
        if (!/^\//.test(url) && /\.(?:jpg|jpeg|png|webp|gif)(?:\?.*)?$/i.test(url)) {
            return 'https://static.ticimax.cloud/38550/uploads/urunresimleri/thumb/' + url;
        }
        return url.charAt(0) === '/' ? url : '/' + url;
    }

    function imageCandidate(value) {
        if (!value) return '';
        if (typeof value === 'string') return normalizeImageUrl(value);
        if (Array.isArray(value)) {
            for (var i = 0; i < value.length; i += 1) {
                var arrayImage = imageCandidate(value[i]);
                if (arrayImage) return arrayImage;
            }
            return '';
        }
        if (typeof value === 'object') {
            return imageCandidate(
                value.url || value.imageUrl || value.image || value.path || value.src ||
                value.resimYolu || value.urunResimYolu || value.urunResimThumbYolu ||
                value.spotResimThumbYolu || value.spotResimYolu || value.spotResimBuyukYolu ||
                value.imagePath || value.thumbnail || value.pictureUrl || value.image_url
            );
        }
        return '';
    }

    function productImage(product) {
        if (!product) return '';

        var candidates = [
            product.image,
            product.imageUrl,
            product.imagePath,
            product.picture,
            product.productImage,
            product.thumb,
            product.thumbnail,
            product.resim,
            product.resimYolu,
            product.urunResimYolu,
            product.urunResimThumbYolu,
            product.spotResimThumbYolu,
            product.spotResimYolu,
            product.spotResimBuyukYolu,
            product.images,
            product.imageList,
            product.productImages,
            product.pictures,
            product.resimler,
            product.product,
            product.urun
        ];

        for (var i = 0; i < candidates.length; i += 1) {
            var image = imageCandidate(candidates[i]);
            if (image) return image;
        }
        return '';
    }

    function createModal() {
        if (document.getElementById(MODAL_ID)) return document.getElementById(MODAL_ID);

        var modal = document.createElement('div');
        modal.id = MODAL_ID;
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = [
            '<div class="mo-search-dialog" role="dialog" aria-modal="true" aria-label="Motif İstanbul ürün arama">',
            '  <button type="button" class="mo-search-close" aria-label="Aramayı kapat">×</button>',
            '  <section class="mo-search-panel">',
            '    <div class="mo-search-kicker">Motif İstanbul / Hızlı arama</div>',
            '    <h2 class="mo-search-title">Dokuma desenleri hızlıca bul.</h2>',
            '    <p class="mo-search-desc">Çanta, cüzdan, defter veya aksesuar adı yazarak koleksiyonda hızlıca gezinebilirsin. Aşağıdaki kategori bağlantılarıyla doğrudan ilgili alana gidebilirsin.</p>',
            '    <div id="' + SLOT_ID + '"></div>',
            '    <div class="mo-search-links" aria-label="Popüler kategoriler"></div>',
            '  </section>',
            '  <aside class="mo-search-visual">',
            '    <div id="' + RESULTS_ID + '" aria-live="polite"></div>',
            '    <svg class="mo-search-svg" viewBox="0 0 560 560" fill="none" xmlns="http://www.w3.org/2000/svg">',
            '      <path d="M145 176h235c32 0 58 26 58 58v138c0 32-26 58-58 58H145c-32 0-58-26-58-58V234c0-32 26-58 58-58Z" stroke="rgba(255,255,255,.82)" stroke-width="16"/>',
            '      <path d="M184 177c4-57 39-91 96-91s92 34 96 91" stroke="rgba(255,255,255,.7)" stroke-width="15" stroke-linecap="round"/>',
            '      <path d="M121 260h284M121 318h284M168 214v183M226 214v183M284 214v183M342 214v183" stroke="rgba(255,255,255,.22)" stroke-width="7" stroke-linecap="round"/>',
            '      <circle cx="420" cy="132" r="42" stroke="rgba(255,255,255,.26)" stroke-width="7"/>',
            '      <circle cx="128" cy="126" r="16" fill="rgba(255,255,255,.25)"/>',
            '      <path d="M118 458c97-36 200-35 306 2" stroke="rgba(255,255,255,.25)" stroke-width="8" stroke-linecap="round"/>',
            '    </svg>',
            '    <div class="mo-search-visual-copy"><strong>Otantik dokuları tek aramada keşfet.</strong><span>Sonuçlar anlık listelenir; ürüne veya kategoriye tek tıkla geçebilirsin.</span></div>',
            '  </aside>',
            '</div>'
        ].join('');

        document.body.appendChild(modal);
        modal.querySelector('.mo-search-close').addEventListener('click', closeModal);
        modal.addEventListener('click', function (event) {
            if (event.target === modal) closeModal();
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.classList.contains('is-active')) closeModal();
        });

        renderQuickLinks(modal);
        return modal;
    }

    function renderQuickLinks(modal) {
        var list = modal.querySelector('.mo-search-links');
        if (!list) return;

        list.innerHTML = quickLinks.map(function (item) {
            return '<a class="mo-search-link" href="' + escapeHtml(normalizeUrl(item.url)) + '" data-keyword="' + escapeHtml(item.keyword) + '">' + escapeHtml(item.label) + '</a>';
        }).join('');

        list.addEventListener('click', function (event) {
            var link = event.target.closest('.mo-search-link');
            var input = document.getElementById('txtbxArama');
            if (!link || !input) return;

            event.preventDefault();
            input.value = link.getAttribute('data-keyword') || link.textContent.trim();
            input.focus();
            performSearch(input.value);
        });
    }

    function prepareSearchForm() {
        var form = document.getElementById('divArama');
        var slot = document.getElementById(SLOT_ID);
        var input = document.getElementById('txtbxArama');
        var button = document.getElementById('btnKelimeAra');

        if (!form || !slot || form.parentNode === slot) return !!form;

        originalSearchParent = form.parentNode;
        originalSearchNext = form.nextSibling;
        slot.appendChild(form);

        if (input && input.getAttribute('data-mo-search-bound') !== 'true') {
            input.classList.remove('urunSearchAC', 'ticimaxSearchInput', 'ticiComplete');
            input.setAttribute('autocomplete', 'off');
            input.setAttribute('tabindex', '0');
            input.setAttribute('data-mo-search-bound', 'true');
            input.addEventListener('input', function () {
                scheduleSearch(input.value);
            });
            input.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    submitSearch();
                }
            });
        }

        if (button && button.getAttribute('data-mo-search-bound') !== 'true') {
            button.removeAttribute('onclick');
            button.value = 'ARA';
            button.setAttribute('value', 'ARA');
            button.setAttribute('title', 'Ara');
            button.setAttribute('data-mo-search-bound', 'true');
            button.addEventListener('click', function (event) {
                event.preventDefault();
                submitSearch();
            });
        }

        return true;
    }

    function restoreSearchForm() {
        var form = document.getElementById('divArama');
        if (!form || !originalSearchParent) return;

        if (originalSearchNext && originalSearchNext.parentNode === originalSearchParent) {
            originalSearchParent.insertBefore(form, originalSearchNext);
        } else {
            originalSearchParent.appendChild(form);
        }
    }

    function resetNativeSearchState() {
        var topSearch = document.getElementById('divTopProductSearch');
        if (!topSearch) return;
        topSearch.classList.remove('dropactive', 'active', 'opened', 'open');
        topSearch.removeAttribute('style');
    }

    function openModal(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
            if (event.stopImmediatePropagation) event.stopImmediatePropagation();
        }

        injectStyles();
        var modal = createModal();
        if (!prepareSearchForm()) return;

        document.body.classList.add(OPEN_CLASS);
        modal.classList.add('is-active');
        modal.setAttribute('aria-hidden', 'false');
        watchNativeResults();
        resetNativeSearchState();

        setTimeout(function () {
            var input = document.getElementById('txtbxArama');
            if (input) input.focus();
        }, 40);
    }

    function closeModal() {
        var modal = document.getElementById(MODAL_ID);
        if (!modal) return;

        document.body.classList.remove(OPEN_CLASS);
        modal.classList.remove('is-active');
        modal.setAttribute('aria-hidden', 'true');
        setResultsMode(false);
        stopWatchingNativeResults();
        restoreSearchForm();
        resetNativeSearchState();
    }

    function scheduleSearch(keyword) {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
            performSearch(keyword);
        }, 260);
    }

    function performSearch(keyword) {
        keyword = String(keyword || '').trim();
        lastKeyword = keyword;

        if (keyword.length < 2) {
            setResultsMode(false);
            var results = document.getElementById(RESULTS_ID);
            if (results) results.innerHTML = '';
            return;
        }

        if (abortController) abortController.abort();
        abortController = window.AbortController ? new AbortController() : null;

        renderEmpty('Sonuçlar hazırlanıyor...');

        fetch(API_URL + encodeURIComponent(keyword), {
            signal: abortController ? abortController.signal : undefined,
            credentials: 'same-origin'
        })
            .then(function (response) {
                if (!response.ok) throw new Error('Search failed');
                return response.json();
            })
            .then(function (data) {
                renderResults(data, keyword);
            })
            .catch(function (error) {
                if (error && error.name === 'AbortError') return;
                renderEmpty('Sonuç alınamadı. Enter ile klasik aramaya devam edebilirsiniz.');
            });
    }

    function submitSearch() {
        var input = document.getElementById('txtbxArama');
        var keyword = input && input.value ? input.value.trim() : '';

        if (!keyword) {
            if (input) input.focus();
            return;
        }

        if (typeof window.ProductSearchTop === 'function') {
            window.ProductSearchTop();
        } else {
            window.location.href = '/arama?q=' + encodeURIComponent(keyword);
        }
    }

    function setResultsMode(active) {
        var visual = document.querySelector('#' + MODAL_ID + ' .mo-search-visual');
        if (!visual) return;
        visual.classList.toggle('has-results', !!active);
    }

    function renderEmpty(message) {
        var results = document.getElementById(RESULTS_ID);
        if (!results) return;
        setResultsMode(true);
        results.innerHTML = '<div class="mo-result-empty">' + escapeHtml(message) + '</div>';
    }

    function categoryName(category) {
        if (!category) return '';
        if (typeof category === 'string') return category;
        var name = category.name || category.categoryName || category.categoryNameText || category.definition || category.text || category.title || category.tanim || category.adi || category.categoryPath || '';
        if (name) return name;

        var url = category.url || category.link || category.href || category.seoUrl || category.categoryUrl || category.path || '';
        if (!url) return '';
        return String(url)
            .split('?')[0]
            .split('/').filter(Boolean).pop()
            .replace(/[-_]+/g, ' ')
            .replace(/\b\w/g, function (letter) { return letter.toUpperCase(); });
    }

    function categoryUrl(category) {
        if (typeof category === 'string') return normalizeUrl(category);
        return normalizeUrl(category.url || category.link || category.href || category.seoUrl || category.categoryUrl || category.path || '#');
    }

    function resultCollection(data, keys) {
        var sources = [data, data && data.data, data && data.result, data && data.resultData];
        for (var i = 0; i < sources.length; i += 1) {
            var source = sources[i];
            if (!source) continue;
            for (var j = 0; j < keys.length; j += 1) {
                var value = source[keys[j]];
                if (Array.isArray(value)) return value;
                if (value && typeof value === 'object') {
                    if (Array.isArray(value.items)) return value.items;
                    if (Array.isArray(value.results)) return value.results;
                    if (Array.isArray(value.list)) return value.list;
                }
            }
        }
        return [];
    }

    function renderResults(data, keyword) {
        var results = document.getElementById(RESULTS_ID);
        if (!results) return;

        var categories = resultCollection(data, ['categories', 'Categories', 'categoryList', 'categoryItems', 'kategoriler']).slice(0, 9);
        var directProducts = resultCollection(data, ['products', 'Products', 'product', 'productList', 'productItems', 'items', 'results', 'urunler', 'urunListesi']);
        var nestedProducts = [];

        categories.forEach(function (category) {
            if (!category || !Array.isArray(category.products)) return;
            nestedProducts = nestedProducts.concat(category.products);
        });

        var productMap = {};
        var products = directProducts.concat(nestedProducts).filter(function (product) {
            if (!product || typeof product !== 'object') return false;
            var key = product.productId || product.id || product.url || product.productName || product.urunAdi;
            if (key && productMap[key]) return false;
            if (key) productMap[key] = true;
            return true;
        }).slice(0, 16);

        if (!products.length && !categories.length) {
            renderEmpty('“' + keyword + '” için sonuç bulunamadı.');
            return;
        }

        setResultsMode(true);

        var headingHtml = [
            '<div class="mo-result-head">',
            '  <span>Arama sonucu</span>',
            '  <strong>“' + escapeHtml(keyword) + '” için bulunanlar</strong>',
            '</div>'
        ].join('');

        var categoriesHtml = categories.length ? [
            '<aside>',
            '  <h3 class="mo-result-title">Kategoriler</h3>',
            '  <div class="mo-category-list">',
            categories.map(function (category) {
                return '<a class="mo-category-link" href="' + escapeHtml(categoryUrl(category)) + '">' + escapeHtml(categoryName(category)) + '</a>';
            }).join(''),
            '  </div>',
            '</aside>'
        ].join('') : '';

        var productsHtml = products.length ? [
            '<section>',
            '  <h3 class="mo-result-title">Ürünler</h3>',
            '  <div class="mo-product-grid">',
            products.map(function (product) {
                var productName = product.productName || product.urunAdi || product.name || '';
                var productPrice = product.price || product.satisFiyatiStr || product.satisFiyati || '';
                var productOldPrice = product.oldPrice || product.piyasaFiyatiStr || '';
                var oldPrice = productOldPrice && productOldPrice !== productPrice ? '<span class="mo-product-old-price">' + escapeHtml(productOldPrice) + '</span>' : '';
                var image = productImage(product);
                return [
                    '<a class="mo-product-card" href="' + escapeHtml(normalizeUrl(product.url || product.productUrl || product.seoUrl)) + '">',
                    image ? '  <img class="mo-product-image" src="' + escapeHtml(image) + '" alt="' + escapeHtml(productName) + '" loading="eager" onerror="this.removeAttribute(\'src\'); this.classList.add(\'is-missing\');">' : '  <span class="mo-product-image" aria-hidden="true"></span>',
                    '  <span>',
                    '    <span class="mo-product-category">' + escapeHtml(product.categoryName || product.category || product.categoryPath || 'Motif İstanbul') + '</span>',
                    '    <strong class="mo-product-name">' + escapeHtml(productName) + '</strong>',
                    '    <span class="mo-product-price">' + escapeHtml(productPrice) + oldPrice + '</span>',
                    '  </span>',
                    '</a>'
                ].join('');
            }).join(''),
            '  </div>',
            '</section>'
        ].join('') : '';

        results.innerHTML = headingHtml + '<div class="mo-result-layout">' + categoriesHtml + productsHtml + '</div>';
    }

    function parseNativeProducts(root) {
        if (!root) return [];

        return Array.prototype.slice.call(root.querySelectorAll('.products > li, .productItem')).map(function (item) {
            var link = item.querySelector('a');
            var image = item.querySelector('img');
            var name = item.querySelector('.ticimax-search-product-info-name') || item.querySelector('.product-name, .productName, .productDetailLink');
            var category = item.querySelector('.ticimax-search-product-info-category') || item.querySelector('.category, .productCategory');
            var price = item.querySelector('.ticimax-search-product-info-price') || item.querySelector('.price, .productPrice, .discountPrice');

            return {
                url: link ? link.getAttribute('href') : '',
                image: image ? (
                    image.getAttribute('data-original') ||
                    image.getAttribute('data-src') ||
                    image.getAttribute('data-lazy') ||
                    image.getAttribute('src')
                ) : '',
                productName: name ? name.textContent.trim() : '',
                categoryName: category ? category.textContent.trim() : '',
                price: price ? price.textContent.trim() : '',
                oldPrice: ''
            };
        }).filter(function (product) {
            return product.productName;
        });
    }

    function parseNativeCategories(root) {
        if (!root) return [];

        return Array.prototype.slice.call(root.querySelectorAll('.categories > li a, .categoryList a')).map(function (link) {
            return {
                name: link.textContent.trim(),
                url: link.getAttribute('href') || ''
            };
        }).filter(function (category) {
            return category.name;
        });
    }

    function transformNativeResults() {
        if (!document.body.classList.contains(OPEN_CLASS)) return;

        var nativeRoot = document.getElementById('divAramaSonuc');
        if (!nativeRoot || nativeRoot.getAttribute('data-mo-parsed') === 'true') return;

        var products = parseNativeProducts(nativeRoot);
        var categories = parseNativeCategories(nativeRoot);

        if (products.length || categories.length) {
            nativeRoot.setAttribute('data-mo-parsed', 'true');
            renderResults({ products: products, categories: categories }, lastKeyword || 'Arama');
        }

        nativeRoot.style.setProperty('display', 'none', 'important');
    }

    function watchNativeResults() {
        if (nativeObserver || !window.MutationObserver || !document.body) return;

        nativeObserver = new MutationObserver(function () {
            transformNativeResults();
        });

        nativeObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function stopWatchingNativeResults() {
        if (!nativeObserver) return;
        nativeObserver.disconnect();
        nativeObserver = null;
    }

    function bindOpenTriggers() {
        document.addEventListener('click', function (event) {
            if (document.body.classList.contains(OPEN_CLASS)) return;

            var trigger = event.target.closest('#divTopProductSearch, #txtbxArama, .aramaButonu, .searchClick');
            if (!trigger) return;

            openModal(event);
        }, true);

        document.addEventListener('focusin', function (event) {
            if (document.body.classList.contains(OPEN_CLASS)) return;
            if (event.target && event.target.id === 'txtbxArama') openModal(event);
        }, true);
    }

    function init() {
        injectStyles();
        createModal();
        bindOpenTriggers();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
