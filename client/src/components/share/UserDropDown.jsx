import { History } from "lucide-react";
import { Bookmark } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { CreditCardIcon } from "lucide-react";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export const UserDropDown = ({ active }) => {
  const logout = useAuthStore((state) => state.logout);
  const username = useAuthStore((state) => state.creds.username);
  const navigate = useNavigate();

  const items = [
    { name: "Watch History", svg: <History size={18} /> },
    { name: "Bookmarks", svg: <Bookmark size={18} /> },
    { name: "Questions", svg: <MessageSquare size={18} /> },
    { name: "Payment Methods", svg: <CreditCardIcon size={18} /> },
  ];

  const handleClick = () => {
    if (username.length > 0) logout();
    navigate("/signin");
  };

  return (
    <div
      className={`absolute   border-neutral-700 border  rounded-md transform transition-all  bg-[#171717] h-fit  w-fit -inset-x-28 inset-y-16 duration-300  ${
        active
          ? "opacity-100 pointer-events-auto -translate-y-2  "
          : "opacity-0 pointer-events-none"
      } `}
    >
      <div className="flex flex-col gap-3  text-sm font-thin m-2">
        {items.map((e, index) => (
          <div
            key={index}
            className="flex gap-2 hover:bg-secondary/20 p-1  transition-color duration-150 rounded-md "
          >
            {e.svg} {e.name}
          </div>
        ))}
      </div>
      <div className="border-t-[1px] border-white/35 h-ful pb-1  text-sm font-thin m-2">
        <div
          onClick={handleClick}
          className="flex  items-center gap-2 hover:bg-secondary/20 p-1 mt-2 transition-color duration-150  rounded-md hover:text-red-500 "
        >
          <LogOut size={18} />
          {username ? "Logout " : "Login"}
        </div>
      </div>
    </div>
  );
};

// maybe shift it to local state
