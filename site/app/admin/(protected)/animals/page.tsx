import { createAnimal, deleteAnimal, togglePublished } from '@/app/admin/actions';
import { connectDB, isDbConfigured } from '@/lib/db';
import Animal, { CATEGORIES, STATUSES } from '@/models/Animal';

export const dynamic = 'force-dynamic';

const inputClass =
  'w-full rounded-md border border-slate-300 px-3 py-2 text-base outline-none focus:border-slate-900';

type AnimalRow = {
  _id: string;
  name: string;
  species: string;
  category: string;
  status: string;
  published: boolean;
};

async function getAnimals(): Promise<AnimalRow[]> {
  await connectDB();
  const docs = await Animal.find({}).sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({
    _id: String(doc._id),
    name: doc.name,
    species: doc.species,
    category: doc.category,
    status: doc.status,
    published: doc.published,
  }));
}

export default async function AnimalsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!isDbConfigured()) {
    return (
      <p className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        Set <code>MONGODB_URI</code> to connect the database.
      </p>
    );
  }

  const [animals, { error }] = await Promise.all([getAnimals(), searchParams]);

  return (
    <>
      <h1 className="mb-6 font-sans text-2xl font-semibold tracking-normal">Animals</h1>

      <form action={createAnimal} className="mb-10 grid gap-3 rounded-lg border border-slate-200 p-4 sm:grid-cols-2">
        <h2 className="font-sans text-base font-semibold tracking-normal sm:col-span-2">Add an animal</h2>

        {error === 'missing' ? (
          <p className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800 sm:col-span-2">
            Name and species are required.
          </p>
        ) : null}

        <label className="text-sm">
          Name
          <input name="name" required className={inputClass} />
        </label>
        <label className="text-sm">
          Species
          <input name="species" required className={inputClass} />
        </label>
        <label className="text-sm">
          Category
          <select name="category" defaultValue="other" className={inputClass}>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Status
          <select name="status" defaultValue="available" className={inputClass}>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm sm:col-span-2">
          Image URL
          <input name="imageUrl" type="url" className={inputClass} />
        </label>
        <label className="text-sm sm:col-span-2">
          Summary
          <textarea name="summary" rows={3} className={inputClass} />
        </label>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input name="published" type="checkbox" className="size-4" />
          Publish on the public site
        </label>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="rounded-md bg-slate-900 px-4 py-2 text-base font-medium text-white hover:bg-slate-700"
          >
            Save animal
          </button>
        </div>
      </form>

      {animals.length === 0 ? (
        <p className="text-sm text-slate-500">No animals yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs tracking-widest text-slate-500">
                <th className="py-2 pr-4 font-semibold">NAME</th>
                <th className="py-2 pr-4 font-semibold">SPECIES</th>
                <th className="py-2 pr-4 font-semibold">CATEGORY</th>
                <th className="py-2 pr-4 font-semibold">STATUS</th>
                <th className="py-2 pr-4 font-semibold">PUBLISHED</th>
                <th className="py-2 font-semibold">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal) => (
                <tr key={animal._id} className="border-b border-slate-100">
                  <td className="py-2 pr-4 font-medium">{animal.name}</td>
                  <td className="py-2 pr-4">{animal.species}</td>
                  <td className="py-2 pr-4">{animal.category}</td>
                  <td className="py-2 pr-4">{animal.status}</td>
                  <td className="py-2 pr-4">{animal.published ? 'Yes' : 'No'}</td>
                  <td className="flex gap-3 py-2">
                    <form action={togglePublished}>
                      <input type="hidden" name="id" value={animal._id} />
                      <button type="submit" className="underline hover:text-slate-500">
                        {animal.published ? 'Unpublish' : 'Publish'}
                      </button>
                    </form>
                    <form action={deleteAnimal}>
                      <input type="hidden" name="id" value={animal._id} />
                      <button type="submit" className="text-red-700 underline hover:text-red-500">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
