// Zone sensibili in percentuale (facili da ritoccare).
// x,y,w,h sono percentuali relative all'immagine.
// Se vuoi spostare una zona: modifica i valori qui, salva, ricarica.

const ZONES = [
  {
    id: "q1",
    label: "1) Perché l’uomo soffre",
    x: 8, y: 20, w: 38, h: 36,
    title: "1. Perché l’uomo soffre",
    html: `
      <h2>Perché l’uomo soffre</h2>
      <p>Nel <strong>pessimismo storico</strong> Leopardi non pensa che l’uomo sia nato infelice.</p>
      <p>L’uomo soffre perché ha <strong>perso le illusioni</strong>: la civiltà moderna lo ha reso più razionale, più consapevole dei limiti della vita e quindi meno capace di sognare.</p>
      <p><strong>Idea chiave:</strong> quando l’uomo capisce che nessun piacere può essere davvero infinito, nasce una <strong>insoddisfazione perpetua</strong>.</p>
    `
  },
  {
    id: "q2",
    label: "2) Causa della sofferenza",
    x: 54, y: 20, w: 38, h: 24,
    title: "2. La causa della sofferenza",
    html: `
      <h2>La causa della sofferenza</h2>
      <p>In questa fase la causa non è la Natura: è la <strong>storia</strong>, cioè la <strong>civiltà</strong> e il progresso della ragione.</p>
      <p>Allontanandosi dalla Natura, l’uomo ha dimenticato la “medicina” che lo aiutava a reggere la vita: <strong>immaginazione</strong> e <strong>illusioni</strong>.</p>
      <p><strong>Storico</strong> significa proprio questo: la sofferenza dipende da un percorso umano nel tempo (non è ancora vista come legge dell’universo).</p>
    `
  },
  {
    id: "q3",
    label: "3) Natura e rimedi",
    x: 22, y: 63, w: 56, h: 22,
    title: "3. La Natura e i suoi rimedi",
    html: `
      <h2>La Natura e i suoi rimedi</h2>
      <p>Nel pessimismo storico la Natura è ancora una <strong>madre benigna</strong>: non è nemica, ma protettiva.</p>
      <p>Il suo rimedio non è una cura “reale”, ma una cura psicologica e poetica:</p>
      <ul>
        <li><strong>Immaginazione</strong></li>
        <li><strong>Illusioni</strong></li>
        <li><strong>Rimembranza</strong> (soprattutto l’infanzia)</li>
        <li><strong>Poesia</strong> (vago e indefinito)</li>
      </ul>
      <p>La Natura non elimina il dolore: lo rende <strong>sopportabile</strong> permettendo all’uomo di sognare.</p>
    `
  },
  {
    id: "q4",
    label: "4) Pessimismo / storico",
    x: 15, y: 3, w: 70, h: 12,
    title: "4. Significato di “pessimismo” e “storico”",
    html: `
      <h2>Cosa significa “pessimismo” e cosa “storico”</h2>
      <p><strong>Pessimismo</strong>: visione secondo cui l’uomo tende all’infelicità perché desidera un piacere <em>infinito</em>, ma il mondo offre solo piaceri <em>limitati</em>.</p>
      <p><strong>Storico</strong>: l’infelicità non è vista come eterna o naturale; dipende da una fase della storia umana: la modernità, che ha distrutto le illusioni.</p>
      <p><strong>In sintesi:</strong> l’uomo <em>è diventato</em> infelice nel tempo.</p>
    `
  }
];

let activeZoneId = null;

const shell = document.getElementById("mapShell");
const badge = document.getElementById("badge");
const meta = document.getElementById("meta");
const answerBody = document.getElementById("answerBody");
const btnReset = document.getElementById("btnReset");
const btnFocus = document.getElementById("btnFocus");

function clearActive(){
  activeZoneId = null;
  document.querySelectorAll(".hotspot").forEach(el => el.classList.remove("isActive"));
  badge.textContent = "Seleziona una domanda";
  meta.textContent = "Zone sensibili sulla mappa";
  answerBody.innerHTML = `
    <p class="muted">
      Qui comparirà il testo della risposta.  
      Suggerimento: usa questa pagina in classe come “lavagna interattiva”: mappa a sinistra, spiegazione a destra.
    </p>
  `;
}

function setActive(id){
  const z = ZONES.find(x => x.id === id);
  if(!z) return;

  activeZoneId = id;
  document.querySelectorAll(".hotspot").forEach(el => {
    el.classList.toggle("isActive", el.dataset.id === id);
  });

  badge.textContent = z.title;
  meta.textContent = "Risposta caricata dalla mappa";
  answerBody.innerHTML = z.html;
}

function injectHotspots(){
  ZONES.forEach(z => {
    const el = document.createElement("button");
    el.className = "hotspot";
    el.type = "button";
    el.dataset.id = z.id;

    // Posizionamento in percentuale
    el.style.left = z.x + "%";
    el.style.top = z.y + "%";
    el.style.width = z.w + "%";
    el.style.height = z.h + "%";

    el.setAttribute("aria-label", z.label);

    const tag = document.createElement("span");
    tag.textContent = z.label;
    el.appendChild(tag);

    el.addEventListener("click", () => setActive(z.id));
    shell.appendChild(el);
  });
}

btnReset.addEventListener("click", clearActive);

btnFocus.addEventListener("click", () => {
  if(!activeZoneId) return;
  const el = document.querySelector(`.hotspot[data-id="${activeZoneId}"]`);
  if(el){
    el.animate(
      [
        { transform: "scale(1.00)" },
        { transform: "scale(1.03)" },
        { transform: "scale(1.00)" }
      ],
      { duration: 420, iterations: 1 }
    );
  }
});

injectHotspots();
clearActive();
