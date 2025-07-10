import { createAuthClient } from "better-auth/client"
import { BASE_URL } from "../api"


export const authClient =  createAuthClient({baseURL: BASE_URL
})
 

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "google",
        provider: "facebook"
    })
}