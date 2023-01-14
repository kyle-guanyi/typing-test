const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const overlay = document.getElementById('overlay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const wpmElement = document.getElementById('wpm')


let startTyping = true


document.addEventListener('keydown', () =>{
    quoteInputElement.focus()
})

quoteInputElement.addEventListener('input', () => {
    if(startTyping) {  // starts timer when any input is detected
        startTimer()
        startWPM()
        startTyping = false
    }
    
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    
    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
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
        stopWPM()
        overlay.style.display = 'block'
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
    renderWPM()
    resetTimer()
    resetWPM()
    overlay.style.display = 'none'
}

let seconds = 0 
let timer
let wpmCounter
let correctCharacters = 0

function renderTimer() {  // timer is visible as 0
    timerElement.innerText = 0
}

function startTimer() {  // start timer that increments by second
    var interval = 100  // how often setInterval should update (every tenth of a second)
    var startTime = Date.now() 
    timer = setInterval(function() {
        var changeInTime = Date.now() - startTime  // accurate milliseconds since start
        seconds = Math.floor(changeInTime/1000)
        timerElement.innerText = seconds  
    }, interval)
}
function stopTimer() {  // stops timer
    clearInterval(timer)
}

function resetTimer() {  // resets all attributes of timer
    seconds = 0
    startTyping = true
}

function renderWPM() {
    wpmElement.innerText = 0
}

function startWPM() {
    var interval = 1000
    wpmCounter = setInterval(function() {
        correctCharacters = document.querySelectorAll('.correct').length
        wpmElement.innerText = Math.floor((correctCharacters/5)/(seconds/60))
    }, interval)
}

function stopWPM() {
    clearInterval(wpmCounter)
}

function resetWPM() {
    correctCharacters = 0
}

renderNewQuote()

