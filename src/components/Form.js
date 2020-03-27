import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name should be at least 2 characters")
    .required("Name is a required"),
  olives: yup.boolean(),
  bacon: yup.boolean(),
  sausage: yup.boolean(),
  pepperoni: yup.boolean(),
  size: yup.string(),
  special: yup.string()
});

export default function Form() {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [formState, setFormState] = useState({
    name: ""
  });

  const [errors, setErrors] = useState({
    name: ""
  });

  const [post, setPost] = useState([]);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const formSubmit = e => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(res => {
        setPost(res.data);
        console.log("success", post);

        setFormState({
          name: "",
          pepperoni: "",
          olives: "",
          bacon: "",
          sausage: "",
          size: "",
          special: ""
        });
      })
      .catch(err => console.log(err.response));
  };

  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.name === "name" ? e.target.value : e.target.value)

      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };

  const inputChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "name" ? e.target.value : e.target.value
    };

    validateChange(e);
    setFormState(newFormData);
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Your Name
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>

      <label htmlFor="special">
        Special instructions
        <textarea
          name="special"
          value={formState.special}
          onChange={inputChange}
        />
      </label>
      <label htmlFor="size">
        Pizza Size
        <select id="size" name="size" onChange={inputChange}>
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
          <option value="extra-large">extra-large</option>
        </select>
      </label>
      <label htmlFor="toppings" className="toppings">
        <input
          type="checkbox"
          name="pepperoni"
          checked={formState.pepperoni}
          onChange={inputChange}
        />
        pepperoni
      </label>
      <label htmlFor="toppings" className="toppings">
        <input
          type="checkbox"
          name="olives"
          checked={formState.olives}
          onChange={inputChange}
        />
        olives
      </label>
      <label htmlFor="toppings" className="toppings">
        <input
          type="checkbox"
          name="bacon"
          checked={formState.bacon}
          onChange={inputChange}
        />
        bacon
      </label>
      <label htmlFor="toppings" className="toppings">
        <input
          type="checkbox"
          name="sausage"
          checked={formState.sausage}
          onChange={inputChange}
        />
        sausage
      </label>

      <pre>{JSON.stringify(post, null, 2)}</pre>
      <button disabled={buttonDisabled}>Order</button>
    </form>
  );
}
