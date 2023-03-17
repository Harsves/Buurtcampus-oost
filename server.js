// Importeer express uit de node_modules map
import express from 'express'

// Maak een nieuwe express app aan
const app = express()

const url = "https://api.buurtcampus-oost.fdnd.nl/api/v1/stekjes"
const data = await fetch(url).then(response => response.json())

// Stel ejs in als template engine en geef de 'views' map door
app.set('view engine', 'ejs')
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'))

// Maak een route voor de index
app.get('/', function (req, res) {
  res.render('index', data)
})


// Stel het poortnummer in waar express op gaat luisteren
app.set('port', 8000)

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get('port'), function () {
})
