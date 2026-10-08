(function () {
    'use strict';

    var VERSION = '20261009-4';
    var STYLE_ID = 'moFooterStyles';
    var ROOT_ID = 'moFooter';
    var GROUPS = [
        { title: 'Kurumsal', links: [
            ['Hakkımızda', '/hakkimizda1'],
            ['İletişim', '/iletisim1']
        ] },
        { title: 'Müşteri Hizmetleri', links: [
            ['Hesabım', '/Hesabim.aspx#/Hesabim-Anasayfa'],
            ['Sipariş Takip', '/SiparisTakip'],
            ['Sıkça Sorulan Sorular', '/sikca-sorulan-sorular'],
            ['Yardım', '/yardim']
        ] },
        { title: 'Yasal Bilgiler', links: [
            ['KVKK', '/kvkk'],
            ['Üyelik Sözleşmesi', '/uyelik-sozlesmesi'],
            ['Gizlilik ve Güvenlik', '/gizlilik-ve-guvenlik-politikasi'],
            ['Mesafeli Satış Sözleşmesi', '/mesafeli-satis-sozlesmesi'],
            ['İptal ve İade', '/iptal--iade-kosullari']
        ] }
    ];

    function addStyles() {
        var style = document.getElementById(STYLE_ID) || document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            #footer.mo-footer-ready { width:100%!important; max-width:none!important; margin:0!important; padding:0!important; float:none!important; background:#f5f9fa!important; border:0!important; color:#465d6b; text-align:left!important; }
            #footer.mo-footer-ready > .footerTop, #footer.mo-footer-ready > .footerCenter { display:none!important; }
            #${ROOT_ID}, #${ROOT_ID} * { box-sizing:border-box; letter-spacing:0; }
            #${ROOT_ID} { --mo-footer-ink:#03235e; --mo-footer-teal:#0c4853; --mo-footer-line:#d0e2e8; display:block; width:100%; margin:0; padding:0; border:0; background:linear-gradient(110deg,#edf6f9,#fff 64%,#eef7f5); color:#465d6b; font-family:'DM Sans',Arial,sans-serif; }
            #${ROOT_ID} [hidden] { display:none!important; }
            #${ROOT_ID} a { color:inherit; text-decoration:none; }
            #${ROOT_ID} :focus-visible { outline:2px solid #4fa0c9; outline-offset:3px; }
            #${ROOT_ID} .mo-footer-inner { width:calc(100% - 48px); max-width:1240px; margin:0 auto; }
            #${ROOT_ID} .mo-footer-main { display:grid; grid-template-columns:minmax(210px,1.25fr) minmax(130px,.75fr) minmax(200px,1fr) minmax(220px,1.1fr); align-items:start; gap:40px; padding:44px 0 38px; }
            #${ROOT_ID} .mo-footer-main-band { --mo-footer-line:rgba(200,240,242,.22); background:linear-gradient(145deg,var(--mo-footer-ink),var(--mo-footer-teal)); color:#d9e7ef; }
            #${ROOT_ID} .mo-footer-main-band > .mo-footer-inner { background:transparent; }
            #${ROOT_ID} .mo-footer-brand { min-width:0; }
            #${ROOT_ID} .mo-footer-logo { display:block; width:200px; max-width:100%; margin:0 0 24px; }
            #${ROOT_ID} .mo-footer-logo img { display:block; width:100%; height:50px; max-width:100%; object-fit:contain; object-position:left center; }
            #${ROOT_ID} .mo-footer-phone { display:inline-flex; align-items:center; min-height:36px; color:var(--mo-footer-ink); font-size:18px; line-height:1.5; font-weight:600; }
            #${ROOT_ID} .mo-footer-contact-links { display:grid; justify-items:start; gap:2px; margin:4px 0 16px; }
            #${ROOT_ID} .mo-footer-contact-links a { display:inline-flex; align-items:center; gap:9px; min-height:36px; max-width:100%; font-size:12px; font-weight:500; line-height:1.6; overflow-wrap:anywhere; }
            #${ROOT_ID} .mo-footer-contact-links i { width:16px; color:#68848d; text-align:center; font-size:15px; }
            #${ROOT_ID} .mo-footer-contact-links .fa-whatsapp { color:#248061; }
            #${ROOT_ID} .mo-footer-social { display:flex; gap:6px; }
            #${ROOT_ID} .mo-footer-social a { display:flex; align-items:center; justify-content:center; width:44px; height:44px; padding:0; border:1px solid #b6d4dd; border-radius:4px; color:var(--mo-footer-teal); background:#e0eff2; }
            #${ROOT_ID} .mo-footer-social i { font-size:17px; }
            #${ROOT_ID} .mo-footer-social a:hover { border-color:#92bbcb; background:#edf6fa; }
            #${ROOT_ID} .mo-footer-group { min-width:0; margin:0; padding:0; border:0; background:none; }
            #${ROOT_ID} .mo-footer-group summary { display:grid; grid-template-columns:minmax(0,1fr) 20px; align-items:center; gap:12px; margin:0 0 15px; padding:0; min-height:32px; color:var(--mo-footer-ink); font-size:13px; font-weight:700; line-height:1.5; list-style:none; overflow-wrap:anywhere; cursor:default; }
            #${ROOT_ID} .mo-footer-group summary > span { position:relative; padding-left:17px; }
            #${ROOT_ID} .mo-footer-group summary > span::before { content:''; position:absolute; left:1px; top:6px; width:7px; height:7px; background:#4fa0c9; border:1px solid #0c4853; transform:rotate(45deg); }
            #${ROOT_ID} .mo-footer-group summary::-webkit-details-marker { display:none; }
            #${ROOT_ID} .mo-footer-group summary::marker { content:''; }
            #${ROOT_ID} .mo-footer-group summary i { display:none; justify-self:center; width:12px; height:12px; margin:0; padding:0; color:#718e98; font-size:12px; line-height:12px; text-align:center; }
            #${ROOT_ID} .mo-footer-group nav { display:block; }
            #${ROOT_ID} .mo-footer-group ul { display:grid; gap:2px; margin:0; padding:0; list-style:none; }
            #${ROOT_ID} .mo-footer-group li { margin:0; padding:0; float:none; list-style:none; }
            #${ROOT_ID} .mo-footer-group a { display:block; width:fit-content; max-width:100%; min-height:34px; padding:7px 0; color:#5b6f7b; font-size:12px; font-weight:400; line-height:1.65; overflow-wrap:anywhere; }
            #${ROOT_ID} .mo-footer-group a:hover, #${ROOT_ID} .mo-footer-group a[aria-current='page'] { color:var(--mo-footer-teal); text-decoration:underline; text-underline-offset:4px; }
            #${ROOT_ID} .mo-footer-phone:hover, #${ROOT_ID} .mo-footer-contact-links a:hover { color:var(--mo-footer-teal); text-decoration:underline; text-underline-offset:4px; }
            #${ROOT_ID} .mo-footer-main-band .mo-footer-logo img { filter:brightness(0) invert(1); }
            #${ROOT_ID} .mo-footer-main-band .mo-footer-phone, #${ROOT_ID} .mo-footer-main-band .mo-footer-group summary { color:#fff; }
            #${ROOT_ID} .mo-footer-main-band .mo-footer-group a { color:#d9e7ef; }
            #${ROOT_ID} .mo-footer-main-band .mo-footer-contact-links i, #${ROOT_ID} .mo-footer-main-band .mo-footer-group summary i { color:#a5dfdb; }
            #${ROOT_ID} .mo-footer-main-band .mo-footer-contact-links .fa-whatsapp { color:#80d9ad; }
            #${ROOT_ID} .mo-footer-main-band .mo-footer-group summary > span::before { background:#91d2d0; border-color:#c8f0f2; }
            #${ROOT_ID} .mo-footer-main-band .mo-footer-social a { color:#c8f0f2; border-color:rgba(200,240,242,.35); background:rgba(200,240,242,.08); }
            #${ROOT_ID} .mo-footer-main-band .mo-footer-social a:hover { border-color:#a5dfdb; background:rgba(200,240,242,.18); }
            #${ROOT_ID} .mo-footer-main-band .mo-footer-group a:hover, #${ROOT_ID} .mo-footer-main-band .mo-footer-group a[aria-current='page'], #${ROOT_ID} .mo-footer-main-band .mo-footer-phone:hover, #${ROOT_ID} .mo-footer-main-band .mo-footer-contact-links a:hover { color:#a5dfdb; }
            #${ROOT_ID} .mo-footer-main-band :focus-visible { outline-color:#a5dfdb; }
            #${ROOT_ID} .mo-footer-newsletter-band { position:relative; isolation:isolate; overflow:hidden; background:linear-gradient(115deg,#03235e,#0c4853); color:#fff; }
            #${ROOT_ID} .mo-footer-newsletter-band::before, #${ROOT_ID} .mo-footer-newsletter-band::after { content:''; position:absolute; z-index:-1; top:50%; right:10%; width:200px; height:200px; border:1px solid rgba(200,240,242,.21); transform:translateY(-50%) rotate(45deg); pointer-events:none; }
            #${ROOT_ID} .mo-footer-newsletter-band::after { right:calc(10% + 50px); width:100px; height:100px; border-color:rgba(200,240,242,.3); }
            #${ROOT_ID} .mo-footer-newsletter { display:grid; grid-template-columns:minmax(0,1fr) minmax(280px,440px); align-items:center; gap:28px; padding:30px 0; border:0; }
            #${ROOT_ID} .mo-footer-newsletter h2 { margin:0 0 5px; color:#fff; font-size:20px; font-weight:600; line-height:1.5; }
            #${ROOT_ID} .mo-footer-newsletter p { margin:0; color:#c8e6ec; font-size:13px; line-height:1.7; }
            #${ROOT_ID} .mo-footer-newsletter-slot { min-width:0; }
            #${ROOT_ID} #divNewsLetter { position:relative!important; width:100%!important; float:none!important; margin:0!important; padding:0!important; background:none!important; }
            #${ROOT_ID} #divNewsLetter > label { position:absolute!important; width:1px!important; height:1px!important; margin:-1px!important; padding:0!important; overflow:hidden!important; clip-path:inset(50%); white-space:nowrap; border:0; }
            #${ROOT_ID} #divNewsLetter .newsletterContent { display:grid!important; grid-template-columns:minmax(0,1fr) 48px; align-items:center; gap:8px; width:100%!important; margin:0!important; padding:0!important; float:none!important; background:none!important; }
            #${ROOT_ID} #txtbxNewsletterMail { display:block!important; position:static!important; width:100%!important; min-width:0; height:48px!important; margin:0!important; padding:0 15px!important; border:1px solid #cbdce4!important; border-radius:4px!important; background:#fff!important; box-shadow:none!important; color:var(--mo-footer-ink)!important; font:400 14px/1.5 'DM Sans',Arial,sans-serif!important; float:none!important; }
            #${ROOT_ID} #txtbxNewsletterMail:focus { border-color:#4fa0c9!important; }
            #${ROOT_ID} #btnMailKaydet { display:flex!important; position:static!important; align-items:center; justify-content:center; width:48px!important; height:48px!important; min-width:48px!important; margin:0!important; padding:0!important; border:1px solid #a5dfdb!important; border-radius:4px!important; background:#a5dfdb!important; color:var(--mo-footer-ink)!important; font-size:0!important; line-height:1!important; float:none!important; cursor:pointer; }
            #${ROOT_ID} #btnMailKaydet::before { display:none!important; }
            #${ROOT_ID} #btnMailKaydet::after { content:'\\f061'; display:block; color:var(--mo-footer-ink); font:16px/1 FontAwesome; }
            #${ROOT_ID} #btnMailKaydet:hover { background:#c8f0f2!important; border-color:#c8f0f2!important; }
            #${ROOT_ID} .newsletterContent > :not(input):not(#btnMailKaydet) { grid-column:1 / -1; color:#d9edf2!important; }
            #${ROOT_ID} .mo-footer-bottom { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px 28px; padding:24px 0; border:0; }
            #${ROOT_ID} .mo-footer-copyright { margin:0; color:#73858e; font-size:11px; line-height:1.8; }
            #${ROOT_ID} .mo-footer-payments { min-width:0; max-width:400px; }
            #${ROOT_ID} .mo-footer-payments img { display:block; width:100%; max-width:400px; height:auto; max-height:28px; object-fit:contain; }
            body.mo-footer-ready #divTicimaxCopyrightContent { background:#f5f9fa; padding:12px 24px 20px; border:0; }
            @media (min-width:801px) { #${ROOT_ID} .mo-footer-group > nav { display:block!important; } }
            @media (max-width:1100px) and (min-width:801px) {
                #${ROOT_ID} .mo-footer-main { gap:24px; grid-template-columns:minmax(190px,1.1fr) minmax(110px,.7fr) minmax(170px,1fr) minmax(200px,1.05fr); }
            }
            @media (max-width:800px) {
                #${ROOT_ID} .mo-footer-inner { width:calc(100% - 32px); }
                #${ROOT_ID} .mo-footer-main { grid-template-columns:minmax(0,1fr); gap:0; padding:32px 0 0; }
                #${ROOT_ID} .mo-footer-brand { display:grid; grid-template-columns:minmax(0,1fr) 94px; gap:0 16px; padding-bottom:26px; }
                #${ROOT_ID} .mo-footer-logo { grid-column:1 / -1; margin-bottom:18px; }
                #${ROOT_ID} .mo-footer-phone { grid-column:1; font-size:17px; min-height:40px; }
                #${ROOT_ID} .mo-footer-contact-links { grid-column:1 / -1; margin:2px 0 0; }
                #${ROOT_ID} .mo-footer-contact-links a { min-height:44px; font-size:12px; }
                #${ROOT_ID} .mo-footer-social { grid-column:2; grid-row:2; align-self:center; }
                #${ROOT_ID} .mo-footer-group { border-top:1px solid var(--mo-footer-line); }
                #${ROOT_ID} .mo-footer-group summary { min-height:60px; margin:0; padding:16px 0; font-size:13px; cursor:pointer; }
                #${ROOT_ID} .mo-footer-group summary i { display:block; }
                #${ROOT_ID} .mo-footer-group[open] summary i { transform:rotate(45deg); }
                #${ROOT_ID} .mo-footer-group nav { padding:0 0 16px; }
                #${ROOT_ID} .mo-footer-group a { min-height:44px; padding:11px 0; font-size:12px; }
                #${ROOT_ID} .mo-footer-newsletter { grid-template-columns:minmax(0,1fr); gap:16px; padding:26px 0; }
                #${ROOT_ID} .mo-footer-newsletter-band::before { right:-70px; }
                #${ROOT_ID} .mo-footer-newsletter-band::after { right:-20px; }
                #${ROOT_ID} #txtbxNewsletterMail { font-size:16px!important; }
                #${ROOT_ID} .mo-footer-bottom { flex-direction:column; align-items:flex-start; padding:20px 0 24px; }
                #${ROOT_ID} .mo-footer-payments { width:100%; max-width:400px; }
                body.mo-footer-ready #divTicimaxCopyrightContent { padding-bottom:calc(76px + env(safe-area-inset-bottom)); }
                body.mo-footer-ready:has(#moWhatsappButton, #back-to-top) #divTicimaxCopyrightContent { padding-bottom:calc(220px + env(safe-area-inset-bottom)); }
            }
            @media (max-width:370px) {
                #${ROOT_ID} .mo-footer-brand { grid-template-columns:minmax(0,1fr); }
                #${ROOT_ID} .mo-footer-social { grid-column:1; grid-row:auto; margin-top:14px; }
            }
            @media print { #footer.mo-footer-ready, body.mo-footer-ready #divTicimaxCopyrightContent { display:none!important; } }
        `;
        if (!style.parentNode) document.head.appendChild(style);
    }

    function icon(name) {
        var element = document.createElement('i');
        element.className = 'fa fa-' + name;
        element.setAttribute('aria-hidden', 'true');
        return element;
    }

    function link(text, href, className, iconName) {
        var element = document.createElement('a');
        element.href = href;
        if (className) element.className = className;
        if (iconName) element.appendChild(icon(iconName));
        var label = document.createElement('span');
        label.textContent = text;
        element.appendChild(label);
        return element;
    }

    function groupMarkup(group, index) {
        var details = document.createElement('details');
        details.className = 'mo-footer-group';
        details.open = true;
        var summary = document.createElement('summary');
        summary.id = 'moFooterGroup' + index;
        var label = document.createElement('span');
        label.textContent = group.title;
        summary.append(label, icon('plus'));
        var nav = document.createElement('nav');
        nav.setAttribute('aria-labelledby', summary.id);
        var list = document.createElement('ul');
        group.links.forEach(function (item) {
            var row = document.createElement('li');
            row.appendChild(link(item[0], 'https://www.motifistanbul.com' + item[1]));
            list.appendChild(row);
        });
        nav.appendChild(list);
        details.append(summary, nav);
        return details;
    }

    function external(element, title) {
        element.target = '_blank';
        element.rel = 'noopener noreferrer';
        if (title) { element.title = title; element.setAttribute('aria-label', title); }
        return element;
    }

    function enhanceNewsletter(root) {
        var input = root.querySelector('#txtbxNewsletterMail');
        var button = root.querySelector('#btnMailKaydet');
        var label = root.querySelector('#divNewsLetter > label');
        if (input) {
            input.setAttribute('inputmode', 'email');
            input.setAttribute('autocomplete', 'email');
            input.setAttribute('aria-label', 'E-posta adresiniz');
            if (label) label.htmlFor = input.id;
        }
        if (button) {
            button.setAttribute('role', 'button');
            button.setAttribute('aria-label', 'E-bültene kaydol');
            button.title = 'E-bültene kaydol';
        }
    }

    function applyTheme(root) {
        if (!root.querySelector('.mo-footer-main-band')) {
            var mainInner = root.querySelector('.mo-footer-main').parentNode;
            var mainBand = document.createElement('div');
            mainBand.className = 'mo-footer-main-band';
            mainInner.before(mainBand);
            mainBand.appendChild(mainInner);
        }
        root.querySelectorAll('.mo-footer-weave').forEach(function (weave) { weave.remove(); });
        if (!root.querySelector('.mo-footer-newsletter-band')) {
            var newsletter = root.querySelector('.mo-footer-newsletter');
            var band = document.createElement('div');
            band.className = 'mo-footer-newsletter-band';
            var inner = document.createElement('div');
            inner.className = 'mo-footer-inner';
            inner.appendChild(newsletter);
            band.appendChild(inner);
            root.appendChild(band);
            var bottomInner = document.createElement('div');
            bottomInner.className = 'mo-footer-inner';
            bottomInner.appendChild(root.querySelector('.mo-footer-bottom'));
            root.appendChild(bottomInner);
        }
    }

    function init() {
        var host = document.getElementById('footer');
        if (!host) return false;
        var mounted = host.querySelector('#' + ROOT_ID);
        if (mounted) {
            if (mounted.getAttribute('data-mo-version') !== VERSION) {
                applyTheme(mounted);
                addStyles();
                mounted.setAttribute('data-mo-version', VERSION);
            }
            return true;
        }
        var newsletter = host.querySelector('#divNewsLetter');
        var payment = host.querySelector('.bankaSol img');
        var sourceLogo = host.querySelector('.footerLogo img');
        var active = document.activeElement;
        var root = document.createElement('footer');
        root.id = ROOT_ID;
        root.setAttribute('aria-label', 'Motif İstanbul');
        root.setAttribute('data-mo-version', VERSION);
        root.innerHTML = '<div class="mo-footer-inner"><div class="mo-footer-main"><section class="mo-footer-brand" aria-label="Motif İstanbul iletişim bilgileri"></section></div><section class="mo-footer-newsletter" aria-labelledby="moFooterNewsletterTitle"><div><h2 id="moFooterNewsletterTitle">E-bülten</h2><p>Motif İstanbul’dan haberler.</p></div><div class="mo-footer-newsletter-slot"></div></section><div class="mo-footer-bottom"><p class="mo-footer-copyright"></p><div class="mo-footer-payments"></div></div></div>';
        var brand = root.querySelector('.mo-footer-brand');
        var logo = document.createElement('a');
        logo.className = 'mo-footer-logo';
        logo.href = 'https://www.motifistanbul.com/';
        logo.setAttribute('aria-label', 'Motif İstanbul ana sayfa');
        var image = document.createElement('img');
        image.src = sourceLogo && sourceLogo.src || 'https://static.ticimax.cloud/38550/uploads/editoruploads/2.png';
        image.alt = 'Motif İstanbul';
        image.width = 200;
        image.height = 50;
        image.loading = 'lazy';
        logo.appendChild(image);
        brand.append(logo, link('0212 518 59 44', 'tel:+902125185944', 'mo-footer-phone'));
        var contacts = document.createElement('div');
        contacts.className = 'mo-footer-contact-links';
        contacts.appendChild(link('info@motifistanbul.com', 'mailto:info@motifistanbul.com', '', 'envelope'));
        contacts.appendChild(external(link('WhatsApp', 'https://wa.me/905342796028?text=' + encodeURIComponent('Merhaba, Motif İstanbul hakkında bilgi almak istiyorum.'), '', 'whatsapp')));
        brand.appendChild(contacts);
        var social = document.createElement('nav');
        social.className = 'mo-footer-social';
        social.setAttribute('aria-label', 'Sosyal medya');
        [['instagram','Instagram','https://www.instagram.com/motif.istanbul'],['facebook','Facebook','https://www.facebook.com/motifistanbul']].forEach(function (item) {
            var anchor = document.createElement('a');
            anchor.href = item[2];
            anchor.appendChild(icon(item[0]));
            social.appendChild(external(anchor, item[1]));
        });
        brand.appendChild(social);
        var main = root.querySelector('.mo-footer-main');
        GROUPS.forEach(function (group, index) { main.appendChild(groupMarkup(group, index)); });
        root.querySelector('.mo-footer-copyright').textContent = '\u00a9 ' + new Date().getFullYear() + ' Motif İstanbul. Tüm hakları saklıdır.';

        // Move native controls instead of cloning IDs or replacing Ticimax handlers.
        if (newsletter) root.querySelector('.mo-footer-newsletter-slot').appendChild(newsletter);
        else root.querySelector('.mo-footer-newsletter').hidden = true;
        if (payment) {
            payment.alt = payment.alt || 'Ödeme logoları';
            payment.loading = 'lazy';
            root.querySelector('.mo-footer-payments').appendChild(payment);
        } else root.querySelector('.mo-footer-payments').hidden = true;
        host.querySelectorAll('.product-social-icon-wrapper').forEach(function (widget) { host.appendChild(widget); });
        applyTheme(root);
        host.appendChild(root);
        addStyles();
        host.classList.add('mo-footer-ready');
        document.body.classList.add('mo-footer-ready');
        if (!document.querySelector('link[data-mo-footer-font]')) {
            var font = document.createElement('link');
            font.rel = 'stylesheet';
            font.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap';
            font.setAttribute('data-mo-footer-font', '');
            document.head.appendChild(font);
        }
        enhanceNewsletter(root);
        var observer = new MutationObserver(function () {
            if (!root.isConnected) { observer.disconnect(); return; }
            var current = host.querySelector('#divNewsLetter');
            var slot = root.querySelector('.mo-footer-newsletter-slot');
            // Ticimax may relocate or refresh the newsletter after document ready.
            if (current && current.parentNode !== slot) slot.appendChild(current);
            root.querySelector('.mo-footer-newsletter').hidden = !current;
            enhanceNewsletter(root);
        });
        observer.observe(host, { childList:true, subtree:true });
        root.addEventListener('keydown', function (event) {
            if (event.key === ' ' && event.target.id === 'btnMailKaydet') { event.preventDefault(); event.target.click(); }
            if (event.key === 'Enter' && event.target.id === 'txtbxNewsletterMail') {
                event.preventDefault();
                event.stopPropagation();
                var button = root.querySelector('#btnMailKaydet');
                if (button) button.click();
            }
        });
        var media = window.matchMedia('(max-width:800px)');
        var groups = Array.from(root.querySelectorAll('.mo-footer-group'));
        var mobileState = [false, false, false];
        var printing = false;
        function syncGroups() {
            groups.forEach(function (group, index) { group.open = printing || !media.matches || mobileState[index]; });
        }
        groups.forEach(function (group, index) {
            group.querySelector('summary').addEventListener('click', function (event) {
                if (!media.matches) { event.preventDefault(); return; }
                mobileState[index] = !group.open;
            });
        });
        if (media.addEventListener) media.addEventListener('change', syncGroups);
        else media.addListener(syncGroups);
        window.addEventListener('beforeprint', function () { printing = true; syncGroups(); });
        window.addEventListener('afterprint', function () { printing = false; syncGroups(); });
        syncGroups();
        if (active && newsletter && newsletter.contains(active)) active.focus({ preventScroll:true });
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

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
    else boot();
}());
