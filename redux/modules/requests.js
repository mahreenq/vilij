const requestsURL = 'https://vilijserver.herokuapp.com/needs';

// types of actions to modify our state

const GET_REQUESTS_LOADING = 'GET_REQUESTS_LOADING';
const GET_REQUESTS_ERROR = 'GET_REQUESTS_ERROR';
const GET_REQUESTS = 'GET_REQUESTS';
const SET_MODAL = 'SET_MODAL';
const SET_REQUEST_NAME = 'SET_REQUEST_NAME';
const RESET_REQUESTS_LOADING = 'RESET_REQUESTS_LOADING';

// dispatch actions, optionally with payloads

const getRequestsLoading = () => {
  return {
    type: GET_REQUESTS_LOADING
  };
};

const resetRequestsLoading = () => {
  return {
    type: RESET_REQUESTS_LOADING
  };
};

const getRequestsError = error => {
  return {
    type: GET_REQUESTS_ERROR,
    payload: error
  };
};

const getRequests = requestsData => {
  return {
    type: GET_REQUESTS,
    payload: requestsData
  };
};

const setModal = mode => {
  return {
    type: SET_MODAL,
    payload: mode
  };
};

const setRequestName = name => {
  return {
    type: SET_REQUEST_NAME,
    payload: name
  };
};

// helper functions

export const fetchRequests = () => dispatch => {
  dispatch(getRequestsLoading());

  return fetch(`${requestsURL}`)
    .then(response => response.json())
    .then(requestsData => dispatch(getRequests(requestsData)))
    .catch(error => dispatch(getRequestsError(error)));
};

export const offerHelp = (needId, parentId, requestName) => dispatch => {
  dispatch(getRequestsLoading());

  return fetch(`${requestsURL}/offered/${needId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      offered: parentId
    })
  })
    .then(requestsData => {
      dispatch(setRequestName(requestName));
      dispatch(setModal(1));
    })
    .catch(error => {
      console.log(error);
      dispatch(getRequestsError(error));
    });
};

export const postNeed = need => dispatch => {
  dispatch(getRequestsLoading());

  return fetch(`${requestsURL}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(need)
  })
    .then(requestsData => {
      dispatch(resetRequestsLoading());
      fetchRequests();
      dispatch(setModal(2));
    })
    .catch(error => {
      console.log(error);
      dispatch(getRequestsError(error));
    });
};

export const updateModal = mode => dispatch => {
  dispatch(setModal(mode));
};

// reducer that handles our actions and manipulates our state in the store

export default function reducer(
  state = {
    isLoading: false,
    requestsData: [],
    modal: 0,
    requestName: ''
  },
  action
) {
  switch (action.type) {
    case GET_REQUESTS_LOADING: {
      return { ...state, isLoading: true, error: '' };
    }
    case RESET_REQUESTS_LOADING: {
      return { ...state, isLoading: false, error: '' };
    }
    case GET_REQUESTS_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case GET_REQUESTS: {
      return {
        ...state,
        isLoading: false,
        error: '',
        requestsData: action.payload
      };
    }
    case SET_MODAL: {
      return {
        ...state,
        modal: action.payload
      };
    }
    case SET_REQUEST_NAME: {
      return {
        ...state,
        requestName: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
