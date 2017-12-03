import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {addContact, updateContact} from '../actions/updateContact';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';



class EditContactContainer extends Component {
    state = {
        name: this.props.contact.name || '',
        email: this.props.contact.email || '',
        nameErrorMessage: '',
        emailErrorMessage: ''
    };
    handleChange(e) {
        this.setState({
            [e.target.getAttribute('name')]: e.target.value,
            emailErrorMessage: '',
            nameErrorMessage: ''
        })
    }
    onSubmit(e){
        const {id, onUpdateSubmit, onAddSubmit, history} = this.props;

        if (!this.isFormValid()) {
            return false;
        }

        if (id) {
            onUpdateSubmit({...this.state, id}).then(history.push('/'));
        } else {
            onAddSubmit(this.state).then(history.push('/'));
        }

    }
    onDelete(){
        const {id, onUpdateSubmit, history} = this.props;
        if (id) {
            onUpdateSubmit({id, name: null}).then(history.push('/'));
        }
    }
    onCancel(){
        const {history} = this.props;
        history.push('/')
    }
    isFormValid() {
        let name_valid = true,
            email_valid = true
        ;
        if (!this.mailValidation()) {
            this.setState({emailErrorMessage: 'email is not valid'});
            email_valid = false;
        }
        if (!this.state.name){
            this.setState({nameErrorMessage: 'name should not be empty'});
            name_valid = false;
        }
        if (!this.state.email) {
            this.setState({emailErrorMessage: 'email should not be empty'});
            email_valid = false;
        }
        return name_valid && email_valid;
    }
    mailValidation() {
        const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ;
        return regexp.test(this.state.email);
    }
    render() {
        const {id} = this.props;
        return (
            <div className="content-box">
                <Subheader>{id ? 'Edit' : 'New'} Contact</Subheader>
                <form onSubmit={this.onSubmit.bind(this)} className="contact-form">
                    <TextField
                        fullWidth={true}
                        floatingLabelText="Name"
                        value={this.state.name}
                        name="name"
                        onChange={this.handleChange.bind(this)}
                        errorText={ this.state.nameErrorMessage }
                    /><br />
                    <TextField
                        fullWidth={true}
                        floatingLabelText="Email"
                        value={this.state.email}
                        name="email"
                        onChange={this.handleChange.bind(this)}
                        errorText={ this.state.emailErrorMessage }
                    /><br />
                    {/*<input type="text" name="name" value={this.state.name} placeholder="enter name" onChange={this.handleChange.bind(this)}/>*/}
                    {/*<input type="text" name="email" value={this.state.email} placeholder="enter email" onChange={this.handleChange.bind(this)}/>*/}
                    <div className="contact-form__controls">
                        { id ?
                            (<RaisedButton
                                label="Delete"
                                secondary={true}
                                onClick={this.onDelete.bind(this)}
                            />) : null
                        }
                        <div className="contact-form--left">
                            <RaisedButton
                                label="Cancel"
                                onClick={this.onCancel.bind(this)}
                            />
                            <RaisedButton
                                label="Ok"
                                primary={true}
                                onClick={this.onSubmit.bind(this)}
                            />
                        </div>


                        {/*<input type="submit" value="Save"/>*/}

                        {/*<div onClick={this.onDelete.bind(this)}>Delete</div>*/}
                    </div>
                </form>
            </div>
        )
    }
}

function getContactById(contacts, id) {
    const contact = contacts.filter( contact => contact.id === id);
    return contact.length ? contact[0] : {}
}

function mapStateToProps({contacts: {items}},{match: {params: {id}}, history}) {
    return {
        id,
        contact: getContactById(items, id),
        history
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onAddSubmit: (formData) => dispatch(addContact(formData)),
        onUpdateSubmit: (formData) => dispatch(updateContact(formData))
    };
}

const editContactContainer = connect(mapStateToProps, mapDispatchToProps)(EditContactContainer);

export default withRouter(editContactContainer)




