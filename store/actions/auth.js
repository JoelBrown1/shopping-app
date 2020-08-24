export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SIGNUP= "SIGNUP";

export const signup = (email, password) => {
    return async dispatch => {
        const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_fkB0og8nyhTNDdgC7SabtSWFBhDRyUY',
        {
            method: 'POST',
            headers: {'Content_Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if(!resp.ok) {
            const errorResp = await resp.json();
            const errMessage = errorResp.error.message;
            let message = 'something went wrong in login: ';
            if( errMessage === "EMAIL_EXISTS") {
                message = `that email already exists!`
            } else if(errMessage === "TOO_MANY_ATTEMPTS_TRY_LATER") {
                message = "We think yo are a robot - go away!"
            }
            throw new Error(message, resp);
        }

        const respData = await resp.json();
        dispatch({type: SIGNUP, userToken: respData.idToken, userId: respData.localId})
    }
}
export const login = (email, password) => {
    return async dispatch => {
        const resp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_fkB0og8nyhTNDdgC7SabtSWFBhDRyUY',
        {
            method: 'POST',
            headers: {'Content_Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if(!resp.ok) {
            console.log('error in login flow: ', resp);
            let message = 'something went wrong in login: ';
            if( errMessage === "EMAIL_NOT_FOUND") {
                message = `Your email wasn't found!`
            } else if(errMessage === "INVALID_PASSWORD") {
                message = "your password isn't valid!"
            }
            throw new Error(message, resp);
        }

        const respData = await resp.json();
        console.log('what is in the signIn resp:', respData);
        console.log('this is the signin respons data: ', respData);
        dispatch({type: LOGIN, userToken: respData.idToken, userId: respData.localId })
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}
