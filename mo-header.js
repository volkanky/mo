(function () {
    'use strict';

    var VERSION = '20261008-3';
    var STYLE_ID = 'moHomeHeaderStyles';
    var CONTROL = '.mobilMenuAcButton,.searchClick,.aramaButonu,.welcomeOpen,.mycartClick,.seClose,.CloseBtnMenu,.menuBack,.ResimsizDown,.ResimsizDown2,.NoiBack,.NoiBack2';
    var header;
    var drawer;
    var scheduled = false;
    var menuWasOpen = false;
    var cartWasOpen = false;

    function addStyles() {
        var style = document.getElementById(STYLE_ID) || document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = [
            'body.mo-header-light #header { --mo-header-ink:#03235e; --mo-header-teal:#0c4853; --mo-header-line:#dce5e9; position:relative; z-index:1001; height:auto!important; background:transparent!important; border:0!important; box-shadow:none!important; text-align:left; padding:0!important; margin:0!important; font-family:"DM Sans",Arial,sans-serif; }',
            'body.mo-header-light #header { background-image:linear-gradient(45deg,transparent 49%,rgba(12,72,83,.015) 49.5%,rgba(12,72,83,.015) 50.5%,transparent 51%),linear-gradient(-45deg,transparent 49%,rgba(79,160,201,.025) 49.5%,rgba(79,160,201,.025) 50.5%,transparent 51%),linear-gradient(110deg,rgba(218,239,250,.88) 0%,rgba(255,255,255,.86) 48%,rgba(233,246,252,.8) 100%)!important; background-size:92px 92px,92px 92px,100% 100%!important; background-position:0 0,0 0,0 0!important; background-repeat:repeat,repeat,no-repeat!important; backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); }',
            'body.mo-header-light .homepage [id^="sliderblok_"], body.mo-header-light .homepage .anasayfa_tek_slider { border:0!important; outline:0!important; box-shadow:none!important; }',
            'body.mo-header-light .homepage [id^="sliderblok_"] { background:transparent!important; }',
            'body.mo-header-light .homepage .anasayfa_tek_slider .blokResimLink img { display:block!important; }',
            'body.mo-header-light #header::before, body.mo-header-light #header::after { display:none!important; }',
            'body.mo-header-light #header *, body.mo-header-light .mobilMenu * { box-sizing:border-box; letter-spacing:0; }',
            'body.mo-header-light #header .headerContent { width:calc(100% - 48px)!important; max-width:1240px; margin:0 auto!important; display:grid; grid-template-columns:minmax(0,1fr) 260px minmax(0,1fr); grid-template-rows:38px 94px 50px; align-items:center; position:relative; float:none; padding:0!important; background:none!important; }',
            'body.mo-header-light #header .headerContent::before, body.mo-header-light #header .headerContent::after { display:none; }',
            'body.mo-header-light #header .mo-header-utility { grid-area:1 / 3; justify-self:end; display:flex; align-items:center; gap:14px; min-width:0; max-width:100%; }',
            'body.mo-header-light #header .mo-header-contact { display:inline-flex; align-items:center; gap:7px; min-height:32px; color:#03235e; font-size:11px; font-weight:600; text-decoration:none; white-space:nowrap; }',
            'body.mo-header-light #header .mo-header-contact:hover { color:#0c4853; }',
            'body.mo-header-light #header #lang_flag_container { position:relative!important; inset:auto!important; margin:0!important; float:none!important; z-index:12; }',
            'body.mo-header-light #header #langHover { padding:0 10px!important; min-height:32px; display:flex; align-items:center; background:rgba(255,255,255,.72); border:1px solid rgba(133,176,197,.3); border-radius:4px; cursor:pointer; }',
            'body.mo-header-light #header #langHover:hover, body.mo-header-light #header #langHover:focus-visible { background:#fff; border-color:#4fa0c9; }',
            'body.mo-header-light #header #lang { display:flex; align-items:center; gap:10px; height:14px; padding-left:28px; color:#03235e; font:600 11px/14px "DM Sans",Arial,sans-serif; white-space:nowrap; }',
            'body.mo-header-light #header #lang::after { content:"\\f107"; font:14px/1 FontAwesome; color:#0c4853; }',
            'body.mo-header-light #header #lang-detail { top:100%!important; right:0!important; left:auto!important; width:280px; max-width:calc(100vw - 24px); padding:16px; background:#fff!important; opacity:1!important; color:#25394a; border:1px solid #dce5e9; border-radius:5px; box-shadow:0 10px 28px rgba(3,35,94,.12); text-align:left; }',
            'body.mo-header-light #header #lang-detail .language, body.mo-header-light #header #lang-detail .currency { display:flex!important; flex-direction:row!important; flex-wrap:wrap; gap:8px; width:100%; padding:0!important; margin:0!important; }',
            'body.mo-header-light #header #lang-detail .currency { margin-top:16px!important; padding-top:14px!important; border-top:1px solid #e7edef; }',
            'body.mo-header-light #header #lang-detail p { width:100%; margin:0 0 2px; padding:0; color:#667782; font:600 11px/1.5 "DM Sans",Arial,sans-serif; }',
            'body.mo-header-light #header #lang-detail .clear-both { display:none; }',
            'body.mo-header-light #header #lang-detail .lang-detail-div { position:relative; display:flex!important; align-items:center; justify-content:flex-start; gap:8px; flex:1 1 100%; width:auto!important; min-width:0; min-height:40px; margin:0!important; padding:8px 12px!important; color:#25394a; opacity:1!important; background-color:#f6f9fa; border:1px solid #e1eaee; border-radius:4px; font:600 11px/1.4 "DM Sans",Arial,sans-serif; cursor:pointer; }',
            'body.mo-header-light #header #lang-detail .lang-detail-div.flag { background-image:none!important; }',
            'body.mo-header-light #header #lang-detail .mo-header-option-flag { display:block; position:static; flex:0 0 20px; width:20px; height:14px; padding:0!important; margin:0; }',
            'body.mo-header-light #header #lang-detail .available-currency { flex:1 1 0; flex-direction:column; justify-content:center; gap:4px; padding:10px 6px!important; }',
            'body.mo-header-light #header #lang-detail .available-currency i { width:24px; height:24px; display:flex; align-items:center; justify-content:center; background:transparent!important; color:#5b6d78!important; font-size:16px; }',
            'body.mo-header-light #header #lang-detail .available-currency em { font-style:normal; font-weight:600; }',
            'body.mo-header-light #header #lang-detail .lang-detail-div:hover { border-color:#4fa0c9; color:#0c4853; background-color:#f0f8fb; }',
            'body.mo-header-light #header #lang-detail .lang-detail-div.active { border-color:#85b7c9; background-color:#eaf5f9; color:#0c4853; opacity:1; }',
            'body.mo-header-light #header #lang-detail .lang-detail-div.active::after { content:"\\f00c"; font:10px/1 FontAwesome; margin-left:auto; color:#0c4853; }',
            'body.mo-header-light #header #lang-detail .available-currency.active::after { position:absolute; top:5px; right:5px; }',
            'body.mo-header-light #header #logo { grid-area:2 / 2; display:flex!important; justify-content:center; align-items:center; position:static!important; width:100%!important; max-width:none!important; height:auto!important; margin:0!important; float:none!important; }',
            'body.mo-header-light #header #logo .logo { display:flex!important; align-items:center; justify-content:center; width:100%; height:80px!important; }',
            'body.mo-header-light #header #logo img { display:block!important; width:240px!important; max-width:100%!important; height:auto!important; max-height:70px!important; object-fit:contain; filter:none!important; transform:none!important; }',
            'body.mo-header-light #header #logo .htop, body.mo-header-light #header .usernav, body.mo-header-light #header .yanResimliMenu { display:none!important; }',
            'body.mo-header-light #header .aramaButonu { grid-area:2 / 1; justify-self:start; position:relative!important; inset:auto!important; width:220px!important; max-width:100%; height:44px!important; margin:0!important; display:flex!important; align-items:center; gap:12px; padding:0 15px; color:#03235e!important; background:#f5f7f8; border:1px solid #e5ebed; border-radius:4px; font-size:18px!important; cursor:pointer; float:none!important; }',
            'body.mo-header-light #header .aramaButonu .mo-header-search-label { font:500 12px/1.3 "DM Sans",Arial,sans-serif; color:#667782; }',
            'body.mo-header-light #header .aramaButonu:hover { border-color:#4fa0c9; background:#f0f7f8; }',
            'body.mo-header-light #header .aramaButonu i { line-height:1!important; }',
            'body.mo-header-light #header .welcome { grid-area:2 / 3; justify-self:end; margin:0 54px 0 0!important; padding:0!important; position:relative; float:none; width:auto; height:auto; background:transparent; overflow:visible; }',
            'body.mo-header-light #header .memberWelcomeContent { background:transparent; padding:0; box-shadow:none; }',
            'body.mo-header-light #header .welcome ul { display:flex; align-items:center; gap:4px; }',
            'body.mo-header-light #header .welcome li { float:none; }',
            'body.mo-header-light #header .welcome .headerUyeGiris a, body.mo-header-light #header .welcome .headerUyeOl a, body.mo-header-light #header .welcome .headerHesabim, body.mo-header-light #header .welcome .headerCikis { display:inline-flex!important; align-items:center; justify-content:center; margin:0!important; padding:0!important; width:44px; height:44px; color:#03235e!important; background:transparent; border:1px solid transparent; border-radius:4px; font-size:0!important; line-height:1!important; }',
            'body.mo-header-light #header .welcome a::after { font-family:FontAwesome!important; font-size:19px!important; line-height:1!important; }',
            'body.mo-header-light #header .welcome a:hover { background:#f0f7f8; border-color:#dce5e9; }',
            'body.mo-header-light #header .mycart { grid-area:2 / 3; justify-self:end; position:relative!important; inset:auto!important; margin:0!important; padding:0!important; width:44px; height:44px; float:none; border:0; background:transparent!important; z-index:11; }',
            'body.mo-header-light #header .mycart::before, body.mo-header-light #header .mycart::after { display:none!important; }',
            'body.mo-header-light #header .mycart > a { display:flex; align-items:center; justify-content:center; position:relative; width:44px; height:44px; margin:0; padding:0; border:1px solid #dce5e9; border-radius:4px; background:#fff; color:#03235e; }',
            'body.mo-header-light #header .mycart > a::before { display:block; content:"\\f07a"; font:20px/1 FontAwesome; position:static; }',
            'body.mo-header-light #header .mycart > a::after { display:none; }',
            'body.mo-header-light #header .mycart > a:hover { background:#f0f7f8; border-color:#4fa0c9; }',
            'body.mo-header-light #header .mycart .sepetTecxt, body.mo-header-light #header .mycart .sepetUrun, body.mo-header-light #header .mycart .sepetTopTutar { display:none!important; }',
            'body.mo-header-light #header .sepetUrunSayisi { display:flex!important; align-items:center; justify-content:center; position:absolute!important; top:-5px; right:-5px; left:auto!important; min-width:19px; width:auto!important; height:19px; padding:0 4px; margin:0!important; border:2px solid #fff; border-radius:10px; background:#0c4853; color:#fff; font:700 10px/1 "DM Sans",Arial,sans-serif; }',
            'body.mo-header-light #header .sepetUrunSayisi::before, body.mo-header-light #header .sepetUrunSayisi::after { display:none; }',
            'body.mo-header-light #header .navigation { grid-area:3 / 1 / 4 / -1; display:block; width:100%; float:none; background:transparent!important; border-top:1px solid rgba(151,185,202,.25); border-radius:0; box-shadow:none; }',
            'body.mo-header-light #header .navigation .HeaderMenu2 { display:flex; align-items:stretch; justify-content:center; gap:12px; margin:0; padding:0; }',
            'body.mo-header-light #header .navigation .HeaderMenu2 > li { float:none; }',
            'body.mo-header-light #header .navigation .HeaderMenu2 > li > a { display:flex; align-items:center; gap:7px; min-height:49px; padding:0 18px!important; color:#25394a!important; background:transparent!important; font-size:12px; font-weight:700; line-height:1.3!important; letter-spacing:0!important; border-radius:0; text-shadow:none; border-bottom:2px solid transparent; }',
            'body.mo-header-light #header .navigation .HeaderMenu2 > li.ulVar > a::after { content:"\\f107"; font:13px/1 FontAwesome; }',
            'body.mo-header-light #header .navigation .HeaderMenu2 > li:hover > a, body.mo-header-light #header .navigation .HeaderMenu2 > li:focus-within > a, body.mo-header-light #header .navigation .HeaderMenu2 > li > a[aria-current="page"] { color:#0c4853!important; border-bottom-color:#4fa0c9; background:#f5f9fa!important; }',
            'body.mo-header-light #header .navigation .HeaderMenu2 > li > a::before { display:none!important; }',
            'body.mo-header-light #header .navigation .HeaderMenu2 ul { padding:8px 0; width:248px; background:#fff!important; border:1px solid #dce5e9; border-radius:4px; box-shadow:0 8px 24px rgba(3,35,94,.1)!important; }',
            'body.mo-header-light #header .navigation .HeaderMenu2 li:focus-within > ul { display:block; }',
            'body.mo-header-light #header .navigation .HeaderMenu2 ul li > a { padding:12px 20px; color:#25394a; font:500 12px/1.5 "DM Sans",Arial,sans-serif; white-space:normal; }',
            'body.mo-header-light #header .navigation .HeaderMenu2 ul li > a::after { display:none; }',
            'body.mo-header-light #header .navigation .HeaderMenu2 ul li:hover > a, body.mo-header-light #header .navigation .HeaderMenu2 ul li:focus-within > a { background:#f0f7f8; color:#0c4853; }',
            'body.mo-header-light #header .searchContent { top:114px; right:auto; left:0; width:360px; max-width:100%; padding:10px; background:#fff; border:1px solid #dce5e9; border-radius:5px; box-shadow:0 8px 24px rgba(3,35,94,.1); }',
            'body.mo-header-light #header .search { width:100%; max-width:none; margin:0; position:relative; }',
            'body.mo-header-light #header #txtbxArama { width:100%; height:44px; padding:0 66px 0 12px; border:1px solid #dce5e9; border-radius:4px; background:#f5f7f8; color:#25394a; font-size:13px; }',
            'body.mo-header-light #header #btnKelimeAra { height:44px; padding:0 15px; border-radius:0 4px 4px 0; background:#0c4853; color:#fff; font-size:12px; }',
            'body.mo-header-light #header .CartProduct { background:#fff; color:#25394a; border:1px solid #dce5e9; border-radius:5px; box-shadow:0 8px 24px rgba(3,35,94,.1); }',
            'body.mo-header-light #header .CartProduct .SepetUst { display:none; }',
            'body.mo-header-light #header .headerCartBtn, body.mo-header-light #header .headerOrderBtn { background:#0c4853; color:#fff; border-radius:4px; }',
            'body.mo-header-light #header :focus-visible, body.mo-header-light .mobilMenu :focus-visible { outline:2px solid #4fa0c9; outline-offset:2px; }',
            '@media (max-width:1041px) {',
            'body.mo-header-light #header .headerContent { width:calc(100% - 24px)!important; grid-template-columns:44px 44px minmax(0,1fr) 44px 44px; grid-template-rows:38px 70px; }',
            'body.mo-header-light #header .mo-header-utility { grid-area:1 / 1 / 2 / -1; gap:12px; position:relative; }',
            'body.mo-header-light #header .mo-header-utility #lang_flag_container { position:static!important; }',
            'body.mo-header-light #header .mo-header-contact { font-size:10px; }',
            'body.mo-header-light #header #logo { grid-area:2 / 3; }',
            'body.mo-header-light #header #logo .logo { height:70px!important; }',
            'body.mo-header-light #header #logo img { width:180px!important; max-height:54px!important; }',
            'body.mo-header-light #header .navigation, body.mo-header-light #header .aramaButonu { display:none!important; }',
            'body.mo-header-light #header .mobilMenuAcButton, body.mo-header-light #header .searchClick, body.mo-header-light #header .welcomeOpen, body.mo-header-light #header .mycartClick { display:flex!important; align-items:center; justify-content:center; position:static!important; margin:0!important; padding:0!important; width:44px; height:44px; float:none; border:1px solid transparent; border-radius:4px; color:#03235e; background:transparent; font-size:20px; cursor:pointer; }',
            'body.mo-header-light #header .mobilMenuAcButton { grid-area:2 / 1; }',
            'body.mo-header-light #header .searchClick { grid-area:2 / 2; }',
            'body.mo-header-light #header .welcomeOpen { grid-area:2 / 4; }',
            'body.mo-header-light #header .mycartClick { grid-area:2 / 5; }',
            'body.mo-header-light #header .mobilMenuAcButton span { display:none; }',
            'body.mo-header-light #header .mobilMenuAcButton i, body.mo-header-light #header .searchClick i, body.mo-header-light #header .welcomeOpen i, body.mo-header-light #header .mycartClick i { line-height:1!important; }',
            'body.mo-header-light #header [aria-expanded="true"] { background:#f0f7f8; border-color:#dce5e9; }',
            'body.mo-header-light #header .mycart { grid-area:auto; position:absolute!important; top:50px!important; right:2px!important; width:19px; height:19px; pointer-events:none; z-index:11; }',
            'body.mo-header-light.mo-header-cart-open #header .mycart { z-index:13; }',
            'body.mo-header-light #header .mycart > a { width:19px; height:19px; background:transparent; border:0; pointer-events:none; }',
            'body.mo-header-light #header .mycart > a::before { display:none!important; }',
            'body.mo-header-light #header .sepetUrunSayisi { top:0; right:0; }',
            'body.mo-header-light #header .welcome { grid-area:auto; display:none; position:absolute; top:100%; left:0; right:0; width:100%; height:auto; margin:0!important; padding:12px!important; background:#fff; border:1px solid #dce5e9; border-radius:0 0 4px 4px; box-shadow:0 8px 24px rgba(3,35,94,.1); overflow:visible; z-index:12; }',
            'body.mo-header-light #header .welcome.active { display:block; height:auto; }',
            'body.mo-header-light #header .welcome ul { justify-content:center; flex-wrap:wrap; gap:12px; float:none; width:100%; }',
            'body.mo-header-light #header .welcome .memberWelcomeContent { width:100%; height:auto; position:static; }',
            'body.mo-header-light #header .welcome .headerUyeGiris a, body.mo-header-light #header .welcome .headerUyeOl a, body.mo-header-light #header .welcome .headerHesabim, body.mo-header-light #header .welcome .headerCikis { width:auto; min-height:44px; height:auto; padding:0 12px!important; color:#03235e!important; font:600 13px/1.4 "DM Sans",Arial,sans-serif!important; background:#f5f7f8; }',
            'body.mo-header-light #header .searchContent { grid-area:auto; display:none; top:100%; left:0; width:100%; height:auto; overflow:visible; padding:10px; }',
            'body.mo-header-light #header .searchContent.active { display:block; height:auto; padding:10px; }',
            'body.mo-header-light #header .searchContent #txtbxArama { height:44px; padding:0 66px 0 12px; border:1px solid #dce5e9!important; border-radius:4px; font-size:16px; }',
            'body.mo-header-light #header .searchContent #btnKelimeAra { width:58px; height:44px; line-height:44px; padding:0; background:#0c4853; border-radius:0 4px 4px 0; }',
            'body.mo-header-light #header .CartProduct { display:none!important; position:fixed!important; top:0!important; right:0!important; left:auto!important; bottom:0; width:min(420px,100vw); height:100dvh; padding:80px 16px 20px; border:0; border-left:1px solid #dce5e9; border-radius:0; background:#fff; box-shadow:-8px 0 32px rgba(3,35,94,.12); transform:none!important; opacity:1!important; visibility:visible!important; overflow-y:auto; pointer-events:auto; z-index:10000; }',
            'body.mo-header-light #header .CartProduct.animated { display:block!important; }',
            'body.mo-header-light #header .CartProduct::before, body.mo-header-light #header .CartProduct::after { display:none; }',
            'body.mo-header-light #header .CartProduct .CartProductInner { position:static; width:100%; padding:0; }',
            'body.mo-header-light #header .CartProduct .SepetUst { display:flex; align-items:center; justify-content:space-between; position:absolute; top:0; left:0; width:100%; min-height:64px; margin:0; padding:10px 16px; background:#f5f8f9; border-bottom:1px solid #dce5e9; color:#03235e; font:600 14px/1.3 "DM Sans",Arial,sans-serif; }',
            'body.mo-header-light #header .CartProduct .SepetUst span { order:-1; }',
            'body.mo-header-light #header .CartProduct .seClose { display:flex; align-items:center; justify-content:center; position:static; width:44px; height:44px; border:1px solid #dce5e9; border-radius:4px; background:#fff; color:#03235e; cursor:pointer; font-size:20px; }',
            'body.mo-header-light #header .CartProduct .seClose i { line-height:1; }',
            'body.mo-header-light #header .CartProduct .SProduct { max-height:none; }',
            'body.mo-header-light .mobilMenu { display:block; width:min(360px,calc(100% - 32px))!important; bottom:0; height:100dvh; background:#fff; box-shadow:8px 0 32px rgba(3,35,94,.12); }',
            'body.mo-header-light .mobilMenu .menuUstBolum { height:64px; margin:0; padding:10px 12px; background:#f5f8f9; border-bottom:1px solid #dce5e9; color:#03235e; }',
            'body.mo-header-light .mobilMenu .menuBack { display:flex; align-items:center; gap:12px; min-height:44px; color:#03235e; font:600 14px/1 "DM Sans",Arial,sans-serif; }',
            'body.mo-header-light .mobilMenu .menuBack i { font-size:18px; line-height:1; }',
            'body.mo-header-light .mobilMenu .CloseBtnMenu { position:absolute; top:10px; right:12px; display:flex; align-items:center; justify-content:center; width:44px; height:44px; font-size:20px; color:#03235e; background:#fff; border:1px solid #dce5e9; border-radius:4px; }',
            'body.mo-header-light .mobilMenu .CloseBtnMenu i { line-height:1; }',
            'body.mo-header-light .mobilMenu .menuIcerikAlan { top:64px; height:calc(100% - 64px); }',
            'body.mo-header-light .mobilMenu .navUl li { padding:0; border-bottom:1px solid #e7edef; }',
            'body.mo-header-light .mobilMenu .navUl li > a { padding:0 20px; min-height:52px; line-height:52px; color:#25394a; font:600 12px/52px "DM Sans",Arial,sans-serif; }',
            'body.mo-header-light .mobilMenu .navUl li > a:hover { color:#0c4853; background:#f0f7f8; }',
            'body.mo-header-light .mobilMenu .navUl li.ulVar > a { max-width:calc(100% - 52px); }',
            'body.mo-header-light .mobilMenu .ResimsizDown, body.mo-header-light .mobilMenu .ResimsizDown2 { left:auto!important; right:0; top:0; width:52px; height:52px; padding:0!important; display:flex; align-items:center; justify-content:center; color:#0c4853; background:#f5f8f9; }',
            'body.mo-header-light .mobilMenu .ResimsizDown i, body.mo-header-light .mobilMenu .ResimsizDown2 i { line-height:1!important; float:none; }',
            'body.mo-header-light .mobilMenu .navUl li ul { top:64px!important; width:min(360px,calc(100% - 32px))!important; }',
            'body.mo-header-light .mobilMenu .navUl li ul > span { min-height:56px; line-height:56px; padding-left:62px; font-size:13px; background:#f5f8f9; color:#03235e; }',
            'body.mo-header-light .mobilMenu .NoiBack, body.mo-header-light .mobilMenu .NoiBack2 { right:auto!important; width:52px; line-height:56px; }',
            'body.mo-header-light .mobilaf { background:rgba(3,35,94,.35); }',
            '}',
            'body.mo-header-light.mo-header-cart-open { overflow:hidden; }',
            'body.mo-header-light.mo-header-cart-open #header { z-index:2147482500; }',
            '@media (max-width:360px) { body.mo-header-light #header .headerContent { width:calc(100% - 16px)!important; } body.mo-header-light #header #logo img { width:128px!important; } }',
            '@media (prefers-reduced-motion:reduce) { body.mo-header-light #header *, body.mo-header-light .mobilMenu, body.mo-header-light .mobilMenu * { transition:none!important; } }'
        ].join('\n');
        if (!style.parentNode) document.head.appendChild(style);
        if (!document.querySelector('link[data-mo-filter-font],link[data-mo-vitrin-font],link[data-mo-header-font]')) {
            var font = document.createElement('link');
            font.rel = 'stylesheet';
            font.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap';
            font.setAttribute('data-mo-header-font', '');
            document.head.appendChild(font);
        }
    }

    function labelControl(node, label) {
        if (!node) return;
        node.setAttribute('aria-label', label);
        node.setAttribute('title', label);
        if (!node.matches('a[href],button,input')) {
            node.setAttribute('role', 'button');
            node.setAttribute('tabindex', '0');
        }
    }

    function sync() {
        scheduled = false;
        arrangeUtility();
        header.querySelectorAll('#lang-detail .lang-detail-div.flag').forEach(function (option) {
            if (option.querySelector('.mo-header-option-flag')) return;
            var country = Array.from(option.classList).find(function (name) { return name.indexOf('flag-') === 0; });
            if (!country) return;
            var flag = document.createElement('span');
            flag.className = 'mo-header-option-flag flag ' + country;
            flag.setAttribute('aria-hidden', 'true');
            option.insertBefore(flag, option.firstChild);
        });
        [
            ['.mobilMenuAcButton', 'Men\u00fcy\u00fc a\u00e7'], ['.searchClick', '\u00dcr\u00fcn ara'],
            ['.aramaButonu', '\u00dcr\u00fcn ara'], ['.welcomeOpen', 'Hesab\u0131m'], ['.mycartClick', 'Sepetim']
        ].forEach(function (item) { labelControl(header.querySelector(item[0]), item[1]); });
        var search = header.querySelector('.aramaButonu');
        if (search && !search.querySelector('.mo-header-search-label')) {
            var label = document.createElement('span');
            label.className = 'mo-header-search-label';
            label.textContent = '\u00dcr\u00fcn ara';
            search.appendChild(label);
        }
        var logo = header.querySelector('#logo img');
        if (logo && !logo.alt) logo.alt = 'Motif \u0130stanbul';
        var mobile = window.matchMedia('(max-width:1041px)').matches;
        var cartLink = header.querySelector('.mycart > a');
        labelControl(cartLink, 'Sepetim');
        if (cartLink) {
            cartLink.setAttribute('tabindex', mobile ? '-1' : '0');
            cartLink.setAttribute('aria-hidden', String(mobile));
        }
        var cart = header.querySelector('.CartProduct');
        if (cart) {
            if (!cart.querySelector('.SepetUst')) {
                var cartTitle = document.createElement('div');
                cartTitle.className = 'SepetUst';
                cartTitle.innerHTML = '<span>Sepetim</span><div class="seClose"><i class="fa fa-times" aria-hidden="true"></i></div>';
                cart.insertBefore(cartTitle, cart.firstChild);
            }
            cart.id = 'moHeaderCartPanel';
            var cartOpen = mobile && cart.classList.contains('animated');
            document.body.classList.toggle('mo-header-cart-open', cartOpen);
            cart.inert = mobile && !cartOpen;
            labelControl(cart.querySelector('.seClose'), 'Sepeti kapat');
            var cartButton = header.querySelector('.mycartClick');
            if (cartButton) {
                cartButton.setAttribute('aria-expanded', String(cartOpen));
                cartButton.setAttribute('aria-controls', cart.id);
            }
            if (cartOpen && !cartWasOpen) cart.querySelector('.seClose').focus({ preventScroll: true });
            if (!cartOpen && cartWasOpen && cartButton && mobile) cartButton.focus({ preventScroll: true });
            cartWasOpen = cartOpen;
        }
        header.querySelectorAll('.welcome a').forEach(function (node) {
            if (node.textContent.trim()) labelControl(node, node.textContent.trim());
        });
        var input = header.querySelector('#txtbxArama');
        if (input) { input.setAttribute('aria-label', '\u00dcr\u00fcn ara'); input.setAttribute('tabindex', '0'); }
        var open = !!(drawer && drawer.classList.contains('acik'));
        var menuButton = header.querySelector('.mobilMenuAcButton');
        if (menuButton) {
            menuButton.setAttribute('aria-expanded', String(open));
            menuButton.setAttribute('aria-controls', 'moHeaderMobileMenu');
        }
        var welcomeButton = header.querySelector('.welcomeOpen');
        if (welcomeButton) welcomeButton.setAttribute('aria-expanded', String(!!header.querySelector('.welcome.active')));
        if (drawer) {
            drawer.inert = !open;
            drawer.setAttribute('aria-hidden', String(!open));
            drawer.querySelectorAll('.navUl li ul').forEach(function (ul) { ul.inert = !ul.classList.contains('active'); });
            drawer.querySelectorAll(CONTROL).forEach(function (node) {
                var link = node.parentNode.querySelector('a');
                var label = node.matches('.CloseBtnMenu') ? 'Men\u00fcy\u00fc kapat' :
                    node.matches('.ResimsizDown,.ResimsizDown2') ? ((link ? link.textContent.trim() : '') + ' alt kategorileri') : 'Geri';
                labelControl(node, label);
            });
            if (open && !menuWasOpen) drawer.querySelector('.CloseBtnMenu').focus({ preventScroll: true });
            if (!open && menuWasOpen && menuButton) menuButton.focus({ preventScroll: true });
        }
        menuWasOpen = open;
    }

    function schedule() {
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(sync);
    }

    function findDrawer() {
        var next = document.querySelector('.mobilMenu');
        if (!next || next === drawer) return;
        drawer = next;
        drawer.id = 'moHeaderMobileMenu';
        drawer.setAttribute('aria-label', 'Motif \u0130stanbul men\u00fc');
        new MutationObserver(schedule).observe(drawer, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
        schedule();
    }

    function arrangeUtility() {
        var content = header.querySelector('.headerContent');
        var utility = content.querySelector('.mo-header-utility');
        if (!utility) {
            utility = document.createElement('div');
            utility.className = 'mo-header-utility';
            content.appendChild(utility);
        }
        var language = header.querySelector('#lang_flag_container');
        var contact = header.querySelector('.mo-header-contact');
        if (language && language.parentNode !== utility) utility.insertBefore(language, utility.firstChild);
        if (contact && contact.parentNode !== utility) utility.appendChild(contact);
    }

    function init() {
        header = document.getElementById('header');
        if (!header || !header.querySelector('.headerContent')) return false;
        if (header.getAttribute('data-mo-header-version') === VERSION) return true;
        header.setAttribute('data-mo-header-version', VERSION);
        document.body.classList.add('mo-header-light');
        addStyles();
        if (!header.querySelector('.mo-header-contact')) {
            var contact = document.createElement('a');
            contact.className = 'mo-header-contact';
            contact.href = '/iletisim1';
            contact.innerHTML = '<i class="fa fa-phone" aria-hidden="true"></i><span>\u0130leti\u015fim</span>';
            header.querySelector('.headerContent').appendChild(contact);
        }
        var path = window.location.pathname.replace(/\/$/, '') || '/';
        header.querySelectorAll('.navigation .HeaderMenu2 > li > a').forEach(function (link) {
            if ((new URL(link.href, window.location.href).pathname.replace(/\/$/, '') || '/') === path) link.setAttribute('aria-current', 'page');
        });
        new MutationObserver(schedule).observe(header, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
        new MutationObserver(findDrawer).observe(document.body, { childList: true });
        findDrawer();
        sync();
        window.addEventListener('resize', schedule);
        document.addEventListener('keydown', function (event) {
            var inScope = header.contains(event.target) || (drawer && drawer.contains(event.target));
            if (inScope && event.target.matches(CONTROL) && (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                event.target.click();
                schedule();
            }
            var cart = header.querySelector('.CartProduct.animated');
            if (event.key === 'Escape' && cart && window.matchMedia('(max-width:1041px)').matches) {
                event.preventDefault(); cart.querySelector('.seClose').click();
            }
            var openDrawer = drawer && drawer.classList.contains('acik') ? drawer : null;
            if (!openDrawer && !cartWasOpen) return;
            if (event.key === 'Escape' && openDrawer) { event.preventDefault(); openDrawer.querySelector('.CloseBtnMenu').click(); }
            if (event.key === 'Tab') {
                var panel = openDrawer || cart;
                if (!panel) return;
                var focusable = Array.from(panel.querySelectorAll('a[href],button,[tabindex="0"]')).filter(function (node) {
                    return !node.closest('[inert]') && node.getClientRects().length && getComputedStyle(node).visibility !== 'hidden' && !node.disabled;
                });
                var first = focusable[0];
                var last = focusable[focusable.length - 1];
                if (first && event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
                else if (last && !event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
            }
        });
        return true;
    }

    function boot() {
        if (init()) return;
        var attempts = 0;
        var timer = window.setInterval(function () {
            attempts++;
            if (init() || attempts >= 40) window.clearInterval(timer);
        }, 250);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
}());
