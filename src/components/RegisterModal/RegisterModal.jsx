import ModalWithForm from "../ModalWithForm/ModalWithForm";

import { useState, useEffect } from "react";
import "./RegisterModal.css";

export default function RegisterModal({
  closeModal,
  isOpen,
  onRegisterModalSubmit,
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setPassword("");
      setEmail("");
    }
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleImgChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterModalSubmit({ name, imageUrl, email, password });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      closeModal={closeModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="Email" className="modal__label">
        Email{" "}
        <input
          type="Email"
          className="modal__input"
          id="name"
          placeholder="name"
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
          id="name"
          placeholder="name"
          required
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="name"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Avatar Image Url{" "}
        <input
          type="URL"
          className="modal__input"
          id="imageURL"
          placeholder="Image URL"
          required
          onChange={handleImgChange}
          value={imageUrl}
        />
      </label>
    </ModalWithForm>
  );
}
