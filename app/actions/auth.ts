'use server'

import { signIn, signOut } from "next-auth/react"

export const login = async () => {
    await signIn("credentials", { callbackUrl: "/" });
}

export const logout = async () => {
    await signOut({ callbackUrl: "/" });
}