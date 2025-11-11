import { useCartStore } from "../../store/cartStore";

export const Notify = () => {
  const cartCounter = useCartStore((state) => state.itemsCount);

  return (
    <div className="absolute bg-red-500 w-4 h-4 rounded-full -top-1  -right-1">
      <div className="absolute right-[5px] text-[10px] ">{cartCounter}</div>
    </div>
  );
};
