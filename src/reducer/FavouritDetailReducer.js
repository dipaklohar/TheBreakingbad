const initialState = {
  favouritList: []
};

const favouriteReducer = (state = initialState, action) => {
  // console.log(state, action);

  const filteredPeople = state.favouritList.filter((item) => item.char_id !== action.payload.char_id);


  switch (action.type) {
    case "SAVE_FAVOURITE_DETAIL":
      return {
        ...state,
        favouritList: state.favouritList.concat(action.payload)
      };
    case "REMOVE_FAVOURITE_DETAIL":
      return {
        ...state,
        favouritList: filteredPeople
      };
    default:
      return state;
  }
}

export default favouriteReducer;