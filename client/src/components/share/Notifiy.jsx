export const Notify = ({ counter = 1 }) => {
  return (
    <div className="absolute bg-red-500 w-4 h-4 rounded-full -top-1  -right-1">
      <div className="absolute right-[5px] text-[10px] ">{counter}</div>
    </div>
  );
};
