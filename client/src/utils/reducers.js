import {
    ADD_EVENT
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

        default:
            return state;
    }
};

export function useAppReducer(initialState) {
    return useReducer(reducer, initialState);
}