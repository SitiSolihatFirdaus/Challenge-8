import { combineReducers } from "redux";
import { moviesReducer } from "./movieReducers";

const rootReducer = combineReducers({
  Popularmovies: moviesReducer,
});

export default rootReducer;