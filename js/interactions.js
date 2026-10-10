/* Pointer Events: one implementation for mouse, pen and touch. Tap/keyboard use native buttons. */
'use strict';
(function(B){
 let active=null,ghost=null,suppressUntil=0;
 function clear(){
  if(ghost)ghost.remove();ghost=null;
  if(active&&active.source.isConnected)active.source.classList.remove('dragging');
  document.querySelectorAll('.drop-hover').forEach(e=>e.classList.remove('drop-hover'));
  active=null;
 }
 B.Interactions={cancel:clear,bind(onSelect,onDrop){
  document.addEventListener('pointerdown',e=>{
   const source=e.target.closest('[data-piece]');if(!source||source.disabled||!e.isPrimary||e.button!==0)return;
   active={id:source.dataset.piece,source,pointerId:e.pointerId,x:e.clientX,y:e.clientY,dragging:false};
   try{source.setPointerCapture(e.pointerId);}catch(_){}
  });
  document.addEventListener('pointermove',e=>{
   if(!active||e.pointerId!==active.pointerId)return;
   if(!active.dragging&&Math.hypot(e.clientX-active.x,e.clientY-active.y)>9){
    active.dragging=true;active.source.classList.add('dragging');
    ghost=document.createElement('img');ghost.src=`assets/organelles/${active.id}.svg`;ghost.className='drag-ghost';ghost.alt='';document.body.append(ghost);
   }
   if(!active.dragging)return;
   e.preventDefault();ghost.style.left=e.clientX+'px';ghost.style.top=e.clientY+'px';
   document.querySelectorAll('.drop-hover').forEach(el=>el.classList.remove('drop-hover'));
   const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-slot]');if(target&&!target.classList.contains('filled'))target.classList.add('drop-hover');
   if(e.clientY<70)window.scrollBy(0,-12);else if(e.clientY>innerHeight-65)window.scrollBy(0,12);
  },{passive:false});
  document.addEventListener('pointerup',e=>{
   if(!active||e.pointerId!==active.pointerId)return;
   const a=active;
   if(a.dragging){
    const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-slot]');
    suppressUntil=performance.now()+400;clear();onSelect(a.id);if(target)onDrop(target.dataset.slot);return;
   }
   clear(); // The following native click handles taps and mouse clicks, exactly once.
  });
  document.addEventListener('pointercancel',clear);
  document.addEventListener('click',e=>{if(e.detail>0&&performance.now()<suppressUntil&&(e.target.closest('[data-piece]')||e.target.closest('[data-slot]'))){e.preventDefault();e.stopImmediatePropagation();}},true);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&active){clear();e.preventDefault();}});
  window.addEventListener('blur',clear);
 }};
})(Bio);
