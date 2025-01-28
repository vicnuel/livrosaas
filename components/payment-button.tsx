"use client";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { useCallback } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger, DialogContent, DialogTitle } from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type PaymentButtonProps = {
  children?: React.ReactNode;
};

export default function PaymentButton({ children }: PaymentButtonProps) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
  );

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data.client_secret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">{children || "Assinar agora"}</Button>
      </DialogTrigger>
      {/* permitir scroll */}
      <DialogContent className="w-full h-full overflow-auto">
        <>
          <VisuallyHidden>
            <DialogTitle>Assinatura pro</DialogTitle>
          </VisuallyHidden>
          <div id="checkout">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
}
