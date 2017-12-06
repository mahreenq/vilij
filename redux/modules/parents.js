const parentsURL = 'project-data.json';

//types of actions to modify our state

const GET_PROJECTS_LOADING = 'GET_PROJECTS_LOADING';
const GET_PROJECTS_ERROR = 'GET_PROJECTS_ERROR';
const GET_PROJECTS = 'GET_PROJECTS';

//Dispatch actions, optionally with payloads

const getProjectsLoading = () => {
    return {
        type: GET_PROJECTS_LOADING
    };
};

const getProjectsError = (error) => {
    return {
        type: GET_PROJECTS_ERROR,
        payload: error
    };
};

const getProjects= (projectsData) => {
    return {
        type: GET_PROJECTS,
        payload: projectsData
    };
};

//HELPER FN


export const fetchProjects = () => (dispatch) => {
    dispatch(getProjectsLoading());

    return fetch(`${projectsURL}`)
    .then(response => response.json())
    .then(projectsData => dispatch(getProjects(projectsData)))
    .catch (error => dispatch(getProjectsError(error)));
};


//Reducer that handles our actions and manipulates our state in the store

export default function reducer(state = {isLoading: false, projectsData: []} , action){
    switch (action.type){
        case GET_PROJECTS_LOADING : {
            return {...state, isLoading: true, error:'' };
        };
        case GET_PROJECTS_ERROR: {
            return {...state , isLoading:false , error: action.payload};
        };
        case GET_PROJECTS : {
            return { ...state, isLoading: false , error: '', projectsData: action.payload};
        };
        default : {
            return state;
        }
    }
} 