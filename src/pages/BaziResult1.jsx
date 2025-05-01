// src/pages/Result.tsx
import React from 'react';

const Result1 = ({result, biodata}) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-gray-300">
            <h1 className="text-3xl font-bold text-center mb-6">Bazi Reading Result</h1>

            {/* Biodata Section */}
            <section className="mb-6 border rounded-xl p-4 shadow">
                <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
                <p><strong>Name:</strong> {biodata.name}</p>
                <p><strong>Date of Birth:</strong> {biodata.birthDate} - {biodata.birthTime}</p>
                <p><strong>Gender:</strong> {biodata.gender == "male" ? "Male" : "Female" }</p>
                <p><strong>Time Zone:</strong> GMT+8</p>
            </section>

            {/* Bazi Pillars Section */}
            <section className="mb-6 border rounded-xl p-4 shadow">
                <h2 className="text-xl font-semibold mb-2">Four Pillars (BaZi)</h2>
                <div className="grid grid-cols-4 gap-4 text-center font-medium">
                    <div>
                        <p className="dark:text-gray-100 font-bold">Year</p>
                        <p>Yang Wood</p>
                        <p>Dragon</p>
                    </div>
                    <div>
                        <p className="dark:text-gray-100 font-bold">Month</p>
                        <p>Yin Fire</p>
                        <p>Ox</p>
                    </div>
                    <div>
                        <p className="dark:text-gray-100 font-bold">Day</p>
                        <p>Yang Earth</p>
                        <p>Tiger</p>
                    </div>
                    <div>
                        <p className="dark:text-gray-100 font-bold">Hour</p>
                        <p>Yin Water</p>
                        <p>Rooster</p>
                    </div>
                </div>
            </section>

            {/* Element Balance */}
            <section className="mb-6 border rounded-xl p-4 shadow">
                <h2 className="text-xl font-semibold mb-2">Five Elements Balance</h2>
                <ul className="list-disc list-inside">
                    <li>Wood: {result.elementBalancePercentage.Wood}%</li>
                    <li>Fire: {result.elementBalancePercentage.Fire}%</li>
                    <li>Earth: {result.elementBalancePercentage.Earth}%</li>
                    <li>Metal: {result.elementBalancePercentage.Metal}%</li>
                    <li>Water: {result.elementBalancePercentage.Water}%</li>
                </ul>
            </section>

            {/* Personality Traits */}
            <section className="mb-6 border rounded-xl p-4 shadow">
                <h2 className="text-xl font-semibold mb-2">Personality Overview</h2>
                <p>
                    As a Yang Earth person, you are reliable, stable, and determined. Your energy
                    resembles a mountain—strong yet calm. You are naturally protective and grounded.
                </p>
            </section>

            {/* Recommendations */}
            <section className="mb-6 border rounded-xl p-4 shadow">
                <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
                <ul className="list-disc list-inside">
                    <li>Strengthen Water and Fire elements through lifestyle and color choices.</li>
                    <li>Career in teaching, real estate, or consulting is favorable.</li>
                    <li>Best compatibility with Yin Wood or Yang Metal people.</li>
                </ul>
            </section>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8 print:hidden">
                <button
                    onClick={handlePrint}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Print Result
                </button>
            </div>
        </div>
    );
};

export default Result1;
