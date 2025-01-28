"use server";

import { revalidatePath } from "next/cache";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

export async function cancelSubscriptionAction(formData: FormData) {
  const subscriptionId = formData.get("subscriptionId") as string;

  if (!subscriptionId) {
    return {
      success: false,
      message: "Subscription ID is required",
    };
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  if (subscription.status !== "active") {
    return {
      success: false,
      message: "Subscription is not active",
    };
  }

  const canceledSubscription = await stripe.subscriptions.cancel(
    subscriptionId
  );

  if (canceledSubscription.status !== "canceled") {
    return {
      success: false,
      message: "Failed to cancel subscription",
    };
  }

  revalidatePath("/dashboard/minha-assinatura");
  return {
    success: true,
    message: "Subscription canceled",
  };
}
