import { createFeatureSelector } from "@ngrx/store";
import { Exercise } from "../training/exercise.model";
import * as fromRoot from "./app.reducer";

export const SET_AVAILABLE_TRAININGS = "SET_AVAILABLE_TRAININGS";
export const SET_PAST_TRAININGS = "SET_PAST_TRAININGS";
export const ADD_NEW_TRAINING_TO_HISTORY = "ADD_NEW_TRAINING_TO_HISTORY";
export const SET_ACTIVE_TRAINING = "SET_ACTIVE_TRAINING";

export interface TrainingState {
    availableExercises: Exercise[];
    pastExercises: Exercise[];
    activeTraining: Exercise;
}

export interface State extends fromRoot.State {
    training: TrainingState
}

const initialState: TrainingState = {
    availableExercises: [],
    pastExercises: [],
    activeTraining: null
}

export function trainingReducer (state = initialState, action) {
    switch(action.type) {
        case SET_AVAILABLE_TRAININGS:
            return {
                ...state,
                availableExercises: action.payload,
            }
        case SET_PAST_TRAININGS:
            return {
                ...state,
                pastExercises: action.payload
            }
        case ADD_NEW_TRAINING_TO_HISTORY:
            return {
                ...state,
                pasteExercises: [...state.pastExercises, action.payload]
            }
        case SET_ACTIVE_TRAINING:
            return {
                ...state,
                activeTraining: state.availableExercises.find(el => el.id === action.payload)
            }
        default:
            return state;
    }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');
