import type { DFAMachine } from "@/types";

export const binaryEndsWith10DFA: DFAMachine = {
  states: [
    { id: "q0", name: "q0", x: 150, y: 150, isAccepting: false, color: "#3b82f6" },
    { id: "q1", name: "q1", x: 350, y: 150, isAccepting: false, color: "#f59e0b" },
    { id: "q2", name: "q2", x: 550, y: 150, isAccepting: true, color: "#10b981" },
  ],
  transitions: [
    { from: 'q0', to: 'q0', input: '0', label: '0' },
    { from: 'q0', to: 'q1', input: '1', label: '1' },
    { from: 'q1', to: 'q2', input: '0', label: '0' },
    { from: 'q1', to: 'q1', input: '1', label: '1' },
    { from: 'q2', to: 'q0', input: '0', label: '0' },
    { from: 'q2', to: 'q1', input: '1', label: '1' }
  ],
  currentState: 'q0',
  initialState: 'q0',
  alphabet: ['0', '1'],
  acceptingStates: ['q2']
}