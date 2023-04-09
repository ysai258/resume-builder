import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import AutocompleteField from "../AutoCompleteField/AutoCompleteFeild";
import { SKILLS } from "../../constants/constants";
import { addResume } from "../../actions/resumeAction";
import { useDispatch } from "react-redux";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.address) {
    errors.address = "Address is required";
  }
  if (!values.phone) {
    errors.phone = "Phone is required";
  }
  if (!values.education || !values.education.length) {
    errors.education = { _error: "Education is required" };
  } else {
    const educationErrors = [];
    values.education.forEach((educationItem, index) => {
      const educationItemErrors = {};
      if (!educationItem || !educationItem.institute) {
        educationItemErrors.institute = "Institute is required";
      }
      if (!educationItem || !educationItem.year) {
        educationItemErrors.year = "Year is required";
      }
      if (!educationItem || !educationItem.degree) {
        educationItemErrors.degree = "Degree is required";
      }
      educationErrors[index] = educationItemErrors;
    });
    if (educationErrors.length) {
      errors.education = educationErrors;
    }
  }
  if (!values.experience || !values.experience.length) {
    errors.experience = { _error: "Experience is required" };
  } else {
    const experienceErrors = [];
    values.experience.forEach((experienceItem, index) => {
      const experienceItemErrors = {};
      if (!experienceItem || !experienceItem.company) {
        experienceItemErrors.company = "Company is required";
      }
      if (!experienceItem || !experienceItem.year) {
        experienceItemErrors.year = "Year is required";
      }
      if (!experienceItem || !experienceItem.designation) {
        experienceItemErrors.designation = "Designation is required";
      }
      experienceErrors[index] = experienceItemErrors;
    });
    if (experienceErrors.length) {
      errors.experience = experienceErrors;
    }
  }
  return errors;
};


const ResumeForm = ({ handleSubmit }) => {
  const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className="form-group">
      <label htmlFor={input.name}>{label}</label>
      <input
        {...input}
        type={type}
        className={`form-control ${touched && error ? "is-invalid" : ""}`}
      />
      {touched && error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
  
  const renderDynamicList =
    (itemFields, addItemText, removeItemText, defaultValue) =>
    ({ meta: { error }, fields }) => {
      const addField = () => fields.push({ id: uuidv4(), ...defaultValue });
      if (fields.length == 0) {
        addField();
      }
      return (
        <div>
          {fields.map((item, index) => (
            <div
              className="row"
              key={index}
              style={{ alignItems: "center", marginLeft: "1vw" }}
            >
              {itemFields.map((field, ind) => (
                <div
                  className={`col-${ind == 0 ? 4 : ind == 1 ? 2 : 3}`}
                  key={field.name}
                >
                  <Field
                    name={`${item}.${field.name}`}
                    component={renderField}
                    type={field.type || "text"}
                    label={field.label}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
              {index > 0 && (
                <div className="form-group">
                  <label style={{ opacity: 0 }}>{"delete"}</label>
                  <button
                    className="form-control btn btn-danger"
                    onClick={() => fields.remove(index)}
                  >
                    {removeItemText}
                  </button>
                </div>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-success" onClick={addField}>
            {addItemText}
          </button>
          {error && <div className="text-danger">{error}</div>}
        </div>
      );
    };
  
  const educationFields = [
    { name: "institute", label: "Institute", placeholder: "Institute" },
    { name: "year", label: "Year", type: "number" },
    { name: "degree", label: "Degree", type: "text" },
  ];
  
  const experienceFields = [
    { name: "company", label: "Company", type: "text" },
    { name: "year", label: "Year", type: "number" },
    { name: "designation", label: "Designation", type: "text" },
  ];
  
  const renderEducationItem = renderDynamicList(
    educationFields,
    "Add Education",
    "Remove Education",
    { institute: "", year: "", degree: "" }
  );
  
  const renderExperienceItem = renderDynamicList(
    experienceFields,
    "Add Experience",
    "Remove Experience",
    { company: "", year: "", designation: "" }
  );
  
  const dispatch = useDispatch();
  const history = useHistory();
  const submit = (values) => {
    const resumeData = { id: uuidv4(), ...values };
    dispatch(addResume(resumeData));
    history.push("listResume");
  };

  const renderSkillItem = ({ fields, meta: { error } }) => {
    return (
      <div>
        <AutocompleteField
          data={SKILLS}
          placeholder="Add a skill"
          onAdd={(tag) => {
            fields.push(tag);
          }}
          onDelete={(index) => fields.remove(index)}
          initialTags={fields.getAll()}
        />
      </div>
    );
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit(submit)} action="/listResume">
        <div className="form-group">
          <Field name="name" component={renderField} label="Name" />
        </div>
        <div className="form-group">
          <Field name="email" component={renderField} label="Email" />
        </div>
        <div className="form-group">
          <Field name="address" component={renderField} label="Address" />
        </div>
        <div className="form-group">
          <Field name="phone" component={renderField} label="Phone" />
        </div>
        <div className="form-group">
          <label htmlFor="education">Education</label>
          <FieldArray name="education" component={renderEducationItem} />
        </div>
        <div className="form-group">
          <label htmlFor="experience">Experience</label>
          <FieldArray name="experience" component={renderExperienceItem} />
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills</label>
          <FieldArray name="skills" component={renderSkillItem} />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
export default reduxForm({
  form: "resumeForm",
  validate,
})(ResumeForm);
