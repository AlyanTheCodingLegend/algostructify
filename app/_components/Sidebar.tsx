import { useParams, useRouter } from "next/navigation";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { useGlobalStatesContext } from "../[username]/[studentId]/structures/layout";
import { PiSignOut, PiTreeStructureThin } from "react-icons/pi";
import { CgOptions } from "react-icons/cg";
import { FaBookOpen } from "react-icons/fa";
import { MdOutlineLeaderboard } from "react-icons/md";
import { dataStructures } from "../[username]/[studentId]/menu/page";
import { useState } from "react";

export default function Sidebar() {
    const [topic, setTopic] = useState("Doubly Linked List");

    const { username, studentId } = useParams();

    const { isOpen, setIsOpen } = useGlobalStatesContext();

    const router = useRouter();

    return (
        <div
          className={`${
            isOpen ? "w-64" : "w-16"
          } h-full z-0 fixed top-0 left-0 bg-black text-white transition-all duration-300 shadow-lg`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-4 py-3">
            {isOpen ? (
              <div className="flex items-center">
                <div className="text-xl font-semibold">Welcome, {username}!</div>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-400 hover:text-white transition"
                >
                  <BiArrowToLeft size={30} />
                </div>
              </div>
            ) : (
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-white transition mx-auto"
              >
                <BiArrowToRight size={30} />
              </div>
            )}
          </div>
    
          {/* Divider */}
          <div className="border-t border-gray-700"></div>
    
          {/* Options Section */}
          {isOpen && (
            <div className="px-4 py-3">
              <div className="text-lg font-medium mb-4 flex items-center">
                <CgOptions className="mr-2" size={24} />
                Options
              </div>
              <div className="space-y-4">
                <SidebarOption
                  icon={<PiTreeStructureThin size={24} />}
                  label="Visualize Structures"
                  onClick={() => router.push(`/${username}/${studentId}/menu`)}
                />
                <SidebarOption
                  icon={<FaBookOpen size={24} />}
                  label="Take A Quiz"
                  onClick={() => router.push(`/${username}/${studentId}/quiz`)}
                />
                <SidebarOption
                  icon={<MdOutlineLeaderboard size={24} />}
                  label="View Leaderboard"
                  onClick={() => router.push(`/${username}/${studentId}/quiz/leaderboard?topic=${topic}`)}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
            </div>
          )}
    
          {/* Sign Out */}
          <div className="absolute bottom-4 w-full px-4">
            <div
              className="flex items-center justify-center bg-red-600 hover:bg-red-500 text-white text-lg font-medium px-4 py-2 rounded-full cursor-pointer transition"
              onClick={() => router.push("/login")}
            >
              <PiSignOut size={24} className="mr-2" />
              {isOpen && "Sign Out"}
            </div>
          </div>
        </div>
      );
    };
    
    type SidebarOptionProps = {
        icon: React.ReactNode;
        label: string;
        onClick: () => void;
        onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    };


    const SidebarOption = ({ icon, label, onClick, onChange }: SidebarOptionProps) => (
      <div
        className="flex flex-col items-center space-x-3 px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition cursor-pointer"
        onClick={onClick}
      >
        {icon}
        <span className="text-lg font-medium">{label}</span>
        {label === "View Leaderboard" && (
            <select onChange={onChange} className="bg-gray-700 text-white p-2 rounded-lg">
                {dataStructures.map((structure) => (
                <option value={structure.name}>{structure.name}</option>
                ))}
            </select>
        )}
      </div>
    );
    