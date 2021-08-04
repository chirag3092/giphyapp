import { takeEvery, put, call } from "redux-saga/effects";
import { WatcherSaga } from "../rootSaga";
import { getTrandingData, getSearchData } from "./giphy.api";
import { GIPHY_SET_LOADING_FULL_STATE, GIPHY_FETCH_DATA_EFFECT, GIPHY_SEARCH_DATA_EFFECT, GIPHY_SET_APPEND_DATA_STATE, GIPHY_SET_LOADING_SCROLL_STATE } from "./giphy.types";

export type GetGiphyData = {
  type: string;
  payload: {
    offset: number;
  }
}

function* getGiphyData(action: GetGiphyData) {
  const { offset  } = action.payload;
  
  if(offset === 0) {
    yield put({ type: GIPHY_SET_LOADING_FULL_STATE });  
  } else {
    yield put({ type: GIPHY_SET_LOADING_SCROLL_STATE });  
  }

  const requestPayload = { offset: offset || 0 };
  const { response } = yield call(getTrandingData, requestPayload);
  yield put({ type: GIPHY_SET_APPEND_DATA_STATE, payload: { giphyList: response.data, paginator: response.pagination } });
}

export type SearchGiphyData = {
  type: string;
    payload: {
      offset: number;
      searchTerm: string;
    }
}

function* searchGiphyData(action: SearchGiphyData) {
  const { offset, searchTerm } = action.payload;
  
  if(offset === 0) {
    yield put({ type: GIPHY_SET_LOADING_FULL_STATE });  
  } else {
    yield put({ type: GIPHY_SET_LOADING_SCROLL_STATE });  
  }

  const requestPayload = { offset: offset || 0, searchTerm };
  const { response } = yield call(getSearchData, requestPayload);
  yield put({ type: GIPHY_SET_APPEND_DATA_STATE, payload: { giphyList: response.data, paginator: response.pagination } });
}

function* watchGiphy(): WatcherSaga {
  yield takeEvery(GIPHY_FETCH_DATA_EFFECT, getGiphyData);
  yield takeEvery(GIPHY_SEARCH_DATA_EFFECT, searchGiphyData);
}

export { getGiphyData };
export default watchGiphy;