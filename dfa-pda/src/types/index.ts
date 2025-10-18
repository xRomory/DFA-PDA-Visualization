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
  timestamp: string;
  position: number;
}