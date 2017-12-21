const parentsURL = 'https://vilijserver.herokuapp.com/parents';

//types of actions to modify our state

const GET_PARENTS_LOADING = 'GET_PARENTS_LOADING';
const GET_PARENTS_ERROR = 'GET_PARENTS_ERROR';
const GET_PARENTS = 'GET_PARENTS';
const RESET_PARENTS_LOADING = 'RESET_PARENTS_LOADING';
const SET_PARENT_ID = 'SET_PARENT_ID';
const SET_MODAL = 'SET_MODAL';

//Dispatch actions, optionally with payloads

const getParentsLoading = () => {
  return {
    type: GET_PARENTS_LOADING
  };
};

const resetParentsLoading = () => {
  return {
    type: RESET_PARENTS_LOADING
  };
};

const getParentsError = error => {
  return {
    type: GET_PARENTS_ERROR,
    payload: error
  };
};

const getParents = parentsData => {
  return {
    type: GET_PARENTS,
    payload: parentsData
  };
};

const setParentId = parentId => {
  return {
    type: SET_PARENT_ID,
    payload: parentId
  };
};

const setModal = mode => {
  return {
    type: SET_MODAL,
    payload: mode
  };
};

//HELPER FN

export const fetchParents = () => dispatch => {
  dispatch(getParentsLoading());

  return fetch(`${parentsURL}`)
    .then(response => response.json())
    .then(parentsData => dispatch(getParents(parentsData)))
    .catch(error => dispatch(getParentsError(error)));
};

export const postParent = parent => dispatch => {
  dispatch(getParentsLoading());

  return fetch(`${parentsURL}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(parent)
  })
    .then(parentsData => {
      dispatch(resetParentsLoading());

      let parentId = parentsData._bodyText;

      if (parentId.substr(0, 1) == '"') {
        parentId = parentId.substr(1, parentId.length - 2);
      }

      dispatch(setParentId(parentId));
    })
    .catch(error => {
      console.log(error);
      dispatch(getParentsError(error));
    });
};

export const updateModal = mode => dispatch => {
  dispatch(setModal(mode));
};

export const updateParentId = parentId => dispatch => {
  dispatch(setParentId(parentId));
};

//Reducer that handles our actions and manipulates our state in the store

export default function reducer(
  state = { isLoading: false, parentsData: [], parentId: '', modal: 0 },
  action
) {
  switch (action.type) {
    case GET_PARENTS_LOADING: {
      return { ...state, isLoading: true, error: '' };
    }
    case RESET_PARENTS_LOADING: {
      return { ...state, isLoading: false, error: '' };
    }
    case GET_PARENTS_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case GET_PARENTS: {
      return {
        ...state,
        isLoading: false,
        error: '',
        parentsData: action.payload
      };
    }
    case SET_PARENT_ID: {
      return {
        ...state,
        parentId: action.payload
      };
    }
    case SET_MODAL: {
      return {
        ...state,
        modal: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
