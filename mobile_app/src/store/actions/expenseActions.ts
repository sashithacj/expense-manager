import { Expense } from "../types";

export const ADD_EXPENSE = "ADD_EXPENSE";
export const REMOVE_EXPENSE = "REMOVE_EXPENSE";
export const UPDATE_EXPENSE = "UPDATE_EXPENSE";

export interface AddExpenseAction {
  type: typeof ADD_EXPENSE;
  payload: Expense;
}

export interface RemoveExpenseAction {
  type: typeof REMOVE_EXPENSE;
  payload: Expense;
}

export interface UpdateExpenseAction {
  type: typeof UPDATE_EXPENSE;
  payload: Expense;
}

export type ExpenseAction =
  | AddExpenseAction
  | RemoveExpenseAction
  | UpdateExpenseAction;
