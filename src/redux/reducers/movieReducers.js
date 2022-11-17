import { store } from "../store";

const initialaiz = {
  products: [],
};

export const moviesReducer = (state = initialaiz, action) => {
  switch (action.type) {
    case store.GET_MOVIES: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case store.SEARCH_MOVIES: {
      return {
        ...state,
        products: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};