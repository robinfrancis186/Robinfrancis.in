import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center bg-background px-4 text-center text-foreground">
      <h1 className="mb-4 text-4xl font-bold">Page not found</h1>
      <p className="mb-8 text-muted-foreground">The page you are looking for is not available.</p>
      <Link className="text-primary hover:underline" href="/">
        Back home
      </Link>
    </main>
  );
}
