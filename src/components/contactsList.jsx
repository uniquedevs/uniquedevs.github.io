import React, {Component} from 'react';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import {indigo500} from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';

export default class ContactsList extends Component {
    editContact(id) {
        let {history} = this.props;
        history.push('edit/' + id);
    }
    componentDidMount() {
        this.props.onGetContacts();
    }
    onDelete(id) {
        let {history, onDelete, onGetContacts}  = this.props;
        this.props.onDelete({
            id,
            name: null
        }).then(onGetContacts);
    }
    renderList() {
        const {contacts} = this.props;
        return (
            <div>
                <List>
                    {contacts.map( (contact, idx) => {
                        const iconButtonElement = (
                            <IconButton
                                touch={true}
                                tooltip="more"
                                tooltipPosition="bottom-left"
                            >
                                <MoreVertIcon color={grey400} />
                            </IconButton>
                        );

                        const rightIconMenu = (
                            <IconMenu iconButtonElement={iconButtonElement}>
                                <MenuItem onClick={this.editContact.bind(this, contact.id)}>Edite</MenuItem>
                                <MenuItem onClick={this.onDelete.bind(this, contact.id)}>Delete</MenuItem>
                            </IconMenu>
                        );
                        return (
                            <div key={'contact-' + idx}>
                                <ListItem
                                    leftIcon={<CommunicationEmail color={indigo500} />}
                                    rightIconButton={rightIconMenu}
                                    primaryText={contact.name}
                                    secondaryText={<p>{contact.email}</p>}
                                    secondaryTextLines={2}
                                    //onClick={this.editContact.bind(this, contact.id)}
                                />
                                <Divider inset={true} />
                            </div>
                        )
                    })}

                </List>
            </div>
        )
    }
    render() {
        const {contacts} = this.props;
        return (
            this.renderList()
        )
    }
}

{/*<div>*/}
    {/*{contacts.map( (contact, idx) => {*/}
        {/*return (*/}
            {/*<div key={'contact-' + idx} id={contact.id}>*/}
                {/*<div onClick={this.editContact.bind(this, contact.id)}>{contact.name}</div>*/}
                {/*<div>{contact.email}</div>*/}
                {/*<div onClick={this.onDelete.bind(this, contact.id)}>DEL</div>*/}
            {/*</div>*/}
        {/*)*/}
    {/*})}*/}
{/*</div>*/}