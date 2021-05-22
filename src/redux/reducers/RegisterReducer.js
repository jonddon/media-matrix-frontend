import { USER_INFO, CREATING_USER, CLEAR_SIGNUP_FORM, CREATE_USER_SUCCESS, CREATE_USER_FAIL } from '../types';

const INITIAL_STATE = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: '',
    password: '',
    isAuthenticated: false,
    loading: false,
    error: [],
    userData: ''
}
export default (state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case USER_INFO:
            return { ...state, [action.payload.prop]: action.payload.value };
        case CREATING_USER:
            return { ...state, loading: action.payload, error: '' };
        case CREATE_USER_SUCCESS: 
            return { ...state, ...INITIAL_STATE, userData: action.payload };
        case CREATE_USER_FAIL: 
            return { ...state, error: action.payload, loading: false, userData: '' };
        case CLEAR_SIGNUP_FORM: 
            return { ...state, ...INITIAL_STATE }
        default:
            return state;
    }
    
};
