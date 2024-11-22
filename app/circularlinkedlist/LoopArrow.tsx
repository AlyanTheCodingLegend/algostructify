import React, { useEffect, useState } from "react";

type LoopArrowProps = {
  startId: string;
  endId: string;
};

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
      const control1X = startX + 50;  // Adjust 50px to the right of the last node
      const control1Y = startY - 100; // Above the nodes

      const control2X = endX - 50;  // Adjust 50px to the left of the first node
      const control2Y = endY - 100; // Above the nodes

      const newPath = `M ${startX} ${startY} C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${endX} ${endY}`;
      setPath(newPath);
    };

    // Allow time for layout to stabilize
    requestAnimationFrame(calculatePath);
  }, [startId, endId]);

  if (!path) return null; // Wait for the path calculation

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
    >
      <path
        d={path}
        stroke="black"
        fill="transparent"
        strokeWidth="6"
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
