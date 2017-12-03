import database from './database';

export const ADD_CONTACT_REQUESTED = 'ADD_CONTACT_REQUESTED';
export const ADD_CONTACTS_REJECTED = 'ADD_CONTACT_REQUESTED';
export const ADD_CONTACTS_FULFILLED = 'ADD_CONTACT_REQUESTED';

export const UPDATE_CONTACT_REQUESTED = 'ADD_CONTACT_REQUESTED';
export const UPDATE_CONTACTS_REJECTED = 'ADD_CONTACT_REQUESTED';
export const UPDATE_CONTACTS_FULFILLED = 'ADD_CONTACT_REQUESTED';

// add new contact

export function addContact(payload) {
    return dispatch => {
        dispatch(addContactRequestedAction());
        const contactRef = database.ref('/contacts');
        return contactRef.push(payload)
            .then(() => {
                dispatch(addContactFulfilledAction());
            })
            .catch((error) => {
                dispatch(addContactRejectedAction());
            });
    }
}

function addContactRequestedAction() {
    return {
        type: ADD_CONTACT_REQUESTED
    };
}

function addContactRejectedAction() {
    return {
        type: ADD_CONTACTS_REJECTED
    }
}

function addContactFulfilledAction() {
    return {
        type: ADD_CONTACTS_FULFILLED
    };
}

// edit or delete contact

export function updateContact(payload) {
    return dispatch => {
        dispatch(updateContactRequestedAction());
        let updates = {
            ['/contacts/' + payload.id] : payload.name ? {name: payload.name, email: payload.email} : null
        };
        const   contactRef = database.ref();
        return contactRef.update(updates)
            .then(() => {
                dispatch(updateContactFulfilledAction());
            })
            .catch((error) => {
                dispatch(updateContactRejectedAction());
            });
    }
}

function updateContactRequestedAction() {
    return {
        type: UPDATE_CONTACT_REQUESTED
    };
}

function updateContactRejectedAction() {
    return {
        type: UPDATE_CONTACTS_REJECTED
    }
}

function updateContactFulfilledAction() {
    return {
        type: UPDATE_CONTACTS_FULFILLED
    };
}