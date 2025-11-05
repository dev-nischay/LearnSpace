import { useState } from "react";
import { Link } from "react-router-dom";
import { MobileNav } from "./MobileNavbar";
import { Menu } from "lucide-react";
export const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const socials = [
    { name: "Signin", href: "/signin" },
    { name: "Social", href: "https://x.com/nischaytwt" },
    { name: "Github", href: "https://github.com/dev-nischay" },
  ];

  return (
    <div className="text-neutral-300  h-full w-full  text-sm max-w-sm   mx-auto flex items-center border border-neutral-900  justify-between rounded-full mt-1  px-4 p-2 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-[60%]   xl:text-lg    md:px-6  lg:p-3 lg:px-8  2xl:p-5    2xl:px-10   ">
      <Link to={"/"}>
        <div>Learnspace</div>
      </Link>
      <div
        className="lg:hidden lg:pointer-events-none"
        onClick={() => setToggle((prev) => !prev)}
      >
        <Menu />
        <MobileNav toggle={toggle} links={socials} />
      </div>
      <div className="lg:flex gap-6 hidden">
        {socials.map((e, index) => (
          <a
            target="_new"
            className=" text-neutral-300 mr-2 transform hover:-translate-y-1  transition-all duration-200 "
            href={e.href}
            key={index}
          >
            {e.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
