import React, { Component } from 'react';
import Main from './components/main';
import EditContactContainer from './containers/editContactContainer';
import {BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';


const App = () => (
    <MuiThemeProvider>
        <Provider store={store}>
            <BrowserRouter>
              <div className="app-container">
                <AppBar title="My Address Book" showMenuIconButton={false}/>
                <Route exact path="/" component={Main}/>
                <Route exact path="/add" component={EditContactContainer}/>
                <Route exact path="/edit/:id" component={EditContactContainer}/>
              </div>
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>
);

export default App;