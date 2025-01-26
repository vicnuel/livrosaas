"use client";

import Form from "next/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useActionState } from "react";
import LoginAction from "@/infra/auth/login/loginAction";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(LoginAction, null);
  return (
    <>
      {state?.message && (
        <p
          className={`text-sm text-center ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
      <Form
        action={async (data) => {
          // "use server";
          formAction(data);
        }}
      >
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" placeholder="eu@exemplo.com" />
        </div>
        <div>
          <Label>Senha</Label>
          <Input type="password" name="password" placeholder="********" />
        </div>
        <div>
          <Button className="w-full mt-6" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </>
  );
}
