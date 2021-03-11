import {
    ADD_TO_SLOT,
    REMOVE_FROM_SLOT,
    UPDATE_SLOT_QUANTITY,
    UPDATE_DISHES,
    UPDATE_GUESTS,
    UPDATE_CURRENT_EVENT
} from "./actions";
import React, { useReducer } from 'react';

export const reducer = (state, action) => {
    switch (action.type) {
        // assign a user a slot in dishes to share
        case ADD_TO_SLOT:
            return {
                ...state,
                currentEvent: '',
                signUp: true,
                // update slot LOGIC
                // ===============
                slot: ''

            };
        // udate remaining slots available
        case UPDATE_SLOT_QUANTITY:
            return {
                ...state,
                // update LOGIC
                // ==============
                // signUp: state.dishes.length === slot.length ? false : true,
                slot: []
            };

        case UPDATE_CURRENT_EVENT:
            return {
                ...state,
                currentEvent: action.currentEvent
            };

        default:
            return state;
    }
};

export function useEventReducer(initialState) {
    return useReducer(reducer, initialState);
}