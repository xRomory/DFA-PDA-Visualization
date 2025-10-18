import type { 
  DFAExecution,
  DFAHistory
} from "@/types";
import React, { useState } from "react";
import { 
  Card,
  CardContent,
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface DFAInputPanelProps {
  currentState: string;
  execution: DFAExecution;
  history: DFAHistory[];
  onProcessString: (input: string) => void;
  onStep: () => void;
  onReset: () => void;
  isProcessing: boolean;
}

export const DFAInputPanel: React.FC<DFAInputPanelProps> = ({
  currentState,
  execution,
  history,
  onProcessString,
  onStep,
  onReset,
  isProcessing
}) => {
  const [inputString, setInputString] = useState("010110");

  const handleProcessInputString = () => {
    if(inputString.trim()) onProcessString(inputString.trim());
  };

  const getStatusText = () => {
    if(!execution.completed) return "Processing...";
    return execution.accepted ? "ACCEPTED" : "REJECTED";
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current State</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="default" className="text-lg px-4 py-2">
            {currentState}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Input String</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              value={inputString}
              onChange={(e) => setInputString(e.target.value.replace(/[^01]/g, ""))}
              placeholder="Enter binary string (e.g., 010110)"
              disabled={isProcessing}
              maxLength={20}
            />
            <Button
              onClick={handleProcessInputString}
              disabled={isProcessing || !inputString.trim()}
            >
              Process
            </Button>
          </div>

          {execution.inputString && (
            <div className="space-y-3">
              <div className="text-sm font-medium">Processing:</div>
              <div className="font-mono text-xl bg-gray-100 p-3 rounded border-2">
                {execution.inputString.split("").map((char, index) => (
                  <span
                    key={index}
                    className={`inline-block w-8 h-8 text-center leading-8 mx-1 rounded ${
                      index === execution.currentPosition
                      ? "bg-yellow-400 text-black font-bold border-2 border-yellow-600"
                      : index < execution.currentPosition
                      ? "bg-green-200 text-gray-600"
                      : "bg-white border border-gray-300"
                    }`}
                  >
                    {char}
                  </span>
                ))}
                {execution.currentPosition >= execution.inputString.length && (
                  <span className="inline-block w-8 h-8 text-center leading-8 mx-1 rounded bg-purple-300 text-black font-bold">
                    $
                  </span>
                )}
              </div>

              <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${getStatusText()}`}>
                {getStatusText()}
              </div>

              {execution.completed && (
                <div className="text-sm text-gray-600">
                  <strong>Path taken:</strong> {execution.path.join(" → ")}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols 2 gap-2">
            <Button
              onClick={onStep}
              disabled={!execution.inputString || execution.completed}
              variant="outline"
            >
              Step Forward
            </Button>
            <Button
              onClick={onReset}
              variant="destructive"
            >
              Reset DFA
            </Button>
          </div>

          <div className="mt-4 text-xs text-gray-600">
            <p><strong>Try these examples:</strong></p>
            <div className="flex flex-wrap gap-1 mt-2">
              {["0", "1", "01", "10", "101", "010110", "111000"].map(example => (
                <Button
                  key={example}
                  variant="ghost"
                  size="sm"
                  className="text-xs h-6 px-2 cursor-pointer"
                  onClick={() => setInputString(example)}
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Execution History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Execution Trace</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm">No steps yet</p>
            ) : (
              history.slice(-15).map((entry, index) => (
                <div 
                  key={index}
                  className="text-xs p-2 bg-gray-50 rounded flex justify-between items-center"
                >
                  <div className="felx items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Step {index + 1}
                    </Badge>
                    <span className="font-medium">→ {entry.state}</span>
                  </div>
                  {entry.input && (
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">on</span>
                      <Badge variant="outline" className="text-xs text-mono">
                        {entry.input}
                      </Badge>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* DFA Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">About This DFA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Language:</strong> Strings ending with "10"</p>
            <p><strong>Alphabet:</strong> {"{0, 1}"}</p>
            <p><strong>State:</strong> q0 (start), q1, q2 (accept)</p>
            <p className="text-xs mt-4 text-gray-500">
              This DFA accepts binary strings that end with "10". It demonstrates
              deterministic behavior - for each state and input symbol, there is
              exactly one transition.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
