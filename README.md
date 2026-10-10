# BioMundo — Aventura das Células

**Versão 1.0.0 | 09/10/2026 | Jogo educativo HTML5 em português**

Um universo inteiro dentro de uma célula. Explore, monte e aprenda com a Bibi: oito fases, 38 atividades e 11 estruturas, sem cronômetro, vidas ou ranking. Projeto estático independente, sem cadastro, banco de dados ou APIs obrigatórias.

**Estado da entrega:** código e oito fases implementados, com testes de interface e de lógica executados. **Validação em Android físico, persistência real após fechar o navegador e ciclo offline/PWA real pendentes.** Não houve publicação nem teste com estudantes.

![Tela inicial real](prints/01-inicio-desktop.png)

## Comece aqui

**No computador:** extraia todo o ZIP, entre na pasta `biomundo` e abra `index.html` no Chrome ou Edge. O atalho `INICIAR-WINDOWS.bat` faz essa abertura. Não abra o HTML de dentro do ZIP nem mova somente ele: mantenha `css`, `js` e `assets` juntos. A execução direta foi preparada sem módulos/imports nem downloads em tempo de jogo; a abertura `file://` não pôde ser homologada neste ambiente de testes.

**Para testar o aplicativo completo em ambiente local:** com Python 3 instalado, abra `SERVIDOR-LOCAL.bat` ou execute na pasta `biomundo`:

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Abra `http://localhost:8000` no navegador. Se o atalho abrir o navegador antes do servidor ficar pronto, aguarde alguns segundos e atualize. Pare o servidor com Ctrl+C. O servidor é só uma opção de teste: a publicação final pode ser totalmente estática.

**No Android:** o caminho recomendado é acessar a URL HTTPS depois da publicação no GitHub Pages, conforme `docs/publicacao.md`. O pacote não é um APK e nenhum link público foi criado.

## Objetivo educacional e público

Introdução à citologia para estudantes, com atenção a diferentes necessidades de leitura, movimento e estímulo sensorial. O aluno reconhece estruturas, relaciona funções e compara modelos animal e vegetal. Não é terapia, diagnóstico nem instrumento de avaliação clínica. Não presume que todos os estudantes autistas têm as mesmas preferências.

## As oito fases

| Fase | Nome | Mecânica | Atividades |
| --- | --- | --- | ---: |
| 1 | Conhecendo a Célula | Escolhas interativas | 3 |
| 2 | Explorando as Organelas | Montagem | 3 |
| 3 | Monte a Célula Animal | Montagem | 6 |
| 4 | Quem Faz o Quê? | Escolhas interativas | 5 |
| 5 | Conhecendo a Célula Vegetal | Escolhas interativas | 3 |
| 6 | Monte a Célula Vegetal | Montagem | 6 |
| 7 | Animal ou Vegetal? | Escolhas interativas | 6 |
| 8 | Mestre das Células | Escolhas interativas | 6 |

Todas as fases ficam acessíveis no mapa. Cada uma tem introdução, ajuda, atividade, feedback e conclusão. Uma resposta incorreta não retira progresso. O botão Ajuda oferece uma pista e permite continuar; nada avança sozinho. Fases concluídas podem ser repetidas.

## Como jogar

Na montagem, toque/clique em uma peça e depois no encaixe correspondente, ou arraste-a. Com teclado, use Tab para navegar e Enter/Espaço para selecionar e encaixar. As bandejas mostram no máximo três peças por vez; use as setas para outras peças. Escolha uma resposta nos desafios. Use Pausar, Ajuda ou Mapa sempre que precisar. Ao concluir as atividades, pressione **Concluir fase**.

## Conteúdo de Biologia

Membrana plasmática, citoplasma, núcleo, mitocôndria, ribossomos, retículo endoplasmático, complexo de Golgi, lisossomos, parede celular, cloroplastos e vacúolo central. A biblioteca Aprender oferece desenhos, nomes, funções e detalhes.

Os desenhos são modelos didáticos, sem escala real. Cores e encaixes não representam posições fixas na natureza. O jogo compara modelos selecionados, não todas as células existentes. Conteúdo e fontes: `docs/conteudo-educativo.md`.

## Acessibilidade e áudio

Modo tranquilo, padrão e personalizado; contraste reforçado; elementos ampliados; apoio visual por nomes e números; alternativas por toque, mouse e teclado; pausa; repetição sem penalidade. O jogo respeita `prefers-reduced-motion`. Som e narração começam desligados. A fala só inicia ao pressionar Ouvir, após habilitá-la nos ajustes. O mesmo botão interrompe a voz.

A narração usa `SpeechSynthesis` quando disponível; as vozes dependem do dispositivo e podem depender de rede. Todas as informações também aparecem como texto. Não foi validada a narração offline. Detalhes em `docs/acessibilidade.md`.

## Progresso e privacidade

