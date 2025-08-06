import Select from "react-select";

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
            borderRadius: "24px",
            boxShadow: "none",
            backgroundColor: "#eef0f3",
            cursor: "pointer",
          }),
          option: (base, state) => {
            return {
              ...base,
              ":active": { backgroundColor: "#eef0f359" },
              fontSize: "14px",
              margin: "3px 0px",
              borderRadius: "24px",
              backgroundColor: state.isDisabled ? "#eef0f359" : "#eef0f3",
              cursor: state.isDisabled ? "not-allowed" : "pointer",
            };
          },
          menu: (base) => {
            return {
              ...base,
              padding: "3px 9px",
              borderRadius: "24px",
              boxShadow: "none",
              backgroundColor: "#eef0f3",
              overflow: "hidden",
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
