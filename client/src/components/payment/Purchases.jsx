import CourseCard from "../home/Course";
import { usePurchaseStore } from "../../store/purchaseStore";

export const Purchases = () => {
  const purchases = usePurchaseStore((e) => e.purchasedCourses);
  return (
    <div className="min-h-screen mt-10 w-full ">
      <h1 className="text-white text-2xl font-semibold pl-5">Your Purchases</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-12 w-full">
        {purchases.map((e, idx) => (
          <CourseCard
            key={idx}
            title={e.title}
            price={e.price}
            description={e.description}
            image={e.image}
          />
        ))}
      </div>
    </div>
  );
};
