"use client";

import {
    Mail,
    Phone,
    MapPin,
    BookOpen,
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black text-white mt-auto">

            <div className="max-w-7xl mx-auto px-4 py-5">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <BookOpen size={18} />
                            <h2 className="font-semibold text-sm">
                                Mandarin LMS
                            </h2>
                        </div>

                        <p className="text-xs text-gray-300 leading-relaxed">
                            Platform pembelajaran Mandarin berbasis flashcard
                            dan adaptive learning.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium text-sm mb-2">
                            Contact
                        </h3>

                        <div className="space-y-1 text-xs text-gray-300">
                            <div className="flex gap-2 items-center">
                                <Phone size={12} />
                                <span>(+62) 812-3456-7890</span>
                            </div>

                            <div className="flex gap-2 items-center">
                                <Mail size={12} />
                                <span>admin@mandarinlms.com</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium text-sm mb-2">
                            Address
                        </h3>

                        <div className="flex gap-2 text-xs text-gray-300">
                            <MapPin size={12} />
                            <span>
                                UMN, Tangerang
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium text-sm mb-2">
                            Social
                        </h3>

                        <div className="space-y-1 text-xs text-gray-300">
                            <p>Instagram</p>
                            <p>LinkedIn</p>
                            <p>GitHub</p>
                        </div>
                    </div>

                </div>

            </div>

            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-2 text-center text-xs text-gray-400">
                    © 2026 Mandarin LMS
                </div>
            </div>

        </footer>
    );
}