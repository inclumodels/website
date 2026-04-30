// Global helpers used across pages

// Score CSS class helper (called from Jinja via a custom filter registered in main.py)
// Also used directly in JS for dynamically rendered content
function scoreClass(score) {
  if (score === null || score === undefined) return 'score-none';
  if (score >= 75) return 'score-high';
  if (score >= 55) return 'score-mid';
  return 'score-low';
}

function scoreBarClass(score) {
  if (score >= 75) return 'bg-success';
  if (score >= 55) return 'bg-warning';
  return 'bg-danger';
}

// Drag-and-drop enhancement for zip drop zone
document.addEventListener('DOMContentLoaded', () => {
  const zone = document.getElementById('zip-drop-zone');
  if (zone) {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.querySelector('.zip-drop-label').style.borderColor = 'var(--accent)';
    });
    zone.addEventListener('dragleave', () => {
      zone.querySelector('.zip-drop-label').style.borderColor = '';
    });
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      const input = zone.querySelector('.zip-file-input');
      const file = e.dataTransfer.files[0];
      if (file && file.name.endsWith('.zip')) {
        const dt = new DataTransfer();
        dt.items.add(file);
        input.files = dt.files;
        document.getElementById('zip-file-name').textContent = file.name;
      }
      zone.querySelector('.zip-drop-label').style.borderColor = '';
    });
  }

  // Photo upload box drag support
  document.querySelectorAll('.photo-upload-box').forEach(box => {
    box.addEventListener('dragover', (e) => {
      e.preventDefault();
      box.querySelector('.photo-preview').style.borderColor = 'var(--accent)';
    });
    box.addEventListener('dragleave', () => {
      box.querySelector('.photo-preview').style.borderColor = '';
    });
    box.addEventListener('drop', (e) => {
      e.preventDefault();
      const input = box.querySelector('.photo-file-input');
      const file = e.dataTransfer.files[0];
      if (file) {
        const dt = new DataTransfer();
        dt.items.add(file);
        input.files = dt.files;
        const name = input.id.replace('inp-', '');
        if (typeof previewPhoto === 'function') previewPhoto(name);
      }
      box.querySelector('.photo-preview').style.borderColor = '';
    });
  });
});
