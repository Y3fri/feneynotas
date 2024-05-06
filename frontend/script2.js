document.addEventListener('DOMContentLoaded', () => {
    obtenerNotas();
});

async function obtenerNotas() {
    try {
        const response = await fetch('http://localhost:3000/notas');
        if (!response.ok) {
            throw new Error('Error al obtener las notas. Inténtalo nuevamente.');
        }
        const data = await response.json();
        mostrarNotasActivas(data.filter(nota => !nota.archivada));
        mostrarNotasArchivadas(data.filter(nota => nota.archivada));
    } catch (error) {
        console.error('Error al obtener las notas:', error);
        alert('Error al obtener las notas. Inténtalo nuevamente.');
    }
}

function mostrarNotasActivas(notas) {
    const notasLista = document.getElementById('notas-lista');
    notasLista.innerHTML = '';

    notas.forEach(nota => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>Título:</strong> ${nota.titulo}</span>
            <p><strong>Contenido:</strong> ${nota.contenido}</p>
            <div>
                <button onclick="editarNota(${nota.id})">Editar</button>
                <button onclick="eliminarNota(${nota.id})">Eliminar</button>
                <button onclick="archivarNota(${nota.id})">Archivar</button>
            </div>
        `;

        notasLista.appendChild(li);
    });
}

function mostrarNotasArchivadas(notas) {
    const notasLista = document.getElementById('notas-archivadas-lista');
    notasLista.innerHTML = '';

    notas.forEach(nota => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>Título:</strong> ${nota.titulo}</span>
            <p><strong>Contenido:</strong> ${nota.contenido}</p>
            <div>
                <button onclick="desarchivarNota(${nota.id})">Desarchivar</button>
            </div>
        `;

        notasLista.appendChild(li);
    });
}

async function editarNota(id) {
    const nuevoTitulo = prompt('Ingrese el nuevo título de la nota:');
    if (nuevoTitulo) {
      const nuevoContenido = prompt('Ingrese el nuevo contenido de la nota:');
      if (nuevoContenido) {
        try {
          const response = await fetch(`http://localhost:3000/notas/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo: nuevoTitulo, contenido: nuevoContenido })
          });
          if (!response.ok) {
            throw new Error('Error al editar la nota. Inténtalo nuevamente.');
          }
          const data = await response.json();
          console.log(data);
          alert('Nota editada exitosamente.');
          obtenerNotas();
        } catch (error) {
          console.error('Error al editar la nota:', error);
          alert('Error al editar la nota. Inténtalo nuevamente.');
        }
      }
    }
}

async function eliminarNota(id) {
    if (confirm('¿Estás seguro de eliminar esta nota?')) {
        try {
          const response = await fetch(`http://localhost:3000/notas/${id}`, {
            method: 'DELETE'
          });
          if (!response.ok) {
            throw new Error('Error al eliminar la nota. Inténtalo nuevamente.');
          }
          const data = await response.json();
          console.log(data);
          alert('Nota eliminada exitosamente.');
          obtenerNotas();
        } catch (error) {
          console.error('Error al eliminar la nota:', error);
          alert('Error al eliminar la nota. Inténtalo nuevamente.');
        }
      }  
}

async function archivarNota(id) {
    try {
        const response = await fetch(`http://localhost:3000/notas/${id}/archivar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ archivada: true })
        });

        if (!response.ok) {
            throw new Error('Error al archivar la nota. Inténtalo nuevamente.');
        }

        obtenerNotas();
    } catch (error) {
        console.error('Error al archivar la nota:', error);
        alert('Error al archivar la nota. Inténtalo nuevamente.');
    }
}

async function desarchivarNota(id) {
    try {
        const response = await fetch(`http://localhost:3000/notas/${id}/archivar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ archivada: false })
        });

        if (!response.ok) {
            throw new Error('Error al desarchivar la nota. Inténtalo nuevamente.');
        }

        obtenerNotas();
    } catch (error) {
        console.error('Error al desarchivar la nota:', error);
        alert('Error al desarchivar la nota. Inténtalo nuevamente.');
    }
}

async function filtrarPorTitulo() {
    const tituloFiltro = document.getElementById('filtro-titulo').value.trim();
    if (tituloFiltro) {
        try {
            const response = await fetch(`http://localhost:3000/notas/titulo/${tituloFiltro}`);
            if (!response.ok) {
                throw new Error('Error al filtrar las notas por título. Inténtalo nuevamente.');
            }
            const data = await response.json();
            mostrarNotasActivas(data.filter(nota => !nota.archivada));
            mostrarNotasArchivadas(data.filter(nota => nota.archivada));
        } catch (error) {
            console.error('Error al filtrar las notas por título:', error);
            alert('Error al filtrar las notas por título. Inténtalo nuevamente.');
        }
    } else {
        obtenerNotas();
    }
}