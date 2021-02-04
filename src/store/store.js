import { createStore, combineReducers } from 'redux';
import {ItemReducer} from '../reducer/ItemReducer';
import {listReducer} from '../reducer/ListReducer';

const reducers = combineReducers({
  item: ItemReducer,
  list: listReducer
})

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;