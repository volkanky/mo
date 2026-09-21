(function () {
    'use strict';

    function modernizeOrderTracking() {
        var source = document.querySelector('.siparisTakipSayfasi');
        var content = document.getElementById('divIcerik');

        if (!source || !content || document.getElementById('moOrderShell')) return;

        if (!document.querySelector('link[data-mo-account-fonts]')) {
            var fontLink = document.createElement('link');
            fontLink.rel = 'stylesheet';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Manrope:wght@400;500;600;700&display=swap';
            fontLink.setAttribute('data-mo-account-fonts', 'true');
            document.head.appendChild(fontLink);
        }

        var style = document.createElement('style');
        style.id = 'moModernOrderStyles';
        style.textContent = `
            body {
                --mo-order-ink: #102338;
                --mo-order-muted: #667789;
                --mo-order-paper: #f3f8fa;
                --mo-order-line: #dce8ec;
                --mo-order-white: #fff;
                --mo-order-success: #2d765e;
                --mo-order-blue: #03235e;
                --mo-order-cyan: #4fa0c9;
                --mo-order-blue-dark: #0c4853;
            }

            body #divIcerik.ticiContainer,
            body #mainHolder_divDesign .t-vw-3 .ticiContainer {
                width: 100% !important;
                max-width: none !important;
                padding: 0 !important;
            }

            body #divIcerik > .centerCount,
            body #divIcerik .hesabimBolumuTutucu {
                width: 100% !important;
                max-width: none !important;
                margin: 0 !important;
                padding: 0 !important;
            }

            #moOrderShell,
            #moOrderShell * { box-sizing: border-box; }

            #moOrderShell {
                position: relative;
                isolation: isolate;
                width: 100%;
                min-height: clamp(700px, 78vh, 920px);
                display: grid;
                place-items: center;
                padding: 72px 24px;
                overflow: hidden;
                color: var(--mo-order-ink);
                background:
                    radial-gradient(circle at 14% 16%, rgba(79,160,201,.1) 0 1px, transparent 1.4px) 0 0 / 18px 18px,
                    var(--mo-order-paper);
                font-family: 'DM Sans', sans-serif;
            }

            #moOrderShell::before {
                content: '';
                position: absolute;
                z-index: -1;
                width: 500px;
                height: 500px;
                right: -250px;
                top: -250px;
                border: 1px solid rgba(3,35,94,.12);
                border-radius: 50%;
                box-shadow: 0 0 0 72px rgba(79,160,201,.055), 0 0 0 144px rgba(3,35,94,.025);
            }

            .mo-order-card {
                width: min(1160px, 100%);
                min-height: 640px;
                display: grid;
                grid-template-columns: minmax(370px, .88fr) minmax(0, 1.12fr);
                overflow: hidden;
                background: var(--mo-order-white);
                border: 1px solid rgba(3,35,94,.12);
                border-radius: 28px;
                box-shadow: 0 28px 80px rgba(3,35,94,.14);
                animation: moOrderIn .7s cubic-bezier(.2,.7,.2,1) both;
            }

            .mo-order-visual {
                position: relative;
                min-height: 640px;
                padding: 52px;
                overflow: hidden;
                color: #fff;
                background: linear-gradient(145deg,var(--mo-order-blue),var(--mo-order-blue-dark));
            }

            .mo-order-visual::after {
                content: '';
                position: absolute;
                inset: 0;
                opacity: .14;
                pointer-events: none;
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E");
                mix-blend-mode: soft-light;
            }

            .mo-order-kicker,
            .mo-order-visual-copy { position: relative; z-index: 2; }

            .mo-order-kicker {
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .18em;
                text-transform: uppercase;
            }

            .mo-order-kicker::before { content: ''; width: 32px; height: 1px; background: currentColor; }

            .mo-order-art {
                position: absolute;
                width: min(500px, 112%);
                height: auto;
                top: 40px;
                right: -75px;
                color: #deddd8;
                opacity: .86;
            }

            .mo-order-visual-copy {
                position: absolute;
                left: 52px;
                right: 45px;
                bottom: 50px;
            }

            .mo-order-visual-copy h2 {
                max-width: 430px;
                margin: 0 0 17px;
                color: #fff;
                font-family: 'Manrope', sans-serif;
                font-size: clamp(36px, 4vw, 58px);
                font-weight: 500;
                line-height: 1.02;
                letter-spacing: -.055em;
            }

            .mo-order-visual-copy p {
                max-width: 350px;
                margin: 0;
                color: rgba(255,255,255,.62);
                font-size: 14px;
                line-height: 1.7;
            }

            .mo-order-panel {
                min-width: 0;
                padding: 58px clamp(38px, 5vw, 72px) 64px;
                background: #fff;
            }

            #moOrderShell .siparisTakipSayfasi,
            #moOrderShell .siparisTakipSolBolum,
            #moOrderShell .siparisTakipSagBolum {
                display: block;
                float: none !important;
                width: 100% !important;
                max-width: none !important;
                min-height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                border: 0 !important;
                background: transparent !important;
                box-shadow: none !important;
            }

            #moOrderShell .siparisTakipBaslik { margin: 0 !important; border: 0 !important; }
            #moOrderShell .siparisTakipBaslik::before {
                content: 'Sipariş asistanı';
                display: block;
                margin-bottom: 15px;
                color: var(--mo-order-muted);
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .16em;
                text-transform: uppercase;
            }

            #moOrderShell .siparisTakipBaslik h3 {
                margin: 0 !important;
                color: var(--mo-order-ink) !important;
                font-family: 'Manrope', sans-serif !important;
                font-size: clamp(36px, 3.2vw, 48px) !important;
                font-weight: 600 !important;
                line-height: 1.08 !important;
                letter-spacing: -.045em !important;
                text-transform: none !important;
            }

            #moOrderShell .mo-order-intro {
                margin: 13px 0 30px;
                color: var(--mo-order-muted);
                font-size: 13px;
                line-height: 1.65;
            }

            #moOrderShell #frmSiparisTakip {
                position: static !important;
                display: grid !important;
                float: none !important;
                clear: both !important;
                width: 100% !important;
                max-width: 100% !important;
                min-width: 0 !important;
                height: auto !important;
                margin: 0 !important;
                padding: 0 !important;
                gap: 16px;
                transform: none !important;
            }
            #moOrderShell #frmSiparisTakip .satirBlok2 {
                position: relative;
                display: block !important;
                float: none !important;
                clear: both !important;
                width: 100% !important;
                max-width: 100% !important;
                min-width: 0 !important;
                height: auto !important;
                left: auto !important;
                right: auto !important;
                margin: 0 !important;
                padding: 0 !important;
                transform: none !important;
            }

            #moOrderShell #frmSiparisTakip .satirBlokSag {
                position: static !important;
                display: block !important;
                float: none !important;
                clear: both !important;
                width: 100% !important;
                max-width: 100% !important;
                min-width: 0 !important;
                height: auto !important;
                left: auto !important;
                right: auto !important;
                margin: 0 !important;
                padding: 0 !important;
                transform: none !important;
            }
            #moOrderShell #frmSiparisTakip .hsbmSpan {
                position: absolute !important;
                z-index: 2;
                top: 9px !important;
                left: 17px !important;
                float: none !important;
                width: auto !important;
                margin: 0 !important;
                padding: 0 !important;
                color: #6c7e8a !important;
                font: 500 11px 'DM Sans', sans-serif !important;
                line-height: 1 !important;
                letter-spacing: .035em;
                pointer-events: none;
            }

            #moOrderShell #frmSiparisTakip .hsbmTextbox,
            #moOrderShell #frmSiparisTakip .textbox {
                position: static !important;
                display: block !important;
                float: none !important;
                clear: both !important;
                width: 100% !important;
                max-width: 100% !important;
                min-width: 0 !important;
                height: 58px !important;
                left: auto !important;
                right: auto !important;
                margin: 0 !important;
                padding: 22px 17px 8px !important;
                color: var(--mo-order-ink) !important;
                font: 500 14px 'DM Sans', sans-serif !important;
                outline: 0 !important;
                border: 1px solid var(--mo-order-line) !important;
                border-radius: 12px !important;
                background: #f8fbfc !important;
                box-shadow: none !important;
                transition: border-color .2s, background .2s, box-shadow .2s !important;
            }

            #moOrderShell #frmSiparisTakip .xIDDiv {
                grid-template-columns: minmax(110px, 1fr) 42px;
                align-items: center;
                gap: 9px;
                padding: 12px !important;
                border: 1px solid var(--mo-order-line) !important;
                border-radius: 12px;
                background: #f8fbfc;
            }

            #moOrderShell #frmSiparisTakip .xIDDiv[style*='display: block'],
            #moOrderShell #frmSiparisTakip .xIDDiv[style*='display:block'],
            #moOrderShell #frmSiparisTakip .xIDDiv:not([style*='display: none']):not([style*='display:none']) {
                display: grid !important;
            }

            #moOrderShell #frmSiparisTakip .xIDDiv[style*='display: none'],
            #moOrderShell #frmSiparisTakip .xIDDiv[style*='display:none'] { display: none !important; }

            #moOrderShell #frmSiparisTakip .xIDDiv #imgTicimaxCaptcha {
                display: block !important;
                width: 100% !important;
                max-width: 220px !important;
                height: 48px !important;
                margin: 0 !important;
                object-fit: contain;
                object-position: left center;
                border: 0 !important;
            }

            #moOrderShell #frmSiparisTakip .xIDDiv > a {
                display: grid !important;
                place-items: center;
                width: 42px !important;
                height: 42px !important;
                margin: 0 !important;
                color: var(--mo-order-ink) !important;
                font-size: 17px !important;
                text-decoration: none;
                border: 1px solid var(--mo-order-line);
                border-radius: 9px;
                background: #fff;
            }

            #moOrderShell #frmSiparisTakip .xIDDiv .textbox {
                grid-column: 1 / -1;
                width: 100% !important;
            }

            #moOrderShell #frmSiparisTakip .xIDDiv .isRequired {
                grid-column: 1 / -1;
                width: 100% !important;
            }

            #moOrderShell #frmSiparisTakip .hsbmTextbox:hover,
            #moOrderShell #frmSiparisTakip .textbox:hover { border-color: #9eb7c1 !important; }
            #moOrderShell #frmSiparisTakip .hsbmTextbox:focus,
            #moOrderShell #frmSiparisTakip .textbox:focus {
                border-color: var(--mo-order-ink) !important;
                background: #fff !important;
                box-shadow: 0 0 0 3px rgba(17,17,15,.07) !important;
            }

            #moOrderShell #frmSiparisTakip .kirmiziUyari,
            #moOrderShell #frmSiparisTakip .alert-danger {
                display: block;
                margin: 6px 0 0 !important;
                padding: 0 !important;
                color: #9d2722 !important;
                font-size: 12px !important;
                border: 0 !important;
                background: transparent !important;
            }

            #moOrderShell #frmSiparisTakip .altButonTutucu {
                position: static !important;
                display: block !important;
                float: none !important;
                clear: both !important;
                width: 100% !important;
                max-width: 100% !important;
                min-width: 0 !important;
                left: auto !important;
                right: auto !important;
                margin: 2px 0 0 !important;
                padding: 0 !important;
                transform: none !important;
            }
            #moOrderShell #frmSiparisTakip .yesilButon {
                float: none !important;
                width: 100% !important;
                height: 56px !important;
                margin: 0 !important;
                padding: 0 22px !important;
                color: #fff !important;
                font: 600 13px 'DM Sans', sans-serif !important;
                letter-spacing: .03em;
                border: 1px solid var(--mo-order-blue) !important;
                border-radius: 12px !important;
                background: var(--mo-order-blue) !important;
                box-shadow: none !important;
                cursor: pointer;
                transition: transform .2s, background .2s, opacity .2s !important;
            }

            #moOrderShell #frmSiparisTakip .yesilButon:hover:not(:disabled) { background: var(--mo-order-blue-dark) !important; transform: translateY(-1px); }
            #moOrderShell #frmSiparisTakip .yesilButon:disabled,
            #moOrderShell #frmSiparisTakip .yesilButon.butonDisabled { opacity: .42 !important; cursor: not-allowed; }

            .mo-order-privacy {
                margin: 18px 0 0;
                padding-left: 16px;
                color: #758793;
                font-size: 12px;
                line-height: 1.55;
                border-left: 2px solid #b8d1d8;
            }

            #moOrderShell .siparisTakipSagBolum { margin-top: 38px !important; animation: moOrderResultIn .45s ease both; }
            #moOrderShell .siparisDurumBilgileri {
                display: grid !important;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 1px;
                float: none !important;
                width: 100% !important;
                margin: 0 0 18px !important;
                padding: 1px !important;
                overflow: hidden;
                color: #fff;
                border: 0 !important;
                border-radius: 14px;
                background: var(--mo-order-blue-dark) !important;
            }

            #moOrderShell .bilgiSatir {
                float: none !important;
                width: auto !important;
                min-width: 0;
                padding: 15px !important;
                border: 0 !important;
                background: var(--mo-order-blue);
            }
            #moOrderShell .bilgiSatir span { color: #fff !important; font-size: 13px !important; overflow-wrap: anywhere; }
            #moOrderShell .bilgiSatir strong {
                display: block;
                margin-bottom: 5px;
                color: rgba(255,255,255,.5) !important;
                font-size: 11px !important;
                font-weight: 500 !important;
                letter-spacing: .07em;
                text-transform: uppercase;
            }

            #moOrderShell .altButonTutucu2 { grid-column: 1 / -1; margin: 0 !important; padding: 10px 14px; background: var(--mo-order-blue); }
            #moOrderShell .kargoTakibiBtn {
                display: inline-flex !important;
                align-items: center;
                justify-content: center;
                gap: 8px;
                float: none !important;
                margin: 0 !important;
                padding: 10px 14px !important;
                color: var(--mo-order-blue) !important;
                font-size: 12px !important;
                font-weight: 600 !important;
                text-decoration: none !important;
                border: 1px solid #fff !important;
                border-radius: 9px !important;
                background: #fff !important;
            }

            #moOrderShell .siparisTakipDetayi,
            #moOrderShell .siparisBlokRow { float: none !important; width: 100% !important; }
            #moOrderShell .siparisTutucu {
                display: grid !important;
                grid-template-columns: 78px minmax(0, 1fr);
                gap: 15px;
                float: none !important;
                width: 100% !important;
                margin: 0 0 10px !important;
                padding: 12px !important;
                border: 1px solid #dce8ec !important;
                border-radius: 12px !important;
                background: #f8fbfc !important;
            }

            #moOrderShell .siparisResim {
                float: none !important;
                width: 78px !important;
                height: 96px !important;
                overflow: hidden;
                border-radius: 8px;
                background: #edf5f7;
            }
            #moOrderShell .siparisResim img { width: 100% !important; height: 100% !important; object-fit: cover !important; }
            #moOrderShell .siparisBilgi {
                display: grid !important;
                grid-template-columns: minmax(0, 1fr) auto;
                gap: 14px;
                align-items: center;
                float: none !important;
                width: auto !important;
            }
            #moOrderShell .siparisBilgiSol,
            #moOrderShell .siparisBilgiSag { float: none !important; width: auto !important; }
            #moOrderShell .siparisBilgiSol > span { color: var(--mo-order-ink) !important; font-size: 14px !important; font-weight: 600; line-height: 1.45; }
            #moOrderShell .siparisBilgiSol strong { display: block; margin-top: 5px; color: var(--mo-order-muted) !important; font-size: 12px !important; font-weight: 400 !important; }
            #moOrderShell .siparisBilgiSag { min-width: 125px; text-align: right; }
            #moOrderShell .siparisBilgiSag > span { display: block; margin: 2px 0; color: var(--mo-order-muted) !important; font-size: 12px !important; }
            #moOrderShell .siparisBilgiSag .siparisTakipDurum {
                display: inline-block !important;
                margin-top: 7px !important;
                padding: 6px 9px !important;
                color: var(--mo-order-success) !important;
                font-size: 11px !important;
                font-weight: 600;
                letter-spacing: .04em;
                text-transform: uppercase;
                border-radius: 99px;
                background: #e8efea !important;
            }

            #moOrderShell .siparisBlokRow { display: grid !important; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 18px !important; }
            #moOrderShell .siparisIkiliBlok { float: none !important; width: auto !important; margin: 0 !important; }
            #moOrderShell .siparisAdres,
            #moOrderShell .siparisEkstresi {
                float: none !important;
                width: 100% !important;
                min-height: 0 !important;
                margin: 0 0 10px !important;
                padding: 16px !important;
                border: 1px solid #dce8ec !important;
                border-radius: 12px !important;
                background: #f8fbfc !important;
            }
            #moOrderShell .siparisAdresBaslik,
            #moOrderShell .ekstreBaslik { display: block; margin-bottom: 8px; color: var(--mo-order-ink) !important; font-size: 12px !important; font-weight: 600; }
            #moOrderShell .siparisAdres p { margin: 0 !important; color: var(--mo-order-muted) !important; font-size: 12px !important; line-height: 1.55 !important; }
            #moOrderShell .ekstreTutar { display: flex !important; justify-content: space-between; gap: 10px; padding: 5px 0; color: var(--mo-order-muted) !important; font-size: 12px !important; }
            #moOrderShell .ekstreTutar strong { color: var(--mo-order-ink) !important; }
            #moOrderShell .ekstreGenelToplam { margin-top: 8px; padding-top: 11px; border-top: 1px solid #dce8ec; }
            #moOrderShell .ekstreGenelToplam span { display: flex; justify-content: space-between; color: var(--mo-order-ink) !important; font-size: 13px !important; font-weight: 600; }

            /* Sorgu sonrası sonuç deneyimi */
            #moOrderShell.mo-has-result .mo-order-card {
                width: min(1380px, 100%);
                grid-template-columns: minmax(310px, .68fr) minmax(0, 1.32fr);
                transition: width .45s cubic-bezier(.2,.7,.2,1), grid-template-columns .45s cubic-bezier(.2,.7,.2,1);
            }

            #moOrderShell.mo-has-result .mo-order-panel { padding: 46px clamp(30px, 4vw, 58px) 58px; }

            .mo-result-heading {
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                gap: 24px;
                margin: 0 0 20px;
                padding-bottom: 18px;
                border-bottom: 1px solid #dce8ec;
            }

            .mo-result-heading-copy { min-width: 0; }
            .mo-result-eyebrow {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 7px;
                color: var(--mo-order-success);
                font-size: 11px;
                font-weight: 600;
                letter-spacing: .13em;
                text-transform: uppercase;
            }
            .mo-result-eyebrow::before {
                content: '';
                width: 7px;
                height: 7px;
                border-radius: 50%;
                background: var(--mo-order-success);
                box-shadow: 0 0 0 4px rgba(45,118,94,.13);
            }
            .mo-result-heading h2 {
                margin: 0;
                color: var(--mo-order-ink);
                font-family: 'Manrope', sans-serif;
                font-size: clamp(23px, 2.3vw, 32px);
                font-weight: 600;
                line-height: 1.15;
                letter-spacing: -.035em;
            }
            .mo-result-heading p { margin: 7px 0 0; color: var(--mo-order-muted); font-size: 13px; line-height: 1.55; }
            .mo-result-change {
                flex: 0 0 auto;
                padding: 9px 12px;
                color: #526574;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
                border: 1px solid #dce8ec;
                border-radius: 9px;
                background: #fff;
                transition: background .2s, border-color .2s;
            }
            .mo-result-change:hover { border-color: #9eb7c1; background: #f7f6f3; }

            .mo-order-progress {
                position: relative;
                display: grid;
                grid-template-columns: repeat(4, minmax(0, 1fr));
                margin: 0 0 22px;
                padding: 20px 18px 17px;
                overflow: hidden;
                border: 1px solid #dce8ec;
                border-radius: 14px;
                background: #f8fbfc;
            }
            .mo-order-progress::before {
                content: '';
                position: absolute;
                top: 31px;
                left: calc(12.5% + 9px);
                right: calc(12.5% + 9px);
                height: 1px;
                background: #dce8ec;
            }
            .mo-progress-step { position: relative; z-index: 1; min-width: 0; text-align: center; }
            .mo-progress-dot {
                display: grid;
                place-items: center;
                width: 23px;
                height: 23px;
                margin: 0 auto 9px;
                color: transparent;
                font-size: 11px;
                border: 1px solid #bbd0d6;
                border-radius: 50%;
                background: #f8fbfc;
            }
            .mo-progress-step.is-complete .mo-progress-dot,
            .mo-progress-step.is-active .mo-progress-dot { color: #fff; border-color: var(--mo-order-blue); background: var(--mo-order-blue); }
            .mo-progress-step.is-active .mo-progress-dot { box-shadow: 0 0 0 5px rgba(79,160,201,.18); }
            .mo-progress-label { display: block; color: #8798a3; font-size: 12px; font-weight: 500; line-height: 1.35; }
            .mo-progress-step.is-complete .mo-progress-label,
            .mo-progress-step.is-active .mo-progress-label { color: var(--mo-order-blue); font-weight: 600; }
            .mo-order-progress.is-cancelled { grid-template-columns: 1fr; padding: 17px; color: #9d2722; text-align: center; border-color: #e8c7c4; background: #fff7f6; }

            #moOrderShell .siparisDurumBilgileri {
                margin-bottom: 22px !important;
                border-radius: 14px !important;
                background: var(--mo-order-blue) !important;
            }
            #moOrderShell .bilgiSatir { position: relative; padding: 18px !important; }
            #moOrderShell .bilgiSatir:not(:last-of-type)::after {
                content: '';
                position: absolute;
                top: 15px;
                right: 0;
                bottom: 15px;
                width: 1px;
                background: rgba(255,255,255,.12);
            }
            #moOrderShell .bilgiSatir span { font-size: 13px !important; font-weight: 500; }

            #moOrderShell .siparisTakipDetayi { display: grid !important; gap: 12px; }
            #moOrderShell .siparisTutucu {
                position: relative;
                grid-template-columns: 112px minmax(0, 1fr) !important;
                gap: 20px !important;
                margin: 0 !important;
                padding: 16px !important;
                overflow: hidden;
                border-color: #d7e6ea !important;
                border-radius: 16px !important;
                background: #fff !important;
                transition: border-color .2s, transform .2s, box-shadow .2s;
            }
            #moOrderShell .siparisTutucu::before {
                content: 'ÜRÜN';
                position: absolute;
                top: 0;
                right: 0;
                padding: 7px 10px;
                color: #788a96;
                font-size: 8px;
                font-weight: 600;
                letter-spacing: .12em;
                border-bottom: 1px solid #dce8ec;
                border-left: 1px solid #dce8ec;
                border-radius: 0 15px 0 9px;
                background: #f8fbfc;
            }
            #moOrderShell .siparisTutucu:hover { transform: translateY(-2px); border-color: #a9c2ca !important; box-shadow: 0 12px 28px rgba(3,35,94,.08); }
            #moOrderShell .siparisResim {
                width: 112px !important;
                height: 132px !important;
                border-radius: 11px !important;
                background: #f3f8fa !important;
            }
            #moOrderShell .siparisBilgi { gap: 24px !important; }
            #moOrderShell .siparisBilgiSol > span { display: block; max-width: 430px; font-size: 15px !important; line-height: 1.48; }
            #moOrderShell .siparisBilgiSol strong {
                margin-top: 10px !important;
                color: #788a96 !important;
                font-size: 12px !important;
                letter-spacing: .045em;
            }
            #moOrderShell .siparisBilgiSag { min-width: 150px; padding: 12px 0 0 18px; border-left: 1px solid #e3edf0; }
            #moOrderShell .siparisBilgiSag > span { margin: 4px 0 !important; font-size: 12px !important; }
            #moOrderShell .siparisBilgiSag > span strong { color: #294356; font-weight: 600; }
            #moOrderShell .siparisBilgiSag .siparisTakipDurum:empty { display: none !important; }

            #moOrderShell .siparisBlokRow {
                display: grid !important;
                grid-template-columns: minmax(0, 1fr) minmax(300px, .88fr) !important;
                gap: 14px !important;
                margin-top: 12px !important;
            }
            #moOrderShell .siparisIkiliBlok:first-child { display: grid; gap: 12px; }
            #moOrderShell .siparisAdres,
            #moOrderShell .siparisEkstresi {
                position: relative;
                margin: 0 !important;
                padding: 20px !important;
                border-color: #d7e6ea !important;
                border-radius: 14px !important;
                background: #f8fbfc !important;
            }
            #moOrderShell .siparisAdres { padding-left: 52px !important; }
            #moOrderShell .siparisAdres::before {
                content: '';
                position: absolute;
                top: 20px;
                left: 19px;
                width: 19px;
                height: 19px;
                border: 1.5px solid #6c7e8a;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg) scale(.72);
            }
            #moOrderShell .siparisAdres::after {
                content: '';
                position: absolute;
                top: 26px;
                left: 25px;
                width: 5px;
                height: 5px;
                border: 1px solid #6c7e8a;
                border-radius: 50%;
            }
            #moOrderShell .siparisAdresBaslik,
            #moOrderShell .ekstreBaslik { margin-bottom: 11px !important; font-size: 12px !important; }
            #moOrderShell .siparisAdres p { font-size: 12px !important; line-height: 1.7 !important; }
            #moOrderShell .siparisEkstresi { height: 100%; display: flex; flex-direction: column; }
            #moOrderShell .ekstreBaslik { padding-bottom: 12px; border-bottom: 1px solid #dce8ec; }
            #moOrderShell .ekstreTutar { padding: 7px 0 !important; font-size: 12px !important; }
            #moOrderShell .ekstreGenelToplam { margin-top: auto !important; padding-top: 15px !important; }
            #moOrderShell .ekstreGenelToplam span { align-items: baseline; font-size: 14px !important; }
            #moOrderShell .ekstreGenelToplam strong { font-family: 'Manrope', sans-serif; font-size: 19px; font-weight: 600; letter-spacing: -.025em; }

            #moOrderShell .sayfaYukleniyor { position: relative; min-height: 190px; pointer-events: none; }
            #moOrderShell .sayfaYukleniyor::after {
                content: 'Siparişin getiriliyor…';
                position: absolute;
                z-index: 5;
                inset: 0;
                display: grid;
                place-items: center;
                color: var(--mo-order-muted);
                font-size: 12px;
                background: rgba(255,255,255,.92);
            }

            @keyframes moOrderIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes moOrderResultIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

            @media (max-width: 900px) {
                #moOrderShell { padding: 34px 16px; }
                .mo-order-card { grid-template-columns: 1fr; max-width: 640px; }
                .mo-order-visual { min-height: 275px; padding: 34px; }
                .mo-order-art { width: 340px; top: -50px; right: -10px; opacity: .62; }
                .mo-order-visual-copy { left: 34px; right: 34px; bottom: 29px; }
                .mo-order-visual-copy h2 { max-width: 390px; margin-bottom: 0; font-size: 34px; }
                .mo-order-visual-copy p { display: none; }
                .mo-order-panel { padding: 42px 34px 48px; }
                #moOrderShell.mo-has-result .mo-order-card { grid-template-columns: 1fr; max-width: 760px; }
                #moOrderShell.mo-has-result .mo-order-panel { padding: 42px 34px 48px; }
            }

            @media (max-width: 540px) {
                #moOrderShell { padding: 18px 12px 30px; }
                .mo-order-card { border-radius: 20px; }
                .mo-order-visual { min-height: 205px; padding: 25px; }
                .mo-order-art { width: 250px; top: -52px; right: -22px; }
                .mo-order-visual-copy { left: 25px; right: 25px; bottom: 22px; }
                .mo-order-visual-copy h2 { max-width: 290px; font-size: 27px; }
                .mo-order-kicker { font-size: 11px; }
                .mo-order-panel { padding: 34px 23px 38px; }
                #moOrderShell .siparisTakipBaslik h3 { font-size: 34px !important; }
                #moOrderShell .siparisDurumBilgileri { grid-template-columns: 1fr; }
                #moOrderShell .bilgiSatir:not(:last-of-type)::after { top: auto; left: 15px; right: 15px; bottom: 0; width: auto; height: 1px; }
                .mo-result-heading { align-items: flex-start; }
                .mo-result-change { display: none; }
                .mo-order-progress { padding-left: 4px; padding-right: 4px; }
                .mo-progress-label { font-size: 8px; }
                #moOrderShell .siparisTutucu { grid-template-columns: 82px minmax(0, 1fr) !important; gap: 13px !important; padding: 12px !important; }
                #moOrderShell .siparisResim { width: 82px !important; height: 105px !important; }
                #moOrderShell .siparisBilgi { grid-template-columns: 1fr; }
                #moOrderShell .siparisBilgiSag { min-width: 0; padding: 10px 0 0; text-align: left; border-top: 1px solid #e3edf0; border-left: 0; }
                #moOrderShell .siparisBlokRow { grid-template-columns: 1fr !important; }
            }

            @media (prefers-reduced-motion: reduce) {
                .mo-order-card,
                #moOrderShell .siparisTakipSagBolum { animation: none; }
                #moOrderShell * { transition-duration: .01ms !important; }
            }
        `;
        document.head.appendChild(style);

        var shell = document.createElement('section');
        shell.id = 'moOrderShell';
        shell.setAttribute('aria-label', 'Sipariş takip alanı');
        shell.innerHTML = `
            <div class="mo-order-card">
                <aside class="mo-order-visual" aria-hidden="true">
                    <div class="mo-order-kicker">Motif İstanbul / Sipariş takibi</div>
                    <svg class="mo-order-art" viewBox="0 0 560 620" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="280" cy="280" r="196" stroke="currentColor" stroke-width="1" opacity=".22"/>
                        <circle cx="280" cy="280" r="142" stroke="currentColor" stroke-width="1" opacity=".32"/>
                        <path d="M280 53 507 280 280 507 53 280 280 53Z" stroke="currentColor" stroke-width="1.6" opacity=".75"/>
                        <path d="M280 126 434 280 280 434 126 280 280 126Z" stroke="currentColor" stroke-width="1.6"/>
                        <path d="M280 187 373 280 280 373 187 280 280 187Z" fill="currentColor" opacity=".12" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M280 232 328 280 280 328 232 280 280 232Z" fill="currentColor" opacity=".45"/>
                        <path d="M53 280h454M280 53v454M120 120l320 320M440 120 120 440" stroke="currentColor" stroke-width=".85" opacity=".25"/>
                        <circle cx="280" cy="53" r="6" fill="currentColor"/><circle cx="507" cy="280" r="6" fill="currentColor"/>
                        <circle cx="280" cy="507" r="6" fill="currentColor"/><circle cx="53" cy="280" r="6" fill="currentColor"/>
                        <path d="M88 548h384M120 570h320" stroke="currentColor" stroke-width="1" opacity=".22"/>
                    </svg>
                    <div class="mo-order-visual-copy">
                        <h2>Siparişinin her adımını takip et.</h2>
                        <p>Seçtiğin motiflerin hazırlıktan teslimata uzanan yolculuğunu tek ekranda izle.</p>
                    </div>
                </aside>
                <main class="mo-order-panel">
                    <div id="moOrderContentSlot"></div>
                </main>
            </div>`;

        source.parentNode.insertBefore(shell, source);
        document.getElementById('moOrderContentSlot').appendChild(source);

        var heading = source.querySelector('.siparisTakipBaslik');
        if (heading && !heading.querySelector('.mo-order-intro')) {
            var intro = document.createElement('p');
            intro.className = 'mo-order-intro';
            intro.textContent = 'E-posta adresin ve sipariş numaranla gönderinin güncel durumuna ulaş.';
            heading.appendChild(intro);
        }

        var form = source.querySelector('#frmSiparisTakip');
        if (form && !source.querySelector('.mo-order-privacy')) {
            var privacy = document.createElement('p');
            privacy.className = 'mo-order-privacy';
            privacy.textContent = 'Bilgilerin yalnızca siparişini bulmak için kullanılır.';
            form.parentNode.insertBefore(privacy, form.nextSibling);
        }

        var mail = source.querySelector('#txtSiparisTakipMail');
        var orderNo = source.querySelector('#mainHolder_txtSiparisNumarasi');
        var button = source.querySelector('#frmSiparisTakip .yesilButon');
        var captchaRow = source.querySelector('.xIDDiv');
        var captchaImage = source.querySelector('#imgTicimaxCaptcha');

        if (mail) {
            mail.setAttribute('aria-label', 'E-posta adresi');
            mail.setAttribute('autocomplete', 'email');
            mail.setAttribute('inputmode', 'email');
            mail.setAttribute('placeholder', 'eposta@ornek.com');
        }

        if (orderNo) {
            orderNo.setAttribute('aria-label', 'Sipariş numarası');
            orderNo.setAttribute('autocomplete', 'off');
            orderNo.setAttribute('autocapitalize', 'characters');
            orderNo.setAttribute('placeholder', 'Örn. 668CW7335I');
            orderNo.addEventListener('input', function () {
                var start = this.selectionStart;
                this.value = this.value.toUpperCase().replace(/\s/g, '');
                if (start !== null) this.setSelectionRange(start, start);
            });
        }

        if (button) {
            button.setAttribute('aria-label', 'Siparişimi sorgula');
            var normalizeButtonText = function () {
                if (!button.value || button.value.indexOf('{{') !== -1) button.value = 'Siparişimi sorgula';
            };
            normalizeButtonText();
            window.setTimeout(normalizeButtonText, 800);
        }

        function refreshCaptchaWhenNeeded() {
            if (!captchaRow || !captchaImage) return;
            var isVisible = window.getComputedStyle(captchaRow).display !== 'none';
            var imageSource = captchaImage.getAttribute('src');
            if (isVisible && (!imageSource || imageSource === '#') && typeof window.GuvenlikKoduYenile === 'function') {
                window.GuvenlikKoduYenile();
            }
        }

        if (captchaRow) {
            refreshCaptchaWhenNeeded();
            new MutationObserver(refreshCaptchaWhenNeeded).observe(captchaRow, {
                attributes: true,
                attributeFilter: ['class', 'style']
            });
        }

        var result = source.querySelector('.siparisTakipSagBolum');
        var resultUpdateQueued = false;

        function getOrderStatus() {
            if (!result) return '';
            var rows = result.querySelectorAll('.siparisDurumBilgileri .bilgiSatir');
            if (!rows.length) return '';
            var statusText = rows[rows.length - 1].textContent || '';
            return statusText.replace(/^\s*Durum\s*:?\s*/i, '').trim();
        }

        function getProgressIndex(status) {
            var normalized = status.toLocaleLowerCase('tr-TR');
            if (/iptal|iade|başarısız|reddedildi/.test(normalized)) return -1;
            if (/teslim/.test(normalized)) return 3;
            if (/kargo|dağıtım|yolda|sevk/.test(normalized)) return 2;
            if (/hazır|tedarik|paket|işleniyor/.test(normalized)) return 1;
            return 0;
        }

        function renderResultExperience() {
            resultUpdateQueued = false;
            if (!result) return;

            var isVisible = window.getComputedStyle(result).display !== 'none' && !result.classList.contains('ng-hide');
            var hasProducts = Boolean(result.querySelector('.siparisTutucu'));
            shell.classList.toggle('mo-has-result', isVisible && hasProducts);
            if (!isVisible || !hasProducts) return;

            result.setAttribute('aria-live', 'polite');

            var statusBox = result.querySelector('.siparisDurumBilgileri');
            if (!statusBox) return;

            var resultHeading = result.querySelector('.mo-result-heading');
            if (!resultHeading) {
                resultHeading = document.createElement('div');
                resultHeading.className = 'mo-result-heading';
                resultHeading.innerHTML = `
                    <div class="mo-result-heading-copy">
                        <span class="mo-result-eyebrow">Sipariş bulundu</span>
                        <h2>Siparişinin güncel durumu</h2>
                        <p>Ürün, teslimat ve ödeme bilgilerini aşağıda inceleyebilirsin.</p>
                    </div>
                    <button class="mo-result-change" type="button">Bilgileri değiştir</button>`;
                result.insertBefore(resultHeading, statusBox);

                resultHeading.querySelector('.mo-result-change').addEventListener('click', function () {
                    if (mail) {
                        mail.focus({ preventScroll: true });
                        mail.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                });
            }

            var progress = result.querySelector('.mo-order-progress');
            if (!progress) {
                progress = document.createElement('div');
                progress.className = 'mo-order-progress';
                progress.setAttribute('aria-label', 'Sipariş ilerleme durumu');
                statusBox.parentNode.insertBefore(progress, statusBox.nextSibling);
            }

            var status = getOrderStatus();
            var progressIndex = getProgressIndex(status);
            var progressState = String(progressIndex) + '|' + status;
            if (progress.dataset.state !== progressState) {
                progress.dataset.state = progressState;
                if (progressIndex === -1) {
                    progress.className = 'mo-order-progress is-cancelled';
                    progress.textContent = status || 'Sipariş işlemi sonlandırıldı';
                } else {
                    var steps = ['Sipariş alındı', 'Hazırlanıyor', 'Kargoya verildi', 'Teslim edildi'];
                    progress.className = 'mo-order-progress';
                    progress.innerHTML = steps.map(function (label, index) {
                        var stateClass = index < progressIndex ? ' is-complete' : (index === progressIndex ? ' is-active' : '');
                        return '<div class="mo-progress-step' + stateClass + '">' +
                            '<span class="mo-progress-dot">✓</span>' +
                            '<span class="mo-progress-label">' + label + '</span>' +
                        '</div>';
                    }).join('');
                }
            }

            var productCount = result.querySelectorAll('.siparisTutucu').length;
            var resultDescription = resultHeading.querySelector('p');
            var descriptionText = productCount + ' ürünün teslimat ve ödeme bilgilerini aşağıda inceleyebilirsin.';
            if (resultDescription && resultDescription.textContent !== descriptionText) {
                resultDescription.textContent = descriptionText;
            }
        }

        function queueResultUpdate() {
            if (resultUpdateQueued) return;
            resultUpdateQueued = true;
            window.requestAnimationFrame(renderResultExperience);
        }

        if (result) {
            queueResultUpdate();
            new MutationObserver(queueResultUpdate).observe(result, {
                childList: true,
                subtree: true,
                characterData: true,
                attributes: true,
                attributeFilter: ['class', 'style']
            });
        }

        [mail, orderNo].forEach(function (input) {
            if (!input) return;
            input.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' && button && !button.disabled) {
                    event.preventDefault();
                    button.click();
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', modernizeOrderTracking);
    } else {
        modernizeOrderTracking();
    }
}());
