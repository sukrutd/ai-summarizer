import { UploadHeader } from '@/components/upload/upload-header';
import { UploadForm } from '@/components/upload/upload-form';

export default function Page() {
    return (
        <section className="min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-16">
                <UploadHeader />
                <UploadForm />
            </div>
        </section>
    );
}
