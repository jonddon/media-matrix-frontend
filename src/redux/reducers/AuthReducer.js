import { USER_DATA_SUCCESS, USER_DATA_FAIL, LOADING_USER, 
    // LOGIN_INFO, 
    LOGIN_SUCCESS, CLEAR_SIGNIN_FORM,
  SIGNOUT_USER, SIGNOUT_USER_SUCCESSFUL, SIGNOUT_USER_FAIL, 
//   SET_CURRENT_HOME, USER_INFO, 
  CREATING_USER, CREATE_USER_SUCCESS,CREATE_USER_FAIL, CLEAR_SIGNUP_FORM } from '../types';
  
  const INITIAL_STATE = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: '',
    identifier: '',
    password: '',
    loadingUser: false,
    // isAunthenticated: false,
    //   user: localStorage.getItem('userData'),
    error: [],
    userData: '',
  }
  function AuthReducer(state = INITIAL_STATE, action ) {
      
      switch (action.type) {
          case LOADING_USER:
              return { ...state, loadingUser: action.payload, error: []};
          case USER_DATA_SUCCESS: 
              return { ...state, ...INITIAL_STATE, 
                // isAuthenticated: true,
                 userData: action.payload };
          case USER_DATA_FAIL: 
              return { ...state, error: action.payload, loadingUser: false, userData: '' };
          case LOGIN_SUCCESS: 
            return { ...state, ...action.payload,
                //  loading: false
                 };
          case CLEAR_SIGNIN_FORM:
              return { ...state, ...INITIAL_STATE };
          case SIGNOUT_USER:
              return { ...state, loading: true, error: ''};
          case SIGNOUT_USER_SUCCESSFUL:
              return { ...state, ...INITIAL_STATE };
          case SIGNOUT_USER_FAIL:
              return { ...state, ...INITIAL_STATE, error: action.payload };


            //   case USER_INFO:
                // return { ...state, [action.payload.prop]: action.payload.value };
            case CREATING_USER:
                return { ...state, loadingUser: action.payload, error: '' };
            case CREATE_USER_SUCCESS: 
                return { ...state, ...INITIAL_STATE, 
                    // isAuthenticated: true,
                     userData: action.payload };
            case CREATE_USER_FAIL: 
                return { ...state, error: action.payload, loading: false, userData: '' };
            case CLEAR_SIGNUP_FORM: 
                return { ...state, ...INITIAL_STATE }  
          default:
              return state;
      }
      
  };
  
  export default AuthReducer;