"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Heart,
  LogOut,
  Mail,
  MapPin,
  Package,
  Phone,
  Printer,
  ShieldCheck,
  Sparkles,
  Truck,
  User as UserIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { formatPrice } from "@/lib/format";
import { useAuth } from "@/store/auth";
import { useShop } from "@/store/shop";
import { useCatalogue } from "@/store/catalogue";

type TabKey = "profile" | "orders" | "wishlist" | "concierge";

type SavedOrder = {
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

export default function AccountPage() {
  const router = useRouter();
  const { user, signOut, updateProfile, hydrated } = useAuth();
  const { wishlist, removeFromWishlist } = useShop();
  const { byId } = useCatalogue();

  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const [orders, setOrders] = useState<SavedOrder[]>([]);

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress1, setEditAddress1] = useState("");
  const [editAddress2, setEditAddress2] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editState, setEditState] = useState("");
  const [editPostcode, setEditPostcode] = useState("");
  const [editCountry, setEditCountry] = useState("United States");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync profile edit state with current user
  useEffect(() => {
    if (user) {
      setEditFirstName(user.firstName || "");
      setEditLastName(user.lastName || "");
      setEditPhone(user.phone || "");
      setEditAddress1(user.address?.line1 || "");
      setEditAddress2(user.address?.line2 || "");
      setEditCity(user.address?.city || "");
      setEditState(user.address?.state || "");
      setEditPostcode(user.address?.postcode || "");
      setEditCountry(user.address?.country || "United States");
    }
  }, [user]);

  // Read orders from localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("mr.orders.v1");
      if (raw) {
        setOrders(JSON.parse(raw));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      firstName: editFirstName,
      lastName: editLastName,
      phone: editPhone,
      address: {
        line1: editAddress1,
        line2: editAddress2,
        city: editCity,
        state: editState,
        postcode: editPostcode,
        country: editCountry,
      },
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSignOut = () => {
    signOut();
    router.push("/account/login");
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="size-6 animate-spin border-2 border-champagne border-t-transparent" />
      </div>
    );
  }

  // Guest / Not logged in State
  if (!user) {
    return (
      <div className="bg-ivory py-16 lg:py-24">
        <Container size="narrow">
          <div className="border border-line bg-warm/60 p-8 text-center sm:p-12 lg:p-16">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-line bg-ivory text-taupe">
              <UserIcon className="size-8" />
            </div>
            <p className="mt-6 font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
              Client Portal
            </p>
            <h1 className="mt-2 font-serif text-[2.25rem] text-ink sm:text-[2.75rem]">
              Sign In to Your Account
            </h1>
            <p className="mx-auto mt-4 max-w-md font-sans text-[0.875rem] leading-relaxed text-stone">
              Please sign in or create an account to view your acquisitions, certificates of
              authenticity, and saved preferences.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/account/login"
                className="inline-flex items-center gap-2 border border-ink bg-ink px-8 py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ivory hover:bg-charcoal transition-colors"
              >
                Sign In
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/account/register"
                className="inline-flex items-center gap-2 border border-line bg-ivory px-8 py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ink hover:border-taupe transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
  const wishlistedProducts = wishlist
    .map((id) => byId(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="bg-ivory py-12 lg:py-20">
      <Container size="wide">
        {/* Profile Header Card */}
        <div className="border border-line bg-warm/70 p-8 sm:p-10 lg:p-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              {/* Monogram circle */}
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full border border-line bg-ink font-serif text-xl text-ivory tracking-widest">
                {initials || "HB"}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="font-serif text-2xl text-ink sm:text-3xl">
                    {user.firstName} {user.lastName}
                  </h1>
                  <span className="border border-champagne/60 bg-ivory px-2.5 py-0.5 font-sans text-[0.625rem] tracking-luxe uppercase text-champagne">
                    VIP Collector
                  </span>
                </div>
                <p className="mt-1 font-sans text-[0.8125rem] text-stone">
                  {user.email} {user.phone ? `· ${user.phone}` : ""}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 border border-line bg-ivory px-5 py-2.5 font-sans text-[0.6875rem] tracking-luxe uppercase text-stone hover:border-ink hover:text-ink transition-colors self-start sm:self-auto"
            >
              <LogOut className="size-3.5" />
              Sign Out
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="mt-10 flex flex-wrap gap-2 border-t border-line/70 pt-6">
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`px-5 py-2.5 font-sans text-[0.75rem] tracking-luxe uppercase transition-all ${
                activeTab === "profile"
                  ? "bg-ink text-ivory"
                  : "border border-line bg-ivory text-stone hover:text-ink"
              }`}
            >
              Profile &amp; Address
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={`px-5 py-2.5 font-sans text-[0.75rem] tracking-luxe uppercase transition-all ${
                activeTab === "orders"
                  ? "bg-ink text-ivory"
                  : "border border-line bg-ivory text-stone hover:text-ink"
              }`}
            >
              Acquisitions &amp; Orders ({orders.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("wishlist")}
              className={`px-5 py-2.5 font-sans text-[0.75rem] tracking-luxe uppercase transition-all ${
                activeTab === "wishlist"
                  ? "bg-ink text-ivory"
                  : "border border-line bg-ivory text-stone hover:text-ink"
              }`}
            >
              Saved Wishlist ({wishlistedProducts.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("concierge")}
              className={`px-5 py-2.5 font-sans text-[0.75rem] tracking-luxe uppercase transition-all ${
                activeTab === "concierge"
                  ? "bg-ink text-ivory"
                  : "border border-line bg-ivory text-stone hover:text-ink"
              }`}
            >
              Concierge Services
            </button>
          </div>
        </div>

        {/* Tab 1: Profile & Delivery Address */}
        {activeTab === "profile" && (
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Personal Details */}
            <div className="border border-line bg-warm/30 p-8">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <h2 className="font-serif text-2xl text-ink">Personal Information</h2>
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="font-sans text-[0.6875rem] tracking-luxe uppercase text-champagne hover:underline"
                  >
                    Edit Profile
                  </button>
                ) : null}
              </div>

              {saveSuccess ? (
                <div className="mt-4 flex items-center gap-2 border border-emerald-200 bg-emerald-50 p-3 font-sans text-xs text-emerald-800">
                  <Check className="size-4 shrink-0" />
                  <span>Profile updated and saved to local storage successfully.</span>
                </div>
              ) : null}

              {!isEditing ? (
                <dl className="mt-6 flex flex-col gap-4 font-sans text-[0.875rem]">
                  <div>
                    <dt className="text-[0.625rem] tracking-luxe uppercase text-taupe">
                      Full Name
                    </dt>
                    <dd className="mt-1 font-serif text-lg text-ink">
                      {user.firstName} {user.lastName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.625rem] tracking-luxe uppercase text-taupe">
                      Email Address
                    </dt>
                    <dd className="mt-1 text-charcoal">{user.email}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.625rem] tracking-luxe uppercase text-taupe">
                      Telephone
                    </dt>
                    <dd className="mt-1 text-charcoal">{user.phone || "Not provided"}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.625rem] tracking-luxe uppercase text-taupe">
                      Member Status
                    </dt>
                    <dd className="mt-1 flex items-center gap-2 text-charcoal">
                      <ShieldCheck className="size-4 text-champagne" />
                      <span>Verified House VIP Client</span>
                    </dd>
                  </div>
                </dl>
              ) : (
                <form onSubmit={handleSaveProfile} className="mt-6 flex flex-col gap-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-[0.625rem] tracking-luxe uppercase text-stone">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={editFirstName}
                        onChange={(e) => setEditFirstName(e.target.value)}
                        className="border border-line bg-ivory p-2.5 font-sans text-sm text-ink focus:border-champagne focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[0.625rem] tracking-luxe uppercase text-stone">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={editLastName}
                        onChange={(e) => setEditLastName(e.target.value)}
                        className="border border-line bg-ivory p-2.5 font-sans text-sm text-ink focus:border-champagne focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[0.625rem] tracking-luxe uppercase text-stone">
                      Telephone
                    </label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="border border-line bg-ivory p-2.5 font-sans text-sm text-ink focus:border-champagne focus:outline-none"
                    />
                  </div>

                  <div className="mt-2 flex gap-3">
                    <button
                      type="submit"
                      className="border border-ink bg-ink px-6 py-2.5 font-sans text-[0.6875rem] tracking-luxe uppercase text-ivory hover:bg-charcoal transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="border border-line bg-ivory px-5 py-2.5 font-sans text-[0.6875rem] tracking-luxe uppercase text-stone hover:text-ink transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Delivery Destination */}
            <div className="border border-line bg-warm/30 p-8">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <h2 className="font-serif text-2xl text-ink">Default Delivery Address</h2>
                <span className="font-sans text-[0.625rem] tracking-luxe uppercase text-champagne">
                  White-Glove Ready
                </span>
              </div>

              {!isEditing ? (
                <div className="mt-6 flex flex-col gap-3 font-sans text-[0.875rem] text-stone">
                  {user.address?.line1 ? (
                    <>
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-1 size-4 shrink-0 text-taupe" />
                        <div>
                          <p className="font-serif text-lg text-ink">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="mt-1">{user.address.line1}</p>
                          {user.address.line2 ? <p>{user.address.line2}</p> : null}
                          <p>
                            {user.address.city}, {user.address.state} {user.address.postcode}
                          </p>
                          <p className="font-medium text-charcoal">{user.address.country}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="py-6 text-stone">
                      <p>No default address saved yet.</p>
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="mt-3 inline-block font-sans text-[0.6875rem] tracking-luxe uppercase text-champagne hover:underline"
                      >
                        + Add Delivery Address
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-6 flex flex-col gap-3 font-sans text-[0.875rem]">
                  <div className="flex flex-col gap-1">
                    <label className="text-[0.625rem] tracking-luxe uppercase text-stone">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={editAddress1}
                      onChange={(e) => setEditAddress1(e.target.value)}
                      placeholder="450 Park Avenue"
                      className="border border-line bg-ivory p-2.5 text-sm text-ink focus:border-champagne focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[0.625rem] tracking-luxe uppercase text-stone">
                      Suite / Apartment (Optional)
                    </label>
                    <input
                      type="text"
                      value={editAddress2}
                      onChange={(e) => setEditAddress2(e.target.value)}
                      placeholder="Suite 24B"
                      className="border border-line bg-ivory p-2.5 text-sm text-ink focus:border-champagne focus:outline-none"
                    />
                  </div>

                  <div className="grid gap-2 sm:grid-cols-3">
                    <input
                      type="text"
                      value={editCity}
                      onChange={(e) => setEditCity(e.target.value)}
                      placeholder="City"
                      className="border border-line bg-ivory p-2.5 text-sm text-ink focus:border-champagne focus:outline-none"
                    />
                    <input
                      type="text"
                      value={editState}
                      onChange={(e) => setEditState(e.target.value)}
                      placeholder="State / Province"
                      className="border border-line bg-ivory p-2.5 text-sm text-ink focus:border-champagne focus:outline-none"
                    />
                    <input
                      type="text"
                      value={editPostcode}
                      onChange={(e) => setEditPostcode(e.target.value)}
                      placeholder="Postal Code"
                      className="border border-line bg-ivory p-2.5 text-sm text-ink focus:border-champagne focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[0.625rem] tracking-luxe uppercase text-stone">
                      Country
                    </label>
                    <input
                      type="text"
                      value={editCountry}
                      onChange={(e) => setEditCountry(e.target.value)}
                      className="border border-line bg-ivory p-2.5 text-sm text-ink focus:border-champagne focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Orders & Acquisitions */}
        {activeTab === "orders" && (
          <div className="mt-12 flex flex-col gap-8">
            {orders.length === 0 ? (
              <div className="border border-line bg-warm/30 py-16 text-center">
                <Package className="mx-auto size-10 text-taupe" />
                <h3 className="mt-4 font-serif text-2xl text-ink">No Acquisitions Yet</h3>
                <p className="mt-2 font-sans text-sm text-stone">
                  Pieces you purchase will appear here with active courier tracking and
                  authenticity dossiers.
                </p>
                <Link
                  href="/collections/handbags"
                  className="mt-6 inline-flex items-center gap-2 border border-ink bg-ink px-8 py-3.5 font-sans text-[0.6875rem] tracking-luxe uppercase text-ivory hover:bg-charcoal transition-colors"
                >
                  Explore Handbag Vault
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.orderId} className="border border-line bg-warm/40 p-6 sm:p-8">
                  {/* Order header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
                    <div>
                      <span className="font-sans text-[0.625rem] tracking-luxe-wide uppercase text-champagne">
                        Order Confirmed
                      </span>
                      <h3 className="font-serif text-xl text-ink sm:text-2xl">
                        Reference #{order.orderId}
                      </h3>
                      <p className="font-sans text-xs text-stone mt-1">
                        Placed on {new Date(order.placedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="font-sans text-[0.625rem] tracking-luxe uppercase text-taupe block">
                          Total Amount
                        </span>
                        <span className="font-serif text-xl text-ink">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                      <Link
                        href={`/checkout/success?orderId=${order.orderId}`}
                        className="border border-ink bg-ivory px-4 py-2 font-sans text-[0.6875rem] tracking-luxe uppercase text-ink hover:bg-ink hover:text-ivory transition-colors"
                      >
                        View Receipt
                      </Link>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="mt-6 flex flex-col divide-y divide-line/60">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-5 py-4">
                        {item.image ? (
                          <div className="relative aspect-4/5 w-20 shrink-0 overflow-hidden bg-warm border border-line">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>
                        ) : null}
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <p className="font-sans text-[0.5625rem] tracking-luxe uppercase text-champagne">
                              {item.brand}
                            </p>
                            <h4 className="font-serif text-base text-ink">{item.name}</h4>
                            <p className="font-sans text-xs text-stone">
                              SKU: {item.sku} · Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-serif text-base text-ink">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Logistics & status note */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-4 font-sans text-xs text-stone">
                    <div className="flex items-center gap-2 text-charcoal">
                      <Truck className="size-4 text-champagne" />
                      <span>{order.shippingMethod}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-700">
                      <ShieldCheck className="size-4" />
                      <span>Lifetime Authenticity Guarantee Included</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Saved Wishlist */}
        {activeTab === "wishlist" && (
          <div className="mt-12">
            {wishlistedProducts.length === 0 ? (
              <div className="border border-line bg-warm/30 py-16 text-center">
                <Heart className="mx-auto size-10 text-taupe" />
                <h3 className="mt-4 font-serif text-2xl text-ink">Your Wishlist is Empty</h3>
                <p className="mt-2 font-sans text-sm text-stone">
                  Save rare finds and holy grail silhouettes by clicking the heart icon on any
                  piece.
                </p>
                <Link
                  href="/collections/handbags"
                  className="mt-6 inline-flex items-center gap-2 border border-ink bg-ink px-8 py-3.5 font-sans text-[0.6875rem] tracking-luxe uppercase text-ivory hover:bg-charcoal transition-colors"
                >
                  Explore Handbags
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {wishlistedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border border-line bg-warm/30 p-4 flex flex-col justify-between"
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      className="relative aspect-4/5 w-full overflow-hidden bg-warm group"
                    >
                      {product.images[0] ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : null}
                    </Link>
                    <div className="mt-4">
                      <p className="font-sans text-[0.625rem] tracking-luxe uppercase text-champagne">
                        {product.brand}
                      </p>
                      <Link
                        href={`/products/${product.slug}`}
                        className="mt-1 block font-serif text-lg text-ink hover:text-champagne transition-colors"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 font-serif text-lg text-ink">
                        {formatPrice(product.price, product.currency)}
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2 border-t border-line/60 pt-3">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 text-center border border-ink bg-ink py-2 font-sans text-[0.6875rem] tracking-luxe uppercase text-ivory hover:bg-charcoal transition-colors"
                      >
                        View Piece
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(product.id)}
                        className="border border-line px-3 py-2 text-stone hover:text-red-700 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Concierge Services */}
        {activeTab === "concierge" && (
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="border border-line bg-warm/40 p-8">
              <Sparkles className="size-6 text-champagne" />
              <h3 className="mt-4 font-serif text-2xl text-ink">Bespoke Sourcing Request</h3>
              <p className="mt-2 font-sans text-[0.875rem] leading-relaxed text-stone">
                Looking for a specific leather, color or original silhouette
                hardware, or limited runway piece? Our international curators will locate it
                through private archives.
              </p>
              <Link
                href="/pages/contact"
                className="mt-6 inline-flex items-center gap-2 border border-ink bg-ink px-6 py-3 font-sans text-[0.6875rem] tracking-luxe uppercase text-ivory hover:bg-charcoal transition-colors"
              >
                Inquire Sourcing Desk
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="border border-line bg-warm/40 p-8">
              <ShieldCheck className="size-6 text-champagne" />
              <h3 className="mt-4 font-serif text-2xl text-ink">Authentication Certificates</h3>
              <p className="mt-2 font-sans text-[0.875rem] leading-relaxed text-stone">
                All certificates of authenticity issued for your acquisitions remain permanently
                recorded in our vault registry. Need a replacement dossier or insurance valuation?
              </p>
              <Link
                href="/pages/contact"
                className="mt-6 inline-flex items-center gap-2 border border-line bg-ivory px-6 py-3 font-sans text-[0.6875rem] tracking-luxe uppercase text-ink hover:border-taupe transition-colors"
              >
                Request Valuation Dossier
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
