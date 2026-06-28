import { z } from "zod";

// ==========================================
// 1. Notion Database Schema
// ==========================================
export const notionSchema = z.object({
	categories: z.array(z.string()),
	payees: z.array(z.string()),
	paymentModes: z.array(z.string()),
});
export type NotionSchema = z.infer<typeof notionSchema>;

// ==========================================
// 2. Core Expense Model
// ==========================================
export const expenseSchema = z.object({
	name: z.string().min(1, "Name is required"),
	amount: z.number().positive("Amount must be positive"),
	category: z.array(z.string()).default([]),
	date: z.string().min(1, "Date is required"),
	payee: z.string().default(""),
	paymentMode: z.string().min(1, "Payment mode is required"),
	notes: z.string().default(""),
});
export type Expense = z.infer<typeof expenseSchema>;

// ==========================================
// 3. Form Input Schema (Coerces string inputs from HTML form)
// ==========================================
export const expenseFormSchema = expenseSchema.extend({
	amount: z.coerce.number().positive("Amount must be positive"),
});

// ==========================================
// 4. Quick Fill Template (Derived from Expense Schema)
// ==========================================
export const templateSchema = expenseSchema.omit({ date: true }).partial().extend({
	id: z.string(),
	label: z.string(),
	pinned: z.boolean().optional(),
});
export type ExpenseTemplate = z.infer<typeof templateSchema>;

// ==========================================
// 5. Client Form State Model
// ==========================================
export const formStateSchema = z.object({
	name: z.string(),
	amount: z.number().nullable(),
	selectedCategories: z.array(z.string()),
	date: z.string(),
	selectedPayee: z.string(),
	selectedPaymentMode: z.string(),
	notes: z.string(),
});
export type FormState = z.infer<typeof formStateSchema>;

// ==========================================
// 6. Template Form State (no date, adds label + pinned)
// ==========================================
export const templateFormStateSchema = formStateSchema.omit({ date: true }).extend({
	label: z.string(),
	pinned: z.boolean(),
});
export type TemplateFormState = z.infer<typeof templateFormStateSchema>;
