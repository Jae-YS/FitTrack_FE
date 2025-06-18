import React from "react";
import { Tooltip } from "@mui/material";
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
  strokeWidth = 24,
}) => {
  const center = size / 2;
  const radiusBase = center - strokeWidth - 8;
  const gap = 12;

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
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {goals.map((g, i) => {
          const pct =
            typeof g.completed === "number" &&
            typeof g.target === "number" &&
            g.target > 0
              ? Math.min(100, (g.completed / g.target) * 100)
              : 0;

          const radius = radiusBase - i * (strokeWidth + gap);
          const startAngle = -90;
          const arcLength = (pct / 100) * 360;
          const endAngle = startAngle + arcLength;

          const iconPos = polarToCartesian(center, center, radius, endAngle);
          let tooltip = "";

          if (g.label.toLowerCase().includes("sleep")) {
            tooltip = `${g.completed}/${g.target} hours slept`;
          } else if (g.label.toLowerCase().includes("distance")) {
            tooltip = `${g.completed}/${g.target} km ran`;
          }

          return (
            <g key={g.label}>
              {/* Background ring */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={`${g.color}22`}
                strokeWidth={strokeWidth}
              />

              <Tooltip title={tooltip} placement="top" arrow>
                <path
                  d={describeArc(center, center, radius, startAngle, endAngle)}
                  fill="none"
                  stroke={g.color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  style={{ pointerEvents: "visibleStroke", cursor: "pointer" }}
                />
              </Tooltip>

              <foreignObject
                x={iconPos.x - 10}
                y={iconPos.y - 10}
                width={20}
                height={20}
                style={{ pointerEvents: "none" }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "white",
                    borderRadius: "50%",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  {React.cloneElement(g.icon, { color: g.color, size: 14 })}
                </div>
              </foreignObject>
            </g>
          );
        })}

        <g transform={`translate(${center - 30}, ${center - 30})`}>
          <Flame size={60} color="#fb923c" />
        </g>
      </svg>
    </div>
  );
};
