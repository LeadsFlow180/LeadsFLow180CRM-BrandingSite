import { rooms, roomIds, wings, roomFromHash, frameSize, clampPan } from './rooms.js';
const $ = id => document.getElementById(id);
const stage = $('stage'), frame = $('photoFrame'), photo = $('scenePhoto'), bleed = $('sceneBleed');
let current='hallway', requested='hallway', generation=0, pan=0, sizing, dragging=null, animation=null;
let tiltX=0, tiltY=0, targetTiltX=0, targetTiltY=0, tiltRaf=null, enterDir=1;
let reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
try { const pref=localStorage.getItem('lf180-tour-reduced-motion'); if(pref!==null) reduced=pref==='true'; } catch {}
const loaded = new Map();

function preload(src) {
  if (!loaded.has(src)) loaded.set(src, new Promise((resolve,reject)=>{
    const img=new Image();
    img.onload=()=>resolve(img);
    img.onerror=()=>{loaded.delete(src);reject(new Error('Image unavailable'));};
    img.src=src;
  }));
  return loaded.get(src);
}

function baseTransform(){
  return `translate(calc(-50% + ${pan}px), -50%) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
}
function applyFrame(){ frame.style.transform=baseTransform(); }
function tickTilt(){
  tiltX+=(targetTiltX-tiltX)*0.1;
  tiltY+=(targetTiltY-tiltY)*0.1;
  applyFrame();
  if(Math.abs(targetTiltX-tiltX)>0.02||Math.abs(targetTiltY-tiltY)>0.02)tiltRaf=requestAnimationFrame(tickTilt);
  else { tiltX=targetTiltX; tiltY=targetTiltY; applyFrame(); tiltRaf=null; }
}
function requestTilt(){ if(!tiltRaf) tiltRaf=requestAnimationFrame(tickTilt); }

function layout() {
  const rect=stage.getBoundingClientRect();
  sizing=frameSize(rect.width,rect.height,(photo.naturalWidth||1672)/(photo.naturalHeight||941));
  frame.style.width=sizing.width+'px';
  frame.style.height=sizing.height+'px';
  pan=clampPan(pan,sizing.maxPan);
  applyFrame();
  stage.classList.toggle('pannable',sizing.pannable);
}

function buildHotspots(room) {
  $('hotspots').replaceChildren();
  room.hotspots.forEach((h,i)=>{
    const button=document.createElement('button');
    button.className='hotspot';
    button.style.left=h.x+'%';
    button.style.top=h.y+'%';
    button.style.animationDelay=`${0.06+i*0.09}s, ${i*0.4}s`;
    const arrow=document.createElement('span');
    arrow.className='step';
    arrow.textContent=h.action?'＋':'↗';
    arrow.setAttribute('aria-hidden','true');
    const label=document.createElement('span');
    label.textContent=h.label;
    button.append(arrow,label);
    button.onclick=()=>h.action==='about'?openAbout():go(h.to);
    button.onfocus=()=>{
      if(sizing?.pannable){
        pan=clampPan(sizing.width*(.5-h.x/100),sizing.maxPan);
        applyFrame();
      }
    };
    $('hotspots').append(button);
  });
}

function updateUI() {
  const room=rooms[current];
  $('roomTitle').textContent=room.title;
  $('section').textContent=room.section;
  $('sceneCaption').textContent=room.caption;
  $('sceneCount').textContent=`${String(roomIds.indexOf(current)+1).padStart(2,'0')} / ${String(roomIds.length).padStart(2,'0')}`;
  $('return').hidden=current==='hallway';
  $('aboutBtn').hidden=!room.person;
  if(room.person){
    // Reason: keep the trailing arrow span intact while updating the label.
    $('aboutBtn').childNodes[0].textContent=`About ${room.label} `;
  }
  for(const button of $('rooms').children){
    const on=button.dataset.room===current;
    button.setAttribute('aria-current',on?'page':'false');
    if(on) button.scrollIntoView({inline:'nearest',block:'nearest',behavior:reduced?'auto':'smooth'});
  }
  buildHotspots(room);
  document.title=`${room.title} · LeadsFlow180 AI Office`;
  $('announce').textContent=`${room.title}. ${room.caption}`;
  stage.dataset.room=current;
}

async function visit(id, initial=false) {
  if(!Object.hasOwn(rooms,id)) id='hallway';
  const prevIndex=roomIds.indexOf(current);
  const nextIndex=roomIds.indexOf(id);
  if(nextIndex!==-1&&prevIndex!==-1&&nextIndex!==prevIndex) enterDir=nextIndex>prevIndex?1:-1;
  requested=id;
  const ticket=++generation;
  $('error').hidden=true;
  stage.setAttribute('aria-busy','true');
  const loaderTimer=setTimeout(()=>{ if(ticket===generation) $('loading').hidden=false; },180);
  try {
    const img=await preload(rooms[id].image);
    if(ticket!==generation) return;
    animation?.cancel();
    current=id;
    photo.src=img.src;
    photo.alt=rooms[id].alt;
    if(bleed) bleed.src=img.src;
    pan=0;
    targetTiltX=0; targetTiltY=0; tiltX=0; tiltY=0;
    frame.style.filter='none';
    frame.style.opacity='1';
    layout();
    updateUI();
    if(!initial&&!reduced){
      const base=`translate(calc(-50% + ${pan}px), -50%)`;
      const yaw=enterDir*14;
      const clearFx=()=>{ frame.style.filter='none'; frame.style.opacity='1'; };
      animation=frame.animate([
        {opacity:.25,transform:`${base} rotateX(4deg) rotateY(${yaw}deg) scale(1.08)`,filter:'brightness(.75) saturate(.85)',offset:0},
        {opacity:1,transform:`${base} rotateX(0deg) rotateY(0deg) scale(1)`,filter:'none',offset:1}
      ],{duration:780,easing:'cubic-bezier(.18,.7,.2,1)'});
      animation.onfinish=clearFx;
      animation.oncancel=clearFx;
    }
    if(!initial) stage.focus({preventScroll:true});
  } catch {
    if(ticket===generation){
      $('error').hidden=false;
      $('announce').textContent='This room could not load. Try again or stay in the current room.';
    }
  } finally {
    clearTimeout(loaderTimer);
    if(ticket===generation){
      $('loading').hidden=true;
      stage.removeAttribute('aria-busy');
    }
  }
}

function go(id){
  if(id===current){ history.replaceState(null,'','#'+id); visit(id); return; }
  if(location.hash==='#'+id) visit(id);
  else location.hash=id;
}

roomIds.forEach(id=>{
  const room=rooms[id];
  const b=document.createElement('button');
  b.className='room';
  b.dataset.room=id;
  const img=document.createElement('img');
  img.src=room.image;
  img.alt='';
  img.width=64;
  img.height=42;
  img.loading='lazy';
  img.decoding='async';
  const body=document.createElement('span');
  const name=document.createElement('strong');
  const subtitle=document.createElement('small');
  name.textContent=room.label;
  subtitle.textContent=room.subtitle;
  body.append(name,subtitle);
  b.append(img,body);
  b.onclick=()=>go(id);
  b.addEventListener('pointermove',e=>{
    if(reduced) return;
    const r=b.getBoundingClientRect();
    const nx=(e.clientX-r.left)/r.width-0.5;
    const ny=(e.clientY-r.top)/r.height-0.5;
    b.style.setProperty('--rx', `${(-ny*8).toFixed(2)}deg`);
    b.style.setProperty('--ry', `${(nx*12).toFixed(2)}deg`);
  });
  b.addEventListener('pointerleave',()=>{
    b.style.setProperty('--rx','0deg');
    b.style.setProperty('--ry','0deg');
  });
  $('rooms').append(b);
});

function buildMap(){
  const grid=$('mapGrid');
  grid.replaceChildren();
  wings.forEach(wing=>{
    const section=document.createElement('section');
    const title=document.createElement('h3');
    title.textContent=wing;
    section.append(title);
    Object.entries(rooms).filter(([,r])=>r.wing===wing).forEach(([id,r])=>{
      const b=document.createElement('button');
      const strong=document.createElement('strong');
      const small=document.createElement('small');
      strong.textContent=r.person?.name||r.label;
      small.textContent=r.subtitle;
      b.append(strong,small);
      b.onclick=()=>{ $('floorMap').close(); go(id); };
      section.append(b);
    });
    grid.append(section);
  });
  const section=document.createElement('section');
  const title=document.createElement('h3');
  title.textContent='Common Spaces';
  section.append(title);
  ['hallway','kitchen'].forEach(id=>{
    const r=rooms[id];
    const b=document.createElement('button');
    const strong=document.createElement('strong');
    const small=document.createElement('small');
    strong.textContent=r.label;
    small.textContent=r.subtitle;
    b.append(strong,small);
    b.onclick=()=>{ $('floorMap').close(); go(id); };
    section.append(b);
  });
  grid.append(section);
}

buildMap();
$('mapBtn').onclick=()=>$('floorMap').showModal();
$('closeMap').onclick=()=>$('floorMap').close();

function openAbout(){
  const person=rooms[current].person;
  if(!person) return;
  $('personName').textContent=person.name;
  $('personRole').textContent=person.role;
  $('personDescription').textContent=person.description;
  $('interests').replaceChildren(...person.interests.map(value=>{
    const li=document.createElement('li');
    li.textContent=value;
    return li;
  }));
  const talk=$('talkLink');
  if(talk){
    talk.href=`/agents/${current}#talk`;
    talk.textContent=`Talk with ${person.name} ↗`;
    talk.removeAttribute('target');
    talk.rel='';
  }
  $('about').showModal();
}

