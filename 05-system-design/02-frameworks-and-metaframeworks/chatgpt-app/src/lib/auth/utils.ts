import { cookies } from "next/headers"
import { USER_ID_COOKIE } from "./constants"

export const getUserIdFromCookie = async () => {
    const cookieStore = await cookies()
    return +(cookieStore.get(USER_ID_COOKIE)?.value ?? NaN)
  }