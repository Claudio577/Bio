'use strict';
(function(B){
 const $=s=>document.querySelector(s),esc=B.escape;let currentScreen='home',filter='all',returnRoute='inicio',installEvent=null,offlineReady=false,offlineFailed=false;
 const canOffline=('serviceWorker' in navigator)&&location.protocol!=='file:'&&window.isSecureContext;
 if(location.protocol!=='file:')document.getElementById('pwa-manifest').href='manifest.webmanifest';
 const colors=['#b9e890','#edd0fb','#ffcd83','#a9dce9','#c1e898','#a5e0d7','#f8c5dc','#f7df88'];
 const btn=(action,text,cls='ghost',data='')=>`<button class="btn ${cls}" data-action="${action}" ${data}>${text}</button>`;
 function heading(title,desc='',back='home'){return `<div class="page-heading"><div><span class="eyebrow">BioMundo \u00b7 no seu ritmo</span><h1>${title}</h1><p>${desc}</p></div>${btn(back,'\u2190 Voltar','compact ghost')}</div>`;}
 function mount(html,focus=true){
  $('#app').innerHTML=html;
  if(focus){window.scrollTo(0,0);$('#app').focus({preventScroll:true});}
 }
 function announce(text){const el=$('#announcer');el.textContent='';requestAnimationFrame(()=>{el.textContent=text;});}
 function modal(title,body){B.Audio.stop();const d=$('#modal');if(d.open)d.close();$('#modal-content').innerHTML=`<div class="modal-content"><h2 id="modal-title">${title}</h2>${body}</div>`;d.showModal();}
 function closeModal(){if($('#modal').open)$('#modal').close();}
 function navigate(hash){closeModal();B.Audio.stop();B.Interactions.cancel();if(location.hash===`#${hash}`)route();else location.hash=hash;}
 function home(){
  currentScreen='home';const p=B.Progress.get(),hasDraft=!!p.drafts[p.lastLevel];
  mount(`<section class="panel hero"><div class="hero-copy"><span class="badge">\u2726 Um pequeno mundo. Grandes descobertas.</span><h1>Um universo inteiro <strong>dentro de uma c\u00e9lula.</strong></h1><p class="lede">Explore, monte e aprenda com a Bibi. Uma aventura colorida pela vida, uma descoberta de cada vez.</p><div class="button-row">${btn(hasDraft?'continue':'map',hasDraft?'Continuar aventura \u2192':'Jogar \u2192','primary')}${btn('learn','Aprender','secondary')}</div><div class="button-row" style="margin-top:15px">${btn('how','Como jogar','compact ghost')}${btn('settings','Configura\u00e7\u00f5es','compact ghost')}</div></div><div class="hero-art" aria-label="Ilustra\u00e7\u00e3o did\u00e1tica de uma c\u00e9lula"><img class="hero-cell" src="assets/cells/animal-complete.svg" alt="Modelo colorido de uma c\u00e9lula animal"><img class="hero-bibi" src="assets/mascot/happy.svg" alt="Bibi, a C\u00e9lula Exploradora"><img class="hero-spark" src="assets/icons/star.svg" alt=""><span class="float-label">Explore \u00b7 Monte \u00b7 Aprenda</span></div></section><div class="home-strip"><div class="stat-card"><span class="stat-icon" aria-hidden="true">\u2691</span><div><strong>${p.completed.length}/8 fases</strong><small>Uma trilha de descobertas</small></div></div><div class="stat-card"><span class="stat-icon" aria-hidden="true">\u25ce</span><div><strong>${p.known.length}/11 estruturas</strong><small>Conhecidas por voc\u00ea</small></div></div><div class="stat-card"><span class="stat-icon" aria-hidden="true">\u2713</span><div><strong>${p.activities.length}/${B.totalActivities} atividades</strong><small>Aprender, sem competir</small></div></div></div><p class="home-note">Sem cron\u00f4metro. Sem vidas limitadas. Toda tentativa faz parte da aventura.</p>`);
 }
 function map(){
  currentScreen='map';const p=B.Progress.get(),recommended=B.levels.find(l=>!p.completed.includes(l.id))?.id||8;
  mount(`<section class="panel"><div class="map-top"><img src="assets/mascot/explaining.svg" alt="Bibi explicando"><div><span class="eyebrow">Seu mapa de descobertas</span><h1>Vamos explorar?</h1><p>Escolha uma fase. Todas est\u00e3o abertas, e voc\u00ea pode repetir quando quiser.</p></div></div><div class="map-grid">${B.levels.map(l=>`<button class="level-card ${p.completed.includes(l.id)?'done':''} ${l.id===recommended?'current':''}" data-action="intro" data-id="${l.id}" style="--accent:${colors[l.id-1]}" aria-label="Fase ${l.id}: ${esc(l.title)}. ${p.completed.includes(l.id)?'Conclu\u00edda; repetir':p.drafts[l.id]?'Em andamento':'Dispon\u00edvel'}"><span class="level-number">${l.id}</span>${p.completed.includes(l.id)?'<span class="level-check" aria-hidden="true">\u2713</span>':''}<h2>${esc(l.title)}</h2><small>${p.completed.includes(l.id)?'\u2713 Conclu\u00edda \u00b7 jogar de novo':p.drafts[l.id]?'Continuar descoberta \u2192':l.kind==='assembly'?'Montar e descobrir \u2192':'Explorar e responder \u2192'}</small></button>`).join('')}</div><p class="subnote">${p.completed.length} de 8 fases conclu\u00eddas. Seu caminho pode ser diferente: voc\u00ea escolhe o ritmo.</p></section>`);
 }
 function intro(id){
  const l=B.level(id);if(!l){home();return;}currentScreen='intro';B.Progress.visit(l.id);const draft=!!B.Progress.get().drafts[l.id];
  mount(`<section class="panel intro-layout"><div class="intro-visual"><img src="assets/cells/${l.cell==='plant'?'plant':'animal'}-complete.svg" alt="Modelo ${l.cell==='plant'?'vegetal fotossintetizante':'animal'}, representa\u00e7\u00e3o did\u00e1tica"><img class="mini-bibi" src="assets/mascot/explaining.svg" alt="Bibi explicando"></div><div class="intro-copy"><span class="eyebrow">Fase ${l.id} de 8 \u00b7 ${esc(l.label)}</span><h1>${esc(l.title)}</h1><p>${esc(l.intro)}</p><div class="instruction-box">${esc(l.objective)}</div><p><small>${(l.pieces||l.questions).length} descobertas \u00b7 Sem limite de tempo</small></p><div class="button-row">${btn('start',draft?'Continuar fase \u2192':'Come\u00e7ar fase \u2192','primary',`data-id="${l.id}"`)}${btn('map','Voltar ao mapa','ghost')}</div>${draft?`<button class="text-link" data-action="repeat" data-id="${l.id}">Recome\u00e7ar esta fase</button>`:''}<p class="subnote">Modelos did\u00e1ticos, sem escala real.</p></div></section>`);
 }
 function completion(id){
  const l=B.level(id);if(!l||!B.Progress.get().completed.includes(id)){intro(id);return;}currentScreen='complete';
  const all=B.Progress.get().completed.length===8;
  const ids=l.pieces||[...new Set(l.questions.flatMap(q=>[q.visual,q.answer]).filter(k=>B.content[k]))];
  mount(`<section class="panel"><div class="complete-layout"><img class="complete-mascot" src="assets/mascot/celebrating.svg" alt="Bibi comemorando sua descoberta"><span class="eyebrow">Fase ${l.id} conclu\u00edda</span><h1>${all?'Voc\u00ea explorou o BioMundo!':'Mais uma descoberta!'}</h1><p>${esc(l.summary)}</p><div class="completion-stars" aria-hidden="true"><img src="assets/icons/star.svg" alt=""><img src="assets/icons/star.svg" alt=""><img src="assets/icons/star.svg" alt=""></div><div class="learned-row">${ids.map(k=>`<span class="learned-chip">${B.image(k)}${esc(B.content[k].short)}</span>`).join('')}</div><div class="button-row">${l.id<8?btn('intro','Pr\u00f3xima fase \u2192','primary',`data-id="${l.id+1}"`):btn('learn','Continuar aprendendo','primary')}${btn('repeat','Repetir fase','secondary',`data-id="${l.id}"`)}${btn('map','Voltar ao mapa','ghost')}</div><p class="subnote">${all?'As oito fases foram conclu\u00eddas.':'Cada descoberta fica guardada neste dispositivo.'} As estrelas s\u00e3o uma celebra\u00e7\u00e3o, n\u00e3o uma nota.</p></div></section>`);
 }
 function learn(preserve=false){
  currentScreen='learn';const p=B.Progress.get();
  const entries=Object.entries(B.content).filter(([id,c])=>filter==='all'||filter==='known'&&p.known.includes(id)||filter==='plant'&&(c.category==='plant'||c.category==='both')||filter==='animal'&&(c.category==='animal'||c.category==='both'));
  mount(`<section class="panel">${heading('Pequenas estruturas, grandes tarefas','Conhe\u00e7a as 11 estruturas do jogo. Abra um cart\u00e3o para explorar mais.')}<div class="learning-controls" role="group" aria-label="Filtrar estruturas">${[['all','Todas'],['animal','Modelo animal'],['plant','Modelo vegetal'],['known','J\u00e1 conhecidas']].map(([f,t])=>`<button class="filter-button ${filter===f?'active':''}" data-action="filter" data-filter="${f}" aria-pressed="${filter===f}">${t}</button>`).join('')}</div><div class="learn-grid">${entries.map(([id,c])=>`<article class="learn-card" style="--accent:${c.color}">${B.image(id,'',`Ilustra\u00e7\u00e3o did\u00e1tica de ${c.name}`)}<h2>${esc(c.name)}</h2><p>${esc(c.function)}</p>${btn('detail',p.known.includes(id)?'\u2713 Explorar novamente':'Explorar','compact secondary',`data-organelle="${id}"`)}</article>`).join('')}</div>${entries.length?'':'<p class="subnote">Nenhuma estrutura conhecida ainda. Explore os cart\u00f5es em Todas ou comece uma fase.</p>'}<p class="subnote">${esc(B.scienceNote)} Nem toda c\u00e9lula possui todas as estruturas ilustradas.</p></section>`,!preserve);
 }
 function detail(id){
  const c=B.content[id];if(!c)return;B.Progress.learn(id);
  modal(esc(c.name),`${B.image(id,'modal-art',`Desenho did\u00e1tico de ${c.name}`)}<p><strong>${esc(c.function)}</strong></p><p>${esc(c.detail)}</p><p class="modal-note">${esc(c.hint)} As cores e formas s\u00e3o ilustrativas.</p><div class="button-row">${B.Audio.supported()&&B.Progress.get().settings.narration?btn('listen-detail','\u25b7 Ouvir explica\u00e7\u00e3o','secondary',`data-organelle="${id}"`):'<small>Para ouvir, ative a narra\u00e7\u00e3o nos ajustes. A voz depende do dispositivo.</small>'}${btn('close-modal','Fechar','primary')}</div>`);
 }
 function settings(preserve=false){
  currentScreen='settings';const s=B.Progress.get().settings;
  const toggle=(key,label,desc)=>`<div class="setting-row"><label for="set-${key}">${label}<small>${desc}</small></label><input id="set-${key}" data-setting="${key}" type="checkbox" ${s[key]?'checked':''}></div>`;
  mount(`<section class="panel">${heading('Do seu jeito','Escolha o que deixa a aventura mais confort\u00e1vel. Suas prefer\u00eancias s\u00e3o salvas automaticamente.','return')}<div class="mode-group" role="group" aria-label="Modos de acessibilidade">${[['calm','Modo tranquilo','Menos decora\u00e7\u00e3o, sem anima\u00e7\u00f5es nem sons.'],['standard','Modo padr\u00e3o','Cores vivas e movimento suave. Som desligado.'],['custom','Personalizado','Voc\u00ea escolhe cada prefer\u00eancia.']].map(([id,title,desc])=>`<button class="mode-button ${s.mode===id?'active':''}" data-action="mode" data-mode="${id}" aria-pressed="${s.mode===id}">${title}<small>${desc}</small></button>`).join('')}</div><div class="settings-grid"><section class="setting-group"><h2>Som e movimento</h2>${toggle('sound','Som de descoberta','Um som curto ao acertar. Nunca h\u00e1 som de erro.')}${toggle('narration','Permitir narra\u00e7\u00e3o','A voz s\u00f3 come\u00e7a quando voc\u00ea toca em Ouvir.')}${toggle('motion','Movimento suave','A prefer\u00eancia de reduzir movimento do dispositivo sempre tem prioridade.')}<p class="subnote">${B.Audio.supported()?'A voz pode exigir internet ou n\u00e3o estar dispon\u00edvel em portugu\u00eas.':'Este navegador n\u00e3o oferece a API de voz.'} Todo o jogo funciona sem \u00e1udio.</p></section><section class="setting-group"><h2>Visual e apoio</h2>${toggle('contrast','Contraste refor\u00e7ado','Textos e contornos com maior destaque.')}<div class="setting-row"><label for="set-size">Tamanho dos elementos</label><select id="set-size" data-setting="size"><option value="normal" ${s.size==='normal'?'selected':''}>Padr\u00e3o</option><option value="large" ${s.size==='large'?'selected':''}>Ampliado</option></select></div><div class="setting-row"><label for="set-complexity">Apoio na montagem<small>Ajuda continua dispon\u00edvel nos dois modos.</small></label><select id="set-complexity" data-setting="complexity"><option value="guided" ${s.complexity==='guided'?'selected':''}>Com nomes</option><option value="explore" ${s.complexity==='explore'?'selected':''}>Pelas formas</option></select></div><p class="subnote">Use toque, mouse ou Tab + Enter. Voc\u00ea nunca precisa arrastar para jogar.</p></section></div><div class="privacy-box"><strong>Seu progresso fica aqui.</strong> N\u00e3o pedimos nome, conta ou dados pessoais. Limpar os dados do navegador pode apagar as descobertas. O armazenamento \u00e9 separado por endere\u00e7o do jogo.</div><div class="button-row">${btn('return','Salvar e voltar','primary')}${btn('how','Como jogar','ghost')}</div><div class="danger-zone"><h2>Recome\u00e7ar a aventura</h2><p>Apaga fases e descobertas deste jogo. Suas prefer\u00eancias de acessibilidade ser\u00e3o mantidas.</p>${btn('reset-confirm','Reiniciar meu progresso','compact ghost')}</div></section>`,!preserve);
 }
 function how(){modal('Como jogar',`<img class="modal-art" src="assets/mascot/explaining.svg" alt="Bibi explicando"><div class="how-step"><strong>1</strong><p>Escolha uma das oito fases. Leia a instru\u00e7\u00e3o e toque em Come\u00e7ar.</p></div><div class="how-step"><strong>2</strong><p>Para montar, toque em uma organela e depois no encaixe. Voc\u00ea tamb\u00e9m pode arrastar a pe\u00e7a.</p></div><div class="how-step"><strong>3</strong><p>Nas perguntas, toque na resposta. Use Ajuda, tente de novo ou escolha outra fase quando precisar.</p></div><p class="modal-note">No teclado: Tab para navegar, Enter ou Espa\u00e7o para escolher. Escape fecha janelas. N\u00e3o h\u00e1 cron\u00f4metro, vidas ou puni\u00e7\u00f5es.</p><div class="button-row">${btn('close-modal','Entendi!','primary')}</div>`);}
 function route(){
  B.Audio.stop();B.Interactions.cancel();closeModal();const r=location.hash.slice(1)||'inicio';document.title='BioMundo \u2014 Aventura das C\u00e9lulas';
  if(r==='inicio')home();else if(r==='mapa')map();else if(r==='aprender')learn();else if(r==='ajustes')settings();
  else if(/^fase-[1-8]$/.test(r))intro(Number(r.slice(-1)));
  else if(/^jogar-[1-8]$/.test(r)){currentScreen='game';B.Game.start(Number(r.slice(-1)));}
  else if(/^conclusao-[1-8]$/.test(r))completion(Number(r.slice(-1)));else home();
 }
 B.UI={mount,announce,modal,closeModal,navigate};
 document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b||b.disabled)return;
  if(b.dataset.piece){B.Game.select(b.dataset.piece);return;}if(b.dataset.slot){B.Game.place(b.dataset.slot);return;}if(b.dataset.answer){B.Game.answer(b.dataset.answer);return;}
  const action=b.dataset.action;if(!action)return;
  switch(action){
   case 'home':navigate('inicio');break;case 'map':navigate('mapa');break;case 'learn':navigate('aprender');break;
   case 'intro':navigate(`fase-${b.dataset.id}`);break;case 'start':navigate(`jogar-${b.dataset.id}`);break;
   case 'continue':navigate(`jogar-${B.Progress.get().lastLevel}`);break;
   case 'repeat':B.Progress.resetDraft(Number(b.dataset.id));navigate(`jogar-${b.dataset.id}`);break;
   case 'settings':if(currentScreen!=='settings')returnRoute=location.hash.slice(1)||'inicio';navigate('ajustes');break;
   case 'return':navigate(returnRoute==='ajustes'?'inicio':returnRoute);break;
   case 'how':how();break;case 'detail':detail(b.dataset.organelle);break;
   case 'filter':filter=b.dataset.filter;learn(true);document.querySelector(`[data-filter="${filter}"]`)?.focus({preventScroll:true});break;
   case 'hint':B.Game.hint();break;case 'pause':B.Game.pause();break;
   case 'finish':B.Game.finish();break;case 'next-question':B.Game.next();break;
   case 'tray-prev':B.Game.page(-1);break;case 'tray-next':B.Game.page(1);break;
   case 'close-modal':B.Audio.stop();closeModal();break;
   case 'listen':B.Audio.speak(B.Game.instruction());break;
   case 'listen-detail':{const c=B.content[b.dataset.organelle];if(c){B.Audio.speak(`${c.name}. ${c.function} ${c.detail}`);b.textContent=B.Audio.isSpeaking()?'Parar voz':'Ouvir explica\u00e7\u00e3o';}break;}
   case 'mode':{const m=b.dataset.mode;B.Audio.stop();B.Progress.settings(m==='calm'?{mode:m,sound:false,narration:false,motion:false}:m==='standard'?{mode:m,sound:false,narration:false,motion:true,contrast:false,size:'normal'}:{mode:m});B.Access.apply();settings(true);document.querySelector(`[data-mode="${m}"].mode-button`)?.focus({preventScroll:true});announce('Prefer\u00eancias salvas.');break;}
   case 'restart-confirm':modal('Reiniciar esta fase?',`<p>Voc\u00ea volta ao in\u00edcio desta atividade. As fases j\u00e1 conclu\u00eddas e suas descobertas continuam salvas.</p><div class="button-row">${btn('close-modal','Cancelar','primary')}${btn('restart-now','Reiniciar fase','ghost')}</div>`);break;
   case 'restart-now':B.Game.restart();break;
   case 'reset-confirm':modal('Apagar seu progresso?',`<p>Isso apaga todas as fases conclu\u00eddas, atividades e estruturas conhecidas neste endere\u00e7o do jogo. Suas prefer\u00eancias de acessibilidade ser\u00e3o mantidas.</p><div class="button-row">${btn('close-modal','N\u00e3o apagar','primary')}${btn('reset-now','Sim, reiniciar progresso','ghost')}</div>`);break;
   case 'reset-now':B.Progress.reset();navigate('inicio');announce('Progresso reiniciado. Prefer\u00eancias mantidas.');break;
   case 'credits':modal('Feito para descobrir',`<p><strong>BioMundo \u2014 Aventura das C\u00e9lulas</strong><br>Vers\u00e3o 1.0 \u00b7 9 de outubro de 2026.</p><p>Jogo educativo criado com assist\u00eancia de IA, com ilustra\u00e7\u00f5es vetoriais originais e Bibi, uma personagem exploradora. N\u00e3o \u00e9 um instrumento diagn\u00f3stico nem uma interven\u00e7\u00e3o cl\u00ednica.</p><p>${esc(B.scienceNote)}</p><p class="source-links">Refer\u00eancias para confer\u00eancia cient\u00edfica: <a href="https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells" target="_blank" rel="noopener noreferrer">OpenStax, Biology 2e, 4.3</a> e <a href="https://openstax.org/books/biology-2e/pages/4-4-the-endomembrane-system-and-proteins" target="_blank" rel="noopener noreferrer">4.4</a>. Esses links externos exigem internet.</p><p class="modal-note">Progresso local, sem login e sem envio de dados pessoais. A narra\u00e7\u00e3o opcional depende do servi\u00e7o de voz do dispositivo.</p><div class="button-row">${btn('close-modal','Fechar','primary')}</div>`);break;
   case 'install':if(installEvent){installEvent.prompt();installEvent.userChoice.finally(()=>{installEvent=null;$('#install-button').hidden=true;});}break;
  }
 });
 document.addEventListener('change',e=>{
  const key=e.target.dataset.setting;if(!key)return;const value=e.target.type==='checkbox'?e.target.checked:e.target.value;
  B.Audio.stop();B.Progress.settings({[key]:value,mode:'custom'});B.Access.apply();document.querySelectorAll('.mode-button').forEach(b=>{b.classList.toggle('active',b.dataset.mode==='custom');b.setAttribute('aria-pressed',String(b.dataset.mode==='custom'));});announce('Prefer\u00eancia salva.');
 });
 $('#modal').addEventListener('cancel',()=>B.Audio.stop());
 $('#modal').addEventListener('close',()=>B.Audio.stop());
 document.addEventListener('biomundo:audio',()=>{document.querySelectorAll('.listen-label').forEach(e=>e.textContent=B.Audio.isSpeaking()?'Parar voz':'Ouvir');const b=document.querySelector('[data-action="listen-detail"]');if(b)b.textContent=B.Audio.isSpeaking()?'Parar voz':'Ouvir explica\u00e7\u00e3o';});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#modal').open&&currentScreen==='game'){e.preventDefault();B.Game.pause();}});
 function status(){
  $('#save-status').textContent=B.Progress.available()?'Progresso salvo neste dispositivo':'Armazenamento indispon\u00edvel: progresso s\u00f3 nesta sess\u00e3o';
  $('#offline-status').textContent=location.protocol==='file:'?'Arquivo local \u00b7 PWA requer hospedagem':offlineReady?(navigator.onLine?'Pronto para jogar offline':'Jogando offline'):offlineFailed?'Modo online \u00b7 cache indispon\u00edvel':canOffline?'Preparando recursos offline':'Offline requer HTTPS ou localhost';
 }
 document.addEventListener('biomundo:save',status);window.addEventListener('online',status);window.addEventListener('offline',status);
 window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvent=e;$('#install-button').hidden=false;});
 window.addEventListener('appinstalled',()=>{$('#install-button').hidden=true;installEvent=null;});
 if(canOffline){
  navigator.serviceWorker.register('./service-worker.js',{scope:'./'}).then(()=>navigator.serviceWorker.ready).then(()=>{offlineReady=true;status();}).catch(()=>{offlineFailed=true;status();});
 }
 B.Interactions.bind(id=>B.Game.select(id),id=>B.Game.place(id));
 window.addEventListener('hashchange',route);route();status();
})(Bio);
