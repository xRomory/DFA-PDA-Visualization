import React from "react";
import type { PDATransition, PDAState } from "@/types";

interface PDATransitionArrowProps {
  transition: PDATransition;
  fromState: PDAState;
  toState: PDAState;
  isActive?: boolean;
}

export const PDATransitionArrow: React.FC<PDATransitionArrowProps> = ({
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
    const loopRadius = 25;
    const loopX = fromState.x;
    const loopY = fromState.y - 30 - loopRadius;

    path = `M ${fromState.x - 15} ${fromState.y - 25} 
            A ${loopRadius} ${loopRadius} 0 1 1 ${fromState.x + 15} ${
      fromState.y - 25
    }`;

    labelX = loopX;
    labelY = loopY - 20;
  } else {
    // Regular transition
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    // Perpendicular offset for curve
    const perpX = -unitY * 20;
    const perpY = unitX * 20;

    const controlX = midX + perpX;
    const controlY = midY + perpY;

    path = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;

    labelX = controlX;
    labelY = controlY;
  }

  // Arrow head calculation
  const arrowLength = 10;
  const arrowAngle = Math.PI / 6;

  let arrowX1, arrowY1, arrowX2, arrowY2;

  if (!isSelfLoop) {
    const angle = Math.atan2(dy, dx);
    arrowX1 = endX - arrowLength * Math.cos(angle - arrowAngle);
    arrowY1 = endY - arrowLength * Math.sin(angle - arrowAngle);
    arrowX2 = endX - arrowLength * Math.cos(angle + arrowAngle);
    arrowY2 = endY - arrowLength * Math.sin(angle + arrowAngle);
  } else {
    arrowX1 = fromState.x + 10;
    arrowY1 = fromState.y - 35;
    arrowX2 = fromState.x + 20;
    arrowY2 = fromState.y - 30;
  }

  return (
    <g
      className={`transition-all duration-300 ${
        isActive ? "opacity-100" : "opacity-70"
      }`}
    >
      {/* Transition path */}
      <path
        d={path}
        fill="none"
        stroke={isActive ? "#3b82f6" : "#6b7280"}
        strokeWidth={isActive ? "3" : "2"}
        markerEnd="url(#arrowhead)"
        className="transition-all duration-300"
      />

      {/* Arrow head */}
      <polygon
        points={`${endX},${endY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
        fill={isActive ? "#3b82f6" : "#6b7280"}
        className="transition-all duration-300"
      />

      {/* Transition label background */}
      <rect
        x={labelX - 25}
        y={labelY - 12}
        width="50"
        height="24"
        rx="12"
        fill="white"
        stroke={isActive ? "#3b82f6" : "#6b7280"}
        strokeWidth="1"
        className="transition-all duration-300"
      />

      {/* Transition label */}
      <text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        dominantBaseline="middle"
        className={`text-xs font-medium ${
          isActive ? "fill-blue-600" : "fill-gray-600"
        }`}
      >
        {transition.label}
      </text>
    </g>
  );
};
