import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = { gmail: "", name: "", age: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})$/i;
    if (!values.name) {
      errors.name = "Username is required";
    }
    if (!values.gmail) {
      errors.gmail = "Gmail is required";
    } else if (!regex.test(values.gmail)) {
      errors.gmail = "This is not a valid email format";
    }
    if (!values.age) {
      errors.age = "Age is required";
    }
    return errors;
  };

  return (
    <>
      <div className="container">
        <div className="container-box">
          {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className="signin">Sign-In Successfully</div> ): (<pre>{JSON.stringify(formValues, undefined, 2)}</pre>)}
          
          <form className="form" onSubmit={handleSubmit}>
            <h1>Login Form</h1>
            <div className="gmail">
              <label>Gmail: </label>
              <input
                id="input-gmail"
                name="gmail"
                type="text"
                placeholder="Gmail"
                value={formValues.gmail}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.gmail}</p>
            <div className="name">
              <label>UserName: </label>
              <input
                id="input-name"
                name="name"
                type="text"
                placeholder="Username"
                value={formValues.name}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.name}</p>
            <div className="age">
              <label>Age: </label>
              <input
                id="input-age"
                name="age"
                type="number"
                placeholder="age"
                value={formValues.age}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.age}</p>
            <button id="button">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
