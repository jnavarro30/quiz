export default class Question {
    constructor(question, choices, answer) {
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    }
    isCorrect(fill) {
        return this.answer == fill;
    }
}