/* Leo Personal — motor compartilhado das fichas de treino.
   Cada aluno tem alunos/<slug>/data.js (window.FICHA). Corrigir aqui corrige para todos. */
(function(){
'use strict';
var F = window.FICHA;
var BASE = (function(){ var s = document.currentScript && document.currentScript.src; return s ? s.replace(/app\.js(\?.*)?$/, '') : '../../'; })();
var COACH_PHONE = '';   // ex.: '5561999999999' — usado no "Enviar resumo pro Leo" quando a ficha não define um
var SPRITE = "<svg style=\"display:none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <symbol id=\"i-puxada\" viewBox=\"0 0 24 24\"><line x1=\"5\" y1=\"4\" x2=\"19\" y2=\"4\"/><circle cx=\"12\" cy=\"9\" r=\"2\"/><path d=\"M6.5 4.5 L10.4 7.6 M17.5 4.5 L13.6 7.6\"/><path d=\"M12 11 v5 M12 16 l-3 4 M12 16 l3 4\"/></symbol>\n  <symbol id=\"i-remada\" viewBox=\"0 0 24 24\"><circle cx=\"8\" cy=\"6.5\" r=\"2\"/><path d=\"M8 8.5 v6.5\"/><path d=\"M8 11 h8 M16 9 v4\"/><path d=\"M8 15 l5.5 3 M8 15 l-2.5 4.5\"/></symbol>\n  <symbol id=\"i-voador\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"6\" r=\"2\"/><path d=\"M12 8.5 v6.5 M12 15 l-2.5 4.5 M12 15 l2.5 4.5\"/><path d=\"M12 10.5 C8.5 10.5 6 8 5.2 5.8 M12 10.5 C15.5 10.5 18 8 18.8 5.8\"/></symbol>\n  <symbol id=\"i-voadorinv\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"6\" r=\"2\"/><path d=\"M12 8.5 v6.5 M12 15 l-2.5 4.5 M12 15 l2.5 4.5\"/><path d=\"M12 10.5 L5.5 8 M12 10.5 L18.5 8\"/><path d=\"M6.8 6.2 L5.5 8 L7.2 9.4 M17.2 6.2 L18.5 8 L16.8 9.4\"/></symbol>\n  <symbol id=\"i-pressfrontal\" viewBox=\"0 0 24 24\"><circle cx=\"8.5\" cy=\"6\" r=\"2\"/><path d=\"M8.5 8.5 v6.5 M8.5 15 l-2.5 4.5 M8.5 15 l3 4.5\"/><path d=\"M8.5 10.5 h9 M17.5 8.2 v4.6\"/></symbol>\n  <symbol id=\"i-supino\" viewBox=\"0 0 24 24\"><line x1=\"4\" y1=\"19\" x2=\"20\" y2=\"19\"/><circle cx=\"17.6\" cy=\"14.6\" r=\"1.9\"/><path d=\"M5 15.5 h10.5\"/><path d=\"M10 15.5 V9\"/><line x1=\"7\" y1=\"9\" x2=\"13\" y2=\"9\"/></symbol>\n  <symbol id=\"i-pullover\" viewBox=\"0 0 24 24\"><line x1=\"4\" y1=\"19\" x2=\"20\" y2=\"19\"/><circle cx=\"17.6\" cy=\"14.6\" r=\"1.9\"/><path d=\"M6 15.5 h9.5\"/><path d=\"M14 15.5 C14 10.5 9.5 8.5 6.5 9.8\"/><circle cx=\"6\" cy=\"10.2\" r=\"1.1\"/></symbol>\n  <symbol id=\"i-triceps\" viewBox=\"0 0 24 24\"><circle cx=\"10.5\" cy=\"5.5\" r=\"2\"/><path d=\"M10.5 7.5 v7 M10.5 14.5 l-2.5 4.5 M10.5 14.5 l2.5 4.5\"/><path d=\"M10.5 9.5 L14.5 11 M14.5 11 v5\"/><line x1=\"12.5\" y1=\"16\" x2=\"16.5\" y2=\"16\"/></symbol>\n  <symbol id=\"i-dip\" viewBox=\"0 0 24 24\"><path d=\"M3.5 12.5 h4.5 M5.5 12.5 v6.5\"/><circle cx=\"11\" cy=\"6\" r=\"1.9\"/><path d=\"M11 8 L10 13 M11 9 L8 12.5\"/><path d=\"M10 13 L16 15.5 L19.5 15.5\"/></symbol>\n  <symbol id=\"i-biceps\" viewBox=\"0 0 24 24\"><circle cx=\"10.5\" cy=\"5.5\" r=\"2\"/><path d=\"M10.5 7.5 v7 M10.5 14.5 l-2.5 4.5 M10.5 14.5 l2.5 4.5\"/><path d=\"M10.5 9.5 L15 12 L15.5 7.2\"/><line x1=\"13.8\" y1=\"6.8\" x2=\"17.2\" y2=\"7.4\"/></symbol>\n  <symbol id=\"i-agacho\" viewBox=\"0 0 24 24\"><line x1=\"5.5\" y1=\"7\" x2=\"18.5\" y2=\"7\"/><circle cx=\"12\" cy=\"4.2\" r=\"1.7\"/><path d=\"M12 7 v4\"/><path d=\"M12 11 L8.8 13.5 L9.8 19 M12 11 L15.2 13.5 L14.2 19\"/></symbol>\n  <symbol id=\"i-legpress\" viewBox=\"0 0 24 24\"><circle cx=\"6.5\" cy=\"8.5\" r=\"1.9\"/><path d=\"M6.5 10.5 L8 16\"/><path d=\"M8 15.5 L12 11.5 L16.2 13.6\"/><line x1=\"18.8\" y1=\"7\" x2=\"15.2\" y2=\"18\"/></symbol>\n  <symbol id=\"i-extensora\" viewBox=\"0 0 24 24\"><line x1=\"4.5\" y1=\"19\" x2=\"12.5\" y2=\"19\"/><circle cx=\"8\" cy=\"5.5\" r=\"1.9\"/><path d=\"M8 7.5 v6.5\"/><path d=\"M8 14 h5.5 M13.5 14 L18 10.5\"/></symbol>\n  <symbol id=\"i-flexora\" viewBox=\"0 0 24 24\"><line x1=\"4\" y1=\"16.5\" x2=\"20\" y2=\"16.5\"/><circle cx=\"5.8\" cy=\"12.6\" r=\"1.8\"/><path d=\"M8 14 h8\"/><path d=\"M16 14 L18.2 8.8\"/><circle cx=\"18.6\" cy=\"7.8\" r=\"1\"/></symbol>\n  <symbol id=\"i-gluteo\" viewBox=\"0 0 24 24\"><line x1=\"3.5\" y1=\"18\" x2=\"20.5\" y2=\"18\"/><path d=\"M4 18 v-5.5 h3\"/><circle cx=\"5.8\" cy=\"9.8\" r=\"1.7\"/><path d=\"M7.5 10.8 L12.5 9.5 M12.5 9.5 L15.5 13.5 L15.5 18\"/><circle cx=\"12.5\" cy=\"6.8\" r=\"1.4\"/></symbol>\n  <symbol id=\"i-pant\" viewBox=\"0 0 24 24\"><path d=\"M3.5 19.5 h8.5 M12 19.5 v-3.5 h8.5\"/><circle cx=\"15.5\" cy=\"4.8\" r=\"1.8\"/><path d=\"M15.5 6.8 v6 M15.5 12.8 L14.8 15.3 M15.5 12.8 L16.4 15.3\"/></symbol>\n  <symbol id=\"i-adutora\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"5.2\" r=\"1.9\"/><path d=\"M12 7.2 v5\"/><path d=\"M12 12.2 L7.5 18.5 M12 12.2 L16.5 18.5\"/><path d=\"M6 14.6 l2.6 1.4 M18 14.6 l-2.6 1.4\"/></symbol>\n  <symbol id=\"i-abdutora\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"5.2\" r=\"1.9\"/><path d=\"M12 7.2 v5\"/><path d=\"M12 12.2 L7.5 18.5 M12 12.2 L16.5 18.5\"/><path d=\"M10.2 15.2 l-2.8 1.2 M13.8 15.2 l2.8 1.2\"/></symbol>\n  <symbol id=\"i-ombropress\" viewBox=\"0 0 24 24\"><line x1=\"6\" y1=\"4\" x2=\"18\" y2=\"4\"/><circle cx=\"12\" cy=\"8.2\" r=\"1.9\"/><path d=\"M12 10.5 L7.5 4.6 M12 10.5 L16.5 4.6\"/><path d=\"M12 10.5 v5 M12 15.5 l-2.5 4 M12 15.5 l2.5 4\"/></symbol>\n  <symbol id=\"i-lateral\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"6\" r=\"2\"/><path d=\"M12 8.5 v6.5 M12 15 l-2.5 4.5 M12 15 l2.5 4.5\"/><path d=\"M12 10.5 h-7 M12 10.5 h7\"/><path d=\"M4.6 9.2 v2.6 M19.4 9.2 v2.6\"/></symbol>\n  <symbol id=\"i-encolhe\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"6.2\" r=\"1.9\"/><path d=\"M12 8.5 v7 M12 15.5 l-2.5 4 M12 15.5 l2.5 4\"/><path d=\"M12 9.5 L8.5 10.6 V16 M12 9.5 L15.5 10.6 V16\"/><path d=\"M4.6 6.8 l1.6 -1.7 l1.6 1.7 M16.2 6.8 l1.6 -1.7 l1.6 1.7\"/></symbol>\n  <symbol id=\"i-along\" viewBox=\"0 0 24 24\"><circle cx=\"9\" cy=\"5\" r=\"1.8\"/><path d=\"M9 7 v5 M9 12 L5.5 18 M9 12 L14 15 L19 15\"/><path d=\"M9 9 L14 6.5\"/></symbol>\n  <symbol id=\"i-bike\" viewBox=\"0 0 24 24\"><circle cx=\"5.5\" cy=\"17\" r=\"3.2\"/><circle cx=\"18.5\" cy=\"17\" r=\"3.2\"/><path d=\"M5.5 17 L9.5 8.5 h4.5 L18.5 17\"/><path d=\"M9 8.5 h6\"/><circle cx=\"15\" cy=\"4.5\" r=\"1.4\"/></symbol>\n  <symbol id=\"i-abs\" viewBox=\"0 0 24 24\"><circle cx=\"6\" cy=\"7.5\" r=\"1.9\"/><path d=\"M6 9.5 L9 13.5 L15 13.5\"/><path d=\"M9 13.5 L8 18.5 M15 13.5 L17.5 17\"/><path d=\"M11 6.5 h5 M11 9.5 h5\"/></symbol>\n  <symbol id=\"i-terra\" viewBox=\"0 0 24 24\"><line x1=\"4\" y1=\"15.5\" x2=\"20\" y2=\"15.5\"/><circle cx=\"4.6\" cy=\"15.5\" r=\"2.2\"/><circle cx=\"19.4\" cy=\"15.5\" r=\"2.2\"/><circle cx=\"12\" cy=\"4.2\" r=\"1.8\"/><path d=\"M12 6 v6.5 M12 12.5 l-2.4 6 M12 12.5 l2.4 6\"/><path d=\"M12 8 L9.4 15.5 M12 8 L14.6 15.5\"/></symbol>\n  <symbol id=\"i-hiper\" viewBox=\"0 0 24 24\"><path d=\"M4 18.5 h6 M7 18.5 v-4.5\"/><path d=\"M7 14 L12 12.5 C15.5 11.5 17.5 8.5 18 5.5\"/><circle cx=\"18.6\" cy=\"4.2\" r=\"1.6\"/><path d=\"M9.5 13.4 L10.5 18.5\"/></symbol>\n  <symbol id=\"i-perdigueiro\" viewBox=\"0 0 24 24\"><line x1=\"3\" y1=\"18.5\" x2=\"21\" y2=\"18.5\"/><circle cx=\"7\" cy=\"9.2\" r=\"1.7\"/><path d=\"M8.6 10.4 L15 10.8\"/><path d=\"M9 10.6 V18.5 M14.2 10.8 V18.5\"/><path d=\"M8 9.6 L3.2 7.6\"/><path d=\"M15 10.8 L21 9.6\"/></symbol>\n  <symbol id=\"i-step\" viewBox=\"0 0 24 24\"><path d=\"M12.5 19.5 h8 v-4 h-8 z\"/><line x1=\"3\" y1=\"19.5\" x2=\"12.5\" y2=\"19.5\"/><circle cx=\"10\" cy=\"4.3\" r=\"1.8\"/><path d=\"M10 6.3 v6.2 M10 12.5 L14.6 13 L15 15.5 M10 12.5 L8.2 19.5 M10 8.3 L7.6 11 M10 8.3 L12.4 10.6\"/></symbol>\n  <symbol id=\"i-esteira\" viewBox=\"0 0 24 24\"><path d=\"M3 19 h14.5 l3.5 -2.2\"/><path d=\"M17.5 19 L19.5 8 h1.8\"/><circle cx=\"10\" cy=\"4.3\" r=\"1.7\"/><path d=\"M10 6.2 L9.2 11.5 M9.2 11.5 L12 14 L11.2 17.6 M9.2 11.5 L7.4 14.6 L5.4 17 M9.8 7.8 L12.6 10 M9.8 7.8 L7.2 9.6\"/></symbol>\n  <symbol id=\"i-escada\" viewBox=\"0 0 24 24\"><path d=\"M3 20.5 h4 v-3.5 h4 v-3.5 h4 v-3.5 h5.5\"/><circle cx=\"13\" cy=\"3.6\" r=\"1.6\"/><path d=\"M13 5.4 v4.2 M13 9.6 L15 11.4 L15 13.5 M13 9.6 L11 11.8 L11 17 M13 6.8 L15.4 8.2 M13 6.8 L10.8 8.4\"/></symbol>\n  <symbol id=\"i-transport\" viewBox=\"0 0 24 24\"><ellipse cx=\"12\" cy=\"18.6\" rx=\"7.5\" ry=\"1.9\"/><circle cx=\"11\" cy=\"4.3\" r=\"1.7\"/><path d=\"M11 6.2 v6 M11 12.2 L8.4 17.4 M11 12.2 L14.8 16.8 M11 8 L14.8 7 L16.2 3.2\"/></symbol>\n  <symbol id=\"i-extombro\" viewBox=\"0 0 24 24\"><line x1=\"8\" y1=\"3\" x2=\"17\" y2=\"3\"/><circle cx=\"10\" cy=\"7.2\" r=\"1.8\"/><path d=\"M10 9.2 v6 M10 15.2 l-2.2 4.4 M10 15.2 l2.2 4.4 M10 10.2 L13.8 14\"/><line x1=\"12.6\" y1=\"14.6\" x2=\"15\" y2=\"13.4\"/><path d=\"M14.2 13.8 L16.2 3\" stroke-dasharray=\"1.4 1.6\"/></symbol>\n</svg>";

function $(id){ return document.getElementById(id); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
if(!F || !F.days){ document.body.innerHTML = '<p style="padding:24px;color:#fff;font-family:sans-serif">Ficha não encontrada.</p>'; return; }

/* ================= normalização dos dados ================= */
var COLOR = { red:'var(--red)', green:'var(--green)', blue:'var(--blue)', yellow:'var(--yellow)', white:'var(--white)' };
function repObj(r){ r=String(r); return { r:r, rv: r.split('+').reduce(function(s,x){ return s+(parseFloat(x)||0); },0) }; }
var DAYS = F.days.map(function(d){
  return { id:d.id, label:d.label||d.id.toUpperCase(), title:d.title||('Treino '+d.id.toUpperCase()), sub:d.sub||'', color:COLOR[d.color]||d.color||'var(--yellow)',
    items:(d.items||[]).map(function(it){
      if(it.type!=='ex') return it;
      var o={}; for (var k in it) o[k]=it[k];
      o.rest = it.rest || 60;
      o.parts = it.parts.map(function(p){ var q={}; for (var k2 in p) q[k2]=p[k2]; q.reps=p.reps.map(repObj); return q; });
      return o;
    }) };
});
var NAME = F.name || 'Aluno';
var KEY = F.key || ('leo-treino-'+(F.slug||'aluno')+'-v3');
var PHONE = F.coachPhone || COACH_PHONE;

/* ================= casca da página ================= */
document.title = 'Leo Personal — Treino '+NAME;
var app = $('app') || document.body.appendChild(document.createElement('div'));
app.innerHTML = SPRITE +
'<div class="wrap"><header><div class="eyebrow">Ficha de treino'+(F.month?' · '+esc(F.month):'')+'</div><div class="brand">'+
'<img class="coach" src="'+BASE+'icons/coach.jpg" alt="Leo, personal trainer"><div class="brand-txt"><h1>Leo Personal</h1><div class="subtitle">Treino '+esc(NAME)+'</div></div></div>'+
'<div class="presc">Anote a carga, marque cada série e use o cronômetro. Toque em <b>Iniciar treino</b> para o modo guiado.</div></header>'+
'<nav role="tablist" aria-label="Dias de treino" id="tabs"></nav><main id="main"></main>'+
'<footer>Bi-set: dois exercícios em sequência, sem descanso entre eles. “Direto + bombear”: repetições completas e, sem parar, repetições curtas no fim da amplitude. Ajustes de carga: valide sempre com o Leo.'+
'<div class="backup"><div class="backup-t">Cargas, RPE e datas ficam salvos neste celular. Limpar os dados do navegador apaga o histórico — exporte um backup de vez em quando.</div>'+
'<div class="row"><button class="btn" id="expBtn">⬇ Exportar backup</button><button class="btn" id="impBtn">⬆ Importar backup</button><input type="file" id="impFile" accept="application/json,.json,text/plain" hidden></div>'+
'<textarea id="bkBox" class="note" readonly></textarea><div id="bkMsg"></div></div></footer></div>'+
'<div id="rest" role="status" aria-live="polite"><i class="rest-track" id="rest-track"></i><div class="rest-in"><div id="rest-time">01:00</div><div id="rest-lbl">Descanso</div><button class="btn" id="rest-add">+30s</button><button class="btn solid" id="rest-skip">Pular</button></div></div>'+
'<div id="play" class="ov" role="dialog" aria-label="Modo treino"><div class="play-in"><div class="play-top"><div class="play-step" id="p-step"></div><button class="btn" id="p-close">Sair</button></div><div class="progress"><i id="p-bar"></i></div><div id="p-body"></div></div>'+
'<div class="play-nav"><div class="play-nav-in"><button class="btn" id="p-prev" aria-label="Anterior">←</button><button class="btn" id="p-rest2">⏱</button><button class="btn solid" id="p-next">Próximo →</button></div></div></div>'+
'<div id="summary" class="ov" role="dialog" aria-label="Resumo do treino"><div class="play-in" id="s-body"></div></div>';

/* ================= persistência ================= */
function blank(){ return { sets:{}, done:{}, rpe:{}, hist:{}, notes:{}, start:{}, last:{}, count:{}, finishes:0, day:DAYS[0].id }; }
var state = blank(), memStore = {};
var LS = (function(){ try{ var t="__t"; localStorage.setItem(t,"1"); localStorage.removeItem(t); return localStorage; }catch(e){ return null; } })();
function readKey(k){ try{ return LS ? LS.getItem(k) : memStore[k]; }catch(e){ return null; } }
function load(){ try{ var raw = readKey(KEY); if(raw){ var d = JSON.parse(raw); if(d && d.sets){ var b = blank(); for (var k in d) b[k]=d[k]; state = b; return true; } } }catch(e){} return false; }
var saveT; function writeNow(){ var v = JSON.stringify(state); memStore[KEY]=v; try{ if(LS) LS.setItem(KEY, v); }catch(e){} }
function save(){ clearTimeout(saveT); saveT = setTimeout(writeNow, 300); }
try{ window.addEventListener('pagehide', writeNow); }catch(e){}

/* ================= utilidades ================= */
function num(v){ var n = parseFloat(String(v==null?'':v).replace(',','.')); return isFinite(n) ? n : 0; }
function kg(n){ return (Math.round(n*10)/10).toLocaleString('pt-BR'); }
function dayById(id){ for (var i=0;i<DAYS.length;i++) if (DAYS[i].id===id) return DAYS[i]; }
function exs(d){ return d.items.filter(function(i){ return i.type!=='sec'; }); }
function find(d, id){ return exs(d).filter(function(x){ return x.id===id; })[0]; }
function nSets(it){ return it.type==='cardio' ? 1 : it.parts[0].reps.length; }
function kL(d,e,s,p){ return d+'|'+e+'|'+s+'|'+p; }
function kD(d,e,s){ return d+'|'+e+'|'+s; }
function kE(d,e){ return d+'|'+e; }
function isDone(d,it){ for (var s=0;s<nSets(it);s++) if(!state.done[kD(d,it.id,s)]) return false; return true; }
function hasLoad(it){ return it.type==='ex' && it.parts.some(function(p){ return !p.bw; }); }
function fmtDate(iso){ var t=new Date(iso); return String(t.getDate()).padStart(2,'0')+"/"+String(t.getMonth()+1).padStart(2,'0')+"/"+t.getFullYear(); }
function daysAgo(iso){ var a=new Date(iso); a.setHours(0,0,0,0); var b=new Date(); b.setHours(0,0,0,0); return Math.round((b-a)/864e5); }
function agoLabel(iso){ var n=daysAgo(iso); return n===0?"hoje":n===1?"ontem":"há "+n+" dias"; }
var UI = { open:{}, notes:{} };
function toast(msg, ms){ var t=document.createElement('div'); t.className='toast'; t.textContent=msg; document.body.appendChild(t); setTimeout(function(){ t.remove(); }, ms||5000); }
var YT = function(q){ return "https://www.youtube.com/results?search_query=" + encodeURIComponent(q); };

/* ================= migração do app antigo (mesmo domínio = mesmos dados) ================= */
function migrate(){
  var L = F.legacy; if(!L) return false;
  var raw = readKey(L.key); if(!raw) return false;
  var old; try{ old = JSON.parse(raw); }catch(e){ return false; }
  var st = blank(), v2 = L.format === 'v2', sets = v2 ? (old.sets||{}) : old, moved = 0;
  DAYS.forEach(function(d){
    exs(d).forEach(function(it){
      if(it.li==null) return;
      if(it.type==='ex') for (var s=0;s<nSets(it);s++){ var o = sets[d.id+'-'+it.li+'-'+s]; if(o && o.load){ st.sets[kL(d.id,it.id,s,0)] = String(o.load); moved++; } }
      var h = v2 && old.hist ? old.hist[d.id+'-'+it.li] : null;
      if(h && h.length && it.type==='ex') st.hist[kE(d.id,it.id)] = h.map(function(x){
        var loads = (x.loads||[]).map(String), top = Math.max.apply(null, [0].concat(loads.map(num)));
        return { at:x.at, loads:[loads], tops:[top], vol:x.vol||0, rpe:+x.rpe||0, full:true };
      });
    });
    var rec = v2 ? (old.done||{})[d.id] : old['done-'+d.id];
    if(rec && rec.at){ st.last[d.id] = rec.at; moved++; }
  });
  st.finishes = old.finishes || 0; st.migratedFrom = L.key;
  state = st; writeNow();
  return moved > 0;
}

function setVol(d,it,s){ var v=0; it.parts.forEach(function(p,pi){ if(!p.bw) v += num(state.sets[kL(d,it.id,s,pi)]) * p.reps[s].rv * (p.sides||1); }); return v; }
function todayVolume(d){ var v=0; exs(d).forEach(function(it){ if(it.type==='ex') for (var s=0;s<nSets(it);s++) if(state.done[kD(d.id,it.id,s)]) v += setVol(d.id,it,s); }); return Math.round(v); }
function dayProgress(d){ var tot=0,dn=0,exDone=0,list=exs(d);
  list.forEach(function(it){ var n=nSets(it),c=0; for (var s=0;s<n;s++) if(state.done[kD(d.id,it.id,s)]) c++; tot+=n; dn+=c; if(c===n) exDone++; });
  return { pct: tot? Math.round(dn/tot*100):0, setsDone:dn, exDone:exDone, exTotal:list.length }; }
function lastHist(d,it){ var h=state.hist[kE(d,it.id)]; return h&&h.length ? h[h.length-1] : null; }
function prevLoad(d,it,s,pi){ var h=lastHist(d,it); return h && h.loads && h.loads[pi] && h.loads[pi][s] ? h.loads[pi][s] : ''; }
function suggestion(d,it){
  var h=lastHist(d,it); if(!h || !h.tops) return null;
  var delta=0, why='manter';
  if(h.full && h.rpe && h.rpe<=7){ delta=2.5; why='subir'; } else if(h.rpe>=10){ delta=-2.5; why='reduzir'; }
  var vals = it.parts.map(function(p,i){ return p.bw || !h.tops[i] ? null : Math.max(0, h.tops[i]+delta); });
  return vals.some(function(v){ return v; }) ? { vals:vals, why:why } : null;
}

/* ================= blocos de interface ================= */
function icon(id){ return '<svg class="ic"><use href="#'+esc(id||'i-along')+'"/></svg>'; }
function setsHTML(d,it){
  var multi = it.parts.length>1, allBw = it.parts.every(function(p){ return p.bw; });
  return '<div class="sets">'+it.parts[0].reps.map(function(_,s){
    var on = !!state.done[kD(d,it.id,s)];
    var rep = it.parts.map(function(p){ return p.reps[s] ? p.reps[s].r : ''; }).join('+');
    var loads = allBw ? '<span class="bw">peso corporal</span>' : it.parts.map(function(p,pi){
      if(p.bw) return '<span class="stepper"><span class="pl">'+'AB'[pi]+'</span><span class="bw">peso corporal</span></span>';
      var k=kL(d,it.id,s,pi), pv=prevLoad(d,it,s,pi);
      return '<span class="stepper">'+(multi?'<span class="pl">'+'AB'[pi]+'</span>':'')
        +'<button class="step" data-step="-2.5" data-k="'+k+'" aria-label="Diminuir 2,5 kg">−</button>'
        +'<input class="load" type="text" inputmode="decimal" data-k="'+k+'" placeholder="'+esc(pv||'kg')+'" value="'+esc(state.sets[k]||'')+'" aria-label="Carga '+esc(p.n)+' série '+(s+1)+'">'
        +'<button class="step" data-step="2.5" data-k="'+k+'" aria-label="Aumentar 2,5 kg">+</button>'
        +'<button class="step" data-rep="'+it.id+'|'+s+'|'+pi+'" aria-label="Repetir carga anterior" title="Repetir carga anterior">⟳</button></span>';
    }).join('');
    var pvs = it.parts.map(function(p,pi){ return p.bw?null:prevLoad(d,it,s,pi); }).filter(function(x){ return x; });
    return '<div class="set'+(multi?' multi':'')+'" data-done="'+(on?1:0)+'">'
      +'<span class="set-n">Série '+(s+1)+'</span><span class="set-r" title="'+esc(rep)+'">'+esc(rep)+(/^\d+$/.test(rep)?'x':'')+'</span>'
      +'<div class="loads">'+loads+'</div>'
      +'<button class="chk" aria-pressed="'+on+'" data-chk="'+it.id+'|'+s+'" aria-label="Concluir série '+(s+1)+'">✓</button>'
      +(pvs.length?'<span class="prev">semana passada: <b>'+esc(pvs.join(' / '))+' kg</b></span>':'')
      +'</div>';
  }).join('')+'</div>';
}
function rpeHTML(d,it){
  var v = state.rpe[kE(d,it.id)]||'', o='<option value="">—</option>';
  for (var i=6;i<=10;i++) o+='<option value="'+i+'"'+(String(v)===String(i)?' selected':'')+'>'+i+'</option>';
  return '<div class="rpe"><label for="rpe-'+it.id+'">Esforço percebido (6 = fácil · 10 = falha):</label><select id="rpe-'+it.id+'" data-rpe="'+it.id+'">'+o+'</select></div>';
}
function sparkHTML(d,it){
  var h = state.hist[kE(d,it.id)]||[], sg = hasLoad(it) ? suggestion(d,it) : null, out='';
  if(h.length>=2){
    var pts=h.slice(-8).map(function(x){ return x.vol||0; }), mx=Math.max.apply(null,pts), mn=Math.min.apply(null,pts), W=110, H=26, sp=mx-mn||1;
    var path=pts.map(function(p,i){ return (i?'L':'M')+(i/(pts.length-1)*W).toFixed(1)+' '+(H-((p-mn)/sp)*(H-4)-2).toFixed(1); }).join(' ');
    var diff=pts[pts.length-1]-pts[pts.length-2];
    out += '<svg width="'+W+'" height="'+H+'" aria-hidden="true"><path d="'+path+'" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      +'<span>volume: <b style="color:var(--chalk)">'+pts[pts.length-1]+'</b> kg·rep '+(diff>0?'↑':diff<0?'↓':'→')+' ('+h.length+' sessões)</span>';
  }
  if(sg){ var t = sg.vals.filter(function(v){ return v!=null; }).map(kg).join(' / ');
    out += '<button class="sug" data-sug="'+it.id+'">Sugestão: '+t+' kg '+({subir:'↑',manter:'=',reduzir:'↓'})[sg.why]+'</button>'; }
  return out ? '<div class="spark">'+out+'</div>' : '';
}
function noteHTML(d,it){
  var k=kE(d,it.id), n=state.notes[k]||'';
  return UI.notes[k] ? '<textarea class="note" data-notek="'+it.id+'" placeholder="Ex.: banco na posição 4, senti o joelho…">'+esc(n)+'</textarea>'
    : (n ? '<div class="notetxt">✎ '+esc(n)+'</div>' : '');
}
function headHTML(it, extra){
  return '<div class="ex-top"><div class="thumb">'+icon(it.i)+'</div>'
    +'<div class="ex-info"><div class="ex-name">'+(it.bs?'<span class="badge">Bi-set</span>':'')+esc(it.name)+'</div>'
    +(it.e?'<div class="ex-equip">'+esc(it.e)+'</div>':'')+'</div>'+(extra||'')+'</div>';
}
function partsHTML(it){ return it.parts.length>1 ? '<div class="parts">'+it.parts.map(function(p,i){ return '<div><i>'+'AB'[i]+'</i><span>'+esc(p.n)+' · '+esc(p.reps[0].r)+'</span></div>'; }).join('')+'</div>' : ''; }
var WARM = '<div class="warm">Aquecimento: 1–2 séries leves (~50% da carga) antes da primeira série valendo.</div>';

function exCard(d,it){
  var done=isDone(d.id,it), k=kE(d.id,it.id);
  if(done && !UI.open[k]) return '<div class="ex done collapsed" data-open="'+it.id+'">'+headHTML(it,'<span class="ok">✓ feito</span>')+'</div>';
  if(it.type==='cardio'){
    return '<div class="ex'+(done?' done':'')+'">'+headHTML(it, it.min?'<div class="reps">'+it.min+' min</div>':'')
      +'<div class="cue"><b>Como fazer:</b> '+esc(it.cue||it.c||'')+'</div><div class="row">'
      +(it.min?'<button class="btn day" data-timer="'+it.id+'">⏱ Cronômetro '+it.min+' min</button>':'')
      +(it.v?'<a class="btn" target="_blank" rel="noopener" href="'+YT(it.v)+'">▶ Vídeo</a>':'')
      +'<button class="btn'+(done?'':' solid')+'" data-chk="'+it.id+'|0">'+(done?'✓ Feito':'Marcar como feito')+'</button>'
      +(done?'<button class="btn" data-close="'+it.id+'">Recolher</button>':'')+'</div></div>';
  }
  return '<div class="ex'+(done?' done':'')+'">'+headHTML(it,'<div class="reps">'+esc(it.scheme||'')+'</div>')
    +(it.w?WARM:'')+partsHTML(it)+'<div class="cue"><b>Execução:</b> '+esc(it.c||'')+'</div>'
    +setsHTML(d.id,it)+rpeHTML(d.id,it)+sparkHTML(d.id,it)+noteHTML(d.id,it)
    +'<div class="row"><a class="btn solid" target="_blank" rel="noopener" href="'+YT(it.v||it.name+' execução')+'">▶ Ver vídeo</a>'
    +'<button class="btn" data-rest="'+it.rest+'">⏱ Descanso '+it.rest+'s</button>'
    +'<button class="btn" data-note="'+it.id+'">✎ Nota</button>'
    +(done?'<button class="btn" data-close="'+it.id+'">Recolher</button>':'')+'</div></div>';
}

/* ================= abas + dia ================= */
var main=$('main');
function renderTabs(){
  $('tabs').innerHTML = DAYS.map(function(d){
    var at=state.last[d.id];
    return '<button class="tab" role="tab" aria-selected="'+(d.id===state.day)+'" data-day="'+d.id+'"><span class="tab-top"><span class="plate" style="color:'+d.color+'"></span>'+esc(d.label)+'</span>'
      +'<span class="tab-date'+(at?'':' none')+'">'+(at?fmtDate(at):'nunca feito')+'</span></button>';
  }).join('');
}
var finishArmed=0;
function renderDay(){
  var d=dayById(state.day), pg=dayProgress(d), at=state.last[d.id];
  main.style.setProperty('--day', d.color);
  main.innerHTML = '<div class="day-head"><div class="day-title">'+esc(d.title)+'</div><div class="day-sub">'+esc(d.sub)+'</div></div>'
    +'<div class="day-bar"><i style="width:'+pg.pct+'%"></i></div>'
    +'<div class="meta"><span class="pill">'+(at?'Último: <b>'+fmtDate(at)+'</b> · '+agoLabel(at):'Nunca finalizado')+'</span>'
    +'<span class="pill"><b>'+pg.exDone+'</b> de '+pg.exTotal+' exercícios</span>'
    +'<span class="pill" id="volPill">volume hoje: <b>'+todayVolume(d)+'</b> kg·rep</span></div>'
    +'<button class="start" id="startBtn">▶ Iniciar treino</button>'
    +d.items.map(function(it){ return it.type==='sec' ? '<div class="sec">'+esc(it.t)+'</div>' : exCard(d,it); }).join('')
    +'<button class="finish" id="finishBtn">✓ Finalizar treino de hoje</button>'
    +'<div class="stretch"><b>Como usar:</b> o campo mostra a carga da semana passada como referência. Use − / + para ajustar de 2,5 em 2,5 kg e ⟳ para repetir a carga anterior. A <b>sugestão</b> aparece depois do primeiro treino, com base no RPE. Ao finalizar, a sessão vai para o histórico e as marcações zeram.</div>';
  finishArmed=0;
}
function render(){ renderTabs(); renderDay(); }
$('tabs').addEventListener('click', function(e){
  var b=e.target.closest('[data-day]'); if(!b) return;
  state.day=b.dataset.day; save(); render(); window.scrollTo(0,0);
});

/* ================= interações (lista e modo guiado) ================= */
function touchStart(d){ if(!state.start[d]) state.start[d]=Date.now(); }
function rerender(root){ if(root===main) renderDay(); else renderPlay(); }
function onClick(root, e){
  var d=state.day, day=dayById(d), t=e.target, b, it;
  if((b=t.closest('[data-step]'))){
    var inp=root.querySelector('.load[data-k="'+b.dataset.k+'"]'), base=num(inp.value)||num(inp.placeholder);
    inp.value=String(Math.max(0, base+parseFloat(b.dataset.step))).replace('.',','); onInput(inp); return;
  }
  if((b=t.closest('[data-rep]'))){
    var r=b.dataset.rep.split('|'), s=+r[1], pi=+r[2]; it=find(day,r[0]);
    var src = s>0 ? state.sets[kL(d,it.id,s-1,pi)] : ''; if(!src) src = prevLoad(d,it,s,pi);
    if(src){ var i2=root.querySelector('.load[data-k="'+kL(d,it.id,s,pi)+'"]'); i2.value=src; onInput(i2); } return;
  }
  if((b=t.closest('[data-chk]'))){
    var c=b.dataset.chk.split('|'); it=find(day,c[0]); var k=kD(d,it.id,+c[1]), on=!state.done[k];
    if(on) state.done[k]=true; else delete state.done[k]; touchStart(d); save();
    if(on && it.type==='ex') startRest(it.rest, 'Descanso · '+it.name);
    rerender(root); return;
  }
  if((b=t.closest('[data-open]'))){ UI.open[kE(d,b.dataset.open)]=true; rerender(root); return; }
  if((b=t.closest('[data-close]'))){ delete UI.open[kE(d,b.dataset.close)]; rerender(root); return; }
  if((b=t.closest('[data-rest]'))){ startRest(+b.dataset.rest,'Descanso'); return; }
  if((b=t.closest('[data-timer]'))){ it=find(day,b.dataset.timer); touchStart(d); save(); startRest(it.min*60, it.name); return; }
  if((b=t.closest('[data-note]'))){ var nk=kE(d,b.dataset.note); UI.notes[nk]=!UI.notes[nk]; rerender(root);
    var ta=root.querySelector('[data-notek="'+b.dataset.note+'"]'); if(ta) ta.focus(); return; }
  if((b=t.closest('[data-sug]'))){ it=find(day,b.dataset.sug); var sg=suggestion(d,it);
    if(sg) for (var s2=0;s2<nSets(it);s2++) sg.vals.forEach(function(v,pj){ if(v!=null) state.sets[kL(d,it.id,s2,pj)]=String(v).replace('.',','); });
    save(); rerender(root); return; }
  if(t.closest('#startBtn')){ openPlay(); return; }
  if(t.closest('#finishBtn')){
    var pg=dayProgress(day), fb=$('finishBtn');
    if(!pg.setsDone){ fb.textContent='Marque pelo menos uma série antes de finalizar'; return; }
    if(Date.now()-finishArmed>5000){ finishArmed=Date.now(); fb.textContent=(pg.pct<100?'Faltam séries ('+pg.pct+'%) — ':'')+'Toque de novo para confirmar'; return; }
    finishDay(); return;
  }
}
function onInput(t){
  if(t.matches('input.load')){ state.sets[t.dataset.k]=t.value; touchStart(state.day); save();
    var vp=$('volPill'); if(vp) vp.innerHTML='volume hoje: <b>'+todayVolume(dayById(state.day))+'</b> kg·rep'; }
  if(t.matches('[data-notek]')){ var k=kE(state.day,t.dataset.notek); if(t.value.trim()) state.notes[k]=t.value; else delete state.notes[k]; save(); }
}
function onChange(t){ if(t.matches('[data-rpe]')){ var k=kE(state.day,t.dataset.rpe); if(t.value) state.rpe[k]=+t.value; else delete state.rpe[k]; save(); } }
[main, $('play')].forEach(function(root){
  root.addEventListener('click', function(e){ onClick(root,e); });
  root.addEventListener('input', function(e){ onInput(e.target); });
  root.addEventListener('change', function(e){ onChange(e.target); });
});

/* ================= wake lock + cronômetro ================= */
var wl=null;
function keepAwake(on){ try{ if(on && 'wakeLock' in navigator && !wl){ navigator.wakeLock.request('screen').then(function(l){ wl=l; l.addEventListener('release',function(){ wl=null; }); }).catch(function(){}); } else if(!on && wl){ wl.release(); wl=null; } }catch(e){} }
var restEl=$('rest'), restInt=null, restEnd=0, restTotal=0;
function mmss(s){ return String(Math.floor(s/60)).padStart(2,'0')+":"+String(s%60).padStart(2,'0'); }
function startRest(sec,label){ clearInterval(restInt); restTotal=sec; restEnd=Date.now()+sec*1000; $('rest-lbl').textContent=label||'Descanso';
  restEl.classList.add('on'); keepAwake(true); tick(); restInt=setInterval(tick,250); }
function tick(){ var left=Math.max(0,Math.round((restEnd-Date.now())/1000)); $('rest-time').textContent=mmss(left);
  $('rest-track').style.width=(100-(left/restTotal*100))+'%'; if(left<=0) endRest(true); }
function endRest(alertUser){ clearInterval(restInt); restEnd=0; restEl.classList.remove('on'); if(!$('play').classList.contains('on')) keepAwake(false);
  if(alertUser){ try{ var a=new (window.AudioContext||window.webkitAudioContext)(), o=a.createOscillator(), g=a.createGain(); o.connect(g); g.connect(a.destination); o.frequency.value=880;
    g.gain.setValueAtTime(.15,a.currentTime); g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.5); o.start(); o.stop(a.currentTime+.5); }catch(e){}
    try{ if(navigator.vibrate) navigator.vibrate([180,80,180]); }catch(e){} } }
$('rest-skip').onclick=function(){ endRest(false); };
$('rest-add').onclick=function(){ if(restEnd){ restEnd+=30000; restTotal+=30; tick(); } };
document.addEventListener('visibilitychange',function(){ if(document.visibilityState==='visible'){ if(restEnd) tick(); if($('play').classList.contains('on')) keepAwake(true); } });

/* ================= modo guiado ================= */
var play=$('play'), order=[], pIdx=0;
function secOf(d,it){ var s=''; for (var i=0;i<d.items.length;i++){ if(d.items[i].type==='sec') s=d.items[i].t; if(d.items[i]===it) return s; } return ''; }
function openPlay(){
  var d=dayById(state.day); order=exs(d); pIdx=0;
  for (var i=0;i<order.length;i++) if(!isDone(d.id,order[i])){ pIdx=i; break; }
  touchStart(d.id); save(); play.style.setProperty('--day', d.color);
  play.classList.add('on'); document.body.classList.add('playing'); document.body.style.overflow='hidden'; keepAwake(true); renderPlay();
}
function closePlay(){ play.classList.remove('on'); document.body.classList.remove('playing'); document.body.style.overflow=''; endRest(false); keepAwake(false); renderDay(); }
function renderPlay(){
  var d=dayById(state.day), it=order[pIdx], last=pIdx===order.length-1, cardio=it.type==='cardio';
  $('p-step').textContent=d.title+' · '+(pIdx+1)+' de '+order.length;
  $('p-bar').style.width=((pIdx+1)/order.length*100)+'%';
  var body = '<div class="play-thumb">'+icon(it.i)+'</div>'
    +(secOf(d,it)?'<div class="play-sec">'+esc(secOf(d,it))+'</div>':'')
    +'<div class="play-name">'+esc(it.name)+'</div>'
    +'<div class="play-equip">'+(it.bs?'<span class="badge">Bi-set</span>':'')+esc(cardio?(it.min?it.min+' minutos':(it.e||'')):((it.scheme||'')+(it.e?' · '+it.e:'')))+'</div>'
    +(it.w?WARM:'')+(cardio?'':partsHTML(it))+'<div class="play-cue">'+esc(cardio?(it.cue||it.c||''):(it.c||''))+'</div>';
  if(cardio){
    var dn=isDone(d.id,it);
    body += '<div class="row">'+(it.min?'<button class="btn day" data-timer="'+it.id+'">⏱ Cronômetro '+it.min+' min</button>':'')
      +'<button class="btn'+(dn?'':' solid')+'" data-chk="'+it.id+'|0">'+(dn?'✓ Feito':'Marcar como feito')+'</button></div>';
  } else {
    body += setsHTML(d.id,it)+rpeHTML(d.id,it)+sparkHTML(d.id,it)+noteHTML(d.id,it)
      +'<div class="row"><a class="btn solid" target="_blank" rel="noopener" href="'+YT(it.v||it.name+' execução')+'">▶ Ver vídeo</a>'
      +'<button class="btn" data-rest="'+it.rest+'">⏱ Descansar '+it.rest+'s</button>'
      +'<button class="btn" data-note="'+it.id+'">✎ Nota</button>'
      +(!last?'<button class="btn" id="p-skip">↷ Adiar exercício</button>':'')+'</div>';
  }
  $('p-body').innerHTML=body;
  $('p-rest2').style.display = cardio ? 'none' : '';
  $('p-rest2').textContent='⏱ '+(cardio?'':it.rest+'s');
  $('p-prev').disabled = pIdx===0;
  $('p-next').textContent = last ? 'Concluir treino ✓' : 'Próximo →';
  try{ play.scrollTo(0,0); }catch(e){}
}
play.addEventListener('click', function(e){ if(e.target.closest('#p-skip')){ var m=order.splice(pIdx,1)[0]; order.push(m); endRest(false); renderPlay(); } });
$('p-close').onclick=closePlay;
$('p-prev').onclick=function(){ if(pIdx>0){ pIdx--; endRest(false); renderPlay(); } };
$('p-rest2').onclick=function(){ var it=order[pIdx]; if(it.type==='ex') startRest(it.rest,'Descanso · '+it.name); };
$('p-next').onclick=function(){
  if(pIdx<order.length-1){ pIdx++; renderPlay(); return; }
  if(!dayProgress(dayById(state.day)).setsDone){ $('p-next').textContent='Marque ao menos uma série'; return; }
  closePlay(); finishDay();
};

/* ================= finalizar + resumo ================= */
function finishDay(){
  var d=dayById(state.day), p=dayProgress(d), at=new Date().toISOString();
  var dur = state.start[d.id] ? Math.round((Date.now()-state.start[d.id])/60000) : 0;
  var rows=[], vol=0, prevTot=0, hasPrev=false;
  exs(d).forEach(function(it){
    if(it.type!=='ex') return;
    var n=nSets(it), v=0, c=0, tops=it.parts.map(function(){ return 0; }), loads=it.parts.map(function(){ return []; });
    for (var s=0;s<n;s++){
      it.parts.forEach(function(pp,pj){ loads[pj][s]=state.sets[kL(d.id,it.id,s,pj)]||''; });
      if(state.done[kD(d.id,it.id,s)]){ c++; v+=setVol(d.id,it,s); it.parts.forEach(function(pp,pj){ tops[pj]=Math.max(tops[pj], num(loads[pj][s])); }); }
    }
    if(!c) return;
    var k=kE(d.id,it.id), prev=lastHist(d.id,it);
    state.hist[k]=(state.hist[k]||[]).concat({ at:at, loads:loads, tops:tops, vol:Math.round(v), rpe:state.rpe[k]||0, full:c===n }).slice(-30);
    vol+=v; if(prev){ prevTot+=prev.vol; hasPrev=true; }
    var delta=null; if(prev && hasLoad(it)){ var a=tops.reduce(function(x,y){ return x+y; },0), b=(prev.tops||[]).reduce(function(x,y){ return x+y; },0); delta=Math.round((a-b)*10)/10; }
    rows.push({ it:it, tops:tops, delta:delta });
  });
  Object.keys(state.done).forEach(function(k){ if(k.indexOf(d.id+'|')===0) delete state.done[k]; });
  Object.keys(state.rpe).forEach(function(k){ if(k.indexOf(d.id+'|')===0) delete state.rpe[k]; });
  delete state.start[d.id]; state.last[d.id]=at; state.count[d.id]=(state.count[d.id]||0)+1; state.finishes++;
  UI.open={}; writeNow();

  var trend = hasPrev && prevTot ? Math.round((vol-prevTot)/prevTot*100) : null;
  var ups = rows.filter(function(r){ return r.delta>0; });
  var msg = 'Oi Leo! Finalizei o '+d.title+' ('+d.sub+') — '+NAME+' 💪\n📅 '+fmtDate(at)+(dur?' · ⏱ '+dur+' min':'')
    +'\n✅ '+p.exDone+'/'+p.exTotal+' exercícios · '+p.setsDone+' séries'
    +'\n🏋️ Volume: '+Math.round(vol)+' kg·rep'+(trend!==null?' ('+(trend>=0?'+':'')+trend+'% vs anterior)':'')
    +(ups.length?'\n📈 Subi carga em: '+ups.map(function(r){ return r.it.name+' (+'+kg(r.delta)+' kg)'; }).join(', '):'');
  var wa = 'https://wa.me/'+PHONE+'?text='+encodeURIComponent(msg);
  var sm=$('summary'); sm.style.setProperty('--day', d.color);
  $('s-body').innerHTML = '<div class="play-top"><div class="play-step">Resumo · '+esc(d.title)+'</div><button class="btn" id="s-x">Fechar</button></div>'
    +'<div class="s-title" id="s-title">'+esc(d.title)+' concluído!</div>'
    +'<div class="play-equip mono" id="s-date">'+fmtDate(at)+(dur?' · '+dur+' min de treino':'')+'</div>'
    +'<div class="stats"><div class="stat"><b>'+Math.round(vol)+'</b><span>kg·rep'+(trend!==null?' · '+(trend>=0?'+':'')+trend+'%':'')+'</span></div>'
    +'<div class="stat"><b>'+p.setsDone+'</b><span>séries</span></div><div class="stat"><b>'+p.exDone+'/'+p.exTotal+'</b><span>exercícios</span></div></div>'
    +rows.map(function(r){ return '<div class="srow"><div class="thumb">'+icon(r.it.i)+'</div><div class="n">'+esc(r.it.name)
      +'<small>'+(hasLoad(r.it)?r.tops.map(function(x,i){ return r.it.parts[i].bw?null:kg(x)+' kg'; }).filter(Boolean).join(' / '):'peso corporal')+'</small></div>'
      +(r.delta===null?'':'<span class="delta '+(r.delta>0?'up':r.delta<0?'dn':'')+'">'+(r.delta>0?'+':'')+kg(r.delta)+' kg</span>')+'</div>'; }).join('')
    +'<div class="sbtns"><a class="btn day" id="s-wa" target="_blank" rel="noopener" href="'+esc(wa)+'">Enviar resumo pro Leo</a><button class="btn" id="s-save">Fechar</button></div>';
  sm.classList.add('on'); document.body.style.overflow='hidden'; render();
  if(state.finishes % 10 === 0) toast('Você já finalizou '+state.finishes+' treinos. Bom momento para exportar um backup (botão no rodapé).', 7000);
}
$('summary').addEventListener('click', function(e){
  if(e.target.closest('#s-x') || e.target.closest('#s-save')){ $('summary').classList.remove('on'); document.body.style.overflow=''; render(); window.scrollTo(0,0); }
});

/* ================= backup ================= */
$('expBtn').onclick=function(){
  var txt=JSON.stringify(state,null,2);
  try{ var a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([txt],{type:'application/json'}));
    a.download=(F.slug||'treino')+'-backup-'+new Date().toISOString().slice(0,10)+'.json'; document.body.appendChild(a); a.click(); a.remove(); }catch(e){}
  var box=$('bkBox'); box.value=txt; box.style.display='block';
  try{ navigator.clipboard.writeText(txt).then(function(){ $('bkMsg').textContent='Backup baixado e copiado. Se o download não aparecer, cole o texto num bloco de notas.'; },function(){ box.select(); $('bkMsg').textContent='Se o download não aparecer, copie o texto acima e guarde.'; }); }
  catch(e){ box.select(); $('bkMsg').textContent='Se o download não aparecer, copie o texto acima e guarde.'; }
};
$('impBtn').onclick=function(){ $('impFile').click(); };
$('impFile').onchange=function(){
  var f=this.files[0], inp=this; if(!f) return; var rd=new FileReader();
  rd.onload=function(){ try{ var data=JSON.parse(rd.result); if(!data||!data.sets) throw 0; var b=blank(); for (var k in data) b[k]=data[k]; state=b; writeNow(); render(); $('bkMsg').textContent='Backup importado. Histórico, cargas e datas restaurados.'; }
    catch(e){ $('bkMsg').textContent='Não foi possível ler esse arquivo. Selecione um backup exportado por esta ficha.'; } inp.value=''; };
  rd.readAsText(f);
};

/* ================= início ================= */
window.LEO = { DAYS:DAYS, state:function(){ return state; }, key:KEY };
try{
  if(!load() && migrate()) setTimeout(function(){ toast('Pronto! Suas cargas e datas do app antigo vieram junto para esta versão nova.', 6000); }, 400);
  if(!dayById(state.day)) state.day=DAYS[0].id;
  render();
}catch(e){ main.innerHTML='<div style="background:#2A1416;border:1px solid #E23A3A;border-radius:12px;padding:16px;margin-top:16px;font-size:13px;color:#F0C7C7"><b style="color:#fff">Ocorreu um erro ao carregar os treinos.</b><br>Tire um print e envie pro Leo:<br><br><code>'+esc(e && e.message ? e.message : e)+'</code></div>'; }

if('serviceWorker' in navigator && location.protocol==='https:' && !F.preview){
  window.addEventListener('load', function(){ navigator.serviceWorker.register(BASE+'sw.js', { scope: BASE }).catch(function(){}); });
}
})();
