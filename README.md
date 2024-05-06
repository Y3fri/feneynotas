Aplicación de Notas
Descripción
Este proyecto es una aplicación de notas que permite crear, editar, eliminar, archivar/desarchivar y filtrar notas por título. La aplicación consta de un backend desarrollado en Node.js con Express y Sequelize para la gestión de la base de datos SQLite, y un frontend que interactúa con el backend mediante solicitudes HTTP.

Tiempos de Ejecución y Herramientas
Node.js v20.6.1
Express v4.17.1
Sequelize v6.37.3
SQLite v5.1.7

Instalación
Clona este repositorio en tu máquina local.
Abre una terminal y navega hasta la carpeta del proyecto.
Instala las dependencias del backend con el siguiente comando:

cd backend
npm install


Ejecución Backend:

Abre una terminal.
Navega hasta la carpeta del backend:

cd backend

Ejecuta el siguiente comando para iniciar el servidor backend en el puerto 3000:

npm start


Archivos Frontend

index.html: Página principal que permite crear nuevas notas.
lista-notas.html: Página que muestra un listado de todas las notas, activas y archivadas, y permite filtrarlas por título.
styles.css: Archivo CSS que define los estilos visuales de las páginas.
script.js: Archivo JavaScript que maneja la lógica de creación y envío de notas.
script2.js: Archivo JavaScript que maneja la lógica de visualización, edición, eliminación, archivado/desarchivado y filtrado de notas.

Ejecución Frontend:

Abre el archivo index.html en tu navegador web para crear nuevas notas.
Para ver el listado de notas y realizar acciones como editar, eliminar, archivar/desarchivar y filtrar, abre el archivo lista-notas.html en tu navegador web.



BACKEND

Uso:
Accede a la aplicación desde tu navegador web.
Crea nuevas notas proporcionando un título y contenido.
Edita o elimina notas existentes.
Archiva o desarchiva notas para organizarlas.
Filtra las notas por título para buscar información específica.
Notas Adicionales:
La aplicación utiliza CORS para permitir solicitudes desde cualquier origen.
El backend se conecta a una base de datos SQLite almacenada en el archivo database.sqlite.
La sincronización de la base de datos se realiza sin forzar la eliminación de tablas existentes


FRONTEND

Uso:
Crear Nota: En la página principal (index.html), completa el formulario con el título y contenido de la nota y presiona "Guardar Nota".
Listado de Notas: En la página de listado (lista-notas.html), puedes ver todas las notas activas y archivadas. Puedes realizar las siguientes acciones:
Editar una nota: Haz clic en el botón "Editar" y sigue las instrucciones.
Eliminar una nota: Haz clic en el botón "Eliminar" y confirma la acción.
Archivar una nota: Haz clic en el botón "Archivar" en la sección de notas activas.
Desarchivar una nota: Haz clic en el botón "Desarchivar" en la sección de notas archivadas.
Filtrar notas por título: Ingresa el título de la nota en el campo de búsqueda y presiona "Buscar".
Notas Adicionales:
La aplicación frontend se conecta al servidor backend en http://localhost:3000 para realizar operaciones CRUD en las notas.
Se recomienda mantener el servidor backend en ejecución mientras se utiliza el frontend para evitar problemas de conexión.
Los estilos visuales de las páginas están definidos en el archivo styles.css.
La lógica de interacción con el backend y la manipulación del DOM está implementada en los archivos JavaScript script.js y script2.js.

