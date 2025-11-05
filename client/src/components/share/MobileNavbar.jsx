export const MobileNav = ({ toggle, links }) => {
  return (
    <div
      className={`fixed h-screen w-full backdrop-blur-md z-20 inset-0  ${
        toggle
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } `}
    >
      <div className="w-1/2 mx-auto text-center mt-32 text-xl flex flex-col gap-5 ">
        {links.map((e, index) => (
          <div key={index}>
            <a href={e.href}>{e.name}</a>
            <div className="absolute border-b-[1px] border-gray-500  inset-x-6 rounded-lg   p-[0.2px]  bg-transparent  "></div>
          </div>
        ))}
      </div>
    </div>
  );
};
