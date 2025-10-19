import React from "react";
import type { PDAState } from "@/types";

interface PDAStateNodeProps {
  state: PDAState;
  isActive: boolean;
  isInitial: boolean;
  onClick?: () => void;
}

export const PDAStateNode: React.FC<PDAStateNodeProps> = ({
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
          isActive ? "drop-shadow-lg" : ""
        }`}
      />

      {/* Initial state indicator */}
      {isInitial && (
        <polygon
          points={`${state.x - 50},${state.y} ${state.x - 35},${state.y - 5} ${
            state.x - 35
          },${state.y + 5}`}
          fill={state.color}
          className="animate-pulse"
        />
      )}

      {/* State label */}
      <text
        x={state.x}
        y={state.y}
        textAnchor="middle"
        dominantBaseline="middle"
        className={`font-semibold text-sm ${
          isActive ? "fill-white" : "fill-gray-800"
        }`}
      >
        {state.name}
      </text>

      {/* Hover effect */}
      <circle
        cx={state.x}
        cy={state.y}
        r="30"
        fill="transparent"
        className="hover:fill-opacity-10 transition-all duration-200"
      />
    </g>
  );
};
