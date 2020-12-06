import React from "react";
import { useForm } from "react-hook-form";

export const Form = ({ submitUrl }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => console.log(data);

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
