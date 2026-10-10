'use strict';
(function(B){
 const media=window.matchMedia('(prefers-reduced-motion: reduce)');
 B.Access={apply(){
  const s=B.Progress.get().settings,root=document.documentElement;
  root.dataset.mode=s.mode;root.dataset.motion=(!s.motion||s.mode==='calm'||media.matches)?'reduced':'gentle';
  root.dataset.contrast=s.contrast?'high':'normal';root.dataset.size=s.size;
 },reduced:()=>media.matches||!B.Progress.get().settings.motion||B.Progress.get().settings.mode==='calm'};
 if(media.addEventListener)media.addEventListener('change',()=>B.Access.apply());
 else if(media.addListener)media.addListener(()=>B.Access.apply());
 B.Access.apply();
})(Bio);
