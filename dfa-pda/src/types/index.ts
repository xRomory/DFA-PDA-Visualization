export interface DFAState {
  id: string;
  name: string;
  x: number;
  y: number;
  isAccepting: boolean;
  color: string;
}

export interface DFATransition {
  from: string;
  to: string;
  input: string;
  label: string;
}

export interface DFAMachine {
  states: DFAState[];
  transitions: DFATransition [];
  currentState: string;
  initialState: string;
  alphabet: string[];
  acceptingStates: string[];
}

export interface DFAExecution {
  inputString: string;
  currentPosition: number;
  accepted: boolean;
  completed: boolean;
  path: string[];
}

export interface DFAHistory {
  state: string;
  input?: string;
  timestamp: number;
  position: number;
}

export interface PDAState {
  id: string;
  name: string;
  x: number;
  y: number;
  isAccepting?: boolean;
  color: string;
}

export interface PDATransition {
  from: string;
  to: string;
  input: string;
  stackPop: string;
  stackPush: string;
  label: string;
}

export interface PDAMachine {
  states: PDAState[];
  transitions: PDATransition[];
  currentState: string;
  initialState: string;
  stack: string[];
  inputAlphabet: string[];
  stackAlphabet: string[];
}

export interface PDAHistory {
  state: string;
  input?: string;
  stackBefore: string[];
  stackAfter: string[];
  transition?: string;
  timestamp: number;
}

export interface PDAExecution {
  inputString: string;
  currentPosition: number;
  accepted: boolean;
  completed: boolean;
}

// === Nav Items ===
export const navItems = [
  { path: "/", label: "Deterministic Finite Automaton" },
  { path: "/pda", label: "Pushdown Automaton" }
]