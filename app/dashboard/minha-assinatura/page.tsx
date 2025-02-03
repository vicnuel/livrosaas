import { auth } from "@/auth";
import BannerWarning from "@/components/banner-warning";
import PricingCard from "@/components/pricing-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cancelSubscriptionAction } from "@/infra/subscription/cancelSubscriptionAction";
import {
  fetchSubscriptionByEmail,
  translateStatus,
  translateSubscriptionInterval,
} from "@/lib/stripe";
import { CreditCard, XCircle } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import Stripe from "stripe";

export default async function MySubscription() {
  const session = await auth();
  const userEmail = session?.user?.email || "";

  const subscription = await fetchSubscriptionByEmail(userEmail);
  if (!subscription) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-6">Minha Assinatura</h1>
        <BannerWarning text="Para acessar sua assinatura, você precisa de uma assinatura ativa. Quer tal assinar agora?" />
        <PricingCard />
      </>
    );
  }
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Minha Assinatura</h1>
      <div className="flex gap-10 flex-col md:flex-row">
        <PlanCard subscription={subscription} />
        <ActionCard subscription={subscription} />
      </div>
    </>
  );
}

function PlanCard({ subscription }: { subscription: Stripe.Subscription }) {
  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>Detalhes da Assinatura</CardTitle>
        <CardDescription>Informações sobre seu plano atual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Plano:</span>
            <span>{subscription.items.data[0].price.nickname} </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ID:</span>
            <span className="text-sm">{subscription.id} </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span
              className={`text-${
                subscription.status === "active" ? "green" : "red"
              }-600`}
            >
              {translateStatus(subscription.status)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Próxima cobrança:</span>
            <span>
              {new Date(
                subscription.current_period_end * 1000
              ).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Valor:</span>
            <span>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(
                (subscription.items.data[0].price.unit_amount ?? 0) / 100
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ciclo:</span>
            <span>
              {translateSubscriptionInterval(
                subscription.items.data[0].price.recurring?.interval ?? ""
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionCard({ subscription }: { subscription: Stripe.Subscription }) {
  return (
    <Card className="w-full max-w-sm h-full">
      <CardHeader>
        <CardTitle>Ações</CardTitle>
        <CardDescription>Gerencie sua assinatura</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Link
            target="_blank"
            href={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_URL ?? ""}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <CreditCard className="mr-2 h-5 w-5 text-gray-400" />
            Atualizar método de pagamento
          </Link>
          <Form action={cancelSubscriptionAction}>
            <input
              type="hidden"
              name="subscriptionId"
              value={subscription?.id ?? ""}
            />
            <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <XCircle className="mr-2 h-5 w-5" />
              Cancelar assinatura
            </button>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
