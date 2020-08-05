export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (token) => {
    return {
        type: LOGIN,
        token: token
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}