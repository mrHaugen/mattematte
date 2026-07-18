import { E as pop, B as push } from "../../../chunks/index.js";
class Questions {
  constructor(operation = "multiplication", sensitivity = { thinkTime: 1, correctAnswers: 1, incorrectAnswers: 1 }) {
    this.sensitivity = sensitivity;
    this.operation = operation;
    {
      this.questions = this.generateTable(operation);
    }
  }
  generateTable(operation) {
    const table = [];
    if (operation === "multiplication") {
      for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
          table.push({
            table: i,
            A: i,
            B: j,
            answer: i * j,
            thinkTime: 3500,
            correct: 0,
            incorrect: 0
          });
        }
      }
    } else if (operation === "division") {
      for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
          if (j !== 0) {
            table.push({
              table: i,
              A: i * j,
              B: i,
              answer: j,
              thinkTime: 3500,
              correct: 0,
              incorrect: 0
            });
          }
        }
      }
    } else {
      console.error('Invalid operation type. Use "multiplication" or "division".');
    }
    return table;
  }
  updateObject(A, B, updateValues) {
    const foundObjectIndex = this.questions.findIndex((obj) => obj.A === A && obj.B === B);
    if (foundObjectIndex !== -1) {
      for (let key in updateValues) {
        if (typeof updateValues[key] === "function") {
          this.questions[foundObjectIndex][key] = updateValues[key](
            this.questions[foundObjectIndex][key]
          );
        } else {
          this.questions[foundObjectIndex][key] = updateValues[key];
        }
      }
    } else {
      console.error("Object not found in the table.");
    }
  }
  incrementCorrect(task) {
    this.updateObject(task.question.A, task.question.B, { correct: task.question.correct + 1 });
    return task;
  }
  incrementIncorrect(task) {
    this.updateObject(task.question.A, task.question.B, { incorrect: task.question.incorrect + 1 });
    return task;
  }
  updateThinkTime(task, thinkTime) {
    this.updateObject(task.question.A, task.question.B, { thinkTime });
    return task;
  }
  checkAnswer(task, answer, thinkTime) {
    const answerIsCorrect = task.question.answer === answer;
    if (answerIsCorrect === true) {
      this.incrementCorrect(task);
      this.updateThinkTime(task, thinkTime);
      return true;
    } else if (answerIsCorrect === false) {
      this.incrementIncorrect(task);
      return false;
    }
  }
  pickRandomQuestion(selectedTables) {
    const filteredQuestions = this.questions.filter(
      (question) => selectedTables.includes(question.table)
    );
    const compositeScores = filteredQuestions.map((question) => {
      const compositeScore = this.sensitivity.thinkTime * question.thinkTime + this.sensitivity.correctAnswers * question.correct + this.sensitivity.incorrectAnswers * question.incorrect;
      return compositeScore;
    });
    const totalCompositeScore = compositeScores.reduce((total, score) => total + score, 0);
    const probabilities = compositeScores.map((score) => score / totalCompositeScore);
    const random = Math.random();
    let cumulativeProbability = 0;
    for (let i = 0; i < filteredQuestions.length; i++) {
      cumulativeProbability += probabilities[i];
      if (random <= cumulativeProbability) {
        return filteredQuestions[i];
      }
    }
    return filteredQuestions[0];
  }
  generateAlternatives(A, B, correctAnswer) {
    const alternatives = [];
    const addOrSubtract = Math.random() < 0.5 ? 1 : -1;
    switch (this.operation) {
      case "multiplication":
        alternatives.push(correctAnswer);
        alternatives.push(A * (B + addOrSubtract));
        alternatives.push(A * (B + 2 * addOrSubtract));
        break;
      case "division":
        alternatives.push(correctAnswer);
        alternatives.push(correctAnswer + addOrSubtract);
        alternatives.push(correctAnswer + 2 * addOrSubtract);
        break;
    }
    for (let i = alternatives.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [alternatives[i], alternatives[j]] = [alternatives[j], alternatives[i]];
    }
    return alternatives;
  }
  getRandomTask(selectedTables) {
    const randomQuestion = this.pickRandomQuestion(selectedTables);
    const alternatives = this.generateAlternatives(
      randomQuestion.A,
      randomQuestion.B,
      randomQuestion.answer
    );
    return {
      question: randomQuestion,
      alternatives
    };
  }
}
function _page($$payload, $$props) {
  push();
  let arithmeticOperation = "multiplication";
  new Questions(arithmeticOperation);
  $$payload.out += `<div class="flex flex-col"><div>Questions</div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
