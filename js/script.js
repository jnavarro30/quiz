import Quiz from "./Quiz.js";
import Question from "./Question.js";

//My Questions

const q1 = new Question("Language likely used along with HTML & CSS to create this quiz?", ["Python", "C++", "Javascript", "Java"], 2);

const q2 = new Question("What does HTML stand for?", ["HTTP Main Language", "HTTP Markup Language", "Hypertext Main Language", "Hypertext Markup Language"], 3);

const q3 = new Question("What does CSS stand for?", ["Cascading Style Sheets", "Create Style Sheet", "Cascading Sheet Styles", "Creating style sheets"], 0);

const q4 = new Question("Regular Expressions are used in what language?", ["Javascript", "C++", "Python", "All"], 3);

//My Quiz

const myQuiz = new Quiz([q1, q2, q3, q4]);

const quizApp = (() => {

//DOM Cache

const quizQuestionEl = document.querySelector(".quiz__question");
const quizTrackerEl = document.querySelector(".quiz__tracker");
const quizProgressBarEl = document.querySelector(".quiz__progress-bar");
const quizTaglineEl = document.querySelector(".quiz__tagline");
const quizChoicesEl = document.querySelector(".quiz__choices");
const quizNextBtn = document.querySelector(".quiz__next");
const quizRestartBtn = document.querySelector(".quiz__restart");


//Rendering Functions

const setValue = (elem, value) =>{
    return elem.innerHTML = value;
};

const  renderQuestion = () => {
    let question = myQuiz.quizCurrentQuestion().question;
    setValue(quizQuestionEl, question);
};

const renderTracker = () => {
    let tracker = `${myQuiz.index + 1} of ${myQuiz.questions.length}`;
    setValue(quizTrackerEl, tracker);
};

const renderProgressBar = () => {
   let percent = ((myQuiz.index + 1) / myQuiz.questions.length) * 100 + "%";
   quizProgressBarEl.style.width = percent;  
};

const renderTagline = () => {
    setValue(quizTaglineEl, "Practice Quiz");
};

const renderChoices = () => {
    let choices = myQuiz.quizCurrentQuestion().choices,
    markup = "";
    choices.forEach((elem, index) => {
        markup +=  `<li class="quiz__choice">
        <input type="radio" name="choice" class="quiz__input" data-order="${index}" id="choice${index}">
        <label for="choice${index}" class="quiz__label">
          <i class="quiz__icon"></i>
          <p class="quiz__text">${elem}</p>
        </label>
      </li>`;    
    });

    quizChoicesEl.innerHTML = markup;
};

const renderEndscreen = () => {

    //Display End Results

    setValue(quizQuestionEl, "All Done!");
    setValue(quizTrackerEl, `Score: ${(myQuiz.score/myQuiz.questions.length) * 100 + "%"}`);
    setValue(quizTaglineEl, "Complete!");

    //Hide Buttons, Choices and Display Image

    quizNextBtn.style.opacity = 0;
    quizNextBtn.style.height = 0;
    let ul = document.querySelector("ul");
    ul.style.display = "block";
    ul.innerHTML = `<img src="/images/verify-button-circle.svg" align="middle" height="400px">`;
    const choices = document.querySelectorAll("li");
    choices.forEach(choice => choice.style.opacity = 0);
    
};

const renderAll = () => {

    if(myQuiz.quizEnd()) renderEndscreen();
    else {
    renderQuestion();

    renderTracker();

    renderProgressBar();

    renderTagline();

    renderChoices();
    }
};

//My Buttons


const eventListeners = () => {

    //On Next
    
    quizNextBtn.addEventListener("click", () => {
        let selection = document.querySelector("input[name='choice']:checked");
        if(selection) {
        if(myQuiz.quizCurrentQuestion().isCorrect(selection.getAttribute("data-order"))) ++myQuiz.score;
        myQuiz.quizNext();
        renderAll();
        }
    });

    //On Restart

    quizRestartBtn.addEventListener("click", () => {
        myQuiz.quizRestart();
        document.querySelector("ul").style.display = "grid";
        quizNextBtn.style.opacity = 1;
        quizNextBtn.style.height = 40 + "px";
        renderAll();
    })
};

return {
    renderAll : renderAll,
    eventListeners : eventListeners
};

})();

quizApp.renderAll();
quizApp.eventListeners();