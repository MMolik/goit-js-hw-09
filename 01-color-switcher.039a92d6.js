const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");t.addEventListener("click",(function(){const n=setInterval((function(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3);t.disabled=!0,e.addEventListener("click",(function(){clearInterval(n),t.disabled=!1}))}));
//# sourceMappingURL=01-color-switcher.039a92d6.js.map
