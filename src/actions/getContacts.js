import database from './database';

export const GET_CONTACTS_REQUESTED = 'GET_INVITE_REQUESTED';
export const GET_CONTACTS_REJECTED = 'GET_INVITE_REJECTED';
export const GET_CONTACTS_FULFILLED = 'GET_INVITE_FULFILLED';

export const INVALIDATE_CONTACTS = 'INVALIDATE_CONTACTS';

export function getContacts() {
    return (dispatch, getState) => {
        const {contacts} = getState();
        if (shouldFetchContacts(contacts)) {
            // Dispatch a thunk from thunk!
            return dispatch(fetchContacts());
        } else {
            return Promise.resolve();
        }
    }
}

function shouldFetchContacts(contacts) {
    const items = contacts.items;
    if (!items || !items.length) {
        return true;
    } else if (contacts.isFetching) {
        return false;
    } else {
        return contacts.didInvalidate;
    }
}

export function fetchContacts(){
    return dispatch => {
        dispatch(getContactsRequestedAction());
        const ref = database.ref('/contacts');

        return ref.orderByChild('email').once('value', snap => {
            let contacts = [];
            snap.forEach( (child, i)  => {
                contacts.push({
                    id: child.key,
                    ...child.val()
                })
            });
            //const contacts = snap.val();
            dispatch(getContactsFulfilledAction(contacts));
            dispatch(invalidateContacts());
        })
        .catch((error) => {
            console.log(error);
            dispatch(getContactsRejectedAction());
        });
    }
}

function getContactsRequestedAction() {
    return {
        type: GET_CONTACTS_REQUESTED
    }
}

function getContactsRejectedAction() {
    return {
        type: GET_CONTACTS_REJECTED
    }
}

function getContactsFulfilledAction(contacts) {
    return {
        type: GET_CONTACTS_FULFILLED,
        payload: contacts
    }
}

function invalidateContacts() {
    return {
        type: INVALIDATE_CONTACTS
    }
}