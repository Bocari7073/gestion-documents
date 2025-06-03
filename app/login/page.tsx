import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm"; // Ton composant de formulaire

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard"); // ✅ Redirige s'il est déjà connecté
  }

  return <LoginForm />;
}
