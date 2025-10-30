import { Menu } from "lucide-react";

export const Navbar = () => {
  const links = [
    { name: "Login", href: "" },
    { name: "Social", href: "https://x.com/nischaytwt" },
    { name: "Github", href: "https://github.com/dev-nischay" },
  ];
  return (
    <div className="text-neutral-300  h-full w-full  text-sm max-w-sm   mx-auto flex items-center border border-neutral-900  justify-between rounded-full mt-1  px-4 p-2 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-[70%]  lg:text-lg 2xl:text-4xl   md:px-6  lg:p-3 lg:px-8 xl:  2xl:p-10  2xl:px-12">
      <div>Learnspace</div>
      <div className="lg:hidden lg:pointer-events-none">
        <Menu />
      </div>
      <div className="lg:flex gap-6 hidden   ">
        {links.map((e, index) => (
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
