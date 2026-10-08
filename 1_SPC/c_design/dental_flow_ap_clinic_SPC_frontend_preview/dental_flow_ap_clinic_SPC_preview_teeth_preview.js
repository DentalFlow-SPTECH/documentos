const permanent=['18','17','16','15','14','13','12','11','21','22','23','24','25','26','27','28','48','47','46','45','44','43','42','41','31','32','33','34','35','36','37','38'];
const primary=['55','54','53','52','51','61','62','63','64','65','85','84','83','82','81','71','72','73','74','75'];
const quadrants=['Superior direito','Superior esquerdo','Inferior direito','Inferior esquerdo'];
const linked=new Set(['16','26','46']);
let dentition='permanent', selected='16';
const map=document.getElementById('tooth_map');
function shape(tooth,compact,lower){
 if(compact)return `<svg viewBox="0 0 52 52" fill="none" aria-hidden="true"><path d="M12 6Q26 0 40 6Q50 13 47 30Q43 47 27 49Q11 49 5 35Q1 18 12 6Z" fill="${linked.has(tooth)?'#d7eee6':'#f4f8f7'}" stroke="#486b6c" stroke-width="1.4"/><path d="M16 16Q26 12 36 16L36 36Q25 41 16 35Z" fill="white" stroke="#86a3a1"/><path d="M10 8L16 16M42 9L36 16M43 40L36 36M10 40L16 35" stroke="#86a3a1"/><path d="M21 20L27 27L32 22M27 27L24 33" stroke="#86a3a1" stroke-linecap="round"/></svg>`;
 const position=Number(tooth[1]);
 const crown=position<=2?'M12 8Q24 4 36 8L36 28Q31 36 24 37Q16 35 12 28Z':position===3?'M13 11Q18 2 24 3Q31 2 36 11L37 28Q30 37 24 38Q16 36 11 28Z':'M7 12Q8 3 15 7Q24 2 32 7Q40 3 41 12L40 29Q35 38 24 38Q12 38 8 29Z';
 const roots=position<=3?'M14 30L19 52Q23 64 25 54L33 31':'M10 30L14 52Q16 59 19 50L24 41L29 51Q33 59 35 51L38 29';
 return `<svg viewBox="0 0 48 64" fill="none" aria-hidden="true" style="transform:rotate(${lower?0:180}deg)"><path d="${roots}" fill="#f1f5f3" stroke="#8da7a4" stroke-width="1.4"/><path d="${crown}" fill="${linked.has(tooth)?'#c9e7de':'#fff'}" stroke="#345e60" stroke-width="1.6"/><path d="M17 14Q24 19 31 14M24 18L24 27" stroke="#91ada6" stroke-width="1.2" stroke-linecap="round"/><path d="M14 11Q11 18 15 25" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>`;
}
function toothButton(tooth,compact,lower,index,length){
 const x=5+(index/(length-1))*90;
 const fraction=(x-50)/45;
 const y=lower?45+148*Math.sqrt(Math.max(0,1-fraction*fraction)):245-148*Math.sqrt(Math.max(0,1-fraction*fraction));
 return `<button type="button" class="tooth ${linked.has(tooth)?'linked':''} ${selected===tooth?'selected':''}" data-tooth="${tooth}" aria-pressed="${selected===tooth}" aria-label="Selecionar dente ${tooth}${linked.has(tooth)?', com item no orçamento':''}" style="--x:${x}%;--y:${y}px">${shape(tooth,compact,lower)}<span>${tooth}</span></button>`;
}
function render(){
 const teeth=dentition==='permanent'?permanent:primary,size=teeth.length/4;
 if(map.dataset.version==='a')map.innerHTML=[0,1].map(arch=>`${arch?'<hr class="arch-divider">':''}<div class="arc-line ${arch?'lower':''}"><svg class="arc-guide" viewBox="0 0 760 290" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="${arch?'M40 44Q380 370 720 44':'M40 244Q380 -80 720 244'}" stroke="#d8e7e1" stroke-width="20" opacity=".5"/></svg>${teeth.slice(arch*size*2,(arch+1)*size*2).map((tooth,i)=>toothButton(tooth,false,arch===1,i,size*2)).join('')}<span class="arc-center">Arcada ${arch?'inferior':'superior'}</span></div>`).join('');
 else map.innerHTML=`<div class="quadrants">${quadrants.map((label,q)=>`<section aria-label="${label}"><h3>${label}</h3><div class="quad">${teeth.slice(q*size,(q+1)*size).map(tooth=>toothButton(tooth,true,q>1,0,2)).join('')}</div></section>`).join('')}</div>`;
 document.getElementById('selected_number').textContent=selected;
 document.getElementById('selected_quadrant').textContent=quadrants[Math.floor(teeth.indexOf(selected)/size)];
}
map.addEventListener('click',event=>{const button=event.target.closest('[data-tooth]');if(!button)return;selected=button.dataset.tooth;render();document.querySelector(`[data-tooth="${selected}"]`).focus();document.getElementById('tooth_notice').textContent=`Dente ${selected} selecionado.`;});
for(const mode of ['permanent','primary'])document.getElementById(mode).addEventListener('click',()=>{dentition=mode;selected=mode==='permanent'?'16':'55';for(const id of ['permanent','primary'])document.getElementById(id).setAttribute('aria-pressed',String(id===mode));render();document.getElementById('tooth_notice').textContent='';});
document.getElementById('add_item').addEventListener('click',()=>{linked.add(selected);render();const li=document.createElement('li');const tooth=document.createElement('span');tooth.className='number';tooth.textContent=selected;const text=document.createElement('span');text.textContent='Novo procedimento';const detail=document.createElement('small');detail.textContent=document.getElementById('surface').value||'Região não informada';text.append(detail);li.append(tooth,text);document.getElementById('planned').append(li);document.getElementById('tooth_notice').textContent=`Item incluído no dente ${selected} nesta prévia.`;});
render();
