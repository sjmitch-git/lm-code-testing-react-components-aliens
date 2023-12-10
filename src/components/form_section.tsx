import React, { useState, useRef } from "react";

interface Props {
  label: string;
  name: string;
  required?: boolean;
  type?: "text" | "number";
  tag?: "input" | "select" | "textarea";
  placeholder?: string;
  options?: string[];
  validation?: string;
  pattern?: string;
  min?: number;
  max?: number;
  id?: string;
}

const FormSection: React.FC<Props> = ({
  label,
  required = false,
  type = "text",
  tag = "input",
  options,
  placeholder,
  validation,
  pattern,
  min,
  max,
  name,
  id,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    if (pattern) validate(event.target.value, pattern, selectRef.current);
  };

  const validate = (value: string, pattern: string, element: any) => {
    if (value !== pattern) element.classList.add("error");
    else element.classList.remove("error");
  };

  return (
    <section>
      <label>
        <span>{label}</span>
        <div>
          {tag === "select" ? (
            <select
              name={name}
              id={id || name}
              value={selectedOption}
              onChange={handleSelectChange}
              required={required}
              ref={selectRef}
            >
              <option value="" disabled hidden>
                {placeholder}
              </option>
              {options?.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
          ) : tag === "textarea" ? (
            <textarea
              placeholder={placeholder}
              rows={4}
              minLength={min}
              maxLength={max}
              name={name}
              id={id || name}
              required={required}
            />
          ) : (
            <input
              required={required}
              type={type}
              placeholder={placeholder}
              pattern={pattern}
              min={min}
              name={name}
              id={id || name}
            />
          )}
          {validation && <p className="hint">{validation}</p>}
        </div>
      </label>
    </section>
  );
};

export default FormSection;
