import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ContactsList from '../components/contactsList';
import {getContacts} from '../actions/getContacts';
import {updateContact} from '../actions/updateContact';


function searchFilterContacts(contacts, search) {
    return contacts.filter( contact => new RegExp(search.toLowerCase()).test(contact.name.toLowerCase()));
}

function mapStateToProps({contacts: {items}, search: {value}}, {history}) {
    return {
        contacts: searchFilterContacts(items, value),
        history

    };
}

function mapDispatchToProps(dispatch, {history}) {
    return {
        onGetContacts: () => dispatch(getContacts()),
        onDelete: (formData) => dispatch(updateContact(formData))
    };
}

const contactsListContainer = connect(mapStateToProps, mapDispatchToProps)(ContactsList);

export default withRouter(contactsListContainer);
