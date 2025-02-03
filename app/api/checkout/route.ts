import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "O email é obrigatório." },
        { status: 400 }
      );
    }

    // Encontre ou crie um Customer associado ao email
    let customer = await stripe.customers
      .list({
        email: email,
        limit: 1,
      })
      .then((customers) => customers.data[0]);

    if (!customer) {
      customer = await stripe.customers.create({
        email: email,
      });
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      customer: customer.id,
      line_items: [
        {
          quantity: 1,
          price: process.env.STRIPE_PRICE_ID,
        },
      ],
      mode: "subscription",
      payment_method_types: ["card"],
      return_url: `${req.headers.get(
        "origin"
      )}/payment-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
