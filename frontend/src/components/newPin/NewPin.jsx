import "./newpin.css";
import { useState } from "react";

const NewPin = ({ onAddNewPin }) => {
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNewPin(title, desc, rating);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input placeholder="Enter a title" onChange={(e) => setTitle(e.target.value)} />
        <label>Review</label>
        <textarea placeholder="Say us something about this place" onChange={(e) => setDesc(e.target.value)}></textarea>
        <label>Rating</label>
        <select onChange={(e) => setRating(e.target.value)}>
          <option value="1" key="1">
            1
          </option>
          <option value="2" key="2">
            2
          </option>
          <option value="3" key="3">
            3
          </option>
          <option value="4" key="4">
            4
          </option>
          <option value="5" key="5">
            5
          </option>
        </select>
        <button className="submitButton" type="submit">
          Add Pin
        </button>
      </form>
    </div>
  );
};

export default NewPin;
