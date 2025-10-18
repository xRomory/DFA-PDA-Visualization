import type { DFAState } from "@/types";
import React from "react";

interface DFAStateNodeProps {
  state: DFAState;
  isActive: boolean;
  isInitial: boolean;
  onClick?: () => void;
}

export const DFAStateNode: React.FC<DFAStateNodeProps> = ({
  state,
  isActive,
  isInitial,
  onClick,
}) => {
  return (
    <g onClick={onClick} className="cursor-pointer">
      {/* Outer circle for accepting states */}
      {state.isAccepting && (
        <circle
          cx={state.x}
          cy={state.y}
          r="35"
          fill="none"
          stroke={state.color}
          strokeWidth="2"
          className={`transition-all duration-300 ${
            isActive ? "stroke-4" : "stroke-2"
          }`}
        />
      )}

      {/* Main state circle */}
      <circle
        cx={state.x}
        cy={state.y}
        r="30"
        fill={isActive ? state.color : "white"}
        stroke={state.color}
        strokeWidth="3"
        className={`transition-all duration-300 ${
          isActive ? "drop-shadow-lg animate-pulse" : ""
        }`}
      />

      {/* Initial state indicator */}
      {isInitial && (
        <>
          <line
            x1={state.x - 60}
            y1={state.y}
            x2={state.x - 35}
            y2={state.y}
            stroke={state.color}
            strokeWidth="3"
            markerEnd="url(#arrowhead)"
          />
          <text
            x={state.x - 75}
            y={state.y - 5}
            className="text-xs font-medium fill-gray-600"
          >
            Start
          </text>
        </>
      )}

      {/* State label */}
      <text
        x={state.x}
        y={state.y}
        textAnchor="middle"
        dominantBaseline="middle"
        className={`font-bold text-sm ${
          isActive ? "fill-white" : "fill-gray-800"
        }`}
      >
        {state.name}
      </text>

      {/* Accepting state indicator */}
      {state.isAccepting && (
        <text
          x={state.x}
          y={state.y + 50}
          textAnchor="middle"
          className="text-xs font-medium fill-green-600"
        >
          Accept
        </text>
      )}

      {/* Hover effect */}
      <circle
        cx={state.x}
        cy={state.y}
        r="30"
        fill="transparent"
        className="hover:fill-purple-700/20 hover:fill-opacity-10 transition-all duration-200"
      />
    </g>
  );
};