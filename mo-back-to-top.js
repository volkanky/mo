(function () {
    'use strict';

    var BUTTON_ID = 'back-to-top';
    var STYLE_ID = 'moBackToTopStyles';
    var READY_CLASS = 'mo-back-to-top-ready';
    var VISIBLE_CLASS = 'mo-back-to-top-visible';
    var SHOW_AFTER = 420;

    function addStyles() {
        if (document.getElementById(STYLE_ID)) return;

        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            #${BUTTON_ID},
            #${BUTTON_ID} * {
                box-sizing: border-box;
            }

            #${BUTTON_ID}.${READY_CLASS} {
                position: fixed !important;
                z-index: 2147481900 !important;
                right: max(20px, env(safe-area-inset-right, 0px)) !important;
                bottom: calc(88px + env(safe-area-inset-bottom, 0px)) !important;
                display: block !important;
                width: 50px !important;
                height: 50px !important;
                margin: 0 !important;
                padding: 0 !important;
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                transform: translateY(12px);
                transition: opacity .22s ease, visibility .22s ease, transform .22s ease;
            }

            #${BUTTON_ID}.${READY_CLASS}.${VISIBLE_CLASS} {
                opacity: 1;
                visibility: visible;
                pointer-events: auto;
                transform: translateY(0);
            }

            #${BUTTON_ID}.${READY_CLASS} > a {
                position: relative;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                width: 50px !important;
                height: 50px !important;
                min-width: 50px !important;
                min-height: 50px !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden;
                color: #03235e !important;
                border: 1px solid rgba(3, 35, 94, .13) !important;
                border-radius: 16px !important;
                outline: 0;
                background:
                    radial-gradient(circle at 30% 20%, rgba(255,255,255,.95), rgba(255,255,255,0) 42%),
                    linear-gradient(145deg, #f4fbfd 0%, #dceff5 100%) !important;
                box-shadow: 0 12px 30px rgba(3, 35, 94, .14), inset 0 1px 0 rgba(255,255,255,.9) !important;
                text-decoration: none !important;
                -webkit-tap-highlight-color: transparent;
                transition: color .2s ease, border-color .2s ease, box-shadow .2s ease, transform .2s ease, background .2s ease;
            }

            #${BUTTON_ID}.${READY_CLASS} > a::before,
            #${BUTTON_ID}.${READY_CLASS} > a::after {
                content: '';
                position: absolute;
                pointer-events: none;
            }

            #${BUTTON_ID}.${READY_CLASS} > a::before {
                width: 12px;
                height: 12px;
                margin-top: 5px;
                border-top: 2px solid currentColor;
                border-left: 2px solid currentColor;
                transform: rotate(45deg);
            }

            #${BUTTON_ID}.${READY_CLASS} > a::after {
                top: 15px;
                width: 18px;
                height: 2px;
                border-radius: 2px;
                background: currentColor;
                opacity: .7;
            }

            #${BUTTON_ID}.${READY_CLASS} i {
                display: none !important;
            }

            #${BUTTON_ID}.${READY_CLASS} > a:hover {
                color: #0c4853 !important;
                border-color: rgba(79, 160, 201, .55) !important;
                background: linear-gradient(145deg, #ffffff 0%, #d4edf4 100%) !important;
                box-shadow: 0 16px 34px rgba(3, 35, 94, .18), inset 0 1px 0 #fff !important;
                transform: translateY(-3px);
            }

            #${BUTTON_ID}.${READY_CLASS} > a:active {
                transform: translateY(-1px) scale(.97);
            }

            #${BUTTON_ID}.${READY_CLASS} > a:focus-visible {
                outline: 3px solid rgba(79, 160, 201, .34) !important;
                outline-offset: 3px;
            }

            @media (max-width: 768px) {
                #${BUTTON_ID}.${READY_CLASS} {
                    right: max(13px, env(safe-area-inset-right, 0px)) !important;
                    bottom: calc(76px + env(safe-area-inset-bottom, 0px)) !important;
                    width: 46px !important;
                    height: 46px !important;
                }

                #${BUTTON_ID}.${READY_CLASS} > a {
                    width: 46px !important;
                    height: 46px !important;
                    min-width: 46px !important;
                    min-height: 46px !important;
                    border-radius: 15px !important;
                }

                #${BUTTON_ID}.${READY_CLASS} > a::after {
                    top: 13px;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                #${BUTTON_ID}.${READY_CLASS},
                #${BUTTON_ID}.${READY_CLASS} > a {
                    transition: none !important;
                }
            }

            @media print {
                #${BUTTON_ID}.${READY_CLASS} {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function getButton() {
        var button = document.getElementById(BUTTON_ID);

        if (!button) {
            button = document.createElement('div');
            button.id = BUTTON_ID;
            button.innerHTML = '<a href="#"><i class="fa fa-chevron-circle-up" aria-hidden="true"></i></a>';
            document.body.appendChild(button);
        }

        var link = button.querySelector('a');
        if (!link) {
            link = document.createElement('a');
            link.href = '#';
            link.innerHTML = '<i class="fa fa-chevron-circle-up" aria-hidden="true"></i>';
            button.appendChild(link);
        }

        button.classList.add(READY_CLASS);
        link.setAttribute('aria-label', 'Sayfanın başına dön');
        link.setAttribute('title', 'Yukarı çık');

        return { button: button, link: link };
    }

    function setVisibility(button, link) {
        var visible = window.scrollY > SHOW_AFTER;
        button.classList.toggle(VISIBLE_CLASS, visible);
        button.setAttribute('aria-hidden', visible ? 'false' : 'true');
        link.tabIndex = visible ? 0 : -1;
    }

    function init() {
        addStyles();

        var elements = getButton();
        var button = elements.button;
        var link = elements.link;
        var ticking = false;

        link.addEventListener('click', function (event) {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
            });
        });

        setVisibility(button, link);

        window.addEventListener('scroll', function () {
            if (ticking) return;
            ticking = true;

            window.requestAnimationFrame(function () {
                setVisibility(button, link);
                ticking = false;
            });
        }, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
}());
