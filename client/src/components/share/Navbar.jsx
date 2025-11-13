import { Search } from "lucide-react";
import { useEffect } from "react";
import { BookOpen } from "lucide-react";
import { User } from "lucide-react";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Notify } from "./notifiy";
import { UserDropDown } from "./UserDropDown";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
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
      {/* Logo  */}
      <div className="flex items-center justify-between pt-4 px-10   xl:max-w-[90rem] mx-auto">
        <div
          onClick={() => navigate("/")}
          className="flex gap-2 items-center  cursor-pointer "
        >
          <div>
            <BookOpen />
          </div>
          <div className="text-xl font-medium ">LearnSpace</div>
        </div>

        {/* Nav Search */}
        <div className="flex gap-5  items-center ">
          <div className="flex items-center bg-[#0a0b10] border rounded-lg  border-secondary hover:border-gray-700   ">
            <div className="pl-3 p-2">
              <Search size={20} />
            </div>
            <input
              type="text"
              className=" flex-1 placeholder:font-thin   bg-transparent rounded-md h-8 outline-none"
              placeholder="Search"
            />
          </div>
          {/* User icon */}
          <div className=" relative h-10 w-10 bg-secondary transition-all cursor-pointer  hover:bg-neutral-500 rounded-full">
            <User
              color="black"
              size={21}
              className="absolute left-[0.6rem] top-2"
              onClick={() => setActive((prev) => !prev)}
            />
            <UserDropDown active={active} />
          </div>
          {/* Cart icon */}
          <div
            onClick={() => navigate("/payment")}
            className=" relative bg-secondary rounded-full h-10 w-10 transition-all cursor-pointer  hover:bg-neutral-500 "
          >
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
