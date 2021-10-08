
export const START_LOADING = "START_LOADING";
export const STOP_LOADING = "STOP_LOADING";

export interface TemplateState {
    isLoading: boolean,

}

export const initialState: TemplateState = {
    isLoading: false,
}

export const  templateReducer = (state = initialState, action ) =>  {
    switch(action.type) {
        case START_LOADING:
            return {
                ...state, isLoading: true
            }
        case STOP_LOADING: 
            return {
                ...state, isLoading: false
            }
        default: 
        return state;
    }
}
