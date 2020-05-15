export const addChat = (fakeBD, dispatch) => {
  dispatch({
    type: "SET_CHATS",
    chats: fakeBD,
  });
};
export const setContacts = (contatos, dispatch) => {
  dispatch({
    type: "SET_CONTACTS",
    contatos,
  });
};

export const loadMessages = (mensagens, dispatch) => {
  dispatch({
    type: "SET_MESSAGES",
    mensagens,
  });
};
