'use client';
import useAuthStore from '@/stores/auth-store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaRegUserCircle,
  FaSignOutAlt,
  FaPlus,
  FaClipboard,
  FaMoneyBillWave,
  FaTicketAlt,
  FaUserAlt,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useSearch } from './SearchContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const notshow = usePathname();
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();
  const [ifMOpen, setIfMOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setSearchTerm } = useSearch();
  const dropdownRef = useRef<HTMLUListElement>(null); // Tambahkan ref untuk dropdown

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [user]);

  // Toggle menu responsif
  const toggleMenu = () => setIfMOpen(!ifMOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Fungsi untuk menutup dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Pastikan event.target adalah Node sebelum menggunakan contains
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    // Tambahkan event listener untuk mendeteksi klik di luar
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Hapus event listener saat komponen di-unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Fungsi untuk logout
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out',
    }).then((result) => {
      if (result.isConfirmed) {
        clearAuth();
        router.push('/');
        Swal.fire({
          title: 'Logged out!',
          text: 'You have been logged out successfully.',
          icon: 'success',
        });
      }
    });
  };

  // Jika berada di halaman login atau register, tidak menampilkan navbar
  if (notshow === '/login' || notshow === '/register') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-[#fff] py-4 px-8 transition-all duration-300 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="logo">
          <button onClick={() => router.push('/')}>
            <Image
              src="/logo/logo.svg"
              alt="logo"
              width={130}
              height={70}
              priority
              className="mb-2"
            />
          </button>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black cursor-pointer"
            aria-label={ifMOpen ? 'Close menu' : 'Open menu'}
          >
            {ifMOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <nav
          className={`md:flex ${ifMOpen ? 'block' : 'hidden'} absolute md:static w-full md:w-auto top-16 left-0 bg-white`}
        >
          <ul className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 py-4 md:py-0">
            <li className="w-full md:w-auto">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full md:w-96">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search for an events, artist, venue or city"
                  className="bg-gray-100 focus:outline-none text-sm w-full"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </li>

            {user ? (
              <>
                <li>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="text-[#1E1E1E] hover:text-[#4A4A4A] font-sans font-medium"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push('/')}
                    className="text-[#1E1E1E] hover:text-[#4A4A4A] font-sans font-medium"
                  >
                    Find Events
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push('')}
                    className="text-[#1E1E1E] hover:text-[#4A4A4A] font-sans font-medium"
                  >
                    Costumer Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push('/mytickets')}
                    className="text-[#1E1E1E] hover:text-[#4A4A4A] font-sans font-medium"
                  >
                    My Ticket
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push('/profile')}
                    className="text-[#1E1E1E] hover:text-[#4A4A4A] font-sans font-medium"
                  >
                    My Profile
                  </button>
                </li>
                <li className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 text-black focus:outline-none"
                  >
                    <FaRegUserCircle className="text-3xl text-red-500 mr-2" />
                    <svg
                      className={`w-4 h-4 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <ul
                      ref={dropdownRef} // Tambahkan ref pada dropdown
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                    >
                      <li>
                        <div className="flex flex-col items-center mb-8">
                          <h2 className="text-lg font-bold text-black">
                            {user.firstname}&nbsp;{user.lastname}
                          </h2>
                          <p className="text-gray-600 text-sm">{user.email}</p>
                          <p className="text-gray-600 text-sm mb-2">
                            {user.role}
                          </p>
                          <hr className="w-full border-gray-300 " />
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={() => router.push('/profile')}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-100"
                        >
                          <FaUserAlt className="mr-2 text-gray-500" />
                          <span>My Profile</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => router.push('/mytickets')}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-100"
                        >
                          <FaTicketAlt className="mr-2 text-gray-500" />
                          My Tickets
                        </button>
                      </li>
                      {user.role === 'Organizer' && (
                        <li>
                          <button
                            onClick={() => router.push('/create-events')}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-100"
                          >
                            <FaPlus className="mr-2 text-gray-500" />
                            Create an Event
                          </button>
                        </li>
                      )}
                      {user.role === 'Organizer' && (
                        <li>
                          <button
                            onClick={() => router.push('/myevents')}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-100"
                          >
                            <FaClipboard className="mr-2 text-gray-500" />
                            My events
                          </button>
                        </li>
                      )}
                      {user.role === 'Organizer' && (
                        <li>
                          <button
                            onClick={() => router.push('/organizer')}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-100"
                          >
                            <FaMoneyBillWave className="mr-2 text-gray-500" />
                            Transactions
                          </button>
                        </li>
                      )}
                      <hr className="w-full border-gray-300 " />
                      <li>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-100"
                        >
                          <FaSignOutAlt className="mr-2 text-gray-500" />
                          <span>Log out</span>
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => router.push('/')}
                    className="text-[#1E1E1E] hover:text-[#4A4A4A] font-sans font-medium"
                  >
                    Find Events
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push('/login')}
                    className="text-[#1E1E1E] hover:text-[#4A4A4A] font-sans font-medium"
                  >
                    Create Event
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push('/myevents')}
                    className="text-[#1E1E1E] hover:text-[#4A4A4A] font-sans font-medium"
                  >
                    Find my tickets
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push('/login')}
                    className="text-[#1E1E1E] hover:text-[#4A4A4A] font-sans font-medium"
                  >
                    Log in
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push('/register')}
                    className="px-4 py-2 bg-white text-black font-bold rounded-full shadow-md hover:bg-gray-200 focus:outline-none"
                  >
                    Sign Up
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
