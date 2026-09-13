import { InferSchemaType, Schema, model, models } from 'mongoose';

export const CATEGORIES = ['bird', 'lizard', 'turtle', 'snake', 'small-mammal', 'other'] as const;
export const STATUSES = ['available', 'pending', 'adopted', 'sanctuary'] as const;

const AnimalSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    species: { type: String, required: true, trim: true },
    category: { type: String, enum: CATEGORIES, default: 'other' },
    status: { type: String, enum: STATUSES, default: 'available', index: true },
    summary: { type: String, default: '', trim: true },
    imageUrl: { type: String, default: '', trim: true },
    published: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export type AnimalDoc = InferSchemaType<typeof AnimalSchema>;

export default models.Animal ?? model('Animal', AnimalSchema);
