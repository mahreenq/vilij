const requestsURL = 'https://vilijserver.herokuapp.com/needs';

//types of actions to modify our state

const GET_REQUESTS_LOADING = 'GET_REQUESTS_LOADING';
const GET_REQUESTS_ERROR = 'GET_REQUESTS_ERROR';
const GET_REQUESTS = 'GET_REQUESTS';

//Dispatch actions, optionally with payloads

const getRequestsLoading = () => {
    return {
        type: GET_REQUESTS_LOADING
    };
};

const getRequestsError = (error) => {
    return {
        type: GET_REQUESTS_ERROR,
        payload: error
    };
};

const getRequests= (requestsData) => {
    return {
        type: GET_REQUESTS,
        payload: requestsData
    };
};


//HELPER FN


export const fetchRequests = () => (dispatch) => {
    dispatch(getRequestsLoading());

    return fetch(`${requestsURL}`)
    .then(response => response.json())
    .then(requestsData => dispatch(getRequests(requestsData)))
    .catch (error => dispatch(getRequestsError(error)));
};


//Reducer that handles our actions and manipulates our state in the store

export default function reducer(state = {isLoading: false, requestsData: []} , action){
    switch (action.type){
        case GET_REQUESTS_LOADING : {
            return {...state, isLoading: true, error:'' };
        };
        case GET_REQUESTS_ERROR: {
            return {...state , isLoading:false , error: action.payload};
        };
        case GET_REQUESTS : {
            return { ...state, isLoading: false , error: '', requestsData: action.payload};
        };
        default : {
            return state;
        }
    }
} 