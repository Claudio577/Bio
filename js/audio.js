'use strict';
(function(B){
 let sound=null, speaking=false;
 const synth=('speechSynthesis' in window)?window.speechSynthesis:null;
 const announce=t=>{const el=document.getElementById('announcer');if(el)el.textContent=t;};
 function stop(){if(synth)synth.cancel();if(sound){sound.pause();sound.currentTime=0;}speaking=false;document.dispatchEvent(new Event('biomundo:audio'));}
 B.Audio={supported:()=>!!synth,isSpeaking:()=>speaking,stop,
 success(){const s=B.Progress.get().settings;if(!s.sound||s.mode==='calm')return;if(!sound)sound=new Audio('assets/audio/success.wav');sound.currentTime=0;sound.volume=.25;sound.play().catch(()=>announce('O som n\u00e3o est\u00e1 dispon\u00edvel. Voc\u00ea pode continuar sem \u00e1udio.'));},
 speak(text){
  if(speaking){stop();return;}
  if(!B.Progress.get().settings.narration){announce('Ative a narra\u00e7\u00e3o nas configura\u00e7\u00f5es.');return;}
  if(!synth){announce('Este navegador n\u00e3o oferece narra\u00e7\u00e3o. Todas as instru\u00e7\u00f5es est\u00e3o escritas.');return;}
  synth.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='pt-BR';u.rate=.9;
  const voices=synth.getVoices();const voice=voices.find(v=>v.lang==='pt-BR')||voices.find(v=>v.lang.startsWith('pt'));if(voice)u.voice=voice;
  u.onend=()=>{speaking=false;document.dispatchEvent(new Event('biomundo:audio'));};
  u.onerror=()=>{speaking=false;announce('A voz n\u00e3o est\u00e1 dispon\u00edvel agora. Leia a instru\u00e7\u00e3o na tela.');document.dispatchEvent(new Event('biomundo:audio'));};
  speaking=true;document.dispatchEvent(new Event('biomundo:audio'));synth.speak(u);
 }
 };
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
})(Bio);
