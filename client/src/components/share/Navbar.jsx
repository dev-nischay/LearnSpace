import { Search } from "lucide-react";
import { useEffect } from "react";
import { BookOpen } from "lucide-react";
import { User } from "lucide-react";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Notify } from "./notifiy";
import { UserDropDown } from "./UserDropDown";

export const Navbar = () => {
  const [active, setActive] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed   z-40   inset-x-0 bg-[#0a0b10] border-secondary  border-b-[0.5px] h-18  text-white  transition-all duration-300  transform  ${
        isVisible
          ? "opacity-100 pointer-events-auto translate-y-0 "
          : "opacity-0 pointer-events-none -translate-y-10 "
      } `}
    >
      <div className="flex items-center justify-between pt-4  xl:max-w-[90rem] mx-auto">
        <div className="flex gap-2 items-center ">
          <div>
            <BookOpen />
          </div>
          <div className="text-xl font-medium">LearnSpace</div>
        </div>
        <div className="flex gap-5  items-center ">
          <div className="flex items-center bg-[#0a0b10] border rounded-lg  border-secondary   ">
            <div className="pl-3 p-2">
              <Search size={20} />
            </div>
            <input
              type="text"
              className=" flex-1 placeholder:font-thin  bg-transparent rounded-md h-8 outline-none"
              placeholder="Search"
            />
          </div>
          <div className=" relative h-10 w-10 bg-secondary  rounded-full">
            <User
              color="black"
              size={21}
              className="absolute left-[0.6rem] top-2"
              onClick={() => setActive((prev) => !prev)}
            />
            <UserDropDown active={active} />
          </div>
          <div className=" relative bg-secondary rounded-full h-10 w-10 ">
            <ShoppingBag
              color="black"
              size={21}
              className="absolute left-[0.6rem] top-2"
            />
            <Notify />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
