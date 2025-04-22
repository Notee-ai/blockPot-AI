export default function ErrorPage() {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-red-950 text-red-400">
        <h1 className="text-4xl font-bold">403 Forbidden</h1>
        <p className="mt-2">You are not authorized to view this page.</p>
      </div>
    );
  }
  