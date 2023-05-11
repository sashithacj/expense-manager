import { Router } from "express";
import PouchDB from "pouchdb";
import { Expense } from "../models/expense";
import db from "../db";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const expenses = await db.allDocs({ include_docs: true });
    res.json(expenses.rows.map((row: PouchDB.Core.Document<any> & PouchDB.Core.GetMeta) => row.doc));
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const expense: Expense = req.body;
    const response = await db.post(expense);
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const expense: Expense = req.body;
    const response = await db.put(expense);
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await db.get(id);
    const response = await db.remove(expense);
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

export { router as expenseRoutes };
