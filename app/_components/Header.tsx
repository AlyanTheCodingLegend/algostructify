import { useGlobalStatesContext } from "../[username]/[studentId]/layout";

export default function Header() {
    const { isOpen, heading } = useGlobalStatesContext();

    return (
        <div
            className={`fixed top-0 left-0 right-0 px-4 py-2 bg-gray-800 text-white transition-all duration-300`}
            style={{
                marginLeft: isOpen ? "256px" : "64px",
            }}
        >
            <div className="flex justify-center items-center">
                <h1 className="text-2xl font-semibold text-white">{heading}</h1>
            </div>
        </div>
    );
}
