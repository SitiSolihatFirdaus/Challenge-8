import { store } from "../store";
import axiosClient from "../../api/axiosClient";
import apiConfig from "../../api/apiConfig";

export const getPopularMovies = () => async (dispatch) => {
  const response = await axiosClient.get(
    `/discover/movie?sort_by=popularity.desc&api_key=0badcefffc03af1c8584bd67dfc87507&page=1`
  );
  dispatch({ type: store.GET_MOVIES, payload: response.data.results });
};

export const getMovies = (page, catalog) => async (dispatch) => {
  const response = await axiosClient.get(
    `/discover/${catalog}?sort_by=popularity.desc&api_key=0badcefffc03af1c8584bd67dfc87507&page=${page}`
  );
  dispatch({ type: store.GET_MOVIES, payload: response.data.results });
};

export const SearchMovies = (search) => async (dispatch) => {
  const response = await axiosClient.get(
    `/search/movie?&api_key=0badcefffc03af1c8584bd67dfc87507&query=${search}`
  );
  dispatch({ type: store.SEARCH_MOVIES, payload: response.data.results });
};