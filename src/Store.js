import { createStore, combineReducers } from 'redux';
import FavouritDetailReducer from './reducer/FavouritDetailReducer';

const rootReducer = combineReducers({
    favouritList: FavouritDetailReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;