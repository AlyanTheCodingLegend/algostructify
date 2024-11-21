import React, { useEffect, useState } from "react";

interface LoopArrowProps {
  startId: string;
  endId: string;
}

const LoopArrow: React.FC<LoopArrowProps> = ({ startId, endId }) => {
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    const calculatePath = () => {
      const startElement = document.getElementById(startId);
      const endElement = document.getElementById(endId);

      if (!startElement || !endElement) {
        console.warn(`Elements not found: startId=${startId}, endId=${endId}`);
        return;
      }

      const startRect = startElement.getBoundingClientRect();
      const endRect = endElement.getBoundingClientRect();

      const startX = startRect.right;
      const startY = startRect.top + startRect.height / 2;
      const endX = endRect.left;
      const endY = endRect.top + endRect.height / 2;

      // Adjust control points for a smoother curve
      const controlX = (startX + endX) / 2;
      const controlY = Math.min(startY, endY) - 100;

      const newPath = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
      setPath(newPath);
    };

    // Allow time for layout to stabilize
    requestAnimationFrame(calculatePath);
  }, [startId, endId]);

  if (!path) return null; // Wait for the path calculation

  return (
    <svg className="loop-arrow" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}>
      <path
        d={path}
        stroke="black"
        fill="transparent"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="black" />
        </marker>
      </defs>
    </svg>
  );
};

export default LoopArrow;
