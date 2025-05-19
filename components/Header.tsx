import React from 'react';
import Link from 'next/link';
const Header: React.FC = () => {
    return (
        <header className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">My AI Agent</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="#" className="text-white hover:text-gray-300">Home</Link>
                        </li>
                        <li>
                            <Link href="#" className="text-white hover:text-gray-300">About</Link>
                        </li>
                        <li>
                            <Link href="#" className="text-white hover:text-gray-300">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;