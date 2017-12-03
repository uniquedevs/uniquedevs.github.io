import contacts from './contacts';
import search from './search';
import {combineReducers} from 'redux';


const rootReducer = combineReducers({
    contacts,
    search
});

export default rootReducer;
