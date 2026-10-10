'use strict';
(function(B){
 let g=null;
 const esc=B.escape;
 const mascot=(mood)=>`<img id="guide-mascot" src="assets/mascot/${mood}.svg" alt="Bibi, a C\u00e9lula Exploradora">`;
 const complete=()=>g.level.kind==='assembly'?g.placed.length===g.level.pieces.length:(g.step===g.level.questions.length-1&&g.answered);
 function checkpoint(){B.Progress.draft(g.level.id,g);}
 function heardButton(){return `<button class="btn compact ghost" data-action="listen" ${!B.Audio.supported()||!B.Progress.get().settings.narration?'disabled':''} title="Narra\u00e7\u00e3o opcional; ative nos ajustes"><span aria-hidden="true">\u25b7</span> <span class="listen-label">Ouvir</span></button>`;}
 function header(){
  const l=g.level,total=(l.pieces||l.questions).length,n=l.kind==='assembly'?g.placed.length:g.step+(g.answered?1:0);
  return `<section class="panel stage-header"><div class="stage-top"><div><span class="eyebrow">Fase ${l.id} de 8 \u00b7 ${esc(l.label)}</span><h1>${esc(l.title)}</h1></div><div class="stage-controls"><button class="btn compact ghost" data-action="map">\u2190 Mapa</button><button class="btn compact gold" data-action="hint">? Ajuda</button><button class="btn compact ghost" data-action="pause">\u2161 Pausar</button>${heardButton()}</div></div><div class="progress-row"><div class="progress-bar" role="progressbar" aria-label="Atividades desta fase" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${n}"><span style="width:${100*n/total}%"></span></div><span class="progress-counter">${n} de ${total} descobertas</span></div></section>`;
 }
 function guide(){return `<section class="guide" aria-label="Instru\u00e7\u00e3o da Bibi">${mascot(g.mood)}<div><h2>Bibi, sua guia</h2><p id="guide-text">${esc(g.message)}</p></div></section>`;}
 function feedback(){return `<div class="feedback ${g.feedbackType}" id="activity-feedback"><span aria-hidden="true">${g.feedbackType==='good'?'\u2713':'\u2726'}</span><p>${esc(g.feedback)}</p></div>`;}
 function assembly(){
  const l=g.level,guided=B.Progress.get().settings.complexity==='guided';
  const slots=l.pieces.map((id,i)=>{const pos=B.positions[l.cell][id],filled=g.placed.includes(id);return `<button class="slot ${filled?'filled':''} ${g.hint===id?'hinted':''}" data-slot="${id}" aria-label="${filled?'J\u00e1 encaixado: ':`Encaixe ${i+1}: `}${esc(B.content[id].name)}" aria-disabled="${filled}" style="left:${pos[0]}%;top:${pos[1]}%;width:${pos[2]}%;height:${pos[3]}%">${B.image(id)}<span class="slot-num" aria-hidden="true">${filled?'\u2713':i+1}</span>${guided||filled||g.hint===id?`<span class="slot-name" aria-hidden="true">${esc(B.content[id].short)}</span>`:''}</button>`;}).join('');
  const pending=l.pieces.filter(id=>!g.placed.includes(id));
  g.page=Math.min(g.page,Math.max(0,Math.ceil(pending.length/3)-1));
  const visible=pending.slice(g.page*3,g.page*3+3);
  const tray=visible.map(id=>`<button class="piece ${g.selected===id?'selected':''}" data-piece="${id}" aria-pressed="${g.selected===id}" aria-label="Selecionar ${esc(B.content[id].name)}" title="${esc(B.content[id].name)}">${B.image(id)}<span class="piece-name">${esc(B.content[id].short)}<small>Toque ou arraste</small></span>${guided?`<span class="piece-number" aria-hidden="true">${l.pieces.indexOf(id)+1}</span>`:''}</button>`).join('');
  return `<div class="play-layout"><section class="cell-panel" aria-label="Modelo para montagem"><p class="model-caption">${l.cell==='plant'?'Modelo vegetal fotossintetizante':'Modelo de c\u00e9lula animal'}</p><div class="cell-board" aria-label="Encaixes da c\u00e9lula"><img class="cell-base" src="assets/cells/${l.cell}-base.svg" alt="Contorno did\u00e1tico de uma c\u00e9lula ${l.cell==='plant'?'vegetal, com parede externa e membrana interna':'animal, com membrana e citoplasma'}" draggable="false">${slots}</div><div class="cell-legend">${l.cell==='plant'?'<span>Contorno externo: parede celular</span><span>Contorno interno: membrana</span>':'<span>Contorno: membrana plasm\u00e1tica</span><span>Interior: citoplasma</span>'}</div></section><aside class="panel parts-panel" aria-label="Pe\u00e7as para montar"><h2>${pending.length?'Escolha uma organela':'Modelo completo!'}</h2><p class="intro-small">${pending.length?'Toque na pe\u00e7a e depois no encaixe. Arrastar tamb\u00e9m funciona.':'Voc\u00ea pode tocar nas organelas para revisar suas fun\u00e7\u00f5es.'}</p><div class="pieces-grid">${tray}</div>${pending.length>3?`<div class="tray-paging"><button data-action="tray-prev" aria-label="Pe\u00e7as anteriores" ${g.page===0?'disabled':''}>\u2190</button><span>Pe\u00e7as ${g.page*3+1}\u2013${Math.min(g.page*3+3,pending.length)} de ${pending.length}</span><button data-action="tray-next" aria-label="Mais pe\u00e7as" ${(g.page+1)*3>=pending.length?'disabled':''}>\u2192</button></div>`:''}<p class="selection-message" id="selection-message">${g.selected?`Selecionada: ${esc(B.content[g.selected].name)}.`:pending.length?'Voc\u00ea pode usar a ajuda a qualquer momento.':'Todas as pe\u00e7as foram encaixadas.'}</p>${feedback()}<div class="game-bottom">${complete()?'<button class="btn primary" data-action="finish">Concluir fase \u2192</button>':'<button class="btn compact ghost" data-action="hint">Mostrar uma dica</button>'}</div></aside></div><p class="science-note">${esc(B.scienceNote)}</p>`;
 }
 function quiz(){
  const l=g.level,q=l.questions[g.step];
  const options=q.options.map(id=>{const c=B.content[id],label=c?c.name:B.labels[id],ok=g.answered&&q.answer===id;return `<button class="answer ${ok?'correct':''} ${g.hint===id?'answer-help':''}" data-answer="${id}" ${g.answered?'disabled':''}>${c?B.image(id):`<span class="answer-category" aria-hidden="true">${id==='both'?'\u25ce':id==='animal'?'\u25cb':id==='plant'?'\u2667':id==='yes'?'\u2713':'\u2014'}</span>`}<span>${ok?'\u2713 ':''}${esc(label)}</span></button>`;}).join('');
  const image=q.visual?B.image(q.visual,'',`Representa\u00e7\u00e3o did\u00e1tica: ${B.content[q.visual].hint}`):'<span class="question-mark" aria-hidden="true">?</span>';
  return `<section class="panel question-panel"><div class="question-layout"><div class="question-art">${image}</div><div class="question-main"><p class="question-counter">Descoberta ${g.step+1} de ${l.questions.length}</p><h2 id="question-title">${esc(q.prompt)}</h2><div class="answers" data-count="${q.options.length}" role="group" aria-labelledby="question-title">${options}</div></div></div><div class="quiz-feedback">${feedback()}</div>${g.answered?`<div class="quiz-next"><button class="btn primary" data-action="${complete()?'finish':'next-question'}">${complete()?'Concluir fase':'Pr\u00f3xima descoberta'} \u2192</button></div>`:''}</section><p class="science-note">${esc(B.scienceNote)}</p>`;
 }
 function render(focusSelector=null){
  if(!g)return;
  B.UI.mount(header()+guide()+(g.level.kind==='assembly'?assembly():quiz()),false);
  if(focusSelector){const e=document.querySelector(focusSelector);if(e)e.focus({preventScroll:true});}
  document.title=`Fase ${g.level.id} | BioMundo`;
 }
 function guideOnly(mood,message){g.mood=mood;g.message=message;const img=document.getElementById('guide-mascot'),txt=document.getElementById('guide-text');if(img)img.src=`assets/mascot/${mood}.svg`;if(txt)txt.textContent=message;}
 function announce(text){B.UI.announce(text);}
 B.Game={
 start(id){
  const level=B.level(id);if(!level)return;
  const d=B.Progress.get().drafts[id]||{};
  g={level,placed:d.placed||[],step:d.step||0,answered:!!d.answered,selected:null,page:0,hint:null,mood:'explaining',message:level.objective,feedback:'Sem pressa. Cada tentativa \u00e9 uma oportunidade de aprender.',feedbackType:'neutral'};
  if(level.kind==='quiz'&&g.answered){g.feedback=level.questions[g.step].explanation;g.feedbackType='good';g.mood='happy';g.message='Descoberta recuperada! Continue de onde parou.';}
  if(level.kind==='assembly'&&g.placed.length===level.pieces.length){g.mood='happy';g.message='Seu modelo est\u00e1 pronto. Vamos concluir a fase?';}
  B.Progress.visit(id);checkpoint();render();window.scrollTo(0,0);document.getElementById('app').focus({preventScroll:true});
 },
 current:()=>g,
 render,
 instruction(){return g?`${g.level.objective} ${g.level.kind==='quiz'?g.level.questions[g.step].prompt:g.message}`:'';},
 select(id){
  if(!g||g.level.kind!=='assembly'||!g.level.pieces.includes(id)||g.placed.includes(id))return;
  g.selected=id;g.hint=null;
  document.querySelectorAll('[data-piece]').forEach(e=>{e.classList.toggle('selected',e.dataset.piece===id);e.setAttribute('aria-pressed',String(e.dataset.piece===id));});
  document.querySelectorAll('.slot.hinted').forEach(e=>e.classList.remove('hinted'));
  const t=`Pe\u00e7a selecionada: ${B.content[id].name}. Agora escolha seu encaixe.`;
  guideOnly('thinking',t);const sel=document.getElementById('selection-message');if(sel)sel.textContent=`Selecionada: ${B.content[id].name}.`;announce(t);
 },
 place(id){
  if(!g||g.level.kind!=='assembly'||!g.level.pieces.includes(id))return;
  if(g.placed.includes(id)){guideOnly('explaining',B.content[id].function);announce(B.content[id].function);return;}
  if(!g.selected){guideOnly('explaining','Primeiro escolha uma pe\u00e7a. Depois toque no encaixe.');announce(g.message);return;}
  if(g.selected!==id){
   g.feedback='Vamos tentar novamente. Compare a forma da pe\u00e7a com o encaixe. A ajuda est\u00e1 aqui para voc\u00ea.';g.feedbackType='neutral';g.mood='encouraging';g.message=B.content[g.selected].hint;render(`[data-piece="${g.selected}"]`);announce(g.feedback);return;
  }
  g.placed.push(id);g.selected=null;g.hint=null;g.feedback=B.content[id].function;g.feedbackType='good';g.mood='happy';g.message=complete()?'Muito bem! O modelo est\u00e1 completo.':'Isso! Mais uma descoberta. Escolha a pr\u00f3xima pe\u00e7a.';
  B.Progress.learn(id);B.Progress.activity(g.level.id,id);checkpoint();B.Audio.success();render(complete()?'[data-action="finish"]':'[data-piece]');announce(`Pe\u00e7a encaixada: ${B.content[id].name}. ${g.feedback}`);
 },
 answer(id){
  if(!g||g.level.kind!=='quiz'||g.answered)return;
  const q=g.level.questions[g.step];if(!q.options.includes(id))return;
  if(id!==q.answer){g.feedback='Vamos explorar de novo. Releia a pergunta ou toque em Ajuda. Voc\u00ea pode tentar quantas vezes precisar.';g.feedbackType='neutral';g.mood='encouraging';g.message='Sem problema! Vamos descobrir juntos.';render(`[data-answer="${id}"]`);announce(g.feedback);return;}
  g.answered=true;g.feedback=q.explanation;g.feedbackType='good';g.mood='happy';g.message='Isso! Voc\u00ea fez mais uma descoberta.';g.hint=null;
  if(B.content[q.answer])B.Progress.learn(q.answer);if(q.visual)B.Progress.learn(q.visual);
  B.Progress.activity(g.level.id,q.id);checkpoint();B.Audio.success();render(complete()?'[data-action="finish"]':'[data-action="next-question"]');announce(`Isso! ${q.explanation}`);
 },
 next(){if(!g||!g.answered||g.level.kind!=='quiz'||complete())return;B.Audio.stop();g.step++;g.answered=false;g.hint=null;g.mood='explaining';g.message=g.level.objective;g.feedback='Observe com calma e escolha uma resposta.';g.feedbackType='neutral';checkpoint();render('[data-answer]');},
 page(delta){if(!g)return;g.page=Math.max(0,g.page+delta);render('[data-piece]');},
 hint(){
  if(!g)return;
  if(complete()){guideOnly('happy','Voc\u00ea terminou as atividades. Toque em Concluir fase.');announce(g.message);return;}
  if(g.level.kind==='assembly'){
   const id=g.selected||g.level.pieces.find(p=>!g.placed.includes(p));g.selected=id;g.hint=id;g.mood='explaining';g.message=`${B.content[id].name}: ${B.content[id].hint}`;g.feedback=`O encaixe ${g.level.pieces.indexOf(id)+1} est\u00e1 destacado. Toque nele para colocar a pe\u00e7a selecionada.`;g.feedbackType='neutral';
   const pending=g.level.pieces.filter(p=>!g.placed.includes(p));g.page=Math.floor(pending.indexOf(id)/3);render(`[data-slot="${id}"]`);
  }else{const q=g.level.questions[g.step];g.hint=q.answer;g.mood='explaining';g.message=q.explanation;g.feedback='A resposta est\u00e1 destacada com um contorno. Toque nela quando estiver pronto.';g.feedbackType='neutral';render(`[data-answer="${q.answer}"]`);}
  announce(`${g.message} ${g.feedback}`);
 },
 finish(){if(!g||!complete())return;const id=g.level.id;B.Progress.complete(id);B.Audio.stop();B.UI.navigate(`conclusao-${id}`);},
 restart(){if(!g)return;const id=g.level.id;B.Progress.resetDraft(id);B.UI.closeModal();B.UI.navigate(`jogar-${id}`);},
 pause(){if(!g)return;B.Audio.stop();B.Interactions.cancel();B.UI.modal('Pausa para respirar',`<img class="modal-art" src="assets/mascot/neutral.svg" alt="Bibi descansando"><p>Seu progresso foi guardado ${B.Progress.available()?'neste dispositivo':'somente nesta sess\u00e3o, pois o armazenamento n\u00e3o est\u00e1 dispon\u00edvel'}. Continue quando estiver pronto.</p><div class="button-row"><button class="btn primary" data-action="close-modal">Continuar</button><button class="btn ghost" data-action="restart-confirm">Reiniciar fase</button><button class="btn ghost" data-action="map">Voltar ao mapa</button></div>`);}
 };
})(Bio);
