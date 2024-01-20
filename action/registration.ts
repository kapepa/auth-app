import { RegistrationSchema } from "@/schemas"
import * as z from "zod"

const Registration = async (values: z.infer<typeof RegistrationSchema>) => {
  const result = RegistrationSchema.safeParse(values);

  if (!result.success) {
    return {error: "Invalid fields!"}
  } else {
    return {success: "Registration is success"}
  }
}

export { Registration };