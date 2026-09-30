const app=document.querySelector('#app');
let mode=null,index=0,answers=[],locked=false,screen='home';
let transitioning=false,viewVersion=0,feedbackAnimation=null;
const meta={memory:{name:'추억 퀴즈',art:1,color:'green'},mz:{name:'MZ 퀴즈',art:22,color:'purple'}};
function home(){viewVersion++;transitioning=false;document.body.classList.remove('result-screen');screen='home';mode=null;app.innerHTML=`<section class="intro reveal"><div class="eyebrow">GENERATION TOGETHER</div><h1>너의 요즘, 나의 그때.<br><em>퀴즈로 함께 만나요</em></h1><p>익숙해서 반갑고, 새로워서 재밌는 우리들의 이야기</p></section><div class="choices"><button class="course memory reveal delay1" data-start="memory"><span class="tag">그때 그 시절</span><h2>추억 퀴즈</h2><p>연탄부터 다이얼 전화기까지,<br>그 시절의 일상을 만나볼까요?</p><div class="course-art"><img src="assets/art-1.webp" alt="새마을 깃발을 든 3D 캐릭터와 옛 마을"></div><div class="course-bottom"><small>10문제 · 약 3분</small><span class="start">추억 만나러 가기 <span class="arrow">↗</span></span></div></button><button class="course mz reveal delay2" data-start="mz"><span class="tag">요즘 우리 이야기</span><h2>MZ 퀴즈</h2><p>숏폼부터 갓생까지,<br>요즘의 일상을 알아볼까요?</p><div class="course-art"><img src="assets/art-22.webp" alt="스마트폰을 함께 보는 세 명의 3D 캐릭터"></div><div class="course-bottom"><small>10문제 · 약 3분</small><span class="start">요즘 만나러 가기 <span class="arrow">↗</span></span></div></button></div><div class="how reveal delay3"><span>정답을 고르고</span><span>새로운 이야기를 알고</span><span>한 걸음 더 가까이</span></div>`;app.querySelectorAll('[data-start]').forEach(b=>b.onclick=()=>start(b.dataset.start));app.querySelectorAll('.course').forEach(b=>{b.onpointermove=e=>{if(e.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=b.getBoundingClientRect();b.style.setProperty('--mx',`${(e.clientX-r.left-r.width/2)*.022}px`);b.style.setProperty('--my',`${(e.clientY-r.top-r.height/2)*.022-4}px`)};b.onpointerleave=()=>{b.style.setProperty('--mx','0px');b.style.setProperty('--my','-5px')}})}
function start(m){viewVersion++;transitioning=false;document.body.classList.remove('result-screen');mode=m;index=0;answers=[];screen='quiz';renderQuiz();window.scrollTo(0,0)}
home();
const quizzes={mz:[
['SNS에서 세로로 짧게 소비하는 영상을 일반적으로 무엇이라고 할까요?',['웹진','스냅북','숏폼','미니컷'],2,22,'짧은 길이의 영상 콘텐츠를 ‘숏폼’이라고 불러요.'],
['‘스불재’라고 말하기 가장 자연스러운 상황은?',['친구 때문에 계획이 틀어졌을 때','예상치 못한 행운이 생겼을 때','인터넷 연결이 갑자기 끊겼을 때','본인이 벌인 일 때문에 스스로 곤란해졌을 때'],3,20,'‘스스로 불러온 재앙’을 줄인 말이에요.'],
['누군가 친구가 산 옷이나 물건을 보고 똑같은 제품을 따라 샀을 때 쓰는 표현은?',['플렉스했다','손민수했다','덕계못했다','스불재했다'],1,25,'다른 사람이 가진 옷이나 물건을 따라 사는 일을 ‘손민수했다’고 표현해요.'],
['일정한 기간 동안만 열리는 브랜드 매장을 무엇이라고 부를까요?',['팝업스토어','플래그숍','소셜스토어','멀티숍'],0,24,'팝업스토어는 정해진 기간에만 잠깐 문을 여는 매장이에요.'],
['인터넷에서 ‘밈’이 만들어지는 과정과 가장 가까운 것은?',['유명인이 사용한 표현만 공식적으로 밈이 된다','같은 영상을 여러 플랫폼에 그대로 복사한다','인기 게시물이 일정 시간이 지나면 자동으로 저장된다','하나의 이미지나 표현이 여러 사람이 따라 하며 조금씩 변형되어 퍼진다'],3,23,'여러 사람이 따라 하고 새롭게 변형하며 퍼지는 것이 밈의 특징이에요.'],
['SNS에서 ‘무물’이라고 적혀 있다면 무슨 뜻일까요?',['아무 말이나 해주세요','아무 사진이나 올려주세요','무엇이든 물어보세요','물건을 무료로 드립니다'],2,16,'‘무엇이든 물어보세요’를 줄여 ‘무물’이라고 해요.'],
['‘꾸안꾸’ 스타일을 가장 정확하게 설명한 것은?',['정말 아무것도 신경 쓰지 않고 입는 스타일','자연스러워 보이지만 실제로는 신경 써서 연출한 스타일','화려하게 꾸민 뒤 최대한 티 나게 연출하는 스타일','유행하는 옷을 그대로 따라 입는 스타일'],1,21,'‘꾸민 듯 안 꾸민 듯’ 자연스러운 멋을 뜻해요.'],
['‘갓생을 산다’는 표현과 가장 가까운 의미는?',['계획적이고 부지런하게 생활한다','비싼 물건을 많이 산다','밤에만 활동한다','게임을 오래 한다'],0,19,'부지런하게 계획을 실천하는 생활을 ‘갓생’이라고 표현해요.'],
['SNS에서 ‘챌린지’가 유행한다는 말과 가장 가까운 상황은?',['인기 게시물을 그대로 캡처해서 올린다','같은 동작·노래·행동 형식을 여러 사람이 각자 따라 해 콘텐츠를 올린다','매일 같은 시간에 SNS에 접속한다','서로 다른 사람의 계정 비밀번호를 맞힌다'],1,17,'같은 형식을 각자의 방식으로 따라 하며 참여하는 콘텐츠예요.'],
['‘소확행’과 가장 가까운 의미는?',['소소하지만 확실한 행복','소비를 확실히 하는 행동','소득을 확실히 늘리는 방법','소문을 확인하는 행동'],0,18,'일상 속에서 느끼는 작지만 확실한 행복을 말해요.']
],memory:[
['연탄을 갈 때 새 연탄을 기존 연탄 위에 올리면서 특히 신경 써야 했던 것은?',['연탄 사이에 신문지를 넣는 것','두 연탄의 구멍을 서로 맞추는 것','새 연탄을 물에 살짝 적시는 것','새 연탄을 거꾸로 올리는 것'],1,4,'구멍을 맞추어 공기가 통하고 불이 옮겨붙도록 했어요.'],
['1970년대 가정에서 텔레비전 채널을 바꿀 때 흔히 사용했던 방법은?',['안테나 방향을 바꾼다','채널표를 교체한다','TV 본체의 채널 다이얼을 돌린다','화면 조절 손잡이를 돌린다'],2,3,'TV 본체에 달린 채널 다이얼을 직접 돌려 채널을 바꿨어요.'],
['1970년대 학교에서 학생들의 도시락을 검사했던 주된 이유는?',['반찬의 개수를 확인하기 위해','도시락의 위생 상태를 확인하기 위해','양은 도시락 사용 여부를 확인하기 위해','보리나 잡곡을 섞었는지 확인하기 위해'],3,5,'혼분식 장려 당시, 쌀밥에 보리나 잡곡을 섞었는지 확인했어요.'],
['흑백 텔레비전 화면이 위아래로 계속 흘러가듯 움직일 때 조절하던 기능은?',['수직동기 조절','명암 조절','채널 미세조정','음색 조절'],0,7,'수직동기를 조절해 위아래로 흐르는 화면을 안정시켰어요.'],
['1960~70년대 장려됐던 ‘혼분식’과 가장 가까운 식생활은?',['쌀밥 대신 잡곡밥만 먹는 것','쌀에 잡곡을 섞고 밀가루 음식도 함께 먹는 것','하루 한 끼만 밥을 먹는 것','밥 대신 감자와 고구마만 먹는 것'],1,9,'‘혼식’은 쌀에 잡곡을 섞는 것, ‘분식’은 밀가루 음식 등을 먹는 것이에요.'],
['1970년대 야간 통행금지가 시행되던 당시, 자정 무렵 통행금지 시작을 알리던 것으로 잘 알려진 것은?',['종소리','라디오 시보','경찰 호루라기','사이렌'],3,2,'자정 무렵 울리는 사이렌으로 통행금지 시작을 알렸어요.'],
['다이얼식 전화기로 특정 번호를 걸 때 사용했던 방법은?',['원하는 숫자 위치까지 다이얼을 돌렸다가 놓는다','원하는 숫자만큼 수화기를 두드린다','숫자마다 다이얼을 짧게 눌렀다 놓는다','먼저 교환원에게 번호를 말한다'],0,6,'숫자 구멍에 손가락을 넣어 멈춤쇠까지 돌린 뒤 놓았어요.'],
['1970년대 버스 안내양이 버스가 출발해도 된다는 뜻으로 흔히 외쳤던 말은?',['갑니다','출발이요','오라이','다 탔어요'],2,8,'‘오라이’는 버스가 출발해도 된다는 신호로 쓰였어요.'],
['과거 영화관에서 본 영화가 시작되기 전 정부 소식과 국내 뉴스를 영상으로 보여주던 것은?',['한국소식','대한뉴스','국민시보','중앙뉴스'],1,0,'영화 상영 전 뉴스 영상인 ‘대한뉴스’를 보여주었어요.'],
['1970년대 ‘새마을노래’의 첫 구절에 등장하는 것은?',['새벽종','기적소리','학교종','풍경소리'],0,1,'첫 구절에 등장하는 것은 ‘새벽종’이에요.']
]};
function renderQuiz(preserveCard=false){locked=false;screen='quiz';const q=quizzes[mode][index];const markup=`<div class="quiz-top"><button class="back" id="back">← 퀴즈 선택</button><span class="pill">${meta[mode].name}</span><span class="quiz-count"><b>${String(index+1).padStart(2,'0')}</b> / 10</span></div><div class="quiz-illustration"><img src="assets/art-${q[3]}.webp" alt="${meta[mode].name} ${index+1}번 문제의 상황 일러스트"></div><section class="quiz-card"><div class="progress" role="progressbar" aria-label="퀴즈 진행률" aria-valuenow="${answers.length}" aria-valuemin="0" aria-valuemax="10"><span style="width:${answers.length*10}%"></span></div><div class="question-label">QUESTION ${String(index+1).padStart(2,'0')}</div><h1 tabindex="-1" id="question">${q[0]}</h1><div class="answers">${q[1].map((a,i)=>`<button class="answer" style="--i:${i}" data-answer="${i}"><span class="num">${i+1}</span><span>${a}</span><span class="mark"></span></button>`).join('')}</div><div id="feedback" aria-live="polite"></div></section><p class="keyboard">숫자 1–4로 선택 · Enter로 다음 문제</p>`;
 if(preserveCard){
  const template=document.createElement('template');template.innerHTML=markup;
  const fresh=template.content,card=app.querySelector('.quiz-card'),progress=card.querySelector('.progress');
  const incoming=fresh.querySelector('.quiz-card');incoming.querySelector('.progress').replaceWith(progress);
  card.replaceChildren(...incoming.childNodes);
  const illustration=app.querySelector('.quiz-illustration');illustration.getAnimations().forEach(a=>a.cancel());
  illustration.replaceChildren(...fresh.querySelector('.quiz-illustration').childNodes);
  app.querySelector('.quiz-count').innerHTML=fresh.querySelector('.quiz-count').innerHTML;
 }else{app.innerHTML=markup}
 document.querySelector('#back').onclick=askHome;app.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>choose(Number(b.dataset.answer)));attachAnswerTilt();staggerText(document.querySelector('#question'),0,9);if(index>0)document.querySelector('#question').focus({preventScroll:true});const next=quizzes[mode][index+1];if(next){const im=new Image();im.src=`assets/art-${next[3]}.webp`}}
