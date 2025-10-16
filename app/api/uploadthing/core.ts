import { currentUser } from '@clerk/nextjs/server';
import { UploadThingError } from 'uploadthing/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const appFileRouter = {
    pdfUploader: f({
        pdf: {
            maxFileSize: '32MB',
            maxFileCount: 1
        }
    })
        .middleware(async () => {
            // ---------------------------------------------
            // Note: This code runs on server before upload
            // ---------------------------------------------
            // Get user information from clerk
            const user = await currentUser();
            if (!user) throw new UploadThingError('Unauthorized');
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // ---------------------------------------------
            // Note: This code runs on server after upload
            // ---------------------------------------------
            return {
                userId: metadata.userId,
                file: {
                    name: file.name,
                    url: file.ufsUrl
                }
            };
        })
} satisfies FileRouter;

export type AppFileRouter = typeof appFileRouter;
