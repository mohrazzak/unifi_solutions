import * as z from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"
import { $Enums } from "@prisma/client"
import * as imports from "./schemas"
import { MissionStatus } from "./enums"

const zodOpenApi = extendZodWithOpenApi(z)

export const MissionSchema = z.object({
  id: z.coerce.number(),
  status: z.nativeEnum($Enums.MissionStatus),
  moverId: z.coerce.number(),
})
