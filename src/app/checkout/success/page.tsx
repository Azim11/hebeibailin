"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  Mail,
  Package,
  Phone,
  Printer,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/data/site";

type OrderRecord = {
  orderId: string;
  placedAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  shippingMethod: string;
  paymentMethod: string;
  items: {
    id: string;
    name: string;
    brand: string;
    price: number;
    quantity: number;
    sku: string;
    image?: string;
  }[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  currency: string;
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderIdFromUrl = searchParams.get("orderId");
  const [order, setOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("mr.latest_order.v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        setOrder(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const orderId = orderIdFromUrl || order?.orderId || "HB-2026-84920";
  const customerName = order?.customer.name || "Valued Collector";
  const customerEmail = order?.customer.email || site.email;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="bg-ivory py-12 lg:py-20">
      <Container size="wide">
        {/* Top Celebration Banner */}
        <div className="border border-line bg-warm/80 p-8 text-center sm:p-12 lg:p-16">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-ink text-champagne">
            <CheckCircle2 className="size-8" />
          </div>
          <p className="mt-6 font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
            Acquisition Confirmed
          </p>
          <h1 className="mt-2 font-serif text-[2.25rem] text-ink sm:text-[3rem]">
            Thank You, {customerName}
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-sans text-[0.9375rem] leading-relaxed text-stone">
            Your simulated order has been successfully recorded. A confirmation receipt and
            official authentication dossier have been dispatched to{" "}
            <strong className="text-ink">{customerEmail}</strong>.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 border border-line bg-ivory px-5 py-2.5 font-sans text-xs text-charcoal">
            <span className="text-taupe uppercase tracking-luxe">Reference No:</span>
            <span className="font-serif text-base text-ink font-medium tracking-wide">
              {orderId}
            </span>
          </div>
        </div>

        {/* Next Steps Timeline */}
        <div className="mt-12 border border-line bg-bone/30 p-8 lg:p-10">
          <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
            White-Glove Fulfillment Timeline
          </p>
          <h2 className="mt-2 font-serif text-2xl text-ink">
            What Happens Next with Your Piece
          </h2>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-2.5 border-l-2 border-champagne pl-4">
              <span className="font-sans text-[0.625rem] tracking-luxe uppercase text-champagne font-medium">
                Step 01 · In Progress
              </span>
              <h3 className="font-serif text-lg text-ink">Atelier Verification</h3>
              <p className="font-sans text-xs leading-relaxed text-stone">
                Our master specialist inspects date stamps, stitch tension, and attaches your
                serialized security ribbon.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 border-l-2 border-line pl-4">
              <span className="font-sans text-[0.625rem] tracking-luxe uppercase text-taupe">
                Step 02 · 24 Hours
              </span>
              <h3 className="font-serif text-lg text-ink">Archival Packaging</h3>
              <p className="font-sans text-xs leading-relaxed text-stone">
                Piece is placed in acid-free tissue, original dustbag, and unbranded
                shock-absorbent exterior packaging.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 border-l-2 border-line pl-4">
              <span className="font-sans text-[0.625rem] tracking-luxe uppercase text-taupe">
                Step 03 · 48 Hours
              </span>
              <h3 className="font-serif text-lg text-ink">Insured Courier Dispatch</h3>
              <p className="font-sans text-xs leading-relaxed text-stone">
                Handed over to priority carrier (DHL / FedEx) with tracking number sent
                directly via SMS and email.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 border-l-2 border-line pl-4">
              <span className="font-sans text-[0.625rem] tracking-luxe uppercase text-taupe">
                Step 04 · Delivery
              </span>
              <h3 className="font-serif text-lg text-ink">White-Glove Handover</h3>
              <p className="font-sans text-xs leading-relaxed text-stone">
                Delivered safely with mandatory adult signature. Your 14-day inspection window
                begins upon delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Order Details & Summary Grid */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_420px] lg:gap-16">
          {/* Purchased Items List */}
          <div className="flex flex-col gap-8">
            <div className="border border-line bg-ivory p-6 sm:p-8">
              <h3 className="font-serif text-2xl text-ink">Purchased Piece(s)</h3>

              <div className="mt-6 flex flex-col divide-y divide-line">
                {order && order.items.length > 0 ? (
                  order.items.map((item) => (
                    <div key={item.id} className="flex gap-6 py-6">
                      {item.image ? (
                        <div className="relative aspect-4/5 w-24 shrink-0 overflow-hidden bg-warm border border-line">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="font-sans text-[0.625rem] tracking-luxe uppercase text-champagne">
                            {item.brand}
                          </p>
                          <h4 className="font-serif text-lg text-ink">{item.name}</h4>
                          <p className="font-sans text-xs text-stone mt-1">
                            SKU: {item.sku} · Qty: {item.quantity}
                          </p>
                          <p className="font-sans text-xs text-emerald-700 mt-2 flex items-center gap-1">
                            <ShieldCheck className="size-3.5" />
                            Certificate of Authenticity Included
                          </p>
                        </div>
                        <p className="font-serif text-lg text-ink mt-3">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-stone font-sans text-sm">
                    <p>Order reference #{orderId} processed successfully.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery & Payment Information */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="border border-line bg-warm/40 p-6">
                <div className="flex items-center gap-2 text-ink">
                  <Truck className="size-4 text-champagne" />
                  <h4 className="font-serif text-lg">Delivery Information</h4>
                </div>
                <p className="mt-3 font-sans text-[0.8125rem] text-stone leading-relaxed">
                  <strong>Recipient:</strong> {order?.customer.name || customerName}
                  <br />
                  <strong>Address:</strong>{" "}
                  {order?.customer.address || "450 Park Avenue, Suite 24B, New York, NY"}
                  <br />
                  <strong>Method:</strong>{" "}
                  {order?.shippingMethod || "Insured Express Priority (DHL/FedEx)"}
                  <br />
                  <strong>Phone:</strong> {order?.customer.phone || "+1 2016443628"}
                </p>
              </div>

              <div className="border border-line bg-warm/40 p-6">
                <div className="flex items-center gap-2 text-ink">
                  <ShieldCheck className="size-4 text-champagne" />
                  <h4 className="font-serif text-lg">Payment &amp; Security</h4>
                </div>
                <p className="mt-3 font-sans text-[0.8125rem] text-stone leading-relaxed">
                  <strong>Status:</strong> Approved (Simulated Authorization)
                  <br />
                  <strong>Payment Method:</strong>{" "}
                  {order?.paymentMethod || "Credit Card (•••• 4242)"}
                  <br />
                  <strong>Security:</strong> 256-Bit TLS PCI-DSS Compliant
                  <br />
                  <strong>Protection:</strong> 14-Day Return Window with Tag
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Receipt Breakdown & Actions */}
          <div className="flex flex-col gap-6">
            <div className="border border-line bg-warm/70 p-6 sm:p-8">
              <h3 className="font-serif text-xl text-ink">Financial Breakdown</h3>

              <div className="mt-6 flex flex-col gap-3.5 border-b border-line pb-6 font-sans text-[0.875rem]">
                <div className="flex justify-between text-stone">
                  <span>Subtotal</span>
                  <span className="text-ink font-medium">
                    {formatPrice(order?.subtotal || 24500)}
                  </span>
                </div>
                {order?.discount ? (
                  <div className="flex justify-between text-stone">
                    <span className="text-champagne">Discount Applied</span>
                    <span className="text-champagne font-medium">
                      -{formatPrice(order.discount)}
                    </span>
                  </div>
                ) : null}
                <div className="flex justify-between text-stone">
                  <span>Insured Express Shipping</span>
                  <span className="text-ink">
                    {order?.shippingCost ? formatPrice(order.shippingCost) : "Complimentary"}
                  </span>
                </div>
                <div className="flex justify-between text-stone">
                  <span>Taxes &amp; Import Duties</span>
                  <span className="text-taupe text-xs uppercase tracking-luxe">
                    Included / $0
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-baseline justify-between">
                <span className="font-serif text-lg text-ink">Total Settled</span>
                <span className="font-serif text-2xl text-ink">
                  {formatPrice(order?.total || 24500)}
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex w-full items-center justify-center gap-2 border border-ink bg-ink py-3.5 font-sans text-[0.75rem] tracking-luxe uppercase text-ivory hover:bg-charcoal transition-colors"
                >
                  <Printer className="size-4" />
                  Print Official Receipt
                </button>

                <Link
                  href="/collections/handbags"
                  className="flex w-full items-center justify-center gap-2 border border-line bg-ivory py-3.5 font-sans text-[0.75rem] tracking-luxe uppercase text-ink hover:border-taupe transition-colors"
                >
                  Continue Exploring
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>

            {/* Concierge Assistance */}
            <div className="border border-line bg-bone/40 p-6 flex flex-col gap-3">
              <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
                Questions About Your Order?
              </p>
              <h4 className="font-serif text-lg text-ink">Contact Client Concierge</h4>
              <p className="font-sans text-xs leading-relaxed text-stone">
                Our luxury advisors are available around the clock to provide updates on your
                package, condition dossier, or private appointment inquiries.
              </p>
              <div className="mt-2 flex flex-col gap-2 font-sans text-xs text-charcoal">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 hover:text-ink transition-colors"
                >
                  <Mail className="size-3.5 text-taupe" />
                  <span>{site.email}</span>
                </a>
                <a
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 hover:text-ink transition-colors"
                >
                  <Phone className="size-3.5 text-taupe" />
                  <span>{site.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="size-6 animate-spin border-2 border-champagne border-t-transparent" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
