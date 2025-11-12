import { useCartStore } from "../../store/cartStore";

export default function CourseCard({
  title,
  description,
  price,
  author,
  courseId,
  image,
}) {
  const addCourse = useCartStore((state) => state.addToCart);

  const handlePurchase = (courseId) => {
    alert(`You Purchased ${courseId} `);

    addCourse({
      courseId,
      price,
      image,
      title,
      description,
      author,
    });

    // use purchase store and send the use selected id with title for frontend visibillity for payment page
    // no need to send the whole obj
  };

  return (
    <div className="bg-black/50  rounded-xl shadow-md overflow-hidden hover:shadow-lg  w-full max-w-sm  transform hover:-translate-y-2 transition-all ">
      <img src={image} alt={"ts"} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-1 text-white">
          {title}
        </h2>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>
        <div className="m-2 flex justify-between items-center">
          <span className="text-lg font-bold text-secondary">₹{price}</span>
          <button
            onClick={() => handlePurchase(courseId)}
            className="px-6 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
          >
            Buy Now
          </button>
        </div>
        <div className="text-white pt-2 flex justify-end items text-sm">
          {author}
        </div>
      </div>
    </div>
  );
}
