document.addEventListener('DOMContentLoaded', () => {
  const formNota = document.getElementById('form-nota');

  formNota.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(formNota);
    const titulo = formData.get('titulo');
    const contenido = formData.get('contenido');

    try {
      const response = await fetch('http://localhost:3000/notas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, contenido })
      });
      const data = await response.json();
      console.log(data);
      alert('Nota guardada exitosamente.');
      window.location.href = 'lista-notas.html';
    } catch (error) {
      console.error('Error al crear la nota:', error);
      alert('Error al guardar la nota. Inténtalo nuevamente.');
    }
  });
});

