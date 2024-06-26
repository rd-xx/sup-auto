"use client"

import GenericField from "@/components/forms/GenericField"
import { Button } from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import { type SignUpInput, signUpSchema } from "@/schemas/users"
import { api } from "@/trpc/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { type SubmitHandler, useForm } from "react-hook-form"

const SignUpForm = () => {
  const { mutate } = api.users.signUp.useMutation()
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const router = useRouter()

  const onSubmit: SubmitHandler<SignUpInput> = async (values) => {
    mutate(values, {
      onSuccess: () => {
        void router.push("/auth/sign-in")
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-end gap-6"
      >
        <GenericField name="email" label="Email" type="email" />
        <GenericField name="password" label="Password" type="password" />
        <Button type="submit" className="self-end">
          Sign Up
        </Button>
      </form>
    </Form>
  )
}

export default SignUpForm
