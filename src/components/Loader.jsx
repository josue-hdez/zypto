function Loader({ className = "", width, height }) {
  return (
    <div
      className={`${className} ${width} ${height} rounded-full bg-gray-300 animate-pulse`}
    ></div>
  );
}

export default Loader;
