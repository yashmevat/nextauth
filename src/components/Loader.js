// components/Loader.js
export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-purple-400">
          Loading
        </span>
      </div>
    </div>
  );
}
