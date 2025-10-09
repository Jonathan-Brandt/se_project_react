import ModalWithForm from "../ModalWithForm/ModalWithForm";

import { useState, useEffect } from "react";

export default function EditProfileModal({
  closeModal,
  isOpen,
  onEditModalSubmit,
}) {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setAvatar("");
    }
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImgChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditModalSubmit({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Finalize changes"
      closeModal={closeModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
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
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}
