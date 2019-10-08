export default class Quiz {
    constructor(questions, score, index) {
        this.questions = questions;
        this.score = 0;
        this.index = 0;
    }
    quizCurrentQuestion() {
        return this.questions[this.index];
    }
    quizNext() {
        this.index++;
    }
    quizRestart() {
        this.index = 0;
        this.score = 0;
    }
    quizScore(fill){
        if(this.isCorrect(fill)) this.score++;
    }
    quizEnd() {
        return this.index == this.questions.length;
    }
}