(function () {
    'use strict';

    var SHELL_ID = 'moResetShell';
    var STYLE_ID = 'moResetStyles';

    function addFonts() {
        if (document.querySelector('link[data-mo-account-fonts]')) return;
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700&display=swap';
        link.setAttribute('data-mo-account-fonts', 'true');
        document.head.appendChild(link);
    }

    function injectStyles() {
        if (document.getElementById(STYLE_ID)) return;
        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            body #divIcerik.ticiContainer{width:100%!important;max-width:none!important;margin:0!important;padding:0!important;background:transparent!important}body .pageSifreOlustur .pageCreatPass,body .pageSifremiUnuttum .pageForgetPass{width:100%!important;max-width:100%!important;margin:0!important;padding:0!important}
            #${SHELL_ID},#${SHELL_ID} *{box-sizing:border-box}
            #${SHELL_ID}{--mo-ink:#102338;--mo-navy:#03235e;--mo-teal:#0c4853;--mo-cyan:#4fa0c9;--mo-muted:#647789;position:relative;isolation:isolate;display:grid;place-items:center;min-height:clamp(580px,72vh,790px);padding:62px 22px;overflow:hidden;color:var(--mo-ink);font-family:'DM Sans',sans-serif;background:radial-gradient(circle at 12% 12%,rgba(79,160,201,.18) 0 1px,transparent 1.6px) 0 0/19px 19px,#f3f8fa}
            #${SHELL_ID}:before{content:'';position:absolute;z-index:-1;width:600px;height:600px;left:-300px;bottom:-300px;border:1px solid rgba(12,72,83,.18);border-radius:50%;box-shadow:0 0 0 85px rgba(79,160,201,.06),0 0 0 170px rgba(3,35,94,.035)}
            .mo-reset-card{width:min(980px,100%);display:grid;grid-template-columns:minmax(360px,.88fr) minmax(0,1.12fr);overflow:hidden;border:1px solid rgba(3,35,94,.13);border-radius:28px;background:#fff;box-shadow:0 28px 80px rgba(3,35,94,.16);animation:moResetIn .65s cubic-bezier(.2,.7,.2,1) both}
            .mo-reset-visual{position:relative;min-height:560px;overflow:hidden;padding:50px;color:#fff;background:linear-gradient(145deg,var(--mo-teal),var(--mo-navy))}.mo-reset-visual:after{content:'';position:absolute;inset:0;opacity:.16;background-image:radial-gradient(rgba(255,255,255,.7) 1px,transparent 1px);background-size:22px 22px}.mo-reset-kicker,.mo-reset-copy{position:relative;z-index:1}.mo-reset-kicker{display:flex;align-items:center;gap:12px;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}.mo-reset-kicker:before{content:'';width:32px;height:1px;background:currentColor}.mo-reset-art{position:absolute;z-index:1;width:min(450px,115%);right:-75px;top:52px;color:#c9f2f6;opacity:.82}.mo-reset-copy{position:absolute;left:50px;right:40px;bottom:46px}.mo-reset-copy h2{max-width:390px;margin:0 0 15px;color:#fff;font-family:'Manrope',sans-serif;font-size:clamp(34px,4vw,53px);font-weight:600;line-height:1.03;letter-spacing:-.06em}.mo-reset-copy p{max-width:340px;margin:0;color:rgba(255,255,255,.7);font-size:13px;line-height:1.7}
            .mo-reset-panel{padding:58px clamp(34px,5vw,72px) 62px;background:#fff}.mo-reset-kicker2{display:block;margin-bottom:14px;color:var(--mo-teal);font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.mo-reset-panel h1{margin:0;color:var(--mo-navy);font-family:'Manrope',sans-serif;font-size:clamp(34px,3.2vw,47px);font-weight:700;line-height:1.06;letter-spacing:-.055em}.mo-reset-intro{margin:14px 0 28px;color:var(--mo-muted);font-size:13px;line-height:1.7}
            #${SHELL_ID} #divSifremiUnuttum{width:100%!important;max-width:none!important;margin:0!important;padding:0!important;background:transparent!important}#${SHELL_ID} #divSifremiUnuttum,#${SHELL_ID} #divSifremiUnuttum form,#${SHELL_ID} #divSifremiUnuttum .form-group,#${SHELL_ID} #divSifremiUnuttum .newUserWrapper{float:none!important;display:block!important;width:100%!important;max-width:none!important;margin:0 0 15px!important}#${SHELL_ID} #divSifremiUnuttum input[type=email],#${SHELL_ID} #divSifremiUnuttum input[type=text],#${SHELL_ID} #divSifremiUnuttum input.textbox{width:100%!important;height:56px!important;padding:18px 16px!important;color:var(--mo-ink)!important;font:500 14px 'DM Sans',sans-serif!important;border:1px solid #d3e0e5!important;border-radius:12px!important;background:#f8fbfc!important;outline:0!important}#${SHELL_ID} #divSifremiUnuttum input:focus{border-color:var(--mo-cyan)!important;background:#fff!important;box-shadow:0 0 0 3px rgba(79,160,201,.18)!important}
            #${SHELL_ID} #divSifremiUnuttum button,#${SHELL_ID} #divSifremiUnuttum input[type=button],#${SHELL_ID} #divSifremiUnuttum input[type=submit],#${SHELL_ID} #divSifremiUnuttum .button{display:flex!important;align-items:center;justify-content:center;float:none!important;clear:both!important;width:100%!important;height:53px!important;margin:0!important;color:#fff!important;font:700 13px 'DM Sans',sans-serif!important;letter-spacing:.04em;text-transform:uppercase;border:0!important;border-radius:11px!important;background:linear-gradient(135deg,var(--mo-navy),var(--mo-teal))!important;box-shadow:0 10px 22px rgba(3,35,94,.18)!important;cursor:pointer}
            #${SHELL_ID} #divSifremiUnuttum .alert-danger,#${SHELL_ID} #divSifremiUnuttum .validateField{display:none!important;color:#a72a35!important;font-size:11px!important;border:0!important;background:transparent!important}#${SHELL_ID} #divSifremiUnuttum .alert-danger:not(.displayNone),#${SHELL_ID} #divSifremiUnuttum .validateField:not(.displayNone){display:block!important}#${SHELL_ID} .mo-reset-login{position:relative!important;float:none!important;clear:both!important;display:flex!important;flex-direction:column;align-items:center;gap:9px;width:100%!important;margin:30px 0 0!important;padding-top:4px;color:var(--mo-muted);font-size:12px;text-align:center}.mo-reset-login a{display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:0 15px;color:#fff;font-size:11px;font-weight:700;text-decoration:none;border-radius:9px;background:var(--mo-teal);box-shadow:0 6px 14px rgba(12,72,83,.15)}
            @keyframes moResetIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}@media(max-width:820px){#${SHELL_ID}{padding:30px 15px}.mo-reset-card{grid-template-columns:1fr;max-width:590px}.mo-reset-visual{min-height:235px;padding:31px}.mo-reset-art{width:290px;right:-22px;top:-42px;opacity:.55}.mo-reset-copy{left:31px;bottom:24px}.mo-reset-copy h2{font-size:31px;margin:0}.mo-reset-copy p{display:none}.mo-reset-panel{padding:39px 30px 44px}}@media(max-width:480px){#${SHELL_ID}{padding:16px 10px 28px}.mo-reset-card{border-radius:20px}.mo-reset-visual{min-height:200px;padding:24px}.mo-reset-copy{left:24px;bottom:21px}.mo-reset-copy h2{font-size:27px}.mo-reset-panel{padding:32px 22px 36px}}
        `;
        document.head.appendChild(style);
    }

    function modernize() {
        var source = document.getElementById('divSifremiUnuttum');
        var content = document.getElementById('divIcerik');
        if (!source || !content || document.getElementById(SHELL_ID)) return false;
        addFonts();
        injectStyles();
        var shell = document.createElement('section');
        shell.id = SHELL_ID;
        shell.setAttribute('aria-label', 'Motif İstanbul şifre yenileme');
        shell.innerHTML = `<div class="mo-reset-card"><aside class="mo-reset-visual" aria-hidden="true"><div class="mo-reset-kicker">Motif İstanbul / Hesap erişimi</div><svg class="mo-reset-art" viewBox="0 0 560 560" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="280" cy="258" r="150" stroke="currentColor" stroke-width="1.5" opacity=".45"/><circle cx="280" cy="258" r="112" stroke="currentColor" stroke-width="1" opacity=".3"/><path d="M150 370c46-54 103-81 171-81 67 0 125 27 173 81M175 410c69-36 139-43 210-17" stroke="currentColor" stroke-width="2" opacity=".6"/><path d="M239 182c20-20 61-20 82 0M222 229c34-31 101-31 136 0M244 276c24-16 48-16 72 0" stroke="currentColor" stroke-width="2" opacity=".7"/><circle cx="421" cy="124" r="27" stroke="currentColor" stroke-width="1.3" opacity=".5"/></svg><div class="mo-reset-copy"><h2>Hesabına yeniden ulaş.</h2><p>E-posta adresini bırak; yeni şifre bağlantını güvenle gönderelim.</p></div></aside><main class="mo-reset-panel"><span class="mo-reset-kicker2">Şifre yenileme</span><h1>Şifreni yeniden belirle.</h1><p class="mo-reset-intro">Üyelikte kullandığın e-posta adresini yaz. Yeni şifre oluşturman için gerekli bağlantıyı hemen gönderelim.</p><div id="moResetFormSlot"></div><p class="mo-reset-login">Şifreni hatırladın mı? <a href="/UyeGiris">Giriş yap</a></p></main></div>`;
        var legacyDescription = document.querySelector('.SifremiUnuttumContentDesc');
        var modernDescription = shell.querySelector('.mo-reset-intro');
        if (legacyDescription && modernDescription) {
            modernDescription.textContent = legacyDescription.textContent.trim();
            legacyDescription.style.display = 'none';
        }
        source.parentNode.insertBefore(shell, source);
        shell.querySelector('#moResetFormSlot').appendChild(source);
        Array.prototype.forEach.call(shell.querySelectorAll('.alert-danger,.validateField'), function (message) { message.classList.add('displayNone'); });
        return true;
    }

    function init() { if (modernize()) return; var tries = 0; var timer = setInterval(function () { tries += 1; if (modernize() || tries > 40) clearInterval(timer); }, 250); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}());
