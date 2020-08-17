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
            throw new Error('something went wrong: ', resp);
        }

        const respData = await resp.json();
        dispatch({type: SIGNUP})
    }
}
export const login = (email, password) => {
    console.log('login: email and password:', email, " : ", password);
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
            throw new Error('something went wrong in login: ', resp);
        }

        const respData = await resp.json();
        console.log('login response value: ', respData);
        dispatch({type: LOGIN})
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}
