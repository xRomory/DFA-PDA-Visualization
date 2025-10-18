import type { DFAState, DFATransition } from "@/types";
import React from "react";

interface DFATransitionArrowProps {
  transition: DFATransition;
  fromState: DFAState;
  toState: DFAState;
  isActive?: boolean;
}

export const DFATransitionArrow: React.FC<DFATransitionArrowProps> = ({
  transition,
  fromState,
  toState,
  isActive = false,
}) => {
  // Calculate arrow path
  const dx = toState.x - fromState.x;
  const dy = toState.y - fromState.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Normalize direction
  const unitX = dx / distance;
  const unitY = dy / distance;

  // Start and end points (offset by circle radius)
  const startX = fromState.x + unitX * 30;
  const startY = fromState.y + unitY * 30;
  const endX = toState.x - unitX * 30;
  const endY = toState.y - unitY * 30;

  // Control point for curve (if not self-loop)
  const isSelfLoop = fromState.id === toState.id;
  let path: string;
  let labelX: number;
  let labelY: number;

  if (isSelfLoop) {
    // Self-loop
    const loopRadius = 30;
    const loopX = fromState.x;
    const loopY = fromState.y - 30 - loopRadius;

    path = `M ${fromState.x - 20} ${fromState.y - 25} 
            A ${loopRadius} ${loopRadius} 0 1 1 ${fromState.x + 20} ${
      fromState.y - 25
    }`;

    labelX = loopX;
    labelY = loopY - 15;
  } else {
    // Regular transition
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    // Perpendicular offset for curve
    const perpX = -unitY * 25;
    const perpY = unitX * 25;

    const controlX = midX + perpX;
    const controlY = midY + perpY;

    path = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;

    labelX = controlX;
    labelY = controlY;
  }

  // Arrow head calculation
  const arrowLength = 12;
  const arrowAngle = Math.PI / 6;

  let arrowX1, arrowY1, arrowX2, arrowY2;

  if (!isSelfLoop) {
    const angle = Math.atan2(dy, dx);
    arrowX1 = endX - arrowLength * Math.cos(angle - arrowAngle);
    arrowY1 = endY - arrowLength * Math.sin(angle - arrowAngle);
    arrowX2 = endX - arrowLength * Math.cos(angle + arrowAngle);
    arrowY2 = endY - arrowLength * Math.sin(angle + arrowAngle);
  } else {
    arrowX1 = fromState.x + 15;
    arrowY1 = fromState.y - 40;
    arrowX2 = fromState.x + 25;
    arrowY2 = fromState.y - 35;
  }

  return (
    <g
      className={`transition-all duration-500 ${
        isActive ? "opacity-100" : "opacity-70"
      }`}
    >
      <path
        d={path}
        fill="none"
        stroke={isActive ? "#ef4444" : "#6b7280"}
        strokeWidth={isActive ? "4" : "2"}
        className={`transition-all duration-500 ${
          isActive ? "animate-pulse" : ""
        }`}
      />

      {/* Arrow Head */}
      <polygon
        points={`${endX},${endY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
        fill={isActive ? "#ef4444" : "#6b7280"}
        className={`transition-all duration-500 ${
          isActive ? "animate-pulse" : ""
        }`}
      />

      {/* Transition Label Background */}
      <circle
        cx={labelX}
        cy={labelY}
        r="15"
        fill="white"
        stroke={isActive ? "#ef4444" : "#6b7280"}
        strokeWidth="2"
        className={`transition-all duration-500 ${
          isActive ? "animate-pulse" : ""
        }`}
      />

      {/* Transition label */}
      <text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        dominantBaseline="middle"
        className={`text-sm font-bold ${
          isActive ? "fill-red-600" : "fill-gray-700"
        }`}
      >
        {transition.label}
      </text>
    </g>
  );
};
