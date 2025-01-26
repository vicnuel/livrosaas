"use client";

import Form from "next/form";
import RegisterAction from "@/infra/auth/cadastro/registerAction";
import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(RegisterAction, null);
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
          <Label>Nome</Label>
          <Input type="text" name="name" placeholder="Fulano de Tal" />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" placeholder="eu@exemplo.com" />
        </div>
        <div>
          <Label>Senha</Label>
          <Input type="password" name="password" placeholder="********" />
        </div>
        <div>
          <Button className="w-full mt-6" type="submit" disabled={isPending}>
            Registrar
          </Button>
        </div>
      </Form>
    </>
  );
}
