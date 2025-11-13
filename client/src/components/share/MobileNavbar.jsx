import { X } from "lucide-react";

export const MobileNav = ({ toggle, links, setToggle }) => {
  return (
    <div
      className={`fixed h-screen w-full  transition-opacity backdrop-blur-lg z-20 inset-0  ${
        toggle
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } `}
    >
      <div
        onClick={() => setToggle((prev) => !prev)}
        className="absolute top-7 right-8 "
      >
        <X size={30} />
      </div>
      <div className=" mt-32 min-h-80 rounded-md m-2 bg-neutral-900">
        <div className=" mx-auto max-w-lg">
          {links.map((e, index) => (
            <div key={index}>
              <a href={e.href}>{e.name}</a>
            </div>
          ))}
          e
        </div>
      </div>
    </div>
  );
};
