import { useEffect, useState } from "react";
import CourseCard from "./Course.jsx";
import { useFetch } from "../../hooks/fetch";
import { useAuthStore } from "../../store/authStore";
import { images } from "../../utils/fake-data";
import { usePurchaseStore } from "../../store/purchaseStore";
import { useCartStore } from "../../store/cartStore";
export const Home = () => {
  const courses = usePurchaseStore((state) => state.courses);
  const setCourses = usePurchaseStore((state) => state.setCourses);
  const clearCart = useCartStore((state) => state.clearCart);
  const data = useAuthStore((state) => state.creds);
  const { error, request, loading } = useFetch("courses", {
    method: "GET",
    requiresAuth: true,
  });

  useEffect(() => {
    const get = async () => {
      try {
        const res = await request();
        setCourses(res.courses);
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    };
    get();
  }, []);

  return (
    <div className="min-h-screen w-full lg:p-8 xl:max-w-[90rem] mx-auto">
      {loading && (
        <div className="fixed h-screen backdrop-blur-md text-white inset-0 flex justify-center items-center">
          Loading...
        </div>
      )}
      <h1 className="text-white m-2 mb-10 text-xl font-semibold md:text-2xl lg:text-3xl ">
        Welcome {data.username}{" "}
        <button
          onClick={() => clearCart()}
          className="bg-red-500 px-2  rounded-lg text-black"
        >
          clearCart test
        </button>
      </h1>

      <div className="grid grid-cols-1 gap-12 w-full  mx-auto  md:grid-cols-2 lg:grid-cols-3">
        {courses.map((e, i) => (
          <CourseCard
            key={i}
            title={e.title}
            description={e.description}
            price={e.price}
            courseId={e._id}
            image={images[i]}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
