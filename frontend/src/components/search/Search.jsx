import "./search.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import axios from "axios";
import { REACT_APP_MAPBOX } from "../../shared";

const Search = ({ mapRef }) => {
  const [searchResult, setSearchResult] = useState([]);

  const changeSearchHandler = async (e) => {
    if (e.target.value.length > 0) {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?country=vn&proximity=ip&types=place%2Cpostcode%2Caddress%2Cdistrict%2Ccountry%2Cregion%2Clocality%2Cneighborhood%2Cpoi&access_token=${REACT_APP_MAPBOX}`
      );
      setSearchResult(res.data.features);
    } else {
      setSearchResult([]);
    }
  };

  const itemClickHandler = (center) => {
    const [long, lat] = center;
    mapRef.current?.flyTo({ center: [long, lat], zoom: 10, duration: 2000 });
  };

  return (
    <div className="search">
      <TextField
        id="outlined-basic"
        hiddenlabel="true"
        variant="outlined"
        fullWidth
        className="search-input"
        size="small"
        placeholder="Search..."
        InputProps={{
          endAdornment: <SearchIcon htmlColor="inherit" />,
        }}
        focused={false}
        onChange={changeSearchHandler}
      />
      <div className="search-result">
        {searchResult.length > 0 &&
          searchResult.map((item) => (
            <div className="result-item" key={item.id} onClick={() => itemClickHandler(item.center)}>
              <h3 className="result-name">{item.text}</h3>
              <p className="result-desc">{item.place_name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
