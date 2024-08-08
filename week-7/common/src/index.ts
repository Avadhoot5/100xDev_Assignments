import {z} from "zod";

export const InputProps = z.object({
    username: z.string().min(8).max(60).email(),
    password: z.string().min(8).max(60)
  })

export type SignupType = z.infer<typeof InputProps>
