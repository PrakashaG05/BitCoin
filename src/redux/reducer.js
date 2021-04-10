import { createStore } from 'redux';
import { ACTIONS } from './contants.js';

const default_state = {
    currencies: {},
    dataSet: {}
};

export function currencyReducer(state = default_state, action) {
    switch(action.type) {
        case ACTIONS.ADD_CURRENCY_PRICES:
            var newState = {...state};
            newState.currencies = action.currency;
            return newState; 
        case ACTIONS.ADD_CURRENCY_GRAPH:
            // eslint-disable-next-line no-redeclare
            var newState = {...state};
            newState.dataSet[action.currencyCode] = action.dataSet;
            return newState; 
        default:
            return state 
    }
}

const store = createStore(currencyReducer);

export default store;