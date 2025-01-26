"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default async function LoginAction(_prevState: any, formData: FormData) {
  //   console.log(formData);

  if (!formData.get("email") || !formData.get("password")) {
    return {
      success: false,
      message: "Preencha todos os campos.",
    };
  }

  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: true,
      redirectTo: "/dashboard",
    });
    return {
      success: true,
      message: "Login realizado com sucesso.",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof Error && error.name === "CredentialsSignin") {
      return {
        success: false,
        message: "Email ou senha incorretos.",
      };
    }
    console.error(error);
    return {
      success: false,
      message: "Erro inesperado. Tente novamente.",
    };
  }
}
