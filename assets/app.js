(() => {
  const lessonEl = document.getElementById('lessonText');
  const lessonStatus = document.getElementById('lessonStatus');

  async function loadLesson() {
    try {
      const res = await fetch('intro.txt', { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const txt = await res.text();
      lessonEl.textContent = txt;
      lessonStatus.textContent = 'Caricato: intro.txt';
    } catch (err) {
      lessonEl.textContent = 'Impossibile caricare intro.txt. Verifica che il file esista nella stessa cartella di index.html.';
      lessonStatus.textContent = 'Errore: ' + err.message;
    }
  }

  // Notes (localStorage)
  const notesEl = document.getElementById('notes');
  const notesStatus = document.getElementById('notesStatus');
  const KEY = 'leopardi_notes_home_v1';

  function setStatus(msg) {
    notesStatus.textContent = msg;
  }

  function loadNotes() {
    const saved = localStorage.getItem(KEY);
    if (saved) {
      notesEl.value = saved;
      setStatus('Appunti recuperati dal browser.');
    } else {
      setStatus('Nessun appunto salvato, ancora.');
    }
  }

  function saveNotes() {
    localStorage.setItem(KEY, notesEl.value);
    const t = new Date();
    setStatus('Salvati: ' + t.toLocaleString());
  }

  function clearNotes() {
    if (!confirm('Vuoi cancellare gli appunti salvati?')) return;
    localStorage.removeItem(KEY);
    notesEl.value = '';
    setStatus('Appunti cancellati.');
  }

  function downloadNotes() {
    const blob = new Blob([notesEl.value], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'appunti-leopardi.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
  }

  document.getElementById('saveNotes').addEventListener('click', saveNotes);
  document.getElementById('downloadNotes').addEventListener('click', downloadNotes);
  document.getElementById('clearNotes').addEventListener('click', clearNotes);

  // Autosave (gentle)
  let timer;
  notesEl.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(saveNotes, 900);
  });

  loadLesson();
  loadNotes();
})();
