import type { AppFileRouter } from '@/app/api/uploadthing/core';
import { generateReactHelpers } from '@uploadthing/react';

export const { useUploadThing } = generateReactHelpers<AppFileRouter>();
