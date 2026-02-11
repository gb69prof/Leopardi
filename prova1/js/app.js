(function(){
  const btn = document.querySelector('[data-hamburger]');
  const drawer = document.querySelector('[data-drawer]');
  const panel = document.querySelector('[data-drawer-panel]');
  function open(){ drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false'); }
  function close(){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); }
  if(btn && drawer){
    btn.addEventListener('click', open);
    drawer.addEventListener('click', (e)=>{ if(e.target === drawer) close(); });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });
  }
  if(panel){
    panel.addEventListener('click', (e)=>{
      const a = e.target.closest('a');
      if(a) setTimeout(close, 60);
    });
  }
})();
