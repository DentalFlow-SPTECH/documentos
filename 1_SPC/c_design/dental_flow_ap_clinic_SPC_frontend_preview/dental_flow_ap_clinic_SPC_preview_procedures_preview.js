const data=await fetch('/scenario.json').then(r=>r.json());
const procedures=[...data.procedures];
const money=value=>value==null?'Não informado':new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(value/100);
const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const normalize=value=>value.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLocaleLowerCase('pt-BR');
let query='',page=0,previousFocus;
function render(){
 const matches=procedures.filter(p=>normalize(p.name).includes(normalize(query)));
 const pages=Math.max(1,Math.ceil(matches.length/8));page=Math.min(page,pages-1);
 document.getElementById('total_procedures').textContent=`${procedures.length} procedimentos`;
 document.getElementById('procedure_count').textContent=matches.length?`${page*8+1}–${Math.min(page*8+8,matches.length)} de ${matches.length}`:'Nenhum resultado';
 document.getElementById('procedure_list').innerHTML=matches.slice(page*8,page*8+8).map(p=>`<li><div><strong>${escape(p.name)}</strong><small>Disponível no catálogo</small></div><div><small>Valor de referência</small><strong>${money(p.referencePriceCents)}</strong></div><button type="button" class="btn quiet" data-id="${escape(p.id)}">Detalhes</button></li>`).join('')||'<li>Nenhum procedimento corresponde à busca.</li>';
 document.getElementById('page_count').textContent=`Página ${page+1} de ${pages}`;
 document.getElementById('previous').disabled=page===0;document.getElementById('next').disabled=page+1===pages;
}
document.getElementById('procedure_search').addEventListener('input',event=>{query=event.target.value;page=0;render();});
document.getElementById('previous').addEventListener('click',()=>{page--;render();});
document.getElementById('next').addEventListener('click',()=>{page++;render();});
document.getElementById('new_procedure').addEventListener('click',event=>{event.preventDefault();document.getElementById('procedure_name').focus();});
document.getElementById('procedure_form').addEventListener('submit',event=>{
 event.preventDefault();const name=document.getElementById('procedure_name').value.trim();const input=document.getElementById('procedure_price');const text=input.value.trim().replace(',','.');
 if(text&&!/^\d+(\.\d{1,2})?$/.test(text)){input.setCustomValidity('Use um valor com até duas casas decimais.');input.reportValidity();return;}
 input.setCustomValidity('');if(!name)return;procedures.unshift({id:crypto.randomUUID(),name,referencePriceCents:text?Math.round(Number(text)*100):null});query=name;page=0;document.getElementById('procedure_search').value=query;render();event.target.reset();document.getElementById('form_notice').textContent='Procedimento incluído nesta prévia.';
});
document.getElementById('procedure_price').addEventListener('input',event=>event.target.setCustomValidity(''));
const dialog=document.getElementById('procedure_detail');
document.getElementById('procedure_list').addEventListener('click',event=>{const button=event.target.closest('[data-id]');if(!button)return;const procedure=procedures.find(p=>p.id===button.dataset.id);previousFocus=button;document.getElementById('detail_name').textContent=procedure.name;document.getElementById('detail_price').textContent=`Valor de referência: ${money(procedure.referencePriceCents)}`;dialog.showModal();document.getElementById('detail_close').focus();});
document.getElementById('detail_close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>previousFocus?.focus());
render();
