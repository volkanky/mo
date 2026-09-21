(function () {
    'use strict';

    var LOGO_URL = 'https://static.ticimax.cloud/38550//uploads/editoruploads/2.png';
    var STYLE_ID = 'moAccountDashboardStyles';
    var READY_ATTR = 'data-mo-account-modern';

    function addFonts() {
        if (document.querySelector('link[data-mo-account-dashboard-fonts]')) return;

        var fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Manrope:wght@500;600;700;800;900&display=swap';
        fontLink.setAttribute('data-mo-account-dashboard-fonts', 'true');
        document.head.appendChild(fontLink);
    }

    function icon(name) {
        var icons = {
            orders: '<svg viewBox="0 0 24 24" fill="none"><path d="M7 8h13l-1.4 7.4a2 2 0 0 1-2 1.6H9.4a2 2 0 0 1-2-1.7L6.1 4.8H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 21h.01M17 21h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
            return: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 7h11a5 5 0 0 1 0 10H8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 3 4 7l4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            user: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 12.2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" stroke-width="2"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
            address: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" fill="currentColor"/><circle cx="12" cy="9" r="2.4" fill="#fff"/></svg>',
            heart: '<svg viewBox="0 0 24 24" fill="none"><path d="M20.5 8.4c0 5.5-8.5 10.1-8.5 10.1S3.5 13.9 3.5 8.4A4.4 4.4 0 0 1 12 6.7a4.4 4.4 0 0 1 8.5 1.7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
            ticket: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 8.2V6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v1.7a2.8 2.8 0 0 0 0 5.6v1.7a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 15.5v-1.7a2.8 2.8 0 0 0 0-5.6Z" fill="currentColor"/><path d="M9 8h6M9 12h6M9 16h4" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>',
            point: '<svg viewBox="0 0 24 24" fill="none"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3Z" fill="currentColor"/></svg>',
            basket: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 9h12l-1 10H7L6 9Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 9a3 3 0 0 1 6 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
            help: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 18.5V9a7 7 0 1 1 14 0v9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M5 14h3v5H5v-5ZM16 14h3v5h-3v-5ZM13 21h2a4 4 0 0 0 4-4" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
            home: '<svg viewBox="0 0 24 24" fill="none"><path d="m4 11 8-7 8 7v9H6v-9Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M10 20v-5h4v5" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>'
        };

        return icons[name] || icons.user;
    }

    function addStyles() {
        if (document.getElementById(STYLE_ID)) return;

        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            body {
                --mo-account-navy: #03235e;
                --mo-account-teal: #0c4853;
                --mo-account-cyan: #4fa0c9;
                --mo-account-ink: #102338;
                --mo-account-muted: #617386;
                --mo-account-paper: #f3f8fa;
                --mo-account-line: rgba(3, 35, 94, .12);
                --mo-account-shadow: 0 18px 42px rgba(3, 35, 94, .1);
            }

            body.mo-account-page {
                background:
                    radial-gradient(circle at 16% 10%, rgba(79,160,201,.16) 0 1px, transparent 1.5px) 0 0 / 22px 22px,
                    var(--mo-account-paper) !important;
                font-family: "DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            }

            body.mo-account-page #divIcerik.ticiContainer {
                width: 100% !important;
                max-width: none !important;
                padding: 0 !important;
                background: transparent !important;
            }

            .mo-account-page .hesabimContent,
            .mo-account-page .hesabimBolumuTutucu {
                width: 100% !important;
                max-width: none !important;
                min-height: 100vh !important;
                margin: 0 !important;
                padding: 0 !important;
                background: transparent !important;
            }

            .mo-account-page .hesabimBolumuTutucu {
                display: grid !important;
                grid-template-columns: 330px minmax(0, 1fr);
                align-items: stretch;
            }

            .mo-account-page .solAnaMenu {
                position: sticky !important;
                top: 0;
                align-self: start;
                width: 100% !important;
                min-height: 100vh;
                float: none !important;
                margin: 0 !important;
                padding: 38px 30px 30px !important;
                overflow: hidden;
                color: #fff;
                border: 0 !important;
                background:
                    radial-gradient(circle at 18% 7%, rgba(79,160,201,.46), transparent 28%),
                    radial-gradient(circle at 92% 86%, rgba(12,72,83,.72), transparent 32%),
                    linear-gradient(158deg, #03235e 0%, #0c4853 100%) !important;
                box-shadow: inset -1px 0 0 rgba(255,255,255,.13);
            }

            .mo-account-page .solAnaMenu::before {
                content: "";
                position: absolute;
                inset: 0;
                pointer-events: none;
                opacity: .22;
                background:
                    linear-gradient(120deg, transparent 0 42%, rgba(255,255,255,.16) 43%, transparent 44%),
                    repeating-linear-gradient(135deg, transparent 0 18px, rgba(255,255,255,.04) 19px 20px);
            }

            .mo-account-brand {
                position: relative;
                z-index: 1;
                display: inline-flex;
                align-items: center;
                min-height: 54px;
                margin: 0 0 28px;
                padding: 11px 14px;
                border: 1px solid rgba(255,255,255,.18);
                border-radius: 15px;
                background: rgba(255,255,255,.1);
                backdrop-filter: blur(10px);
            }

            .mo-account-brand img {
                display: block;
                width: 142px;
                max-height: 38px;
                object-fit: contain;
                filter: brightness(0) invert(1);
            }

            .mo-account-page .solAnaMenu ul {
                position: relative;
                z-index: 1;
                display: grid !important;
                gap: 7px;
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                list-style: none !important;
                border: 0 !important;
                background: transparent !important;
            }

            .mo-account-page .solAnaMenu li {
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                border: 0 !important;
                background: transparent !important;
            }

            .mo-account-page .solAnaMenu li > a {
                display: flex !important;
                align-items: center;
                gap: 13px;
                min-height: 48px;
                width: 100% !important;
                margin: 0 !important;
                padding: 0 15px !important;
                color: rgba(255,255,255,.86) !important;
                font: 750 14px/1.2 "Manrope", "DM Sans", sans-serif !important;
                text-decoration: none !important;
                border: 1px solid transparent !important;
                border-radius: 12px !important;
                background: transparent !important;
                transition: background .2s ease, border-color .2s ease, transform .2s ease;
            }

            .mo-account-page .solAnaMenu li > a i {
                display: inline-flex !important;
                align-items: center;
                justify-content: center;
                width: 22px !important;
                min-width: 22px !important;
                color: #fff !important;
                font-size: 16px !important;
            }

            .mo-account-page .solAnaMenu li > a:hover,
            .mo-account-page .solAnaMenu li > a.aktif,
            .mo-account-page .solAnaMenu li.mo-current > a,
            .mo-account-page.mo-account-home-active .solAnaMenu li.mo-account-summary-link > a {
                color: #fff !important;
                border-color: rgba(255,255,255,.18) !important;
                background: linear-gradient(135deg, rgba(255,255,255,.18), rgba(79,160,201,.14)) !important;
                transform: translateX(2px);
                box-shadow: 0 14px 28px rgba(0,0,0,.12);
            }

            .mo-account-page .solAnaMenu li ul {
                display: none !important;
            }

            .mo-account-page .solAnaMenu .menuHesapAyarlarim,
            .mo-account-page .solAnaMenu .menuParaPuan,
            .mo-account-page .solAnaMenu .menuIptalTaleplerim,
            .mo-account-page .solAnaMenu .menuYorumlarim,
            .mo-account-page .solAnaMenu .menuIstekListelerim,
            .mo-account-page .solAnaMenu .menuFiyatAlarmListem,
            .mo-account-page .solAnaMenu .menuStokAlarmListem,
            .mo-account-page .solAnaMenu .menuHavaleBildirim {
                display: none !important;
            }

            .mo-account-separator {
                height: 1px;
                margin: 16px 0;
                background: rgba(255,255,255,.18);
            }

            .mo-account-page .sagIcerikTutucu {
                width: 100% !important;
                min-width: 0;
                float: none !important;
                margin: 0 !important;
                padding: 18px !important;
                background: transparent !important;
            }

            .mo-account-page .hesabimMenuDon {
                display: none !important;
            }

            .mo-account-page .sagIcerikBolumu {
                width: 100% !important;
                min-height: calc(100vh - 36px);
                margin: 0 !important;
                padding: 0 !important;
                color: var(--mo-account-ink);
                border: 0 !important;
                background: transparent !important;
                box-shadow: none !important;
            }

            .mo-account-page.mo-account-home-active .sagIcerikBolumu > [ng-view] {
                display: none !important;
            }

            .mo-account-dashboard,
            .mo-account-dashboard * {
                box-sizing: border-box;
            }

            .mo-account-dashboard {
                display: none;
                width: 100%;
                animation: moAccountIn .56s cubic-bezier(.2,.7,.2,1) both;
            }

            .mo-account-page.mo-account-home-active .mo-account-dashboard {
                display: block;
            }

            .mo-account-hero {
                position: relative;
                display: grid;
                grid-template-columns: minmax(0, 1fr) minmax(360px, .72fr);
                align-items: center;
                gap: 26px;
                min-height: 300px;
                overflow: hidden;
                padding: clamp(34px, 4vw, 62px);
                color: #fff;
                border: 1px solid rgba(255,255,255,.62);
                border-radius: 26px;
                background:
                    radial-gradient(circle at 88% 16%, rgba(79,160,201,.62), transparent 26%),
                    radial-gradient(circle at 34% 110%, rgba(12,72,83,.45), transparent 34%),
                    linear-gradient(135deg, #03235e 0%, #0c4853 100%);
                box-shadow: 0 26px 64px rgba(3,35,94,.18);
            }

            .mo-account-hero::before {
                content: "";
                position: absolute;
                inset: 0;
                pointer-events: none;
                opacity: .28;
                background:
                    radial-gradient(ellipse at 70% 58%, transparent 0 37%, rgba(255,255,255,.13) 38%, transparent 39% 43%, rgba(255,255,255,.1) 44%, transparent 45%),
                    repeating-linear-gradient(145deg, transparent 0 19px, rgba(255,255,255,.045) 20px 21px);
            }

            .mo-account-hero-copy,
            .mo-account-hero-art {
                position: relative;
                z-index: 1;
            }

            .mo-account-hero h1 {
                max-width: 620px;
                margin: 0;
                color: #fff;
                font: 850 clamp(36px, 4vw, 56px)/1.04 "Manrope", "DM Sans", sans-serif;
                letter-spacing: -.06em;
            }

            .mo-account-hero p {
                max-width: 470px;
                margin: 18px 0 0;
                color: rgba(255,255,255,.82);
                font-size: clamp(15px, 1.45vw, 19px);
                line-height: 1.62;
            }

            .mo-account-hero-art {
                min-height: 220px;
                display: grid;
                place-items: center;
            }

            .mo-account-hero-art svg {
                display: block;
                width: min(430px, 100%);
                height: auto;
                filter: drop-shadow(0 26px 34px rgba(0,0,0,.22));
            }

            .mo-account-card-grid {
                display: grid;
                grid-template-columns: repeat(4, minmax(0, 1fr));
                gap: 18px;
                margin-top: 22px;
            }

            .mo-account-card {
                position: relative;
                display: flex;
                flex-direction: column;
                min-height: 250px;
                overflow: hidden;
                padding: 27px 27px 23px;
                color: var(--mo-account-ink);
                text-decoration: none !important;
                border: 1px solid var(--mo-account-line);
                border-radius: 22px;
                background:
                    radial-gradient(circle at 94% 10%, rgba(79,160,201,.13), transparent 30%),
                    linear-gradient(145deg, rgba(255,255,255,.98), rgba(255,255,255,.86));
                box-shadow: 0 14px 34px rgba(3,35,94,.065);
                transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
            }

            .mo-account-card:hover {
                transform: translateY(-4px);
                border-color: rgba(79,160,201,.42);
                box-shadow: 0 24px 54px rgba(3,35,94,.13);
            }

            .mo-account-card-icon {
                display: grid;
                place-items: center;
                width: 64px;
                height: 64px;
                margin-bottom: 24px;
                color: var(--mo-account-teal);
                border-radius: 19px;
                background: linear-gradient(135deg, rgba(79,160,201,.16), rgba(12,72,83,.08));
            }

            .mo-account-card-icon svg {
                width: 31px;
                height: 31px;
            }

            .mo-account-card h3 {
                margin: 0 0 11px;
                color: var(--mo-account-navy);
                font: 850 22px/1.12 "Manrope", "DM Sans", sans-serif;
                letter-spacing: -.04em;
            }

            .mo-account-card p {
                max-width: 240px;
                margin: 0;
                color: var(--mo-account-muted);
                font-size: 14px;
                font-weight: 600;
                line-height: 1.5;
            }

            .mo-account-card-arrow {
                margin-top: auto;
                align-self: flex-end;
                color: var(--mo-account-navy);
                font-size: 32px;
                line-height: 1;
            }

            .mo-account-help {
                display: grid;
                grid-template-columns: 58px 1fr auto;
                align-items: center;
                gap: 18px;
                min-height: 92px;
                margin-top: 20px;
                padding: 22px 26px;
                border: 1px solid rgba(3,35,94,.1);
                border-radius: 22px;
                background:
                    radial-gradient(circle at 88% 20%, rgba(79,160,201,.13), transparent 30%),
                    linear-gradient(135deg, #fff, #f7fcfd);
                box-shadow: 0 14px 34px rgba(3,35,94,.06);
            }

            .mo-account-help-icon {
                display: grid;
                place-items: center;
                width: 58px;
                height: 58px;
                color: #fff;
                border-radius: 18px;
                background: linear-gradient(135deg, var(--mo-account-teal), var(--mo-account-navy));
            }

            .mo-account-help-icon svg {
                width: 29px;
                height: 29px;
            }

            .mo-account-help h3 {
                margin: 0 0 6px;
                color: var(--mo-account-navy);
                font: 850 20px/1.12 "Manrope", "DM Sans", sans-serif;
                letter-spacing: -.03em;
            }

            .mo-account-help p {
                margin: 0;
                color: var(--mo-account-muted);
                font-size: 13px;
                font-weight: 600;
                line-height: 1.45;
            }

            .mo-account-help a {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 13px;
                min-height: 48px;
                padding: 0 20px;
                color: #fff !important;
                font-size: 13px;
                font-weight: 800;
                text-decoration: none !important;
                border-radius: 14px;
                background: linear-gradient(135deg, var(--mo-account-teal), var(--mo-account-navy));
                box-shadow: 0 14px 26px rgba(3,35,94,.17);
            }

            @keyframes moAccountIn {
                from { opacity: 0; transform: translateY(14px); }
                to { opacity: 1; transform: translateY(0); }
            }

            @media (max-width: 1180px) {
                .mo-account-page .hesabimBolumuTutucu {
                    grid-template-columns: 292px minmax(0, 1fr);
                }

                .mo-account-card-grid {
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                }
            }

            @media (max-width: 840px) {
                .mo-account-page .hesabimBolumuTutucu {
                    display: block !important;
                }

                .mo-account-page .solAnaMenu {
                    position: relative !important;
                    min-height: 0;
                    padding: 20px 14px !important;
                    border-radius: 0 0 24px 24px;
                }

                .mo-account-page .solAnaMenu ul {
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                }

                .mo-account-brand {
                    margin-bottom: 18px;
                }

                .mo-account-brand img {
                    width: 118px;
                }

                .mo-account-page .sagIcerikTutucu {
                    padding: 14px !important;
                }

                .mo-account-hero {
                    grid-template-columns: 1fr;
                    min-height: 0;
                    padding: 32px;
                }

                .mo-account-hero-art {
                    min-height: 170px;
                    order: -1;
                }
            }

            @media (max-width: 560px) {
                .mo-account-page .solAnaMenu ul,
                .mo-account-card-grid,
                .mo-account-help {
                    grid-template-columns: 1fr;
                }

                .mo-account-card-grid {
                    gap: 12px;
                }

                .mo-account-card {
                    min-height: 210px;
                    padding: 24px;
                    border-radius: 18px;
                }

                .mo-account-hero {
                    padding: 28px 24px;
                    border-radius: 20px;
                }

                .mo-account-hero h1 {
                    font-size: 34px;
                }

                .mo-account-help {
                    text-align: center;
                }

                .mo-account-help-icon {
                    margin: 0 auto;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .mo-account-dashboard {
                    animation: none;
                }

                .mo-account-page * {
                    transition-duration: .01ms !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function getMemberName() {
        var sources = [
            document.getElementById('divMemberWelcomeContent'),
            document.querySelector('.memberWelcomeContent'),
            document.querySelector('.welcome')
        ];

        for (var i = 0; i < sources.length; i += 1) {
            if (!sources[i]) continue;
            var text = (sources[i].textContent || '').replace(/\s+/g, ' ').trim();
            text = text.replace(/hoşgeldiniz|hoş geldiniz|merhaba|çıkış yap/gi, '').replace(/[,:-]/g, '').trim();
            if (text && text.length < 45) return text.split(' ')[0];
        }

        if (window.globalModel && window.globalModel.member) {
            return window.globalModel.member.name || window.globalModel.member.firstName || '';
        }

        return '';
    }

    function makeHeroArt() {
        return `
            <svg viewBox="0 0 480 270" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M78 215c70-78 134-102 230-75 38 11 72 13 103-9" stroke="#bcecf7" stroke-width="13" stroke-linecap="round" opacity=".45"/>
                <path d="M96 188c62-58 119-73 201-45 35 12 64 13 88-6" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity=".55"/>
                <rect x="246" y="33" width="128" height="164" rx="34" fill="#f7feff" opacity=".96"/>
                <rect x="246" y="33" width="128" height="164" rx="34" stroke="#9bd7e5" stroke-width="4"/>
                <path d="M277 88c20-19 46-19 66 0M269 121c28-24 58-24 87 0M286 151c17-11 36-11 53 0" stroke="#0c4853" stroke-width="7" stroke-linecap="round"/>
                <circle cx="404" cy="72" r="26" stroke="#c9f3fb" stroke-width="5"/>
                <circle cx="115" cy="84" r="13" fill="#bcecf7" opacity=".62"/>
                <path d="M120 134h64M136 158h102M166 183h54" stroke="#d9fbff" stroke-width="7" stroke-linecap="round" opacity=".72"/>
                <g opacity=".55">
                    <circle cx="397" cy="127" r="3" fill="#fff"/><circle cx="417" cy="127" r="3" fill="#fff"/><circle cx="437" cy="127" r="3" fill="#fff"/>
                    <circle cx="397" cy="148" r="3" fill="#fff"/><circle cx="417" cy="148" r="3" fill="#fff"/><circle cx="437" cy="148" r="3" fill="#fff"/>
                </g>
            </svg>
        `;
    }

    function accountCard(href, iconName, title, desc) {
        return `
            <a class="mo-account-card" href="${href}">
                <span class="mo-account-card-icon">${icon(iconName)}</span>
                <h3>${title}</h3>
                <p>${desc}</p>
                <span class="mo-account-card-arrow" aria-hidden="true">→</span>
            </a>
        `;
    }

    function buildDashboard() {
        return `
            <section class="mo-account-dashboard" aria-label="Hesap özeti">
                <div class="mo-account-hero">
                    <div class="mo-account-hero-copy">
                        <h1 data-mo-account-title>Merhaba</h1>
                        <p>Motif İstanbul hesabınızdan siparişlerinizi, favorilerinizi ve adres bilgilerinizi tek ekrandan yönetebilirsiniz.</p>
                    </div>
                    <div class="mo-account-hero-art">${makeHeroArt()}</div>
                </div>
                <div class="mo-account-card-grid">
                    ${accountCard('#Siparislerim', 'orders', 'Siparişlerim', 'Siparişlerinizi inceleyin, kargo durumunu takip edin.')}
                    ${accountCard('#IadeTaleplerim', 'return', 'İade & Değişim', 'İade ve değişim taleplerinizi buradan oluşturun.')}
                    ${accountCard('#/Uyelik-Bilgilerim', 'user', 'Üyelik Bilgilerim', 'Kişisel bilgilerinizi ve şifre ayarlarınızı güncelleyin.')}
                    ${accountCard('#/AdresDefterim', 'address', 'Adres Defterim', 'Kayıtlı adreslerinizi yönetin, yeni adres ekleyin.')}
                    ${accountCard('#Favorilerim', 'heart', 'Favorilerim', 'Beğendiğiniz tasarımları görüntüleyin ve kolayca satın alın.')}
                    ${accountCard('#HediyeCeklerim', 'ticket', 'Hediye Çeklerim', 'Hediye çeklerinizi görüntüleyin ve kullanın.')}
                    ${accountCard('#ParaPuanlarim', 'point', 'Para Puanlarım', 'Kazanmış olduğunuz puanları görüntüleyin ve kullanın.')}
                    ${accountCard('/checkout', 'basket', 'Alışveriş Sepetim', 'Sepetinizdeki ürünleri görüntüleyin ve siparişinizi tamamlayın.')}
                </div>
                <div class="mo-account-help">
                    <div class="mo-account-help-icon">${icon('help')}</div>
                    <div>
                        <h3>Destek talebi oluşturun</h3>
                        <p>Sipariş, değişim veya ürünlerle ilgili sorularınızı bize iletebilirsiniz.</p>
                    </div>
                    <a href="#DestekTaleplerim">Destek Talebi <span aria-hidden="true">→</span></a>
                </div>
            </section>
        `;
    }

    function menuItem(className, href, iconClass, text) {
        var item = document.createElement('li');
        item.className = className;
        item.innerHTML = '<a href="' + href + '" class="btnShowContent btnHashChange"><i class="fa ' + iconClass + '"></i>' + text + '</a>';
        return item;
    }

    function separatorItem() {
        var item = document.createElement('li');
        item.className = 'mo-account-separator';
        return item;
    }

    function insertAfter(target, node) {
        if (!target || !target.parentNode || !node) return;
        target.parentNode.insertBefore(node, target.nextSibling);
    }

    function insertSidebarExtras(menu) {
        if (!menu || menu.querySelector('.mo-account-brand')) return;

        var brand = document.createElement('a');
        brand.className = 'mo-account-brand';
        brand.href = '/';
        brand.innerHTML = '<img src="' + LOGO_URL + '" alt="Motif İstanbul">';
        menu.insertBefore(brand, menu.firstChild);

        var list = menu.querySelector(':scope > ul') || menu.querySelector('ul');
        if (!list || list.querySelector('.mo-account-summary-link')) return;

        var summary = document.createElement('li');
        summary.className = 'mo-account-summary-link';
        summary.innerHTML = '<a href="#/Hesabim-Anasayfa" class="btnShowContent btnHashChange"><i class="fa fa-home"></i>Hesap Özeti</a>';
        list.insertBefore(summary, list.firstChild);

        var fav = list.querySelector('.menuFavorilerim');
        if (fav) {
            insertAfter(fav, menuItem('mo-direct-address', '#/AdresDefterim', 'fa-map-marker', 'Adres Defterim'));
            insertAfter(list.querySelector('.mo-direct-address'), menuItem('mo-direct-member', '#/Uyelik-Bilgilerim', 'fa-user', 'Üyelik Bilgilerim'));
            insertAfter(list.querySelector('.mo-direct-member'), separatorItem());
        }

        var support = list.querySelector('.menuDestekTaleplerim');
        if (support) {
            list.insertBefore(menuItem('mo-direct-gift', '#HediyeCeklerim', 'fa-ticket', 'Hediye Çeklerim'), support);
            list.insertBefore(menuItem('mo-direct-points', '#ParaPuanlarim', 'fa-star', 'Para Puanlarım'), support);
        }

        var exit = list.querySelector('.menuUyeCikis');
        if (exit) {
            list.insertBefore(menuItem('mo-direct-notify', '#/IletisimIzinlerim', 'fa-bell-o', 'Bildirimler'), exit);
            list.insertBefore(menuItem('mo-direct-settings', '/SifremiUnuttum/SifreDegistir', 'fa-cog', 'Ayarlar'), exit);
            list.insertBefore(separatorItem(), exit);
        }
    }

    function insertDashboard(content) {
        if (!content || document.querySelector('.mo-account-dashboard')) return;
        content.insertAdjacentHTML('afterbegin', buildDashboard());
    }

    function isHomeHash() {
        var hash = window.location.hash || '';
        return hash === '' || hash === '#' || hash === '#/Hesabim-Anasayfa' || hash === '#Hesabim-Anasayfa';
    }

    function normalizeHash(hash) {
        return (hash || '').replace(/^#\/?/, '').toLocaleLowerCase('tr-TR');
    }

    function syncState() {
        document.body.classList.toggle('mo-account-home-active', isHomeHash());

        var title = document.querySelector('[data-mo-account-title]');
        if (title) {
            var name = getMemberName();
            title.textContent = name ? 'Merhaba, ' + name : 'Merhaba';
        }

        var activeHash = normalizeHash(window.location.hash || '#/Hesabim-Anasayfa');
        document.querySelectorAll('.solAnaMenu li').forEach(function (item) {
            var link = item.querySelector('a[href]');
            if (!link) return;
            var linkHash = normalizeHash(link.getAttribute('href'));
            item.classList.toggle('mo-current', Boolean(linkHash && activeHash && linkHash === activeHash));
        });
    }

    function modernizeAccount() {
        var page = document.querySelector('.hesabimContent');
        var menu = document.querySelector('.solAnaMenu');
        var content = document.querySelector('.sagIcerikBolumu');

        if (!page || !menu || !content || document.body.getAttribute(READY_ATTR) === 'true') return false;

        document.body.setAttribute(READY_ATTR, 'true');
        document.body.classList.add('mo-account-page');

        addFonts();
        addStyles();
        insertSidebarExtras(menu);
        insertDashboard(content);
        syncState();

        window.addEventListener('hashchange', syncState);
        window.setTimeout(syncState, 600);
        window.setTimeout(syncState, 1500);

        return true;
    }

    function boot() {
        if (modernizeAccount()) return;

        var tries = 0;
        var timer = window.setInterval(function () {
            tries += 1;
            if (modernizeAccount() || tries > 40) window.clearInterval(timer);
        }, 250);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
}());
