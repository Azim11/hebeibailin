"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CreditCard,
  HelpCircle,
  Lock,
  Package,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Tag,
  Truck,
  Building,
} from "lucide-react";
import { formatPrice } from "@/lib/format";
import { useCatalogue } from "@/store/catalogue";
import { useShop } from "@/store/shop";
import { site } from "@/lib/data/site";
import type { ProductSummary } from "@/lib/types";

type ShippingMethod = "complimentary" | "whiteglove";
type PaymentMethod = "card" | "applepay" | "wire" | "installments";

const countries = [
  "United States",
  "United Kingdom",
  "France",
  "Germany",
  "Italy",
  "Switzerland",
  "Japan",
  "United Arab Emirates",
  "Singapore",
  "Canada",
  "Australia",
  "Hong Kong SAR",
  "South Korea",
  "Monaco",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Sweden",
  "Netherlands",
  "China",
];

export function CheckoutClient() {
  const router = useRouter();
  const { cart, clearCart, addToCart, hydrated } = useShop();
  const { byId, products } = useCatalogue();
  const [isPending, startTransition] = useTransition();

  // Multi-step state: 1 = Contact & Address, 2 = Shipping Method, 3 = Payment
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("United States");
  const [phone, setPhone] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");

  // Shipping & Payment selection
  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>("complimentary");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  // Simulated card details
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");

  // Billing address
  const [sameBilling, setSameBilling] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Promo code
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountPercent?: number;
    discountAmount?: number;
  } | null>(null);
  const [promoError, setPromoError] = useState("");

  // Processing state simulation
  const [processingState, setProcessingState] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const lines = cart
    .map((line) => ({ product: byId(line.productId), quantity: line.quantity }))
    .filter((entry): entry is { product: ProductSummary; quantity: number } =>
      Boolean(entry.product),
    );

  const subtotal = lines.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0,
  );

  const shippingCost = shippingMethod === "whiteglove" ? 150 : 0;

  const discountValue = appliedPromo
    ? appliedPromo.discountPercent
      ? Math.round((subtotal * appliedPromo.discountPercent) / 100)
      : appliedPromo.discountAmount ?? 0
    : 0;

  const total = Math.max(0, subtotal - discountValue + shippingCost);

  // Demo auto-fill helpers
  const handleAutoFillAddress = () => {
    setEmail("alexandra.vance@example.com");
    setFirstName("Alexandra");
    setLastName("Vance");
    setCompany("Vance Curation");
    setAddress1("450 Park Avenue");
    setAddress2("Suite 24B");
    setCity("New York");
    setStateProvince("NY");
    setPostcode("10022");
    setCountry("United States");
    setPhone("+1 (212) 555-0198");
  };

  const handleAutoFillCard = () => {
    setCardNumber("4242 •••• •••• 4242");
    setCardExpiry("12/28");
    setCardCvc("739");
    setCardName(firstName && lastName ? `${firstName} ${lastName}` : "Alexandra Vance");
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === "WELCOME10" || code === "LUXE10") {
      setAppliedPromo({ code, discountPercent: 10 });
      setPromoCode("");
    } else if (code === "BAILIN1000" || code === "VIP1000") {
      setAppliedPromo({ code, discountAmount: 1000 });
      setPromoCode("");
    } else {
      setPromoError("Invalid promotional code. Try 'WELCOME10' for 10% off.");
    }
  };

  const handleProceedToShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!email || !firstName || !lastName || !address1 || !city || !postcode || !phone) {
      setErrorMessage("Please fill in all required contact and shipping fields.");
      return;
    }
    setStep(2);
  };

  const handleProceedToPayment = () => {
    setStep(3);
    if (!cardName) {
      setCardName(`${firstName} ${lastName}`);
    }
  };

  const handleCompleteOrder = async () => {
    if (!agreeTerms) {
      setErrorMessage("Please accept the terms and condition requirements to proceed.");
      return;
    }

    setErrorMessage("");
    setProcessingState("Securing 256-bit encrypted connection...");

    // Simulated 3-stage luxury acquisition processing
    setTimeout(() => {
      setProcessingState("Conducting physical allocation & serial validation...");
    }, 900);

    setTimeout(() => {
      setProcessingState("Generating Certificate of Authenticity & Order Reference...");
    }, 1800);

    setTimeout(() => {
      const orderRef = `HB-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

      // Save simulated order to localStorage for order confirmation & persistence
      const newOrder = {
        orderId: orderRef,
        placedAt: new Date().toISOString(),
        customer: {
          name: `${firstName} ${lastName}`,
          email,
          phone,
          address: `${address1}${address2 ? `, ${address2}` : ""}, ${city}, ${stateProvince} ${postcode}, ${country}`,
        },
        shippingMethod:
          shippingMethod === "whiteglove"
            ? "White-Glove Armored Courier"
            : "Insured Priority Express (DHL/FedEx)",
        paymentMethod:
          paymentMethod === "card"
            ? `Credit Card (•••• ${cardNumber.slice(-4) || "4242"})`
            : paymentMethod === "applepay"
            ? "Apple Pay"
            : paymentMethod === "wire"
            ? "Private Wire Transfer / Escrow"
            : "4x Luxury Installments",
        items: lines.map(({ product, quantity }) => ({
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          quantity,
          sku: product.sku,
          image: product.images[0]?.url,
        })),
        subtotal,
        discount: discountValue,
        shippingCost,
        total,
        currency: "USD",
      };

      try {
        const existingRaw = window.localStorage.getItem("mr.orders.v1");
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        window.localStorage.setItem(
          "mr.orders.v1",
          JSON.stringify([newOrder, ...existing]),
        );
        window.localStorage.setItem("mr.latest_order.v1", JSON.stringify(newOrder));
      } catch {
        // storage fallback
      }

      // Clear the cart
      clearCart();

      // Redirect to Order Success screen
      startTransition(() => {
        router.push(`/checkout/success?orderId=${orderRef}`);
      });
    }, 2800);
  };

  const handleAddSamplePiece = () => {
    const sample = products[0] || { id: "prd-001" };
    addToCart(sample.id, 1);
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="size-6 animate-spin border-2 border-champagne border-t-transparent" />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <div className="mx-auto flex size-16 items-center justify-center border border-line bg-warm text-taupe">
          <Package className="size-7" />
        </div>
        <h1 className="mt-6 font-serif text-3xl text-ink">Your bag is empty</h1>
        <p className="mt-3 font-sans text-[0.875rem] leading-relaxed text-stone">
          There are no pieces currently in your checkout bag.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/collections/handbags"
            className="inline-flex items-center gap-2 border border-ink bg-ink px-8 py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ivory hover:bg-charcoal transition-colors"
          >
            Explore Collection
            <ArrowRight className="size-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleAddSamplePiece}
            className="inline-flex items-center gap-2 border border-line bg-warm/60 px-6 py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ink hover:bg-warm transition-colors"
          >
            + Add Sample Handbag to Test Checkout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory py-10 lg:py-16">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* Checkout Header / Steps Indicator */}
        <div className="border-b border-line pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 font-sans text-[0.75rem] tracking-luxe text-taupe uppercase hover:text-ink transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Return to Bag
            </Link>

            <div className="flex items-center gap-2 font-sans text-[0.6875rem] tracking-luxe text-stone uppercase">
              <Lock className="size-3.5 text-champagne" />
              <span>Simulated 256-Bit Encrypted Acquisition</span>
            </div>
          </div>

          {/* Stepper */}
          <div className="mt-8 flex items-center gap-3 sm:gap-6 font-sans text-[0.75rem] tracking-luxe uppercase">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`flex items-center gap-2 transition-colors ${
                step >= 1 ? "text-ink font-medium" : "text-taupe"
              }`}
            >
              <span
                className={`flex size-6 items-center justify-center rounded-full text-xs ${
                  step > 1
                    ? "bg-ink text-ivory"
                    : step === 1
                    ? "border border-ink bg-warm text-ink"
                    : "border border-line text-taupe"
                }`}
              >
                {step > 1 ? <Check className="size-3" /> : "1"}
              </span>
              <span>Delivery</span>
            </button>

            <span className="h-px w-6 sm:w-12 bg-line" />

            <button
              type="button"
              onClick={() => {
                if (email && firstName && address1) setStep(2);
              }}
              className={`flex items-center gap-2 transition-colors ${
                step >= 2 ? "text-ink font-medium" : "text-taupe"
              }`}
            >
              <span
                className={`flex size-6 items-center justify-center rounded-full text-xs ${
                  step > 2
                    ? "bg-ink text-ivory"
                    : step === 2
                    ? "border border-ink bg-warm text-ink"
                    : "border border-line text-taupe"
                }`}
              >
                {step > 2 ? <Check className="size-3" /> : "2"}
              </span>
              <span>Shipping</span>
            </button>

            <span className="h-px w-6 sm:w-12 bg-line" />

            <button
              type="button"
              onClick={() => {
                if (email && firstName && address1) setStep(3);
              }}
              className={`flex items-center gap-2 transition-colors ${
                step === 3 ? "text-ink font-medium" : "text-taupe"
              }`}
            >
              <span
                className={`flex size-6 items-center justify-center rounded-full text-xs ${
                  step === 3
                    ? "border border-ink bg-warm text-ink"
                    : "border border-line text-taupe"
                }`}
              >
                3
              </span>
              <span>Payment</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Forms on Left, Order Summary on Right */}
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_460px] lg:gap-16">
          {/* Left Column: Multi-Step Forms */}
          <div>
            {/* STEP 1: CONTACT & DELIVERY ADDRESS */}
            {step === 1 && (
              <form onSubmit={handleProceedToShipping} className="flex flex-col gap-10">
                {/* Header & Quick Fill Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
                  <h2 className="font-serif text-2xl text-ink">
                    1. Contact &amp; Delivery Information
                  </h2>
                  <button
                    type="button"
                    onClick={handleAutoFillAddress}
                    className="inline-flex items-center gap-1.5 border border-champagne/60 bg-warm px-3.5 py-1.5 font-sans text-[0.6875rem] tracking-luxe uppercase text-champagne hover:bg-champagne hover:text-ivory transition-colors"
                  >
                    <Sparkles className="size-3" />
                    Fill Demo Client
                  </button>
                </div>

                {/* Contact section */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                    >
                      Email Address for Order Confirmation *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@luxuryvault.com"
                      className="border border-line bg-warm/30 px-4 py-3 font-sans text-[0.9375rem] text-ink focus:border-champagne focus:bg-ivory focus:outline-none transition-colors"
                    />
                  </div>

                  <label className="flex items-center gap-2.5 font-sans text-[0.8125rem] text-stone cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                      className="size-4 accent-ink"
                    />
                    <span>
                      Keep me updated with private VIP releases and provenance notes
                    </span>
                  </label>
                </div>

                {/* Delivery Address */}
                <div className="flex flex-col gap-5 border-t border-line pt-8">
                  <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
                    Delivery Destination
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="first-name"
                        className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                      >
                        First Name *
                      </label>
                      <input
                        id="first-name"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Alexandra"
                        className="border border-line bg-warm/30 px-4 py-3 font-sans text-[0.9375rem] text-ink focus:border-champagne focus:bg-ivory focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="last-name"
                        className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                      >
                        Last Name *
                      </label>
                      <input
                        id="last-name"
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Vance"
                        className="border border-line bg-warm/30 px-4 py-3 font-sans text-[0.9375rem] text-ink focus:border-champagne focus:bg-ivory focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="company"
                      className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                    >
                      Company / Private Suite (Optional)
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Vance Curation / Residence"
                      className="border border-line bg-warm/30 px-4 py-3 font-sans text-[0.9375rem] text-ink focus:border-champagne focus:bg-ivory focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="address1"
                      className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                    >
                      Street Address *
                    </label>
                    <input
                      id="address1"
                      type="text"
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      placeholder="450 Park Avenue"
                      className="border border-line bg-warm/30 px-4 py-3 font-sans text-[0.9375rem] text-ink focus:border-champagne focus:bg-ivory focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="address2"
                      className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                    >
                      Apartment, Penthouse, Suite (Optional)
                    </label>
                    <input
                      id="address2"
                      type="text"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                      placeholder="Suite 24B"
                      className="border border-line bg-warm/30 px-4 py-3 font-sans text-[0.9375rem] text-ink focus:border-champagne focus:bg-ivory focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="city"
                        className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                      >
                        City *
                      </label>
                      <input
                        id="city"
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="New York"
                        className="border border-line bg-warm/30 px-4 py-3 font-sans text-[0.9375rem] text-ink focus:border-champagne focus:bg-ivory focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="state"
                        className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                      >
                        State / Province
                      </label>
                      <input
                        id="state"
                        type="text"
                        value={stateProvince}
                        onChange={(e) => setStateProvince(e.target.value)}
                        placeholder="NY"
                        className="border border-line bg-warm/30 px-4 py-3 font-sans text-[0.9375rem] text-ink focus:border-champagne focus:bg-ivory focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="postcode"
                        className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                      >
                        Postal Code *
                      </label>
                      <input
                        id="postcode"
                        type="text"
                        required
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        placeholder="10022"
                        className="border border-line bg-warm/30 px-4 py-3 font-sans text-[0.9375rem] text-ink focus:border-champagne focus:bg-ivory focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="country"
                        className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                      >
                        Country / Territory *
                      </label>
                      <select
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="border border-line bg-warm/30 px-4 py-3 font-sans text-[0.9375rem] text-ink focus:border-champagne focus:bg-ivory focus:outline-none transition-colors"
                      >
                        {countries.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="phone"
                        className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                      >
                        Telephone (Courier Signature Required) *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (212) 555-0198"
                        className="border border-line bg-warm/30 px-4 py-3 font-sans text-[0.9375rem] text-ink focus:border-champagne focus:bg-ivory focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {errorMessage ? (
                  <p className="border border-red-200 bg-red-50 p-4 font-sans text-xs text-red-700">
                    {errorMessage}
                  </p>
                ) : null}

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 border border-ink bg-ink px-10 py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ivory hover:bg-charcoal transition-colors"
                  >
                    Continue to Shipping Method
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: SHIPPING METHOD */}
            {step === 2 && (
              <div className="flex flex-col gap-10">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <h2 className="font-serif text-2xl text-ink">
                    2. Select Shipping Method
                  </h2>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="font-sans text-[0.6875rem] tracking-luxe uppercase text-champagne hover:underline"
                  >
                    Edit Address
                  </button>
                </div>

                {/* Recipient summary pill */}
                <div className="border border-line bg-warm/40 p-4 flex flex-col gap-1 font-sans text-[0.8125rem]">
                  <p className="text-stone">
                    <strong className="text-ink font-serif text-sm">Recipient:</strong>{" "}
                    {firstName} {lastName} ({email})
                  </p>
                  <p className="text-stone">
                    <strong className="text-ink font-serif text-sm">Ship to:</strong>{" "}
                    {address1} {address2 ? `, ${address2}` : ""}, {city},{" "}
                    {stateProvince} {postcode}, {country}
                  </p>
                </div>

                {/* Shipping Radio Options */}
                <div className="flex flex-col gap-4">
                  <label
                    onClick={() => setShippingMethod("complimentary")}
                    className={`flex items-start justify-between gap-4 border p-6 cursor-pointer transition-all ${
                      shippingMethod === "complimentary"
                        ? "border-ink bg-warm/50"
                        : "border-line bg-ivory hover:border-taupe"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === "complimentary"}
                        onChange={() => setShippingMethod("complimentary")}
                        className="mt-1 size-4 accent-ink"
                      />
                      <div>
                        <p className="font-serif text-lg text-ink">
                          Insured Express Priority (DHL / FedEx)
                        </p>
                        <p className="mt-1 font-sans text-[0.8125rem] leading-relaxed text-stone">
                          Estimated 2 — 4 Business Days. 100% full replacement value transit
                          insurance with tamper-evident seal and mandatory adult signature.
                        </p>
                      </div>
                    </div>
                    <span className="font-sans text-[0.75rem] tracking-luxe uppercase text-champagne font-medium whitespace-nowrap">
                      Complimentary
                    </span>
                  </label>

                  <label
                    onClick={() => setShippingMethod("whiteglove")}
                    className={`flex items-start justify-between gap-4 border p-6 cursor-pointer transition-all ${
                      shippingMethod === "whiteglove"
                        ? "border-ink bg-warm/50"
                        : "border-line bg-ivory hover:border-taupe"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === "whiteglove"}
                        onChange={() => setShippingMethod("whiteglove")}
                        className="mt-1 size-4 accent-ink"
                      />
                      <div>
                        <p className="font-serif text-lg text-ink">
                          White-Glove Armored / Dedicated Courier
                        </p>
                        <p className="mt-1 font-sans text-[0.8125rem] leading-relaxed text-stone">
                          Estimated 1 — 2 Business Days. Dedicated personal logistics
                          officer, custom appointment delivery window, unboxed inspection.
                        </p>
                      </div>
                    </div>
                    <span className="font-sans text-[0.875rem] text-ink font-medium whitespace-nowrap">
                      $150
                    </span>
                  </label>
                </div>

                {/* Concierge Delivery Notes */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="notes"
                    className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                  >
                    Concierge Instructions &amp; Delivery Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="e.g. Please hold at carrier depot for private pickup, or specific concierge gate code..."
                    className="border border-line bg-warm/30 p-3 font-sans text-[0.875rem] text-ink focus:border-champagne focus:bg-ivory focus:outline-none resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between border-t border-line pt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 font-sans text-[0.75rem] tracking-luxe uppercase text-taupe hover:text-ink transition-colors"
                  >
                    <ArrowLeft className="size-3.5" />
                    Back to Address
                  </button>

                  <button
                    type="button"
                    onClick={handleProceedToPayment}
                    className="inline-flex items-center gap-2 border border-ink bg-ink px-10 py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ivory hover:bg-charcoal transition-colors"
                  >
                    Continue to Payment
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT & CONFIRMATION */}
            {step === 3 && (
              <div className="flex flex-col gap-10">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
                  <h2 className="font-serif text-2xl text-ink">
                    3. Payment &amp; Finalization
                  </h2>
                  <button
                    type="button"
                    onClick={handleAutoFillCard}
                    className="inline-flex items-center gap-1.5 border border-champagne/60 bg-warm px-3.5 py-1.5 font-sans text-[0.6875rem] tracking-luxe uppercase text-champagne hover:bg-champagne hover:text-ivory transition-colors"
                  >
                    <Sparkles className="size-3" />
                    Fill Test Card Details
                  </button>
                </div>

                {/* Payment method selector tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex flex-col items-center justify-center gap-2 border p-4 font-sans text-[0.6875rem] tracking-luxe uppercase transition-all ${
                      paymentMethod === "card"
                        ? "border-ink bg-ink text-ivory"
                        : "border-line bg-warm/40 text-stone hover:border-taupe"
                    }`}
                  >
                    <CreditCard className="size-4" />
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("applepay")}
                    className={`flex flex-col items-center justify-center gap-2 border p-4 font-sans text-[0.6875rem] tracking-luxe uppercase transition-all ${
                      paymentMethod === "applepay"
                        ? "border-ink bg-ink text-ivory"
                        : "border-line bg-warm/40 text-stone hover:border-taupe"
                    }`}
                  >
                    <span className="font-serif text-sm"> Pay</span>
                    Apple / G-Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("wire")}
                    className={`flex flex-col items-center justify-center gap-2 border p-4 font-sans text-[0.6875rem] tracking-luxe uppercase transition-all ${
                      paymentMethod === "wire"
                        ? "border-ink bg-ink text-ivory"
                        : "border-line bg-warm/40 text-stone hover:border-taupe"
                    }`}
                  >
                    <Building className="size-4" />
                    Wire / Escrow
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("installments")}
                    className={`flex flex-col items-center justify-center gap-2 border p-4 font-sans text-[0.6875rem] tracking-luxe uppercase transition-all ${
                      paymentMethod === "installments"
                        ? "border-ink bg-ink text-ivory"
                        : "border-line bg-warm/40 text-stone hover:border-taupe"
                    }`}
                  >
                    <span className="font-serif text-sm font-bold">4×</span>
                    Installments
                  </button>
                </div>

                {/* Payment Option Forms */}
                {paymentMethod === "card" && (
                  <div className="border border-line bg-warm/30 p-6 flex flex-col gap-5">
                    <div className="flex items-center justify-between border-b border-line pb-3">
                      <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
                        Encrypted Card Details (Simulated)
                      </p>
                      <span className="font-sans text-xs text-taupe">
                        Visa · Mastercard · Amex
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="card-number"
                        className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                      >
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          id="card-number"
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4242 •••• •••• 4242"
                          className="w-full border border-line bg-ivory px-4 py-3 font-sans text-[0.9375rem] text-ink focus:border-champagne focus:outline-none"
                        />
                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-taupe" />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="card-expiry"
                          className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                        >
                          Expiration Date (MM/YY)
                        </label>
                        <input
                          id="card-expiry"
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="12/28"
                          className="border border-line bg-ivory px-4 py-3 font-sans text-[0.9375rem] text-ink focus:border-champagne focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="card-cvc"
                          className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                        >
                          Security Code (CVC)
                        </label>
                        <input
                          id="card-cvc"
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="739"
                          className="border border-line bg-ivory px-4 py-3 font-sans text-[0.9375rem] text-ink focus:border-champagne focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="card-name"
                        className="font-sans text-[0.6875rem] tracking-luxe uppercase text-stone"
                      >
                        Name on Card
                      </label>
                      <input
                        id="card-name"
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Alexandra Vance"
                        className="border border-line bg-ivory px-4 py-3 font-sans text-[0.9375rem] text-ink focus:border-champagne focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "applepay" && (
                  <div className="border border-line bg-warm/30 p-8 text-center flex flex-col items-center gap-4">
                    <p className="font-serif text-xl text-ink">
                      One-Touch Biometric Authorization
                    </p>
                    <p className="max-w-md font-sans text-[0.8125rem] text-stone">
                      Click the button below to authorize simulated payment with Touch ID /
                      Face ID through your connected device wallet.
                    </p>
                    <div className="mt-2 flex h-14 w-full max-w-sm items-center justify-center rounded-xs bg-ink font-serif text-lg text-ivory">
                       Pay {formatPrice(total)}
                    </div>
                  </div>
                )}

                {paymentMethod === "wire" && (
                  <div className="border border-line bg-warm/30 p-6 flex flex-col gap-4">
                    <p className="font-serif text-lg text-ink">
                      Concierge Wire Transfer &amp; Escrow
                    </p>
                    <p className="font-sans text-[0.8125rem] leading-relaxed text-stone">
                      Upon completing your request, our private concierge will immediately
                      reserve your piece for 48 hours and send official wire instructions and
                      escrow verification details to <strong>{email}</strong>.
                    </p>
                  </div>
                )}

                {paymentMethod === "installments" && (
                  <div className="border border-line bg-warm/30 p-6 flex flex-col gap-4">
                    <p className="font-serif text-lg text-ink">
                      Luxury 4-Payment Plan (0% APR)
                    </p>
                    <p className="font-sans text-[0.8125rem] leading-relaxed text-stone">
                      Pay 4 interest-free installments of{" "}
                      <strong>{formatPrice(Math.round(total / 4))}</strong> every 2 weeks.
                      Your bag will be authenticated and dispatched upon initial confirmation.
                    </p>
                  </div>
                )}

                {/* Terms Agreement */}
                <div className="flex flex-col gap-3 border-t border-line pt-6">
                  <label className="flex items-start gap-3 font-sans text-[0.8125rem] text-stone cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-1 size-4 accent-ink"
                    />
                    <span>
                      I understand that each bag includes a serialized security tag and is
                      protected by a 14-day return window. I agree to the{" "}
                      <Link href="/pages/terms" target="_blank" className="underline text-ink">
                        Terms &amp; Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/pages/privacy" target="_blank" className="underline text-ink">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                </div>

                {errorMessage ? (
                  <p className="border border-red-200 bg-red-50 p-4 font-sans text-xs text-red-700">
                    {errorMessage}
                  </p>
                ) : null}

                {/* Submit button / loading state */}
                <div className="flex items-center justify-between border-t border-line pt-6">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={Boolean(processingState)}
                    className="inline-flex items-center gap-2 font-sans text-[0.75rem] tracking-luxe uppercase text-taupe hover:text-ink transition-colors disabled:opacity-50"
                  >
                    <ArrowLeft className="size-3.5" />
                    Back to Shipping
                  </button>

                  <button
                    type="button"
                    onClick={handleCompleteOrder}
                    disabled={Boolean(processingState)}
                    className="inline-flex min-h-[56px] min-w-[240px] items-center justify-center gap-3 border border-ink bg-ink px-10 py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ivory hover:bg-charcoal transition-all disabled:cursor-wait disabled:bg-charcoal"
                  >
                    {processingState ? (
                      <>
                        <div className="size-4 animate-spin border-2 border-champagne border-t-transparent" />
                        <span className="text-xs normal-case">{processingState}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="size-3.5 text-champagne" />
                        <span>Place Order · {formatPrice(total)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Order Summary */}
          <div>
            <div className="sticky top-28 border border-line bg-warm/60 p-6 sm:p-8">
              <h3 className="font-serif text-xl text-ink">Order Summary</h3>

              {/* Items List */}
              <div className="mt-6 flex flex-col divide-y divide-line/60 border-y border-line">
                {lines.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-4 py-4">
                    <div className="relative aspect-4/5 w-16 shrink-0 overflow-hidden bg-warm border border-line">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : null}
                      <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-ink text-[0.625rem] text-ivory font-sans">
                        {quantity}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="font-sans text-[0.5625rem] tracking-luxe uppercase text-champagne">
                          {product.brand}
                        </p>
                        <p className="font-serif text-base text-ink line-clamp-1">
                          {product.name}
                        </p>
                        <p className="font-sans text-xs text-stone">
                          {product.condition} · {product.color}
                        </p>
                      </div>
                      <p className="font-serif text-base text-ink">
                        {formatPrice(product.price * quantity, product.currency)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo input */}
              <form onSubmit={handleApplyPromo} className="mt-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo (e.g. WELCOME10)"
                    className="w-full border border-line bg-ivory px-3.5 py-2 font-sans text-xs uppercase text-ink placeholder:normal-case placeholder:text-taupe focus:border-champagne focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="border border-ink bg-warm px-3.5 py-2 font-sans text-[0.6875rem] tracking-luxe uppercase text-ink hover:bg-ink hover:text-ivory transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError ? (
                  <p className="mt-1.5 font-sans text-xs text-red-600">{promoError}</p>
                ) : null}
                {appliedPromo ? (
                  <p className="mt-1.5 flex items-center gap-1 font-sans text-xs text-emerald-700">
                    <Check className="size-3" />
                    Code {appliedPromo.code} applied (-{formatPrice(discountValue)})
                  </p>
                ) : null}
              </form>

              {/* Calculations */}
              <div className="mt-6 flex flex-col gap-3 border-t border-line pt-4 font-sans text-[0.8125rem]">
                <div className="flex justify-between text-stone">
                  <span>Subtotal</span>
                  <span className="text-ink font-medium">{formatPrice(subtotal)}</span>
                </div>

                {appliedPromo ? (
                  <div className="flex justify-between text-stone">
                    <span className="text-champagne">Discount</span>
                    <span className="text-champagne font-medium">
                      -{formatPrice(discountValue)}
                    </span>
                  </div>
                ) : null}

                <div className="flex justify-between text-stone">
                  <span>Insured Shipping</span>
                  <span className="text-ink">
                    {shippingCost === 0 ? "Complimentary" : formatPrice(shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between text-stone">
                  <span>Taxes &amp; Customs Duties</span>
                  <span className="text-taupe uppercase text-[0.6875rem] tracking-luxe">
                    Included / $0
                  </span>
                </div>

                <div className="flex justify-between border-t border-line pt-4 text-base">
                  <span className="font-serif text-lg text-ink">Total Due</span>
                  <span className="font-serif text-2xl text-ink">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Assurance list */}
              <div className="mt-8 flex flex-col gap-3 border-t border-line/60 pt-6">
                <div className="flex items-center gap-2.5 font-sans text-xs text-stone">
                  <ShieldCheck className="size-4 text-champagne shrink-0" />
                  <span>100% Lifetime Money-Back Authenticity Guarantee</span>
                </div>
                <div className="flex items-center gap-2.5 font-sans text-xs text-stone">
                  <RotateCcw className="size-4 text-champagne shrink-0" />
                  <span>14-Day Evaluation with Security Ribbon</span>
                </div>
                <div className="flex items-center gap-2.5 font-sans text-xs text-stone">
                  <Truck className="size-4 text-champagne shrink-0" />
                  <span>100% Insured DHL / FedEx Courier Transit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