$('aboutBtn').onclick=openAbout;
$('closeAbout').onclick=()=>$('about').close();
$('return').onclick=()=>go('hallway');
$('helpBtn').onclick=()=>$('help').showModal();
$('closeHelp').onclick=$('helpDone').onclick=()=>$('help').close();
for(const id of ['help','about','floorMap']){
  $(id).addEventListener('click',e=>{
    if(e.target===$(id)){
      const r=$(id).getBoundingClientRect();
      if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) $(id).close();
    }
  });
}

function motionUI(){
  document.body.classList.toggle('no-motion',reduced);
  $('motion').textContent=reduced?'Motion off':'Motion on';
  $('motion').setAttribute('aria-pressed',String(reduced));
  $('motion').title=reduced?'Turn on room transitions':'Turn off movement between scenes';
  if(reduced){ targetTiltX=0; targetTiltY=0; tiltX=0; tiltY=0; applyFrame(); }
}
$('motion').onclick=()=>{
  reduced=!reduced;
  animation?.cancel();
  motionUI();
  try { localStorage.setItem('lf180-tour-reduced-motion',String(reduced)); } catch {}
};
motionUI();

$('retry').onclick=()=>visit(requested);
$('dismissError').onclick=()=>{
  $('error').hidden=true;
  history.replaceState(null,'','#'+current);
};

