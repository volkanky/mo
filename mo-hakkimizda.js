(function () {
    'use strict';

    var ROOT_ID = 'moAbout';
    var STYLE_ID = 'moAboutStyles';

    function addFonts() {
        if (document.querySelector('link[data-mo-about-fonts]')) return;

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700&display=swap';
        link.setAttribute('data-mo-about-fonts', 'true');
        document.head.appendChild(link);
    }

    function addStyles() {
        if (document.getElementById(STYLE_ID)) return;

        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            body.mo-about-ready #divIcerik.ticiContainer { width:100%!important; max-width:none!important; margin:0!important; padding:0!important; }
            #${ROOT_ID}, #${ROOT_ID} * { box-sizing:border-box; }
            #${ROOT_ID} { --mo-navy:#03235e; --mo-teal:#0c4853; --mo-cyan:#4fa0c9; --mo-ink:#102338; --mo-muted:#667789; --mo-paper:#f3f8fa; --mo-line:#dce8ec; width:100%; overflow:hidden; color:var(--mo-ink); font-family:'DM Sans',Arial,sans-serif; background:#fff; }
            #${ROOT_ID} h1, #${ROOT_ID} h2, #${ROOT_ID} h3, #${ROOT_ID} p { margin-top:0; }
            #${ROOT_ID} a { text-decoration:none; }
            #${ROOT_ID} a:focus-visible { outline:3px solid rgba(79,160,201,.45); outline-offset:4px; }
            .mo-about-shell { width:min(1200px,calc(100% - 48px)); margin-inline:auto; }
            .mo-about-kicker { display:flex; align-items:center; gap:12px; color:var(--mo-cyan); font-size:11px; font-weight:700; letter-spacing:.17em; text-transform:uppercase; }
            .mo-about-kicker::before { content:''; width:32px; height:1px; background:currentColor; }
            .mo-about-hero { display:grid; grid-template-columns:minmax(0,1.08fr) minmax(390px,.92fr); min-height:650px; background:var(--mo-paper); }
            .mo-about-hero-copy { display:flex; flex-direction:column; justify-content:center; padding:80px max(38px,calc((100vw - 1200px)/2)); padding-right:clamp(46px,7vw,110px); }
            .mo-about-hero h1 { max-width:760px; margin:24px 0 25px; color:var(--mo-navy); font-family:'Manrope',Arial,sans-serif; font-size:clamp(48px,6.25vw,88px); font-weight:600; line-height:.98; letter-spacing:-.065em; }
            .mo-about-hero h1 em { color:var(--mo-teal); font-style:normal; }
            .mo-about-hero-copy > p { max-width:610px; margin-bottom:32px; color:var(--mo-muted); font-size:clamp(15px,1.25vw,18px); line-height:1.78; }
            .mo-about-actions { display:flex; align-items:center; gap:25px; }
            .mo-about-button { display:inline-flex; align-items:center; justify-content:center; gap:12px; min-height:52px; padding:0 24px; border-radius:4px; font-size:12px; font-weight:700; letter-spacing:.04em; transition:transform .2s ease,background .2s ease,color .2s ease,box-shadow .2s ease; }
            .mo-about-button:hover { transform:translateY(-2px); }
            .mo-about-button--primary { color:#fff; background:var(--mo-navy); box-shadow:0 12px 28px rgba(3,35,94,.16); }
            .mo-about-button--primary:hover { background:var(--mo-teal); }
            .mo-about-button--text { min-height:auto; padding:8px 0; color:var(--mo-navy); border-bottom:1px solid rgba(3,35,94,.28); border-radius:0; }
            .mo-about-hero-art { position:relative; display:grid; place-items:center; min-height:650px; overflow:hidden; color:#c8f0f2; background:var(--mo-navy); }
            .mo-about-hero-art::before { content:''; position:absolute; inset:0; background:radial-gradient(circle at center,rgba(79,160,201,.23),transparent 58%); }
            .mo-about-hero-art::after { content:''; position:absolute; inset:0; opacity:.18; background-image:linear-gradient(rgba(255,255,255,.2) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.2) 1px,transparent 1px); background-size:28px 28px; }
            .mo-about-motif { position:relative; z-index:1; width:min(88%,590px); animation:moAboutBreathe 8s ease-in-out infinite; }
            .mo-about-art-label { position:absolute; z-index:2; right:30px; bottom:28px; display:flex; align-items:center; gap:13px; color:#fff; font-size:10px; letter-spacing:.13em; text-transform:uppercase; }
            .mo-about-art-label span { display:grid; place-items:center; width:31px; height:31px; color:var(--mo-navy); border-radius:50%; background:#fff; font-weight:700; }
            .mo-about-art-label strong { font-weight:600; }
            @keyframes moAboutBreathe { 0%,100%{transform:scale(.985) rotate(0)} 50%{transform:scale(1.015) rotate(1deg)} }
            .mo-about-story { display:grid; grid-template-columns:160px minmax(0,1.05fr) minmax(300px,.75fr); gap:clamp(38px,6vw,88px); padding-top:120px; padding-bottom:120px; }
            .mo-about-section-index { display:flex; align-items:center; align-self:start; gap:10px; padding-top:9px; color:var(--mo-teal); font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; }
            .mo-about-section-index i { display:block; width:35px; height:1px; background:var(--mo-line); }
            .mo-about-story h2, .mo-about-process h2, .mo-about-values h2, .mo-about-collection h2, .mo-about-cta h2 { font-family:'Manrope',Arial,sans-serif; font-weight:600; letter-spacing:-.045em; }
            .mo-about-story h2 { margin-bottom:0; color:var(--mo-navy); font-size:clamp(32px,4vw,53px); line-height:1.12; }
            .mo-about-story-text { padding-top:7px; }
            .mo-about-story-text p { margin-bottom:20px; color:var(--mo-muted); font-size:14px; line-height:1.85; }
            .mo-about-story-text p:last-child { margin-bottom:0; }
            .mo-about-process { padding:105px 0 112px; background:var(--mo-navy); }
            .mo-about-process-heading { display:flex; align-items:end; justify-content:space-between; gap:40px; margin-bottom:55px; }
            .mo-about-process-heading .mo-about-kicker { flex:0 0 auto; }
            .mo-about-process h2 { max-width:680px; margin:0; color:#fff; font-size:clamp(33px,4.4vw,58px); line-height:1.08; }
            .mo-about-process-grid { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid rgba(255,255,255,.2); }
            .mo-about-process-card { position:relative; min-height:350px; padding:38px 40px 35px 0; color:#fff; border-right:1px solid rgba(255,255,255,.16); }
            .mo-about-process-card + .mo-about-process-card { padding-left:40px; }
            .mo-about-process-card:last-child { border-right:0; }
            .mo-about-card-number { position:absolute; top:28px; right:26px; color:rgba(255,255,255,.38); font-size:10px; font-weight:700; letter-spacing:.12em; }
            .mo-about-process-card svg { width:56px; height:56px; margin:24px 0 54px; color:#8ad4dc; fill:none; stroke:currentColor; stroke-width:1.4; }
            .mo-about-process-card h3 { margin-bottom:13px; font-family:'Manrope',Arial,sans-serif; font-size:25px; font-weight:600; }
            .mo-about-process-card p { max-width:310px; margin-bottom:0; color:rgba(255,255,255,.66); font-size:13px; line-height:1.75; }
            .mo-about-values { display:grid; grid-template-columns:minmax(270px,.7fr) minmax(0,1.3fr); gap:clamp(55px,9vw,135px); padding-top:120px; padding-bottom:120px; }
            .mo-about-values-heading { position:sticky; top:35px; align-self:start; }
            .mo-about-values h2 { max-width:430px; margin:24px 0 0; color:var(--mo-navy); font-size:clamp(35px,4.2vw,57px); line-height:1.08; }
            .mo-about-values-list { border-top:1px solid var(--mo-line); }
            .mo-about-values-list article { display:grid; grid-template-columns:56px 1fr; gap:26px; padding:31px 0; border-bottom:1px solid var(--mo-line); }
            .mo-about-values-list article > span { padding-top:6px; color:var(--mo-cyan); font-size:10px; font-weight:700; letter-spacing:.1em; }
            .mo-about-values-list h3 { margin-bottom:7px; color:var(--mo-teal); font-family:'Manrope',Arial,sans-serif; font-size:21px; font-weight:600; }
            .mo-about-values-list p { margin-bottom:0; color:var(--mo-muted); font-size:13px; line-height:1.7; }
            .mo-about-collection { display:grid; grid-template-columns:1fr 1fr; min-height:650px; background:#e9f3f5; }
            .mo-about-collection-pattern { position:relative; display:grid; grid-template-columns:repeat(5,1fr); overflow:hidden; background:var(--mo-teal); }
            .mo-about-collection-pattern::after { content:''; position:absolute; inset:12%; border:1px solid rgba(255,255,255,.32); transform:rotate(45deg); }
            .mo-about-collection-pattern span { position:relative; border-right:1px solid rgba(255,255,255,.14); }
            .mo-about-collection-pattern span::before, .mo-about-collection-pattern span::after { content:''; position:absolute; left:50%; width:86px; height:86px; border:1px solid rgba(184,235,239,.55); transform:translateX(-50%) rotate(45deg); }
            .mo-about-collection-pattern span::before { top:18%; }
            .mo-about-collection-pattern span::after { bottom:18%; }
            .mo-about-collection-pattern span:nth-child(even) { background:rgba(79,160,201,.16); }
            .mo-about-collection-pattern span:nth-child(even)::before { top:35%; }
            .mo-about-collection-pattern span:nth-child(even)::after { bottom:35%; }
            .mo-about-collection-copy { display:flex; flex-direction:column; justify-content:center; padding:80px clamp(45px,8vw,130px); }
            .mo-about-collection h2 { max-width:600px; margin:25px 0 22px; color:var(--mo-navy); font-size:clamp(38px,4.5vw,62px); line-height:1.05; }
            .mo-about-collection-copy > p { max-width:520px; margin-bottom:32px; color:var(--mo-muted); font-size:14px; line-height:1.8; }
            .mo-about-category-links { display:grid; grid-template-columns:1fr 1fr; gap:0 28px; max-width:550px; border-top:1px solid rgba(3,35,94,.15); }
            .mo-about-category-links a { display:flex; align-items:center; justify-content:space-between; min-height:54px; color:var(--mo-teal); font-size:12px; font-weight:700; border-bottom:1px solid rgba(3,35,94,.15); transition:color .2s,padding .2s; }
            .mo-about-category-links a:hover { padding-left:6px; color:var(--mo-cyan); }
            .mo-about-cta { display:flex; align-items:center; justify-content:space-between; gap:40px; margin-top:100px; margin-bottom:100px; padding:54px 58px; color:#fff; background:var(--mo-navy); }
            .mo-about-cta .mo-about-kicker { color:#8ad4dc; }
            .mo-about-cta h2 { max-width:690px; margin:17px 0 0; color:#fff; font-size:clamp(29px,4vw,49px); line-height:1.1; }
            .mo-about-button--light { flex:0 0 auto; color:var(--mo-navy); background:#fff; }
            .mo-about-button--light:hover { color:#fff; background:var(--mo-cyan); }
            .mo-about-motion [data-mo-reveal] { opacity:0; transform:translateY(24px); transition:opacity .72s cubic-bezier(.2,.7,.2,1),transform .72s cubic-bezier(.2,.7,.2,1); }
            .mo-about-motion [data-mo-reveal].is-visible { opacity:1; transform:none; }
            @media(max-width:980px) {
                .mo-about-hero { grid-template-columns:1fr; }
                .mo-about-hero-copy { min-height:560px; padding:80px max(28px,calc((100vw - 760px)/2)); }
                .mo-about-hero-art { min-height:520px; }
                .mo-about-story { grid-template-columns:120px 1fr; }
                .mo-about-story-text { grid-column:2; }
                .mo-about-process-heading { display:block; }
                .mo-about-process-heading h2 { margin-top:24px; }
                .mo-about-process-card { padding-right:25px; }
                .mo-about-process-card + .mo-about-process-card { padding-left:25px; }
                .mo-about-values { grid-template-columns:1fr; gap:48px; }
                .mo-about-values-heading { position:static; }
                .mo-about-collection { grid-template-columns:1fr; }
                .mo-about-collection-pattern { min-height:430px; }
            }
            @media(max-width:680px) {
                .mo-about-shell { width:min(100% - 30px,1200px); }
                .mo-about-kicker { font-size:9px; }
                .mo-about-hero-copy { min-height:auto; padding:72px 22px 66px; }
                .mo-about-hero h1 { margin-top:19px; font-size:clamp(42px,13vw,60px); }
                .mo-about-actions { align-items:flex-start; flex-direction:column; gap:18px; }
                .mo-about-hero-art { min-height:390px; }
                .mo-about-art-label { right:18px; bottom:18px; }
                .mo-about-story { display:block; padding-top:76px; padding-bottom:76px; }
                .mo-about-story-copy { margin:30px 0 28px; }
                .mo-about-story h2 { font-size:35px; }
                .mo-about-process { padding:74px 0; }
                .mo-about-process h2 { font-size:35px; }
                .mo-about-process-grid { grid-template-columns:1fr; margin-top:40px; }
                .mo-about-process-card, .mo-about-process-card + .mo-about-process-card { min-height:auto; padding:34px 10px 36px; border-right:0; border-bottom:1px solid rgba(255,255,255,.16); }
                .mo-about-process-card:last-child { border-bottom:0; }
                .mo-about-process-card svg { margin:12px 0 30px; }
                .mo-about-values { padding-top:76px; padding-bottom:76px; }
                .mo-about-values h2 { font-size:36px; }
                .mo-about-values-list article { grid-template-columns:42px 1fr; gap:12px; }
                .mo-about-collection-pattern { min-height:310px; }
                .mo-about-collection-pattern span::before, .mo-about-collection-pattern span::after { width:54px; height:54px; }
                .mo-about-collection-copy { padding:68px 22px; }
                .mo-about-collection h2 { font-size:38px; }
                .mo-about-category-links { grid-template-columns:1fr; }
                .mo-about-cta { align-items:flex-start; flex-direction:column; margin-top:65px; margin-bottom:65px; padding:38px 27px; }
                .mo-about-cta h2 { font-size:32px; }
            }
            @media(prefers-reduced-motion:reduce) {
                .mo-about-motif { animation:none; }
                .mo-about-motion [data-mo-reveal] { opacity:1; transform:none; transition:none; }
                .mo-about-button { transition:none; }
            }
        `;
        document.head.appendChild(style);
    }

    function enableReveal(root) {
        if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        root.classList.add('mo-about-motion');
        var items = root.querySelectorAll('[data-mo-reveal]');
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

        Array.prototype.forEach.call(items, function (item, index) {
            item.style.transitionDelay = Math.min(index % 4, 3) * 70 + 'ms';
            observer.observe(item);
        });
    }

    function init() {
        var root = document.getElementById(ROOT_ID);
        if (!root || root.getAttribute('data-mo-ready') === 'true') return;

        root.setAttribute('data-mo-ready', 'true');
        document.body.classList.add('mo-about-ready');
        addFonts();
        addStyles();
        enableReveal(root);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
