import { auth } from "~/auth";
import { redirect } from "next/navigation";
import LoginForm from "~/ui/login/login-form";

export default async function Page() {
  const session = await auth();

  const user = session?.user;

  if (user) redirect("/new-member");

  return (
    <main className="min-h-screen w-full overflow-y-auto">
      <LoginForm />
    </main>
  );
}
