import React from 'react';
import Footer from '../../../components/Footer';
import { ChakraProvider } from '@chakra-ui/react';
import { BiQr } from 'react-icons/bi';

const QRPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* コンテンツ */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-8">〇〇さんいらっしゃい</h2>
        <div className="bg-amber-200 p-8 rounded-lg">
          <BiQr />
          <div className="w-64 h-64 bg-white rounded-lg"></div>
        </div>
      </main>
    </div>
  );
};

export default QRPage;
