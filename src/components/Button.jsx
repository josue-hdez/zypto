function Button({ disabled, onClick, children }) {
  return (
    <button
      className="py-1 px-1.5 rounded-lg bg-steel disabled:bg-light-steel flex justify-center items-center cursor-pointer disabled:cursor-default"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
