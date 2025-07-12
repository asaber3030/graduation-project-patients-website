import Link from "next/link";

import { Heart, Phone, Mail, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const AppFooter = () => {
  return (
    <footer
      id="contact"
      className="bg-gray-900 text-white py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Techmed</h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">Your comprehensive healthcare management platform. Secure, reliable, and designed with your health in mind.</p>

            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                1-800-Techmed
              </div>

              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                support@techmed.com
              </div>

              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                123 Techmed Ave, Medical City, MC 12345
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/appointments/create"
                  className="hover:text-white transition-colors"
                >
                  Appointments
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="hover:text-white transition-colors"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 Techmed. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Badge
              variant="outline"
              className="text-gray-400 border-gray-600"
            >
              HIPAA Compliant
            </Badge>
            <Badge
              variant="outline"
              className="text-gray-400 border-gray-600"
            >
              SOC 2 Certified
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
};
