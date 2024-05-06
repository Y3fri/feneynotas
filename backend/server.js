const express = require('express');
const { Sequelize } = require('sequelize');
const Nota = require('./models/Nota');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Modelo de la Nota
Nota.init(
  {
    titulo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    contenido: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    archivada: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'Nota'
  }
);

// Middleware para manejar JSON
app.use(express.json());

// Configuración de CORS para permitir solicitudes desde cualquier origen
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Ruta de inicio, redirecciona a /notas
app.get('/', (req, res) => {
  res.redirect('/notas');
});

// Crear una nueva nota
app.post('/notas', async (req, res) => {
  const { titulo, contenido } = req.body;

  try {
    const nuevaNota = await Nota.create({ titulo, contenido });
    res.status(201).json(nuevaNota);
  } catch (error) {
    console.error('Error al crear la nota:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener todas las notas
app.get('/notas', async (req, res) => {
  try {
    const notas = await Nota.findAll();
    res.status(200).json(notas);
  } catch (error) {
    console.error('Error al obtener las notas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener una nota por su ID
app.get('/notas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const nota = await Nota.findByPk(id);
    if (!nota) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }
    res.status(200).json(nota);
  } catch (error) {
    console.error('Error al obtener la nota:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Editar una nota
app.put('/notas/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, contenido } = req.body;

  try {
    const nota = await Nota.findByPk(id);
    if (!nota) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }

    nota.titulo = titulo;
    nota.contenido = contenido;
    await nota.save();

    res.status(200).json(nota);
  } catch (error) {
    console.error('Error al editar la nota:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar una nota
app.delete('/notas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const nota = await Nota.findByPk(id);
    if (!nota) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }

    await nota.destroy();

    res.status(200).json({ message: 'Nota eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la nota:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Archivar o desarchivar una nota
app.put('/notas/:id/archivar', async (req, res) => {
  const { id } = req.params;
  const { archivada } = req.body;

  try {
    console.log('Cuerpo de la solicitud:', req.body); // Agrega esta línea

    const nota = await Nota.findByPk(id);
    if (!nota) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }

    nota.archivada = archivada;
    await nota.save();

    res.status(200).json(nota);
  } catch (error) {
    console.error('Error al archivar/desarchivar la nota:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//filtrar por titulo
app.get('/notas/titulo/:titulo', async (req, res) => {
  const { titulo } = req.params;

  try {
      const notas = await Nota.findAll({
          where: {
              titulo: {
                  [Sequelize.Op.like]: `%${titulo}%`
              }
          }
      });
      res.status(200).json(notas);
  } catch (error) {
      console.error('Error al filtrar las notas por título:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error general en el servidor:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Sincronizar la base de datos sin forzar la eliminación de tablas existentes
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});