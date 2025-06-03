import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // 🔒 Redirige vers la page de connexion si non connecté
  }

  redirect("/dashboard"); // ✅ Redirige vers dashboard si connecté
}
