import rawBundle from './nest-authz.json';
import { evidenceBundleSchema } from './schema.ts';

export const nestAuthzEvidence = evidenceBundleSchema.parse(rawBundle);
