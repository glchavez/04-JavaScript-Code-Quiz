// Time counter
var timerCount = document.querySelector(".timer-count");
var count = 60;
// Start quiz button
var startBtn = document.querySelector(".start-quiz");
// Variables for the quiz section (question text/listed answers)
var questionTitle = document.querySelector("#question-title");
var questionChoices = document.querySelector("#question-choices");
var answerAlert = document.querySelector("#alert");
// For the results page of quiz
var hideResults = true;
var finalScore = document.querySelector(".final-score");
var submitScoreBtn = document.querySelector(".submit-score");
// For the highscores page of the quiz
var restartBtn = document.querySelector(".restart");
var clearHighscoresBtn = document.querySelector(".clear-highscores");

var currentQuestion = 0;
var totalCorrectAnswers = 0;


// List of quuestions, their possible answers, and the correct answer
var questions = [
    {
        question: "Question 1 text?",
        choices: ["option1", "option2", "option3", "option4"],
        answer: "option2"
    },
    {
        question: "Question 2 text?",
        choices: ["option5", "option6", "option7", "option8"],
        answer: "option5"
    },
    {
        question: "Question 3 text?",
        choices: ["option9", "option10", "option11", "option12"],
        answer: "option12"
    },
    {
        question: "Question 4 text?",
        choices: ["option13", "option14", "option15", "option16"],
        answer: "option15"
    },
]

// Start button on beginning page
startBtn.addEventListener("click", startQuiz);

questionChoices.addEventListener("click", function (event) {
    answerAlert.innerHTML = ""

    var userChoice = event.target.textContent
    var answerDisplayEl = document.createElement("h3");
    if (userChoice == questions[currentQuestion].answer) {
        answerDisplayEl.textContent = "Correct!";
        totalCorrectAnswers++;
    } else {
        answerDisplayEl.textContent = "Wrong.";
        count = count - 10;
    }
    answerAlert.append(answerDisplayEl);
    currentQuestion++;

    if (currentQuestion < 4) {
        renderQuestion();
    }
});

// Quiz related content and timer
function renderQuestion() {

    questionTitle.innerHTML = ""
    questionChoices.innerHTML = ""

    questionTitle.append(questions[currentQuestion].question)
    var optionOne = document.createElement("button");
    optionOne.textContent = questions[currentQuestion].choices[0];
    questionChoices.append(optionOne);
    var optionTwo = document.createElement("button");
    optionTwo.textContent = questions[currentQuestion].choices[1];
    questionChoices.append(optionTwo);
    var optionThree = document.createElement("button");
    optionThree.textContent = questions[currentQuestion].choices[2];
    questionChoices.append(optionThree);
    var optionFour = document.createElement("button");
    optionFour.textContent = questions[currentQuestion].choices[3];
    questionChoices.append(optionFour);

};

function startQuiz() {

    var interval = setInterval(function () {
        timerCount.innerHTML = count;
        count--;

        if (count < 0 || currentQuestion > 3) {
            clearInterval(interval);
            endQuiz();
        }

    }, 1000);

    currentQuestion = 0;
    totalCorrectAnswers = 0;
    count = 60
    document.querySelector(".final-score").innerHTML = "";
    renderQuestion();
};

// Relates to the page that lists score and asks for initials
function endQuiz() {

    hideResults = false;

    questionTitle.innerHTML = ""
    questionChoices.innerHTML = ""
    answerAlert.innerHTML = ""

    finalScore.append(totalCorrectAnswers);

    hideResultsPage();
};



var listedHighscoreInitials = document.querySelector(".listed-highscore-initials");
var listedHighscoreScores = document.querySelector(".listed-highscore-scores");


// Relates to the highscores page
function renderHighscores() {

    var scoreInitials = localStorage.getItem("initials");
    var storedFinalScore = localStorage.getItem("final-score");

    listedHighscoreInitials.textContent = scoreInitials;
    listedHighscoreScores.textContent = storedFinalScore;

};

submitScoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var scoreInitials = document.querySelector("#initials").value;
    var storedFinalScore = totalCorrectAnswers;


    localStorage.setItem("initials", scoreInitials);
    localStorage.setItem("final-score", storedFinalScore);

    renderHighscores();
})

clearHighscoresBtn.addEventListener("click", function () {
    localStorage.clear();
    listedHighscoreInitials.textContent = "";
    listedHighscoreScores.textContent = "";
});

restartBtn.addEventListener("click", startQuiz)






function hideStartPage() {
    var startDiv = document.getElementById("start");
    if (startDiv.style.display === "none") {
        startDiv.style.display = "block";
    } else {
        startDiv.style.display = "none";
    }
}

function hideResultsPage() {
    var resultsDiv = document.getElementById("results");

    if (hideResults == true) {
    resultsDiv.style.display = "none"
    } else {
        resultsDiv.style.display = "block"
    }
}

function hideHighscorePage() {
    var highscoreDiv = document.getElementById("highscores");
    if (highscoreDiv.style.display === "none") {
        highscoreDiv.style.display = "block";
    } else {
        highscoreDiv.style.display = "none";
    }
}
