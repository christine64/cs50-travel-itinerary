import React, { useState } from "react";
import { useForm } from "react-hook-form";

import axios from 'axios';

import { checkLocationExists } from '../../helpers/checkLocation';

export const CountryForm = ({ submitFunc, locations }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [error, setError] = useState('');

  const onSubmit = data => {
    if (!checkLocationExists(locations, data.name)) {
      axios.post('http://localhost:8000/api/itineraries/', data)
      .then((response) => response.statusText === 'Created')
      .catch(() => setError('There was an error adding this country to list'));
    } else {
      setError('This location already exists');
      return;
    }

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
      { error }
      
      <input type="submit" />
    </form>
  );
};
