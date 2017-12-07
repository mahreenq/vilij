const needsURL = 'https://vilijserver.herokuapp.com/needs';

// action types

const GET_NEEDS_LOADING = 'GET_NEEDS_LOADING';
const GET_NEEDS_ERROR = 'GET_NEEDS_ERROR';
const GET_NEEDS = 'GET_NEEDS';
const SET_FILTER = 'SET_FILTER';

// action creators

const getNeedsLoading = () => {
  return {
    type: GET_NEEDS_LOADING
  };
};

const getNeedsError = error => {
  return {
    type: GET_NEEDS_ERROR,
    payload: error
  };
};

const getNeeds = needsData => {
  return {
    type: GET_NEEDS,
    payload: needsData
  };
};

const setFilter = filter => {
  return {
    type: SET_FILTER,
    payload: filter
  };
};

// helper functions

export const fetchNeeds = () => dispatch => {
  dispatch(getNeedsLoading());

  return fetch(`${needsURL}`)
    .then(response => response.json())
    .then(needsData => dispatch(getNeeds(needsData)))
    .catch(error => dispatch(getNeedsError(error)));
};

export const updateFilter = filter => dispatch => {
  dispatch(setFilter(filter));
};

// reducers

export default function reducer(
  state = { isLoading: false, needsData: [], filter: '' },
  action
) {
  switch (action.type) {
    case GET_NEEDS_LOADING: {
      return { ...state, isLoading: true, error: '' };
    }
    case GET_NEEDS_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case GET_NEEDS: {
      return {
        ...state,
        isLoading: false,
        error: '',
        needsData: action.payload,
        filter: 'all'
      };
    }
    case SET_FILTER: {
      return {
        ...state,
        filter: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
