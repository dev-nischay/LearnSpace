export const Input = ({ name, placeholder, value, setState }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <input
      name={name}
      type="text"
      required
      className="bg-transparent text-neutral-300   p-2 w-full outline-none px-6 border-b-[1px]   placeholder-neutral-300/50 border-neutral-900 rounded-lg"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};
export default Input;
