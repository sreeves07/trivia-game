const BASE_URL = 'https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple';
let updatedResults;
let index = 0
let score = 0

const scoreSpan = document.querySelector('.score')
const question = document.querySelector('#question')
const answers = document.querySelector('#answers')
const next = document.querySelector('#next')

const updateQuestion = () => {
    question.innerHTML = updatedResults[index].question
    for (let i = 0; i < 4; i++) {
        const div = document.createElement('div')
        const randomNun = Math.floor(Math.random() * updatedResults[index].incorrect_answers.length)
        
        div.innerHTML = updatedResults[index].incorrect_answers.splice(randomNun, 1)
        answers.append(div)
    }
}


const getQuestions = async () => {
    // fetch(BASE_URL)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })

    const qs = await fetch(BASE_URL)
    const qsJson = await qs.json() 
    console.log(qsJson)

    updatedResults = qsJson.results.map((q) => {
        // console.log(q)
        q.incorrect_answers.push(q.correct_answer)
        return q
    })
    console.log(updatedResults)

    updateQuestion()
}

next.addEventListener('click', (event) => {
    index++

    if (index >= updatedResults.length) {
        question.innerHTML = 'GAME OVER!'
        answers.innerHTML = ''
    } else {
        answers.innerHTML = ''
        updateQuestion()
    }
    answers.style.pointerEvents = 'auto'
})


answers.addEventListener('click', (event) => {
    if (event.target.innerHTML === updatedResults[index].correct_answer) {
        score += 10
        scoreSpan.innerHTML = score
        event.target.style.backgroundColor = 'lightgreen'
        event.target.style.border = '2px solid green'
    } else {
        event.target.style.backgroundColor = 'red'
        event.target.style.border = 'maroon'
    }

    answers.style.pointerEvents = 'none'
})

getQuestions()