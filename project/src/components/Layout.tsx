import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Music } from 'lucide-react';
import { WalletButton } from './WalletButton';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Music className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Music Explorer</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/explore" className="text-gray-600 hover:text-gray-900">
                Explore
              </Link>
              <Link to="/verify" className="text-gray-600 hover:text-gray-900">
                Verify Music
              </Link>
              <WalletButton />
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}