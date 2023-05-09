import { combineReducers } from 'redux';
import expensesReducer from './expensesReducer';

const rootReducer = combineReducers({
  expenses: expensesReducer,
});

export default rootReducer;
