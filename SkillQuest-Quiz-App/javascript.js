const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

const resultBox = document.getElementById("result-box");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

const progressBar = document.getElementById("progressBar");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {

    currentQuestionIndex = 0;
    score = 0;

    resultBox.classList.add("hide");

    document.querySelector(".quiz-box").style.display = "block";

    nextButton.style.display = "none";

    showQuestion();
}

function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];

    questionElement.innerHTML =
        `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    let progress =
        ((currentQuestionIndex) / questions.length) * 100;

    progressBar.style.width = progress + "%";

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerText = answer.text;

        button.classList.add("btn");

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}

function resetState() {

    nextButton.style.display = "none";

    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {

    const selectedBtn = e.target;

    const isCorrect =
        selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {

        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "inline-block";
}

function showScore() {

    document.querySelector(".quiz-box").style.display = "none";

    resultBox.classList.remove("hide");

    scoreElement.innerHTML =
        `${score} / ${questions.length}`;

    restartButton.style.display = "inline-block";

    progressBar.style.width = "100%";
}

function handleNextButton() {

    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", handleNextButton);

restartButton.addEventListener("click", startQuiz);

startQuiz();
