const needsURL = 'https://vilijserver.herokuapp.com/needs';

// action types

const GET_NEEDS_LOADING = 'GET_NEEDS_LOADING';
const GET_NEEDS_ERROR = 'GET_NEEDS_ERROR';
const GET_NEEDS = 'GET_NEEDS';
const SET_SCREEN = 'SET_SCREEN';
const SET_FILTER = 'SET_FILTER';
const SET_MONTH = 'SET_MONTH';
const SET_DETAIL = 'SET_DETAIL';

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

const setScreen = screen => {
  return {
    type: SET_SCREEN,
    payload: screen
  };
};

const setFilter = filter => {
  return {
    type: SET_FILTER,
    payload: filter
  };
};

const setMonth = month => {
  return {
    type: SET_MONTH,
    payload: month
  };
};

const setDetail = detailDate => {
  return {
    type: SET_DETAIL,
    payload: detailDate
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

export const updateScreen = screen => dispatch => {
  dispatch(setScreen(screen));
};

export const updateFilter = filter => dispatch => {
  dispatch(setFilter(filter));
};

export const updateMonth = month => dispatch => {
  dispatch(setMonth(month));
};

export const updateDetail = detailDate => dispatch => {
  dispatch(setDetail(detailDate));
};

// reducers

export default function reducer(
  state = {
    isLoading: false,
    needsData: [],
    screen: '',
    filter: '',
    month: {},
    detailDate: ''
  },
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
        screen: 'calendar',
        filter: 'all',
        month: {},
        detail: false
      };
    }
    case SET_SCREEN: {
      return {
        ...state,
        screen: action.payload
      };
    }
    case SET_FILTER: {
      return {
        ...state,
        filter: action.payload
      };
    }
    case SET_MONTH: {
      return {
        ...state,
        month: action.payload
      };
    }
    case SET_DETAIL: {
      return {
        ...state,
        detailDate: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
