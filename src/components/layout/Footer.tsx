import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faDiscord,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";

export function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 px-6 border-t border-gray-900 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex gap-6 mb-4 md:mb-0">
                <a href="#" className="hover:text-white transition"><FontAwesomeIcon icon={faFacebookF} className="h-6 w-6" /></a>
                <a href="#" className="hover:text-white transition"><FontAwesomeIcon icon={faInstagram} className="h-6 w-6" /></a>
                <a href="#" className="hover:text-white transition"><FontAwesomeIcon icon={faTwitter} className="h-6 w-6" /></a>
                <a href="#" className="hover:text-white transition"><FontAwesomeIcon icon={faYoutube} className="h-6 w-6" /></a>
                <a href="#" className="hover:text-white transition"><FontAwesomeIcon icon={faDiscord} className="h-6 w-6" /></a>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-8">
          <ul className="space-y-3">
            <li><Link href="#" className="hover:underline">Audio Description</Link></li>
            <li><Link href="#" className="hover:underline">Investor Relations</Link></li>
            <li><Link href="#" className="hover:underline">Legal Notices</Link></li>
          </ul>
          <ul className="space-y-3">
            <li><Link href="#" className="hover:underline">Help Center</Link></li>
            <li><Link href="#" className="hover:underline">Jobs</Link></li>
            <li><Link href="#" className="hover:underline">Cookie Preferences</Link></li>
          </ul>
          <ul className="space-y-3">
            <li><Link href="#" className="hover:underline">Gift Cards</Link></li>
            <li><Link href="#" className="hover:underline">Terms of Use</Link></li>
            <li><Link href="#" className="hover:underline">Corporate Information</Link></li>
          </ul>
          <ul className="space-y-3">
            <li><Link href="#" className="hover:underline">Media Center</Link></li>
            <li><Link href="#" className="hover:underline">Privacy</Link></li>
            <li><Link href="#" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-xs">
          <button className="border border-gray-500 px-4 py-2 mb-4 hover:text-white hover:border-white transition">
            Service Code
          </button>
          <p>&copy; 2025 ZERO-W-ANIME, Inc. All rights reserved.</p>
        </div>
      </div>
           <script type="text/javascript">           
               var app_url = 'https://gplinks.com/';
               var app_api_token = 'c053417eed08bb0e4a76257a0595681c86a36cad';
               var app_advert = 2;
               var app_domains = ["film.wanzofc.site"];
           </script>
           <script src='//api.gplinks.com/js/full-page-script.js'></script>
           
    </footer>
  );
}
