/* Motif Istanbul FAQ and help styles/behavior, loaded outside the page editor. */
(function () {
    'use strict';

    var VERSION = '20261009-2';

    function addStyles() {
        var style = document.getElementById('moSupportStyles') || document.createElement('style');
        style.id = 'moSupportStyles';
        style.setAttribute('data-mo-version', VERSION);
        style.textContent = "#moSupport, #moSupport * { box-sizing:border-box; letter-spacing:0; }\n#moSupport { --mo-ink:#03235e; --mo-teal:#0c4853; --mo-accent:#4fa0c9; --mo-line:#dce5e9; max-width:1240px; width:100%; margin:0 auto; padding:36px 0 80px; background:#fff; color:#465d6b; font-family:'DM Sans',Arial,sans-serif; }\n#moSupport [hidden] { display:none!important; }\n#moSupport a { text-decoration:none; }\n#moSupport :focus-visible { outline:2px solid var(--mo-accent); outline-offset:3px; }\n#moSupport .mo-support-layout { display:grid; grid-template-columns:240px minmax(0,1fr); gap:40px; align-items:start; }\n#moSupport .mo-support-sidebar { position:sticky; top:24px; min-width:0; padding-right:24px; border-right:1px solid var(--mo-line); }\n#moSupport .mo-support-sidebar h2 { margin:0 0 18px; color:var(--mo-ink); font-size:14px; line-height:1.4; font-weight:700; }\n#moSupport .mo-support-pages { display:grid; gap:4px; }\n#moSupport .mo-support-pages a { display:grid; grid-template-columns:20px minmax(0,1fr); gap:10px; align-items:center; min-height:52px; padding:11px 12px; border-left:3px solid transparent; border-radius:0 4px 4px 0; color:#5b6d78; font-size:12px; font-weight:500; line-height:1.5; overflow-wrap:anywhere; }\n#moSupport .mo-support-pages i { text-align:center; font-size:15px; color:#7c919c; }\n#moSupport .mo-support-pages a:hover { color:var(--mo-teal); background:#f5f9fa; }\n#moSupport .mo-support-pages a[aria-current='page'] { border-left-color:var(--mo-accent); color:var(--mo-teal); background:#edf6fa; font-weight:700; }\n#moSupport .mo-support-pages a[aria-current='page'] i { color:var(--mo-teal); }\n#moSupport .mo-support-topics { margin-top:24px; padding-top:22px; border-top:1px solid var(--mo-line); }\n#moSupport .mo-support-topics h3 { margin:0 0 12px; padding:0 12px; color:#71838e; font-size:10px; line-height:1.5; font-weight:600; }\n#moSupport .mo-support-topic-links { display:grid; gap:2px; }\n#moSupport .mo-support-topic-links a { display:grid; grid-template-columns:18px minmax(0,1fr) 20px; align-items:center; gap:8px; min-height:44px; padding:10px 12px; color:#5b6d78; font-size:12px; line-height:1.5; }\n#moSupport .mo-support-topic-links a:hover, #moSupport .mo-support-topic-links a[aria-current='location'] { color:var(--mo-teal); background:#f5f9fa; }\n#moSupport .mo-support-topic-links i { color:#7c919c; text-align:center; font-size:13px; }\n#moSupport .mo-support-topic-links small { text-align:right; color:#7c919c; font-size:10px; font-weight:500; }\n#moSupport .mo-support-topic-links a[aria-disabled='true'] { opacity:.4; pointer-events:none; }\n#moSupport .mo-support-mobile { display:none; }\n#moSupport .mo-support-content { min-width:0; }\n#moSupport .mo-support-heading { margin:0 0 24px; padding:0 0 22px; border-bottom:1px solid var(--mo-line); }\n#moSupport .mo-support-kicker { display:block; margin-bottom:10px; color:#667782; font-size:10px; line-height:1.4; font-weight:600; }\n#moSupport h1 { margin:0; color:var(--mo-ink); font-size:28px; line-height:1.3; font-weight:700; overflow-wrap:anywhere; }\n#moSupport .mo-support-search { display:none; grid-template-columns:minmax(0,1fr) 64px; gap:16px; align-items:center; margin:0 0 30px; }\n#moSupport[data-mo-ready] .mo-support-search { display:grid; }\n#moSupport .mo-support-search-field { display:grid; grid-template-columns:20px minmax(0,1fr) 44px; align-items:center; gap:10px; height:50px; padding:0 2px 0 16px; border:1px solid #cbdce4; border-radius:4px; background:#f6fafb; }\n#moSupport .mo-support-search-field:focus-within { border-color:var(--mo-accent); box-shadow:0 0 0 2px #edf6fa; }\n#moSupport .mo-support-search-field > i { color:#6c8999; font-size:16px; }\n#moSupport .mo-support-search input { min-width:0; width:100%; height:48px; margin:0; padding:0; border:0; border-radius:0; outline:none; background:transparent; color:var(--mo-ink); font:400 15px/1.5 'DM Sans',Arial,sans-serif; }\n#moSupport .mo-support-search input::placeholder { color:#71838e; opacity:1; }\n#moSupport .mo-support-search input::-webkit-search-cancel-button { -webkit-appearance:none; }\n#moSupport .mo-support-clear { display:flex; align-items:center; justify-content:center; width:44px; height:44px; margin:0; padding:0; border:0; border-radius:4px; background:transparent; color:var(--mo-teal); cursor:pointer; }\n#moSupport .mo-support-clear:disabled { visibility:hidden; }\n#moSupport .mo-support-clear:hover { background:#e9f2f6; }\n#moSupport .mo-support-count { color:#71838e; font-size:11px; line-height:1.5; font-weight:500; text-align:right; }\n#moSupport .mo-support-group { margin:0 0 30px; scroll-margin-top:24px; }\n#moSupport .mo-support-group > h2 { display:flex; align-items:center; gap:10px; margin:0; padding:0 0 14px; color:var(--mo-ink); font-size:16px; font-weight:700; line-height:1.5; overflow-wrap:anywhere; }\n#moSupport .mo-support-group > h2 i { color:var(--mo-teal); font-size:16px; }\n#moSupport .mo-support-group > h2 span { min-width:0; }\n#moSupport .mo-support-group > h2 small { margin-left:auto; color:#7c919c; font-size:11px; font-weight:500; white-space:nowrap; }\n#moSupport .mo-support-question { margin:0; padding:0; border-top:1px solid #e7edef; border-radius:0; background:#fff; }\n#moSupport .mo-support-question:last-child { border-bottom:1px solid #e7edef; }\n#moSupport .mo-support-question summary { display:grid; grid-template-columns:minmax(0,1fr) 20px; gap:16px; align-items:center; min-height:62px; padding:18px 0; color:#25394a; cursor:pointer; list-style:none; font-size:14px; font-weight:600; line-height:1.65; overflow-wrap:anywhere; }\n#moSupport .mo-support-question summary::-webkit-details-marker { display:none; }\n#moSupport .mo-support-question summary::marker { content:''; }\n#moSupport .mo-support-question summary > i { display:block; justify-self:center; width:12px; height:12px; margin:0; padding:0; color:#78949f; font-size:12px; line-height:12px; text-align:center; transition:transform .16s ease; }\n#moSupport .mo-support-question summary:hover { color:var(--mo-teal); }\n#moSupport .mo-support-question[open] summary { color:var(--mo-teal); }\n#moSupport .mo-support-question[open] summary > i { transform:rotate(45deg); color:var(--mo-teal); }\n#moSupport .mo-support-answer { padding:0 36px 20px 0; color:#465d6b; font-size:14px; line-height:1.85; overflow-wrap:anywhere; }\n#moSupport .mo-support-answer p { margin:0; padding:0; color:inherit; font-size:inherit; line-height:inherit; }\n#moSupport .mo-support-answer p + p { margin-top:12px; }\n#moSupport .mo-support-answer a { color:var(--mo-teal); text-decoration:underline; text-underline-offset:3px; }\n#moSupport .mo-support-empty { margin:0 0 32px; padding:24px 0; border-top:1px solid var(--mo-line); border-bottom:1px solid var(--mo-line); color:#5b6d78; font-size:14px; line-height:1.7; }\n#moSupport .mo-support-empty p { margin:0; color:inherit; font-size:inherit; }\n#moSupport .mo-support-contact { margin-top:36px; padding:24px 0; border-top:1px solid var(--mo-line); border-bottom:1px solid var(--mo-line); }\n#moSupport .mo-support-contact h2 { margin:0 0 14px; color:var(--mo-ink); font-size:15px; font-weight:700; line-height:1.5; }\n#moSupport .mo-support-contact-links { display:flex; flex-wrap:wrap; align-items:center; gap:10px 24px; }\n#moSupport .mo-support-contact-links a { display:inline-flex; align-items:center; gap:8px; min-height:44px; padding:0; color:var(--mo-teal); font-size:13px; font-weight:500; line-height:1.5; overflow-wrap:anywhere; }\n#moSupport .mo-support-contact-links a:hover { color:var(--mo-ink); text-decoration:underline; text-underline-offset:3px; }\n#moSupport .mo-support-contact-links .mo-support-whatsapp { padding:10px 14px; border:1px solid #c9e6da; border-radius:4px; background:#eef8f2; color:#1f654c; }\n#moSupport .mo-support-contact-links .mo-support-whatsapp:hover { background:#e3f3e9; }\n#moSupport .mo-support-contact-links i { width:18px; text-align:center; font-size:16px; }\n@media (max-width:800px) {\n    #moSupport { padding:24px 0 64px; }\n    #moSupport .mo-support-layout { grid-template-columns:minmax(0,1fr); gap:24px; }\n    #moSupport .mo-support-sidebar { position:static; padding:0 0 18px; border-right:0; border-bottom:1px solid var(--mo-line); }\n    #moSupport .mo-support-sidebar h2 { display:none; }\n    #moSupport .mo-support-pages { grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; }\n    #moSupport .mo-support-pages a { min-height:60px; padding:8px; gap:7px; font-size:12px; }\n    #moSupport .mo-support-topics { margin-top:12px; padding-top:0; border-top:0; }\n    #moSupport .mo-support-topics h3 { display:none; }\n    #moSupport[data-mo-ready] .mo-support-topic-links { display:none; }\n    #moSupport[data-mo-ready] .mo-support-mobile { display:block; }\n    #moSupport .mo-support-mobile select { -webkit-appearance:auto; appearance:auto; display:block; width:100%; height:48px; margin:0; padding:0 12px; border:1px solid #cbdce4; border-radius:4px; background:#f6fafb; color:var(--mo-ink); font:500 16px/1.4 'DM Sans',Arial,sans-serif; }\n    #moSupport h1 { font-size:24px; }\n    #moSupport .mo-support-search { grid-template-columns:minmax(0,1fr) 52px; gap:10px; margin-bottom:26px; }\n    #moSupport .mo-support-search input { font-size:16px; }\n    #moSupport .mo-support-group > h2 { font-size:15px; }\n    #moSupport .mo-support-question summary { min-height:60px; font-size:13px; gap:12px; }\n    #moSupport .mo-support-answer { padding-right:24px; font-size:13px; }\n    #moSupport .mo-support-contact-links { gap:8px 20px; }\n}\n@media (prefers-reduced-motion:reduce) {\n    #moSupport .mo-support-question summary > i { transition:none; }\n}\n@media print {\n    body.mo-support-ready #header, body.mo-support-ready #footer, body.mo-support-ready .bottomHead, body.mo-support-ready #moWhatsappButton, body.mo-support-ready #back-to-top { display:none!important; }\n    #moSupport { max-width:none; padding:0; }\n    #moSupport .mo-support-layout { display:block; }\n    #moSupport .mo-support-sidebar, #moSupport .mo-support-search, #moSupport .mo-support-empty, #moSupport .mo-support-contact, #moSupport .mo-support-kicker { display:none!important; }\n    #moSupport .mo-support-question summary > i { display:none; }\n    #moSupport .mo-support-question summary { grid-template-columns:minmax(0,1fr); min-height:0; padding:12px 0; color:#000; }\n    #moSupport .mo-support-answer { color:#000; }\n    #moSupport .mo-support-question { break-inside:avoid; }\n}";
        if (!style.parentNode) document.head.appendChild(style);
    }

    function normalize(value) {
        return value.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\u0131/g, 'i');
    }

    function init() {
        var root = document.getElementById('moSupport');
        if (!root || root.hasAttribute('data-mo-ready')) return;
        var input = root.querySelector('[data-mo-support-search]');
        var clear = root.querySelector('[data-mo-support-clear]');
        var count = root.querySelector('[data-mo-support-count]');
        var empty = root.querySelector('[data-mo-support-empty]');
        var topics = root.querySelector('[data-mo-support-topics]');
        var select = root.querySelector('[data-mo-support-topic-select]');
        if (!input || !clear || !count || !empty || !topics || !select) return;
        addStyles();
        if (!document.querySelector('link[data-mo-support-font]')) {
            var font = document.createElement('link');
            font.rel = 'stylesheet';
            font.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap';
            font.setAttribute('data-mo-support-font', '');
            document.head.appendChild(font);
        }

        var questions = Array.from(root.querySelectorAll('details[data-mo-support-question]'));
        var groups = Array.from(root.querySelectorAll('[data-mo-support-group]'));
        var links = Array.from(topics.querySelectorAll('a[href^="#"]'));
        var index = new Map(questions.map(function (question) { return [question, normalize(question.textContent)]; }));
        var savedOpen = null;
        var printState = null;

        function applySearch() {
            var query = normalize(input.value.trim());
            var terms = query.split(/\s+/).filter(Boolean);
            if (terms.length && !savedOpen) savedOpen = new Map(questions.map(function (question) { return [question, question.open]; }));
            var visible = 0;
            questions.forEach(function (question) {
                var matches = terms.every(function (term) { return index.get(question).includes(term); });
                question.hidden = !matches;
                if (matches) visible++;
                if (terms.length) question.open = matches;
                else if (savedOpen) question.open = savedOpen.get(question);
            });
            if (!terms.length) savedOpen = null;
            groups.forEach(function (group) {
                var total = Array.from(group.querySelectorAll('[data-mo-support-question]')).filter(function (question) { return !question.hidden; }).length;
                group.hidden = total === 0;
                group.querySelector('[data-mo-support-group-count]').textContent = total + ' soru';
                var link = links.find(function (item) { return item.hash === '#' + group.id; });
                link.setAttribute('aria-disabled', String(total === 0));
                link.querySelector('small').textContent = total;
                Array.from(select.options).forEach(function (option) { if (option.value === group.id) option.disabled = total === 0; });
            });
            if (select.value && document.getElementById(select.value).hidden) setTopic('');
            clear.disabled = input.value.length === 0;
            count.textContent = visible + ' soru';
            empty.hidden = visible !== 0;
        }

        function reset() {
            input.value = '';
            applySearch();
            input.focus({ preventScroll:true });
        }

        function setTopic(id) {
            links.forEach(function (link) {
                if (link.hash === '#' + id) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
            select.value = groups.some(function (group) { return group.id === id && !group.hidden; }) ? id : '';
        }

        function revealHash() {
            var id;
            try { id = decodeURIComponent(window.location.hash.slice(1)); } catch (error) { return; }
            var question = questions.find(function (item) { return item.id === id; });
            var group = groups.find(function (item) { return item.id === id; });
            if (question) {
                if (question.hidden) { input.value = ''; applySearch(); }
                question.open = true;
                group = question.closest('[data-mo-support-group]');
            }
            if (group) setTopic(group.id);
        }

        input.addEventListener('input', applySearch);
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') { event.preventDefault(); event.stopPropagation(); applySearch(); }
            if (event.key === 'Escape' && input.value) { event.preventDefault(); reset(); }
        });
        clear.addEventListener('click', reset);
        topics.addEventListener('click', function (event) {
            var link = event.target.closest('a[href^="#"]');
            if (!link) return;
            if (link.getAttribute('aria-disabled') === 'true') { event.preventDefault(); return; }
            setTopic(link.hash.slice(1));
        });
        select.addEventListener('change', function () {
            var group = groups.find(function (item) { return item.id === select.value; });
            if (!group) { setTopic(''); return; }
            setTopic(group.id);
            window.location.hash = group.id;
        });
        window.addEventListener('hashchange', revealHash);
        window.addEventListener('beforeprint', function () {
            if (printState) return;
            printState = questions.map(function (question) { return { question:question, open:question.open }; });
            questions.forEach(function (question) { if (!question.hidden) question.open = true; });
        });
        window.addEventListener('afterprint', function () {
            if (!printState) return;
            printState.forEach(function (item) { item.question.open = item.open; });
            printState = null;
        });
        applySearch();
        revealHash();
        root.setAttribute('data-mo-ready', VERSION);
        document.body.classList.add('mo-support-ready');
        root.querySelector('.mo-support-search').hidden = false;
        root.querySelector('.mo-support-mobile').hidden = false;
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
    else init();
}());
