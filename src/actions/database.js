import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyDXe7KwnzvJwNgrtKRjhHScpsNCXOdaqFg',
    authDomain: 'address-book-pdffiller.firebaseapp.com',
    databaseURL: 'https://address-book-pdffiller.firebaseio.com'
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;