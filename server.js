// Importeer express uit de node_modules map
import * as dotenv from "dotenv";
import express from 'express';
import postServer from "./routes/post-server.js";

dotenv.config();

// Maak een nieuwe express app aan
const app = express()

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
app.get('/form', function (req, res) {
  res.render('form')
})

/// Maak een route voor de detailpage
app.get('/stekje', function (req, res) {
  const url = `${process.env.API_URL}/stekjes?id=${req.query.id}`
  fetchJson(url).then((data) => {
    res.render('detail', data)
  })
})

app.get('/stekjesbieb', function (req, res) {
  const url = `${process.env.API_URL}/stekjes`
  fetchJson(url).then((data) => {
    res.render('stekjesbieb', data)
  })
})

// na submit Stel afhandeling van formulieren in
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Stel de files routes in
app.use("/", postServer);

// Stel het poortnummer in waar express op gaat luisteren
app.set('port', 8000)

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get('port'), function () {
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
