import {SEARCH_CONTACT} from '../actions/searchContact';

export default function search(state = {value: ''}, action) {
    switch (action.type) {
        case 'SEARCH_CONTACT':
            return {
                ...state,
                value: action.payload.value
            };
        default:
            return state;
    }
}