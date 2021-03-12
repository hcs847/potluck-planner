// import {

// } from "./actions";
import React, { useReducer } from 'react';

export const reducer = (state, action) => {
    switch (action.type) {


        default:
            return state;
    }
};

export function useAppReducer(initialState) {
    return useReducer(reducer, initialState);
}