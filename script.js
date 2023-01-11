const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const caretElement = document.querySelector('.caret')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

let startTyping = true

document.addEventListener('keydown', () =>{
    quoteInputElement.focus()
})

quoteInputElement.addEventListener('input', () => {
    if(startTyping) {  // starts timer when any input is detected
        startTimer()
        startTyping = false
    }
    
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    
    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }
    })
    
    if (correct) {
        stopTimer()
        renderNewQuote()
        startTyping = true
    }
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    
    const quote = await getRandomQuote()
    quoteDisplayElement.innerText = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    renderTimer()
    resetTimer()
}

let seconds = 0  // initialize timer seconds
let elapsedSeconds = 0  // initialize elapsed seconds
let timer  // initialize timer variable for setInterval/clearInterval

function renderTimer() {  // timer is visible as 0
    timerElement.innerText = 0
}

function resetTimer() {  // resets all attributes of timer
    seconds = 0
    elapsedSeconds = 0; 
    startTyping = true
}

function startTimer() {  // start timer that increments by second
    var interval = 100  // how often setInterval should update
    var startTime = Date.now() 
    timer = setInterval(function() {
        var changeInTime = Date.now() - startTime  // accurate milliseconds since start
        seconds = Math.floor(changeInTime/1000)
        timerElement.innerText = seconds  
    }, interval)
}
function stopTimer() {  // stops timer
    clearInterval(timer)
    elapsedSeconds = seconds;
}

renderNewQuote()

