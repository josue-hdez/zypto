import Select from "react-select";
import { getColor } from "../utils/getColor";

const lightGray = getColor("light-gray");
const lightGrayDisabled = getColor("light-gray-disabled");

function Dropdown({ options, selectedOption, onChange }) {
  return (
    <div className="w-[150px] hidden md:block absolute top-1/2 right-0 -translate-y-1/2">
      <Select
        styles={{
          control: (base) => ({
            ...base,
            fontSize: "14px",
            padding: "3px 9px",
            border: "none",
            boxShadow: "none",
            borderRadius: "24px",
            backgroundColor: lightGray,
            cursor: "pointer",
          }),
          option: (base, state) => {
            return {
              ...base,
              ":active": { backgroundColor: lightGrayDisabled },
              fontSize: "14px",
              margin: "3px 0px",
              borderRadius: "24px",
              backgroundColor: state.isDisabled ? lightGrayDisabled : lightGray,
              cursor: state.isDisabled ? "not-allowed" : "pointer",
            };
          },
          menu: (base) => {
            return {
              ...base,
              padding: "3px 9px",
              boxShadow: "none",
              borderRadius: "24px",
              backgroundColor: lightGray,
              overflow: "hidden",
              top: "none",
              bottom: "100%",
            };
          },
        }}
        isSearchable={false}
        options={options.map((option) =>
          option.value === selectedOption.value
            ? { ...option, isDisabled: true }
            : option
        )}
        value={selectedOption}
        onChange={(selectedOption) => onChange(selectedOption)}
      />
    </div>
  );
}

export default Dropdown;
