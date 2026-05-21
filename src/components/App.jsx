import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

function App() {
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });

  useEffect(() => {
    api
      .getUserInfo()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getCardsList()
      .then((result) => {
        setCards(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya les has dado like
    const isLiked = card.isLiked;

    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
    await api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((err) => console.error(err));
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then((newCard) => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
        handleClosePopup();
      })
      .catch((err) => console.error(err));
  }

  const handleUpdateUser = (data) => {
    (async () => {
      await api.setUserInfo(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  const handleUpdateAvatar = (data) => {
    return api.setAvatar(data).then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    });
  };

  const handleAddPlaceSubmit = (data) => {
    return api.addCard(data).then((newCard) => {
      setCards((prevCards) => [newCard, ...prevCards]);

      handleClosePopup();
    });
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <>
      <CurrentUserContext.Provider
        value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
      >
        <div className="page__content">
          <Header></Header>
          <Main
            cards={cards}
            setCards={setCards}
            onAddPlaceSubmit={handleAddPlaceSubmit}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            popup={popup}
            onPopupOpen={handleOpenPopup}
            onPopupClose={handleClosePopup}
          ></Main>
          <Footer></Footer>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
