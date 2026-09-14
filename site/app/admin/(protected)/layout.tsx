import type { Metadata } from 'next';
import Link from 'next/link';
import { logout } from '@/app/admin/actions';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Cali_FID admin', robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-6">
            <span className="text-sm font-semibold tracking-widest text-slate-500">CALI_FID ADMIN</span>
            <nav className="flex gap-4 text-sm">
              <Link className="hover:underline" href="/admin">
                Dashboard
              </Link>
              <Link className="hover:underline" href="/admin/animals">
                Animals
              </Link>
              <Link className="hover:underline" href="/">
                View site
              </Link>
            </nav>
          </div>
          <form action={logout}>
            <button type="submit" className="text-sm text-slate-500 hover:text-slate-900">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
