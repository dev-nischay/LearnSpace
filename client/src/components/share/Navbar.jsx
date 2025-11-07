import { Search } from "lucide-react";
import { BookOpen } from "lucide-react";
import { User } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="fixed p-6 px-12 justify-between   inset-x-0 bg-[#0a0b10] border-secondary  border-b-[0.5px] h-18 flex items-center text-white ">
      <div className="flex gap-2 items-center">
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
        <div className=" relative h-10 w-10 bg-secondary rounded-full">
          <User
            color="black"
            size={21}
            className="absolute left-[0.6rem] top-2"
            onClick={() => setActive((prev) => !prev)}
          />
          <UserTooltip active={active} />
        </div>
      </div>
    </div>
  );
};

const UserTooltip = ({ active }) => {
  return (
    <div
      className={`absolute  border-neutral-700 border  rounded-md transform transition-all bg-[#171717] h-56  w-44 -inset-x-28 inset-y-16  duration-300 ${
        active
          ? "opacity-100 pointer-events-auto  -translate-y-2 "
          : "opacity-0 pointer-events-none"
      } `}
    ></div>
  );
};

export default Navbar;
