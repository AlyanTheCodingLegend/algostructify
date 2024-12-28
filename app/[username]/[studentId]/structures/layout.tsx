"use client";

import Header from "@/app/_components/Header";
import Sidebar from "@/app/_components/Sidebar";
import { createContext, ReactNode, useContext, useState } from "react";

type StructuresLayoutProps = {
    children: ReactNode;
};

type GlobalStatesType = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    heading: string;
    setHeading: React.Dispatch<React.SetStateAction<string>>;
};

const GlobalStatesContext = createContext<GlobalStatesType | undefined>(undefined);

export const useGlobalStatesContext = () => {
    const context = useContext(GlobalStatesContext);
    if (!context) {
        throw new Error("useGlobalStatesContext must be used within a GlobalStatesProvider");
    }
    return context;
}

export default function StructuresLayout({ children }: StructuresLayoutProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [heading, setHeading] = useState("");
    
    return (
        <GlobalStatesContext.Provider value={{ isOpen, setIsOpen, heading, setHeading }}>
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="flex flex-col w-full h-full overflow-hidden">
                    <Header />
                    {children}
                </div>
            </div>
        </GlobalStatesContext.Provider>
    )
}