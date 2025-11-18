import { SidebarOpen } from "lucide-react";
import { Github } from "lucide-react";
import { Bookmark } from "lucide-react";
import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { HomeIcon } from "lucide-react";
import { SidebarClose } from "lucide-react";
export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(false);
  const icons = [
    { name: "Home", svg: <HomeIcon /> },
    { name: "Github", svg: <Github /> },
    { name: "Purchases", svg: <CreditCard /> },
    { name: "Bookmark", svg: <Bookmark /> },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setSlide(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`bg-[#0a0b10] fixed inset-x-0 bottom-0   2xl:left-0 2xl:inset-y-0  border-t-[1px] 2xl:border-r-[1px] transition-all duration-300 z-50 transform border-secondary sm:px-3 md:px-6 lg:px-10 xl:px-16   2xl:px-0  text-white ${
        open ? "2xl:w-52 " : "2xl:w-18"
      } ${slide ? "translate-y-0" : "translate-y-20"}`}
    >
      <div
        className={`text-white 2xl:border-b-[1px]     2xl:border-secondary  2xl:flex-col flex gap-6 p-2  h-18   `}
      >
        {/* Toggle Sidebar */}
        <div className="2xl:flex gap-2  items-center  hidden hover:text-blue-500 rounded-md">
          <div
            onClick={() => setOpen((prev) => !prev)}
            className=" 2xl:hover:bg-secondary/20 p-3 rounded-md"
          >
            {open ? <SidebarOpen /> : <SidebarClose />}
          </div>
          {
            <h1
              className={`text-xl items-center   transition-all duration-200 ${
                open ? "2xl:flex" : "2xl:hidden"
              }`}
            >
              Menu
            </h1>
          }
        </div>

        {/* Icons sections  */}
        <div className="2xl:flex-col 2xl:gap-10 flex items-center  w-full  mt-3  justify-between 2xl:items-start ">
          {icons.map((e, i) => (
            <div
              key={i}
              className={`flex gap-1  items-center hover:text-blue-500     rounded-md transition-all `}
            >
              <div className={`rounded-md p-3  2xl:hover:bg-secondary/20`}>
                {e.svg}
              </div>
              <div
                className={`hidden  lg:flex ${
                  open ? "2xl:flex" : "2xl:hidden"
                }`}
              >
                {e.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
