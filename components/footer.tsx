export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <span className="text-sm font-bold text-white">F</span>
              </div>
              <span className="text-xl font-bold">Fileme</span>
            </div>
            <p className="text-sm text-gray-300">
              Professional tax return filing and audit services. Secure, fast,
              and hassle-free.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Tax Return Filing</li>
              <li>Audit Services</li>
              <li>Tax Consultation</li>
              <li>Financial Planning</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Email: info@fileme.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Hours: Mon-Fri 9AM-6PM</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Fileme. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
