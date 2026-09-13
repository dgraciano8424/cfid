import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { login } from '@/app/admin/actions';
import { isAuthConfigured, isLoggedIn } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Admin sign in', robots: { index: false, follow: false } };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isLoggedIn()) redirect('/admin');

  const { error } = await searchParams;

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6 font-sans text-slate-900">
      <div className="w-full max-w-sm">
        <p className="text-xs font-semibold tracking-widest text-slate-500">CALI_FID</p>
        <h1 className="mt-1 mb-6 text-2xl font-semibold tracking-normal font-sans">Admin sign in</h1>

        {!isAuthConfigured() ? (
          <p className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            Set <code>AUTH_SECRET</code> and <code>ADMIN_PASSWORD</code> to enable sign in.
          </p>
        ) : (
          <form action={login} className="space-y-3">
            {error ? (
              <p className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800">
                Incorrect password.
              </p>
            ) : null}
            <label className="block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-base outline-none focus:border-slate-900"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-slate-900 px-3 py-2 text-base font-medium text-white hover:bg-slate-700"
            >
              Sign in
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
