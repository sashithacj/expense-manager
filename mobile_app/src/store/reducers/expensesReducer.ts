import { Expense } from "../types";
import { ExpenseAction, ADD_EXPENSE, REMOVE_EXPENSE, UPDATE_EXPENSE } from "../actions/expenseActions";

const initialState: Expense[] = [];

const expensesReducer = (state = initialState, action: ExpenseAction): Expense[] => {
  switch (action.type) {
    case ADD_EXPENSE:
      return [...state, action.payload];
    case REMOVE_EXPENSE:
      return state.filter((expense) => expense.id !== action.payload.id);
    case UPDATE_EXPENSE:
      return state.map((expense) =>
        expense.id === action.payload.id ? { ...expense, ...action.payload } : expense
      );
    default:
      return state;
  }
};

export default expensesReducer;
