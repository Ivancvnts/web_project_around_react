function EditAvatar() {
  return (
    <form className="popup__form" id="edit-avatar-form">
      <label className="popup__field">
        <input
          className="popup__input popup__input-type-avatar"
          name="avatar"
          id="avatar"
          required
          type="text"
        />
        <span className="popup__error" id="avatar-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}

export default EditAvatar;
