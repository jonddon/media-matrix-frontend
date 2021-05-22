import {combineReducers} from 'redux';

// import RegisterReducer from './RegisterReducer';
import AuthReducer from './AuthReducer';
import ErrorReducer from './ErrorReducer';

import { SIGNOUT_USER_SUCCESSFUL } from '../types';


const appReducer = combineReducers({
    auth: AuthReducer,
    // register: RegisterReducer,
    error: ErrorReducer
})

const rootReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === SIGNOUT_USER_SUCCESSFUL) {
      state = undefined;
    }
  
    return appReducer(state, action);
  };
  
  export default rootReducer;
