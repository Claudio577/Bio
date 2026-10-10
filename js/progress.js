/* Defensive, local-only persistence. No identity, tracking, cookies or network writes. */
'use strict';
(function(B){
 const KEY='biomundo:v1:'+location.pathname.replace(/[^/]*$/,'');
 const defaultSettings=()=>({mode:'standard',sound:false,narration:false,motion:true,contrast:false,size:'normal',complexity:'guided'});
 const defaults=()=>({version:1,completed:[],activities:[],known:[],lastLevel:1,drafts:{},settings:defaultSettings()});
 const validActivities=new Set(B.levels.flatMap(l=>(l.pieces||l.questions.map(q=>q.id)).map(id=>`${l.id}:${id}`)));
 const list=(a,test)=>Array.isArray(a)?[...new Set(a.filter(test))]:[];
 function normalize(raw){
  const d=defaults(); if(!raw||typeof raw!=='object'||raw.version!==1)return d;
  d.completed=list(raw.completed,v=>Number.isInteger(v)&&v>=1&&v<=8);
  d.known=list(raw.known,v=>Object.hasOwn(B.content,v));
  d.activities=list(raw.activities,v=>validActivities.has(v));
  if(B.level(raw.lastLevel))d.lastLevel=Number(raw.lastLevel);
  const s=raw.settings||{};
  for(const k of ['sound','narration','motion','contrast'])if(typeof s[k]==='boolean')d.settings[k]=s[k];
  if(['standard','calm','custom'].includes(s.mode))d.settings.mode=s.mode;
  if(['normal','large'].includes(s.size))d.settings.size=s.size;
  if(['guided','explore'].includes(s.complexity))d.settings.complexity=s.complexity;
  if(d.settings.mode==='calm'){d.settings.sound=false;d.settings.motion=false;}
  for(const l of B.levels){
   const r=raw.drafts&&raw.drafts[l.id]; if(!r||typeof r!=='object')continue;
   d.drafts[l.id]={placed:list(r.placed,v=>l.pieces&&l.pieces.includes(v)),step:Math.max(0,Math.min(Number.isInteger(r.step)?r.step:0,(l.questions||[]).length-1)),answered:r.answered===true};
  }
  return d;
 }
 let available=true,state=defaults();
 try {state=normalize(JSON.parse(localStorage.getItem(KEY)||'null'));localStorage.setItem(KEY,JSON.stringify(state));}catch(e){available=false;}
 function save(){
  try{localStorage.setItem(KEY,JSON.stringify(state));available=true;}catch(e){available=false;}
  document.dispatchEvent(new CustomEvent('biomundo:save',{detail:{available}}));
 }
 B.Progress={key:KEY,normalize,defaults,get:()=>state,available:()=>available,save,
 settings(patch){state.settings=normalize({...state,settings:{...state.settings,...patch}}).settings;save();},
 visit(id){state.lastLevel=id;save();},
 draft(id,draft){state.drafts[id]={placed:[...draft.placed],step:draft.step,answered:draft.answered};save();},
 resetDraft(id){delete state.drafts[id];save();},
 learn(id){if(Object.hasOwn(B.content,id)&&!state.known.includes(id)){state.known.push(id);save();}},
 activity(level,id){const key=`${level}:${id}`;if(validActivities.has(key)&&!state.activities.includes(key)){state.activities.push(key);save();}},
 complete(id){if(B.level(id)&&!state.completed.includes(id))state.completed.push(id);delete state.drafts[id];save();},
 reset(){const settings=state.settings;state=defaults();state.settings=settings;save();},
 };
})(Bio);
