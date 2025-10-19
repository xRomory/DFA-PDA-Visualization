import React, { useState } from "react";
import type { PDAHistory, PDAExecution } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PDAInputPanelProps {
  currentState: string;
  stack: string[];
  execution: PDAExecution;
  history: PDAHistory[];
  onProcessingString: (input: string) => void;
  onStep: () => void;
  onReset: () => void;
  isProcessing: boolean;
}

export const PDAInputPanel: React.FC<PDAInputPanelProps> = ({
  currentState,
  execution,
  history,
  onProcessingString,
  onStep,
  onReset,
  isProcessing,
}) => {
  const [inputString, setInputString] = useState("((()))");

  const handleProcessString = () => {
    if (inputString.trim()) onProcessingString(inputString.trim());
  };

  const getStatusColor = () => {
    if (!execution.completed) return "bg-purple-100 text-purple-800";
    return execution.accepted
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const getStatusText = () => {
    if (!execution.completed) return "Processing...";
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

      {/* Input String Processing */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Input Processing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
              placeholder="Enter string (e.g., ((())))"
              disabled={isProcessing}
            />
            <Button
              onClick={handleProcessString}
              disabled={isProcessing || !inputString.trim()}
            >
              Process
            </Button>
          </div>

          {execution.inputString && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Input String:</div>
              <div className="font-mono text-lg bg-gray-100 p-2 rouded">
                {execution.inputString.split('').map((char, index) => (
                  <span
                    key={index}
                    className={`${
                      index === execution.currentPosition
                      ? "bg-yellow-300 text-black"
                      : index < execution.currentPosition
                      ? "text-gray-400"
                      : "text-black"
                    }`}
                  >
                    {char}
                  </span>
                ))}
                {execution.currentPosition >= execution.inputString.length && (
                  <span className="bg-yellow-400 text-black">$</span>
                )}
              </div>

              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
              >
                {getStatusText()}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Control */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols2 gap-2">
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
              Reset PDA
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Execution History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Execution History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mex-h-40 overflow-y-auto space-y-2">
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm">No steps yet</p>
            ) : (
              history.slice(-10).map((entry, index) => (
                <div 
                  key={index}
                  className="text-xs p-2 bg-gray 50 rounded space-y-1"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">
                      State: {entry.state}
                    </span>
                    {entry.input && (
                      <Badge 
                        variant="secondary"
                        className="text-xs"
                      >
                        Input: {entry.input}
                      </Badge>
                    )}
                  </div>
                  <div className="text-gray-600">
                    Stack: [{entry.stackAfter.join(", ")}]
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* PDA Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">About This PDA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Type:</strong> Balanced Parentheses Checker</p>
            <p><strong>States:</strong> q0 (start), q1 (processing), qf (accept)</p>
            <p><strong>Stack:</strong> Tracks opening parentheses</p>
            <p className="text-xs-mt-4 text-gray-500">
              This PDA accepts strings with balanced parentheses like (), (()), ((())), etc.
              It uses a stack to match opening and closing parentheses.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
