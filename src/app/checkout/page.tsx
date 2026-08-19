import { CheckoutClient } from "@/components/checkout/CheckoutClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Secure Checkout",
  description: "Complete your luxury acquisition with insured worldwide courier transit and lifetime authenticity guarantee.",
  path: "/checkout",
});

export default function CheckoutPage() {
  return <CheckoutClient />;
}
