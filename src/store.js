import { configureStore, combineReducers } from '@reduxjs/toolkit';
import resumeReducer from './reducers/resumeReducer'
import { reducer as formReducer } from 'redux-form';

const red = combineReducers({
  resume: resumeReducer,
  form: formReducer,
});
const store = configureStore({reducer:red});

export default store;
