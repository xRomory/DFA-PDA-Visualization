import React, { useCallback, useState } from "react";
import type { 
  DFAExecution,
  DFAHistory,
  DFAMachine
} from "@/types";
import { binaryEndsWith10DFA } from "@/helper/dfa";
import { DFATransitionArrow } from "@/components/DFA/DFATransitionArrow";
import { DFAStateNode } from "@/components/DFA/DFAStateNode";
import { DFAInputPanel } from "@/components/DFA/DFAInputPanel";
import DFAFooter from "@/components/DFA/DFAFooter";

export const DFADiagram: React.FC = () => {
  const [dfa, setDfa] = useState<DFAMachine>(binaryEndsWith10DFA);
  const [history, setHistory] = useState<DFAHistory[]>([
    { state: "q0", timestamp: Date.now(), position: 0 },
  ]);
  const [execution, setExecution] = useState<DFAExecution>({
    inputString: "",
    currentPosition: 0,
    accepted: false,
    completed: false,
    path: ["q0"],
  });
  const [lastTransition, setLastTransition] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const resetDFA = useCallback(() => {
    setDfa((prev) => ({
      ...prev,
      currentState: prev.initialState,
    }));

    setHistory([
      { state: "q0", timestamp: Date.now(), position: 0 },
    ]);
    setExecution({
      inputString: "",
      currentPosition: 0,
      accepted: false,
      completed: false,
      path: ["q0"],
    });
    setLastTransition(null);
    setIsProcessing(false);
  }, []);

  const processString = useCallback(
    (inputString: string) => {
      resetDFA(),
        setExecution({
          inputString,
          currentPosition: 0,
          accepted: false,
          completed: false,
          path: ["q0"],
        });
      setIsProcessing(true);
    },
    [resetDFA]
  );

  const step = useCallback(() => {
    if (execution.completed || !execution.inputString) return;

    const currentChar = execution.inputString[execution.currentPosition];

    if (execution.currentPosition >= execution.inputString.length) {
      // End of input - check if in accepting state
      const isAccepted = dfa.acceptingStates.includes(dfa.currentState);
      setExecution((prev) => ({
        ...prev,
        accepted: isAccepted,
        completed: true,
      }));
      setIsProcessing(false);
      return;
    }

    // Find the transition for current state and input
    const transition = dfa.transitions.find(
      (t) => t.from === dfa.currentState && t.input === currentChar
    );

    if (transition) {
      const newState = transition.to;
      const newPosition = execution.currentPosition + 1;

      // Update DFA state
      setDfa((prev) => ({
        ...prev,
        currentState: newState,
      }));

      // Update execution
      const isCompleted = newPosition >= execution.inputString.length;
      const isAccepted = isCompleted && dfa.acceptingStates.includes(newState);

      setExecution((prev) => ({
        ...prev,
        currentPosition: newPosition,
        accepted: isAccepted,
        completed: isCompleted,
        path: [...prev.path, newState],
      }));

      // Add to history
      setHistory((prev) => [
        ...prev,
        {
          state: newState,
          input: currentChar,
          timestamp: Date.now(),
          position: newPosition,
        },
      ]);

      // Highlight transition
      setLastTransition(
        `${transition.from}-${transition.to}-${transition.input}`
      );
      setTimeout(() => setLastTransition(null), 1000);

      if (isCompleted) {
        setIsProcessing(false);
      }
    } else {
      // No valid transition - this shouldn't happen in a complete DFA
      setExecution((prev) => ({
        ...prev,
        accepted: false,
        completed: true,
      }));
      setIsProcessing(false);
    }
  }, [dfa, execution]);

  const getStateById = (id: string) => {
    return dfa.states.find((s) => s.id === id);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 p-6">
      <div className="flex-1">
        <div className="bg-violet-200 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Deterministic Finite Automaton - Strings Ending with "10"
          </h2>

          <div className="flex justify-center mb-6">
            <svg
              width="820"
              height="350"
              className="border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50"
            >
              {/* Define arrow marker */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                </marker>
              </defs>

              {/* Render transitions */}
              {dfa.transitions.map((transition, index) => {
                const fromState = getStateById(transition.from);
                const toState = getStateById(transition.to);

                if (!fromState || !toState) return null;

                const isActive =
                  lastTransition ===
                  `${transition.from}-${transition.to}-${transition.input}`;

                return (
                  <DFATransitionArrow
                    key={`${transition.from}-${transition.to}-${transition.input}-${index}`}
                    transition={transition}
                    fromState={fromState}
                    toState={toState}
                    isActive={isActive}
                  />
                );
              })}

              {/* Render states */}
              {dfa.states.map((state) => (
                <DFAStateNode
                  key={state.id}
                  state={state}
                  isActive={state.id === dfa.currentState}
                  isInitial={state.id === dfa.initialState}
                />
              ))}

              {/* Legend */}
              <text
                x="20"
                y="280"
                className="text-sm fill-gray-700 font-medium"
              >
                • Double circle = Accepting state • Single circle =
                Non-accepting state • Arrow = Transition
              </text>
            </svg>
          </div>

          {/* DFA Properties */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">
              DFA Properties
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-purple-700">
              <div>
                <strong>Deterministic:</strong> Each state has exactly one transition per input symbol
              </div>
              <div>
                <strong>Complete:</strong> Every state has transitions for all alphabet symbols
              </div>
            </div>
          </div>
        </div>

        <DFAFooter />
      </div>

      {/* Control Panel */}
      <div className="xl:w-96">
        <DFAInputPanel 
          currentState={dfa.currentState.toUpperCase()}
          execution={execution}
          history={history}
          onProcessString={processString}
          onStep={step}
          onReset={resetDFA}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
};
