import React from 'react';

const Result2 = ({result, biodata}) => {
    const handlePrint = () => window.print();

    return (
        <div className="min-h-screen bg-fixed bg-cover py-12 px-4 text-gray-600 dark:text-gray-100 ">
            <div className="max-w-5xl mx-auto rounded-2xl shadow-2xl p-8 border-4 border-gray-500 print:shadow-none">
                <header className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-red-700 font-[MaShanZheng]">八字命盘</h1>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mt-2">Bazi Life Profiling Chart – 2025</p>
                </header>

                {/* Biodata */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-6">
                    <div><span className="font-semibold">Name:</span> {biodata.name}</div>
                    <div><span className="font-semibold">DOB:</span> {biodata.birthDate}</div>
                    <div><span className="font-semibold">Gender:</span> {biodata.gender=="male" ? "Male":"Female"}</div>
                </section>

                {/* Day Master & Celestial Info */}
                <section className="flex flex-col items-center mb-8">
                    <h2 className="text-2xl font-bold text-red-600 mb-3">日主 (Day Master)</h2>
                    <div className="text-2xl flex items-center gap-4">
                        <span className="text-3xl">戊</span>
                        <span>Wu – Yang Earth 🌍</span>
                    </div>
                    <p className="mt-2 text-gray-800 dark:text-gray-200">
                        Represents mountain — dependable, strong, grounded.
                    </p>
                </section>

                {/* Element Balance */}
                <section className="mb-6">
                    <h2 className="text-2xl font-bold text-red-600 mb-3">五行比例 (Five Elements Balance)</h2>
                    <div className="grid grid-cols-5 gap-2 text-center">
                        <div><strong className="text-green-700">Wood 木</strong><div>{result.elementBalance.Wood}</div></div>
                        <div><strong className="text-red-700">Fire 火</strong><div>{result.elementBalance.Fire}</div></div>
                        <div><strong className="text-yellow-700">Earth 土</strong><div>{result.elementBalance.Earth}</div></div>
                        <div><strong className="text-gray-500 dark:text-gray-200">Metal 金</strong><div>{result.elementBalance.Metal}</div></div>
                        <div><strong className="text-blue-400">Water 水</strong><div>{result.elementBalance.Water}</div></div>
                    </div>
                </section>

                {/* Personality */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-red-600 mb-3">性格分析 (Personality Overview)</h2>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                        A Yang Earth individual is like a great mountain — unshaken, protective, stable, and calm.
                        You are often perceived as the "anchor" in relationships and career.
                    </p>
                </section>

                {/* Favorable Directions */}
                <section className="mb-6">
                    <h2 className="text-2xl font-bold text-red-600 mb-3">吉方位 (Favorable Directions)</h2>
                    <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
                        <li>东南 SE – Sheng Qi 生氣 (Growth & Opportunities)</li>
                        <li>正东 E – Tian Yi 天醫 (Health & Wellness)</li>
                        <li>正南 S – Yan Nian 延年 (Longevity)</li>
                        <li>正北 N – Fu Wei 伏位 (Stability)</li>
                    </ul>
                </section>

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-10 print:hidden">
                    <button
                        onClick={handlePrint}
                        className="bg-red-700 hover:bg-red-800 text-black dark:text-white font-bold py-2 px-6 rounded-lg"
                    >
                        🖨 Print Result
                    </button>
                    <button
                        onClick={() => alert('Coming soon: Download as PDF')}
                        className="bg-yellow-600 hover:bg-yellow-700 text-black dark:text-white font-bold py-2 px-6 rounded-lg"
                    >
                        💾 Save as PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Result2;
