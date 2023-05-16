const hamburgerIcon = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburgerIcon.addEventListener("click", () => {
    hamburgerIcon.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburgerIcon.classList.remove("active");
    navMenu.classList.remove("active");
}))

let socket = io();
let messages = document.querySelector('section ul')
let input = document.querySelector('input')

// Luister naar het submit event
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()

  // Als er überhaupt iets getypt is
  if (input.value) {
    // Stuur het bericht naar de server
    socket.emit('message', input.value)

    // Leeg het form field
    input.value = ''
  }
})

// Luister naar berichten van de server
socket.on('message', (message) => {
  addMessage(message)
})

/**
 * Impure function that appends a new li item holding the passed message to the
 * global messages object and then scrolls the list to the last message.
 * @param {*} message the message to append
 */
function addMessage(message) {
  messages.appendChild(Object.assign(document.createElement('li'), { textContent: message }))
  messages.scrollTop = messages.scrollHeight
}