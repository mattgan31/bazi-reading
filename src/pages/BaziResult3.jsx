import React from 'react'

export default function Result3({ result, biodata }) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className='max-w-screen w-auto flex flex-col gap-4'>
            {/* Header */}
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col print:hidden'>
                    <div className='flex-1 flex justify-center items-center gap-2'>
                        <div className='w-[10px] h-[10px] bg-red-800'></div>
                        <div>Red is Dynamic data</div>
                    </div>
                    <div className='flex-1 flex justify-center items-center gap-2'>
                        <div className='w-[10px] h-[10px] bg-blue-800 dark:bg-blue-500'></div>
                        <div>Blue is Static data</div>
                    </div>
                </div>
                <h1>PERSONAL CHART FOR 2025</h1>
                <div>
                    <span>{biodata.name} | {biodata.birthDate}({biodata.birthTime}) | {biodata.gender == "male" ? "Male" : "Female"}</span>
                </div>
            </div>

            {/* Main Content */}
            <div className='flex flex-col gap-4'>
                <div className='w-full'>
                    <div className="w-full rounded-md overflow-hidden border">
                        {/* Header */}
                        <div className="flex bg-blue-800 dark:bg-blue-500 dark:text-black text-white font-semibold">
                            <div className="flex-1 p-2">DAY MASTER</div>
                            <div className="flex-1 p-2">{result.dayMaster}</div>
                        </div>

                        {/* Rows */}
                        <div className="">
                            <div className="flex">
                                <div className="flex-1 px-2 py-2 text-blue-800 dark:text-blue-500 font-medium bg-gray-100 dark:bg-zinc-900">Celestial Animal</div>
                                <div className="flex-1 px-2 py-2 text-blue-800 dark:text-blue-500">Rabbit</div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 px-2 py-2 text-blue-800 dark:text-blue-500 font-medium bg-gray-100 dark:bg-zinc-900">Noble People</div>
                                <div className="flex-1 px-2 py-2 text-blue-800 dark:text-blue-500">Goat, Ox</div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 px-2 py-2 text-blue-800 dark:text-blue-500 font-medium bg-gray-100 dark:bg-zinc-900">Intelligence</div>
                                <div className="flex-1 px-2 py-2 text-blue-800 dark:text-blue-500">Monkey</div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 px-2 py-2 text-blue-800 dark:text-blue-500 font-medium bg-gray-100 dark:bg-zinc-900">Peach Blossom</div>
                                <div className="flex-1 px-2 py-2 text-blue-800 dark:text-blue-500">Rabbit</div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 px-2 py-2 text-blue-800 dark:text-blue-500 font-medium bg-gray-100 dark:bg-zinc-900">Sky Horse</div>
                                <div className="flex-1 px-2 py-2 text-blue-800 dark:text-blue-500">Monkey</div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 px-2 py-2 text-blue-800 dark:text-blue-500 font-medium bg-gray-100 dark:bg-zinc-900">Solitary</div>
                                <div className="flex-1 px-2 py-2 text-blue-800 dark:text-blue-500">Monkey</div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 px-2 py-2 text-blue-800 dark:text-blue-500 font-medium bg-gray-100 dark:bg-zinc-900">Life Palace</div>
                                <div className="flex-1 px-2 py-2 text-blue-800 dark:text-blue-500">Yin Wood Pig</div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 px-2 py-2 text-blue-800 dark:text-blue-500 font-medium bg-gray-100 dark:bg-zinc-900">Conception Palace</div>
                                <div className="flex-1 px-2 py-2 text-blue-800 dark:text-blue-500">Yin Fire Rabbit</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <div className="w-full rounded-md overflow-hidden border">
                        {/* Title Row */}
                        <div className="bg-red-800 dark:text-black text-white font-semibold p-2">
                            Four Pillars | Bazi
                        </div>

                        {/* Header Row */}
                        <div className="flex bg-red-800 dark:text-black text-white font-semibold">
                            <div className="flex-1 p-2">Type</div>
                            <div className="flex-1 p-2">Hour</div>
                            <div className="flex-1 p-2">Day</div>
                            <div className="flex-1 p-2">Month</div>
                            <div className="flex-1 p-2">Year</div>
                        </div>

                        {/* Stems Row */}
                        <div className="flex ">
                            <div className="flex-1 px-2 py-2 font-semibold bg-gray-100 dark:bg-zinc-900">Stems</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.baziPillars.hour.stem}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.baziPillars.day.stem}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.baziPillars.month.stem}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.baziPillars.year.stem}</div>
                        </div>

                        {/* Branches Row */}
                        <div className="flex ">
                            <div className="flex-1 px-2 py-2 font-semibold bg-gray-100 dark:bg-zinc-900">Branches</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.baziPillars.hour.branch}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.baziPillars.day.branch}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.baziPillars.month.branch}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.baziPillars.year.branch}</div>
                        </div>
                    </div>

                </div>
                <div>
                    <div className="w-full rounded-md overflow-hidden border">
                        {/* Title Row */}
                        <div className="grid grid-cols-4 bg-blue-800 dark:bg-blue-500 text-white dark:text-black text-left">
                            <div className="p-2">QI MEN DESTINY PALACE</div>
                            <div className="p-2">奇門命宫 : 西北 NW</div>
                            <div className="p-2 text-center">LIFE STAR</div>
                            <div className="p-2 text-center">風水命卦 GUA</div>
                        </div>

                        {/* Content Rows */}
                        <div className="grid grid-cols-4">
                            {/* Row 1 */}
                            <div className="p-2 bg-gray-100 dark:bg-zinc-900 text-blue-800 dark:text-blue-500">Life Stem</div>
                            <div className="p-2 text-blue-800 dark:text-blue-500">生氣 : 東南 SE</div>
                            <div className="p-2 text-center text-blue-800 dark:text-blue-500 row-span-4 flex flex-col justify-center">
                                <div>1 White</div>
                                <div>一白星命</div>
                                <div>Water 水</div>
                            </div>
                            <div className="p-2 text-center text-blue-800 dark:text-blue-500 row-span-4 flex flex-col justify-center">
                                <div>Kan</div>
                                <div>North</div>
                            </div>

                            {/* Row 2 */}
                            <div className="p-2 bg-gray-100 dark:bg-zinc-900 text-blue-800 dark:text-blue-500">Door of Destiny</div>
                            <div className="p-2 text-blue-800 dark:text-blue-500">天醫 : 東 E</div>

                            {/* Row 3 */}
                            <div className="p-2 bg-gray-100 dark:bg-zinc-900 text-blue-800 dark:text-blue-500">Star of Destiny</div>
                            <div className="p-2 text-blue-800 dark:text-blue-500">延年 : 南 S</div>

                            {/* Row 4 */}
                            <div className="p-2 bg-gray-100 dark:bg-zinc-900 text-blue-800 dark:text-blue-500">Guardian of Destiny</div>
                            <div className="p-2 text-blue-800 dark:text-blue-500">伏位 : 北 N</div>
                        </div>
                    </div>

                </div>
                <div>
                    <div className='w-full rounded-md overflow-hidden border'>
                        <div className='flex bg-red-800 dark:text-black text-white '>
                                <div className='flex-1 p-2'>FAVORABLE DIRECTIONS</div>
                                <div className='flex-1 p-2'>本命吉方</div>
                        </div>
                        <div className='flex'>
                            <div className='flex-1 px-2 py-2 bg-gray-100 dark:bg-zinc-900'>Fu Wei (Stability)</div>
                            <div className='flex-1 px-2 py-2 text-red-800'>{result.favorableDirections[0]}</div>
                        </div>
                        <div className='flex'>
                            <div className='flex-1 px-2 py-2 bg-gray-100 dark:bg-zinc-900'>Tian Yi (Heavenly Doctor)</div>
                            <div className='flex-1 px-2 py-2 text-red-800'>{result.favorableDirections[1]}</div>
                        </div>
                        <div className='flex'>
                            <div className='flex-1 px-2 py-2 bg-gray-100 dark:bg-zinc-900'>Sheng Qi (Life Generating)</div>
                            <div className='flex-1 px-2 py-2 text-red-800'>{result.favorableDirections[2]}</div>
                        </div>
                        <div className='flex'>
                            <div className='flex-1 px-2 py-2 bg-gray-100 dark:bg-zinc-900'>Yan Nian (Longevity)</div>
                            <div className='flex-1 px-2 py-2 text-red-800'>{result.favorableDirections[3]}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='w-full rounded-md overflow-hidden border'>
                        <div className='flex bg-red-800 dark:text-black text-white '>
                            <div className='flex-1 p-2'>UNFAVORABLE DIRECTIONS</div>
                            <div className='flex-1 p-2'>本命凶方</div>
                        </div>
                            <div className='flex'>
                                <div className='flex-1 px-2 py-2 bg-gray-100 dark:bg-zinc-900'>Wu Gui (Five Ghosts)</div>
                                <div className='flex-1 px-2 py-2 text-red-800'>{result.unfavorableDirections[0]}</div>
                            </div>
                            <div className='flex'>
                                <div className='flex-1 px-2 py-2 bg-gray-100 dark:bg-zinc-900'>Hou Hai (Mishaps)</div>
                                <div className='flex-1 px-2 py-2 text-red-800'>{result.unfavorableDirections[1]}</div>
                            </div>
                            <div className='flex'>
                                <div className='flex-1 px-2 py-2 bg-gray-100 dark:bg-zinc-900'>Liu Sha (Six Killings)</div>
                                <div className='flex-1 px-2 py-2 text-red-800'>{result.unfavorableDirections[2]}</div>
                            </div>
                            <div className='flex'>
                                <div className='flex-1 px-2 py-2 bg-gray-100 dark:bg-zinc-900'>Jue Ming (Life Threatening)</div>
                                <div className='flex-1 px-2 py-2 text-red-800'>{result.unfavorableDirections[3]}</div>
                            </div>
                    </div>
                </div>
                <div>
                    <div className='w-full rounded-md overflow-hidden border'>
                        <div className='flex bg-blue-800 dark:bg-blue-500 dark:text-black text-white '>
                            <div className='flex-1 p-2'>88</div>
                            <div className='flex-1 p-2'>78</div>
                            <div className='flex-1 p-2'>68</div>
                            <div className='flex-1 p-2'>58</div>
                            <div className='flex-1 p-2'>48</div>
                            <div className='flex-1 p-2'>38</div>
                            <div className='flex-1 p-2'>28</div>
                            <div className='flex-1 p-2'>18</div>
                            <div className='flex-1 p-2'>8</div>
                        </div>

                            <div className='flex'>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>丁</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>戊</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>己</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>庚</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>辛</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>壬</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>癸</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>甲</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>乙</div>
                            </div>
                            <div className='flex'>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>卯</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>辰</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>⺒</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>午</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>未</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>申</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>酉</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>戌</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>亥</div>
                            </div>
                            <div className='flex'>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>乙</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>癸 戊 乙</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>庚 丙 戊</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>丁 己</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>丁 己 乙</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>戊 庚 壬</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>辛</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>丁 戊 辛</div>
                                <div className='flex-1 px-2 py-2 text-blue-800 dark:text-blue-500'>壬 甲</div>
                            </div>
                    </div>
                </div>
                <div className="flex justify-center mt-8 print:hidden">
                    <button
                        onClick={handlePrint}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                        Print Result
                    </button>
                </div>
            </div>
        </div>
    )
}
