import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"

const zodOpenApi = extendZodWithOpenApi(z)

export const MissionItemSchema = z.object({
  id: z.coerce.number(),
  missionId: z.coerce.number(),
  itemId: z.coerce.number(),
})
