(function () {
    'use strict';

    var STYLE_ID = 'moFilterStyles';
    var VERSION = '20261008-4';
    var collapsedPanels = new Set();
    var updateQueued = false;
    var initialized = false;
    var viewType = 4;
    var filterSignature;
    var sliders = new WeakSet();
    var priceFormat = new Intl.NumberFormat('tr-TR', { style:'currency', currency:'TRY', minimumFractionDigits:2, maximumFractionDigits:2 });
    var colors = {
        'BEJ':'#e6d7bf', 'TURKUAZ':'#42b7bb', 'LACİVERT':'#03235e',
        'KOYU LACİVERT':'#17233d', 'BORDO':'#7e243e', 'SİYAH':'#222222',
        'BAKIR':'#b87851', 'MAVİ':'#478dc0', 'KIRMIZI':'#c94747',
        'TURUNCU':'#df884a', 'PEMBE':'#dc9bb6', 'KOYU MAVİ':'#2d5485',
        'KAHVERENGİ':'#805a46', 'ALTIN':'#c4a454', 'TABA':'#b68354',
        'BEYAZ':'#ffffff', 'GRİ':'#929b9f', 'YEŞİL':'#5b8a69',
        'SARI':'#e3c65a', 'MOR':'#907297', 'EKRU':'#f1eadc',
        'GÜMÜŞ':'#bdc3ca', 'HAKİ':'#7e8963', 'FÜME':'#5c656b',
        'MÜRDÜM':'#75445f', 'KOYU MÜRDÜM':'#4b2b40',
        'PETROL':'#23616b', 'KOYU KAHVERENGİ':'#4e352c',
        'TEN':'#e2bea6', 'KREM':'#f4ecd7', 'GOLD':'#c4a454',
        'KAHVE':'#805a46', 'LACİ':'#03235e', 'KOYU LACİ':'#17233d',
        'AÇIK MAVİ':'#a7cfe7', 'ANTRASİT':'#40474c', 'ANTARİST':'#40474c'
    };
    var normalizedColors = {};
    Object.keys(colors).forEach(function (name) { normalizedColors[normalizeColorName(name)] = colors[name]; });

    function normalizeColorName(name) {
        return name.trim().toLocaleUpperCase('tr-TR').normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').replace(/\u0131/g, 'I')
            .replace(/\s+/g, ' ');
    }

    function colorFill(name) {
        var key = normalizeColorName(name);
        if (normalizedColors[key]) return normalizedColors[key];
        if (key === 'MIX') return 'conic-gradient(#c94747 0% 25%, #e3c65a 25% 50%, #5b8a69 50% 75%, #478dc0 75% 100%)';
        var parts = key.split(/[-/+,\u2010-\u2015\u2212]/).map(function (part) { return part.trim(); }).filter(Boolean);
        if (!parts.length || !parts.every(function (part) { return normalizedColors[part]; })) return '';
        if (parts.length === 1) return normalizedColors[parts[0]];
        return 'linear-gradient(90deg, ' + parts.map(function (part, index) {
            return normalizedColors[part] + ' ' + (index * 100 / parts.length) + '% ' + ((index + 1) * 100 / parts.length) + '%';
        }).join(', ') + ')';
    }

    function addStyles() {
        if (document.getElementById(STYLE_ID)) return;
        var font = document.createElement('link');
        font.rel = 'stylesheet';
        font.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap';
        font.setAttribute('data-mo-filter-font', 'true');
        document.head.appendChild(font);
        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            .mo-filter-ui, .mo-filter-search {
                --mo-filter-navy:#03235e;
                --mo-filter-teal:#0c4853;
                --mo-filter-cyan:#4fa0c9;
                --mo-filter-ink:#25394a;
                --mo-filter-muted:#71808c;
                --mo-filter-line:#dce5e9;
                color:var(--mo-filter-ink);
                font-family:'DM Sans',Arial,sans-serif;
                letter-spacing:0;
            }
            .mo-filter-ui *, .mo-filter-search * { box-sizing:border-box; letter-spacing:0; }
            body.mo-filter-ready #divLeftBlock .mo-filter-surface { float:none; width:100%; margin:0 0 24px; padding:0; border:0; border-radius:0; background:#fff; box-shadow:none; }
            body.mo-filter-ready #divLeftBlock .mo-filter-surface > .Block_Title {
                display:flex!important; align-items:center; height:54px!important; min-height:54px; margin:0!important; padding:12px 16px!important; line-height:normal!important;
                border:0!important; border-bottom:2px solid var(--mo-filter-cyan)!important; border-radius:0!important;
                background:var(--mo-filter-navy)!important; color:#fff!important; text-align:left;
            }
            .mo-filter-surface > .Block_Title::before { content:'\\f1de'; margin-right:10px; font-family:'FontAwesome'; font-size:16px; font-weight:400; color:#a2d9e5; }
            body.mo-filter-ready #divLeftBlock .mo-filter-surface > .Block_Title span { color:inherit!important; font:600 15px 'DM Sans',Arial,sans-serif!important; text-transform:none; }
            body.mo-filter-ready #divLeftBlock .mo-filter-surface > .Block_Text { display:flow-root; float:none!important; width:100%; margin:0; padding:0; border:0; background:#fff; }
            body.mo-filter-ready #divLeftBlock .mo-filter-surface .category-vertical-filters { float:none!important; width:100%; margin:0!important; padding:0 16px!important; overflow:visible; border:0; border-radius:0; background:#fff; text-align:left; }
            body.mo-filter-ready #divLeftBlock .mo-filter-surface .vertical-filter-panel,
            body.mo-filter-ready #divSayfalamaUst .mo-filter-drawer .vertical-filter-panel {
                float:none!important; width:100%!important; min-width:0!important; margin:0!important; padding:14px 0!important;
                border:0!important; border-bottom:1px solid var(--mo-filter-line)!important; border-radius:0!important; background:transparent!important; box-shadow:none!important;
            }
            .mo-filter-ui .vertical-filter-panel:last-child { border-bottom:0!important; }
            .mo-filter-ui .panel-heading { float:none!important; width:100%; margin:0!important; padding:0!important; border:0!important; background:transparent!important; }
            body.mo-filter-ready .mo-filter-ui .panel-heading .panel-title {
                position:relative; display:flex!important; float:none!important; align-items:center; width:100%; min-height:38px; margin:0!important; padding:6px 26px 6px 0!important;
                color:var(--mo-filter-navy)!important; font:700 13px/1.5 'DM Sans',Arial,sans-serif!important; text-align:left; text-transform:none!important; text-decoration:none!important;
            }
            .mo-filter-price-label { display:block; padding:6px 0; color:var(--mo-filter-navy); font:700 13px/1.5 'DM Sans',Arial,sans-serif; text-align:left; text-transform:none; }
            body.mo-filter-ready .mo-filter-ui .panel-title::after { content:'\\f107'!important; display:block!important; position:absolute!important; top:50%!important; right:1px!important; margin:0!important; transform:translateY(-50%); color:var(--mo-filter-muted)!important; font:400 16px/1 'FontAwesome'!important; }
            body.mo-filter-ready .mo-filter-ui .panel-title[aria-expanded='true']::after { content:'\\f106'!important; color:var(--mo-filter-teal)!important; }
            .mo-filter-surface .mo-filter-collapsed > .list-group,
            .mo-filter-surface .mo-filter-collapsed > .panel-search,
            .mo-filter-surface .mo-filter-collapsed > .FiyatSlider,
            .mo-filter-surface .mo-filter-collapsed > .FiyatTextBox { display:none!important; }
            body.mo-filter-ready .mo-filter-ui .vertical-filter-panel .list-group {
                float:none!important; width:100%!important; max-height:300px; margin:4px 0 0!important; padding:0 3px 0 0!important;
                border:0!important; border-radius:0; box-shadow:none!important; background:transparent!important; overflow-x:hidden; overflow-y:auto; scrollbar-width:thin; scrollbar-color:#c2d2da transparent;
            }
            .mo-filter-ui .list-group::after { content:''; display:table; clear:both; }
            body.mo-filter-ready .mo-filter-ui .vertical-filter-panel .liFiltreElement {
                position:relative; float:none!important; width:100%!important; height:auto!important; min-height:36px; margin:0 0 3px!important; padding:0!important;
                border:0!important; border-radius:4px; background-color:transparent!important; background-image:none!important; white-space:normal; overflow:visible; cursor:pointer;
            }
            body.mo-filter-ready .mo-filter-ui .liFiltreElement > a {
                display:flex!important; float:none!important; align-items:center; gap:8px; width:100%!important; max-width:none!important; min-height:36px; margin:0!important; padding:8px 5px 8px 27px!important;
                color:var(--mo-filter-ink)!important; font:400 12px/1.5 'DM Sans',Arial,sans-serif!important; text-transform:none; text-decoration:none!important;
                white-space:normal!important; overflow:visible!important; overflow-wrap:anywhere; text-overflow:clip;
            }
            body.mo-filter-ready .mo-filter-ui .liFiltreElement::before {
                content:''!important; position:absolute!important; display:block!important; float:none!important; top:11px!important; left:3px!important; width:14px!important; height:14px!important; margin:0!important;
                border:1px solid #bacbd3!important; border-radius:3px!important; background:#fff!important; color:#fff!important; font:400 10px/12px 'FontAwesome'!important; text-align:center; pointer-events:none;
            }
            body.mo-filter-ready .mo-filter-ui .liFiltreElement.selected { background-color:#edf5f7!important; }
            body.mo-filter-ready .mo-filter-ui .liFiltreElement.selected::before { content:'\\f00c'!important; border-color:var(--mo-filter-teal)!important; background:var(--mo-filter-teal)!important; }
            body.mo-filter-ready .mo-filter-ui .liFiltreElement.selected > a { color:var(--mo-filter-teal)!important; font-weight:600!important; }
            body.mo-filter-ready .mo-filter-ui .list-group-item-image > a::after { display:none!important; }
            .mo-filter-ui .liFiltreElement.deactive { opacity:.45; cursor:default; }
            .mo-filter-ui .filterProductCount { flex-shrink:0; margin-left:auto; color:var(--mo-filter-muted); font-size:11px; white-space:nowrap; }
            .mo-filter-swatch { display:block; flex:0 0 14px; width:14px; height:14px; border:1px solid rgba(16,35,56,.16); border-radius:50%; background:var(--mo-filter-swatch); background-size:cover; background-position:center; }
            body.mo-filter-ready .mo-filter-ui .mo-filter-size > .list-group:not(.dropdown),
            body.mo-filter-ready .mo-filter-drawer .mo-filter-size > .panel-heading.active ~ .list-group { display:grid!important; grid-template-columns:repeat(auto-fill,minmax(40px,1fr)); gap:6px; overflow:visible; }
            body.mo-filter-ready .mo-filter-ui .mo-filter-size .liFiltreElement { min-height:40px; margin:0!important; border:1px solid var(--mo-filter-line)!important; border-radius:4px; background:#fff!important; }
            body.mo-filter-ready .mo-filter-ui .mo-filter-size .liFiltreElement::before { display:none!important; }
            body.mo-filter-ready .mo-filter-ui .mo-filter-size .liFiltreElement > a { justify-content:center; min-height:40px; padding:8px 3px!important; font-weight:500!important; }
            body.mo-filter-ready .mo-filter-ui .mo-filter-size .liFiltreElement.selected { border-color:var(--mo-filter-navy)!important; background:var(--mo-filter-navy)!important; }
            body.mo-filter-ready .mo-filter-ui .mo-filter-size .liFiltreElement.selected > a { color:#fff!important; }
            body.mo-filter-ready .mo-filter-ui .mo-filter-size.mo-filter-collapsed > .list-group { display:none!important; }
            .mo-filter-ui .div-kategori .list-group li { float:none!important; width:100%; margin:0!important; padding:0; }
            body.mo-filter-ready .mo-filter-ui .div-kategori .list-group li > a { display:block; float:none!important; width:100%; max-width:100%!important; min-height:36px; margin:0!important; padding:8px 6px!important; color:var(--mo-filter-ink)!important; font:400 12px/1.5 'DM Sans',Arial,sans-serif!important; white-space:normal!important; overflow-wrap:anywhere; text-decoration:none; }
            .mo-filter-ui .div-kategori .list-group li > ul { float:none!important; width:auto!important; margin:2px 0 6px 10px!important; padding-left:10px!important; border-left:1px solid var(--mo-filter-line); }
            .mo-filter-ui .div-kategori .list-group a[aria-current='page'] { color:var(--mo-filter-teal)!important; font-weight:700!important; background:#edf5f7; border-radius:4px; }
            .mo-filter-ui .panel-search { float:none!important; width:100%; margin:6px 0 10px!important; padding:0!important; }
            .mo-filter-ui .panel-search input,
            .mo-filter-ui .FiyatTextBox input,
            .mo-filter-search input { width:100%!important; min-width:0; height:40px; margin:0!important; padding:9px 11px!important; border:1px solid #cddce3!important; border-radius:4px!important; color:var(--mo-filter-ink)!important; background:#f7fafb!important; font:400 12px 'DM Sans',Arial,sans-serif!important; box-shadow:none; }
            .mo-filter-ui .FiyatTextBox { float:none!important; width:100%; margin:6px 0 0!important; padding:0!important; }
            .mo-filter-ui .FiyatTextBox input { display:inline-block; float:none!important; width:calc(50% - 5px)!important; }
            .mo-filter-ui .FiyatTextBox input.filterPrice2 { margin-left:6px!important; }
            .mo-filter-ui .FiyatTextBox button { width:100%!important; min-height:40px; margin:8px 0 0!important; padding:8px!important; border:0!important; border-radius:4px!important; background:var(--mo-filter-teal)!important; color:#fff!important; font:600 12px 'DM Sans',Arial,sans-serif!important; cursor:pointer; }
            .mo-filter-ui .FiyatSlider { float:none!important; width:100%; padding:10px 0 0; }
            .mo-price-values { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; margin-bottom:20px; }
            .mo-price-value { min-width:0; padding:9px 10px; border:1px solid #dce5e9; border-bottom:2px solid #0c4853; border-radius:4px; background:#f7fafb; }
            .mo-price-value span { display:block; color:#71808c; font:500 10px/1.4 'DM Sans',Arial,sans-serif; }
            .mo-price-value output { display:block; margin-top:3px; color:#03235e; font:700 14px/1.4 'DM Sans',Arial,sans-serif; font-variant-numeric:tabular-nums; overflow-wrap:anywhere; }
            body.mo-filter-ready .mo-filter-ui .slider-range { float:none!important; width:calc(100% - 24px)!important; height:8px!important; margin:10px 12px 20px!important; border:0!important; border-radius:4px!important; background:#e2e9ed!important; }
            body.mo-filter-ready .mo-filter-ui .slider-range .ui-slider-range { height:8px!important; margin:0!important; border-radius:4px!important; background:var(--mo-filter-teal)!important; }
            body.mo-filter-ready .mo-filter-ui .slider-range .ui-slider-handle { display:flex; align-items:center; justify-content:center; width:24px!important; height:28px!important; top:-10px!important; margin-left:-12px!important; border:2px solid #fff!important; border-radius:5px!important; background:var(--mo-filter-navy)!important; box-shadow:0 1px 4px rgba(3,35,94,.25); cursor:ew-resize; }
            .mo-filter-ui .ui-slider-handle::after { content:''; width:5px; height:10px; border-left:1px solid #a2d9e5; border-right:1px solid #a2d9e5; }
            .mo-filter-ui .mo-price-ready > .amount { display:none!important; }
            body.mo-filter-ready .mo-filter-ui .amount { float:none!important; width:100%; margin:0!important; padding:0!important; color:var(--mo-filter-muted)!important; font:500 12px/1.5 'DM Sans',Arial,sans-serif!important; text-align:left!important; }
            .mo-filter-ui a:focus-visible, .mo-filter-ui input:focus-visible, .mo-filter-ui button:focus-visible,
            .mo-filter-ui .closeFilt:focus-visible, .mo-filter-search input:focus-visible, .mo-filter-search button:focus-visible { outline:2px solid var(--mo-filter-cyan)!important; outline-offset:2px; }
            body.mo-filter-ready #divLeftBlock .mo-filter-search { margin:0 0 24px; padding:16px; border:0; border-top:1px solid var(--mo-filter-line); border-radius:0; background:#f3f8fa; }
            body.mo-filter-ready #divLeftBlock .mo-filter-search .Block_Title { display:block!important; margin:0 0 12px; padding:0; border:0; color:var(--mo-filter-navy); background:transparent; text-align:left; }
            .mo-filter-search .Block_Title span { font:700 13px 'DM Sans',Arial,sans-serif; color:inherit; text-transform:none; }
            .mo-filter-search .Block_Text { display:flow-root; float:none!important; width:100%; }
            .mo-filter-search #ulBlokUrunArama { display:grid; grid-template-columns:minmax(0,1fr) 40px; gap:8px; margin:0; padding:0; list-style:none; }
            .mo-filter-search #ulBlokUrunArama > li { float:none; width:auto; min-width:0; margin:0; padding:0; }
            .mo-filter-search #btnBlokUrunAra { display:flex; align-items:center; justify-content:center; width:40px; height:40px; min-height:0; margin:0; padding:0; border:0; border-radius:4px; background:var(--mo-filter-teal); color:#fff; font-size:15px; }
            body.mo-filter-ready .categoryContainer .blockSelect { display:flex!important; gap:4px; padding:3px!important; border:1px solid #dce5e9; border-radius:5px; background:#f7fafb!important; }
            body.mo-filter-ready .categoryContainer .blockSelect a.btnCatSorting:not(.sort_2) { display:flex; justify-content:center; align-items:center; width:38px!important; height:36px!important; margin:0!important; padding:0!important; border:0!important; border-radius:3px; background:transparent; color:#71808c; }
            body.mo-filter-ready .categoryContainer .blockSelect a.Active { background:#03235e!important; color:#fff!important; }
            body.mo-filter-ready .categoryContainer .blockSelect a i { float:none!important; color:inherit!important; font-size:16px!important; line-height:1!important; }
            .mo-view-glyph { display:grid; grid-template-columns:repeat(var(--mo-view-columns),3px); gap:2px; }
            .mo-view-glyph b { display:block; width:3px; height:12px; border-radius:1px; background:currentColor; }
            body.mo-filter-ready #divSayfalamaUst .sortingContent { background:#f7fafb!important; border:0!important; border-top:1px solid #dce5e9!important; border-bottom:1px solid #dce5e9!important; border-radius:0!important; padding:10px!important; }
            body.mo-filter-ready #divSayfalamaUst .sortingContent .sortingButton { float:none!important; width:auto; margin:0!important; padding:0!important; border:0!important; }
            body.mo-filter-ready #divSayfalamaUst .sortingContent .sortingButton > a { display:flex; align-items:center; gap:7px; min-height:38px; margin:0; padding:8px 10px!important; border:1px solid transparent; border-radius:4px; background:transparent; color:#25394a; text-decoration:none!important; text-align:left; }
            body.mo-filter-ready #divSayfalamaUst .sortingContent .sortingButton > a span { color:inherit; font:500 11px/1.5 'DM Sans',Arial,sans-serif!important; text-transform:none!important; white-space:normal; }
            body.mo-filter-ready #divSayfalamaUst .brandlistselection .sortingContent .sortingButton > a::before { content:attr(data-mo-sort-icon)!important; display:block!important; flex-shrink:0; color:#4f8192; font:400 14px/1 'FontAwesome'; }
            body.mo-filter-ready #divSayfalamaUst .brandlistselection .sortingContent .sortingButton > a.selected { border-color:#bdd5dd; background:#e6f1f4!important; color:#0c4853!important; text-decoration:none; }
            body.mo-filter-ready #divSayfalamaUst .sortingContent .sortingButton > a.selected span { font-weight:700!important; }
            body.mo-filter-ready #divSayfalamaUst .sortingContent .FiltrelemeUrunAdet { display:flex; align-items:center; justify-content:flex-end; gap:12px; float:none; min-width:0; margin:0 0 0 auto!important; padding:0; }
            body.mo-filter-ready #divSayfalamaUst .sortingContent .FiltrelemeUrunAdet > span { float:none; width:auto; color:#71808c; font:500 11px/1.5 'DM Sans',Arial,sans-serif; white-space:nowrap; }
            body.mo-filter-ready #divSayfalamaUst .sortingContent .blockSelect { float:none!important; margin:0!important; flex-shrink:0; }
            body.mo-filter-ready #divSayfalamaUst .filterDeleteContent { margin:0 0 12px; }
            body.mo-filter-ready #divSayfalamaUst .filterDeleteContent .appliedFilter { border:1px solid #dce5e9; border-radius:4px; background:#f7fafb; overflow:hidden; }
            body.mo-filter-ready #divSayfalamaUst .filterDeleteContent .filter-content span { color:#25394a; font:500 11px/34px 'DM Sans',Arial,sans-serif; padding:0 8px; }
            body.mo-filter-ready #divSayfalamaUst .filterDeleteContent .FiltrelemeKaldir { border:0; }
            body.mo-filter-ready #divSayfalamaUst .filterDeleteContent .appliedFilter.FiltrelemeKaldir > a { display:flex; align-items:center; justify-content:center; gap:8px; min-height:36px; padding:8px 12px!important; border:1px solid #0c4853; border-radius:4px; background:#0c4853!important; color:#fff!important; text-decoration:none; text-transform:none!important; }
            body.mo-filter-ready #divSayfalamaUst .filterDeleteContent .FiltrelemeKaldir > a::before { content:'\\f12d'; font:400 14px/1 'FontAwesome'; }
            body.mo-filter-ready #divSayfalamaUst .filterDeleteContent .appliedFilter.FiltrelemeKaldir > a span { display:block; float:none; width:auto; margin:0; padding:0; background:transparent!important; color:inherit!important; font:600 12px/1.5 'DM Sans',Arial,sans-serif!important; text-transform:none!important; }
            body.mo-filter-ready #divSayfalamaUst .mo-filter-drawer .FiltreUst > a.active { display:flex; align-items:center; justify-content:center; min-width:40px; min-height:40px; border:1px solid #6685aa; border-radius:4px; background:#173c70; }
            body.mo-filter-ready #divSayfalamaUst .mo-filter-drawer .FiltreUst > a i { margin:0; font-size:16px; }
            body.mo-filter-ready #divSayfalamaUst .sortingContent a:focus-visible, body.mo-filter-ready #divSayfalamaUst .filterDeleteContent a:focus-visible { outline:2px solid #4fa0c9; outline-offset:2px; }
            @media(min-width:1042px) {
                body.mo-filter-ready #divSayfalamaUst .sortingContent { display:flex!important; flex-wrap:wrap; align-items:center; gap:6px; }
            }
            @media(max-width:1041px) {
                body.mo-filter-ready #divSayfalamaUst .sortingContent .sortingButton { width:100%; }
                body.mo-filter-ready #divSayfalamaUst .sortingContent .sortingButton > a { min-height:44px; padding:12px!important; border-bottom:1px solid #dce5e9; }
                body.mo-filter-ready #divSayfalamaUst .sortingContent .sortingButton > a span { font-size:12px!important; }
                body.mo-filter-ready #divSayfalamaUst .mobilSiralamBtn { border:1px solid #0c4853!important; border-radius:4px; background:#0c4853!important; color:#fff; font:600 13px/44px 'DM Sans',Arial,sans-serif; }
            }
            body.mo-filter-ready #ProductPageProductList .productItem:not(.isBanner) { border:1px solid #e1e8eb; border-radius:5px; background:#fff; overflow:hidden; }
            body.mo-filter-ready #ProductPageProductList .productDetail { display:flow-root; float:none!important; clear:both; width:auto!important; max-width:none!important; padding:12px; text-align:left; }
            body.mo-filter-ready #ProductPageProductList .productName { margin:8px 0!important; padding:0!important; }
            body.mo-filter-ready #ProductPageProductList .productName a { height:40px!important; font:500 13px/20px 'DM Sans',Arial,sans-serif!important; color:#25394a; white-space:normal!important; display:-webkit-box!important; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
            body.mo-filter-ready #ProductPageProductList .productStokKodu, body.mo-filter-ready #ProductPageProductList .productSatisBirimi { float:none!important; width:100%; color:#71808c; font:400 11px/1.5 'DM Sans',Arial,sans-serif; }
            body.mo-filter-ready #ProductPageProductList .productPrice { display:flex!important; align-items:center; flex-wrap:wrap; clear:both; gap:6px; float:none!important; width:100%; height:auto!important; min-height:26px; text-align:left; }
            body.mo-filter-ready #ProductPageProductList .discountPrice span { color:#03235e; font:700 19px/1.4 'DM Sans',Arial,sans-serif; }
            body.mo-filter-ready #ProductPageProductList .cargoIcon { position:static!important; display:inline-flex!important; align-items:center; justify-content:center; gap:6px; width:auto; max-width:100%; min-height:28px; margin:0; padding:5px 9px; border:0; border-left:3px solid #4fa0c9; border-radius:3px; background:#0c4853; color:#fff; font:700 11px/16px 'DM Sans',Arial,sans-serif; text-align:left; white-space:normal; overflow-wrap:anywhere; box-shadow:none; }
            body.mo-filter-ready #ProductPageProductList .cargoIcon::before { content:'\\f0d1'; flex-shrink:0; font:400 14px/1 'FontAwesome'; color:#b9e9f2; }
            body.mo-filter-ready #ProductPageProductList .productIcon.mo-product-overlay { position:absolute; top:0; left:0; right:auto; bottom:auto; width:100%; height:0; padding-bottom:150%; pointer-events:none; }
            body.mo-filter-ready #ProductPageProductList.pr_hrz .productIcon.mo-product-overlay { position:absolute; width:180px; height:216px; padding:0; }
            body.mo-filter-ready #ProductPageProductList .urunListStokUyari,
            body.mo-filter-ready #ProductPageProductList .urunListSonUrun { display:inline-flex!important; align-items:center; gap:6px; position:absolute; top:10px; bottom:auto; left:10px; right:auto; width:auto; max-width:calc(100% - 20px); height:auto; min-height:28px; margin:0; padding:6px 9px; box-sizing:border-box; border:1px solid #80333f; border-radius:4px; background:#963e4b; color:#fff; font:600 11px/1.4 'DM Sans',Arial,sans-serif; text-align:left; overflow-wrap:anywhere; z-index:8; }
            body.mo-filter-ready #ProductPageProductList .urunListStokUyari::before,
            body.mo-filter-ready #ProductPageProductList .urunListSonUrun::before { content:'\\f071'; flex-shrink:0; color:#ffe1a4; font:400 12px/1 'FontAwesome'; }
            body.mo-filter-ready #ProductPageProductList .YeniUrun .urunListStokUyari,
            body.mo-filter-ready #ProductPageProductList .YeniUrun .urunListSonUrun { top:38px; }
            body.mo-filter-ready #ProductPageProductList .mo-product-actions { display:flex; align-items:center; justify-content:center; gap:7px; position:absolute; bottom:12px; left:0; right:0; width:max-content; max-width:100%; margin:0 auto; padding:5px; border:1px solid #dce5e9; border-radius:5px; background:rgba(255,255,255,.96); box-shadow:0 3px 12px rgba(3,35,94,.12); z-index:10; opacity:0; pointer-events:none; transform:translateY(6px); transition:opacity .15s ease,transform .15s ease; }
            body.mo-filter-ready #ProductPageProductList .productItem:hover .mo-product-actions,
            body.mo-filter-ready #ProductPageProductList .productItem:focus-within .mo-product-actions { opacity:1; pointer-events:auto; transform:none; }
            body.mo-filter-ready #ProductPageProductList .mo-product-actions > .favori,
            body.mo-filter-ready #ProductPageProductList .mo-product-actions > .mycartIcon,
            body.mo-filter-ready #ProductPageProductList .mo-product-actions > .examineIcon { display:block!important; position:static!important; opacity:1; width:38px; height:38px; margin:0; }
            body.mo-filter-ready #ProductPageProductList .mo-product-actions a { display:flex; align-items:center; justify-content:center; position:relative!important; top:auto; left:auto; float:none; width:38px; height:38px; margin:0; padding:0!important; border:1px solid #dce5e9; border-radius:4px; background:#fff; color:#03235e; font-size:0; text-decoration:none; cursor:pointer; }
            body.mo-filter-ready #ProductPageProductList .mo-product-actions .mycartIcon a { border-color:#0c4853; background:#0c4853; color:#fff; }
            body.mo-filter-ready #ProductPageProductList .mo-product-actions a::after { position:static!important; display:block; width:auto; height:auto; background:none!important; opacity:1!important; color:inherit!important; font:400 16px/1 'FontAwesome'; }
            body.mo-filter-ready #ProductPageProductList .mo-product-actions .mycartIcon a::after { content:'\\f217'; }
            body.mo-filter-ready #ProductPageProductList .mo-product-actions .favori a::after { content:'\\f004'; }
            body.mo-filter-ready #ProductPageProductList .mo-product-actions .examineIcon a::after { content:'\\f06e'; }
            body.mo-filter-ready #ProductPageProductList .mo-product-actions a::before { content:attr(data-mo-action-label); display:block; position:absolute; bottom:calc(100% + 10px); left:50%; transform:translateX(-50%); width:max-content; max-width:120px; padding:6px 8px; border-radius:4px; background:#03235e; color:#fff; font:500 11px/1.4 'DM Sans',Arial,sans-serif; text-align:center; opacity:0; pointer-events:none; }
            body.mo-filter-ready #ProductPageProductList .mo-product-actions a:hover::before,
            body.mo-filter-ready #ProductPageProductList .mo-product-actions a:focus-visible::before { opacity:1; }
            body.mo-filter-ready #ProductPageProductList .mo-product-actions a:focus-visible { outline:2px solid #4fa0c9; outline-offset:2px; }
            body.mo-filter-ready #ProductPageProductList .StokYok .mo-product-actions { display:none!important; }
            @media(max-width:1041px), (hover:none) {
                body.mo-filter-ready #ProductPageProductList .mo-product-actions { gap:5px; bottom:8px; padding:4px; opacity:1; pointer-events:auto; transform:none; }
                body.mo-filter-ready #ProductPageProductList .mo-product-actions > .favori,
                body.mo-filter-ready #ProductPageProductList .mo-product-actions > .mycartIcon,
                body.mo-filter-ready #ProductPageProductList .mo-product-actions > .examineIcon,
                body.mo-filter-ready #ProductPageProductList .mo-product-actions a { width:34px; height:36px; }
                body.mo-filter-ready #ProductPageProductList .mo-product-actions a::before { display:none; }
                body.mo-filter-ready #ProductPageProductList .urunListStokUyari,
                body.mo-filter-ready #ProductPageProductList .urunListSonUrun { top:7px; left:7px; max-width:calc(100% - 14px); padding:5px 7px; font-size:10px; }
                body.mo-filter-ready #ProductPageProductList.pr_hrz .mo-product-actions { gap:4px; padding:3px; }
                body.mo-filter-ready #ProductPageProductList.pr_hrz .productIcon.mo-product-overlay { width:110px; height:132px; }
                body.mo-filter-ready #ProductPageProductList.pr_hrz .mo-product-actions > .favori,
                body.mo-filter-ready #ProductPageProductList.pr_hrz .mo-product-actions > .mycartIcon,
                body.mo-filter-ready #ProductPageProductList.pr_hrz .mo-product-actions > .examineIcon,
                body.mo-filter-ready #ProductPageProductList.pr_hrz .mo-product-actions a { width:28px; height:34px; }
            }
            body.mo-filter-ready #ProductPageProductList.sort_4 .productDetail { padding:10px; }
            body.mo-filter-ready #ProductPageProductList.pr_hrz > .ItemOrj:not([data-wide="full"]) { width:100%!important; max-width:100%!important; flex:0 0 100%!important; }
            body.mo-filter-ready #ProductPageProductList.pr_hrz .productItem:not(.isBanner) { display:grid; grid-template-columns:180px minmax(0,1fr); align-items:center; width:100%; margin-bottom:16px; text-align:left; }
            body.mo-filter-ready #ProductPageProductList.pr_hrz .productImage { float:none!important; width:100%!important; height:auto; margin:0!important; border-right:1px solid #e1e8eb; }
            body.mo-filter-ready #ProductPageProductList.pr_hrz .productImage a { padding-bottom:120%!important; }
            body.mo-filter-ready #ProductPageProductList.pr_hrz .productDetail { clear:none; padding:20px; }
            body.mo-filter-ready #ProductPageProductList.pr_hrz .productName a { height:auto!important; min-height:40px; max-width:560px; font-size:15px!important; line-height:22px!important; }
            body.mo-filter-ready #ProductPageProductList.pr_hrz .productIcon { position:static; }
            .mo-filter-ready .blockSelect a:focus-visible { outline:2px solid #4fa0c9; outline-offset:2px; }
            @media(max-width:1024px) {
                body.mo-filter-ready #ProductPageProductList .productDetail { padding:9px; }
                body.mo-filter-ready #ProductPageProductList .cargoIcon { gap:4px; padding:4px 6px; font-size:10px; }
                body.mo-filter-ready #ProductPageProductList .discountPrice span { font-size:16px; }
                body.mo-filter-ready #ProductPageProductList.pr_hrz .productItem:not(.isBanner) { grid-template-columns:110px minmax(0,1fr); }
                body.mo-filter-ready #ProductPageProductList.pr_hrz .productDetail { padding:12px; }
                body.mo-filter-ready #ProductPageProductList.pr_hrz .productName a { font-size:12px!important; line-height:18px!important; }
            }
            @media(hover:hover) {
                body.mo-filter-ready #divSayfalamaUst .sortingContent .sortingButton > a:hover { background:#e6f1f4; color:#0c4853; }
                body.mo-filter-ready #divSayfalamaUst .filterDeleteContent .appliedFilter.FiltrelemeKaldir > a:hover { background:#03235e!important; border-color:#03235e; }
                body.mo-filter-ready #ProductPageProductList .mo-product-actions a:hover { border-color:#03235e; background:#03235e; color:#fff; }
                body.mo-filter-ready .categoryContainer .blockSelect a:hover { background:#e7f1f5; color:#03235e; }
                body.mo-filter-ready #ProductPageProductList .productItem:not(.isBanner):hover { border-color:#8fb8c7; }
                body.mo-filter-ready .mo-filter-ui .liFiltreElement:hover { background-color:#f2f7f9!important; }
                body.mo-filter-ready .mo-filter-ui .mo-filter-size .liFiltreElement.selected:hover { background:var(--mo-filter-navy)!important; }
                .mo-filter-ui .div-kategori .list-group a:hover { color:var(--mo-filter-teal)!important; background:#f2f7f9; border-radius:4px; }
            }
            @media(max-width:1024px) {
                body.mo-filter-ready #divSayfalamaUst .mo-filter-drawer { width:min(360px,calc(100vw - 24px))!important; height:100vh!important; height:100dvh!important; max-height:100dvh; padding:0 18px 24px!important; background:#fff!important; border:0!important; box-shadow:-10px 0 32px rgba(16,35,56,.12); }
                body.mo-filter-ready #divSayfalamaUst .mo-filter-drawer .FiltreUst { position:sticky!important; top:0; z-index:5; display:flex; align-items:center; gap:8px; float:none!important; width:calc(100% + 36px)!important; min-height:60px; margin:0 -18px 4px!important; padding:8px 12px!important; border-bottom:2px solid #4fa0c9; background:#03235e!important; color:#fff; font:600 15px 'DM Sans',Arial,sans-serif; }
                body.mo-filter-ready .mo-filter-drawer .FiltreUst > span { position:static!important; margin-right:auto; color:#fff; font:inherit; pointer-events:none; }
                body.mo-filter-ready .mo-filter-drawer .FiltreUst .closeFilt { display:flex; align-items:center; justify-content:center; flex-shrink:0; float:none; min-width:40px; min-height:40px; color:#fff; cursor:pointer; }
                body.mo-filter-ready .mo-filter-drawer .FiltreUst > a { flex-shrink:0; float:none; max-width:110px; margin:0; font:500 12px 'DM Sans',Arial,sans-serif; color:#fff; }
                body.mo-filter-ready .mo-filter-drawer .FiltreUst > a i { float:none; margin:0 0 0 5px; color:#fff; line-height:1; }
                body.mo-filter-ready .mo-filter-drawer > .tukgo { display:flow-root!important; float:none!important; width:100%!important; margin:8px 0!important; padding:0!important; }
                body.mo-filter-ready .mo-filter-drawer .moreNum { color:var(--mo-filter-muted)!important; font-size:11px!important; right:26px!important; }
                body.mo-filter-ready .mo-filter-drawer .vertical-filter-panel .panel-title { min-height:44px; }
                body.mo-filter-ready .mo-filter-drawer .liFiltreElement,
                body.mo-filter-ready .mo-filter-drawer .liFiltreElement > a { min-height:44px; }
                body.mo-filter-ready .mo-filter-drawer .liFiltreElement::before { top:15px!important; }
                body.mo-filter-ready .mo-filter-drawer .panel-search input,
                body.mo-filter-ready .mo-filter-drawer .FiyatTextBox input { min-height:44px; font-size:16px!important; }
                body.mo-filter-ready #divSayfalamaUst .mobilFilterBtn { border:1px solid #03235e!important; border-radius:4px!important; background:#03235e!important; color:#fff!important; font:600 13px/44px 'DM Sans',Arial,sans-serif!important; }
                .mo-filter-drawer .tukgo .filterOrderInStock.selected::after { background:var(--mo-filter-teal)!important; }
            }
            @media(prefers-reduced-motion:reduce) { .mo-filter-drawer, .mo-product-actions { transition:none!important; } }
        `;
        document.head.appendChild(style);
    }

    function text(node) {
        return node ? node.textContent.replace(/\s+/g, ' ').trim() : '';
    }

    function saveView() {
        window.urunDuzeniTipi = viewType;
        try { localStorage.setItem('productListingType', String(viewType)); } catch (error) { /* Storage can be disabled. */ }
    }

    function resetView() {
        viewType = 4;
        saveView();
        queueUpdate();
    }

    function prepareToolbar() {
        var sortIcons = { '2':'\uf160', '3':'\uf161', '4':'\uf15d', '5':'\uf15e', '1000':'\uf046' };
        document.querySelectorAll('#divSayfalamaUst .sortingButton > a').forEach(function (link) {
            var match = (link.getAttribute('onclick') || '').match(/sortingClick\((\d+)\)/);
            if (match && sortIcons[match[1]]) link.setAttribute('data-mo-sort-icon', sortIcons[match[1]]);
            link.setAttribute('role', 'button');
            link.setAttribute('aria-pressed', String(link.classList.contains('selected')));
        });
        document.querySelectorAll('#divSayfalamaUst a[onclick*="clearAllFilters("]').forEach(function (link) {
            link.setAttribute('role', 'button');
            link.setAttribute('tabindex', '0');
            link.setAttribute('aria-label', 'Filtrelemeyi kaldır');
            link.setAttribute('title', 'Filtrelemeyi kaldır');
        });
        document.querySelectorAll('#divSayfalamaUst .filterDeleteContent a[onclick*="clearFilter("]').forEach(function (link) {
            link.setAttribute('aria-label', text(link.closest('.appliedFilter').querySelector('.filter-content')) + ' filtresini kaldır');
        });
    }

    function prepareActions(item) {
        var image = item.querySelector('.productImage');
        var overlay = item.querySelector('.productIcon');
        if (!image || !overlay) return;
        if (!overlay.classList.contains('mo-product-overlay')) overlay.classList.add('mo-product-overlay');
        item.querySelectorAll('.urunListStokUyari, .urunListSonUrun').forEach(function (badge) {
            if (badge.parentNode !== overlay) overlay.appendChild(badge);
        });
        var actions = overlay.querySelector('.mo-product-actions');
        var controls = [
            ['.mycartIcon', 'Sepete Ekle'],
            ['.favori', 'Favorilerime Ekle'],
            ['.examineIcon', 'Ürünü İncele']
        ];
        controls.forEach(function (entry) {
            var control = item.querySelector(entry[0]);
            var link = control && control.querySelector('a');
            if (!link) return;
            if (!actions) {
                actions = document.createElement('div');
                actions.className = 'mo-product-actions';
                actions.setAttribute('role', 'group');
                actions.setAttribute('aria-label', 'Ürün işlemleri');
                overlay.appendChild(actions);
            }
            // Move the original controls, retaining Ticimax handlers and product IDs.
            if (control.parentNode !== actions) actions.appendChild(control);
            var label = entry[1];
            if (entry[0] === '.favori' && link.getAttribute('data-action') === '2') label = 'Favorilerimden Çıkar';
            link.setAttribute('aria-label', label);
            link.setAttribute('data-mo-action-label', label);
            if (!link.hasAttribute('href')) {
                link.setAttribute('tabindex', '0');
                link.setAttribute('role', 'button');
            }
        });
    }

    function prepareProducts() {
        var list = document.getElementById('ProductPageProductList');
        if (!list) return;
        // Keep the preference in sync with the native renderer after AJAX filtering.
        if (window.filterModel && window.filterModel.filter) {
            var signature = JSON.stringify(window.filterModel.filter);
            if (filterSignature !== undefined && filterSignature !== signature) resetView();
            filterSignature = signature;
        }
        saveView();
        var className = viewType === 1 ? 'pr_hrz' : viewType === 3 ? 'sort_4' : 'sort_3';
        if (!list.classList.contains(className) && typeof window.urunDuzeni === 'function') {
            var specialItems = Array.from(list.querySelectorAll('.NextProduct, [data-wide="full"]')).map(function (node) { return [node, node.className]; });
            window.urunDuzeni(viewType);
            specialItems.forEach(function (entry) { entry[0].className = entry[1]; });
        }
        document.querySelectorAll('.categoryContainer .blockSelect a').forEach(function (link) {
            var type = link.classList.contains('sort_hrz') ? 1 : link.classList.contains('sort_4') ? 3 : link.classList.contains('sort_3') ? 4 : 0;
            if (!type) return;
            var label = type === 1 ? 'Liste görünümü' : type === 3 ? 'Dörtlü görünüm' : 'Üçlü görünüm';
            link.setAttribute('aria-label', label);
            link.setAttribute('title', label);
            link.setAttribute('role', 'button');
            link.setAttribute('aria-pressed', String(type === viewType));
            if (link.classList.contains('Active') !== (type === viewType)) link.classList.toggle('Active', type === viewType);
            if (type !== 1 && !link.querySelector('.mo-view-glyph')) {
                var glyph = document.createElement('i');
                glyph.className = 'mo-view-glyph';
                glyph.setAttribute('aria-hidden', 'true');
                var count = type === 3 ? 4 : 3;
                glyph.style.setProperty('--mo-view-columns', count);
                for (var i = 0; i < count; i++) glyph.appendChild(document.createElement('b'));
                link.replaceChildren(glyph);
            }
        });
        list.querySelectorAll('.productItem:not(.isBanner)').forEach(function (item) {
            var cargo = item.querySelector('.cargoIcon');
            var detail = item.querySelector('.productDetail');
            if (cargo && detail && cargo.parentNode !== detail) detail.insertBefore(cargo, detail.firstChild);
            prepareActions(item);
        });
    }

    function decorateSlider(slider) {
        var jq = window.jQuery;
        if (!jq || !jq.fn.slider || !slider.classList.contains('ui-slider')) return;
        var parent = slider.closest('.FiyatSlider');
        if (!parent) return;
        var valuesBox = parent.querySelector('.mo-price-values');
        if (!valuesBox) {
            valuesBox = document.createElement('div');
            valuesBox.className = 'mo-price-values';
            valuesBox.innerHTML = '<div class="mo-price-value"><span>En düşük</span><output></output></div><div class="mo-price-value"><span>En yüksek</span><output></output></div>';
            parent.insertBefore(valuesBox, parent.firstChild);
            parent.classList.add('mo-price-ready');
        }
        function update(values) {
            var control = jq(slider);
            var min = control.slider('option', 'min');
            var max = control.slider('option', 'max');
            valuesBox.querySelectorAll('output').forEach(function (output, index) {
                var value = priceFormat.format(values[index]);
                if (output.textContent !== value) output.textContent = value;
                var handle = slider.querySelectorAll('.ui-slider-handle')[index];
                if (!handle) return;
                handle.setAttribute('role', 'slider');
                handle.setAttribute('aria-label', index === 0 ? 'En düşük fiyat' : 'En yüksek fiyat');
                handle.setAttribute('aria-valuemin', index === 0 ? min : values[0]);
                handle.setAttribute('aria-valuemax', index === 0 ? values[1] : max);
                handle.setAttribute('aria-valuenow', values[index]);
                handle.setAttribute('aria-valuetext', value);
            });
        }
        update(jq(slider).slider('values'));
        if (sliders.has(slider)) return;
        sliders.add(slider);
        jq(slider).on('slide.moFilter slidechange.moFilter slidestop.moFilter', function (event, ui) {
            update(ui.values);
            if (event.type === 'slidestop') resetView();
        });
    }

    function decoratePanel(panel) {
        var heading = panel.querySelector('.panel-heading');
        if (!heading && panel.classList.contains('div-fiyat-filter')) {
            heading = document.createElement('div');
            heading.className = 'panel-heading';
            var priceLabel = document.createElement('span');
            priceLabel.className = 'mo-filter-price-label';
            priceLabel.textContent = 'Fiyat aralığı';
            heading.appendChild(priceLabel);
            panel.insertBefore(heading, panel.firstChild);
        }
        var title = heading && heading.querySelector('.panel-title');
        var name = text(title).toLocaleLowerCase('tr-TR');
        var key = name + ':' + Array.from(panel.classList).filter(function (value) { return value.indexOf('div-') === 0; }).join(':');
        if (title) {
            title.setAttribute('role', 'button');
            var isDropdown = heading.classList.contains('dropdown-toggle');
            if (!isDropdown && collapsedPanels.has(key) && !panel.classList.contains('mo-filter-collapsed')) panel.classList.add('mo-filter-collapsed');
            title.setAttribute('aria-expanded', String(isDropdown ? heading.classList.contains('active') : !panel.classList.contains('mo-filter-collapsed')));
            panel.setAttribute('data-mo-filter-key', key);
        }
        if (/^(beden|numara|ayakkabı numarası|ölçü)$/.test(name) && !panel.classList.contains('mo-filter-size')) panel.classList.add('mo-filter-size');
        var isColor = name === 'renk' || panel.classList.contains('mo-filter-color') || !!panel.querySelector('.secenek-8');
        if (isColor && !panel.classList.contains('mo-filter-color')) panel.classList.add('mo-filter-color');
        panel.querySelectorAll('.liFiltreElement').forEach(function (item) {
            var link = item.querySelector('a');
            if (!link) return;
            link.setAttribute('role', 'checkbox');
            link.setAttribute('aria-checked', String(item.classList.contains('selected')));
            link.setAttribute('aria-disabled', String(item.classList.contains('deactive')));
            if (link.querySelector('.mo-filter-swatch')) return;
            var colorName = item.getAttribute('title') || text(link);
            var color = item.style.backgroundColor;
            if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') color = isColor ? colorFill(colorName) : '';
            var image = item.style.backgroundImage;
            if (!color && (!image || image === 'none')) return;
            var swatch = document.createElement('span');
            swatch.className = 'mo-filter-swatch';
            swatch.setAttribute('aria-hidden', 'true');
            if (color) swatch.style.setProperty('--mo-filter-swatch', color);
            if (image && image !== 'none') swatch.style.backgroundImage = image;
            link.insertBefore(swatch, link.firstChild);
        });
        panel.querySelectorAll('.panel-search input').forEach(function (input) {
            input.setAttribute('aria-label', text(title) + ' seçeneklerinde ara');
            if (!input.getAttribute('placeholder')) input.setAttribute('placeholder', 'Ara');
        });
        panel.querySelectorAll('.filterPrice1, .filterPrice2').forEach(function (input) {
            input.setAttribute('aria-label', input.classList.contains('filterPrice1') ? 'En düşük fiyat' : 'En yüksek fiyat');
            input.setAttribute('inputmode', 'decimal');
        });
    }

    function prepare() {
        document.querySelectorAll('#divLeftBlock .filterBlock, #divSayfalamaUst .top-filters').forEach(function (root) {
            if (!root.classList.contains('mo-filter-ui')) root.classList.add('mo-filter-ui');
            var kind = root.classList.contains('top-filters') ? 'mo-filter-drawer' : 'mo-filter-surface';
            if (!root.classList.contains(kind)) root.classList.add(kind);
            root.setAttribute('data-mo-filter-version', VERSION);
            root.querySelectorAll('.vertical-filter-panel').forEach(decoratePanel);
            root.querySelectorAll('.slider-range').forEach(decorateSlider);
            root.querySelectorAll('.div-kategori .list-group a[href]').forEach(function (link) {
                if (new URL(link.href, location.href).pathname.toLocaleLowerCase('tr-TR') === location.pathname.toLocaleLowerCase('tr-TR')) link.setAttribute('aria-current', 'page');
            });
            root.querySelectorAll('.closeFilt').forEach(function (close) {
                close.setAttribute('role', 'button');
                close.setAttribute('tabindex', '0');
                close.setAttribute('aria-label', 'Filtreleri kapat');
            });
        });
        var search = document.querySelector('#divLeftBlock .blokUrunArama');
        if (search && !search.classList.contains('mo-filter-search')) {
            search.classList.add('mo-filter-search');
            var input = search.querySelector('#txtbxBlokUrunArama');
            if (input) input.setAttribute('aria-label', 'Ürün ara');
            var button = search.querySelector('#btnBlokUrunAra');
            if (button) {
                button.setAttribute('aria-label', 'Ürün ara');
                button.setAttribute('title', 'Ürün ara');
                button.innerHTML = '<i class="fa fa-search" aria-hidden="true"></i>';
            }
        }
        prepareToolbar();
        prepareProducts();
    }

    function queueUpdate() {
        if (updateQueued) return;
        updateQueued = true;
        window.requestAnimationFrame(function () { updateQueued = false; prepare(); });
    }

    function init() {
        var category = document.querySelector('.categoryContainer');
        if (!category || initialized || category.getAttribute('data-mo-filter-controller') === VERSION) return;
        initialized = true;
        category.setAttribute('data-mo-filter-controller', VERSION);
        addStyles();
        document.body.classList.add('mo-filter-ready');
        prepare();
        // Ticimax replaces filter nodes when selections or categories change.
        new MutationObserver(function (records) {
            if (records.some(function (record) {
                return record.target.closest && record.target.closest('.filterBlock, .top-filters, #ProductPageProductList, .sortingContent, .filterDeleteContent') ||
                    record.type === 'childList' && Array.from(record.addedNodes).some(function (node) {
                        return node.nodeType === 1 && (node.matches('.filterBlock, .top-filters, #ProductPageProductList, .sortingContent, .filterDeleteContent') || node.querySelector('.filterBlock, .top-filters, #ProductPageProductList, .sortingContent, .filterDeleteContent'));
                    });
            })) queueUpdate();
        }).observe(category, { childList:true, subtree:true, attributes:true, attributeFilter:['class'] });
        category.addEventListener('click', function (event) {
            var view = event.target.closest('.blockSelect .sort_3, .blockSelect .sort_4, .blockSelect .sort_hrz');
            if (view) {
                viewType = view.classList.contains('sort_hrz') ? 1 : view.classList.contains('sort_4') ? 3 : 4;
                saveView();
                queueUpdate();
                return;
            }
            var filter = event.target.closest('.liFiltreElement:not(.deactive), .FiyatTextBox button, .filterOrderInStock, [onclick*="clearFilter("], [onclick*="clearAllFilters("], [onclick*="fiyatTextboxFiltre("]');
            if (filter) resetView();
        }, true);
        category.addEventListener('click', function (event) {
            var title = event.target.closest('.mo-filter-surface .panel-title');
            if (!title || title.closest('.panel-heading').classList.contains('dropdown-toggle')) return;
            event.preventDefault();
            var panel = title.closest('.vertical-filter-panel');
            var key = panel.getAttribute('data-mo-filter-key');
            var collapsed = panel.classList.toggle('mo-filter-collapsed');
            if (collapsed) collapsedPanels.add(key);
            else collapsedPanels.delete(key);
            title.setAttribute('aria-expanded', String(!collapsed));
        });
        category.addEventListener('keydown', function (event) {
            var control = event.target.closest('.mo-filter-ui a[role], .mo-filter-ui .closeFilt, .blockSelect a[role="button"], .mo-product-actions a[role="button"], .sortingContent a[role="button"], a[onclick*="clearAllFilters("]');
            if (!control || (event.key !== ' ' && !(event.key === 'Enter' && !control.hasAttribute('href')))) return;
            event.preventDefault();
            if (control.getAttribute('aria-disabled') !== 'true') control.click();
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
    else init();
}());
