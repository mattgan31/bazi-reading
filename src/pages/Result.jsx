import React, { useState } from 'react'
import Result1 from './BaziResult1';
import Result2 from './BaziResult2';
import Result3 from './BaziResult3';
import { useLocation, Navigate } from 'react-router-dom';
import { generateBaziReading } from '../function/BaziCalculator';


const tabs = [
  { key: 'result1', label: 'Result 1' },
  { key: 'result2', label: 'Result 2' },
  { key: 'result3', label: 'Result 3' },
];

export default function Result() {
  const { state } = useLocation();
  const { name, birthDate, birthTime, gender } = state || {};

  if (!name || !birthDate || !birthTime || !gender) {
    return <Navigate to="/" replace />;
  }

  const biodata = {
    name, birthDate, birthTime, gender
  }

  const result = generateBaziReading({
    name,
    birthDate,
    birthTime,
    gender
  })

  const TabContent = ({ activeTab }) => {
    switch (activeTab) {
      case 'result1':
        return <Result1 result={result} biodata={biodata}/>;
      case 'result2':
        return <Result2 result={result} biodata={biodata}/>;
      case 'result3':
        return <Result3 result={result} biodata={biodata}/>;

      default:
        return null;
    }
  };

  const [activeTab, setActiveTab] = useState('result1');
  return (
    <div className='max-w-screen w-full'>
      {/* Tabs */}
      {/* <div className="flex space-x-4 border-b border-gray-200 mb-4 print:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-2 px-4 text-sm font-semibold ${activeTab === tab.key
                ? 'border-b-2 border-red-600 text-red-700'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div> */}

      <div className="max-w-screen w-full p-4 rounded shadow">
        {/* <TabContent activeTab={activeTab} /> */}
        <Result3 result={result} biodata={biodata} />
      </div>
    </div>
  )
}
