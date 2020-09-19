# News App

Aplicación de Noticias utilizada para fines académicos. Consume el servicio de [newsapi.org](https://newsapi.org/).

## Preparación

Para consumir el servicio, es requerido generar un API Key en Newsapi.org para poder realizar llamadas asíncronas para obtener headlines, categorías, noticias, etc. Ejemplo:
http://newsapi.org/v2/everything?q=bitcoin&from=2020-08-19&sortBy=publishedAt&apiKey={api_key}

## Tech Stack
* JavaScript
* TypeScript
* Node
  * Express
* Angular
* Jest (unit testing)

## Desarrollo
Este proyecto utiliza la librería `http-server` para correr la aplicación localmente. 
Ejecuta el comando `npm start` y navega a `http://localhost:4046` para visualizar el proyecto. 

Recuerda instalar las dependencias utilizando `npm install` si no se han instalado previamente. 

## Pruebas Unitarias
Ejecuta las pruebas corriendo el script en package.json: `npm run test`