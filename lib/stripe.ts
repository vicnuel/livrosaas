"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

export async function fetchSubscriptionByEmail(email: string) {
  const customers = await stripe.customers.list({
    email: email,
    limit: 1,
    expand: ["data.subscriptions"],
  });

  if (customers.data.length === 0) {
    return null;
  }

  const customer = customers.data[0];

  if (customer.subscriptions?.data.length === 0) {
    return null;
  }

  return customer.subscriptions?.data[0];
}

export async function translateStatus(status: string) {
  switch (status) {
    case "active":
      return "Ativa";
    case "trialing":
      return "Em teste";
    case "past_due":
      return "Atrasada";
    case "unpaid":
      return "Não paga";
    case "canceled":
      return "Cancelada";
    case "incomplete":
      return "Incompleta";
    case "incomplete_expired":
      return "Incompleta expirada";
    case "incomplete":
      return "Incompleta";
    default:
      return status;
  }
}

export async function translateSubscriptionInterval(interval: string) {
  switch (interval) {
    case "month":
      return "Mensal";
    case "year":
      return "Anual";
    default:
      return interval;
  }
}
