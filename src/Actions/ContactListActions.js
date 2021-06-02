export const getContacts = (list) => {
  return {
    type: "LIST_LOADED",
    payload: list,
  };
};

export const onAddContact = (newContacts) => {
  return {
    type: "ADD_CONTACT",
    payload: newContacts,
  };
};
export const onDeleteContact = (contact) => {
  return {
    type: "DELETE_CONTACT",
    payload: contact,
  };
};
