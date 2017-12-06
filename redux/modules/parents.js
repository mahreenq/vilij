const parentsURL = 'https://vilijserver.herokuapp.com/parents';

//types of actions to modify our state

const GET_PARENTS_LOADING = 'GET_PARENTS_LOADING';
const GET_PARENTS_ERROR = 'GET_PARENTS_ERROR';
const GET_PARENTS = 'GET_PARENTS';

//Dispatch actions, optionally with payloads

const getParentsLoading = () => {
    return {
        type: GET_PARENTS_LOADING
    };
};

const getParentsError = (error) => {
    return {
        type: GET_PARENTS_ERROR,
        payload: error
    };
};

const getParents= (parentsData) => {
    return {
        type: GET_PARENTS,
        payload: parentsData
    };
};


//HELPER FN


export const fetchParents = () => (dispatch) => {
    dispatch(getParentsLoading());

    return fetch(`${parentsURL}`)
    .then(response => response.json())
    .then(parentsData => dispatch(getParents(parentsData)))
    .catch (error => dispatch(getParentsError(error)));
};


//Reducer that handles our actions and manipulates our state in the store

export default function reducer(state = {isLoading: false, parentsData: []} , action){
    switch (action.type){
        case GET_PARENTS_LOADING : {
            return {...state, isLoading: true, error:'' };
        };
        case GET_PARENTS_ERROR: {
            return {...state , isLoading:false , error: action.payload};
        };
        case GET_PARENTS : {
            return { ...state, isLoading: false , error: '', parentsData: action.payload};
        };
        default : {
            return state;
        }
    }
} 