(function () {
    'use strict';

    var SHELL_ID = 'moLoginShell';
    var STYLE_ID = 'moLoginStyles';

    function addFonts() {
        if (document.querySelector('link[data-mo-account-fonts]')) return;
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700&display=swap';
        link.setAttribute('data-mo-account-fonts', 'true');
        document.head.appendChild(link);
    }

    function styles() {
        if (document.getElementById(STYLE_ID)) return;
        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            body #divIcerik.ticiContainer, body #mainHolder_divUserLoginContent { width:100%!important; max-width:none!important; margin:0!important; padding:0!important; background:transparent!important; box-shadow:none!important; }
            body #divNewUyeGirisContent.newUserContainer { display:none!important; width:0!important; height:0!important; overflow:hidden!important; }
            #${SHELL_ID}, #${SHELL_ID} * { box-sizing:border-box; }
            #${SHELL_ID} { --mo-ink:#102338; --mo-navy:#03235e; --mo-teal:#0c4853; --mo-cyan:#4fa0c9; --mo-muted:#647789; position:relative; isolation:isolate; display:grid; place-items:center; min-height:clamp(620px,78vh,860px); padding:64px 22px; overflow:hidden; color:var(--mo-ink); font-family:'DM Sans',sans-serif; background:radial-gradient(circle at 10% 12%,rgba(79,160,201,.17) 0 1px,transparent 1.6px) 0 0/19px 19px,#f3f8fa; }
            #${SHELL_ID}::before { content:''; position:absolute; z-index:-1; width:620px; height:620px; right:-310px; top:-310px; border:1px solid rgba(12,72,83,.18); border-radius:50%; box-shadow:0 0 0 85px rgba(79,160,201,.06),0 0 0 170px rgba(3,35,94,.035); }
            .mo-login-card { width:min(1100px,100%); display:grid; grid-template-columns:minmax(0,1.02fr) minmax(370px,.98fr); overflow:hidden; border:1px solid rgba(3,35,94,.13); border-radius:28px; background:#fff; box-shadow:0 28px 80px rgba(3,35,94,.16); animation:moLoginIn .65s cubic-bezier(.2,.7,.2,1) both; }
            .mo-login-visual { position:relative; min-height:610px; overflow:hidden; padding:52px; color:#fff; background:linear-gradient(145deg,var(--mo-teal),var(--mo-navy)); }
            .mo-login-visual::after { content:''; position:absolute; inset:0; opacity:.16; background-image:radial-gradient(rgba(255,255,255,.7) 1px,transparent 1px); background-size:22px 22px; }
            .mo-login-kicker,.mo-login-copy { position:relative; z-index:1; }
            .mo-login-kicker { display:flex; align-items:center; gap:12px; font-size:11px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; }
            .mo-login-kicker::before { content:''; width:32px; height:1px; background:currentColor; }
            .mo-login-art { position:absolute; z-index:1; width:min(470px,105%); right:-70px; top:54px; color:#c9f2f6; opacity:.82; }
            .mo-login-copy { position:absolute; left:52px; right:44px; bottom:48px; }
            .mo-login-copy h2 { max-width:430px; margin:0 0 16px; color:#fff; font-family:'Manrope',sans-serif; font-size:clamp(35px,4vw,56px); font-weight:600; line-height:1.02; letter-spacing:-.06em; }
            .mo-login-copy p { max-width:360px; margin:0; color:rgba(255,255,255,.7); font-size:13px; line-height:1.7; }
            .mo-login-panel { padding:58px clamp(34px,5vw,70px) 62px; background:#fff; }
            .mo-login-panel-kicker { display:block; margin-bottom:14px; color:var(--mo-teal); font-size:11px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; }
            .mo-login-panel h1 { margin:0; color:var(--mo-navy); font-family:'Manrope',sans-serif; font-size:clamp(35px,3.2vw,48px); font-weight:700; line-height:1.05; letter-spacing:-.055em; }
            .mo-login-intro { margin:13px 0 29px; color:var(--mo-muted); font-size:13px; line-height:1.65; }
            #${SHELL_ID} #divUyeGirisForm, #${SHELL_ID} .uyeGirisFormDetail { float:none!important; width:100%!important; max-width:none!important; margin:0!important; padding:0!important; border:0!important; background:transparent!important; box-shadow:none!important; }
            #${SHELL_ID} .newUserWrapper { position:relative!important; float:none!important; width:100%!important; margin:0 0 15px!important; }
            #${SHELL_ID} .newUserWrapper .textbox { width:100%!important; height:56px!important; margin:0!important; padding:21px 45px 7px 16px!important; color:var(--mo-ink)!important; font:500 14px 'DM Sans',sans-serif!important; border:1px solid #d3e0e5!important; border-radius:12px!important; background:#f8fbfc!important; outline:0!important; transition:.2s!important; }
            #${SHELL_ID} .newUserWrapper .textbox:focus { border-color:var(--mo-cyan)!important; background:#fff!important; box-shadow:0 0 0 3px rgba(79,160,201,.18)!important; }
            #${SHELL_ID} .placeholderLabel { position:absolute!important; z-index:1; top:9px!important; left:16px!important; margin:0!important; color:#71818d!important; font:600 10px 'DM Sans',sans-serif!important; pointer-events:none; }
            #${SHELL_ID} .TcxPassEye { right:15px!important; top:17px!important; color:var(--mo-teal)!important; }
            #${SHELL_ID} .alert-danger { display:none!important; margin:5px 0!important; color:#a72a35!important; font-size:11px!important; background:transparent!important; border:0!important; }
            #${SHELL_ID} .alert-danger:not(.displayNone) { display:block!important; }
            #${SHELL_ID} .uyeGirisFormDetailButtonList { margin:6px 0 0!important; }
            #${SHELL_ID} .newUserLoginBtn { width:100%!important; height:54px!important; color:#fff!important; font:700 13px 'DM Sans',sans-serif!important; letter-spacing:.04em; border:0!important; border-radius:12px!important; background:linear-gradient(135deg,var(--mo-navy),var(--mo-teal))!important; box-shadow:0 10px 22px rgba(3,35,94,.18)!important; transition:transform .2s,filter .2s!important; }
            #${SHELL_ID} .newUserLoginBtn:hover { transform:translateY(-1px); filter:brightness(1.08); }
            #${SHELL_ID} .forgotpasswordDiv { margin:10px 0 0!important; padding-top:0; text-align:right; }
            #${SHELL_ID} .userPassBtn { display:inline-block!important; margin-top:14px!important; color:var(--mo-teal)!important; font-size:11px!important; font-weight:700!important; text-decoration:none!important; }
            #${SHELL_ID} .socialMediaLoginButtons { display:grid!important; grid-template-columns:1fr 1fr; gap:9px; margin:26px 0 0!important; padding-top:24px; border-top:1px solid #e5eef1; }
            #${SHELL_ID} .socialBaglanButton, #${SHELL_ID} .socialBaglanButton a { width:100%!important; margin:0!important; }
            #${SHELL_ID} .socialBaglanButton a { display:flex!important; align-items:center; justify-content:center; gap:8px; height:48px!important; color:var(--mo-ink)!important; font-size:11px!important; font-weight:700; border:1px solid #d3e0e5!important; border-radius:11px!important; background:#fff!important; }
            #${SHELL_ID} .socialBaglanButton svg { width:18px; height:18px; }
            .mo-login-register { margin:25px 0 0; color:var(--mo-muted); font-size:12px; text-align:center; }
            .mo-login-register a { display:inline-flex; align-items:center; justify-content:center; min-height:38px; margin-left:8px; padding:0 14px; color:#fff; font-size:11px; font-weight:700; text-decoration:none; border-radius:9px; background:var(--mo-teal); box-shadow:0 6px 14px rgba(12,72,83,.15); transition:transform .2s,filter .2s; }
            .mo-login-register a:hover { transform:translateY(-1px); filter:brightness(1.08); }
            @keyframes moLoginIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
            @media(max-width:850px){ #${SHELL_ID}{padding:30px 15px}.mo-login-card{grid-template-columns:1fr;max-width:570px}.mo-login-visual{min-height:245px;padding:31px}.mo-login-art{width:285px;right:-25px;top:-40px;opacity:.55}.mo-login-copy{left:31px;right:24px;bottom:25px}.mo-login-copy h2{font-size:31px;margin:0}.mo-login-copy p{display:none}.mo-login-panel{padding:39px 30px 43px} }
            @media(max-width:480px){#${SHELL_ID}{padding:16px 10px 28px}.mo-login-card{border-radius:20px}.mo-login-visual{min-height:200px;padding:24px}.mo-login-copy{left:24px;bottom:21px}.mo-login-copy h2{font-size:27px}.mo-login-panel{padding:32px 22px 36px}.mo-login-panel h1{font-size:34px}.mo-login-panel .socialMediaLoginButtons{grid-template-columns:1fr}}
        `;
        document.head.appendChild(style);
    }

    function modernize() {
        var source = document.getElementById('divUyeGirisForm');
        var container = document.getElementById('divNewUyeGirisContent');
        if (!source || !container || document.getElementById(SHELL_ID)) return false;
        addFonts(); styles();
        var shell = document.createElement('section');
        shell.id = SHELL_ID;
        shell.setAttribute('aria-label', 'Motif İstanbul üye girişi');
        shell.innerHTML = `<div class="mo-login-card"><aside class="mo-login-visual" aria-hidden="true"><div class="mo-login-kicker">Motif İstanbul / Hesabım</div><svg class="mo-login-art" viewBox="0 0 560 560" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="280" cy="258" r="150" stroke="currentColor" stroke-width="1.5" opacity=".45"/><circle cx="280" cy="258" r="112" stroke="currentColor" stroke-width="1" opacity=".3"/><path d="M150 370c46-54 103-81 171-81 67 0 125 27 173 81M175 410c69-36 139-43 210-17" stroke="currentColor" stroke-width="2" opacity=".6"/><path d="M239 182c20-20 61-20 82 0M222 229c34-31 101-31 136 0M244 276c24-16 48-16 72 0" stroke="currentColor" stroke-width="2" opacity=".7"/><circle cx="421" cy="124" r="27" stroke="currentColor" stroke-width="1.3" opacity=".5"/><circle cx="117" cy="160" r="10" fill="currentColor" opacity=".45"/></svg><div class="mo-login-copy"><h2>Desenlerini sakla, Motif dünyasına dön.</h2><p>Favorilerini kaydet, siparişlerini takip et ve sana özel koleksiyonları keşfet.</p></div></aside><main class="mo-login-panel"><span class="mo-login-panel-kicker">Üye girişi</span><h1>Tekrar hoş geldin.</h1><p class="mo-login-intro">Hesabına giriş yaparak alışveriş deneyimine kaldığın yerden devam et.</p><div id="moLoginFormSlot"></div><p class="mo-login-register">Henüz hesabın yok mu? <a href="/UyeOl">Hesap oluştur</a></p></main></div>`;
        container.parentNode.insertBefore(shell, container);
        shell.querySelector('#moLoginFormSlot').appendChild(source);
        Array.prototype.forEach.call(shell.querySelectorAll('.alert-danger'), function (message) {
            message.classList.add('displayNone');
        });
        var button = shell.querySelector('.newUserLoginBtn');
        if (button && !button.querySelector('span')) button.textContent = 'GİRİŞ YAP';
        return true;
    }

    function init() {
        if (modernize()) return;
        var tries = 0;
        var timer = setInterval(function () { tries += 1; if (modernize() || tries > 30) clearInterval(timer); }, 250);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}());