function choose(n){if(screen!=='quiz'||locked||transitioning||!Number.isInteger(n)||n<0||n>3)return false;locked=true;answers.push(n);const q=quizzes[mode][index],correct=n===q[2];app.querySelectorAll('.answer').forEach((b,i)=>{b.disabled=true;resetTilt(b);if(i===q[2]){b.classList.add('correct');b.querySelector('.mark').textContent='✓';b.setAttribute('aria-label',`${i+1}. ${q[1][i]} — 정답`)}else if(i===n){b.classList.add('wrong');b.querySelector('.mark').textContent='×';b.setAttribute('aria-label',`${i+1}. ${q[1][i]} — 선택한 오답`)}else b.classList.add('dim')});document.querySelector('.progress span').style.width=`${answers.length*10}%`;document.querySelector('.progress').setAttribute('aria-valuenow',answers.length);document.querySelector('#feedback').innerHTML=`<div class="feedback"><div><h2>${correct?'정답이에요! 잘 알고 계시네요.':'괜찮아요, 하나 더 알게 됐어요!'}</h2><p>${correct?'':`정답은 ${q[2]+1}번. `}${q[4]}</p></div><button class="primary" id="next">${index===9?'결과 보기':'다음 문제'} <span aria-hidden="true">→</span></button></div>`;document.querySelector('#next').onclick=nextQuestion;expandFeedback();if(correct)celebrate(17);return true}
async function nextQuestion(){
 if(!locked||screen!=='quiz'||transitioning)return;
 transitioning=true;const version=viewVersion;
 const card=app.querySelector('.quiz-card'),feedback=app.querySelector('#feedback');
 app.querySelector('#next').disabled=true;
 if(!reducedMotion()){
  const current=feedback.getBoundingClientRect().height;
  feedbackAnimation?.cancel();feedback.style.height=`${current}px`;
  const collapse=feedback.animate([{height:`${current}px`,opacity:1},{height:'0px',opacity:0}],{duration:480,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'});
  feedback.querySelector('.feedback').animate([{transform:'translateY(0)',opacity:1},{transform:'translateY(-14px)',opacity:0}],{duration:270,fill:'forwards',easing:'ease-in'});
  const outgoing=[app.querySelector('.quiz-illustration'),card.querySelector('.question-label'),card.querySelector('h1'),...card.querySelectorAll('.answer-cell')];
  const motions=outgoing.map((el,i)=>el.animate([{opacity:1,translate:'0 0'},{opacity:0,translate:'0 -28px'}],{duration:380,delay:180+i*35,easing:'cubic-bezier(.4,0,.6,1)',fill:'forwards'}));
  if(window.scrollY>120)window.scrollTo({top:0,behavior:'smooth'});
  await Promise.allSettled([collapse.finished,...motions.map(a=>a.finished)]);
 }
 if(version!==viewVersion)return;
 const previousHeight=card.getBoundingClientRect().height;
 index++;if(index===10){result()}else{
  renderQuiz(true);
  if(!reducedMotion()){
   const newCard=app.querySelector('.quiz-card'),targetHeight=newCard.getBoundingClientRect().height;
   const resize=newCard.animate([{height:`${previousHeight}px`},{height:`${targetHeight}px`}],{duration:600,easing:'cubic-bezier(.25,.1,.25,1)'});
   await Promise.allSettled([resize.finished]);
  }
 }
 if(version===viewVersion)transitioning=false;
}
function result(){document.body.classList.add('result-screen');screen='result';const qs=quizzes[mode],score=answers.filter((a,i)=>a===qs[i][2]).length;const rank=resultRanks[mode][rankIndex(score)];app.innerHTML=`<section class="result reveal"><img class="result-art character" src="assets/art-${rank.art}.webp" alt="${rank.title}"><div class="eyebrow">${meta[mode].name} 완료</div><h1>${rank.title}</h1><div class="score">${score}<small> / 10문제</small></div><p class="rank-description">${rank.description}</p><div class="result-actions"><button class="primary" id="other">${mode==='memory'?'MZ 퀴즈':'추억 퀴즈'}도 풀어보기 →</button><button class="secondary" id="retry">한 번 더 풀기</button></div><details class="review"><summary>정답과 내 답변 돌아보기</summary>${qs.map((q,i)=>`<div class="review-item"><b>${i+1}. ${q[0]}</b><p class="${answers[i]===q[2]?'ok':'miss'}">${answers[i]===q[2]?'✓ 정답':'× 내 답변'} · ${q[1][answers[i]]}</p>${answers[i]!==q[2]?`<p class="ok">정답 · ${q[1][q[2]]}</p>`:''}<p>${q[4]}</p></div>`).join('')}</details></section>`;staggerText(app.querySelector('.result h1'),180,25);staggerText(app.querySelector('.rank-description'),320,12);document.querySelector('#other').onclick=()=>start(mode==='memory'?'mz':'memory');document.querySelector('#retry').onclick=()=>start(mode);celebrate(40)}
function celebrate(n){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const box=document.querySelector('#confetti');for(let i=0;i<n;i++){const p=document.createElement('i');p.className='confetto';p.style.cssText=`background:${['#8bb897','#ecc986','#c4b6dd','#e5afa6'][i%4]};--x:${(Math.random()-.5)*750}px;--y:${Math.random()*400-160}px;--r:${Math.random()*720}deg`;box.appendChild(p);setTimeout(()=>p.remove(),1600)}}
const leave=document.querySelector('#leave');function askHome(){if(screen==='quiz'){leave.showModal()}else{home();window.scrollTo(0,0)}}document.querySelectorAll('[data-home]').forEach(b=>b.onclick=askHome);document.querySelector('#stay').onclick=()=>leave.close();document.querySelector('#exit').onclick=()=>{leave.close();home();window.scrollTo(0,0)};
document.addEventListener('keydown',e=>{if(leave.open||e.altKey||e.metaKey||e.ctrlKey||e.repeat)return;if(screen==='quiz'&&/^[1-4]$/.test(e.key)){e.preventDefault();choose(Number(e.key)-1)}else if(screen==='quiz'&&locked&&e.key==='Enter'&&document.activeElement.tagName!=='BUTTON'){e.preventDefault();nextQuestion()}});
if(document.modelContext?.registerTool){const definitions=[{name:'read_quiz_state',description:'현재 퀴즈 상태와 문제, 선택지를 읽습니다.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:()=>({screen,mode,question:screen==='quiz'?quizzes[mode][index][0]:null,options:screen==='quiz'?quizzes[mode][index][1]:null,answered:answers.length,awaitingNext:locked})},{name:'start_quiz',description:'추억 또는 MZ 퀴즈를 처음부터 시작합니다. 기존 진행 상황은 초기화됩니다.',inputSchema:{type:'object',properties:{mode:{type:'string',enum:['memory','mz']}},required:['mode'],additionalProperties:false},execute:input=>{if(!['memory','mz'].includes(input.mode))throw Error('유효하지 않은 퀴즈');start(input.mode);return{screen,mode}}},{name:'submit_quiz_answer',description:'현재 문제에 1~4 중 하나의 답을 제출하고 채점합니다.',inputSchema:{type:'object',properties:{answer:{type:'integer',minimum:1,maximum:4}},required:['answer'],additionalProperties:false},execute:input=>{if(!choose(input.answer-1))throw Error('답변할 수 없는 상태 또는 유효하지 않은 답변');return{correct:input.answer-1===quizzes[mode][index][2],answered:answers.length}}},{name:'next_quiz_question',description:'채점된 문제에서 다음 문제 또는 결과 화면으로 이동합니다.',inputSchema:{type:'object',properties:{},additionalProperties:false},execute:async()=>{if(!locked||screen!=='quiz'||transitioning)throw Error('먼저 답변을 제출하고 전환이 끝날 때까지 기다리세요');await nextQuestion();return{screen,number:screen==='quiz'?index+1:null}}}];for(const def of definitions){try{Promise.resolve(document.modelContext.registerTool(def)).catch(()=>{})}catch{}}}

const resultRanks={
 mz:[
  {title:'피처폰 직장인',art:28,description:'요즘 말은 조금 낯설어도 괜찮아요. 새로운 이야기를 하나씩 알아가는 중!'},
  {title:'카톡만 하는 삼촌',art:27,description:'카톡은 익숙하지만 요즘 유행은 아직 탐색 중이에요.'},
  {title:'인생네컷 고등학생',art:26,description:'친구들과 사진 한 장! 요즘 감성을 제법 알고 있네요.'},
  {title:'팝업 투어 대학생',art:30,description:'새로운 공간과 유행을 찾아다니는 요즘 문화 탐험가예요.'},
  {title:'틱톡 크리에이터',art:29,description:'숏폼부터 챌린지까지, 요즘 트렌드에 완벽하게 적응했어요.'},
  {title:'트렌드 인플루언서',art:31,description:'유행을 따라가는 걸 넘어 이끄는 수준! MZ 퀴즈를 모두 맞혔어요.'}
 ],
 memory:[
  {title:'2020년대에서 온 손주',art:10,description:'스마트폰은 잘하지만 회수권을 보여주면 쿠폰인 줄 압니다.'},
  {title:'골목대장 꼬마',art:12,description:'구슬치기와 딱지는 자신 있지만 대한뉴스는 아직 어렵습니다.'},
  {title:'국민학교 5학년',art:11,description:'혼분식 도시락 검사 날까지 슬슬 익숙해지고 있습니다.'},
  {title:'버스 안내양',art:15,description:'“뒤로 좀 들어가세요~ 오라이!”가 자연스럽게 나오는 단계입니다.'},
  {title:'명동 통기타 청년',art:14,description:'청바지, 통기타, 음악감상실까지 그 시절 청년문화 완전 적응 완료.'},
  {title:'새마을 이장님',art:13,description:'새벽종 울리기도 전에 이미 마을회관에 나와 계실 것 같습니다.'}
 ]
};
function rankIndex(score){return score<=2?0:score<=4?1:score<=6?2:score<=8?3:score===9?4:5}
function reducedMotion(){return matchMedia('(prefers-reduced-motion: reduce)').matches}
function staggerText(element,base=100,step=16){
 if(!element||reducedMotion())return;
 const text=element.textContent;element.setAttribute('aria-label',text);element.textContent='';
 let position=0;
 for(const word of text.split(/(\s+)/)){
  if(/^\s+$/.test(word)){element.append(document.createTextNode(word));continue}
  const group=document.createElement('span');group.className='text-word';group.setAttribute('aria-hidden','true');
  for(const char of Array.from(word)){const span=document.createElement('span');span.className='text-char';span.style.setProperty('--delay',`${base+Math.min(position*step,600)}ms`);span.textContent=char;group.append(span);position++}
  element.append(group);
 }
}
function expandFeedback(){
 const container=document.querySelector('#feedback');
 if(reducedMotion())return;
 // Finalize text wrapping before measuring; animating toward the old height caused a final jump.
 staggerText(container.querySelector('h2'),180,18);staggerText(container.querySelector('p'),280,12);
 const height=container.getBoundingClientRect().height;
 feedbackAnimation=container.animate([{height:'0px',opacity:0},{height:`${height}px`,opacity:1}],{duration:760,easing:'cubic-bezier(.25,.1,.25,1)'});
 container.querySelector('.primary').animate([{opacity:0,translate:'0 10px'},{opacity:1,translate:'0 0'}],{duration:500,delay:220,fill:'backwards',easing:'cubic-bezier(.25,.1,.25,1)'});
}
function resetTilt(button){button.classList.add('settling');button.style.setProperty('--rx','0deg');button.style.setProperty('--ry','0deg');button.style.setProperty('--px','0px');button.style.setProperty('--py','0px');button.classList.remove('tilting')}
function attachAnswerTilt(){
 app.querySelectorAll('.answer').forEach(button=>{
  // The grid cell is stationary, even while its button rotates.
  const cell=document.createElement('div');cell.className='answer-cell';button.replaceWith(cell);cell.append(button);
  cell.addEventListener('pointermove',event=>{
   if(event.pointerType!=='mouse'||button.disabled||reducedMotion())return;
   const r=cell.getBoundingClientRect(),x=Math.max(-1,Math.min(1,(event.clientX-r.left)/r.width*2-1)),y=Math.max(-1,Math.min(1,(event.clientY-r.top)/r.height*2-1));
   button.classList.remove('settling');button.classList.add('tilting');button.style.setProperty('--rx',`${-y*7}deg`);button.style.setProperty('--ry',`${x*9}deg`);button.style.setProperty('--px',`${x*6}px`);button.style.setProperty('--py',`${y*4}px`);
  });
  cell.addEventListener('pointerleave',()=>resetTilt(button));cell.addEventListener('pointercancel',()=>resetTilt(button));button.addEventListener('blur',()=>resetTilt(button));
 });
}
