import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-medium" style={{ color: "var(--color-primary)" }}>
        404 — Page not found
      </h1>
      <Link
        href="/"
        className="text-sm underline"
        style={{ color: "var(--color-accent)" }}
      >
        Back to home
      </Link>
    </div>
  );
}
