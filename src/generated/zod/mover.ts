import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"

const zodOpenApi = extendZodWithOpenApi(z)

export const MoverSchema = z.object({
  id: z.coerce.number(),
  energy: z.number().default(14),
  weightLimit: z.number().default(500),
})
