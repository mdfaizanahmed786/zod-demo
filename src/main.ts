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
}).partial();  //.partial() allows us to make all the values optional



// instead of creating a type we can use z.infer to infer the type from schema
type User = z.infer<typeof UserSchema>;
const user: User = {
  username: "Faizan",
  isProgrammer: null,
//   position: "Software",
  salary: 1000,
  dish: "pizza",
  hobbies: "coding", // enum allow us to pass only the values that are passed in the enum
};
// Instead of throwing error it wil return success true or false
console.log(UserSchema.safeParse(user).success); // It wil omit true or false if we use parse it will throw error
console.log(UserSchema.parse(user));
// Working with objects
// UserSchema.shape gives us the shape of the object which includes the type of the object
console.log(UserSchema.shape)
console.log(UserSchema.shape.username)

// USE CASES:

//1. Pick matching
// const BlogSchema = z.object({
//     title:z.string(),
//     description:z.string(),
//     date:z.date(),

  
//2.     //   we also many other types like: z.never(), z.unknown(), z.any(), z.null(), z.undefined(), z.void()(returns undefined),  z.unknown()
//   }).pick({title:true});  //.pick() allows us to pick the properties that we want to use
//   type Blog=z.infer<typeof BlogSchema>
// when we hover Blog it only gives us the title property which is is specified in pick method.






//3. Omiting the properties
//  const BlogSchema = z.object({
//         title:z.string(),
//         description:z.string(),
//         date:z.date(),
//       }).omit({title:true});  //.omit() allows us to omit the value provided in the method.
//       type Blog=z.infer<typeof BlogSchema>



//4. Extending the schema
// const BlogSchema = z.object({
//     title:z.string(),
//     description:z.string(),
//     date:z.date(),
// }).extend({comments:z.string().optional()}) // .extend() allows us to extend the schema
// type Blog=z.infer<typeof BlogSchema >



//5. Merging the schema
// const BlogSchema = z.object({
//     title:z.string(),
//     description:z.string(),
//     date:z.date()
// }).merge(z.object({comments:z.string()})) // .merge() allows us to merge the schema  
// type Blog=z.infer<typeof BlogSchema >                                                  





// 6. What if we create an object that has a property that is not in the schema
// const BlogSchema = z.object({
//     title:z.string(),
//     description:z.string(),
//     date:z.date()
// }).strict()
// const BlogSchema = z.object({
//     title:z.string(),
//     description:z.string(),
//     date:z.date()
// }).passthrough()

// type Blog=z.infer<typeof BlogSchema >
// const blog:Blog={
//     title:"Hello",
//     description:"Hello world",
//     date:new Date(),
//     comments:"Hello world"
// }
// console.log(BlogSchema.safeParse(blog).success) // it will return true but it will not include the comments property in the type Blog
// If we want to avoid it we can use .strict() method: It will throw an error if we pass a property that is not in the schema
// If we want to avoid it we can use .passthrough() method: It will not throw an error if we pass a property that is not in the schema


// Arrays im zod

const BlogSchema = z.object({
    title:z.string(),
    description:z.string(),
    date:z.date(),
    comments:z.array(z.string()).nonempty() // .nonempty() allows us to make sure that the array is not empty
}).strict()
type Blog=z.infer<typeof BlogSchema >


console.log(BlogSchema.shape.comments.element)
const blog:Blog={
    title:"Hello",
    description:"Hello world",
    date:new Date(),
    comments:["Hello world"]
}  // returns the type inside the array


















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
