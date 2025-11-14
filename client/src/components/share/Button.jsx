export const Button = ({ type = "button", className = "", children }) => {
  return (
    <button
      type={type}
      //   disabled={loading}
      className={`text-black bg-gradient-to-br   cursor-pointer mb-6 bg-secondary sm:text-sm md:text-md lg:text-lg     mt-2 rounded-lg  px-10  py-2  transition-colors duration-150 hover:text-blac hover:bg-wh
                 hover:transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
