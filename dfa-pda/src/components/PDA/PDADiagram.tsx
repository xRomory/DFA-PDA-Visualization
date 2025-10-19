import { balancedParenthesesPDA } from "@/helper/pda";
import type { PDAExecution, PDAHistory, PDAMachine } from "@/types";
import React, { useCallback, useState } from "react";
import { PDAStateNode } from "@/components/PDA/PDAStateNode";
import { PDATransitionArrow } from "@/components/PDA/PDATransitionArrow";
import { PDAInputPanel } from "./PDAInputPanel";
import { StackVisualization } from "./StackVisualization";
import PDAFooter from "./PDAFooter";

export const PDADiagram: React.FC = () => {
  const [pda, setPda] = useState<PDAMachine>(balancedParenthesesPDA);
  const [lastTransition, setLastTransition] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<PDAHistory[]>([
    {
      state: "qo",
      stackBefore: ["Z"],
      stackAfter: ["Z"],
      timestamp: Date.now(),
    },
  ]);
  const [execution, setExecution] = useState<PDAExecution>({
    inputString: "",
    currentPosition: 0,
    accepted: false,
    completed: false,
  });

  const resetPDA = useCallback(() => {
    setPda((prev) => ({
      ...prev,
      currentState: prev.initialState,
      stack: ["Z"],
    }));

    setHistory([
      {
        state: "q0",
        stackBefore: ["Z"],
        stackAfter: ["Z"],
        timestamp: Date.now(),
      },
    ]);

    setExecution({
      inputString: "",
      currentPosition: 0,
      accepted: false,
      completed: false,
    });

    setLastTransition(null);

    setIsProcessing(false);
  }, []);

  const processString = useCallback(
    (inputString: string) => {
      resetPDA(),
        setExecution({
          inputString,
          currentPosition: 0,
          accepted: false,
          completed: false,
        });
      setIsProcessing(true);
    },
    [resetPDA]
  );

  const step = useCallback(() => {
    if (execution.completed || !execution.inputString) return;

    const currentChar =
      execution.currentPosition < execution.inputString.length
        ? execution.inputString[execution.currentPosition]
        : "ε";

    const stackTop = pda.stack[pda.stack.length - 1];

    // Find applicable transition
    const applicableTransitions = pda.transitions.filter(
      (t) =>
        t.from === pda.currentState &&
        (t.input === currentChar ||
          (t.input === "ε" &&
            execution.currentPosition >= execution.inputString.length)) &&
        t.stackPop === stackTop
    );

    if (applicableTransitions.length > 0) {
      const transition = applicableTransitions[0];
      const newStack = [...pda.stack];

      // Pop from stack
      if (transition.stackPop !== "ε") {
        newStack.pop();
      }

      // Push to stack
      if (transition.stackPush !== "ε") {
        const pushSymbols = transition.stackPush.split("").reverse();
        newStack.push(...pushSymbols);
      }

      const newState = transition.to;
      const newPosition =
        transition.input === "ε"
          ? execution.currentPosition
          : execution.currentPosition + 1;

      // Update PDA state
      setPda((prev) => ({
        ...prev,
        currentState: newState,
        stack: newStack,
      }));

      // Update execution
      const isCompleted =
        newPosition >= execution.inputString.length &&
        (newState === "qf" ||
          applicableTransitions.every((t) => t.input === "ε"));

      const isAccepted =
        isCompleted &&
        newState === "qf" &&
        newStack.length === 1 &&
        newStack[0] === "Z";

      setExecution((prev) => ({
        ...prev,
        currentPosition: newPosition,
        accepted: isAccepted,
        completed: isCompleted,
      }));

      // Add to history
      setHistory((prev) => [
        ...prev,
        {
          state: newState,
          input: transition.input === "ε" ? undefined : transition.input,
          stackBefore: pda.stack,
          stackAfter: newStack,
          transition: transition.label,
          timestamp: Date.now(),
        },
      ]);

      // Highlight transition
      setLastTransition(
        `${transition.from}-${transition.to}-${transition.input}`
      );
      setTimeout(() => setLastTransition(null), 1000);
    } else {
      // No applicable transition - reject
      setExecution((prev) => ({
        ...prev,
        accepted: false,
        completed: true,
      }));
      setIsProcessing(false);
    }
  }, [pda, execution]);

  const getStateById = (id: string) => {
    return pda.states.find((s) => s.id === id);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6">
      <div className="flex-1">
        <div className="bg-violet-200 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Pushdown Automaton - Balanced Parentheses
          </h2>

          <div className="flex justify-center mb-6">
            <svg
              width="600"
              height="300"
              className="border rounded-lg bg-gray-50"
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
              {pda.transitions.map((transition, index) => {
                const fromState = getStateById(transition.from);
                const toState = getStateById(transition.to);

                if (!fromState || !toState) return null;

                const isActive =
                  lastTransition ===
                  `${transition.from}-${transition.to}-${transition.input}`;

                return (
                  <PDATransitionArrow
                    key={`${transition.from}-${transition.to}-${transition.input}-${index}`}
                    transition={transition}
                    fromState={fromState}
                    toState={toState}
                    isActive={isActive}
                  />
                );
              })}

              {/* Render states */}
              {pda.states.map((state) => (
                <PDAStateNode
                  key={state.id}
                  state={state}
                  isActive={state.id === pda.currentState}
                  isInitial={state.id === pda.initialState}
                />
              ))}

              {/* Legend */}
              <text x="20" y="280" className="text-xs fill-gray-600">
                Transitions: input,stack_pop/stack_push
              </text>
            </svg>
          </div>
        </div>

        <PDAFooter />
      </div>

      <div className="xl:w-96 space-y-6">
        <StackVisualization 
          stack={pda.stack}
        />

        <PDAInputPanel 
          currentState={pda.currentState.toUpperCase()}
          stack={pda.stack}
          execution={execution}
          history={history}
          onProcessingString={processString}
          onStep={step}
          onReset={resetPDA}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
};
