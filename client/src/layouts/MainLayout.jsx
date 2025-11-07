import { Outlet } from "react-router-dom";
import Navbar from "../components/share/Navbar";
export const MainLayout = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden font-[Rubik] ">
      <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-[radial-gradient(circle_at_top_right,rgba(220,230,240,0.3),transparent_70%)] blur-3xl animate-glow1 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[70vw] h-[70vh] bg-[radial-gradient(circle_at_bottom_left,rgba(180,200,220,0.25),transparent_80%)] blur-3xl animate-glow2 pointer-events-none "></div>
      <div className="absolute top-1/3 left-1/3 w-[50vw] h-[50vh] bg-[radial-gradient(circle,rgba(255,255,255,0.1),transparent_70%)] blur-2xl animate-glow3 pointer-events-none "></div>
      <Navbar />
      <div className="p-4 mt-16">
        <Outlet />
      </div>
    </div>
  );
};