O jogo implementa salvamento automático em `localStorage`, separado por caminho de publicação, para fases, atividades, estruturas conhecidas, preferências, última fase e rascunho parcial. Sem login, analytics ou envio de progresso a um servidor. O serviço opcional de voz é controlado pelo navegador/sistema operacional.

O rodapé informa quando o armazenamento está bloqueado: nesse caso, o jogo continua, mas os dados duram somente a sessão. Navegação privada, limpeza de dados, mudança de endereço ou de navegador podem afetar a persistência. `file://` tem comportamento de armazenamento dependente do navegador [fonte técnica: MDN, em `docs/fontes.md`]. Em Ajustes, reiniciar progresso exige confirmação e mantém as preferências de acessibilidade.

## PWA e offline

Manifest, ícones 192/512/maskable e Service Worker estão incluídos. O cache lista explicitamente os recursos locais de execução e é isolado pelo caminho da aplicação. Não intercepta outros aplicativos. Atualizações esperam as abas antigas fecharem.

A instalação e o cache exigem hospedagem apropriada, normalmente HTTPS ou localhost. Abrir o HTML por duplo clique não instala uma PWA. O botão Instalar jogo só aparece quando o navegador oferece essa opção; alternativamente, use o menu do navegador. O cache inclui o jogo e os SVGs, não a documentação, os prints ou serviços externos de voz. O comportamento real offline ainda exige o roteiro de `docs/testes.md`.

## Tecnologias e organização

HTML5, CSS3, JavaScript puro, SVG, PNG, WAV local, Web App Manifest, Service Worker e localStorage. Sem frameworks, dependências de execução, fontes remotas ou etapa de build obrigatória.

```text
biomundo/
  index.html                     entrada do jogo
  INICIAR-WINDOWS.bat             abertura direta
  SERVIDOR-LOCAL.bat              servidor local opcional
  manifest.webmanifest           metadados PWA
  service-worker.js              cache por escopo
  css/                           visual, responsivo e acessibilidade
  js/                            oito módulos de comportamento/conteúdo
  assets/                        Bibi, células, organelas, ícones e áudio
  docs/                          GDD, relatórios, guias e fontes
  prints/                        nove capturas reais da interface
  prompts/                       briefing e registro de decisões
  tests/                         testes e resultados executados
  tools/build_cache.py            regenera a lista do cache
  link_do_jogo.txt                publicação ainda não realizada
```

## Testes reproduzíveis

Lógica e contratos simulados, com Node.js:

```bash
node --test tests/unit.test.cjs
```

Interface, com Python e Playwright (dependências apenas de desenvolvimento):

```bash
python -m pip install playwright
python -m playwright install chromium
python tests/browser_test.py
```

A execução padrão tenta HTTP real, reload de armazenamento e offline real. Na entrega, a política do navegador de teste bloqueou a navegação HTTP/file; foi utilizada a alternativa documentada:

```bash
python tests/browser_test.py --embedded --browser /usr/bin/chromium
```

Resultado: **16 testes unitários + 60 verificações de interface aprovados**. O modo embedded renderiza o HTML/CSS/JS/SVG real em `about:blank`, carregando os recursos locais, mas **não valida persistência real entre recargas nem Service Worker real**. Os testes de toque são emulados e a voz é simulada. As evidências completas estão em `tests/` e a separação de pendências, em `docs/testes.md`.

## Manutenção

Conteúdo: `js/content.js`. Fases e posições: `js/levels.js`. Mecânicas: `js/game.js`. Interface: `js/main.js`. Depois de alterar arquivos de execução, incremente `VERSION` em `tools/build_cache.py`, execute `python tools/build_cache.py`, rode os testes e publique juntos HTML/CSS/JS/assets/worker. Não altere apenas o cache de uma versão em uso.

## Publicação

O guia `docs/publicacao.md` explica como enviar o **conteúdo da pasta biomundo** para a raiz de um repositório e ativar GitHub Pages. Não envie somente o ZIP. A publicação não foi executada; `link_do_jogo.txt` não contém URL fictícia.

## Créditos, IA e limitações

Projeto produzido com assistência de IA a partir do briefing fornecido pelo solicitante. SVGs originais e mascote em seis estados criados programaticamente para este projeto; conceito visual aprovado gerado por IA, preservado em `assets/references`. A interface jogável é uma adaptação vetorial leve e responsiva, não uma cópia pixel a pixel da imagem de conceito. Não foram copiadas figuras ou questões dos livros consultados. Veja `docs/declaracao-ia.md` e `docs/fontes.md`.

Não há validação com estudantes, certificação WCAG, teste em Android físico, instalação real ou comprovação de aprendizagem. Interface baseada em APIs de navegadores modernos. Não há sincronização entre dispositivos, contas individuais ou narração gravada. A revisão de um educador antes do uso em aula é recomendada.
