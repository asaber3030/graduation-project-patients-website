import { Timestamps } from "./default"

export type User = Timestamps & {
  user_id: number
  name: string
  username: string
  email: string
  password: string
}
