import {
  FETCH_LIST_ITEM_REQUEST,
  FETCH_LIST_ITEM_SUCCESS,
  FETCH_LIST_ITEM_FAILURE,
  DELETE_LIST_ITEM_REQUEST,
  DELETE_LIST_ITEM_SUCCESS,
  DELETE_LIST_ITEM_FAILURE
} from '../action/ActionTypes'

const initialStore = {
  loading: true,
  error: false,
  items: []
}

export const listReducer = (store = initialStore, action) => {
  switch (action.type) {
    case FETCH_LIST_ITEM_REQUEST: {
      return {...store, loading: true, error: false}
    }
    case FETCH_LIST_ITEM_SUCCESS: {
      const { items } = action.payload;
      return {...store, items, loading: false}
    }
    case FETCH_LIST_ITEM_FAILURE: {
      return {...store, loading: false, error: true}
    }
    case DELETE_LIST_ITEM_REQUEST: {
      return {...store, loading: true, error: false}
    }
    case DELETE_LIST_ITEM_SUCCESS: {
      const { id } = action.payload;
      return {...store, items: [...store.items.filter(i => i.id !== id)], loading: false}
    }
    case DELETE_LIST_ITEM_FAILURE: {
      return {...store, loading: false, error: true}
    }
    default: {
      return store;
    }
  }
}