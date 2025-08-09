// Shared not found component
export const NotFoundMessage = ({
  title,
  message,
  backHref,
  backText,
}: {
  title: string;
  message: string;
  backHref: string;
  backText: string;
}) => (
  <div className="text-center">
    <h1 className="mb-4 text-2xl font-bold text-gray-900">{title}</h1>
    <p className="mb-6 text-gray-600">{message}</p>
    <a
      href={backHref}
      className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      ← {backText}
    </a>
  </div>
);
