import { ZodError } from "zod";
const e = new ZodError([]);
console.log(e.issues);
