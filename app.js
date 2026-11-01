import { units, images, area, exterior } from './data/units.js';

const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
const rows = document.querySelector('#unit-rows');
const typeFilter = document.querySelector('#type-filter');
const statusFilter = document.querySelector('#status-filter');
const unitDialog = document.querySelector('#unit-dialog');
const imageDialog = document.querySelector('#image-dialog');
let lastUnitTrigger;

function renderUnits() {
  const filtered = units.filter(unit => (typeFilter.value === 'all' || unit.category === typeFilter.value) && (statusFilter.value === 'all' || unit.status === statusFilter.value));
  rows.innerHTML = filtered.map(unit => `<tr data-unit="${unit.id}">
    <th scope="row"><a class="unit-link" href="#jednotka/${unit.id}" aria-label="Detail jednotky ${unit.id}">${unit.id}</a></th>
    <td class="unit-type">${unit.type}</td>
    <td class="cell-floor" data-label="Podlažie">${unit.floor}</td>
    <td class="cell-area" data-label="Interiér">${area(unit.interior)}</td>
    <td class="cell-exterior" data-label="Exteriér">${exterior(unit)}</td>
    <td class="cell-status"><span class="status ${unit.status === 'Rezervované' ? 'reserved' : ''}">${unit.status}</span></td>
    <td class="cell-action"><a class="interest-link" href="#dopyt/${unit.id}" aria-label="Mám záujem o jednotku ${unit.id}">Mám záujem ${arrow}</a></td>
  </tr>`).join('');
  document.querySelector('#result-count').textContent = `Zobrazených ${filtered.length} z ${units.length} jednotiek`;
  document.querySelector('#empty-state').hidden = filtered.length !== 0;
  document.querySelector('.offer-table').hidden = filtered.length === 0;
}
typeFilter.addEventListener('change', renderUnits);
statusFilter.addEventListener('change', renderUnits);
document.querySelector('#reset-filters').addEventListener('click', () => {
  typeFilter.value = statusFilter.value = 'all';
  renderUnits();
  typeFilter.focus();
});
rows.addEventListener('click', event => { if (event.target.closest('a')) lastUnitTrigger = event.target.closest('a'); });

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });

