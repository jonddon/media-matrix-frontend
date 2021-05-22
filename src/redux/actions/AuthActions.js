import {
	// USER_INFO, 
	CREATING_USER, USER_DATA_SUCCESS, USER_DATA_FAIL, LOADING_USER, 
	// LOGIN_INFO,
	 CLEAR_SIGNIN_FORM, CLEAR_SIGNUP_FORM,
	CREATE_USER_SUCCESS, CREATE_USER_FAIL, SIGNOUT_USER, SIGNOUT_USER_SUCCESSFUL, SIGNOUT_USER_FAIL, SET_CURRENT_HOME
} from "../types";
import http from '../../config';


// export const loginInfo = ({ prop, value }) => {
// 	return {
// 		type: LOGIN_INFO,
// 		payload: { prop, value }
// 	};
// };

// export const userInfo = ({ prop, value }) => {
// // console.log('Value ', value, prop)
//   return {
//     type: USER_INFO,
//     payload: { prop, value },
//   };
// };


export const signUpUser = ({ first_name, last_name, username, phone_number, password, email }) => {
	// let number = formatPhoneNumber(phone_number);
	const obj = {
		first_name,
		last_name,
		username,
		phone_number,
		password,
		email
	};
	return dispatch => {
		return new Promise((resolve, reject) => {
			dispatch({ type: CREATING_USER, payload: true });
			http
			.post("local/register", obj)
				.then(async response => {
					// console.log("sign up ", response.data );
					await setUserData(response.data);
					dispatch({ type: CREATE_USER_SUCCESS, payload: response.data.user });
					resolve(username);
				})
				.catch(error => {
					dispatch({ type: CREATE_USER_FAIL, payload: error });
					reject();
				})
		});
	};
};


export const signInUser = ({ identifier, password }) => {
	const obj = {
        identifier,
		password
	};
	return dispatch => {
		return new Promise((resolve, reject) => {
			dispatch({ type: LOADING_USER, payload: true });
			http.post("local", obj)
				.then(async response => {
					console.log(response.data.jwt);
					await setUserData(response.data);
					dispatch({ type: USER_DATA_SUCCESS, payload: response.data });
					resolve(response.data.user, '"consoled user data"');
				})
				.catch(error => {
					console.log(error, 'rejected error')
					dispatch({ type: USER_DATA_FAIL, payload: error });
					// dispatch({type: CLEAR_SIGNIN_FORM });
					reject();
				})
		});
	};
};


export const loginFromLocalStorage = (userData) => {
	return dispatch => {
		dispatch({ type: USER_DATA_SUCCESS, payload: userData })
	}
	
}


export const modifyUserData = (userData) => {
	return dispatch => {
		dispatch({ type: USER_DATA_SUCCESS, payload: userData })	
	}
}

export const signOutUser = () => {
  return async dispatch => {
    return new Promise(async (resolve, reject) => {
      dispatch({ type: SIGNOUT_USER });
      const keys = ['userData', 'token'];
      try {
		await localStorage.removeItem(keys);
        dispatch({ type: SIGNOUT_USER_SUCCESSFUL });
        resolve();
      } catch (error) {
        dispatch({ type: SIGNOUT_USER_FAIL });
        reject(error);
        console.log('Error caught ', error);
        return false;
      }
    });
  };
};

export const setCurrentHome = ({ name }) => {
	return {
		type: SET_CURRENT_HOME,
		payload: name,
	};
}

const setUserData = async userData => {
	try {
		const token = userData.jwt;
		console.log(token, 'jwt token is here')
		await localStorage.setItem("userData", JSON.stringify(userData.user));
		await localStorage.setItem("token", token);
		// console.log(token, 'setUserdata token is here')
	} catch (err) {
		console.log("Could not set user Data ", err.message);
	}
};


export const getUserDetails = async () => {
    try {
        let user = await localStorage.getItem("userData");
        return JSON.parse(user);
    } catch (error) {
        return error;
    }
}

// const getUser = async () => {
//     try {
//         let user = await localStorage.getItem("userData");
//         return JSON.parse(user);
//     } catch (error) {
//         return error;
//     }
// }



// function formatPhoneNumber(username) {
	
// 	if(username.includes('@')) {
// 		return username
// 	} else {
// 		let number;
// 		if (username.startsWith("0")) number = `+234${username.substr(1)}`;
// 		else if (!username.startsWith("+")) number = `+${username}`;
// 		else number = username;
// 		return number;
// 	}
	
// }


export const clearSignIn = () => {
    return {
        type: CLEAR_SIGNIN_FORM,
    };
}

export const clearSignUp = () => {
    return {
        type: CLEAR_SIGNUP_FORM,
    };
}
