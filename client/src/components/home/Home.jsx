import { useEffect, useState } from "react";
import CourseCard from "../share/Course";
import { useFetch } from "../../hooks/fetch";
import { useAuthStore } from "../../store/authStore";
export const Home = () => {
  const [courses, setCourses] = useState([]);
  console.log(courses);
  const data = useAuthStore((state) => state.creds);
  console.log(data);
  const { error, request, loading } = useFetch("courses", {
    method: "GET",
    requiresAuth: true,
  });

  useEffect(() => {
    const get = async () => {
      try {
        const data = await request();
        setCourses(data.courses);
      } catch (error) {
        alert(error.message);
      }
    };
    get();
  }, []);

  return (
    <div className="min-h-screen w-full lg:p-8">
      <h1 className="text-white m-2 text-xl font-semibold md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
        Welcome {data.username}
      </h1>
      <div className="grid grid-cols-1 gap-12 w-full  mx-auto  md:grid-cols-2 lg:grid-cols-3">
        {courses.map((e, i) => (
          <CourseCard
            key={i}
            title={e.title}
            description={e.description}
            price={e.price}
            courseId={e._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
