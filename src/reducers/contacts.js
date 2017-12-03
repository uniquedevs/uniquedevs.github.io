import {GET_CONTACTS_REQUESTED, GET_CONTACTS_REJECTED, GET_CONTACTS_FULFILLED, INVALIDATE_CONTACTS} from '../actions/getContacts';

export default function contacts(state = {
    items:[],
    didInvalidate: false,
    isFetching:false
}, action) {
    switch (action.type) {
        case GET_CONTACTS_REQUESTED :
            return {
                ...state,
                isFetching: true
            };
        case GET_CONTACTS_REJECTED:
            return {
                ...state,
                isFetching: false
            };
        case GET_CONTACTS_FULFILLED :
            let items = []
            ;
            if (action.payload) {
                items = action.payload;
            }
            return {
                ...state,
                items,
                isFetching: false,
                didInvalidate: false
            };
        case INVALIDATE_CONTACTS:
            return {
                ...state,
                didInvalidate: true
            };
        default:
            return state;
    }
}
