const quizData = [
    {
        question: "What is the capital of India?",
        options: ["Uttarpradesh", "Punjab", "Delhi", "Lisbon"],
        correct: "Delhi"
    },
    {
        question: "Which language is used for web development?",
        options: ["Python", "Java", "C++", "JavaScript"],
        correct: "JavaScript"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
        correct: "Harper Lee"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Jupiter"
    }
];

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const skipButton = document.getElementById('skip');
const nextButton = document.getElementById('next');
const resultContainer = document.getElementById('result');

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = '';

function loadQuiz() {
    const currentQuestion = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        <ul class="options">
            ${currentQuestion.options.map(option => `<li><button onclick="selectAnswer('${option}')">${option}</button></li>`).join('')}
        </ul>
    `;
    submitButton.style.display = 'inline-block';
    skipButton.style.display = 'inline-block';
    nextButton.style.display = 'none';
}

function selectAnswer(answer) {
    selectedAnswer = answer;
}

function submitAnswer() {
    const currentQuestion = quizData[currentQuestionIndex];
    const buttons = document.querySelectorAll('.options button');
    buttons.forEach(button => {
        if (button.innerText === currentQuestion.correct) {
            button.classList.add('correct');
        } else if (button.innerText === selectedAnswer) {
            button.classList.add('incorrect');
        }
        button.disabled = true;
    });

    if (selectedAnswer === currentQuestion.correct) {
        score++;
    }
    submitButton.style.display = 'none';
    skipButton.style.display = 'none';
    nextButton.style.display = 'inline-block';
}

function skipQuestion() {
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    skipButton.style.display = 'none';
    nextButton.style.display = 'none';
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
}

loadQuiz();

submitButton.addEventListener('click', submitAnswer);
skipButton.addEventListener('click', skipQuestion);
nextButton.addEventListener('click', nextQuestion);
