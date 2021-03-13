import {
    ADD_EVENT,
    ADD_DISH,
    UPDATE_EVENTS,
} from "./actions";
import React, { useReducer } from 'react';

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_EVENT: {
            return {
                ...state,
                events: [action.payload, ...state.events],
            };
        }

        case ADD_DISH: {
            return {
                ...state,
                events: [action.payload, ...state.events],
            };
        }

        case UPDATE_EVENTS:
            return {
                ...state,
                events: [...action.events],
            }
        default:
            return state;
    }
};

export function useAppReducer(initialState) {
    return useReducer(reducer, initialState);
}