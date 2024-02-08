const Input = ({ value, onChange, ...props }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      {...props}
      type="text"
      placeholder="Type here"
      className="input input-bordered w-full max-w-xs"
    />
  );
};

export default Input;
