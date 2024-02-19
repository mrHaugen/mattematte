class Questions {
	constructor(
		operation = 'multiplication',
		sensitivity = { thinkTime: 1, correctAnswers: 1, incorrectAnswers: 1 }
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
	generateTable(operation) {
		const table = [];
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

	forEach(callback) {
		this.questions.forEach(callback);
	}

	updateObject(A, B, updateValues) {
		// Find the object with the given values of A and B
		const foundObjectIndex = this.questions.findIndex((obj) => obj.A === A && obj.B === B);
		if (foundObjectIndex !== -1) {
			// Update the object with the new values
			for (let key in updateValues) {
				if (typeof updateValues[key] === 'function') {
					this.questions[foundObjectIndex][key] = updateValues[key](
						this.questions[foundObjectIndex][key]
					);
				} else {
					this.questions[foundObjectIndex][key] = updateValues[key];
				}
			}
			if (!import.meta.env.SSR) {
				// Update localStorage if running on client side
				localStorage.setItem(this.operation + 'Table', JSON.stringify(this.questions));
			}
		} else {
			console.error('Object not found in the table.');
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
		this.updateObject(task.question.A, task.question.B, { thinkTime: thinkTime });
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

	generateAlternatives(A, B, correctAnswer) {
		const alternatives = [];
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

	getRandomTask(selectedTables) {
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