function closeUnit() {
  if (/^#(jednotka|dopyt)\//.test(location.hash)) history.replaceState(null, '', `${location.pathname}${location.search}#ponuka`);
  unitDialog.close();
  if (lastUnitTrigger?.isConnected) lastUnitTrigger.focus({ preventScroll: true });
}
document.querySelector('#close-unit').addEventListener('click', closeUnit);
unitDialog.addEventListener('cancel', event => { event.preventDefault(); closeUnit(); });
unitDialog.addEventListener('click', event => { if (event.target === unitDialog) { const r = unitDialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeUnit(); } });

function openUnit(unit, inquiry = false) {
  const image = images[unit.image];
  document.querySelector('#unit-detail').innerHTML = `<div class="detail-body">
    <div class="detail-heading"><div><h2 id="unit-title">Jednotka ${unit.id}</h2><p class="detail-type">${unit.type} · ${unit.floor}</p></div><span class="status ${unit.status === 'Rezervované' ? 'reserved' : ''}">${unit.status}</span></div>
    <p class="detail-note">Fiktívne označenie, dispozícia, výmery aj stav. Tento detail je ukážka, nie skutočná predajná ponuka.</p>
    <figure class="detail-image"><img src="${image.src}" alt="${image.alt}" width="1536" height="1024"><figcaption class="image-label">Ilustrácia</figcaption></figure>
    <dl class="area-list"><div><dt>Interiér</dt><dd>${area(unit.interior)}</dd></div><div><dt>Balkón</dt><dd>${area(unit.balcony)}</dd></div><div><dt>Terasa</dt><dd>${area(unit.terrace)}</dd></div><div><dt>Sklad</dt><dd>V ukážke neuvedený</dd></div><div><dt>Cena</dt><dd>Na vyžiadanie</dd></div><div><dt>Parkovanie</dt><dd>Podmienky nepotvrdené</dd></div></dl>
    <p class="detail-note">Interiér a exteriér sa uvádzajú samostatne. Skutočný pôdorys, štandard a presný rozpis plôch zatiaľ nie sú k dispozícii.</p>
    <div class="detail-actions"><button class="button primary" id="show-inquiry">Vyskúšať dopyt ${arrow}</button><button class="button secondary" id="share-unit">Kopírovať odkaz na jednotku</button></div><p class="share-result" id="share-result" role="status"></p>
    <input class="share-fallback" id="share-fallback" aria-label="Odkaz na jednotku na ručné skopírovanie" readonly hidden>
    <form class="demo-form" id="inquiry-form" hidden><h3>Ukážkový dopyt</h3><p>Vybraná jednotka: <strong>${unit.id}</strong>. Údaje sa nikam neodosielajú ani neukladajú. Na vyskúšanie použite vymyslené údaje.</p><div class="form-grid"><label>Meno<input name="name" autocomplete="off" required maxlength="100" placeholder="Ukážkové meno"></label><label>E-mail<input name="email" type="email" autocomplete="off" required maxlength="200" placeholder="meno@example.com"></label><label class="form-message">Správa<textarea name="message" required maxlength="2000">Mám záujem o ukážkovú jednotku ${unit.id}.</textarea></label></div><button class="button primary" type="submit">Vyskúšať formulár</button></form>
    <div class="form-result" id="form-result" role="status" tabindex="-1" hidden><h3>Ukážka dokončená.</h3><p>Nič sa neodoslalo ani neuložilo. V ostrej verzii bude dopyt smerovať predajcovi po doplnení kontaktných údajov a pravidiel ochrany osobných údajov.</p></div>
  </div>`;
  function showInquiry() {
    const form = document.querySelector('#inquiry-form');
    form.hidden = false;
    document.querySelector('#form-result').hidden = true;
    form.scrollIntoView({ block: 'start' });
    form.querySelector('input').focus({ preventScroll: true });
  }
  document.querySelector('#show-inquiry').addEventListener('click', showInquiry);
  document.querySelector('#share-unit').addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(location.href);
      document.querySelector('#share-result').textContent = 'Odkaz na jednotku bol skopírovaný.';
    } catch {
      const field = document.querySelector('#share-fallback'); field.hidden = false; field.value = location.href; field.focus(); field.select();
      document.querySelector('#share-result').textContent = 'Skopírujte označený odkaz ručne.';
    }
  });
  document.querySelector('#inquiry-form').addEventListener('submit', event => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    event.currentTarget.reset();
    event.currentTarget.hidden = true;
    document.querySelector('#form-result').hidden = false;
    document.querySelector('#form-result').focus();
    document.querySelector('#form-result').scrollIntoView({ block: 'nearest' });
  });
  if (!unitDialog.open) unitDialog.showModal();
  unitDialog.scrollTop = 0;
  if (inquiry) showInquiry();
}
function route() {
  const match = location.hash.match(/^#(jednotka|dopyt)\/(.*)$/);
  if (match) {
    let id;
    try { id = decodeURIComponent(match[2]); } catch { id = ''; }
    const unit = units.find(item => item.id === id);
    if (unit) { openUnit(unit, match[1] === 'dopyt'); return; }
    history.replaceState(null, '', `${location.pathname}${location.search}#ponuka`);
  }
  if (unitDialog.open) unitDialog.close();
}
window.addEventListener('hashchange', route);

document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.image;
  const image = images[key];
  const target = document.querySelector('#lightbox-image');
  target.src = image.src; target.alt = image.alt;
  document.querySelector('#lightbox-title').textContent = key === 'living' ? 'Interiér bytu — ilustrácia' : 'Administratíva — ilustrácia';
  imageDialog.showModal();
}));
document.querySelector('#close-image').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', event => { if (event.target === imageDialog) { const r = imageDialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) imageDialog.close(); } });
renderUnits();
route();
