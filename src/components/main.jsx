import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import ContactsListContainer from '../containers/contactListContainer';
import SearchContainer from '../containers/searchContainer';
import RaisedButton from 'material-ui/RaisedButton';


const Main = ({history}) => (
    <div className="content-box">
        <SearchContainer />
        <ContactsListContainer />
        <RaisedButton label="Add Contact" fullWidth={true} onClick={e => {
            e.preventDefault();
            history.push('/add');
        }}/>
    </div>
);

export default withRouter(
    connect()(Main)
);