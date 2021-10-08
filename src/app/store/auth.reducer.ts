
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_UNAUTHENTICATED = "SET_UNAUTHENTICATED";

export interface AuthState {
    isAuthenticated: boolean,

}

export const initialState: AuthState = {
    isAuthenticated: false,
}

export const  authReducer = (state = initialState, action ) =>  {
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state, isAuthenticated: true
            }
        case SET_UNAUTHENTICATED: 
            return {
                ...state, isAuthenticated: false
            }
        default: 
        return state;
    }
}
