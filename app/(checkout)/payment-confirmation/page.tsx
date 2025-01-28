import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default async function CheckoutReturnPage() {
  return (
    <Card className="max-w-lg mt-10 text-center">
      <CardContent>
        <CardHeader>
          <ShoppingBag className="w-12 h-12 text-primary-500 text-green-500 mx-auto mb-4" />
          <CardTitle>Assinatura confirmada</CardTitle>
          <CardDescription>
            Obrigado por se juntar a nós! Sua assinatura foi confirmada com
            sucesso.
          </CardDescription>
        </CardHeader>
        <div className="text-gray-700 text-sm">
          <p>
            Sua assinatura foi processada com sucesso e sua conta está ativa.
          </p>
          <p>Agora é só aproveitar</p>
          <Link href="/dashboard" className={cn(buttonVariants(), "mt-10")}>
            Ir para dashboard
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
