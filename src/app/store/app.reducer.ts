
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromTemplate from "./template.reducer";
import * as fromAuth from "./auth.reducer";

export interface State {
    template: fromTemplate.TemplateState,
    auth: fromAuth.AuthState
}

export const reducers: ActionReducerMap<State> = {
    template: fromTemplate.templateReducer,
    auth: fromAuth.authReducer
}

export const getTemplateState = createFeatureSelector<fromTemplate.TemplateState>('template');
export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');