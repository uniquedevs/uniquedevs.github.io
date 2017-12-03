import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchContacts} from '../actions/searchContact';
import TextField from 'material-ui/TextField';

class SearchContainer extends Component {
    state = {
        value: this.props.searchValue
    };

    onChange(e) {
        this.setState({value: e.target.value});
        this.props.onChangeSearchValue({value: e.target.value});
    }
    render() {
        return (
            <TextField
                hintText="Search"
                fullWidth={true}
                onChange={this.onChange.bind(this)} value={this.state.value}
                hintStyle={{paddingLeft: '16px'}}
                inputStyle={{paddingLeft: '16px'}}
            />
        )
    }
}

function mapStateToProps({search: {value}}) {
    return {
        searchValue: value
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeSearchValue: val => dispatch(searchContacts(val))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(SearchContainer)