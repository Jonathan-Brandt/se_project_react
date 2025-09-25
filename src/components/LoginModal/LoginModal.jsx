import ModalWithForm from "../ModalWithForm/ModalWithForm";

import { useState, useEffect } from "react";
import "./LoginModal.css";

export default function LoginModal({
  closeModal,
  isOpen,
  onLoginModalSubmit,
  onSecondButtonClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setEmail("");
    }
  }, [isOpen]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginModalSubmit({ email, password });
  };

  const switchModal = () => {
    onSecondButtonClick();
  };

  return (
    <ModalWithForm
      title="Login"
      buttonText="Login"
      secondButtonText={"or Sign up"}
      closeModal={closeModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      switchModal={switchModal}
      onSecondButtonClick={onSecondButtonClick}
    >
      <label htmlFor="Email" className="modal__label">
        Email{" "}
        <input
          type="Email"
          className="modal__input"
          id="email"
          placeholder="email"
          required
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="Password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="password"
          required
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
    </ModalWithForm>
  );
}
