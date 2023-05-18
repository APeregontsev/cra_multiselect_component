import { useEffect, useState } from "react";
import style from "./style.module.css";
import classNames from "classnames";

export type SelectOption = {
  label: string;
  value: any;
};

type SingleSelectProps = {
  multiple?: false;
  value: SelectOption | undefined;
  onChange: (value: SelectOption | undefined) => void;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

// main function

const Select = ({
  multiple,
  value,
  onChange,
  options,
}: SelectProps) => {
  // states
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // inner functions
  function clearOptions() {
    multiple
      ? onChange([{ label: "Press to choose", value: 0 }])
      : onChange({ label: "Press to choose", value: 0 });
  }

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value.includes(option)) {
        let newValue = value.filter(
          (item) => item !== option && item.value !== 0
        );

        if (newValue.length === 0) {
          onChange([{ label: "Press to choose", value: 0 }]);
        } else {
          onChange([...newValue]);
        }
      } else {
        let newValue = value.filter((item) => item.value !== 0);

        onChange([...newValue, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option === value;
  }

  // lets reset highlighted item to first

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      tabIndex={0}
      className={style.container}
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
    >
      <span className={style.value}>
        {multiple
          ? value.map((selectedOption) => {
              if (selectedOption.value === 0) {
                return selectedOption.label;
              }

              return (
                <button
                  className={style["selected-option-badge"]}
                  key={selectedOption.value}
                  onClick={(event) => {
                    event.stopPropagation();
                    selectOption(selectedOption);
                  }}
                >
                  {selectedOption.label}
                  <span className={style["clear-btn"]}>&times;</span>
                </button>
              );
            })
          : value?.label}
      </span>
      <button
        className={style["clear-btn"]}
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
      >
        &times;
      </button>
      <div className={style.divider}></div>
      <div className={style.caret}></div>

      <ul className={`${style.options} ${isOpen ? style.show : ""}`}>
        {options.map((option, index) => (
          <li
            key={option.label}
            // стили
            className={classNames(style.option, {
              [style.selected]: isOptionSelected(option),
              [style.highlighted]: index === highlightedIndex,
            })}
            // стили
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
