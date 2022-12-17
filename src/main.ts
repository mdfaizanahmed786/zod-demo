import {z} from "zod"

const UserSchema=z.object({
  username:z.string(),
  age:z.number().optional(),
  date:z.date().optional(),
  isProgrammer:z.boolean(),
//   we also many other types like: z.never(), z.unknown(), z.any(), z.null(), z.undefined(), z.void()(returns undefined),  z.unknown() 

})
// instead of creating a type we can use z.infer to infer the type from schema
type User=z.infer<typeof UserSchema>
const user:User={
  username:"Faizan",
  isProgrammer:true
}
console.log(UserSchema.parse(user))
// Instead of throwing error it wil return success true or false
console.log(UserSchema.safeParse(user).success)

