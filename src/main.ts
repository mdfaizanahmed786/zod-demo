import { z } from "zod";
const hobbies=["coding","reading","gaming"] as const
const UserSchema = z.object({
  username: z.string(),
  age: z.number().gt(0).optional(), // greater than 0
  date: z.date().optional(),
  isProgrammer: z.boolean().nullable(), // nullable allows us to pass null, whereas nullish allows us to pass null and undefined
  position: z.string().min(5),
  salary: z.number().default(0),
  dish: z.literal("pizza"), // z.literal() is used to check if the value is equal to the value passed in the literal

  hobbies: z.enum(hobbies),

  //   we also many other types like: z.never(), z.unknown(), z.any(), z.null(), z.undefined(), z.void()(returns undefined),  z.unknown()
});
// instead of creating a type we can use z.infer to infer the type from schema
type User = z.infer<typeof UserSchema>;
const user: User = {
  username: "Faizan",
  isProgrammer: null,
  position: "Software",
  salary: 1000,
  dish: "pizza",
  hobbies: "coding", // enum allow us to pass only the values that are passed in the enum
};
// Instead of throwing error it wil return success true or false
console.log(UserSchema.safeParse(user).success); // It wil omit true or false if we use parse it will throw error
console.log(UserSchema.parse(user));

//   some of the validations are:
//   z.string().min(5) // min length
//   z.string().max(5) // max length
//   z.string().email() // email validation
//   z.string().url() // url validation
//   z.string().uuid() // uuid validation
//   z.string().regex(/regex/) // regex validation
//   z.string().nonempty() // non empty string
//   z.string().optional() // optional string
//   z.string().nullable() // nullable string
//   z.string().default("default") // default value

//   z.number().min(5) // min number
//   z.number().max(5) // max number
//   z.number().positive() // positive number
//   z.number().negative() // negative number
//   z.number().int() // integer number
//   z.number().optional() // optional number

//   z.boolean().optional() // optional boolean
