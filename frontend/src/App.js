import { useEffect, useRef, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as shared from "./shared";
import RoomIcon from "@mui/icons-material/Room";
import axios from "axios";
import { apiUrl } from "./shared";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Card from "./components/card/Card";
import NewPin from "./components/newPin/NewPin";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import "./app.css";
import Filter from "./components/filter/Filter";
import useStore from "./store";
import Search from "./components/search/Search";

function App() {
  const defaultUser = JSON.parse(localStorage.getItem("user"));
  const [currentUser, setCurrentUser] = useState(defaultUser || null);
  const setPins = useStore((state) => state.setPins);
  const pins = useStore((state) => state.pins);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 10.66667,
    longitude: 106.16667,
    zoom: 8,
  });
  const mapRef = useRef();

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get(`${apiUrl}/pins`);
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, [setPins]);

  const handleMarketClick = (_id, lat, long) => {
    setCurrentPlaceId(_id);
    setViewport((preState) => ({ ...preState, latitude: lat, longitude: long }));
    mapRef.current?.flyTo({ center: [long, lat], zoom: 10, duration: 2000 });
  };

  const handleAddClick = (e) => {
    const { lng: long, lat } = e.lngLat;
    setNewPlace({
      lat,
      long,
    });
    mapRef.current?.flyTo({ center: [long, lat], zoom: 10, duration: 2000 });
  };

  const addNewPinHandler = async (title, desc, rating) => {
    const newPin = {
      username: currentUser.username,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post(`${apiUrl}/pins`, newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };
  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={{ ...viewport }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/vovantrong/cl1dmjdcf009815unvcocnuc6"
        onMove={(viewport) => {
          setViewport(viewport.viewState);
        }}
        mapboxAccessToken={shared.REACT_APP_MAPBOX}
        onDblClick={handleAddClick}
        doubleClickZoom={false}
      >
        {pins.map((pin) => (
          <>
            <Marker
              longitude={pin.long}
              latitude={pin.lat}
              anchor="bottom"
              key={pin._id + Math.floor(Math.random() * 10000)}
            >
              <RoomIcon
                style={{
                  fontSize: viewport.zoom * 7,
                  color: currentUser?.username === pin.username ? "tomato" : "slateblue",
                }}
                onClick={() => handleMarketClick(pin._id, pin.lat, pin.long)}
              />
            </Marker>
            {pin._id === currentPlaceId && (
              <Popup
                key={pin._id}
                latitude={pin.lat}
                longitude={pin.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => {
                  setCurrentPlaceId(null);
                }}
                anchor="left"
              >
                <Card
                  title={pin.title}
                  desc={pin.desc}
                  rating={pin.rating}
                  username={pin.username}
                  createdAt={pin.createdAt}
                />
              </Popup>
            )}
          </>
        ))}
        {newPlace && currentUser && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            anchor="bottom"
            onClose={() => setNewPlace(null)}
            style={{ width: "270px", height: "250px" }}
            maxWidth={500}
          >
            <NewPin onAddNewPin={addNewPinHandler} />
          </Popup>
        )}
        {newPlace && !currentUser && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            anchor="bottom"
            onClose={() => setNewPlace(null)}
            style={{ width: "270px", height: "250px" }}
            maxWidth={500}
          >
            You need to login
          </Popup>
        )}
        {currentUser ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button
              className="button register"
              onClick={() => {
                setShowRegister(true);
              }}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} />}
        <FilterAltIcon
          className="filterIcon"
          fontSize="large"
          onClick={() => {
            setShowFilter(!showFilter);
          }}
        />
        <Filter mapRef={mapRef} isShow={showFilter} />
        <Search mapRef={mapRef} />
      </Map>
    </>
  );
}

export default App;
