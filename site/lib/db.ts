import mongoose from 'mongoose';

type Cache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Next.js hot-reloads modules in dev, so the connection is cached on globalThis
// to avoid opening a new pool on every reload.
const globalCache = globalThis as typeof globalThis & { _mongoose?: Cache };
const cached: Cache = globalCache._mongoose ?? { conn: null, promise: null };
globalCache._mongoose = cached;

export function isDbConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, { bufferCommands: false });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
