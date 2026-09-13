import Link from 'next/link';
import { connectDB, isDbConfigured } from '@/lib/db';
import Animal from '@/models/Animal';

export const dynamic = 'force-dynamic';

async function getCounts() {
  await connectDB();
  const [total, published, available] = await Promise.all([
    Animal.countDocuments({}),
    Animal.countDocuments({ published: true }),
    Animal.countDocuments({ status: 'available' }),
  ]);
  return { total, published, available };
}

export default async function DashboardPage() {
  if (!isDbConfigured()) {
    return (
      <p className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        Set <code>MONGODB_URI</code> to connect the database.
      </p>
    );
  }

  const counts = await getCounts();
  const tiles = [
    { label: 'Animals', value: counts.total },
    { label: 'Published', value: counts.published },
    { label: 'Available', value: counts.available },
  ];

  return (
    <>
      <h1 className="mb-6 font-sans text-2xl font-semibold tracking-normal">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {tiles.map((tile) => (
          <div key={tile.label} className="rounded-lg border border-slate-200 p-4">
            <p className="text-xs font-semibold tracking-widest text-slate-500">{tile.label.toUpperCase()}</p>
            <p className="mt-1 text-3xl font-semibold">{tile.value}</p>
          </div>
        ))}
      </div>
      <Link className="mt-6 inline-block text-sm underline" href="/admin/animals">
        Manage animals
      </Link>
    </>
  );
}
