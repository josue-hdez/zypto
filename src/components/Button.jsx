function Button({ disabled = false, ref = null, onClick = null, children }) {
  return (
    <button
      className="size-8 rounded-full bg-light-gray disabled:bg-light-gray-disabled flex justify-center items-center cursor-pointer disabled:cursor-not-allowed"
      disabled={disabled}
      ref={ref}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
