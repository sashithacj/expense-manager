export type RootState = {
  expenses: Expense[];
};

export type Expense = {
  id: number;
  description: string;
  amount: number;
  date: number;
  type: string;
};
