(function () {
    'use strict';

    var ROOT_ID = 'moContact';
    var STYLE_ID = 'moContactStyles';
    var PHONE_NUMBER = '905342796028';
    var PHONE_DISPLAY = '+90 534 279 60 28';
    var WHATSAPP_MESSAGE = 'Merhaba Motif İstanbul, ürünleriniz ve sipariş süreci hakkında bilgi almak istiyorum.';

    function addFonts() {
        if (document.querySelector('link[data-mo-contact-fonts]')) return;

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700&display=swap';
        link.setAttribute('data-mo-contact-fonts', 'true');
        document.head.appendChild(link);
    }

    function addStyles() {
        if (document.getElementById(STYLE_ID)) return;

        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            body.mo-contact-ready #divIcerik.ticiContainer,
            body.mo-contact-ready #divIcerik .centerCount.iletisimContent {
                width:100%!important;
                max-width:none!important;
                margin:0!important;
                padding:0!important;
            }
            body.mo-contact-ready #divIcerik > .centerCount.iletisimContent > .clear { display:none!important; }
            #${ROOT_ID}, #${ROOT_ID} * { box-sizing:border-box; }
            #${ROOT_ID} {
                --mo-navy:#03235e;
                --mo-teal:#0c4853;
                --mo-cyan:#4fa0c9;
                --mo-ink:#102338;
                --mo-muted:#647789;
                --mo-paper:#f3f8fa;
                --mo-line:#dce8ec;
                --mo-green:#25d366;
                width:100%;
                overflow:hidden;
                color:var(--mo-ink);
                font-family:'DM Sans',Arial,sans-serif;
                background:#fff;
            }
            #${ROOT_ID} h1, #${ROOT_ID} h2, #${ROOT_ID} h3, #${ROOT_ID} p { margin-top:0; }
            #${ROOT_ID} a { text-decoration:none; }
            #${ROOT_ID} a:focus-visible,
            #${ROOT_ID} button:focus-visible,
            #${ROOT_ID} input:focus-visible,
            #${ROOT_ID} textarea:focus-visible { outline:3px solid rgba(79,160,201,.42); outline-offset:3px; }
            .mo-contact-shell { width:min(1180px,calc(100% - 48px)); margin-inline:auto; }
            .mo-contact-kicker { display:flex; align-items:center; gap:12px; color:var(--mo-cyan); font-size:11px; font-weight:700; letter-spacing:.17em; text-transform:uppercase; }
            .mo-contact-kicker::before { content:''; width:32px; height:1px; background:currentColor; }
            .mo-contact-hero {
                display:grid;
                grid-template-columns:minmax(0,.95fr) minmax(450px,1.05fr);
                min-height:690px;
                background:var(--mo-paper);
            }
            .mo-contact-visual {
                position:relative;
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                min-height:690px;
                padding:74px max(38px,calc((100vw - 1180px)/2)) 64px;
                padding-right:clamp(44px,6vw,86px);
                overflow:hidden;
                color:#fff;
                background:var(--mo-navy);
                isolation:isolate;
            }
            .mo-contact-visual::before {
                content:'';
                position:absolute;
                inset:0;
                z-index:-2;
                background:radial-gradient(circle at 72% 20%,rgba(79,160,201,.33),transparent 34%),linear-gradient(145deg,var(--mo-navy),var(--mo-teal));
            }
            .mo-contact-visual::after {
                content:'';
                position:absolute;
                inset:0;
                z-index:-1;
                opacity:.14;
                background-image:linear-gradient(rgba(255,255,255,.45) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.45) 1px,transparent 1px);
                background-size:30px 30px;
            }
            .mo-contact-art {
                position:absolute;
                right:-82px;
                top:54px;
                width:min(560px,112%);
                color:#c8f0f2;
                opacity:.7;
                animation:moContactBreathe 9s ease-in-out infinite;
            }
            .mo-contact-visual-head { position:relative; z-index:2; }
            .mo-contact-visual h1 {
                max-width:610px;
                margin:28px 0 20px;
                color:#fff;
                font-family:'Manrope',Arial,sans-serif;
                font-size:clamp(46px,5.8vw,82px);
                font-weight:600;
                line-height:1;
                letter-spacing:-.06em;
            }
            .mo-contact-visual h1 em { color:#9fe4eb; font-style:normal; }
            .mo-contact-visual-head p {
                max-width:480px;
                margin-bottom:30px;
                color:rgba(255,255,255,.72);
                font-size:15px;
                line-height:1.76;
            }
            .mo-contact-actions { display:flex; flex-wrap:wrap; gap:13px; }
            .mo-contact-button {
                display:inline-flex;
                align-items:center;
                justify-content:center;
                gap:10px;
                min-height:52px;
                padding:0 20px;
                border-radius:4px;
                font-size:12px;
                font-weight:700;
                letter-spacing:.04em;
                transition:transform .2s ease,background .2s ease,color .2s ease,box-shadow .2s ease;
            }
            .mo-contact-button:hover { transform:translateY(-2px); }
            .mo-contact-button--whatsapp { color:#fff!important; background:var(--mo-green); box-shadow:0 13px 28px rgba(37,211,102,.22); }
            .mo-contact-button--light { color:var(--mo-navy)!important; background:#fff; }
            .mo-contact-button svg { width:19px; height:19px; fill:currentColor; }
            .mo-contact-whatsapp-note { display:block; margin-top:12px; color:rgba(255,255,255,.58); font-size:11px; font-weight:600; letter-spacing:.04em; }
            .mo-contact-info-wrap { position:relative; z-index:2; }
            .mo-contact-info-title {
                display:block;
                margin-bottom:16px;
                color:rgba(255,255,255,.54);
                font-size:10px;
                font-weight:700;
                letter-spacing:.14em;
                text-transform:uppercase;
            }
            #${ROOT_ID} .iletisimLeft {
                display:grid!important;
                grid-template-columns:1fr 1fr;
                gap:0 22px;
                float:none!important;
                width:100%!important;
                margin:0!important;
                padding:18px 0 0!important;
                border-top:1px solid rgba(255,255,255,.18);
                background:transparent!important;
            }
            #${ROOT_ID} .iletisimLeft .categoryTitle,
            #${ROOT_ID} .iletisimLeft .Center { display:none!important; }
            #${ROOT_ID} .iletisimLeft .span {
                display:block!important;
                float:none!important;
                width:auto!important;
                margin:0!important;
                padding:12px 0!important;
                border:0!important;
                background:transparent!important;
            }
            #${ROOT_ID} .iletisimLeft .iletisimLeftAdres,
            #${ROOT_ID} .iletisimLeft .iletisimLeftEposta { grid-column:1 / -1; }
            #${ROOT_ID} .iletisimLeft .Left {
                float:none!important;
                width:auto!important;
                margin:0 0 5px!important;
                color:rgba(255,255,255,.48)!important;
                font-size:10px!important;
                font-weight:700;
                letter-spacing:.11em;
                text-transform:uppercase;
            }
            #${ROOT_ID} .iletisimLeft .Right {
                float:none!important;
                width:auto!important;
                margin:0!important;
                color:rgba(255,255,255,.86)!important;
                font-size:13px!important;
                font-weight:500;
                line-height:1.65;
            }
            #${ROOT_ID} .iletisimLeft a { color:#fff!important; text-decoration:none!important; }
            .mo-contact-panel {
                display:flex;
                align-items:center;
                padding:74px max(38px,calc((100vw - 1180px)/2)) 74px clamp(42px,6vw,86px);
                background:#fff;
            }
            .mo-contact-card {
                width:100%;
                max-width:650px;
                margin-inline:auto;
                padding:46px;
                border:1px solid rgba(3,35,94,.13);
                border-radius:8px;
                background:#fff;
                box-shadow:0 26px 70px rgba(3,35,94,.12);
            }
            .mo-contact-panel h2 {
                margin:16px 0 12px;
                color:var(--mo-navy);
                font-family:'Manrope',Arial,sans-serif;
                font-size:clamp(33px,3.5vw,48px);
                font-weight:600;
                line-height:1.08;
                letter-spacing:-.045em;
            }
            .mo-contact-intro { margin-bottom:28px; color:var(--mo-muted); font-size:13px; line-height:1.72; }
            #${ROOT_ID} .iletisimForm {
                display:block!important;
                float:none!important;
                width:100%!important;
                max-width:none!important;
                margin:0!important;
                padding:0!important;
                border:0!important;
                background:transparent!important;
            }
            #${ROOT_ID} .iletisimForm .categoryTitle,
            #${ROOT_ID} .iletisimForm .row,
            #${ROOT_ID} .iletisimForm .span,
            #${ROOT_ID} .iletisimForm .Left,
            #${ROOT_ID} .iletisimForm .Right,
            #${ROOT_ID} .iletisimForm .Center,
            #${ROOT_ID} .iletisimForm .clear { float:none!important; width:auto!important; height:auto!important; margin:0!important; padding:0!important; border:0!important; background:transparent!important; }
            .mo-contact-fields { display:grid; gap:15px; }
            .mo-field { position:relative; display:block; }
            .mo-field label {
                position:absolute;
                z-index:3;
                top:9px;
                left:16px;
                color:#71818d;
                font-size:10px;
                font-weight:700;
                letter-spacing:.035em;
                pointer-events:none;
            }
            .mo-field-control,
            .mo-field-control .intl-tel-input,
            .mo-field-control .iti { width:100%!important; }
            #${ROOT_ID} input[type='text'],
            #${ROOT_ID} textarea {
                display:block!important;
                width:100%!important;
                max-width:none!important;
                min-width:0!important;
                margin:0!important;
                color:var(--mo-ink)!important;
                font:500 14px 'DM Sans',Arial,sans-serif!important;
                border:1px solid #d3e0e5!important;
                border-radius:8px!important;
                outline:0!important;
                background:#f8fbfc!important;
                box-shadow:none!important;
                transition:border-color .2s,background .2s,box-shadow .2s!important;
            }
            #${ROOT_ID} input[type='text'] { height:58px!important; padding:22px 16px 8px!important; }
            #${ROOT_ID} .mo-field--phone input[type='text'] { padding-left:72px!important; }
            #${ROOT_ID} textarea { height:142px!important; min-height:142px!important; padding:26px 16px 14px!important; resize:vertical; }
            #${ROOT_ID} input[type='text']:hover,
            #${ROOT_ID} textarea:hover { border-color:#aec4cd!important; }
            #${ROOT_ID} input[type='text']:focus,
            #${ROOT_ID} textarea:focus { border-color:var(--mo-cyan)!important; background:#fff!important; box-shadow:0 0 0 3px rgba(79,160,201,.16)!important; }
            #${ROOT_ID} .mo-field--phone label { left:72px; }
            #${ROOT_ID} .intl-tel-input .flag-container,
            #${ROOT_ID} .iti__flag-container { height:58px!important; }
            #${ROOT_ID} .intl-tel-input .selected-flag,
            #${ROOT_ID} .iti__selected-flag { height:58px!important; padding-left:15px!important; }
            #${ROOT_ID} .validate {
                display:block!important;
                min-height:13px;
                margin:5px 0 0!important;
                color:#a72a35!important;
                font-size:10px!important;
                font-weight:600;
                background:transparent!important;
                border:0!important;
            }
            .mo-captcha {
                padding:14px!important;
                border:1px solid var(--mo-line)!important;
                border-radius:8px;
                background:#f8fbfc!important;
            }
            .mo-captcha-label { display:block; margin-bottom:9px; color:#71818d; font-size:10px; font-weight:700; letter-spacing:.035em; }
            #${ROOT_ID} .captchaImageBox { display:flex!important; align-items:center; gap:10px; margin-bottom:10px!important; }
            #${ROOT_ID} .captchaImage { display:block!important; max-width:210px!important; height:48px!important; object-fit:contain; border-radius:6px; background:#fff; }
            #${ROOT_ID} .captchaRenew {
                display:grid!important;
                place-items:center;
                width:40px!important;
                height:40px!important;
                margin:0!important;
                color:var(--mo-teal)!important;
                border:1px solid var(--mo-line);
                border-radius:8px;
                background:#fff;
            }
            #${ROOT_ID} .captchaInputBox { width:100%!important; }
            #${ROOT_ID} .iletisimBtn { display:block!important; width:100%!important; }
            #${ROOT_ID} #mainHolder_ucIletisim_btnGonder {
                display:flex!important;
                align-items:center;
                justify-content:center;
                width:100%!important;
                height:56px!important;
                margin:0!important;
                padding:0 22px!important;
                color:#fff!important;
                font:700 12px 'DM Sans',Arial,sans-serif!important;
                letter-spacing:.08em;
                text-transform:uppercase;
                cursor:pointer;
                border:0!important;
                border-radius:8px!important;
                background:linear-gradient(135deg,var(--mo-navy),var(--mo-teal))!important;
                box-shadow:0 12px 24px rgba(3,35,94,.18)!important;
                transition:transform .2s,filter .2s!important;
            }
            #${ROOT_ID} #mainHolder_ucIletisim_btnGonder:hover { transform:translateY(-1px); filter:brightness(1.06); }
            .mo-contact-privacy { margin:16px 0 0; padding-left:14px; color:#7a8795; font-size:10px; line-height:1.55; border-left:2px solid var(--mo-line); }
            .mo-contact-follow {
                display:grid;
                grid-template-columns:repeat(3,1fr);
                gap:1px;
                background:var(--mo-line);
            }
            .mo-contact-follow article {
                min-height:198px;
                padding:34px 30px;
                background:#fff;
            }
            .mo-contact-follow span {
                display:inline-grid;
                place-items:center;
                width:38px;
                height:38px;
                margin-bottom:22px;
                color:#fff;
                border-radius:50%;
                background:var(--mo-teal);
                font-size:11px;
                font-weight:700;
            }
            .mo-contact-follow h3 { margin:0 0 9px; color:var(--mo-navy); font-family:'Manrope',Arial,sans-serif; font-size:21px; font-weight:600; }
            .mo-contact-follow p { margin:0; color:var(--mo-muted); font-size:13px; line-height:1.7; }
            .mo-contact-map {
                display:grid;
                grid-template-columns:minmax(0,.78fr) minmax(360px,1.22fr);
                min-height:470px;
                background:var(--mo-paper);
            }
            .mo-contact-map-copy { display:flex; flex-direction:column; justify-content:center; padding:70px max(32px,calc((100vw - 1180px)/2)); padding-right:clamp(42px,7vw,90px); }
            .mo-contact-map-copy h2 { margin:20px 0 16px; color:var(--mo-navy); font-family:'Manrope',Arial,sans-serif; font-size:clamp(33px,3.9vw,56px); font-weight:600; line-height:1.08; letter-spacing:-.045em; }
            .mo-contact-map-copy p { max-width:460px; margin-bottom:26px; color:var(--mo-muted); font-size:14px; line-height:1.78; }
            .mo-contact-map-link {
                position:relative;
                display:block;
                min-height:470px;
                overflow:hidden;
                background:var(--mo-teal);
            }
            .mo-contact-map-link img {
                display:block!important;
                width:100%!important;
                height:100%!important;
                min-height:470px;
                object-fit:cover;
                filter:saturate(.9) contrast(1.02);
                transition:transform .5s ease,filter .5s ease;
            }
            .mo-contact-map-link:hover img { transform:scale(1.035); filter:saturate(1.02) contrast(1.05); }
            .mo-contact-map-link::after {
                content:'Haritada aç';
                position:absolute;
                right:24px;
                bottom:24px;
                padding:13px 16px;
                color:#fff;
                border-radius:4px;
                background:var(--mo-navy);
                font-size:11px;
                font-weight:700;
                letter-spacing:.06em;
                text-transform:uppercase;
                box-shadow:0 12px 26px rgba(3,35,94,.2);
            }
            @keyframes moContactBreathe { 0%,100%{transform:scale(.985) rotate(0)} 50%{transform:scale(1.012) rotate(1deg)} }
            @media(max-width:980px) {
                .mo-contact-hero { grid-template-columns:1fr; }
                .mo-contact-visual { min-height:620px; padding:76px max(28px,calc((100vw - 760px)/2)) 54px; }
                .mo-contact-panel { padding:52px max(28px,calc((100vw - 760px)/2)); }
                .mo-contact-card { max-width:none; }
                .mo-contact-follow { grid-template-columns:1fr; }
                .mo-contact-map { grid-template-columns:1fr; }
                .mo-contact-map-copy { padding:64px max(28px,calc((100vw - 760px)/2)); }
            }
            @media(max-width:680px) {
                .mo-contact-shell { width:min(100% - 30px,1180px); }
                .mo-contact-kicker { font-size:9px; }
                .mo-contact-visual { min-height:600px; padding:64px 22px 42px; }
                .mo-contact-art { width:330px; right:-58px; top:18px; opacity:.42; }
                .mo-contact-visual h1 { font-size:clamp(42px,13vw,60px); }
                .mo-contact-actions { flex-direction:column; align-items:stretch; }
                .mo-contact-button { width:100%; }
                #${ROOT_ID} .iletisimLeft { grid-template-columns:1fr; }
                #${ROOT_ID} .iletisimLeft .iletisimLeftAdres,
                #${ROOT_ID} .iletisimLeft .iletisimLeftEposta { grid-column:auto; }
                .mo-contact-panel { padding:34px 14px 48px; }
                .mo-contact-card { padding:32px 22px; border-radius:8px; }
                .mo-contact-panel h2 { font-size:34px; }
                .mo-contact-follow article { min-height:auto; padding:30px 22px; }
                .mo-contact-map-copy { padding:56px 22px; }
                .mo-contact-map-copy h2 { font-size:36px; }
                .mo-contact-map-link, .mo-contact-map-link img { min-height:320px; }
            }
            @media(prefers-reduced-motion:reduce) {
                .mo-contact-art { animation:none; }
                #${ROOT_ID} * { transition-duration:.01ms!important; }
            }
        `;
        document.head.appendChild(style);
    }

    function makeWhatsappUrl() {
        return 'https://wa.me/' + PHONE_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE);
    }

    function makeField(id, labelText, source, extraClass) {
        if (!source) return null;

        var field = document.createElement('div');
        field.className = 'mo-field' + (extraClass ? ' ' + extraClass : '');

        var label = document.createElement('label');
        label.textContent = labelText;
        if (id) label.setAttribute('for', id);

        var control = document.createElement('div');
        control.className = 'mo-field-control';
        control.appendChild(source);

        field.appendChild(label);
        field.appendChild(control);
        return field;
    }

    function appendIfFound(parent, node) {
        if (parent && node) parent.appendChild(node);
    }

    function pickPhoneInput(form) {
        return form.querySelector('input.ticiTelInput[name="ctl00$mainHolder$ucIletisim$txtbxTelefon"]') ||
            form.querySelector('input[name="ctl00$mainHolder$ucIletisim$txtbxTelefon"]');
    }

    function normalizeContactForm(form) {
        if (!form || form.getAttribute('data-mo-normalized') === 'true') return;

        var nameInput = form.querySelector('#mainHolder_ucIletisim_txtbxAdSoyad');
        var phoneInput = pickPhoneInput(form);
        var mailInput = form.querySelector('#mainHolder_ucIletisim_txtbxMail');
        var messageInput = form.querySelector('#mainHolder_ucIletisim_txtbxMesaj');
        var captcha = form.querySelector('.iletisimCaptcha');
        var submitWrap = form.querySelector('.iletisimBtn');
        var submit = form.querySelector('#mainHolder_ucIletisim_btnGonder');

        var nameValidate = form.querySelector('#mainHolder_ucIletisim_rfvbxAdSoyad');
        var mailRequired = form.querySelector('#mainHolder_ucIletisim_rfvbxMail');
        var mailFormat = form.querySelector('#mainHolder_ucIletisim_refbxMail');
        var messageValidate = form.querySelector('#mainHolder_ucIletisim_rfvbxMesaj');

        var fields = document.createElement('div');
        fields.className = 'mo-contact-fields';

        if (nameInput) {
            nameInput.setAttribute('placeholder', 'Adınız ve soyadınız');
            nameInput.setAttribute('autocomplete', 'name');
            var nameField = makeField(nameInput.id, 'Ad Soyad', nameInput);
            appendIfFound(nameField, nameValidate);
            appendIfFound(fields, nameField);
        }

        if (phoneInput) {
            phoneInput.setAttribute('placeholder', '5XX XXX XX XX');
            phoneInput.setAttribute('autocomplete', 'tel');
            phoneInput.setAttribute('inputmode', 'tel');
            var phoneSource = phoneInput.closest('.intl-tel-input') || phoneInput.closest('.iti') || phoneInput;
            appendIfFound(fields, makeField(phoneInput.id || '', 'Telefon', phoneSource, 'mo-field--phone'));
        }

        if (mailInput) {
            mailInput.setAttribute('placeholder', 'ornek@eposta.com');
            mailInput.setAttribute('autocomplete', 'email');
            mailInput.setAttribute('inputmode', 'email');
            var mailField = makeField(mailInput.id, 'E-posta', mailInput);
            appendIfFound(mailField, mailRequired);
            appendIfFound(mailField, mailFormat);
            appendIfFound(fields, mailField);
        }

        if (messageInput) {
            messageInput.setAttribute('placeholder', 'Size nasıl yardımcı olabiliriz?');
            var messageField = makeField(messageInput.id, 'Mesaj', messageInput);
            appendIfFound(messageField, messageValidate);
            appendIfFound(fields, messageField);
        }

        if (captcha) {
            captcha.classList.add('mo-captcha');
            var captchaLabel = document.createElement('span');
            captchaLabel.className = 'mo-captcha-label';
            captchaLabel.textContent = 'Güvenlik Kodu';
            captcha.insertBefore(captchaLabel, captcha.firstChild);

            var captchaInput = captcha.querySelector('#mainHolder_ucIletisim_TiciCaptcha_TxtCpatcha');
            if (captchaInput) {
                captchaInput.setAttribute('placeholder', 'Kodu yazın');
                captchaInput.setAttribute('autocomplete', 'off');
            }
            appendIfFound(fields, captcha);
        }

        if (submit) submit.value = 'Mesajı gönder';
        appendIfFound(fields, submitWrap);

        form.innerHTML = '';
        form.appendChild(fields);
        form.setAttribute('data-mo-normalized', 'true');
    }

    function createShell(mapInfo) {
        var shell = document.createElement('section');
        shell.id = ROOT_ID;
        shell.setAttribute('aria-label', 'Motif İstanbul iletişim sayfası');
        shell.innerHTML = `
            <section class="mo-contact-hero">
                <aside class="mo-contact-visual">
                    <svg class="mo-contact-art" viewBox="0 0 620 620" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <rect x="78" y="78" width="464" height="464" rx="232" stroke="currentColor" stroke-width="1" opacity=".22"/>
                        <path d="M310 74 546 310 310 546 74 310 310 74Z" stroke="currentColor" stroke-width="2" opacity=".72"/>
                        <path d="M310 148 472 310 310 472 148 310 310 148Z" stroke="currentColor" stroke-width="2"/>
                        <path d="M310 214 406 310 310 406 214 310 310 214Z" fill="currentColor" opacity=".13" stroke="currentColor" stroke-width="2"/>
                        <path d="M310 258 362 310 310 362 258 310 310 258Z" fill="currentColor" opacity=".58"/>
                        <path d="M74 310H546M310 74V546M144 144 476 476M476 144 144 476" stroke="currentColor" stroke-width="1" opacity=".25"/>
                        <path d="M164 492h292M196 530h228" stroke="currentColor" stroke-width="1.3" opacity=".34"/>
                    </svg>
                    <div class="mo-contact-visual-head">
                        <span class="mo-contact-kicker">Motif İstanbul / İletişim</span>
                        <h1>Size bir <em>motif</em> kadar yakınız.</h1>
                        <p>Ürünler, siparişler, kurumsal talepler ve tüm sorularınız için Motif İstanbul ekibine buradan ulaşabilirsiniz.</p>
                        <div class="mo-contact-actions">
                            <a class="mo-contact-button mo-contact-button--whatsapp" href="${makeWhatsappUrl()}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp üzerinden Motif İstanbul'a yazın">
                                <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.04 3.2A12.7 12.7 0 0 0 5.3 22.7L3.2 28.8l6.33-2.03A12.76 12.76 0 1 0 16.04 3.2Zm0 22.95c-2.05 0-4.07-.55-5.83-1.59l-.42-.25-3.75 1.2 1.23-3.64-.27-.43a10.16 10.16 0 1 1 9.04 4.71Zm5.57-7.61c-.3-.15-1.8-.89-2.08-.99-.28-.1-.48-.15-.69.15-.2.31-.79 1-.97 1.2-.18.2-.36.23-.66.08-.31-.15-1.29-.48-2.45-1.51a9.15 9.15 0 0 1-1.7-2.12c-.18-.31-.02-.47.13-.62.14-.13.31-.36.46-.54.15-.18.2-.31.31-.51.1-.2.05-.38-.03-.54-.08-.15-.69-1.65-.94-2.26-.25-.6-.5-.51-.69-.52h-.58c-.2 0-.53.08-.81.38-.28.31-1.07 1.05-1.07 2.55s1.1 2.96 1.25 3.16c.15.2 2.15 3.29 5.21 4.61.73.31 1.3.5 1.74.64.73.23 1.39.2 1.92.12.58-.09 1.8-.74 2.05-1.45.25-.71.25-1.32.18-1.45-.08-.12-.28-.2-.58-.35Z"/></svg>
                                WhatsApp'tan yazın
                            </a>
                            <a class="mo-contact-button mo-contact-button--light" href="tel:+902125185944">Telefonla arayın</a>
                        </div>
                        <span class="mo-contact-whatsapp-note">Hazır mesaj ile WhatsApp: ${PHONE_DISPLAY}</span>
                    </div>
                    <div class="mo-contact-info-wrap">
                        <span class="mo-contact-info-title">Kurumsal bilgiler</span>
                        <div id="moContactInfoSlot"></div>
                    </div>
                </aside>
                <main class="mo-contact-panel">
                    <div class="mo-contact-card">
                        <span class="mo-contact-kicker">İletişim formu</span>
                        <h2>Talebinizi bize iletin.</h2>
                        <p class="mo-contact-intro">Formu doldurun; müşteri deneyimi ekibimiz talebinizi inceleyip en kısa sürede size dönüş yapsın.</p>
                        <div id="moContactFormSlot"></div>
                        <p class="mo-contact-privacy">Paylaştığınız bilgiler yalnızca talebinizi yanıtlamak ve sizinle iletişim kurmak amacıyla kullanılır.</p>
                    </div>
                </main>
            </section>
            <section class="mo-contact-follow" aria-label="İletişim süreci">
                <article><span>01</span><h3>Mesajınızı alırız.</h3><p>Form, telefon veya WhatsApp üzerinden ilettiğiniz talep doğru ekibe yönlendirilir.</p></article>
                <article><span>02</span><h3>Detaylar netleşir.</h3><p>Sipariş, ürün veya kurumsal ihtiyaçlarınıza göre gerekli bilgiler sizinle paylaşılır.</p></article>
                <article><span>03</span><h3>Çözüm sunulur.</h3><p>Motif İstanbul ekibi, alışveriş deneyiminizi güvenle tamamlamanız için yanınızdadır.</p></article>
            </section>
            <section class="mo-contact-map" aria-labelledby="moContactMapTitle">
                <div class="mo-contact-map-copy">
                    <span class="mo-contact-kicker">Mağaza konumu</span>
                    <h2 id="moContactMapTitle">Fatih'teki adresimize yol tarifi alın.</h2>
                    <p>Mercan Mahallesi Uzunçarşı Caddesi üzerindeki konumumuzu haritada açarak ziyaret planınızı kolayca oluşturabilirsiniz.</p>
                    <a class="mo-contact-button mo-contact-button--whatsapp" href="${makeWhatsappUrl()}" target="_blank" rel="noopener noreferrer">WhatsApp mesajı gönder</a>
                </div>
                <a class="mo-contact-map-link" id="moContactMapLink" href="${mapInfo.href}" target="_blank" rel="noopener noreferrer" aria-label="Motif İstanbul konumunu Google Haritalar'da aç">
                    <img src="${mapInfo.image}" alt="Motif İstanbul mağaza konumu haritası" loading="lazy">
                </a>
            </section>
        `;
        return shell;
    }

    function findMapInfo(content) {
        var fallback = {
            href: 'https://www.google.com.tr/maps/place/MOT%C4%B0F+%C4%B0STANBUL/@41.0140621,28.9639739,17z/data=!3m1!4b1!4m5!3m4!1s0x14cab90abf5ace6f:0xf0c6ce9d48169f82!8m2!3d41.0140581!4d28.9661626',
            image: 'https://static.ticimax.cloud/38550/uploads/editoruploads/adsiz.png'
        };
        var mapAnchor = content && content.querySelector('a[href*="google.com"][href*="maps"]');
        var mapImage = mapAnchor && mapAnchor.querySelector('img');

        if (!mapAnchor) return fallback;

        var info = {
            href: mapAnchor.getAttribute('href') || fallback.href,
            image: mapImage ? (mapImage.getAttribute('src') || fallback.image) : fallback.image
        };
        var mapParagraph = mapAnchor.closest('p');
        if (mapParagraph && mapParagraph.parentNode) mapParagraph.parentNode.removeChild(mapParagraph);
        return info;
    }

    function removeEmptyParagraphs(content) {
        Array.prototype.forEach.call(content.querySelectorAll(':scope > p'), function (paragraph) {
            var text = paragraph.textContent.replace(/\u00a0/g, '').trim();
            if (!text && !paragraph.querySelector('img, iframe, a')) paragraph.parentNode.removeChild(paragraph);
        });
    }

    function modernizeContact() {
        var content = document.querySelector('#divIcerik .centerCount.iletisimContent') || document.querySelector('.iletisimContent');
        var contactInfo = content && content.querySelector('.iletisimLeft');
        var form = document.getElementById('mainHolder_ucIletisim_divMailGonder') || (content && content.querySelector('.iletisimForm'));

        if (!content || !contactInfo || !form || document.getElementById(ROOT_ID)) return false;

        addFonts();
        addStyles();

        var mapInfo = findMapInfo(content);
        removeEmptyParagraphs(content);
        var shell = createShell(mapInfo);

        contactInfo.parentNode.insertBefore(shell, contactInfo);
        shell.querySelector('#moContactInfoSlot').appendChild(contactInfo);
        shell.querySelector('#moContactFormSlot').appendChild(form);
        normalizeContactForm(form);

        document.body.classList.add('mo-contact-ready');
        return true;
    }

    function init() {
        if (modernizeContact()) return;

        var tries = 0;
        var timer = window.setInterval(function () {
            tries += 1;
            if (modernizeContact() || tries > 30) window.clearInterval(timer);
        }, 250);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
}());
