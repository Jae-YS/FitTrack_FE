import React, { type JSX } from "react";
import { Flame } from "lucide-react";
import type { GoalProgress } from "../../constant/types";

interface RadialProgressChartProps {
  goals: GoalProgress[];
  size?: number;
  strokeWidth?: number;
}

export const RadialProgressChart: React.FC<RadialProgressChartProps> = ({
  goals,
  size = 300,
  strokeWidth = 18,
}) => {
  const center = size / 2;
  const radiusBase = center - strokeWidth;
  const gap = 4;

  const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angleDeg: number
  ) => {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    };
  };

  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {goals.map((g, i) => {
        const radius = radiusBase - i * (strokeWidth + gap);
        const startAngle = -90;

        const pct = Math.min(100, (g.completed / g.target) * 100);
        const arcLength = (pct / 100) * 360;
        const endAngle = startAngle + arcLength;

        const { x: iconX, y: iconY } = polarToCartesian(
          center,
          center,
          radius,
          endAngle
        );

        const tooltip = `${g.completed}/${g.target} ${g.label}`;

        return (
          <g key={g.label}>
            {/* Full background circle */}
            <path
              d={describeArc(center, center, radius, 0, 360)}
              fill="none"
              stroke="#e6e6e6"
              strokeWidth={strokeWidth}
            />

            {/* Progress arc with tooltip */}
            {pct >= 100 ? (
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={g.color}
                strokeWidth={strokeWidth}
              >
                <title>{tooltip}</title>
              </circle>
            ) : (
              <path
                d={describeArc(center, center, radius, startAngle, endAngle)}
                fill="none"
                stroke={g.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              >
                <title>{tooltip}</title>
              </path>
            )}

            {/* Always show icon */}
            <g transform={`translate(${iconX - 10}, ${iconY - 10})`}>
              {g.icon}
            </g>
          </g>
        );
      })}

      {/* Center flame icon */}
      <g transform={`translate(${center - 30}, ${center - 30})`}>
        <Flame size={60} color="#fb923c" />
      </g>
    </svg>
  );
};
