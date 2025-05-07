import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../MainPage/MainPage";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { use } from "react";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 99, C: 99 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  const onAddButtonClick = () => {
    setActiveModal("add-garment");
  };

  const onCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            onAddButtonClick={onAddButtonClick}
            weatherData={weatherData}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main weatherData={weatherData} onCardClick={onCardClick} />
              }
            ></Route>
            <Route path="/profile" element={<p>PROFILE</p>}></Route>
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          closeModal={closeModal}
          isOpen={activeModal === "add-garment"}
        ></AddItemModal>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeModal={closeModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
