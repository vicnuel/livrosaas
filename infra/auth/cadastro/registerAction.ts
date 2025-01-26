"use server";
import db from "@/lib/db";
import { hashSync } from "bcrypt-ts";
import { redirect } from "next/navigation";

export default async function RegisterAction(
  _prevState: any,
  formData: FormData
) {
  const entries = Array.from(formData.entries());
  //   console.log(entries);
  const data = Object.fromEntries(entries) as {
    name: string;
    email: string;
    password: string;
  };

  if (!data.name || !data.email || !data.password) {
    return {
      success: false,
      message: "Preencha todos os campos.",
    };
  }

  if (data.password.length < 8) {
    return {
      success: false,
      message: "A senha deve ter no mínimo 8 caracteres.",
    };
  }

  // verificar se o email já está cadastrado
  const user = await db.users.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    return {
      success: false,
      message: "Este email já está cadastrado.",
    };
  }

  // criar o usuário
  await db.users.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashSync(data.password),
    },
  });

  return redirect("/");
}
