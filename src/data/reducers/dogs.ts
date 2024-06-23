/* eslint-disable no-param-reassign */
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from '../../actions';

export type DogType = {
  id: number;
  name: string;
  temperament: string;
  life_span: string;
  origin: string;
  breed_group: string;
}

const initialState: {
  data: DogType[],
  isLoading: boolean,
  error: any,
} = {
  data: [],
  isLoading: false,
  error: null
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
