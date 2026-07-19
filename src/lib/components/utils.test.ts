import { describe, it, expect } from 'vitest';

import { Questions, generateGuidedSteps, bigMultiplicationHintLines } from './utils';

describe('big-multiplication alternatives', () => {
	it('all end in the same digit as the correct answer, and are unique', () => {
		const questions = new Questions('big-multiplication');
		const allTables = [11, 12, 13, 14, 15, 16, 17, 18, 19];
		for (let i = 0; i < 100; i++) {
			const task = questions.getRandomTask(allTables);
			expect(task.alternatives).toHaveLength(3);
			expect(task.alternatives).toContain(task.question.answer);
			expect(new Set(task.alternatives).size).toBe(3);
			for (const alternative of task.alternatives) {
				expect(alternative % 10).toBe(task.question.answer % 10);
			}
		}
	});
});

describe('generateGuidedSteps', () => {
	it('produces the Add and Tack steps for 13 × 12', () => {
		const steps = generateGuidedSteps(13, 12);
		expect(steps.map((step) => step.answer)).toEqual([15, 150, 6, 156]);
		expect(steps.map((step) => step.prompt)).toEqual(['13 + 2', '15 × 10', '3 × 2', '150 + 6']);
	});

	it('handles carrying, e.g. 17 × 18', () => {
		const steps = generateGuidedSteps(17, 18);
		expect(steps.map((step) => step.answer)).toEqual([25, 250, 56, 306]);
	});

	it('has colored prompt parts that join back to the prompt text', () => {
		for (const step of generateGuidedSteps(14, 16)) {
			expect(step.parts.map((part) => part.text).join('')).toBe(step.prompt);
		}
	});

	it('gives three unique alternatives including the answer for every step', () => {
		for (let a = 11; a <= 19; a++) {
			for (let b = 11; b <= 19; b++) {
				for (const step of generateGuidedSteps(a, b)) {
					expect(step.alternatives).toHaveLength(3);
					expect(step.alternatives).toContain(step.answer);
					expect(new Set(step.alternatives).size).toBe(3);
				}
			}
		}
	});
});

describe('bigMultiplicationHintLines', () => {
	it('spells out the steps without revealing the final answer', () => {
		expect(bigMultiplicationHintLines(13, 12)).toEqual([
			'13 + 2 = 15',
			'15 × 10 = 150',
			'3 × 2 = 6',
			'150 + 6 = ?'
		]);
	});
});
