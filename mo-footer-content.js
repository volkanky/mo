(function () {
    'use strict';

    var VERSION = '20261009-1';
    var STYLE_ID = 'moFooterContentStyles';
    var BLOCK_SELECTOR = '.ticiBottomBlockContent';
    var STATE_KEY = '__moFooterContent';

    function addStyles() {
        var style = document.getElementById(STYLE_ID) || document.createElement('style');
        style.id = STYLE_ID;
        style.setAttribute('data-mo-version', VERSION);
        style.textContent = `
            .ticiBottomBlockContent.mo-footer-content, .ticiBottomBlockContent.mo-footer-content * { box-sizing:border-box; letter-spacing:0; }
            .ticiBottomBlockContent.mo-footer-content { position:relative; isolation:isolate; overflow:hidden; clear:both; float:none!important; width:100%!important; max-width:none!important; margin:0!important; padding:0!important; border:0!important; border-top:1px solid #dce8ec!important; background:linear-gradient(110deg,#edf6f9,#fff 65%,#eef7f5)!important; color:#465d6b; font-family:'DM Sans',Arial,sans-serif; text-align:left!important; }
            .ticiBottomBlockContent.mo-footer-content::before, .ticiBottomBlockContent.mo-footer-content::after { content:''; position:absolute; z-index:-1; top:32px; right:-80px; width:220px; height:220px; border:1px solid rgba(79,160,201,.16); transform:rotate(45deg); pointer-events:none; }
            .ticiBottomBlockContent.mo-footer-content::after { top:72px; right:-40px; width:140px; height:140px; border-color:rgba(12,72,83,.12); }
            .ticiBottomBlockContent.mo-footer-content .categorydesign { display:block; float:none!important; width:calc(100% - 48px)!important; max-width:1240px!important; min-width:0; margin:0 auto!important; padding:42px 0 44px!important; border:0!important; background:none!important; color:inherit; font-family:inherit; font-size:14px; line-height:1.85; text-align:left!important; }
            .ticiBottomBlockContent.mo-footer-content .categorydesign.mo-footer-content-layout { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,2.1fr); align-items:start; gap:48px; }
            .ticiBottomBlockContent.mo-footer-content h1, .ticiBottomBlockContent.mo-footer-content h2, .ticiBottomBlockContent.mo-footer-content h3, .ticiBottomBlockContent.mo-footer-content h4 { display:block; float:none; width:auto; height:auto; padding:0; border:0; background:none; color:#03235e; font-family:inherit; font-weight:600; line-height:1.4; text-align:left; text-transform:none; overflow-wrap:anywhere; }
            .ticiBottomBlockContent.mo-footer-content h1 { margin:0 0 24px; font-size:26px; }
            .ticiBottomBlockContent.mo-footer-content .mo-footer-content-layout > h1 { margin:0; }
            .ticiBottomBlockContent.mo-footer-content .mo-footer-content-layout > h1::before { content:''; display:block; width:42px; height:3px; margin:0 0 18px; background:#4fa0c9; }
            .ticiBottomBlockContent.mo-footer-content h2 { margin:24px 0 12px; color:#0c4853; font-size:19px; }
            .ticiBottomBlockContent.mo-footer-content h3 { margin:24px 0 10px; font-size:16px; }
            .ticiBottomBlockContent.mo-footer-content h4 { margin:20px 0 8px; font-size:15px; }
            .ticiBottomBlockContent.mo-footer-content p, .ticiBottomBlockContent.mo-footer-content li { color:#465d6b; font-family:inherit; font-size:14px; line-height:1.85; text-align:left; overflow-wrap:anywhere; }
            .ticiBottomBlockContent.mo-footer-content p { margin:0 0 16px; padding:0; }
            .ticiBottomBlockContent.mo-footer-content .mo-footer-content-copy { min-width:0; }
            .ticiBottomBlockContent.mo-footer-content .mo-footer-content-copy > :first-child { margin-top:0; }
            .ticiBottomBlockContent.mo-footer-content .mo-footer-content-copy > :last-child { margin-bottom:0; }
            .ticiBottomBlockContent.mo-footer-content ul, .ticiBottomBlockContent.mo-footer-content ol { margin:12px 0 16px; padding-left:22px; }
            .ticiBottomBlockContent.mo-footer-content li { margin:0 0 6px; }
            .ticiBottomBlockContent.mo-footer-content a { color:#0c4853; text-decoration:underline; text-underline-offset:3px; overflow-wrap:anywhere; }
            .ticiBottomBlockContent.mo-footer-content a:hover { color:#03235e; }
            .ticiBottomBlockContent.mo-footer-content a:focus-visible { outline:2px solid #4fa0c9; outline-offset:3px; }
            .ticiBottomBlockContent.mo-footer-content img, .ticiBottomBlockContent.mo-footer-content video { max-width:100%; height:auto; }
            .ticiBottomBlockContent.mo-footer-content table { display:block; max-width:100%; overflow-x:auto; }
            @media (max-width:900px) {
                .ticiBottomBlockContent.mo-footer-content .categorydesign.mo-footer-content-layout { grid-template-columns:minmax(0,1fr); gap:24px; }
                .ticiBottomBlockContent.mo-footer-content h1 { max-width:640px; font-size:24px; }
            }
            @media (max-width:600px) {
                .ticiBottomBlockContent.mo-footer-content .categorydesign { width:calc(100% - 32px)!important; padding:30px 0 32px!important; }
                .ticiBottomBlockContent.mo-footer-content h1 { font-size:22px; }
                .ticiBottomBlockContent.mo-footer-content h2 { font-size:18px; }
                .ticiBottomBlockContent.mo-footer-content::before { right:-130px; }
                .ticiBottomBlockContent.mo-footer-content::after { right:-90px; }
            }
            @media print {
                .ticiBottomBlockContent.mo-footer-content { background:#fff!important; overflow:visible; }
                .ticiBottomBlockContent.mo-footer-content::before, .ticiBottomBlockContent.mo-footer-content::after { display:none; }
                .ticiBottomBlockContent.mo-footer-content .categorydesign.mo-footer-content-layout { display:block; }
                .ticiBottomBlockContent.mo-footer-content .mo-footer-content-layout > h1 { margin-bottom:20px; }
            }
        `;
        if (!style.parentNode) document.head.appendChild(style);
    }

    function arrange(content) {
        var title = content.querySelector(':scope > h1');
        if (content.querySelector(':scope > .mo-footer-content-copy')) {
            content.classList.toggle('mo-footer-content-layout', Boolean(title));
            return;
        }
        if (!title || !Array.from(content.children).some(function (node) { return node !== title; })) {
            content.classList.remove('mo-footer-content-layout');
            return;
        }
        var copy = document.createElement('div');
        copy.className = 'mo-footer-content-copy';
        // Preserve the native nodes, their text, links and event listeners.
        Array.from(content.childNodes).forEach(function (node) {
            if (node.nodeType === 3 && !node.textContent.trim()) node.textContent = node.textContent.replace(/\u00a0/g, ' ');
            if (node !== title) copy.appendChild(node);
        });
        content.appendChild(copy);
        content.classList.add('mo-footer-content-layout');
    }

    function refresh() {
        var populated = false;
        document.querySelectorAll(BLOCK_SELECTOR).forEach(function (block) {
            var contents = Array.from(block.querySelectorAll('.categorydesign'));
            var hasContent = contents.some(function (content) {
                return content.textContent.trim() || content.querySelector('img, video, iframe, table');
            });
            block.classList.toggle('mo-footer-content', Boolean(hasContent));
            if (!hasContent) return;
            populated = true;
            block.setAttribute('data-mo-content-version', VERSION);
            contents.forEach(arrange);
        });
        if (populated && !document.querySelector('link[data-mo-footer-font], link[data-mo-footer-content-font]')) {
            var font = document.createElement('link');
            font.rel = 'stylesheet';
            font.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap';
            font.setAttribute('data-mo-footer-content-font', '');
            document.head.appendChild(font);
        }
    }

    function relevant(node) {
        if (node.nodeType !== 1) return false;
        return node.matches(BLOCK_SELECTOR) || Boolean(node.querySelector(BLOCK_SELECTOR));
    }

    function boot() {
        addStyles();
        if (window[STATE_KEY]) { window[STATE_KEY].refresh(); return; }
        var pending = false;
        var observer = new MutationObserver(function (mutations) {
            var changed = mutations.some(function (mutation) {
                var target = mutation.target.nodeType === 1 ? mutation.target : mutation.target.parentElement;
                return target && target.closest(BLOCK_SELECTOR) ||
                    Array.from(mutation.addedNodes).some(relevant) || Array.from(mutation.removedNodes).some(relevant);
            });
            if (!changed || pending) return;
            pending = true;
            window.setTimeout(function () { pending = false; refresh(); }, 0);
        });
        window[STATE_KEY] = { refresh:refresh, observer:observer };
        refresh();
        observer.observe(document.body, { childList:true, subtree:true, characterData:true });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
    else boot();
}());
