"use server"

import { SignupFormSchema, LoginFormSchema, FormState } from '@/app/_lib/definitions'
import argon2 from 'argon2'
import prisma from '@/app/_lib/client'
import { createSession, deleteSession } from '@/app/_lib/session'
import { redirect } from 'next/navigation'
import { authError } from '@/app/_lib/errors'

export async function userExists(email: string) {
  const count = await prisma.user.count({
    where: {
      email: email
    }
  })
  return Boolean(count)
}

export async function signup(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 2. Prepare data for further tests and insertion into database
  const { name, email, password } = validatedFields.data

  // 3. Check if the username was already registered
  const douplicateEmail = await userExists(email)

  if (douplicateEmail) {
    return {
      errors: {
        name: ["It seams your accounts already exists, try loging in instead."],
        email: [],
        password: []
      },
    }
  }

  // 4. Hash the user's password before storing it
  const hashedPassword = await argon2.hash(password)

  // 5. Insert the user into the database or call an Auth Library's API
  let user = null;
  try {
    user = await prisma.User.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    })
  } catch (error) {
    console.error('Error occurred while creating the user', error)
    return {
      errors: {
        name: ["Error occurred while creating the user"],
        email: [],
        password: []
      },
    }
  }

  // 6. Create user session
  await createSession(user.id)

  // 7. Redirect user
  redirect('/dashboard')
}

export async function login(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 2. Get the user from the database
  const { email, password } = validatedFields.data
  
  let user: {id: string, password: string} = {id: '', password: ''};

  // 3. Get the users id and hashed password from the DB
  try {
    user = await prisma.User.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true
      },
    })
  } catch (error) {
    console.error('error fetching user from db', error)
    return {
      errors: authError,
    }
  }

  /**
   * For security reasons, if no user was found,
   * we return the message that wrong username or password was used
   */
  if (!user) {
    return {
      errors: authError,
    }
  }

  // 3. Verify password from the request with the stored password from the DB
  const passwordValid = await argon2.verify(user.password, password)

  // Same thing as for the user
  if (!passwordValid) {
    return {
      errors: authError,
    }
  }
  
  // 4. Create user session
  await createSession(user.id)

  // 5. Redirect user
  redirect('/dashboard')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}