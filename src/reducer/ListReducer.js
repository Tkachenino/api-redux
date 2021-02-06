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
      const itemWihLoader = items.map(i => ({...i, loading: false}))
      return {...store, items: itemWihLoader, loading: false}
    }
    case FETCH_LIST_ITEM_FAILURE: {
      return {...store, loading: false, error: true}
    }
    case DELETE_LIST_ITEM_REQUEST: {
      const { id } = action.payload;
      return {...store, items: [...store.items.map((i) => {
        if (i.id === id) {
         return {...i, loading: true}
        } else {
          return i
        }
        
      })], loading: false, error: false}
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