const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Nota = sequelize.define('Nota', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  archivada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false // Valor por defecto al crear una nota
  }
});

module.exports = Nota;
