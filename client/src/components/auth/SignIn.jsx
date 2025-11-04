import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/fetch";

export const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  let { error, loading, request, setError } = useFetch("signin", {
    method: "POST",
    requiresAuth: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Only send username and password, not confirmPassword
      const { ...credentials } = formData;
      await request(credentials);
      // On successful registration, redirect to sign in
      navigate("/signin");
    } catch (err) {
      // Error is handled by the hook and shown below
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className=" mt-32  mx-auto    md:max-w-md  ">
      <div className=" border border-neutral-900 rounded-2xl ">
        <div className="p-3 px-8">
          <form
            className="mt-8 space-y-6 flex flex-col gap-2   "
            onSubmit={handleSubmit}
          >
            <h1 className="text-neutral-300/80 text-3xl text-center mb-1   tracking-wider">
              Login Account
            </h1>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="bg-transparent text-neutral-300   p-2 w-full outline-none px-6 border-b-[1px]   placeholder-neutral-300/50 border-neutral-900 rounded-lg"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="bg-transparent text-neutral-300 p-2 w-full outline-none px-6 border-b-[1px]  placeholder-neutral-300/50 border-neutral-900 rounded-md"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {loading && (
              <div className="fixed h-screen backdrop-blur-md inset-0 flex justify-center items-center">
                Loading...
              </div>
            )}
            {error && (
              <div className="text-red-700/80 text-sm text-center">{error}</div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="text-black/80 bg-gradient-to-br   cursor-pointer mb-6 bg-white/50  mt-2 rounded-lg  px-10  py-2  transition-colors duration-150 hover:text-blac hover:bg-wh
                 hover:transition-all"
              >
                {loading ? "Loging In..." : "Log in "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
