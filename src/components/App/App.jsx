import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../MainPage/MainPage";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { use } from "react";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";

import { defaultClothingItems } from "../../utils/constants";
import { getItems } from "../../utils/API";
import { addCard } from "../../utils/API";
import { deleteCard } from "../../utils/API";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 99, C: 99 },
    city: "",
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
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

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    addCard({ name, imageUrl, weather })
      .then((newCard) => {
        setClothingItems([newCard, ...clothingItems]);
        closeModal();
      })
      .catch((error) => console.error("Error adding card:", error));
  };

  function handleDeleteItem(_id) {
    deleteCard(selectedCard._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        closeModal();
      })
      .catch((error) => console.error("Error deleting card:", error));
  }

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
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
                <Main
                  weatherData={weatherData}
                  onCardClick={onCardClick}
                  clothingItems={clothingItems}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={onCardClick}
                  onAddButtonClick={onAddButtonClick}
                />
              }
            ></Route>
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          closeModal={closeModal}
          isOpen={activeModal === "add-garment"}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        ></AddItemModal>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeModal={closeModal}
          handleDeleteItem={handleDeleteItem}
          isOpen={activeModal === "preview"}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
