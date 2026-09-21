(function () {
    'use strict';

    var SHELL_ID = 'moRegisterShell';
    var STYLE_ID = 'moRegisterStyles';

    function setup() {
        if (document.getElementById(SHELL_ID)) return true;
        var source = document.getElementById('newUyeOlSection');
        var content = document.getElementById('divIcerik');
        if (!source || !content) return false;

        if (!document.querySelector('link[data-mo-account-fonts]')) {
            var font = document.createElement('link');
            font.rel = 'stylesheet';
            font.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700&display=swap';
            font.setAttribute('data-mo-account-fonts', 'true');
            document.head.appendChild(font);
        }
        if (!document.getElementById(STYLE_ID)) {
            var style = document.createElement('style');
            style.id = STYLE_ID;
            style.textContent = `
                body #divIcerik.ticiContainer{width:100%!important;max-width:none!important;padding:0!important}
                #${SHELL_ID},#${SHELL_ID} *{box-sizing:border-box}
                #${SHELL_ID}{--mo-ink:#102338;--mo-navy:#03235e;--mo-teal:#0c4853;--mo-cyan:#4fa0c9;--mo-muted:#647789;position:relative;isolation:isolate;width:100%;padding:64px 22px;overflow:hidden;color:var(--mo-ink);font-family:'DM Sans',sans-serif;background:radial-gradient(circle at 88% 9%,rgba(79,160,201,.18) 0 1px,transparent 1.6px) 0 0/19px 19px,#f3f8fa}
                #${SHELL_ID}::before{content:'';position:absolute;z-index:-1;width:560px;height:560px;right:-270px;top:-275px;border:1px solid rgba(12,72,83,.18);border-radius:50%;box-shadow:0 0 0 80px rgba(79,160,201,.06),0 0 0 160px rgba(3,35,94,.035)}
                .mo-register-card{width:min(1150px,100%);display:grid;grid-template-columns:minmax(370px,.86fr) minmax(0,1.14fr);margin:0 auto;overflow:hidden;border:1px solid rgba(3,35,94,.13);border-radius:28px;background:#fff;box-shadow:0 28px 80px rgba(3,35,94,.16);animation:moRegisterIn .65s cubic-bezier(.2,.7,.2,1) both}
                .mo-register-visual{position:relative;min-height:740px;overflow:hidden;padding:52px;color:#fff;background:linear-gradient(145deg,var(--mo-navy),var(--mo-teal))}.mo-register-visual:after{content:'';position:absolute;inset:0;opacity:.16;background-image:radial-gradient(rgba(255,255,255,.7) 1px,transparent 1px);background-size:22px 22px}
                .mo-register-kicker,.mo-register-copy{position:relative;z-index:1}.mo-register-kicker{display:flex;align-items:center;gap:12px;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}.mo-register-kicker:before{content:'';width:32px;height:1px;background:currentColor}.mo-register-art{position:absolute;z-index:1;width:min(500px,115%);right:-88px;top:55px;color:#c9f2f6;opacity:.8}.mo-register-copy{position:absolute;left:52px;right:42px;bottom:48px}.mo-register-copy h2{max-width:400px;margin:0 0 16px;color:#fff;font-family:'Manrope',sans-serif;font-size:clamp(35px,4vw,56px);font-weight:600;line-height:1.02;letter-spacing:-.06em}.mo-register-copy p{max-width:350px;margin:0;color:rgba(255,255,255,.7);font-size:13px;line-height:1.7}
                .mo-register-panel{display:flex;flex-direction:column;padding:56px clamp(34px,5vw,70px) 62px;background:#fff}.mo-register-kicker2{display:block;margin-bottom:14px;color:var(--mo-teal);font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.mo-register-panel h1{margin:0;color:var(--mo-navy);font-family:'Manrope',sans-serif;font-size:clamp(35px,3.2vw,48px);font-weight:700;line-height:1.05;letter-spacing:-.055em}.mo-register-intro{margin:13px 0 27px;color:var(--mo-muted);font-size:13px;line-height:1.65}
                #${SHELL_ID} #newUyeOlSection,#${SHELL_ID} .newUyeOlContainer,#${SHELL_ID} .newUyeOlRow,#${SHELL_ID} .newUyeOlCol,#${SHELL_ID} #FrmYeniUye{float:none!important;width:100%!important;max-width:none!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important}#${SHELL_ID} .FormTitle{display:none!important}#${SHELL_ID} .newUserWrapper{position:relative!important;float:none!important;width:100%!important;margin:0 0 14px!important}
                #${SHELL_ID} .uyeAdSoyadRow,#${SHELL_ID} .adresColRow{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}#${SHELL_ID} .dogumGunuRow{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}#${SHELL_ID} .uyeAdSoyadRow>.newUserWrapper,#${SHELL_ID} .adresColRow>.newUserWrapper,#${SHELL_ID} .dogumGunuRow>.newUserWrapper{margin-bottom:0!important}
                #${SHELL_ID} .newUserWrapper input:not([type=checkbox]),#${SHELL_ID} .newUserWrapper select{width:100%!important;height:55px!important;margin:0!important;padding:20px 42px 6px 15px!important;color:var(--mo-ink)!important;font:500 13px 'DM Sans',sans-serif!important;border:1px solid #d3e0e5!important;border-radius:11px!important;background:#f8fbfc!important;outline:0!important;transition:.2s!important}#${SHELL_ID} .newUserWrapper input:not([type=checkbox]):focus,#${SHELL_ID} .newUserWrapper select:focus{border-color:var(--mo-cyan)!important;background:#fff!important;box-shadow:0 0 0 3px rgba(79,160,201,.18)!important}#${SHELL_ID} .newUserWrapper select{appearance:none;-webkit-appearance:none;background-image:linear-gradient(45deg,transparent 50%,#607784 50%),linear-gradient(135deg,#607784 50%,transparent 50%)!important;background-position:calc(100% - 18px) 25px,calc(100% - 13px) 25px!important;background-size:5px 5px!important;background-repeat:no-repeat!important}#${SHELL_ID} .newUserWrapper select::-ms-expand{display:none!important}#${SHELL_ID} .webkitAppearance:before,#${SHELL_ID} .webkitAppearance:after{display:none!important;content:none!important}
                #${SHELL_ID} .placeholderLabel{position:absolute!important;z-index:2;top:8px!important;left:15px!important;margin:0!important;color:#71818d!important;font:600 9px 'DM Sans',sans-serif!important;line-height:1!important;pointer-events:none}#${SHELL_ID} .iti{width:100%!important}#${SHELL_ID} #txtCepTelefon,#${SHELL_ID} .iti input[type=tel],#${SHELL_ID} .intl-tel-input input[type=tel]{padding-left:70px!important}#${SHELL_ID} .iti__flag-container,#${SHELL_ID} .intl-tel-input .flag-container{z-index:4!important}
                #${SHELL_ID} .validateField,#${SHELL_ID} .alert-danger,#${SHELL_ID} .uyeOlSifreStrengthShowMessage{display:none!important;margin:5px 0!important;padding:0!important;color:#a72a35!important;font-size:10px!important;border:0!important;background:transparent!important}#${SHELL_ID} .validateField:not(.displayNone),#${SHELL_ID} .alert-danger:not(.displayNone),#${SHELL_ID} .uyeOlSifreStrengthShowMessage:not(.displayNone){display:block!important}#${SHELL_ID} .signSozlesmeDiv{display:grid;gap:10px;margin:9px 0 20px!important;padding:15px;border:1px solid #dce8ec;border-radius:12px;background:#f7fbfc}#${SHELL_ID} .checkboxItem{position:relative!important;display:block!important;min-height:24px!important;margin:0!important;padding:0 0 0 31px!important;clear:both!important}#${SHELL_ID} .checkboxItem input[type=checkbox]{position:absolute!important;left:0!important;top:1px!important;display:block!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;width:18px!important;height:18px!important;min-width:18px!important;min-height:18px!important;margin:0!important;padding:0!important;clip:auto!important;clip-path:none!important;z-index:5!important;cursor:pointer!important;accent-color:var(--mo-teal);appearance:auto!important;-webkit-appearance:checkbox!important}#${SHELL_ID} .checkboxItem .newSocialChkSozlesme{display:none!important}#${SHELL_ID} .checkboxItem .newSocialChkSozlesmeTranslate{display:block!important;position:static!important;width:auto!important;margin:0!important;padding:0!important;color:#647789!important;font-size:10px!important;line-height:1.55!important;cursor:pointer!important;pointer-events:auto!important;transform:none!important}#${SHELL_ID} .checkboxItem a{color:var(--mo-teal)!important;text-decoration:underline}
                #${SHELL_ID} #btnSave{width:100%!important;height:53px!important;color:#fff!important;font:700 13px 'DM Sans',sans-serif!important;letter-spacing:.04em;border:0!important;border-radius:11px!important;background:linear-gradient(135deg,var(--mo-navy),var(--mo-teal))!important;box-shadow:0 10px 22px rgba(3,35,94,.18)!important;transition:transform .2s,filter .2s!important}#${SHELL_ID} #btnSave:hover{transform:translateY(-1px);filter:brightness(1.08)}.mo-register-login{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;margin-top:auto!important;padding-top:26px;color:var(--mo-muted);font-size:12px;text-align:center}.mo-register-login a{display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:0 14px;color:#fff;font-size:11px;font-weight:700;text-decoration:none;border-radius:9px;background:var(--mo-teal);box-shadow:0 6px 14px rgba(12,72,83,.15);transition:transform .2s,filter .2s}.mo-register-login a:hover{transform:translateY(-1px);filter:brightness(1.08)}
                @keyframes moRegisterIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}@media(max-width:900px){#${SHELL_ID}{padding:30px 15px}.mo-register-card{grid-template-columns:1fr;max-width:620px}.mo-register-visual{min-height:260px;padding:32px}.mo-register-art{width:330px;right:-18px;top:-42px;opacity:.55}.mo-register-copy{left:32px;bottom:26px}.mo-register-copy h2{font-size:32px;margin:0}.mo-register-copy p{display:none}.mo-register-panel{padding:40px 30px 45px}}@media(max-width:540px){#${SHELL_ID}{padding:16px 10px 28px}.mo-register-card{border-radius:20px}.mo-register-visual{min-height:205px;padding:24px}.mo-register-copy{left:24px;bottom:21px}.mo-register-copy h2{font-size:27px}.mo-register-panel{padding:32px 22px 36px}.mo-register-panel h1{font-size:34px}#${SHELL_ID} .uyeAdSoyadRow,#${SHELL_ID} .adresColRow{grid-template-columns:1fr;gap:12px}#${SHELL_ID} .dogumGunuRow{gap:6px}}
            `;
            document.head.appendChild(style);
        }

        var shell = document.createElement('section');
        shell.id = SHELL_ID;
        shell.setAttribute('aria-label', 'Motif İstanbul üyelik oluşturma');
        shell.innerHTML = `<div class="mo-register-card"><aside class="mo-register-visual" aria-hidden="true"><div class="mo-register-kicker">Motif İstanbul / Aramıza katıl</div><svg class="mo-register-art" viewBox="0 0 560 650" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M282 53c-34 21-49 55-42 91 6 30 29 50 55 65-42 26-86 44-104 91-16 42-3 91 3 137 8 62 2 113-35 166M346 52c30 23 44 57 37 91-6 29-26 49-51 65 51 8 94 34 110 78 18 49 2 111 18 164 9 30 25 52 48 70" stroke="currentColor" stroke-width="1.5"/><path d="M237 253c45 23 95 30 144 18M211 343c68 32 147 35 220 10M203 438c72 31 157 31 227 2M287 174c10 7 23 7 34 0M272 91c20-13 42-10 57 5" stroke="currentColor" stroke-width="1" opacity=".62"/><circle cx="437" cy="135" r="74" stroke="currentColor" stroke-width="1" opacity=".2"/></svg><div class="mo-register-copy"><h2>Desenlerinle kendi hikâyeni kur.</h2><p>Hesabını oluştur, seçtiklerini kaydet ve Motif İstanbul dokumalarını keşfetmeye devam et.</p></div></aside><main class="mo-register-panel"><span class="mo-register-kicker2">Yeni hesap</span><h1>Aramıza hoş geldin.</h1><p class="mo-register-intro">Birkaç bilgiyle hesabını oluştur, alışverişini kişiselleştir.</p><div id="moRegisterFormSlot"></div><p class="mo-register-login">Zaten hesabın var mı? <a href="/UyeGiris">Giriş yap</a></p></main></div>`;
        var registerArt = shell.querySelector('.mo-register-art');
        if (registerArt) {
            registerArt.innerHTML = '<circle cx="280" cy="258" r="150" stroke="currentColor" stroke-width="1.5" opacity=".45"/><circle cx="280" cy="258" r="112" stroke="currentColor" stroke-width="1" opacity=".3"/><path d="M150 370c46-54 103-81 171-81 67 0 125 27 173 81M175 410c69-36 139-43 210-17" stroke="currentColor" stroke-width="2" opacity=".6"/><path d="M239 182c20-20 61-20 82 0M222 229c34-31 101-31 136 0M244 276c24-16 48-16 72 0" stroke="currentColor" stroke-width="2" opacity=".7"/><circle cx="421" cy="124" r="27" stroke="currentColor" stroke-width="1.3" opacity=".5"/><circle cx="117" cy="160" r="10" fill="currentColor" opacity=".45"/>';
        }
        source.parentNode.insertBefore(shell, source);
        shell.querySelector('#moRegisterFormSlot').appendChild(source);
        hideInitialValidationMessages(shell);
        prepareCheckboxes(shell);
        prepareSubmitButton(shell);
        startEnhancerObserver(shell);
        return true;
    }

    function hideInitialValidationMessages(root) {
        Array.prototype.forEach.call(root.querySelectorAll('.alert-danger, .validateField, .uyeOlSifreStrengthShowMessage'), function (message) {
            message.classList.add('displayNone');
        });
    }

    function prepareCheckboxes(root) {
        Array.prototype.forEach.call(root.querySelectorAll('.checkboxItem'), function (item) {
            var checkbox = item.querySelector('input[type="checkbox"]');
            var label = item.querySelector('.newSocialChkSozlesmeTranslate');
            if (!checkbox || !label || label.getAttribute('data-mo-checkbox-ready')) return;

            label.setAttribute('data-mo-checkbox-ready', 'true');
            label.addEventListener('click', function (event) {
                if (event.target && event.target.closest && event.target.closest('a')) return;
                setTimeout(function () { syncAngularCheckbox(checkbox); }, 0);
            });

            checkbox.addEventListener('change', function () {
                syncAngularCheckbox(checkbox);
            });
        });
    }

    function prepareSubmitButton(root) {
        var button = root.querySelector('#btnSave');
        if (button && !button.getAttribute('data-mo-submit-sync')) {
            button.setAttribute('data-mo-submit-sync', 'true');
            button.addEventListener('click', function () {
                Array.prototype.forEach.call(root.querySelectorAll('.checkboxItem input[type="checkbox"]'), syncAngularCheckbox);
            }, true);
        }
        if (!button) return;
        if (!button.textContent.trim()) button.textContent = 'Üye Ol';
        button.disabled = false;
        button.removeAttribute('disabled');
    }

    function startEnhancerObserver(root) {
        if (!root || root.getAttribute('data-mo-register-observer')) return;
        root.setAttribute('data-mo-register-observer', 'true');

        var timer;
        var observer = new MutationObserver(function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                prepareCheckboxes(root);
                prepareSubmitButton(root);
            }, 80);
        });

        observer.observe(root, { childList: true, subtree: true });
    }

    function syncAngularCheckbox(checkbox) {
        if (!window.angular || !checkbox) return;

        try {
            var element = window.angular.element(checkbox);
            var ngModel = element.controller('ngModel');
            var scope = element.scope();
            var update = function () {
                if (ngModel && ngModel.$setViewValue) {
                    ngModel.$setViewValue(checkbox.checked);
                    if (ngModel.$render) ngModel.$render();
                } else {
                    assignScopePath(scope, checkbox.getAttribute('ng-model'), checkbox.checked);
                }
            };

            if (!scope) return;
            if (scope.$root && scope.$root.$$phase) update();
            else scope.$apply(update);
        } catch (error) {}
    }

    function assignScopePath(scope, path, value) {
        if (!scope || !path) return;
        var parts = path.split('.');
        var target = scope;
        var i;

        for (i = 0; i < parts.length - 1; i += 1) {
            if (!target[parts[i]]) target[parts[i]] = {};
            target = target[parts[i]];
        }

        target[parts[parts.length - 1]] = value;
    }

    function init() { if (setup()) return; var tries = 0; var timer = setInterval(function () { tries += 1; if (setup() || tries > 30) clearInterval(timer); }, 250); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}());
