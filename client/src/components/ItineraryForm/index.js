import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

import { checkLocationExists } from '../../helpers/checkLocation';

const convertDate = (date) => {
  return date;
}

export const ItineraryForm = ({ updateItineraries }) => {
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
    data.location = Number(data.location)

    if (checkLocationExists(locations, data.location)) {
      axios.post('http://localhost:8000/api/itineraries/', data)
      .then((response) => {
        if (response.statusText === 'Created') {
          updateItineraries();
        }
      })
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
      <select ref={register} name="location">
        {
          locations.map((location, i) => <option key={i} value={location.id}>{location.name}</option>)
        }
      </select>

      <label htmlFor="activity">Activity</label>
      <input name="activity" defaultValue="" ref={register} />

      <label htmlFor="start_time">Start Time</label>
      {/* timepicker */}
      <input name="start_time" defaultValue="" ref={register} />

      <label htmlFor="end_time">End Time</label>
      {/* timepicker */}
      <input name="end_time" defaultValue="" ref={register} />

      { errors.location && <span>This field is required</span> }
      { error !== '' && error }
  
      <input className="itinerary-form-submission" type="submit" />
    </form>
  );
};
