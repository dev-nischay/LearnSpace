import { X, Search } from "lucide-react";

export const MobileNav = ({ setToggle, toggle }) => {
  return (
    <div
      className={`bg-neutral-900 fixed inset-0 h-screen transition-all duration-300 ${
        toggle
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <div className="p-4 space-y-4">
        {/* Close Button */}
        <button onClick={() => setToggle((prev) => !prev)} className="mb-6">
          <X />
        </button>

        {/* Search Box */}
        <div className="flex items-center bg-neutral-900 border border-gray-700 rounded-lg px-3 py-2">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent outline-none ml-2 text-white placeholder:text-gray-500"
          />
        </div>
      </div>
    </div>
  );
};
