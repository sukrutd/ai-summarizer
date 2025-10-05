import { SignUp } from '@clerk/nextjs';

export default function Page() {
    return (
        <section className="flex justify-center items-center min-h-[80vh]">
            <div className="p-4 max-w-7xl">
                <SignUp />
            </div>
        </section>
    );
}
