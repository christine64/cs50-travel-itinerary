import React from "react";
import { useForm } from "react-hook-form";

export const ItineraryForm = ({ submitFunc }) => {
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = data => { 
    submitFunc(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <input name="location" defaultValue="" ref={register({ required: true })} />
      </label>

      <label>
        <input name="activity" defaultValue="" ref={register({ required: true })} />
      </label>

      <label>
        <input name="address" defaultValue="" ref={register({ required: true })} />
      </label>

      <label>
        <input name="time" defaultValue="" ref={register({ required: true })} />
      </label>

      { errors.location && <span>This field is required</span> }
      { errors.activity && <span>This field is required</span> }
      
      <input type="submit" />
    </form>
  );
};
