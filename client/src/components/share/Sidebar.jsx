import { Menu, SidebarOpen } from "lucide-react";
import { HomeIcon } from "lucide-react";
import { Github } from "lucide-react";
import { CreditCard } from "lucide-react";
import { useState } from "react";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const icons = [
    { name: "Home", svg: <HomeIcon /> },
    { name: "Github", svg: <Github /> },
    { name: "CreditCard", svg: <CreditCard /> },
  ];

  return (
    <div
      className={`bg-[#0a0b10] fixed left-0 inset-y-0  border-r-[1px] transition-all duration-300 z-50 transform border-secondary     text-white ${
        open ? "w-52" : "w-18"
      }`}
    >
      <div
        className={`text-white border-b-[1px] border-secondary flex-col flex gap-6 p-2  h-18 mb-5     `}
      >
        <div
          onClick={() => setOpen((prev) => !prev)}
          className={`rounded flex items-center gap-2 pl-2  mt-5 transition-all  ${
            open ? "hover:bg-secondary/20" : "bg-none"
          }`}
        >
          <div className="flex gap-2  items-center">
            <div
              className={` ${
                open ? "bg-none" : "hover:bg-secondary/20"
              } pl-2  rounded-md`}
            >
              <SidebarOpen />
            </div>
            {
              <h1
                className={`text-xl items-center   transition-all duration-200 ${
                  open
                    ? "opacity-100 pointer-events-auto "
                    : "opacity-0 pointer-events-none "
                }`}
              >
                Menu
              </h1>
            }
          </div>
        </div>
        <div>
          <div className="flex-col gap-5 flex   ">
            {icons.map((e, i) => (
              <div key={i} className="p-2 rounded-md transition-all ">
                <div
                  className={` flex  ${
                    open ? "hover:bg-secondary/20" : "bg-none"
                  }  items-center gap-2 rounded-md`}
                >
                  <div
                    className={`${
                      open ? "bg-none" : "hover:bg-secondary/20"
                    }  p-2 rounded-md`}
                  >
                    {e.svg}
                  </div>
                  <div
                    className={` transition-all duration-200 ${
                      open
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    {e.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
