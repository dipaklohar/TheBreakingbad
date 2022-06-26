import { createStore, combineReducers } from 'redux';
import saveFavouritDetailAction from './reducer/saveFavouritDetailAction';

const rootReducer = combineReducers({
    favouritList: saveFavouritDetailAction
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;