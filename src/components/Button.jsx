function Button({
  className = "",
  width = "w-8",
  height = "h-8",
  disabled = false,
  ref = null,
  onClick = null,
  children,
}) {
  return (
    <button
      className={`${className} ${width} ${height} disabled:border disabled:border-light-gray rounded-full bg-light-gray disabled:bg-light-gray-disabled flex justify-center items-center cursor-pointer disabled:cursor-default`}
      disabled={disabled}
      ref={ref}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
