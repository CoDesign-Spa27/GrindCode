 
import { pgTable,text } from "drizzle-orm/pg-core";

export const test=pgTable("testing",{
    id:text("id").notNull().primaryKey(),
    name:text("name"),
})
