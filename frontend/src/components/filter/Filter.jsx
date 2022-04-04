import "./filter.css";
import TextField from "@mui/material/TextField";
import PlaceIcon from "@mui/icons-material/Place";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import useStore from "../../store";
import { pinRemainingSelector } from "../../store/selector";

const Filter = ({ mapRef, isShow }) => {
  const pinList = useStore(pinRemainingSelector);
  const setFilterCategory = useStore((state) => state.setFilterCategory);
  const setFilterRating = useStore((state) => state.setFilterRating);
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState(0);
  const searchChangeHandler = (e) => {
    setSearch(e.target.value);
    setFilterCategory(e.target.value);
  };

  const ratingChangeHandler = (e) => {
    setRating(e.target.value);
    setFilterRating(e.target.value);
  };

  const pinItemClickHandler = (lat, long) => {
    mapRef.current?.flyTo({ center: [long, lat], zoom: 10, duration: 2000 });
  };

  const cssClass = ["filter", isShow ? "showModal" : "hideModal"];

  return (
    <div className={cssClass.join(" ")}>
      <h2>Filter</h2>
      <div className="filter-group">
        <label htmlFor="outlined-size-small" className="filter-label">
          Search
        </label>
        <TextField
          value={search}
          onChange={searchChangeHandler}
          hiddenlabel="true"
          id="outlined-size-small"
          variant="outlined"
          fullWidth
          size="small"
          placeholder="Enter place you want to see..."
          InputProps={{
            endAdornment: <PlaceIcon htmlColor="tomato" />,
          }}
          style={{ marginBottom: "10px" }}
        />
        <label htmlFor="" className="filter-label">
          Filter by rating
        </label>
        <Select
          id="demo-simple-select"
          fullWidth
          size="small"
          value={rating}
          onChange={ratingChangeHandler}
          hiddenlabel="true"
        >
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </div>
      <hr className="hr" />
      <div className="pins-group">
        {pinList.map((pin, index) => (
          <div className="pin-item" key={pin._id} onClick={() => pinItemClickHandler(pin.lat, pin.long)}>
            <PlaceIcon htmlColor="tomato" />
            <h3 className="place-filter">{pin.title}</h3>
            <div className="stars starts-filter">{Array(pin.rating).fill(<StarIcon className="star" />)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
