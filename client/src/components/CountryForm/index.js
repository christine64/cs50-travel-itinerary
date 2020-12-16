import React from "react";
import { useForm } from "react-hook-form";

export const CountryForm = ({ submitFunc }) => {
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = data => {
    data.owner = 2;

    submitFunc(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <input name="name" defaultValue="" ref={register({ required: true })} />
      </label>

      { errors.name && <span>This field is required</span> }
      
      <input type="submit" />
    </form>
  );
};
