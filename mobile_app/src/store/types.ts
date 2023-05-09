export type RootState = {
  expenses: Expense[];
};

export type Expense = {
  id: number;
  description: string;
  amount: number;
  date: Date;
  type: string;
};
