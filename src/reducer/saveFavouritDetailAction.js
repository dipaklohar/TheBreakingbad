const initialState = {
  favouritList: []
};

const saveFavourite = (state = initialState, action) => {
  switch(action.type) {
    case "SAVE_FAVOURITE_DETAIL":
      return {
        ...state,
        favouritList: state.places.concat({
          key: Math.random(),
          value: action.payload
        })
      };
    default:
      return state;
  }
}

export default saveFavourite;