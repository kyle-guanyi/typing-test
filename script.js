const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

let startTyping = true

document.addEventListener('keydown', () =>{
    quoteInputElement.focus()
    if(startTyping) {
        startTimer()
        startTyping = false
    }
})

quoteInputElement.addEventListener('input', () => {
    
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
}

function renderTimer() {
    timerElement.innerText = 0
}

let seconds = 0;  // initialize timer seconds
let timer;  // initialize timer variable for setInterval/clearInterval

function startTimer() {  // start timer that increments by second
    timer = setInterval(function() {
        seconds++; 
        timerElement.innerText = seconds;  
    }, 1000)
}
function stopTimer() {  // stops timer and resets seconds back to 0
    clearInterval(timer);
    seconds = 0;
}

renderNewQuote()

