import React from "react";

interface FormActionProps {
  isFormValid: boolean;
  label?: string;
}

const FormAction: React.FC<FormActionProps> = ({ isFormValid, label = "Submit" }) => {
  return (
    <div className="form-action">
      {!isFormValid && <p>Please fill in all required fields correctly.</p>}

      <button className="btn" type="submit" disabled={!isFormValid}>
        {label}
      </button>
    </div>
  );
};

export default FormAction;
