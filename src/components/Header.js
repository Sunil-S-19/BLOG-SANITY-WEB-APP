import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass-morphism border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-sm skew-x-[-15deg] group-hover:bg-white transition-colors"></div>
            <h2 className="font-black text-2xl tracking-tighter italic uppercase group-hover:text-red-500 transition-colors">
              REV
              <span className="text-red-600 group-hover:text-white">BLOG</span>
            </h2>
          </Link>
        </div>

        <nav>
          <ul className="flex items-center gap-8">
            <li>
              <Link
                to="/"
                className="text-xs uppercase font-black tracking-widest text-gray-400 hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="text-xs uppercase font-black tracking-widest text-gray-400 hover:text-white transition-colors"
              >
                The Garage
              </Link>
            </li>
            <li className="hidden md:block">
              <button className="px-5 py-2 bg-white/5 border border-white/10 rounded text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-600 hover:border-red-600 transition-all">
                Join Club
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
