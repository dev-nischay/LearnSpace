import { useState } from "react";
import { useFetch } from "../../hooks/fetch";
import Button from "../share/Button";
import Input from "../share/Input";
export const SignIn = () => {
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
      const { ...credentials } = formData;
      await request(credentials);
    } catch (err) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
  ];

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
              <Button type="submit">Signin</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