stage.addEventListener('pointermove',e=>{
  if(reduced||dragging||e.target.closest('button')) return;
  const r=stage.getBoundingClientRect();
  const nx=(e.clientX-r.left)/r.width-0.5;
  const ny=(e.clientY-r.top)/r.height-0.5;
  targetTiltY=nx*6.5;
  targetTiltX=-ny*4.2;
  stage.style.setProperty('--mx', `${(nx*24).toFixed(1)}px`);
  stage.style.setProperty('--my', `${(ny*16).toFixed(1)}px`);
  requestTilt();
});
stage.addEventListener('pointerleave',()=>{
  targetTiltX=0; targetTiltY=0; requestTilt();
  stage.style.setProperty('--mx','0px');
  stage.style.setProperty('--my','0px');
});

frame.addEventListener('pointerdown',e=>{
  if(e.target.closest('button')||!sizing?.pannable) return;
  animation?.cancel();
  dragging={id:e.pointerId,start:e.clientX,pan};
  frame.setPointerCapture(e.pointerId);
  stage.classList.add('dragging');
});
frame.addEventListener('pointermove',e=>{
  if(!dragging||dragging.id!==e.pointerId) return;
  pan=clampPan(dragging.pan+e.clientX-dragging.start,sizing.maxPan);
  applyFrame();
});
function endDrag(){ dragging=null; stage.classList.remove('dragging'); }
frame.addEventListener('pointerup',endDrag);
frame.addEventListener('pointercancel',endDrag);
frame.addEventListener('lostpointercapture',endDrag);

stage.addEventListener('keydown',e=>{
  if(e.target!==stage) return;
  if(['ArrowLeft','ArrowRight'].includes(e.key)&&sizing?.pannable){
    e.preventDefault();
    pan=clampPan(pan+(e.key==='ArrowRight'?-80:80),sizing.maxPan);
    applyFrame();
  }
});

addEventListener('hashchange',()=>visit(roomFromHash(location.hash)));
new ResizeObserver(()=>{ animation?.cancel(); layout(); }).observe(stage);
photo.addEventListener('load',layout);

const initial=roomFromHash(location.hash);
updateUI();
layout();
visit(initial,true);
