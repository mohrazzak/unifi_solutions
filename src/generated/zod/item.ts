import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"

const zodOpenApi = extendZodWithOpenApi(z)

export const ItemSchema = z.object({
  id: z.coerce.number(),
  name: z.string().default("Item #1"),
  weight: z.number().default(15.4),
})
