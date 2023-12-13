import { useState } from "react";
import W12MHeader from "./W12MHeader";
import FormSection from "./form_section";

const W12MForm = () => {
  return (
    <section className="w12MForm">
      <W12MHeader />
      <form className="form" action="">
        <FormSection
          label="Species Name"
          name="speciesname"
          required={true}
          placeholder="eg: Human"
          validation="Must be between 3 and 23 characters. No numbers or special characters allowed!"
          pattern="^[a-zA-Z]{3,23}$"
        ></FormSection>
        <FormSection
          label="Planet Name"
          name="planetname"
          required={true}
          placeholder="eg: Earth"
          validation="Must be between 2 and 49 characters. Numbers are allowed, but no special characters"
          pattern="^[a-zA-Z0-9]{2,49}$"
        ></FormSection>
        <FormSection
          label="Number of beings"
          name="beingsnumber"
          required={true}
          type="number"
          validation="Numbers ONLY. Must be at least 1,000,000,000"
          min={1000000000}
          pattern="^[1-9]\d{9,}$"
          placeholder="0"
        ></FormSection>
        <FormSection
          label="What is 2 + 2"
          name="question"
          tag="select"
          options={["4", "Not 4"]}
          placeholder="Please Select"
          required={true}
          validation="Choose the correct answer"
          pattern="4"
        ></FormSection>
        <FormSection
          label="Reasons for sparing?"
          name="sparingreason"
          tag="textarea"
          placeholder="Must be between 17 and 153 characters"
          required={true}
          min={17}
          max={153}
        ></FormSection>
      </form>
    </section>
  );
};

export default W12MForm;
