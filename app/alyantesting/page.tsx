export default function Page() {
    return (
        <div className="h-screen w-screen">
            <svg
                // viewBox="0 0 1800 700"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    zIndex: -1,
                }}
            >
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="0"
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill="blue" />
                    </marker>
                </defs>
                <path
                    d="M 553 567.5 C 553 597, 1723 597, 1723 626.5"
                    stroke="black"
                    fill="transparent"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead)"
                />
            </svg>
        </div>
    );
}
