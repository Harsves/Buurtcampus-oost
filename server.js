// Importeer express uit de node_modules map
import * as path from 'path'
import * as dotenv from "dotenv";
import express from 'express';
import { Server } from 'socket.io'
import { createServer } from 'http'
import postServer from "./routes/post-server.js";

dotenv.config();

const app = express()
const http = createServer(app)
const io = new Server(http)

// Stel ejs in als template engine en geef de 'views' map door
app.set('view engine', 'ejs')
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'))

// Maak een route voor de index
app.get('/', function (req, res) {
  const url = `${process.env.API_URL}/stekjes`
  fetchJson(url).then((data) => {
    res.render('index', data)
  })
})

// Maak een route voor het form
app.get('/stekje-toevoegen', function (req, res) {
  res.render('form')
})

/// Maak een route voor de detailpage
app.get('/stekje', function (req, res) {
  const url = `${process.env.API_URL}/stekjes?id=${req.query.id}`
  fetchJson(url).then((data) => {
    res.render('detail', data)
  })
})

/// Maak een route voor de stekjesbieb
app.get('/stekjesbieb', function (req, res) {
  const url = `${process.env.API_URL}/stekjes`
  fetchJson(url).then((data) => {
    res.render('stekjesbieb', data)
  })
})

// Maak een route voor chatbox
app.get("/chatbox", function (req, res) {
  res.render("chatbox");
});

// na submit Stel afhandeling van formulieren in
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Stel de files routes in
app.use("/", postServer);

// Stel het poortnummer in waar express op gaat luisteren
app.set('port', 9000)

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get('port'), function () {
})


// Serveer client-side bestanden
app.use(express.static(path.resolve('public')))

io.on('connection', (socket) => {
  // Log de connectie naar console
  console.log('a user connected')
  // Stuur de historie door, let op: luister op socket, emit op io!
  io.emit('history', history)

  // Luister naar een message van een gebruiker
  socket.on('message', (message) => {
    // Check de maximum lengte van de historie
    while (history.length > historySize) {
      history.shift()
    }
    // Voeg het toe aan de historie
    history.push(message)
    // Verstuur het bericht naar alle clients
    io.emit('message', message)
  })

  // Luister naar een disconnect van een gebruiker
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
 async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}
