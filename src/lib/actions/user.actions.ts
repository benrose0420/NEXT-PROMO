'use server'

import { isRedirectError } from 'next/dist/client/components/redirect-error'

import { signInFormSchema, signUpFormSchema } from '../../../validator'
import { signIn, signOut } from '../../../auth'
import { formatError } from '../utils'
// import db from '../../../db/drizzle'
// import { hashSync } from 'bcrypt-ts-edge'

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })
    await signIn('credentials', user)
    return { success: true, message: 'Sig in successfully' }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return { success: false, message: 'Invalid email or password' }
  }
}

export const SignOut = async () => {
  await signOut()
}

// CREATE
export async function signUp(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      confirmPassword: formData.get('confirmPassword'),
      password: formData.get('password'),
    })
    // const values = {
    //   id: crypto.randomUUID(),
    //   ...user,
    //   password: hashSync(user.password, 10),
    // }
    // await db.insert(users).values(values)
    await signIn('credentials', {
      email: user.email,
      password: user.password,
    })
    return { success: true, message: 'User created successfully' }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return {
      success: false,
      message: formatError(error).includes(
        'duplicate key value violates unique constraint "user_email_idx"'
      )
        ? 'Email is already exist'
        : formatError(error),
    }
  }
}