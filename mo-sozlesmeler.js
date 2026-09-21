(function () {
    'use strict';

    var ROOT_ID = 'moLegal';
    var STYLE_ID = 'moLegalStyles';

    function addFonts() {
        if (document.querySelector('link[data-mo-legal-fonts]')) return;

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700&display=swap';
        link.setAttribute('data-mo-legal-fonts', 'true');
        document.head.appendChild(link);
    }

    function addStyles() {
        if (document.getElementById(STYLE_ID)) return;

        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            body.mo-legal-ready #divIcerik.ticiContainer,
            body.mo-legal-ready #mainHolder_divDesign .t-vw-3 .ticiContainer { width:100%!important; max-width:none!important; margin-left:0!important; margin-right:0!important; }
            body.mo-legal-ready #divIcerik.ticiContainer { padding:0!important; }
            #${ROOT_ID}, #${ROOT_ID} * { box-sizing:border-box; }
            #${ROOT_ID} { --mo-navy:#03235e; --mo-teal:#0c4853; --mo-cyan:#4fa0c9; --mo-ink:#122538; --mo-muted:#697987; --mo-paper:#f3f8fa; --mo-line:#dce8ec; position:relative; width:100%; overflow:clip; color:var(--mo-ink); font-family:'DM Sans',Arial,sans-serif; background:#fff; }
            #${ROOT_ID} h1, #${ROOT_ID} h2, #${ROOT_ID} h3, #${ROOT_ID} p, #${ROOT_ID} dl, #${ROOT_ID} dd { margin-top:0; }
            #${ROOT_ID} a { text-decoration:none; }
            #${ROOT_ID} a:focus-visible, #${ROOT_ID} button:focus-visible { outline:3px solid rgba(79,160,201,.45); outline-offset:3px; }
            .mo-legal-progress { position:fixed; z-index:900; top:0; left:0; width:100%; height:3px; pointer-events:none; background:transparent; }
            .mo-legal-progress span { display:block; width:0; height:100%; background:var(--mo-cyan); transition:width .08s linear; }
            .mo-legal-hero { display:grid; grid-template-columns:minmax(0,1.18fr) minmax(360px,.82fr); min-height:490px; background:var(--mo-paper); }
            .mo-legal-hero-copy { display:flex; flex-direction:column; justify-content:center; padding:74px max(35px,calc((100vw - 1200px)/2)); padding-right:clamp(45px,8vw,125px); }
            .mo-legal-kicker { display:flex; align-items:center; gap:12px; color:var(--mo-cyan); font-size:10px; font-weight:700; letter-spacing:.17em; text-transform:uppercase; }
            .mo-legal-kicker::before { content:''; width:32px; height:1px; background:currentColor; }
            .mo-legal-hero h1 { margin:23px 0 20px; color:var(--mo-navy); font-family:'Manrope',Arial,sans-serif; font-size:clamp(52px,6.4vw,86px); font-weight:600; line-height:.92; letter-spacing:-.065em; }
            .mo-legal-hero-copy > p { max-width:620px; margin-bottom:30px; color:var(--mo-muted); font-size:15px; line-height:1.75; }
            .mo-legal-meta { display:flex; flex-wrap:wrap; gap:13px 27px; color:var(--mo-muted); font-size:10px; letter-spacing:.06em; text-transform:uppercase; }
            .mo-legal-meta span { display:flex; align-items:center; gap:7px; }
            .mo-legal-meta strong { color:var(--mo-teal); font-weight:700; }
            .mo-legal-hero-art { position:relative; display:grid; place-items:center; min-height:490px; overflow:hidden; color:#b9e5e9; background:var(--mo-navy); }
            .mo-legal-hero-art::before { content:''; position:absolute; inset:0; opacity:.17; background-image:linear-gradient(rgba(255,255,255,.24) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.24) 1px,transparent 1px); background-size:25px 25px; }
            .mo-legal-hero-art svg { position:relative; z-index:1; width:min(78%,460px); }
            .mo-legal-hero-art > span { position:absolute; z-index:2; right:24px; bottom:24px; color:rgba(255,255,255,.65); font-size:9px; font-weight:600; letter-spacing:.15em; text-transform:uppercase; }
            .mo-legal-shell { display:grid; grid-template-columns:260px minmax(0,810px); justify-content:center; gap:clamp(55px,8vw,120px); width:min(1200px,calc(100% - 48px)); margin:0 auto; padding:100px 0 115px; }
            .mo-legal-aside { min-width:0; }
            .mo-legal-aside-inner { position:sticky; top:30px; }
            .mo-legal-aside-title, .mo-legal-section-label { display:block; margin-bottom:18px; color:var(--mo-teal); font-size:9px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; }
            .mo-legal-nav { border-top:1px solid var(--mo-line); }
            .mo-legal-nav a { display:grid; grid-template-columns:28px 1fr; gap:7px; align-items:center; min-height:42px; color:#788895; font-size:11px; font-weight:600; border-bottom:1px solid var(--mo-line); transition:color .2s,padding .2s; }
            .mo-legal-nav a span { color:#a6b4be; font-size:8px; letter-spacing:.08em; }
            .mo-legal-nav a:hover, .mo-legal-nav a.is-active { padding-left:5px; color:var(--mo-navy); }
            .mo-legal-nav a.is-active span { color:var(--mo-cyan); }
            .mo-legal-print { display:flex; align-items:center; gap:9px; width:100%; margin-top:23px; padding:0; color:var(--mo-teal); font:700 10px 'DM Sans',Arial,sans-serif; text-align:left; border:0; background:transparent; cursor:pointer; }
            .mo-legal-print svg { width:18px; height:18px; fill:none; stroke:currentColor; stroke-width:1.6; stroke-linecap:round; stroke-linejoin:round; }
            .mo-legal-document { min-width:0; }
            .mo-legal-intro { margin-bottom:52px; padding:30px 34px; border-left:3px solid var(--mo-cyan); background:var(--mo-paper); }
            .mo-legal-intro p { margin-bottom:0; color:var(--mo-muted); font-size:13px; line-height:1.8; }
            .mo-legal-section { display:grid; grid-template-columns:50px minmax(0,1fr); gap:24px; padding:43px 0; border-top:1px solid var(--mo-line); scroll-margin-top:30px; }
            .mo-legal-section-number { padding-top:7px; color:var(--mo-cyan); font-size:9px; font-weight:700; letter-spacing:.12em; }
            .mo-legal-section h2 { margin-bottom:19px; color:var(--mo-navy); font-family:'Manrope',Arial,sans-serif; font-size:clamp(23px,2.5vw,31px); font-weight:600; line-height:1.2; letter-spacing:-.035em; }
            .mo-legal-section h3 { margin-bottom:17px; color:var(--mo-teal); font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; }
            .mo-legal-section p, .mo-legal-section li { color:#526574; font-size:13px; line-height:1.85; }
            .mo-legal-section p:last-child { margin-bottom:0; }
            .mo-legal-section strong { color:var(--mo-ink); font-weight:700; }
            .mo-legal-section ul { display:grid; gap:10px; margin:0; padding:0; list-style:none; }
            .mo-legal-section li { position:relative; padding-left:22px; }
            .mo-legal-section li::before { content:''; position:absolute; top:.82em; left:0; width:7px; height:7px; border:1px solid var(--mo-cyan); transform:rotate(45deg); }
            .mo-legal-company { margin-top:27px; padding:27px 29px; border:1px solid var(--mo-line); background:#fbfdfd; }
            .mo-legal-company dl { margin-bottom:0; }
            .mo-legal-company dl > div { display:grid; grid-template-columns:100px minmax(0,1fr); gap:18px; padding:11px 0; border-bottom:1px solid #e8eff1; }
            .mo-legal-company dl > div:last-child { border-bottom:0; }
            .mo-legal-company dt { color:#8a99a5; font-size:10px; font-weight:600; }
            .mo-legal-company dd { margin-bottom:0; overflow-wrap:anywhere; color:var(--mo-ink); font-size:12px; line-height:1.55; }
            .mo-legal-acceptance { display:flex; align-items:center; gap:20px; margin-top:15px; padding:28px 31px; color:#fff; background:var(--mo-teal); }
            .mo-legal-acceptance svg { flex:0 0 45px; width:45px; height:45px; fill:none; stroke:#8bd7dd; stroke-width:1.7; stroke-linecap:round; stroke-linejoin:round; }
            .mo-legal-acceptance span { display:block; margin-bottom:6px; color:#8bd7dd; font-size:8px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; }
            .mo-legal-acceptance p { margin-bottom:0; color:#fff; font-size:13px; line-height:1.65; }
            .mo-legal-help { display:flex; align-items:center; justify-content:space-between; gap:30px; margin-top:65px; padding-top:33px; border-top:1px solid var(--mo-line); }
            .mo-legal-help span { display:block; margin-bottom:5px; color:var(--mo-navy); font-size:13px; font-weight:700; }
            .mo-legal-help p { margin-bottom:0; color:var(--mo-muted); font-size:11px; }
            .mo-legal-help a { flex:0 0 auto; display:inline-flex; align-items:center; gap:20px; min-height:47px; padding:0 20px; color:#fff; font-size:10px; font-weight:700; letter-spacing:.04em; background:var(--mo-navy); transition:background .2s,transform .2s; }
            .mo-legal-help a:hover { transform:translateY(-2px); background:var(--mo-teal); }
            @media(max-width:900px) {
                .mo-legal-hero { grid-template-columns:1fr; }
                .mo-legal-hero-copy { min-height:470px; padding:70px max(28px,calc((100vw - 700px)/2)); }
                .mo-legal-hero-art { min-height:360px; }
                .mo-legal-hero-art svg { width:min(68%,350px); }
                .mo-legal-shell { grid-template-columns:1fr; gap:45px; }
                .mo-legal-aside-inner { position:static; }
                .mo-legal-nav { display:grid; grid-template-columns:repeat(2,1fr); column-gap:25px; }
                .mo-legal-print { width:auto; }
            }
            @media(max-width:600px) {
                .mo-legal-hero-copy { min-height:auto; padding:63px 22px 58px; }
                .mo-legal-hero h1 { font-size:49px; }
                .mo-legal-hero-art { min-height:295px; }
                .mo-legal-shell { width:calc(100% - 30px); padding:68px 0 75px; }
                .mo-legal-nav { grid-template-columns:1fr; }
                .mo-legal-section { grid-template-columns:32px minmax(0,1fr); gap:11px; padding:35px 0; }
                .mo-legal-intro { margin-bottom:38px; padding:24px 22px; }
                .mo-legal-company { margin-left:-43px; padding:22px 20px; }
                .mo-legal-company dl > div { grid-template-columns:1fr; gap:5px; }
                .mo-legal-acceptance { align-items:flex-start; padding:24px 21px; }
                .mo-legal-help { align-items:flex-start; flex-direction:column; }
            }
            @media print {
                body.mo-legal-ready #divIcerik.ticiContainer { width:100%!important; }
                .mo-legal-progress, .mo-legal-hero-art, .mo-legal-aside, .mo-legal-help { display:none!important; }
                .mo-legal-hero { display:block; min-height:0; background:#fff; }
                .mo-legal-hero-copy { min-height:0; padding:20px 0 35px; }
                .mo-legal-hero h1 { font-size:42px; }
                .mo-legal-shell { display:block; width:100%; padding:0; }
                .mo-legal-section { break-inside:avoid; padding:25px 0; }
                .mo-legal-acceptance { color:#000; border:1px solid #aaa; background:#fff; }
                .mo-legal-acceptance p { color:#000; }
            }
        `;
        document.head.appendChild(style);
    }

    function updateProgress(root, bar) {
        if (!bar) return;
        var rect = root.getBoundingClientRect();
        var scrollable = root.offsetHeight - window.innerHeight;
        var travelled = Math.min(Math.max(-rect.top, 0), Math.max(scrollable, 0));
        var percent = scrollable > 0 ? (travelled / scrollable) * 100 : 100;
        bar.style.width = percent.toFixed(2) + '%';
    }

    function enableProgress(root) {
        var bar = document.getElementById('moLegalProgressBar');
        var ticking = false;

        function requestUpdate() {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(function () {
                updateProgress(root, bar);
                ticking = false;
            });
        }

        updateProgress(root, bar);
        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate);
    }

    function enableSectionTracking(root) {
        if (!('IntersectionObserver' in window)) return;

        var links = root.querySelectorAll('.mo-legal-nav a');
        var sections = root.querySelectorAll('[data-mo-legal-section]');
        var linksById = {};

        Array.prototype.forEach.call(links, function (link) {
            linksById[link.getAttribute('href').slice(1)] = link;
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                Array.prototype.forEach.call(links, function (link) { link.classList.remove('is-active'); });
                if (linksById[entry.target.id]) linksById[entry.target.id].classList.add('is-active');
            });
        }, { rootMargin: '-18% 0px -68% 0px', threshold: 0 });

        Array.prototype.forEach.call(sections, function (section) { observer.observe(section); });
    }

    function enablePrint(root) {
        var button = root.querySelector('#moLegalPrint');
        if (!button) return;
        button.addEventListener('click', function () { window.print(); });
    }

    function init() {
        var root = document.getElementById(ROOT_ID);
        if (!root || root.getAttribute('data-mo-ready') === 'true') return;

        root.setAttribute('data-mo-ready', 'true');
        document.body.classList.add('mo-legal-ready');
        addFonts();
        addStyles();
        enableProgress(root);
        enableSectionTracking(root);
        enablePrint(root);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
