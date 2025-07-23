
export function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">F</span>
                            </div>
                            <span className="text-xl font-bold">Fileme</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                            Professional tax return filing and audit services. Secure, fast, and hassle-free.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Services</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>Tax Return Filing</li>
                            <li>Audit Services</li>
                            <li>Tax Consultation</li>
                            <li>Financial Planning</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <div className="space-y-2 text-sm text-gray-300">
                            <p>Email: info@fileme.com</p>
                            <p>Phone: +1 (555) 123-4567</p>
                            <p>Hours: Mon-Fri 9AM-6PM</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-sm text-gray-400">
                        © 2025 Fileme. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
} 