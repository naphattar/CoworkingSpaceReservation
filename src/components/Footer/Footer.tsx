export default function Footer() {
    return (
      <footer className="w-full bg-gray-800 text-gray-300 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold">Captain Buriram</h3>
            <p>Your destination for productive coworking spaces.</p>
          </div>
          <div className="flex space-x-6">
            <a href="/about" className="hover:underline">About Us</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    );
  }
  