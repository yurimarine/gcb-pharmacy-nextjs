"use client";

export default function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex  items-center justify-center z-50 pointer-events-none">
      <div className="p-4 rounded shadow-lg bg-white">
        <div className="animate-spin h-6 w-6 border-4 border-black border-t-transparent rounded-full" />
      </div>
    </div>
  );
}
