(function () {
    'use strict';

    var STYLE_ID = 'moProductDetailStyles';
    var READY_ATTR = 'data-mo-product-detail-ready';

    function injectFonts() {
        if (document.querySelector('link[data-mo-product-detail-fonts]')) return;

        var fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Manrope:wght@500;600;700;800;900&display=swap';
        fontLink.setAttribute('data-mo-product-detail-fonts', 'true');
        document.head.appendChild(fontLink);
    }

    function injectStyles() {
        if (document.getElementById(STYLE_ID)) return;

        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            body {
                --mo-pd-deep: #03235e;
                --mo-pd-ink: #0c4853;
                --mo-pd-accent: #4fa0c9;
                --mo-pd-green: #17a56b;
                --mo-pd-soft: #eef8fa;
                --mo-pd-line: rgba(3, 35, 94, .14);
                --mo-pd-shadow: 0 18px 44px rgba(3, 35, 94, .12);
            }

            #divSatinAl.buybutton,
            .ProductIcon,
            .ProductIcon2 {
                box-sizing: border-box;
                width: 100% !important;
                float: none !important;
                clear: both !important;
                font-family: "Manrope", "DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            }

            #divSatinAl.buybutton *,
            .ProductIcon *,
            .ProductIcon2 * {
                box-sizing: border-box;
            }

            #divSatinAl.buybutton {
                display: grid !important;
                grid-template-columns: minmax(0, 1.12fr) minmax(180px, .72fr);
                gap: 12px;
                align-items: stretch;
                margin: 22px 0 14px !important;
                padding: 14px !important;
                border: 1px solid var(--mo-pd-line);
                border-radius: 16px;
                background: linear-gradient(135deg, rgba(79, 160, 201, .08), rgba(255, 255, 255, .94) 44%, rgba(12, 72, 83, .07));
                box-shadow: 0 12px 34px rgba(3, 35, 94, .08);
            }

            #divSatinAl.buybutton .BasketBtn,
            #divSatinAl.buybutton .buyfast {
                float: none !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
            }

            #divSatinAl.buybutton .BasketBtn {
                display: grid !important;
                grid-template-columns: 118px minmax(0, 1fr);
                gap: 10px;
                align-items: stretch;
            }

            #divSatinAl.buybutton .basketBtn,
            #divSatinAl.buybutton .buyfast,
            #divSatinAl.buybutton #divBasketInputTextBox {
                min-width: 0;
            }

            #divSatinAl.buybutton .basketBtn,
            #divSatinAl.buybutton .buyfast {
                position: relative;
            }

            #divSatinAl.buybutton .basketBtn::before,
            #divSatinAl.buybutton .buyfast::before {
                content: "";
                position: absolute;
                z-index: 2;
                left: 18px;
                top: 50%;
                width: 18px;
                height: 18px;
                pointer-events: none;
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
                transform: translateY(-50%);
            }

            #divSatinAl.buybutton .basketBtn::before {
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 8h13l-1.4 7.2a2 2 0 0 1-2 1.6H9.4a2 2 0 0 1-2-1.7L6.1 4.8H3' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10 21h.01M17 21h.01' stroke='white' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E");
            }

            #divSatinAl.buybutton .buyfast::before {
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 2 4 14h7l-1 8 10-13h-7l1-7Z' stroke='%2303235e' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E");
            }

            #divSatinAl.buybutton #divBasketInputTextBox,
            #divSatinAl.buybutton .Basketinp,
            #divSatinAl.buybutton .riSingle,
            #divSatinAl.buybutton .RadInput {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                width: 100% !important;
                height: 58px !important;
                margin: 0 !important;
                padding: 0 8px !important;
                overflow: hidden;
                border: 1px solid var(--mo-pd-line) !important;
                border-radius: 14px !important;
                background: rgba(255, 255, 255, .92) !important;
                box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .5);
            }

            #divSatinAl.buybutton .pSatisBirimi {
                display: none !important;
            }

            #divSatinAl.buybutton .txtSepetAdet {
                order: 2;
                flex: 1 1 auto !important;
                width: 34px !important;
                min-width: 30px !important;
                height: 48px !important;
                margin: 0 !important;
                padding: 0 !important;
                color: var(--mo-pd-deep) !important;
                font: 800 15px/1 "Manrope", system-ui, sans-serif !important;
                text-align: center !important;
                border: 0 !important;
                outline: 0 !important;
                background: transparent !important;
                box-shadow: none !important;
                appearance: textfield;
            }

            #divSatinAl.buybutton .qtyPlus,
            #divSatinAl.buybutton .qtyMinus,
            #divSatinAl.buybutton .urunDetayAdetArttirma {
                position: static !important;
                order: 3;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                flex: 0 0 34px !important;
                width: 34px !important;
                height: 34px !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden;
                color: transparent !important;
                text-indent: -999px;
                border: 1px solid rgba(3, 35, 94, .12) !important;
                border-radius: 50% !important;
                background: #fff !important;
                box-shadow: 0 8px 18px rgba(3, 35, 94, .08);
                transition: transform .18s ease, border-color .18s ease, background .18s ease;
            }

            #divSatinAl.buybutton .qtyMinus {
                order: 1;
            }

            #divSatinAl.buybutton .qtyPlus::before,
            #divSatinAl.buybutton .qtyMinus::before {
                display: block;
                color: var(--mo-pd-deep);
                text-indent: 0;
                font: 900 19px/1 "Manrope", system-ui, sans-serif;
            }

            #divSatinAl.buybutton .qtyPlus::before { content: "+"; }
            #divSatinAl.buybutton .qtyMinus::before { content: "−"; transform: translateY(-1px); }

            #divSatinAl.buybutton .qtyPlus:hover,
            #divSatinAl.buybutton .qtyMinus:hover {
                transform: translateY(-1px);
                border-color: rgba(79, 160, 201, .55) !important;
                background: var(--mo-pd-soft) !important;
            }

            #divSatinAl.buybutton .Addtobasket,
            #divSatinAl.buybutton .buyfastbutton,
            #divSatinAl.buybutton #btnHemenAl,
            #divSatinAl.buybutton #kendinTasarlaClickButtonId {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 9px;
                width: 100% !important;
                min-width: 0 !important;
                height: 58px !important;
                margin: 0 !important;
                padding: 0 18px !important;
                border-radius: 14px !important;
                font: 900 13px/1 "Manrope", system-ui, sans-serif !important;
                letter-spacing: .02em;
                text-transform: uppercase;
                cursor: pointer;
                box-shadow: none !important;
                transition: transform .18s ease, box-shadow .18s ease, background .18s ease, border-color .18s ease;
                -webkit-appearance: none;
                appearance: none;
            }

            #divSatinAl.buybutton .Addtobasket,
            #divSatinAl.buybutton .buyfastbutton,
            #divSatinAl.buybutton #btnHemenAl {
                padding-left: 46px !important;
            }

            #divSatinAl.buybutton .Addtobasket,
            #divSatinAl.buybutton #kendinTasarlaClickButtonId {
                color: #fff !important;
                border: 1px solid var(--mo-pd-ink) !important;
                background: linear-gradient(135deg, var(--mo-pd-ink), var(--mo-pd-deep)) !important;
                box-shadow: 0 16px 30px rgba(3, 35, 94, .22) !important;
            }

            #divSatinAl.buybutton .buyfastbutton,
            #divSatinAl.buybutton #btnHemenAl {
                color: var(--mo-pd-deep) !important;
                border: 1px solid rgba(3, 35, 94, .18) !important;
                background: rgba(255, 255, 255, .96) !important;
            }

            #divSatinAl.buybutton .Addtobasket:hover,
            #divSatinAl.buybutton #kendinTasarlaClickButtonId:hover,
            #divSatinAl.buybutton .buyfastbutton:hover,
            #divSatinAl.buybutton #btnHemenAl:hover {
                transform: translateY(-2px);
                box-shadow: var(--mo-pd-shadow) !important;
            }

            #divSatinAl.buybutton .Addtobasket:active,
            #divSatinAl.buybutton #kendinTasarlaClickButtonId:active,
            #divSatinAl.buybutton .buyfastbutton:active,
            #divSatinAl.buybutton #btnHemenAl:active {
                transform: translateY(0);
            }

            #divSatinAl.buybutton .Addtobasket.mo-has-icon,
            #divSatinAl.buybutton .buyfastbutton.mo-has-icon {
                background-position: 18px center !important;
                background-repeat: no-repeat !important;
                background-size: 18px 18px !important;
            }

            .ProductIcon {
                display: grid !important;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 10px;
                margin: 14px 0 !important;
            }

            .ProductIcon > div,
            .ProductIcon2 > div:not(.clear):not(#divSocialButtons) {
                float: none !important;
                width: auto !important;
                margin: 0 !important;
                padding: 0 !important;
            }

            .ProductIcon a,
            .ProductIcon2 a.button,
            .ProductIcon2 .button,
            .ProductIcon .box1,
            .ProductIcon2 span {
                text-decoration: none !important;
            }

            .ProductIcon a,
            .ProductIcon2 a.button {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                width: 100% !important;
                min-height: 50px !important;
                margin: 0 !important;
                padding: 0 14px !important;
                color: var(--mo-pd-deep) !important;
                border: 1px solid rgba(3, 35, 94, .12) !important;
                border-radius: 13px !important;
                background: #fff !important;
                box-shadow: 0 10px 24px rgba(3, 35, 94, .06);
                transition: transform .18s ease, border-color .18s ease, background .18s ease, box-shadow .18s ease;
            }

            .ProductIcon a:hover,
            .ProductIcon2 a.button:hover {
                transform: translateY(-1px);
                border-color: rgba(79, 160, 201, .55) !important;
                background: linear-gradient(135deg, #fff, var(--mo-pd-soft)) !important;
                box-shadow: 0 14px 28px rgba(3, 35, 94, .1);
            }

            .ProductIcon .box1,
            .ProductIcon2 a.button span {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 8px;
                width: auto !important;
                min-width: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                color: inherit !important;
                font: 800 12px/1.2 "Manrope", system-ui, sans-serif !important;
                white-space: normal;
                text-align: center;
                background: transparent !important;
                border: 0 !important;
            }

            .ProductIcon i,
            .ProductIcon2 i {
                display: inline-flex !important;
                align-items: center;
                justify-content: center;
                flex: 0 0 26px;
                width: 26px !important;
                height: 26px !important;
                margin: 0 !important;
                color: var(--mo-pd-ink) !important;
                border-radius: 50%;
                background: rgba(79, 160, 201, .12);
                font-size: 12px !important;
            }

            .ProductIcon2 {
                display: flex !important;
                flex-wrap: wrap;
                gap: 10px;
                margin: 10px 0 18px !important;
            }

            .ProductIcon2 > div:not(.clear):not(#divSocialButtons) {
                flex: 1 1 150px;
            }

            .ProductIcon2 a.button {
                min-height: 48px !important;
                font: 800 12px/1.2 "Manrope", system-ui, sans-serif !important;
            }

            .ProductIcon2 #divSocialButtons,
            .ProductIcon2 .socialButons {
                width: 100% !important;
                margin-top: 12px !important;
            }

            body #pnlFiyatlar,
            body .urunDetayFiyatContainer,
            body #divFiyatAlanlari {
                font-family: "Manrope", "DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
            }

            body #pnlFiyatlar .Formline,
            body .urunDetayFiyatContainer .Formline {
                display: flex !important;
                align-items: baseline !important;
                gap: 8px;
                width: 100% !important;
                margin: 0 0 18px !important;
                padding: 0 !important;
                border: 0 !important;
            }

            body #pnlFiyatlar .left_line,
            body #pnlFiyatlar .center_line,
            body .urunDetayFiyatContainer .left_line,
            body .urunDetayFiyatContainer .center_line {
                display: none !important;
            }

            body #pnlFiyatlar .right_line,
            body .urunDetayFiyatContainer .right_line,
            body #pnlFiyatlar .indirimliFiyat,
            body .urunDetayFiyatContainer .indirimliFiyat {
                float: none !important;
                width: auto !important;
                margin: 0 !important;
                padding: 0 !important;
                color: #111 !important;
                font-family: "Manrope", "DM Sans", system-ui, sans-serif !important;
            }

            body #pnlFiyatlar .spanFiyat,
            body .urunDetayFiyatContainer .spanFiyat {
                color: #111 !important;
                font: 900 34px/1 "Manrope", "DM Sans", system-ui, sans-serif !important;
                letter-spacing: 0 !important;
            }

            body #pnlFiyatlar .spanKdv,
            body .urunDetayFiyatContainer .spanKdv {
                margin-left: 8px !important;
                color: #333 !important;
                font: 800 14px/1 "Manrope", "DM Sans", system-ui, sans-serif !important;
            }

            body #divSatinAl.buybutton {
                display: grid !important;
                grid-template-columns: 124px minmax(190px, 1fr) minmax(158px, .62fr) !important;
                gap: 10px !important;
                align-items: stretch !important;
                max-width: 100% !important;
                min-height: 0 !important;
                overflow: visible !important;
                background: linear-gradient(135deg, rgba(79, 160, 201, .1), rgba(255,255,255,.98) 42%, rgba(12,72,83,.08)) !important;
            }

            body #divSatinAl.buybutton .BasketBtn {
                display: contents !important;
            }

            body #divSatinAl.buybutton #divBasketInputTextBox {
                grid-column: 1;
                grid-row: 1;
            }

            body #divSatinAl.buybutton .basketBtn {
                grid-column: 2;
                grid-row: 1;
                position: relative !important;
                display: block !important;
                width: 100% !important;
                min-width: 0 !important;
                height: 58px !important;
            }

            body #divSatinAl.buybutton .buyfast {
                grid-column: 3;
                grid-row: 1;
                position: relative !important;
                display: block !important;
                width: 100% !important;
                min-width: 0 !important;
                height: 58px !important;
            }

            body #divSatinAl.buybutton .basketBtn::before,
            body #divSatinAl.buybutton .buyfast::before {
                left: 18px !important;
            }

            body #divSatinAl.buybutton .basketBtn input.Addtobasket.button,
            body #divSatinAl.buybutton input.Addtobasket.button,
            body #divSatinAl.buybutton a.Addtobasket.button,
            body #divSatinAl.buybutton #kendinTasarlaClickButtonId {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                width: 100% !important;
                min-width: 0 !important;
                height: 58px !important;
                min-height: 58px !important;
                margin: 0 !important;
                padding: 0 18px 0 48px !important;
                overflow: hidden !important;
                color: #fff !important;
                -webkit-text-fill-color: #fff !important;
                font: 900 13px/1 "Manrope", "DM Sans", system-ui, sans-serif !important;
                line-height: 58px !important;
                letter-spacing: .02em !important;
                text-align: center !important;
                text-indent: 0 !important;
                white-space: nowrap !important;
                border: 1px solid var(--mo-pd-ink) !important;
                border-radius: 14px !important;
                background: linear-gradient(135deg, #0c4853, #03235e) !important;
                box-shadow: 0 16px 30px rgba(3, 35, 94, .2) !important;
                opacity: 1 !important;
                visibility: visible !important;
            }

            body #divSatinAl.buybutton .buyfast input.buyfastbutton.button,
            body #divSatinAl.buybutton input#btnHemenAl {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                width: 100% !important;
                min-width: 0 !important;
                height: 58px !important;
                min-height: 58px !important;
                margin: 0 !important;
                padding: 0 18px 0 48px !important;
                overflow: hidden !important;
                color: var(--mo-pd-deep) !important;
                -webkit-text-fill-color: var(--mo-pd-deep) !important;
                font: 900 13px/1 "Manrope", "DM Sans", system-ui, sans-serif !important;
                line-height: 58px !important;
                letter-spacing: .02em !important;
                text-align: center !important;
                text-indent: 0 !important;
                white-space: nowrap !important;
                border: 1px solid rgba(3, 35, 94, .18) !important;
                border-radius: 14px !important;
                background: #fff !important;
                box-shadow: 0 12px 26px rgba(3, 35, 94, .08) !important;
                opacity: 1 !important;
                visibility: visible !important;
            }

            body #divUrunEkSecenek {
                position: relative;
                margin: 22px 0 18px !important;
                padding: 0 !important;
                border: 0 !important;
                font-family: "Manrope", "DM Sans", system-ui, sans-serif !important;
            }

            body #divUrunEkSecenek .eksecenekLine,
            body #divUrunEkSecenekV2 .eksecenekLine {
                display: block !important;
                width: 100% !important;
                margin: 0 0 14px !important;
                padding: 0 !important;
                border: 0 !important;
            }

            body #divUrunEkSecenek .left_line,
            body #divUrunEkSecenekV2 .left_line {
                display: block !important;
                float: none !important;
                width: 100% !important;
                margin: 0 0 10px !important;
                color: #111 !important;
                font: 900 13px/1 "Manrope", "DM Sans", system-ui, sans-serif !important;
                letter-spacing: .04em;
                text-transform: uppercase;
            }

            body #divUrunEkSecenek .center_line,
            body #divUrunEkSecenekV2 .center_line {
                display: none !important;
            }

            body #divUrunEkSecenek .right_line,
            body #divUrunEkSecenekV2 .right_line {
                display: flex !important;
                flex-wrap: wrap;
                gap: 8px;
                float: none !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
            }

            body #divUrunEkSecenek .size_box,
            body #divUrunEkSecenekV2 .size_box {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                min-width: 0 !important;
                min-height: 44px !important;
                margin: 0 !important;
                padding: 0 16px !important;
                color: #111 !important;
                font: 800 13px/1 "Manrope", "DM Sans", system-ui, sans-serif !important;
                border: 1px solid rgba(3, 35, 94, .16) !important;
                border-radius: 12px !important;
                background: #fff !important;
                cursor: pointer;
                transition: border-color .18s ease, background .18s ease, color .18s ease, transform .18s ease;
            }

            body #divUrunEkSecenek .size_box:hover,
            body #divUrunEkSecenekV2 .size_box:hover,
            body #divUrunEkSecenek .size_box.selected,
            body #divUrunEkSecenekV2 .size_box.selected {
                color: #fff !important;
                border-color: var(--mo-pd-ink) !important;
                background: var(--mo-pd-ink) !important;
                transform: translateY(-1px);
            }

            body #divUrunEkSecenek .tooltipp,
            body .tooltipp {
                position: relative !important;
                display: inline-flex !important;
                align-items: center;
                gap: 9px;
                width: auto !important;
                min-height: 42px;
                margin: 4px 0 0 !important;
                padding: 0 15px !important;
                color: #8a3315 !important;
                font: 800 12px/1.25 "Manrope", "DM Sans", system-ui, sans-serif !important;
                border: 1px solid rgba(202, 91, 38, .22) !important;
                border-radius: 12px !important;
                background: #fff5ef !important;
                box-shadow: 0 12px 28px rgba(202, 91, 38, .1) !important;
            }

            body #divUrunEkSecenek .tooltipp::before,
            body .tooltipp::before {
                content: "!";
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 20px;
                height: 20px;
                color: #fff;
                border-radius: 50%;
                background: #ca5b26;
                font: 900 12px/1 "Manrope", system-ui, sans-serif;
            }

            body #divUrunEkSecenek .tooltipp i,
            body .tooltipp i {
                display: none !important;
            }

            body .modal-content-html,
            body .fancybox-wrap,
            body .fancybox-wrap * {
                box-sizing: border-box;
                font-family: "Manrope", "DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
            }

            body .fancybox-overlay {
                background: rgba(3, 35, 94, .46) !important;
                backdrop-filter: blur(8px);
            }

            body .fancybox-wrap {
                max-width: min(460px, calc(100vw - 28px)) !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
            }

            body .fancybox-skin {
                padding: 0 !important;
                overflow: hidden !important;
                border: 1px solid rgba(255,255,255,.72) !important;
                border-radius: 18px !important;
                background: #fff !important;
                box-shadow: 0 28px 90px rgba(3, 35, 94, .28) !important;
            }

            body .fancybox-inner {
                width: min(430px, calc(100vw - 32px)) !important;
                min-height: 250px !important;
                border-radius: 18px !important;
                background: #fff !important;
            }

            body .fancybox-close,
            body .modal-close {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                width: 42px !important;
                height: 42px !important;
                top: 12px !important;
                right: 12px !important;
                color: #fff !important;
                border: 0 !important;
                border-radius: 50% !important;
                background: var(--mo-pd-deep) !important;
                box-shadow: 0 12px 26px rgba(3, 35, 94, .22) !important;
            }

            body .modal-content-html {
                max-width: min(520px, calc(100vw - 28px));
                margin: 0 auto !important;
                padding: 26px !important;
                overflow: hidden;
                border: 1px solid rgba(3, 35, 94, .12);
                border-radius: 18px;
                background: #fff;
                box-shadow: 0 28px 90px rgba(3, 35, 94, .22);
            }

            body .divYorumYazGiris .alert,
            body .modal-content-html .alert {
                display: grid !important;
                grid-template-columns: 1fr;
                gap: 14px;
                margin: 0 !important;
                padding: 22px !important;
                color: var(--mo-pd-deep) !important;
                font: 800 15px/1.45 "Manrope", "DM Sans", system-ui, sans-serif !important;
                border: 1px solid rgba(79, 160, 201, .24) !important;
                border-radius: 16px !important;
                background: linear-gradient(135deg, #f6fcfd, #fff) !important;
            }

            body .divYorumYazGiris .alert::before {
                content: "Yorum yaz";
                display: block;
                color: #111;
                font: 900 20px/1.15 "Manrope", "DM Sans", system-ui, sans-serif;
            }

            body .divYorumYazGiris .alert a.button,
            body .modal-content-html .alert a.button {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                width: fit-content !important;
                min-width: 150px;
                height: 46px !important;
                margin: 0 !important;
                padding: 0 18px !important;
                color: #fff !important;
                border: 1px solid var(--mo-pd-ink) !important;
                border-radius: 13px !important;
                background: linear-gradient(135deg, var(--mo-pd-ink), var(--mo-pd-deep)) !important;
                font: 900 13px/1 "Manrope", "DM Sans", system-ui, sans-serif !important;
                text-decoration: none !important;
                box-shadow: 0 16px 30px rgba(3, 35, 94, .18) !important;
            }

            body .urunTab {
                margin-top: 28px !important;
                border-bottom: 1px solid rgba(3, 35, 94, .12) !important;
                font-family: "Manrope", "DM Sans", system-ui, sans-serif !important;
            }

            body .urunTab ul {
                display: flex !important;
                flex-wrap: wrap;
                gap: 8px;
                margin: 0 !important;
                padding: 0 !important;
                border: 0 !important;
            }

            body .urunTab li {
                float: none !important;
                margin: 0 !important;
                padding: 0 !important;
                border: 0 !important;
                background: transparent !important;
            }

            body .urunTab li a {
                display: inline-flex !important;
                align-items: center;
                justify-content: center;
                min-height: 44px;
                padding: 0 16px !important;
                color: #536072 !important;
                border: 1px solid rgba(3, 35, 94, .12) !important;
                border-bottom: 0 !important;
                border-radius: 13px 13px 0 0 !important;
                background: #f7fafb !important;
                font: 900 12px/1 "Manrope", "DM Sans", system-ui, sans-serif !important;
                letter-spacing: .02em;
                text-decoration: none !important;
            }

            body .urunTab li.active a {
                color: #fff !important;
                border-color: var(--mo-pd-ink) !important;
                background: linear-gradient(135deg, var(--mo-pd-ink), var(--mo-pd-deep)) !important;
            }

            body .urunDetayPanel {
                margin-top: 0 !important;
                padding: 24px !important;
                border: 1px solid rgba(3, 35, 94, .12) !important;
                border-top: 0 !important;
                border-radius: 0 0 16px 16px !important;
                background: #fff !important;
                box-shadow: 0 18px 42px rgba(3, 35, 94, .06);
                font-family: "Manrope", "DM Sans", system-ui, sans-serif !important;
            }

            body .urunDetayPanel::before {
                content: attr(data-mo-tab-title);
                display: none;
                margin: 0 0 16px;
                color: #111;
                font: 900 20px/1.15 "Manrope", "DM Sans", system-ui, sans-serif;
            }

            body .urunDetayPanel[data-mo-tab-title]::before {
                display: block;
            }

            body #divTabOdemeSecenekleri .urunTabAlt {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 12px;
            }

            body #divTabOdemeSecenekleri .odemeSecenekItem {
                display: grid !important;
                grid-template-columns: 1fr;
                gap: 6px;
                min-height: 88px;
                margin: 0 !important;
                padding: 18px !important;
                border: 1px solid rgba(3, 35, 94, .12) !important;
                border-radius: 14px !important;
                background: linear-gradient(135deg, #fff, #f7fbfc) !important;
            }

            body #divTabOdemeSecenekleri .odemeSecenekItem span {
                color: #536072 !important;
                font: 800 12px/1.2 "Manrope", "DM Sans", system-ui, sans-serif !important;
            }

            body #divTabOdemeSecenekleri .odemeSecenekItem b {
                color: #111 !important;
                font: 900 24px/1 "Manrope", "DM Sans", system-ui, sans-serif !important;
            }

            body #divTabOdemeSecenekleri .taksitMain,
            body #divTabOdemeSecenekleri #divTaksitContainer {
                grid-column: 1 / -1;
                width: 100% !important;
                margin-top: 10px !important;
            }

            body #divTabOdemeSecenekleri .taksitWrapper {
                display: grid !important;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 12px;
            }

            body #divTabOdemeSecenekleri .taksitBlock,
            body #divTabOdemeSecenekleri .taksitBlockContent {
                float: none !important;
                width: 100% !important;
                margin: 0 !important;
                border: 1px solid rgba(3, 35, 94, .12) !important;
                border-radius: 14px !important;
                background: #fff !important;
                overflow: hidden;
            }

            body #divTabOdemeSecenekleri .taksitLogo {
                max-width: 120px !important;
                max-height: 34px !important;
                object-fit: contain;
                margin: 14px !important;
                filter: grayscale(.15);
            }

            body #divTabOdemeSecenekleri table {
                width: 100% !important;
                border-collapse: collapse !important;
                color: #111 !important;
                font: 700 12px/1.35 "Manrope", "DM Sans", system-ui, sans-serif !important;
            }

            body #divTabOdemeSecenekleri td {
                padding: 10px 12px !important;
                border-top: 1px solid rgba(3, 35, 94, .08) !important;
            }

            @media (max-width: 991px) {
                body #divSatinAl.buybutton,
                #divSatinAl.buybutton {
                    grid-template-columns: 1fr !important;
                    gap: 10px;
                    padding: 12px !important;
                    border-radius: 14px;
                }

                body #divSatinAl.buybutton .BasketBtn {
                    display: contents !important;
                }

                body #divSatinAl.buybutton #divBasketInputTextBox,
                body #divSatinAl.buybutton .basketBtn,
                body #divSatinAl.buybutton .buyfast {
                    grid-column: 1 !important;
                }

                body #divSatinAl.buybutton #divBasketInputTextBox { grid-row: 1 !important; }
                body #divSatinAl.buybutton .basketBtn { grid-row: 2 !important; }
                body #divSatinAl.buybutton .buyfast { grid-row: 3 !important; }

                body #divSatinAl.buybutton .basketBtn,
                body #divSatinAl.buybutton .buyfast {
                    height: 54px !important;
                }

                #divSatinAl.buybutton .Addtobasket,
                #divSatinAl.buybutton .buyfastbutton,
                #divSatinAl.buybutton #btnHemenAl,
                #divSatinAl.buybutton #kendinTasarlaClickButtonId,
                #divSatinAl.buybutton #divBasketInputTextBox,
                #divSatinAl.buybutton .Basketinp,
                #divSatinAl.buybutton .riSingle,
                #divSatinAl.buybutton .RadInput {
                    height: 54px !important;
                }

                .ProductIcon.hidden-phone {
                    display: grid !important;
                }

                .ProductIcon .hidden-phone,
                .ProductIcon2 .hidden-phone {
                    display: flex !important;
                }

                .ProductIcon {
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                }

                .ProductIcon a,
                .ProductIcon2 a.button {
                    min-height: 46px !important;
                    padding: 0 10px !important;
                }

                body #divTabOdemeSecenekleri .urunTabAlt {
                    grid-template-columns: 1fr;
                }

                body .fancybox-wrap {
                    top: 32px !important;
                    width: calc(100vw - 28px) !important;
                }
            }

            @media (max-width: 540px) {
                #divSatinAl.buybutton {
                    margin-top: 18px !important;
                }

                body #pnlFiyatlar .spanFiyat,
                body .urunDetayFiyatContainer .spanFiyat {
                    font-size: 28px !important;
                }

                body #pnlFiyatlar .spanKdv,
                body .urunDetayFiyatContainer .spanKdv {
                    font-size: 12px !important;
                }

                #divSatinAl.buybutton .Addtobasket,
                #divSatinAl.buybutton .buyfastbutton,
                #divSatinAl.buybutton #btnHemenAl,
                #divSatinAl.buybutton #kendinTasarlaClickButtonId {
                    padding: 0 12px !important;
                    font-size: 12px !important;
                }

                #divSatinAl.buybutton .qtyPlus,
                #divSatinAl.buybutton .qtyMinus,
                #divSatinAl.buybutton .urunDetayAdetArttirma {
                    flex-basis: 30px !important;
                    width: 30px !important;
                    height: 30px !important;
                }

                .ProductIcon {
                    grid-template-columns: 1fr;
                    gap: 8px;
                }

                .ProductIcon2 {
                    display: grid !important;
                    grid-template-columns: 1fr 1fr;
                    gap: 8px;
                }

                .ProductIcon2 > div:not(.clear):not(#divSocialButtons) {
                    min-width: 0;
                }

                .ProductIcon .box1,
                .ProductIcon2 a.button span {
                    font-size: 11px !important;
                }

                body .urunTab ul {
                    display: grid !important;
                    grid-template-columns: 1fr 1fr;
                }

                body .urunTab li a {
                    width: 100%;
                    min-height: 42px;
                    padding: 0 10px !important;
                    border-radius: 12px !important;
                    border-bottom: 1px solid rgba(3, 35, 94, .12) !important;
                    font-size: 11px !important;
                }

                body .urunDetayPanel {
                    padding: 18px !important;
                    border-top: 1px solid rgba(3, 35, 94, .12) !important;
                    border-radius: 14px !important;
                }

                body .modal-content-html {
                    padding: 18px !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function trimButtonValues() {
        document.querySelectorAll('#divSatinAl .Addtobasket, #divSatinAl .buyfastbutton').forEach(function (button) {
            if (button.value) button.value = button.value.replace(/\s+/g, ' ').trim();
            button.classList.add('mo-has-icon');
        });
    }

    function improveQuantityLabels() {
        document.querySelectorAll('#divSatinAl .qtyPlus').forEach(function (button) {
            button.setAttribute('aria-label', 'Adedi artır');
            button.setAttribute('title', 'Adedi artır');
        });

        document.querySelectorAll('#divSatinAl .qtyMinus').forEach(function (button) {
            button.setAttribute('aria-label', 'Adedi azalt');
            button.setAttribute('title', 'Adedi azalt');
        });
    }

    function setTabTitles() {
        var titles = [
            ['liTabOzellikler', 'divTabOzellikler'],
            ['liTabYorumlar', 'divTabYorumlar'],
            ['liTabOdemeSecenekleri', 'divTabOdemeSecenekleri'],
            ['liTabUrunOnerileri', 'divTabUrunOnerileri']
        ];

        titles.forEach(function (pair) {
            var tab = document.getElementById(pair[0]);
            var panel = document.getElementById(pair[1]);
            var link = tab ? tab.querySelector('a') : null;
            if (!panel || !link) return;

            var title = link.textContent.replace(/\s+/g, ' ').trim();
            if (title) panel.setAttribute('data-mo-tab-title', title);
        });
    }

    function markModernModalState() {
        var fancybox = document.querySelector('.fancybox-wrap, .fancybox-overlay');
        var htmlModal = document.querySelector('.modal-content-html');
        document.body.classList.toggle('mo-product-modal-open', Boolean(fancybox || htmlModal));
    }

    function markReady() {
        var detailRoot = document.querySelector('.ProductIcon, #divSatinAl, .ProductIcon2');
        if (!detailRoot) return;
        document.body.setAttribute(READY_ATTR, 'true');
        trimButtonValues();
        improveQuantityLabels();
        setTabTitles();
        markModernModalState();
    }

    function init() {
        injectFonts();
        injectStyles();
        markReady();

        var timer;
        var observer = new MutationObserver(function () {
            clearTimeout(timer);
            timer = setTimeout(markReady, 80);
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());

(function () {
    'use strict';

    var STYLE_ID = 'moProductDetailFreshLayerStyles';
    var PROOF_ID = 'moProductSocialProof';

    function injectFreshStyles() {
        if (document.getElementById(STYLE_ID)) return;

        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            body {
                --mo-fresh-deep: #03235e;
                --mo-fresh-petrol: #0c4853;
                --mo-fresh-cyan: #4fa0c9;
                --mo-fresh-ink: #111111;
                --mo-fresh-muted: #687386;
                --mo-fresh-line: rgba(3, 35, 94, .14);
                --mo-fresh-soft: #f4fbfd;
            }

            body #pnlFiyatlar,
            body #divFiyatAlanlari {
                width: 100% !important;
                max-width: none !important;
                margin: 14px 0 18px !important;
            }

            body #pnlFiyatlar .Formline,
            body #divFiyatAlanlari .Formline {
                margin-bottom: 8px !important;
            }

            body #pnlFiyatlar .spanFiyat,
            body #divFiyatAlanlari .spanFiyat,
            body .urunDetayFiyatContainer .spanFiyat,
            body #fiyat2 .spanFiyat {
                color: var(--mo-fresh-ink) !important;
                -webkit-text-fill-color: var(--mo-fresh-ink) !important;
                font-family: "Manrope", "DM Sans", system-ui, sans-serif !important;
                font-size: clamp(38px, 3.8vw, 54px) !important;
                font-weight: 500 !important;
                line-height: .98 !important;
                letter-spacing: -.055em !important;
            }

            body #pnlFiyatlar .spanKdv,
            body #divFiyatAlanlari .spanKdv,
            body .urunDetayFiyatContainer .spanKdv {
                color: #4c5564 !important;
                font: 700 13px/1 "Manrope", "DM Sans", system-ui, sans-serif !important;
                letter-spacing: -.01em;
            }

            #moProductSocialProof {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 10px;
                width: 100%;
                margin: 10px 0 20px;
                font-family: "Manrope", "DM Sans", system-ui, sans-serif;
            }

            #moProductSocialProof .mo-proof-card {
                display: grid;
                grid-template-columns: 38px 1fr;
                gap: 10px;
                align-items: center;
                min-height: 68px;
                padding: 12px;
                border: 1px solid rgba(3, 35, 94, .1);
                border-radius: 16px;
                background:
                    radial-gradient(circle at 92% 8%, rgba(79, 160, 201, .18), transparent 32%),
                    linear-gradient(135deg, #fff, #f7fcfd);
                box-shadow: 0 12px 28px rgba(3, 35, 94, .055);
            }

            #moProductSocialProof .mo-proof-icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 38px;
                height: 38px;
                color: var(--mo-fresh-deep);
                border-radius: 13px;
                background: rgba(79, 160, 201, .13);
            }

            #moProductSocialProof .mo-proof-icon svg {
                width: 20px;
                height: 20px;
            }

            #moProductSocialProof strong {
                display: block;
                color: var(--mo-fresh-deep);
                font-size: 13px;
                font-weight: 900;
                line-height: 1.2;
                letter-spacing: -.02em;
            }

            #moProductSocialProof span {
                display: block;
                margin-top: 3px;
                color: var(--mo-fresh-muted);
                font-size: 11px;
                font-weight: 700;
                line-height: 1.2;
            }

            body #divSatinAl.buybutton {
                grid-template-columns: 118px minmax(0, 1fr) minmax(160px, .55fr) !important;
                gap: 12px !important;
                margin: 18px 0 18px !important;
                padding: 14px !important;
                border: 1px solid rgba(3, 35, 94, .12) !important;
                border-radius: 22px !important;
                background:
                    linear-gradient(135deg, rgba(79, 160, 201, .12), rgba(255,255,255,.96) 42%, rgba(12,72,83,.08)) !important;
                box-shadow: 0 18px 42px rgba(3, 35, 94, .075) !important;
            }

            body #divSatinAl.buybutton #divBasketInputTextBox,
            body #divSatinAl.buybutton .basketBtn,
            body #divSatinAl.buybutton .buyfast {
                height: 56px !important;
            }

            body #divSatinAl.buybutton .basketBtn input.Addtobasket.button,
            body #divSatinAl.buybutton input.Addtobasket.button,
            body #divSatinAl.buybutton a.Addtobasket.button,
            body #divSatinAl.buybutton #kendinTasarlaClickButtonId {
                height: 56px !important;
                min-height: 56px !important;
                color: #fff !important;
                -webkit-text-fill-color: #fff !important;
                font: 850 13px/56px "Manrope", "DM Sans", system-ui, sans-serif !important;
                border: 1px solid var(--mo-fresh-petrol) !important;
                border-radius: 15px !important;
                background: linear-gradient(135deg, var(--mo-fresh-petrol), var(--mo-fresh-deep)) !important;
                box-shadow: 0 16px 34px rgba(3, 35, 94, .22) !important;
            }

            body #divSatinAl.buybutton .buyfast input.buyfastbutton.button,
            body #divSatinAl.buybutton input#btnHemenAl {
                height: 56px !important;
                min-height: 56px !important;
                color: var(--mo-fresh-deep) !important;
                -webkit-text-fill-color: var(--mo-fresh-deep) !important;
                font: 850 13px/56px "Manrope", "DM Sans", system-ui, sans-serif !important;
                border: 1px solid rgba(3, 35, 94, .18) !important;
                border-radius: 15px !important;
                background: #fff !important;
                box-shadow: 0 12px 28px rgba(3, 35, 94, .08) !important;
            }

            body .ProductIcon,
            body .ProductIcon.hidden-phone {
                display: grid !important;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 10px !important;
                margin: 18px 0 10px !important;
            }

            body .ProductIcon2 {
                display: grid !important;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 10px !important;
                margin: 10px 0 22px !important;
            }

            body .ProductIcon > div,
            body .ProductIcon2 > div:not(.clear):not(#divSocialButtons) {
                display: block !important;
                float: none !important;
                width: auto !important;
                min-width: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
            }

            body .ProductIcon a,
            body .ProductIcon a.tipL,
            body .ProductIcon2 a.button,
            body .ProductIcon2 .TavsiyeEtBtn.button,
            body .ProductIcon2 .YorumYazbtnContent a,
            body .ProductIcon2 .YorumYazbtnContent span {
                position: relative;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                width: 100% !important;
                min-height: 48px !important;
                padding: 0 13px !important;
                overflow: hidden;
                color: var(--mo-fresh-deep) !important;
                text-decoration: none !important;
                border: 1px solid rgba(3, 35, 94, .12) !important;
                border-radius: 15px !important;
                background: rgba(255,255,255,.96) !important;
                box-shadow: 0 10px 24px rgba(3, 35, 94, .055) !important;
                transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease, background .18s ease;
            }

            body .ProductIcon a::after,
            body .ProductIcon2 a.button::after,
            body .ProductIcon2 .YorumYazbtnContent span::after {
                content: "";
                position: absolute;
                inset: auto 14px 9px 14px;
                height: 2px;
                border-radius: 99px;
                background: linear-gradient(90deg, transparent, rgba(79, 160, 201, .65), transparent);
                opacity: 0;
                transform: translateY(4px);
                transition: opacity .18s ease, transform .18s ease;
            }

            body .ProductIcon a:hover,
            body .ProductIcon2 a.button:hover,
            body .ProductIcon2 .YorumYazbtnContent span:hover {
                transform: translateY(-1px);
                border-color: rgba(79, 160, 201, .5) !important;
                background: linear-gradient(135deg, #fff, var(--mo-fresh-soft)) !important;
                box-shadow: 0 16px 30px rgba(3, 35, 94, .1) !important;
            }

            body .ProductIcon a:hover::after,
            body .ProductIcon2 a.button:hover::after,
            body .ProductIcon2 .YorumYazbtnContent span:hover::after {
                opacity: 1;
                transform: translateY(0);
            }

            body .ProductIcon .box1,
            body .ProductIcon2 a.button span,
            body .ProductIcon2 .YorumYazbtnContent span {
                color: inherit !important;
                font: 800 12px/1.25 "Manrope", "DM Sans", system-ui, sans-serif !important;
                letter-spacing: -.01em;
                text-align: center;
                white-space: normal !important;
                background: transparent !important;
                border: 0 !important;
            }

            body .ProductIcon i,
            body .ProductIcon2 i {
                color: var(--mo-fresh-petrol) !important;
                background: rgba(79, 160, 201, .13) !important;
            }

            body .urunTab {
                margin-top: 34px !important;
                border: 0 !important;
            }

            body .urunTab ul {
                display: flex !important;
                flex-wrap: nowrap !important;
                gap: 10px !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 8px !important;
                overflow-x: auto;
                border: 1px solid rgba(3, 35, 94, .1) !important;
                border-radius: 18px !important;
                background: linear-gradient(135deg, #f7fcfd, #fff) !important;
                box-shadow: inset 0 0 0 1px rgba(255,255,255,.8);
                scrollbar-width: thin;
            }

            body .urunTab li {
                flex: 0 0 auto;
            }

            body .urunTab li a {
                min-height: 44px !important;
                padding: 0 18px !important;
                color: #445166 !important;
                border: 1px solid transparent !important;
                border-radius: 13px !important;
                background: transparent !important;
                font: 850 12px/1 "Manrope", "DM Sans", system-ui, sans-serif !important;
                letter-spacing: .03em !important;
                text-transform: uppercase;
            }

            body .urunTab li.active a {
                color: #fff !important;
                border-color: var(--mo-fresh-petrol) !important;
                background: linear-gradient(135deg, var(--mo-fresh-petrol), var(--mo-fresh-deep)) !important;
                box-shadow: 0 12px 26px rgba(3, 35, 94, .18) !important;
            }

            body .urunDetayPanel {
                margin-top: 12px !important;
                border: 1px solid rgba(3, 35, 94, .1) !important;
                border-radius: 20px !important;
                background: #fff !important;
            }

            body #divTabOdemeSecenekleri #divTaksitContainer.mo-installments-ready {
                grid-column: 1 / -1;
                width: 100% !important;
                margin: 18px 0 0 !important;
                padding: 18px !important;
                border: 1px solid rgba(3, 35, 94, .1) !important;
                border-radius: 22px !important;
                background:
                    radial-gradient(circle at 92% 12%, rgba(79, 160, 201, .16), transparent 30%),
                    linear-gradient(135deg, #f8fcfd, #fff 58%, rgba(12, 72, 83, .045)) !important;
                box-shadow: inset 0 0 0 1px rgba(255,255,255,.88), 0 18px 42px rgba(3, 35, 94, .06);
                font-family: "Manrope", "DM Sans", system-ui, sans-serif !important;
            }

            body #divTaksitContainer .mo-installment-head {
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                gap: 14px;
                margin: 0 0 16px;
                padding-bottom: 14px;
                border-bottom: 1px solid rgba(3, 35, 94, .1);
            }

            body #divTaksitContainer .mo-installment-kicker {
                display: block;
                margin-bottom: 5px;
                color: var(--mo-fresh-petrol);
                font-size: 10px;
                font-weight: 900;
                line-height: 1;
                letter-spacing: .16em;
                text-transform: uppercase;
            }

            body #divTaksitContainer .mo-installment-title {
                display: block;
                color: var(--mo-fresh-deep);
                font-size: 22px;
                font-weight: 900;
                line-height: 1.08;
                letter-spacing: -.04em;
            }

            body #divTaksitContainer .mo-installment-note {
                max-width: 310px;
                margin: 0;
                color: var(--mo-fresh-muted);
                font-size: 12px;
                font-weight: 700;
                line-height: 1.45;
                text-align: right;
            }

            body #divTaksitContainer.mo-installments-ready .taksitMain,
            body #divTaksitContainer.mo-installments-ready .taksitWrapper {
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                float: none !important;
            }

            body #divTaksitContainer.mo-installments-ready .taksitWrapper {
                display: grid !important;
                grid-template-columns: repeat(auto-fit, minmax(286px, 1fr)) !important;
                gap: 12px !important;
            }

            body #divTaksitContainer.mo-installments-ready .taksitBlock {
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                float: none !important;
                border: 0 !important;
                background: transparent !important;
            }

            body #divTaksitContainer.mo-installments-ready .taksitBlockContent {
                position: relative;
                display: grid !important;
                grid-template-columns: 128px minmax(0, 1fr);
                grid-template-areas:
                    "logo bank"
                    "table table";
                align-items: start;
                gap: 12px;
                width: 100% !important;
                min-height: 0;
                height: auto !important;
                max-height: none !important;
                margin: 0 !important;
                padding: 14px !important;
                overflow: visible !important;
                border: 1px solid rgba(3, 35, 94, .12) !important;
                border-radius: 18px !important;
                background: rgba(255, 255, 255, .96) !important;
                box-shadow: 0 12px 28px rgba(3, 35, 94, .055) !important;
                transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
            }

            body #divTaksitContainer.mo-installments-ready .taksitBlockContent:hover {
                transform: translateY(-2px);
                border-color: rgba(79, 160, 201, .44) !important;
                box-shadow: 0 18px 36px rgba(3, 35, 94, .1) !important;
            }

            body #divTaksitContainer.mo-installments-ready .taksitBlockContent::after {
                display: none !important;
                content: none !important;
            }

            body #divTaksitContainer.mo-installments-ready .mo-bank-name {
                grid-area: bank;
                display: flex;
                align-items: center;
                min-width: 0;
                min-height: 52px;
                margin: 0 !important;
                padding: 0 !important;
                color: var(--mo-fresh-deep);
                font-size: 17px;
                font-weight: 900;
                line-height: 1.15;
                letter-spacing: -.03em;
            }

            body #divTaksitContainer.mo-installments-ready .taksitLogo {
                display: flex !important;
                grid-area: logo;
                width: 100% !important;
                max-width: 128px !important;
                height: 52px !important;
                max-height: 52px !important;
                margin: 0 !important;
                padding: 9px 10px !important;
                object-fit: contain;
                border: 1px solid rgba(3, 35, 94, .08);
                border-radius: 13px;
                background: #fff;
                filter: grayscale(.18) contrast(1.02);
            }

            body #divTaksitContainer.mo-installments-ready table {
                display: block !important;
                grid-area: table;
                width: 100% !important;
                height: auto !important;
                max-height: none !important;
                margin: 4px 0 0 !important;
                overflow: visible !important;
                border-collapse: separate !important;
                border-spacing: 0 !important;
                color: var(--mo-fresh-deep) !important;
                font-family: "Manrope", "DM Sans", system-ui, sans-serif !important;
            }

            body #divTaksitContainer.mo-installments-ready thead {
                display: none !important;
            }

            body #divTaksitContainer.mo-installments-ready tbody {
                display: grid !important;
                gap: 8px;
                width: 100% !important;
                height: auto !important;
                max-height: none !important;
                overflow: visible !important;
            }

            body #divTaksitContainer.mo-installments-ready tr {
                display: grid !important;
                grid-template-columns: .8fr 1fr 1fr;
                gap: 8px;
                align-items: stretch;
                width: 100% !important;
                min-height: 70px;
                height: auto !important;
                max-height: none !important;
                margin: 0 !important;
                padding: 8px;
                overflow: visible !important;
                border: 1px solid rgba(3, 35, 94, .08);
                border-radius: 14px;
                background: linear-gradient(135deg, #fff, #f7fcfd);
            }

            body #divTaksitContainer.mo-installments-ready td {
                display: flex !important;
                flex-direction: column;
                justify-content: center;
                min-height: 54px;
                height: auto !important;
                max-height: none !important;
                margin: 0 !important;
                padding: 7px 9px !important;
                overflow: visible !important;
                border: 0 !important;
                border-radius: 10px;
                background: rgba(255,255,255,.74);
                color: var(--mo-fresh-deep) !important;
                font-size: 13px !important;
                font-weight: 900 !important;
                line-height: 1.22 !important;
                text-align: left !important;
                white-space: normal;
                word-break: keep-all;
            }

            body #divTaksitContainer.mo-installments-ready td::before {
                content: attr(data-mo-label);
                display: block;
                margin-bottom: 5px;
                color: #7b8596;
                font-size: 9px;
                font-weight: 900;
                line-height: 1;
                letter-spacing: .08em;
                text-transform: uppercase;
            }

            body #divTaksitContainer.mo-installments-ready .taksitAdet {
                color: var(--mo-fresh-petrol) !important;
            }

            body #divTaksitContainer.mo-installments-ready .taksitTutar,
            body #divTaksitContainer.mo-installments-ready .TaksitToplamTutar {
                text-align: right !important;
            }

            @media (max-width: 991px) {
                #moProductSocialProof {
                    grid-template-columns: 1fr;
                }

                body #divSatinAl.buybutton {
                    grid-template-columns: 1fr !important;
                    border-radius: 18px !important;
                }

                body #divSatinAl.buybutton .BasketBtn {
                    display: grid !important;
                    grid-template-columns: 112px 1fr !important;
                    gap: 10px !important;
                }

                body #divSatinAl.buybutton #divBasketInputTextBox,
                body #divSatinAl.buybutton .basketBtn,
                body #divSatinAl.buybutton .buyfast {
                    grid-column: auto !important;
                    grid-row: auto !important;
                }

                body .ProductIcon,
                body .ProductIcon.hidden-phone,
                body .ProductIcon2 {
                    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                }
            }

            @media (max-width: 560px) {
                body #pnlFiyatlar .spanFiyat,
                body #divFiyatAlanlari .spanFiyat,
                body .urunDetayFiyatContainer .spanFiyat,
                body #fiyat2 .spanFiyat {
                    font-size: 34px !important;
                }

                body #divSatinAl.buybutton .BasketBtn,
                body .ProductIcon,
                body .ProductIcon.hidden-phone,
                body .ProductIcon2 {
                    grid-template-columns: 1fr !important;
                }

                body .urunTab ul {
                    display: grid !important;
                    grid-template-columns: 1fr 1fr;
                    overflow: visible;
                }

                body .urunTab li a {
                    width: 100%;
                    min-height: 42px !important;
                    padding: 0 10px !important;
                    font-size: 10px !important;
                }

                body #divTaksitContainer .mo-installment-head {
                    display: grid;
                    gap: 8px;
                }

                body #divTaksitContainer .mo-installment-note {
                    max-width: none;
                    text-align: left;
                }

                body #divTaksitContainer.mo-installments-ready {
                    padding: 14px !important;
                    border-radius: 18px !important;
                }

                body #divTaksitContainer.mo-installments-ready .taksitWrapper {
                    grid-template-columns: 1fr !important;
                }

                body #divTaksitContainer.mo-installments-ready .taksitBlockContent {
                    grid-template-columns: 96px minmax(0, 1fr);
                    grid-template-areas:
                        "logo bank"
                        "table table";
                    min-height: 0;
                    height: auto !important;
                    max-height: none !important;
                    padding: 12px !important;
                    overflow: visible !important;
                    border-radius: 16px !important;
                }

                body #divTaksitContainer.mo-installments-ready .taksitLogo {
                    max-width: 96px !important;
                    height: 46px !important;
                }

                body #divTaksitContainer.mo-installments-ready .mo-bank-name {
                    min-height: 46px;
                    font-size: 15px;
                }

                body #divTaksitContainer.mo-installments-ready tr {
                    grid-template-columns: 1fr;
                    min-height: 0;
                }

                body #divTaksitContainer.mo-installments-ready .taksitTutar,
                body #divTaksitContainer.mo-installments-ready .TaksitToplamTutar {
                    text-align: left !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function icon(name) {
        var icons = {
            cart: '<svg viewBox="0 0 24 24" fill="none"><path d="M6.5 7.5h14l-1.6 8.2a2.2 2.2 0 0 1-2.1 1.8H9.5a2.2 2.2 0 0 1-2.2-1.9L6 4.5H3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 21h.01M17 21h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
            heart: '<svg viewBox="0 0 24 24" fill="none"><path d="M20.5 8.4c0 5.5-8.5 10.1-8.5 10.1S3.5 13.9 3.5 8.4A4.4 4.4 0 0 1 12 6.7a4.4 4.4 0 0 1 8.5 1.7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
            eye: '<svg viewBox="0 0 24 24" fill="none"><path d="M2.8 12s3.2-6 9.2-6 9.2 6 9.2 6-3.2 6-9.2 6-9.2-6-9.2-6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 14.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z" stroke="currentColor" stroke-width="2"/></svg>'
        };
        return icons[name] || icons.cart;
    }

    function setButtonLabels() {
        var add = document.querySelector('#divSatinAl .Addtobasket');
        var fast = document.querySelector('#divSatinAl #btnHemenAl, #divSatinAl .buyfastbutton');

        if (add && add.value !== undefined) add.value = 'Sepete Ekle';
        if (fast && fast.value !== undefined) fast.value = 'Hemen Al';

        [
            ['liTabOzellikler', 'Ürün Özellikleri'],
            ['liTabYorumlar', 'Yorumlar'],
            ['liTabOdemeSecenekleri', 'Ödeme Seçenekleri'],
            ['liTabUrunOnerileri', 'Ürün Önerileri']
        ].forEach(function (item) {
            var node = document.getElementById(item[0]);
            var link = node ? node.querySelector('a') : null;
            if (link && !link.textContent.replace(/\s+/g, ' ').trim()) link.textContent = item[1];
        });
    }

    function mountSocialProof() {
        if (document.getElementById(PROOF_ID)) return;

        var target = document.getElementById('pnlFiyatlar') || document.getElementById('divFiyatAlanlari');
        if (!target || !target.parentNode) return;

        var proof = document.createElement('div');
        proof.id = PROOF_ID;
        proof.setAttribute('aria-label', 'Ürün popülerlik bilgileri');
        proof.innerHTML = [
            '<div class="mo-proof-card"><span class="mo-proof-icon">' + icon('cart') + '</span><span><strong>8 kişinin sepetinde</strong><span>Son 24 saatte</span></span></div>',
            '<div class="mo-proof-card"><span class="mo-proof-icon">' + icon('heart') + '</span><span><strong>15 kişi favorilerine ekledi</strong><span>Bu ürünü beğendi</span></span></div>',
            '<div class="mo-proof-card"><span class="mo-proof-icon">' + icon('eye') + '</span><span><strong>Şu an 12 kişi inceliyor</strong><span>Popüler ürün</span></span></div>'
        ].join('');

        target.parentNode.insertBefore(proof, target.nextSibling);
    }

    function normalizeBankName(src) {
        var fileName = (src || '').split('/').pop().split('?')[0].replace(/\.[a-z0-9]+$/i, '').toUpperCase();
        var banks = {
            ZIRAAT: 'Ziraat Bankası',
            HALKBANK: 'Halkbank',
            ALBARAKATURK: 'Albaraka Türk',
            VAKIFBANK: 'VakıfBank',
            TEB: 'TEB',
            YKB: 'Yapı Kredi',
            ANADOLUBANK: 'Anadolubank',
            DENIZBANK: 'DenizBank',
            ISBANK: 'İş Bankası',
            GARANTI: 'Garanti BBVA',
            AKBANK: 'Akbank',
            FINANSBANK: 'QNB Finansbank',
            KUVEYTTURK: 'Kuveyt Türk',
            HSBC: 'HSBC',
            ING: 'ING',
            AXESS: 'Axess',
            BONUS: 'Bonus',
            MAXIMUM: 'Maximum',
            WORLD: 'World'
        };

        return banks[fileName] || fileName.replace(/[-_]+/g, ' ').replace(/\b\w/g, function (letter) {
            return letter.toUpperCase();
        }) || 'Banka';
    }

    function modernizeInstallments() {
        var container = document.getElementById('divTaksitContainer');
        if (!container) return;

        container.classList.add('mo-installments-ready');

        if (!container.querySelector('.mo-installment-head')) {
            var head = document.createElement('div');
            head.className = 'mo-installment-head';
            head.innerHTML = [
                '<div>',
                    '<span class="mo-installment-kicker">Banka seçenekleri</span>',
                    '<strong class="mo-installment-title">Kredi kartı taksit bilgileri</strong>',
                '</div>',
                '<p class="mo-installment-note">Kartlara göre geçerli tek çekim ve taksit tutarlarını karşılaştırabilirsiniz.</p>'
            ].join('');
            container.insertBefore(head, container.firstChild);
        }

        container.querySelectorAll('.taksitBlock').forEach(function (block) {
            var content = block.querySelector('.taksitBlockContent');
            var img = block.querySelector('.taksitLogo');
            var table = block.querySelector('table');
            if (!content) return;

            var bankName = normalizeBankName(img ? img.getAttribute('src') : '');
            content.setAttribute('data-mo-bank-title', bankName);

            if (img) {
                img.setAttribute('alt', bankName + ' taksit seçenekleri');
                img.setAttribute('title', bankName);
            }

            var bankTitle = content.querySelector('.mo-bank-name');
            if (!bankTitle) {
                bankTitle = document.createElement('strong');
                bankTitle.className = 'mo-bank-name';
                if (table) content.insertBefore(bankTitle, table);
                else content.appendChild(bankTitle);
            }
            bankTitle.textContent = bankName;

            block.querySelectorAll('tbody tr').forEach(function (row) {
                var cells = row.querySelectorAll('td');
                if (cells[0]) {
                    var installmentText = cells[0].textContent.replace(/\s+/g, ' ').trim();
                    cells[0].setAttribute('data-mo-label', 'Taksit');
                    if (installmentText === '1') cells[0].textContent = 'Tek Çekim';
                    else if (/^\\d+$/.test(installmentText)) cells[0].textContent = installmentText + ' Taksit';
                }
                if (cells[1]) cells[1].setAttribute('data-mo-label', 'Taksit Tutarı');
                if (cells[2]) cells[2].setAttribute('data-mo-label', 'Toplam Tutar');
            });
        });
    }

    function initFreshLayer() {
        injectFreshStyles();
        setButtonLabels();
        mountSocialProof();
        modernizeInstallments();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFreshLayer);
    } else {
        initFreshLayer();
    }

    var timer;
    new MutationObserver(function () {
        clearTimeout(timer);
        timer = setTimeout(initFreshLayer, 120);
    }).observe(document.documentElement, { childList: true, subtree: true });
}());
