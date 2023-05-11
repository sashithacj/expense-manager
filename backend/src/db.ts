import PouchDB from "pouchdb";
import { Expense } from "./models/expense";

const db = new PouchDB<Expense>("expenses");

export default db;
