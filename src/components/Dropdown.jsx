import { useState } from "react";
import Icon from "./Icon";

function Dropdown({ options, label, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hidden sm:flex items-center gap-1 absolute top-1/2 right-0 -translate-y-1/2">
      <span>{label}</span>
      <div className="relative">
        <div
          className="py-1 px-3 rounded-lg bg-steel flex justify-center items-center gap-1 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-white">{value}</span>
          <Icon color="white">
            {isOpen ? (
              <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
            ) : (
              <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
            )}
          </Icon>
        </div>
        {isOpen && (
          <ul className="w-full mt-1 rounded-lg bg-steel absolute top-full overflow-hidden">
            {options.map((option) => (
              <li
                key={option}
                className={`text-white py-1 px-3 ${
                  option === value && "bg-light-steel"
                } ${option === value ? "cursor-default" : "cursor-pointer"}`}
                onClick={() => {
                  if (option !== value) {
                    setIsOpen(false);
                    onChange(option);
                  }
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
