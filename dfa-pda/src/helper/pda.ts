import type { PDAMachine } from "@/types";

export const balancedParenthesesPDA: PDAMachine = {
  states: [
    { id: 'q0', name: 'q0', x: 100, y: 150, color: '#3b82f6' },
    { id: 'q1', name: 'q1', x: 300, y: 150, color: '#10b981' },
    { id: 'qf', name: 'qf', x: 500, y: 150, color: '#8b5cf6', isAccepting: true }
  ],
  transitions: [
    { from: 'q0', to: 'q1', input: '(', stackPop: 'Z', stackPush: '(Z', label: '(,Z/(Z' },
    { from: 'q1', to: 'q1', input: '(', stackPop: '(', stackPush: '((', label: '(,(/((' },
    { from: 'q1', to: 'q1', input: ')', stackPop: '(', stackPush: 'ε', label: '),(/ε' },
    { from: 'q1', to: 'qf', input: 'ε', stackPop: 'Z', stackPush: 'Z', label: 'ε,Z/Z' }
  ],
  currentState: 'q0',
  initialState: 'q0',
  stack: ['Z'], // Z is the bottom-of-stack marker
  inputAlphabet: ['(', ')'],
  stackAlphabet: ['(', 'Z']
};