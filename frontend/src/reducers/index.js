import { combineReducers } from 'redux';
import auth from './auth';

const kaiApp = combineReducers({
    auth,
})

export default kaiApp;