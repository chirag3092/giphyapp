import { GIPHY_SET_APPEND_DATA_STATE, GIPHY_SET_LOADING_FULL_STATE, GIPHY_SET_LOADING_SCROLL_STATE } from "./giphy.types";

const initialState = {
  loadingType: 'none',
  giphyList: {},
  paginator: {},
}
const giphyReducer = (state = initialState, action: any): any => {
  switch(action.type) {
    case GIPHY_SET_LOADING_FULL_STATE: {
      return {
        ...initialState,
        loadingType: 'full',
      };
    }
    case GIPHY_SET_LOADING_SCROLL_STATE: {
      return {
        ...state,
        loadingType: 'scroll',
      };
    }
    case GIPHY_SET_APPEND_DATA_STATE: {
      const { giphyList, paginator } = action.payload;
      return {
        ...state,
        loadingType: 'none',
        giphyList: {
          ...state.giphyList,
          ...giphyList,
        },
        paginator,
      };
    }
    default: 
      return state;    
  }
  
};

export default giphyReducer;