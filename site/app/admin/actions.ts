'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { checkPassword, createSession, destroySession, requireAdmin } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Animal, { CATEGORIES, STATUSES } from '@/models/Animal';

function field(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim();
}

export async function login(formData: FormData) {
  if (!(await checkPassword(field(formData, 'password')))) {
    redirect('/admin/login?error=1');
  }

  await createSession();
  redirect('/admin');
}

export async function logout() {
  await destroySession();
  redirect('/admin/login');
}

export async function createAnimal(formData: FormData) {
  await requireAdmin();

  const name = field(formData, 'name');
  const species = field(formData, 'species');
  if (!name || !species) redirect('/admin/animals?error=missing');

  const category = field(formData, 'category');
  const status = field(formData, 'status');

  await connectDB();
  await Animal.create({
    name,
    species,
    category: (CATEGORIES as readonly string[]).includes(category) ? category : 'other',
    status: (STATUSES as readonly string[]).includes(status) ? status : 'available',
    summary: field(formData, 'summary'),
    imageUrl: field(formData, 'imageUrl'),
    published: formData.get('published') === 'on',
  });

  revalidatePath('/admin/animals');
  redirect('/admin/animals');
}

export async function togglePublished(formData: FormData) {
  await requireAdmin();
  await connectDB();

  const id = field(formData, 'id');
  const animal = await Animal.findById(id);
  if (animal) {
    animal.published = !animal.published;
    await animal.save();
  }

  revalidatePath('/admin/animals');
}

export async function deleteAnimal(formData: FormData) {
  await requireAdmin();
  await connectDB();
  await Animal.findByIdAndDelete(field(formData, 'id'));
  revalidatePath('/admin/animals');
}
