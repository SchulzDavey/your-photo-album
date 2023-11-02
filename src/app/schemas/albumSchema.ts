import { z } from 'zod';

export const albumSchema = z.object({
  albumName: z.string().min(3, 'Album name is required').max(255),
  asset: z.any(),
});
