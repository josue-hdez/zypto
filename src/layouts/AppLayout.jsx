import { useRef } from "react";
import { Outlet } from "react-router";
import Icon from "../components/Icon";

function AppLayout() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <header className="content-block">
        <div className="container space-y-1 xs:space-y-0 xs:flex xs:justify-between xs:items-center">
          <h1 className="font-medium text-3xl">ZYPTO</h1>
          <div
            className="w-full xs:w-3/5 max-w-[450px] h-[45px] px-6 rounded-full bg-light-gray flex items-center cursor-text"
            onClick={handleClick}
          >
            <Icon>
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </Icon>
            <input
              className="placeholder:text-charcoal w-full h-full px-3 outline-none"
              id="search-coin"
              name="search-coin"
              placeholder="Search for a coin"
              ref={inputRef}
            />
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="content-block">
        <div className="container">
          <h2 className="font-medium text-xl">ZYPTO</h2>
          <span className="text-xs">© 2025 ZYPTO</span>
        </div>
      </footer>
    </>
  );
}

export default AppLayout;
