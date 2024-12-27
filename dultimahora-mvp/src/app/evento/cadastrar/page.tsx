import { EventRegistrationForm } from "@/components/event-form";

export default function CreateEventPage() {
    return (
        <main className="min-h-screen">
            <div className="max-w-xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-center text-[#3F7EA7] mb-8">
                    Criar Evento
                </h1>
                <EventRegistrationForm />
            </div>
        </main>
    );
}