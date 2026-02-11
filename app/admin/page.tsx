"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/admin/Sidebar";
import AddProduct from "@/components/admin/AddProduct";
import AllProducts from "@/components/admin/AllProducts";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [active, setActive] = useState<"add" | "all">("add");

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // or home page
    }
  }, [status, router]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Checking authentication...
      </div>
    );
  }

  // Extra safety (optional)
  if (!session) return null;

  return (
    <div
      className="
        flex flex-col md:flex-row pt-26
        min-h-screen
        text-white
        bg-gradient-to-br from-black via-zinc-900 to-black
      "
    >
      {/* Sidebar */}
      <Sidebar active={active} setActive={setActive} />

      {/* Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {active === "add" && <AddProduct />}
        {active === "all" && <AllProducts />}
      </main>
    </div>
  );
}
