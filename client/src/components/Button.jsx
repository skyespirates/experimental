const Button = ({ children, onClick, className, ...props }) => {
  return (
    <button onClick={onClick} {...props} className={`btn ${className}`}>
      {children}
    </button>
  );
};

export default Button;
