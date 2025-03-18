import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

const Header: React.FC = () => {
  return (
    <header className="bg-amber-200 p-4">
      <div className="flex items-center justify-between">
        <button className="text-2xl">&#8801;</button>
        <h1 className="text-2xl font-bold">Lunuch JAM</h1>
      </div>
    </header>
  );
};

export default Header;
