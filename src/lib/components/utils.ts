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

// A colored piece of a guided-step prompt: 'a' and 'b' match the highlighted
// digits of the two numbers in the task, 'result' matches an earlier step's answer
export type PromptPart = { text: string; color?: 'a' | 'b' | 'result' };

export interface GuidedStep {
	title: string;
	prompt: string;
	parts: PromptPart[];
	highlightA: 'full' | 'last' | 'none';
	highlightB: 'last' | 'none';
	answer: number;
	alternatives: number[];
}

interface Sensitivity {
	thinkTime: number;
	correctAnswers: number;
	incorrectAnswers: number;
}

function shuffle(values: number[]): number[] {
	for (let i = values.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[values[i], values[j]] = [values[j], values[i]];
	}
	return values;
}

// The "Add and Tack" steps for A × B where both numbers are between 11 and 19:
// 1) A + last digit of B, 2) × 10, 3) multiply the last digits, 4) add them together
export function generateGuidedSteps(A: number, B: number): GuidedStep[] {
	const lastDigitA = A % 10;
	const lastDigitB = B % 10;
	const added = A + lastDigitB;
	const tacked = added * 10;
	const lastDigitProduct = lastDigitA * lastDigitB;
	const sum = tacked + lastDigitProduct;

	const direction = Math.random() < 0.5 ? 1 : -1;
	const productDirection = lastDigitProduct <= 2 ? 1 : direction;

	return [
		{
			title: 'Legg til det siste sifferet',
			prompt: `${A} + ${lastDigitB}`,
			parts: [{ text: `${A}`, color: 'a' }, { text: ' + ' }, { text: `${lastDigitB}`, color: 'b' }],
			highlightA: 'full',
			highlightB: 'last',
			answer: added,
			alternatives: shuffle([added, added + direction, added + 2 * direction])
		},
		{
			title: 'Gang med 10',
			prompt: `${added} × 10`,
			parts: [{ text: `${added}`, color: 'result' }, { text: ' × 10' }],
			highlightA: 'none',
			highlightB: 'none',
			answer: tacked,
			alternatives: shuffle([tacked, added * 100, added + 10])
		},
		{
			title: 'Gang de siste sifrene',
			prompt: `${lastDigitA} × ${lastDigitB}`,
			parts: [
				{ text: `${lastDigitA}`, color: 'a' },
				{ text: ' × ' },
				{ text: `${lastDigitB}`, color: 'b' }
			],
			highlightA: 'last',
			highlightB: 'last',
			answer: lastDigitProduct,
			alternatives: shuffle([
				lastDigitProduct,
				lastDigitProduct + productDirection,
				lastDigitProduct + 2 * productDirection
			])
		},
		{
			title: 'Legg sammen',
			prompt: `${tacked} + ${lastDigitProduct}`,
			parts: [
				{ text: `${tacked}`, color: 'result' },
				{ text: ' + ' },
				{ text: `${lastDigitProduct}`, color: 'result' }
			],
			highlightA: 'none',
			highlightB: 'none',
			answer: sum,
			alternatives: shuffle([sum, sum + 10, sum - 10])
		}
	];
}

// The same steps as text lines, used as a hint in hard mode
export function bigMultiplicationHintLines(A: number, B: number): string[] {
	const lastDigitA = A % 10;
	const lastDigitB = B % 10;
	const added = A + lastDigitB;
	const tacked = added * 10;
	const lastDigitProduct = lastDigitA * lastDigitB;
	return [
		`${A} + ${lastDigitB} = ${added}`,
		`${added} × 10 = ${tacked}`,
		`${lastDigitA} × ${lastDigitB} = ${lastDigitProduct}`,
		`${tacked} + ${lastDigitProduct} = ?`
	];
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
		} else if (operation === 'big-multiplication') {
			for (let i = 11; i <= 19; i++) {
				for (let j = 11; j <= 19; j++) {
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
		} else {
			console.error(
				'Invalid operation type. Use "multiplication", "division" or "big-multiplication".'
			);
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
			case 'big-multiplication': {
				// Every alternative must end in the same digit as the correct answer —
				// otherwise multiplying the last digits of the task gives the answer away
				const offsets = shuffle([-20, -10, 10, 20]).slice(0, 2);
				alternatives.push(correctAnswer, correctAnswer + offsets[0], correctAnswer + offsets[1]);
				break;
			}
			default:
				break;
		}

		return shuffle(alternatives);
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
