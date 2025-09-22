export default function Footer() {
  return (
    <footer className="mt-12 bg-gradient-to-b from-gray-900 to-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-sm opacity-90">&copy; {new Date().getFullYear()} FreeTools. All rights reserved.</p>
      </div>
    </footer>
  );
}

