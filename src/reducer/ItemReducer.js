import {
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
  CHANGE_ITEM_FIELD,
  CANCEL_CHANGE_ITEM,
  SAVE_CHANGE_ITEM_REQUEST,
  SAVE_CHANGE_ITEM_SUCCESS,
  SAVE_CHANGE_ITEM_FAILURE
} from '../action/ActionTypes'

const initialStore = {
  loading: true,
  miniLoading: false,
  error: false,
  item: {
    name: "",
    price: 0,
    content: ""
  }
}

export const ItemReducer = (store = initialStore, action) => {
  switch (action.type) {
    case FETCH_ITEM_REQUEST: {
      return {...store, loading: true, error: false}
    }
    case FETCH_ITEM_SUCCESS: {
      const { item } = action.payload;
      return {...store, item, loading: false}
    }
    case FETCH_ITEM_FAILURE: {
      return {...store, loading: false, error: true}
    }  
    case CHANGE_ITEM_FIELD: {
      const {name, value} = action.payload;
      return {...store, item: {...store.item, [name]: value}}
    }
    case CANCEL_CHANGE_ITEM: {
      return initialStore;
    }
    case SAVE_CHANGE_ITEM_REQUEST: {
      return {...store, miniLoading: true, error: false}
    }
    case SAVE_CHANGE_ITEM_SUCCESS: {
      return  {...store, miniLoading: false}
    }
    case SAVE_CHANGE_ITEM_FAILURE: {
      return {...store, miniLoading: false, error: true};
    }
    default: {
      return store;
    }
  }
}