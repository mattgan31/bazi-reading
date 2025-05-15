import React from 'react'
import { Tooltip } from 'react-tooltip'
import ReactECharts from 'echarts-for-react';

export default function Result3({ result, biodata }) {
    const handlePrint = () => {
        window.print();
    };

    function formatNumber(value) {
        if (value % 1 !== 0) {
            return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } else {
            return value.toLocaleString();
        }
    }

    const option1 = {
        yAxis: {
            max: 70,
            show: true,
            type: 'value'
        },
        axisModel: {},
        xAxis: {
            type: 'category',
            data: Object.keys(result.elementBalancePercentage),
        },
        toolbox: {
            show: false,
            feature: {
                mark: { show: true },
                dataView: { show: false, readOnly: true },
                restore: { show: false },
                saveAsImage: { show: true }
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                let tooltipText = '';
                params.forEach(function (item) {
                    tooltipText += `${item.name}: ${item.value.toFixed(2)}<br>`;
                });
                return tooltipText;
            }
        },
        series: {
            type: 'bar',
            data: Object.values(result.elementBalancePercentage),
            itemStyle: {
                color: function (params) {
                    return params.value < 3 ? 'rgba(75, 192, 192, 0.8)' : 'rgba(255, 206, 86, 0.8)';
                },
            },
            label: {
                show: true,
                formatter: function (params) {
                    return formatNumber(params.value);
                }
            }
        },
        label: {
            show: true,
            position: 'inside',
            formatter: '{c}'
        }
    };

    const indicators = Object.entries(result.elementBalancePercentage).map(([name]) => ({
        name,
        max: 70,
    }));

    const option2 = {
        radar: {
            // shape: 'circle',
            indicator: indicators
        },
        series: [
            {
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                    {
                        value: Object.values(result.elementBalancePercentage),
                    }
                ]
            }
        ]
    };

    return (
        <div className='max-w-screen w-auto flex flex-col gap-4'>
            <Tooltip id="my-tooltip" className='whitespace-pre-line'/>
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
                {/* <div>
                    <div className="w-full rounded-md overflow-hidden border">

                        <div
                            className="bg-red-800 dark:text-black text-white font-semibold p-2">
                            Five Elemental
                        </div>


                        <div className="flex bg-red-800 dark:text-black text-white font-semibold">
                            <div className="flex-1 p-2">Wood</div>
                            <div className="flex-1 p-2">Fire</div>
                            <div className="flex-1 p-2">Water</div>
                            <div className="flex-1 p-2">Earth</div>
                            <div className="flex-1 p-2">Metal</div>
                        </div>

                        <div className="flex ">
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementBalance.Wood}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementBalance.Fire}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementBalance.Water}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementBalance.Earth}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementBalance.Metal}</div>
                        </div>
                    </div>

                </div> */}
                <div>
                    <div className="w-full rounded-md overflow-hidden border"
                        data-tooltip-id="my-tooltip" data-tooltip-content="In BaZi (Four Pillars), each person has a combination of 8 characters (Heavenly Stems and Earthly Branches)
                        that represent the elements of Wood, Fire, Earth, Metal, and Water.
                        The purpose of this calculation is to identify which elements are dominant and which are weak in your life.">
                        {/* Title Row */}
                        <div className="bg-red-800 dark:text-black text-white font-semibold p-2">
                            Five Elemental
                        </div>

                        {/* Header Row */}
                        <div className="flex bg-red-800 dark:text-black text-white font-semibold">
                            <div className="flex-1 p-2">Wood</div>
                            <div className="flex-1 p-2">Fire</div>
                            <div className="flex-1 p-2">Water</div>
                            <div className="flex-1 p-2">Earth</div>
                            <div className="flex-1 p-2">Metal</div>
                        </div>

                        {/* Row */}
                        <div className="flex ">
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementBalance.Wood}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementBalance.Fire}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementBalance.Water}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementBalance.Earth}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementBalance.Metal}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="w-full rounded-md overflow-hidden border">
                        {/* Title Row */}
                        <div className="bg-red-800 dark:text-black text-white font-semibold p-2">
                            Elemental Chart
                        </div>

                        {/* Row */}
                        <div className="flex ">
                            <ReactECharts option={option1} className='md:w-full md:h-[600px] xs:w-full' />
                            <ReactECharts option={option2} className='md:w-full md:h-[600px] xs:w-full' />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="w-full rounded-md overflow-hidden border"
                        data-tooltip-id='my-tooltip'
                        data-tooltip-content={`Categorize Element is a process in BaZi analysis used to classify the five elements (Wood, Fire, Earth, Metal, Water)
                        based on their relationship with the Day Master (the element representing the self, found in the Heavenly Stem of the Day Pillar).
                        Each element has a natural relationship in the Five Element cycle (producing, controlling, weakening), and can be categorized as:
                        Supportive: The element that produces the Day Master
                        Weakening: The element that is produced by the Day Master
                        Controlling: The element that controls the Day Master
                        Same: The same element as the Day Master (can support or compete)
                        This classification helps to understand which elements are beneficial, which are challenging, and how the balance of elements influences a person's life according to Chinese metaphysics.`}
                    >
                        {/* Title Row */}
                        <div className="bg-red-800 dark:text-black text-white font-semibold p-2">
                            Categorize elements
                        </div>

                        {/* Header Row */}
                        <div className="flex bg-red-800 dark:text-black text-white font-semibold">
                            <div className="flex-1 p-2">Supportive</div>
                            <div className="flex-1 p-2">Weakening</div>
                            <div className="flex-1 p-2">Controlling</div>
                            <div className="flex-1 p-2">Same</div>
                        </div>

                        {/* Row */}
                        <div className="flex ">
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementCategories.supportive.element}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementCategories.weakening.element}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementCategories.controlling.element}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementCategories.same.element}</div>
                        </div>
                    </div>

                </div>
                <div>
                    <div className="w-full rounded-md overflow-hidden border"
                        data-tooltip-id='my-tooltip'
                        data-tooltip-content={`The Four Pillars of BaZi (also known as the Four Pillars of Destiny or Eight Characters) is a system in Chinese metaphysics used to analyze a person’s life based on their birth date and time.
                        Each pillar represents a time component and consists of two parts: the Heavenly Stem and the Earthly Branch.
                        The four pillars are:
                        1. Year Pillar – represents family heritage, childhood, and social environment.
                        2. Month Pillar – represents parents, teenage years, and career potential.
                        3. Day Pillar – represents the self (Day Master) and spouse.
                        4. Hour Pillar – represents children, inner thoughts, and future.
                        Each stem and branch contains one or more of the five elements (Wood, Fire, Earth, Metal, Water), which are used to understand personality, strengths, and the balance of energy in a person’s life.`}
                    >
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
                    <div className='w-full rounded-md overflow-hidden border'
                        data-tooltip-id='my-tooltip'
                        data-tooltip-content={
                            `This direction brings luck, health, harmony, and success.
                            It is usually determined based on a person's dominant element from their BaZi chart and their Kua number (in the Eight Mansions system).
                            It is ideal for facing while working, sleeping, or designing home and office layouts.`
                        }
                    >
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
                    <div className='w-full rounded-md overflow-hidden border'
                        data-tooltip-id='my-tooltip'
                        data-tooltip-content={
                            `This direction may cause obstacles, conflicts, illness, or setbacks.
                            It is best avoided for important activities.
                            Knowing and avoiding this direction helps maintain energetic balance and reduce negative influences in life.`
                        }
                    >
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
