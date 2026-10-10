'use strict';
(function(B){
 const q=(id,prompt,options,answer,explanation,visual=answer)=>({id,prompt,options,answer,explanation,visual});
 B.levels=[
 {id:1,title:'Conhecendo a C\u00e9lula',kind:'quiz',cell:'animal',label:'Primeiras descobertas', intro:'Uma c\u00e9lula \u00e9 uma unidade b\u00e1sica dos seres vivos. Vamos conhecer tr\u00eas partes de um modelo animal.', objective:'Observe o desenho e escolha uma resposta.', summary:'Voc\u00ea reconheceu membrana, citoplasma e n\u00facleo.', questions:[
 q('membrane','Qual estrutura delimita a c\u00e9lula e regula a passagem de subst\u00e2ncias?',['nucleus','membrane','cytoplasm'],'membrane',B.content.membrane.function),
 q('cytoplasm','Qual \u00e9 a regi\u00e3o ao redor do n\u00facleo, com citosol e estruturas celulares?',['cytoplasm','nucleus','wall'],'cytoplasm',B.content.cytoplasm.function),
 q('nucleus','Qual estrutura abriga a maior parte do DNA neste modelo?',['mitochondrion','membrane','nucleus'],'nucleus',B.content.nucleus.function)
 ]},
 {id:2,title:'Explorando as Organelas',kind:'assembly',cell:'animal',label:'Tr\u00eas novas amigas',intro:'As organelas realizam tarefas diferentes. Vamos reconhecer n\u00facleo, mitoc\u00f4ndria e complexo de Golgi.',objective:'Toque em uma pe\u00e7a e depois no encaixe. Voc\u00ea tamb\u00e9m pode arrastar.',summary:'Voc\u00ea reconheceu tr\u00eas organelas e descobriu suas fun\u00e7\u00f5es.',pieces:['nucleus','mitochondrion','golgi']},
 {id:3,title:'Monte a C\u00e9lula Animal',kind:'assembly',cell:'animal',label:'Hora de montar',intro:'Vamos completar um modelo animal com seis organelas. Os encaixes s\u00e3o uma ajuda do jogo, n\u00e3o posi\u00e7\u00f5es fixas da natureza.',objective:'Escolha uma pe\u00e7a e encontre o encaixe com a mesma forma.',summary:'Voc\u00ea montou um modelo animal com seis organelas, al\u00e9m da membrana e do citoplasma.',pieces:['nucleus','mitochondrion','golgi','reticulum','ribosome','lysosome']},
 {id:4,title:'Quem Faz o Qu\u00ea?',kind:'quiz',cell:'animal',label:'Cada parte tem sua tarefa',intro:'Agora vamos relacionar as organelas ao que fazem. A Bibi pode dar uma dica sempre que precisar.',objective:'Leia a fun\u00e7\u00e3o e escolha a organela.',summary:'Voc\u00ea relacionou energia, prote\u00ednas, transporte e reciclagem \u00e0s estruturas celulares.',questions:[
 q('atp','Quem participa da respira\u00e7\u00e3o celular e da produ\u00e7\u00e3o de ATP?',['golgi','mitochondrion','lysosome'],'mitochondrion',B.content.mitochondrion.function,null),
 q('protein','Quem produz prote\u00ednas?',['ribosome','vacuole','membrane'],'ribosome',B.content.ribosome.function,null),
 q('recycle','Quem cont\u00e9m enzimas de digest\u00e3o e reciclagem no modelo animal?',['nucleus','chloroplast','lysosome'],'lysosome',B.content.lysosome.function,null),
 q('distribution','Quem modifica, organiza e encaminha prote\u00ednas e lip\u00eddios?',['cytoplasm','golgi','wall'],'golgi',B.content.golgi.function,null),
 q('network','Que rede tem uma parte rugosa ligada \u00e0 produ\u00e7\u00e3o de prote\u00ednas e uma parte lisa ligada \u00e0 produ\u00e7\u00e3o de lip\u00eddios?',['reticulum','lysosome','mitochondrion'],'reticulum',B.content.reticulum.function,null)
 ]},
 {id:5,title:'Conhecendo a C\u00e9lula Vegetal',kind:'quiz',cell:'plant',label:'Um mundo que floresce',intro:'Nosso modelo representa uma c\u00e9lula vegetal fotossintetizante. Observe a parede celular, os cloroplastos e o vac\u00faolo central.',objective:'Descubra tr\u00eas estruturas do modelo vegetal.',summary:'Voc\u00ea conheceu parede celular, cloroplastos e vac\u00faolo central.',questions:[
 q('wall','Qual camada externa ajuda na sustenta\u00e7\u00e3o e prote\u00e7\u00e3o?',['wall','nucleus','ribosome'],'wall',B.content.wall.function),
 q('photo','Quem realiza a fotoss\u00edntese neste modelo?',['mitochondrion','chloroplast','golgi'],'chloroplast',B.content.chloroplast.function),
 q('water','Qual grande bolsa ajuda no equil\u00edbrio de \u00e1gua e na sustenta\u00e7\u00e3o?',['lysosome','membrane','vacuole'],'vacuole',B.content.vacuole.function)
 ]},
 {id:6,title:'Monte a C\u00e9lula Vegetal',kind:'assembly',cell:'plant',label:'Monte e descubra',intro:'A parede celular e a membrana j\u00e1 est\u00e3o no contorno. Complete este modelo vegetal, que tamb\u00e9m possui mitoc\u00f4ndria e n\u00facleo.',objective:'Encaixe as seis pe\u00e7as. Use as formas e os nomes como pistas.',summary:'Voc\u00ea montou um modelo vegetal fotossintetizante e viu estruturas que ele compartilha com o animal.',pieces:['nucleus','mitochondrion','chloroplast','vacuole','ribosome','golgi']},
 {id:7,title:'Animal ou Vegetal?',kind:'quiz',cell:'both',label:'Parecidas e diferentes',intro:'Compare apenas os dois modelos did\u00e1ticos deste jogo. Algumas estruturas aparecem nos dois; outras s\u00e3o caracter\u00edsticas de um deles.',objective:'Escolha Animal, Vegetal ou As duas.',summary:'Voc\u00ea comparou os modelos e reconheceu semelhan\u00e7as e diferen\u00e7as.',questions:[
 q('nucleus','Em qual dos nossos modelos aparece o n\u00facleo?',['animal','plant','both'],'both','Os dois modelos t\u00eam n\u00facleo.','nucleus'),
 q('mito','Em qual dos nossos modelos aparece a mitoc\u00f4ndria?',['animal','plant','both'],'both','C\u00e9lulas vegetais tamb\u00e9m realizam respira\u00e7\u00e3o celular.','mitochondrion'),
 q('wall','Em qual dos nossos modelos aparece a parede celular?',['animal','plant','both'],'plant','Ela aparece no modelo vegetal, por fora da membrana. Tamb\u00e9m h\u00e1 paredes celulares em outros grupos de seres vivos.','wall'),
 q('chloro','Em qual dos nossos modelos aparecem cloroplastos?',['animal','plant','both'],'plant','Nosso modelo vegetal \u00e9 fotossintetizante. Nem toda c\u00e9lula vegetal tem cloroplastos.','chloroplast'),
 q('ribosome','Em qual dos nossos modelos aparecem ribossomos?',['animal','plant','both'],'both','Os dois modelos possuem ribossomos, que produzem prote\u00ednas.','ribosome'),
 q('lysosome','Em qual modelo deste jogo destacamos lisossomos?',['animal','plant','both'],'animal','No modelo animal. Em plantas, vac\u00faolos l\u00edticos exercem fun\u00e7\u00f5es digestivas semelhantes.','lysosome')
 ]},
 {id:8,title:'Mestre das C\u00e9lulas',kind:'quiz',cell:'both',label:'Sua grande descoberta',intro:'Vamos revisar o que voc\u00ea explorou. Sem pressa: releia, pe\u00e7a ajuda e tente novamente quantas vezes precisar.',objective:'Use suas descobertas para responder.',summary:'Voc\u00ea revisou estruturas, fun\u00e7\u00f5es e diferen\u00e7as entre os modelos. Continue explorando!',questions:[
 q('membrane','A c\u00e9lula vegetal tamb\u00e9m possui membrana plasm\u00e1tica?',['yes','no'],'yes','Sim. A membrana fica por dentro da parede celular.',null),
 q('dna','Quem abriga a maior parte do DNA nos nossos modelos?',['nucleus','golgi','vacuole'],'nucleus',B.content.nucleus.function,null),
 q('mito','C\u00e9lulas vegetais tamb\u00e9m possuem mitoc\u00f4ndrias?',['yes','no'],'yes','Sim. Mitoc\u00f4ndrias participam da respira\u00e7\u00e3o celular em c\u00e9lulas animais e vegetais.',null),
 q('photo','Todas as c\u00e9lulas vegetais possuem cloroplastos?',['yes','no'],'no','N\u00e3o. Muitas c\u00e9lulas das ra\u00edzes, por exemplo, n\u00e3o t\u00eam cloroplastos.',null),
 q('proteins','Qual estrutura produz prote\u00ednas?',['chloroplast','ribosome','wall'],'ribosome',B.content.ribosome.function,null),
 q('positions','As organelas t\u00eam sempre os mesmos lugares e cores dos nossos desenhos?',['yes','no'],'no','N\u00e3o. As cores e os encaixes s\u00e3o recursos did\u00e1ticos. As posi\u00e7\u00f5es variam e as figuras n\u00e3o est\u00e3o em escala.',null)
 ]}
 ];
 B.level=(id)=>B.levels.find(l=>l.id===Number(id));
 B.totalActivities=B.levels.reduce((n,l)=>n+(l.pieces||l.questions).length,0);
 B.positions={
 animal:{nucleus:[50,48,29,29],mitochondrion:[26,31,24,23],golgi:[50,77,24,22],reticulum:[71,35,23,22],ribosome:[71,68,20,20],lysosome:[25,67,20,20]},
 plant:{nucleus:[25,28,24,25],mitochondrion:[69,77,23,22],chloroplast:[71,30,23,23],vacuole:[50,55,34,35],ribosome:[25,72,20,20],golgi:[49,23,21,21]}
 };
})(Bio);
