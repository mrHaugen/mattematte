export interface Question {
	table: number;
	A: number;
	B: number;
	answer: number;
	thinkTime: number;
	correct: number;
	incorrect: number;
}

export interface Task {
	question: Question;
	alternatives: number[];
}

interface Sensitivity {
	thinkTime: number;
	correctAnswers: number;
	incorrectAnswers: number;
}

class Questions {
	sensitivity: Sensitivity;
	operation: string;
	questions: Question[];

	constructor(
		operation = 'multiplication',
		sensitivity: Sensitivity = { thinkTime: 1, correctAnswers: 1, incorrectAnswers: 1 }
	) {
		this.sensitivity = sensitivity;
		this.operation = operation; // Store the operation value for use in updateObject()

		if (import.meta.env.SSR) {
			// Code is running on the server, do not access localStorage
			this.questions = this.generateTable(operation);
		} else {
			// Code is running on the client
			const storedTable = localStorage.getItem(operation + 'Table');
			if (storedTable) {
				this.questions = JSON.parse(storedTable);
			} else {
				this.questions = this.generateTable(operation);
				localStorage.setItem(operation + 'Table', JSON.stringify(this.questions));
			}
		}
	}

	generateTable(operation: string): Question[] {
		const table: Question[] = [];
		if (operation === 'multiplication') {
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
		} else if (operation === 'division') {
			for (let i = 1; i <= 10; i++) {
				for (let j = 1; j <= 10; j++) {
					// Skip division by zero
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

	updateObject(A: number, B: number, updateValues: Partial<Question>) {
		// Find the object with the given values of A and B
		const foundObject = this.questions.find((obj) => obj.A === A && obj.B === B);
		if (foundObject) {
			Object.assign(foundObject, updateValues);
			if (!import.meta.env.SSR) {
				// Update localStorage if running on client side
				localStorage.setItem(this.operation + 'Table', JSON.stringify(this.questions));
			}
		} else {
			console.error('Object not found in the table.');
		}
	}

	incrementCorrect(task: Task): Task {
		this.updateObject(task.question.A, task.question.B, { correct: task.question.correct + 1 });
		return task;
	}

	incrementIncorrect(task: Task): Task {
		this.updateObject(task.question.A, task.question.B, { incorrect: task.question.incorrect + 1 });
		return task;
	}

	updateThinkTime(task: Task, thinkTime: number): Task {
		this.updateObject(task.question.A, task.question.B, { thinkTime: thinkTime });
		return task;
	}

	checkAnswer(task: Task, answer: number, thinkTime: number): boolean {
		const answerIsCorrect = task.question.answer === answer;
		if (answerIsCorrect) {
			this.incrementCorrect(task);
			this.updateThinkTime(task, thinkTime);
			return true;
		}
		this.incrementIncorrect(task);
		return false;
	}

	pickRandomQuestion(selectedTables: number[]): Question {
		// Filter questions based on selected tables
		const filteredQuestions = this.questions.filter((question) =>
			selectedTables.includes(question.table)
		);

		// Calculate composite score for each question
		const compositeScores = filteredQuestions.map((question) => {
			const compositeScore =
				this.sensitivity.thinkTime * question.thinkTime +
				this.sensitivity.correctAnswers * question.correct +
				this.sensitivity.incorrectAnswers * question.incorrect;
			return compositeScore;
		});

		// Calculate total composite score
		const totalCompositeScore = compositeScores.reduce((total, score) => total + score, 0);

		// Calculate probabilities based on composite scores
		const probabilities = compositeScores.map((score) => score / totalCompositeScore);

		// Generate a random number between 0 and 1
		const random = Math.random();

		// Select question based on probabilities
		let cumulativeProbability = 0;
		for (let i = 0; i < filteredQuestions.length; i++) {
			cumulativeProbability += probabilities[i];
			if (random <= cumulativeProbability) {
				return filteredQuestions[i];
			}
		}

		// If no question is selected, return the first question
		return filteredQuestions[0];
	}

	generateAlternatives(A: number, B: number, correctAnswer: number): number[] {
		const alternatives: number[] = [];
		const addOrSubtract = Math.random() < 0.5 ? 1 : -1;
		switch (this.operation) {
			case 'multiplication':
				alternatives.push(correctAnswer);
				alternatives.push(A * (B + addOrSubtract));
				alternatives.push(A * (B + 2 * addOrSubtract));
				break;
			case 'division':
				alternatives.push(correctAnswer);
				alternatives.push(correctAnswer + addOrSubtract);
				alternatives.push(correctAnswer + 2 * addOrSubtract);
				break;
			default:
				break;
		}

		// Shuffle the alternatives array
		for (let i = alternatives.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[alternatives[i], alternatives[j]] = [alternatives[j], alternatives[i]];
		}

		return alternatives;
	}

	getRandomTask(selectedTables: number[]): Task {
		// Pick a random question from the selected tables
		const randomQuestion = this.pickRandomQuestion(selectedTables);

		// Generate alternatives for the random question
		const alternatives = this.generateAlternatives(
			randomQuestion.A,
			randomQuestion.B,
			randomQuestion.answer
		);

		return {
			question: randomQuestion,
			alternatives: alternatives
		};
	}
}

export { Questions };
