import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

import { checkLocationExists } from '../../helpers/checkLocation';

const convertDate = (date) => {
  return date;
}

export const ItineraryForm = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [error, setError] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios(`http://localhost:8000/api/locations/`);

    setLocations(result.data);
  };

  const submitItinerary = (data) => {
    data.owner = 2;

    if (!checkLocationExists(locations, data.location)) {
      axios.post('http://localhost:8000/api/itineraries/', data)
      .then((response) => response.statusText === 'Created')
      .catch(() => setError('There was an error creating your itinerary'));
    } else {
      setError('Please add location first');
    }

    // date time format: 2021-09-04 06:00
  }

  const onSubmit = data => { 
    submitItinerary(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="location">Location</label>
      <input name="location" defaultValue="" ref={register({ required: true })} />

      <label htmlFor="activity">Activity</label>
      <input name="activity" defaultValue="" ref={register} />

      <label htmlFor="start_time">Start Time</label>
      {/* timepicker */}
      <input name="start_time" defaultValue="" ref={register} />

      <label htmlFor="end_time">End Time</label>
      {/* timepicker */}
      <input name="end_time" defaultValue="" ref={register} />

      { errors.location && <span>This field is required</span> }
      { error !== '' && error === 'Please add location first' ? <a href="/locations">Please add a location first</a> : error }
      <input type="submit" />
    </form>
  );
};
