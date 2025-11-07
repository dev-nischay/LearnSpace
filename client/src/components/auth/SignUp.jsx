import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/fetch";
import Input from "../share/Input";
import Button from "../share/Button";
export const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  let { error, loading, request, setError } = useFetch("signup", {
    method: "POST",
    requiresAuth: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Password do not match");
      return;
    }
    try {
      const { confirmPassword, ...credentials } = formData;
      const data = await request(credentials);
      if (data.message) {
        alert(data.message);
      }
      navigate("/signin");
    } catch (err) {}
  };
  const inputData = [
    {
      inputName: "username",
      placeholder: "Username",
      value: formData.username,
    },
    {
      inputName: "password",
      placeholder: "Password",
      value: formData.password,
    },
    {
      inputName: "confirmPassword",
      placeholder: "Confirm Password",
      value: formData.confirmPassword,
    },
  ];

  return (
    <div className=" mt-44 mx-auto    md:max-w-md  lg:max-w-lg xl:max-w-xl 2xl:max-w-xl">
      <div className=" border border-primary rounded-2xl ">
        <div className="p-3 px-8">
          <form
            className="mt-8 space-y-6 flex flex-col gap-2   "
            onSubmit={handleSubmit}
          >
            <h1 className="text-neutral-300/80 text-3xl text-center mb-1   tracking-wider">
              Create Account
            </h1>

            {inputData.map((e, i) => (
              <div key={i}>
                <label htmlFor={e.inputName} className="sr-only">
                  {e.placeholder}
                </label>
                <Input
                  name={e.inputName}
                  placeholder={e.placeholder}
                  value={e.value}
                  setState={setFormData}
                />
              </div>
            ))}

            {loading && (
              <div className="fixed h-screen backdrop-blur-md inset-0 flex justify-center items-center">
                Loading...
              </div>
            )}
            {error && (
              <div className="text-red-700/80 text-sm text-center">{error}</div>
            )}

            <div className="flex justify-center">
              <Button type="submit">Signup</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
