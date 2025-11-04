import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../MainPage/MainPage";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import { defaultClothingItems } from "../../utils/constants";
import { getItems } from "../../utils/API";
import { addCard } from "../../utils/API";
import { deleteCard } from "../../utils/API";
import { getUserData } from "../../utils/API";
import { updateProfileData } from "../../utils/API";
import { addCardLike } from "../../utils/API";
import { removeCardLike } from "../../utils/API";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { signup, signin } from "../../utils/Auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 99, C: 99 },
    city: "",
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return getUserData(res.token);
      })
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
        closeModal();
      })
      .catch(console.error);
  };

  const handleRegistration = (userData) => {
    signup({
      name: userData.name,
      avatar: userData.avatar,
      email: userData.email,
      password: userData.password,
    })
      .then((res) => {
        handleLogin({ email: userData.email, password: userData.password });
        localStorage.setItem("jwt", res.token);
        return getUserData.apply(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeModal();
      })
      .catch(console.error);
  };

  const handleEditSubmit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateProfileData({ token, name, avatar }).then(({ name, avatar }) => {
      setCurrentUser((prev) => ({ ...prev, name, avatar }));
    });
    closeModal();
  };

  const onAddButtonClick = () => {
    setActiveModal("add-garment");
  };

  const onCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onLoginClick = () => {
    setActiveModal("login-user");
  };

  const onEditClick = () => {
    setActiveModal("edit-user");
  };

  const onSignupClick = () => {
    setActiveModal("new-user");
  };

  const onSignoutClick = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("jwt");
  };

  const onSecondButtonClick = () => {
    if (activeModal === "login-user") {
      setActiveModal("new-user");
    }
    if (activeModal === "new-user") {
      setActiveModal("login-user");
    }
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    addCard({ name, imageUrl, weather }, token)
      .then((newCard) => {
        setClothingItems([newCard, ...clothingItems]);
        closeModal();
      })
      .catch((error) => console.error("Error adding card:", error));
  };

  function handleDeleteItem(_id) {
    const token = localStorage.getItem("jwt");
    deleteCard(selectedCard._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        closeModal();
      })
      .catch((error) => console.error("Error deleting card:", error));
  }

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

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

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      getUserData(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              onAddButtonClick={onAddButtonClick}
              onLoginClick={onLoginClick}
              onSignupClick={onSignupClick}
              currentUser={currentUser}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={onCardClick}
                    onCardLike={handleCardLike}
                    clothingItems={clothingItems}
                    isLoggedIn={isLoggedIn}
                  />
                }
              ></Route>

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={onCardClick}
                      onAddButtonClick={onAddButtonClick}
                      currentUser={currentUser}
                      onEditClick={onEditClick}
                      onSignoutClick={onSignoutClick}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
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
            selectedCard={selectedCard}
            currentUser={currentUser}
            isOpen={activeModal === "preview"}
          />
          <LoginModal
            activeModal={activeModal}
            closeModal={closeModal}
            loginClick={onLoginClick}
            signupClick={onSignupClick}
            onLoginModalSubmit={handleLogin}
            onSecondButtonClick={onSecondButtonClick}
            isOpen={activeModal === "login-user"}
          />
          <RegisterModal
            activeModal={activeModal}
            closeModal={closeModal}
            signupClick={onSignupClick}
            onRegisterModalSubmit={handleRegistration}
            onSecondButtonClick={onSecondButtonClick}
            isOpen={activeModal === "new-user"}
          />
          <EditProfileModal
            closeModal={closeModal}
            onEditClick={onEditClick}
            onEditModalSubmit={handleEditSubmit}
            isOpen={activeModal === "edit-user"}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
