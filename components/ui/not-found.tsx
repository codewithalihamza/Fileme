// Shared not found component
export const NotFoundMessage = ({
    title,
    message,
    backHref,
    backText
}: {
    title: string;
    message: string;
    backHref: string;
    backText: string;
}) => (
    <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <a
            href={backHref}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
            ← {backText}
        </a>
    </div>
);