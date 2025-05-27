import React from 'react'
import { Tooltip } from 'react-tooltip'
import ReactECharts from 'echarts-for-react';

export default function Result3({ result, biodata }) {
    // const [responseText, setResponseText] = useState('');
    // const [loading, setLoading] = useState(false);
    // const [responseReady, setResponseReady] = useState(false);

    const handlePrint = () => {
        window.print();
    };

    // const getAiResponse = async (descriptionResult) => {
    //     setResponseText('');
    //     setResponseReady(false);
    //     setLoading(true);

    //     try {
    //         const response = await fetch("http://157.245.62.206:8000/api/chat", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 messages: [
    //                     {
    //                         content: descriptionResult,
    //                         role: "user",
    //                     },
    //                 ],
    //             }),
    //         });

    //         const reader = response.body.getReader();
    //         const decoder = new TextDecoder("utf-8");

    //         let fullText = '';

    //         while (true) {
    //             const { done, value } = await reader.read();
    //             if (done) break;

    //             const chunk = decoder.decode(value, { stream: true });

    //             try {
    //                 const parsed = JSON.parse(chunk); // if response is array-like
    //                 if (Array.isArray(parsed)) {
    //                     for (const word of parsed) {
    //                         fullText += word;
    //                         setResponseText((prev) => prev + word);
    //                     }
    //                 } else {
    //                     fullText += chunk;
    //                     setResponseText((prev) => prev + chunk);
    //                 }
    //             } catch {
    //                 fullText += chunk;
    //                 setResponseText((prev) => prev + chunk);
    //             }
    //         }

    //         setResponseReady(true)
    //     } catch (error) {
    //         console.error("Streaming error:", error);
    //         setResponseText("Error receiving response.");
    //     }

    //     setLoading(false);
    // };

    // const getAiResponse = async (descriptionResult) => {
    //     setLoading(true)
    //     try {
    //         const response = await fetch(`http://${import.meta.env.VITE_AI_API_URL}/api/chat`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 model: "qwen2.5",
    //                 messages: [{ content: descriptionResult, role: "user" }],
    //                 stream: false
    //             }),
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log("Data received:", data);
    //             setResponseText(data.message.content)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // };



    function formatNumber(value) {
        if (value % 1 !== 0) {
            return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } else {
            return value.toLocaleString();
        }
    }

    const option1 = {
        yAxis: {
            max: 60,
            show: true,
            type: 'value'
        },
        axisModel: {},
        xAxis: {
            type: 'category',
            data: result.elementBalancePercentageBar.map(item => item.label)
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
            axisPointer: {
                type: 'shadow'
            },
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
            data: result.elementBalancePercentageBar.map(item => item.percentage),
            itemStyle: {
                color: 'rgba(255, 206, 86, 0.8)'
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
            formatter: '{c}',
        },
        media: [
            {
                query: { maxWidth: 480 },
                option: {
                    series: [{
                        barWidth: '60%',
                        label: {
                            fontSize: 9
                        }
                    }],
                    xAxis: {
                        axisLabel: {
                            rotate: 30,
                            fontSize: 10
                        }
                    }
                }
            }
        ]
    };

    // const indicators = Object.entries(result.elementBalancePercentage).map(([name]) => ({
    //     name,
    //     max: 50,
    // }));

    const option2 = {
        radar: {
            indicator: result.elementBalancePercentage.map(item => ({
                name: item.label,
                max: 60
            }))
        },
        series: [
            {
                name: 'Element Balance',
                type: 'radar',
                data: [
                    {
                        value: result.elementBalancePercentage.map(item => item.percentage)
                    }
                ]
            }
        ]
      };

    // const hasFetched = useRef(false);

    // useEffect(() => {
    //     if (result?.descriptionResult && !hasFetched.current) {
    //         getAiResponse(result.descriptionResult);
    //         hasFetched.current = true;
    //     }
    // }, [result]);

    return (
        <div className='max-w-screen w-auto flex flex-col gap-4'>
            {/* <Tooltip id="my-tooltip" className='whitespace-pre-line' /> */}
            {/* Header */}
            <div className='flex flex-col gap-4'>
                {/* <div className='flex flex-col print:hidden'>
                    <div className='flex-1 flex justify-center items-center gap-2'>
                        <div className='w-[10px] h-[10px] bg-red-800'></div>
                        <div>Red is Dynamic data</div>
                    </div>
                    <div className='flex-1 flex justify-center items-center gap-2'>
                        <div className='w-[10px] h-[10px] bg-blue-800 dark:bg-blue-500'></div>
                        <div>Blue is Static data</div>
                    </div>
                </div> */}
                <h1>PERSONAL CHART FOR 2025</h1>
                <div className='text-left'>
                    <h2 className='text-3xl'>Biodata</h2>
                    <p>Name: {biodata.name}</p>
                    <p>Birth Date: {biodata.birthDate.toLocaleDateString() }  </p>
                    <p>Birth Time: {biodata.birthTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}  </p>
                    <p>Gender: {biodata.gender == "male" ? "Male" : "Female"}  </p>
                </div>
            </div>

            {/* Main Content */}


            <div className='flex flex-col gap-2'>
                <div className='text-left'>
                    <h2 className='text-3xl'>The Four Pillars of BaZi</h2>
                    {/* <p>
                        This is your five elemental Wood, Fire, Water, Earth & Metal
                    </p> */}
                </div>
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
                    <div className="bg-red-800  text-white font-semibold p-2">
                        Four Pillars | Bazi
                    </div>

                    {/* Header Row */}
                    <div className="flex bg-red-800  text-white font-semibold">
                        <div className="flex-1 p-2">Hour</div>
                        <div className="flex-1 p-2">Day</div>
                        <div className="flex-1 p-2">Month</div>
                        <div className="flex-1 p-2">Year</div>
                        <div className="p-2"></div>
                    </div>

                    {/* Stems Row */}
                    <div className="flex ">
                        <div className="flex-1 flex items-center justify-center px-2 py-2 text-red-800">{result.translatedPillars.hour.stem} ({result.translatedPillars.hour.stemInfo.pinyin}) - {result.translatedPillars.hour.stemInfo.element}</div>
                        <div className="flex-1 flex items-center justify-center px-2 py-2 text-red-800">{result.translatedPillars.day.stem} ({result.translatedPillars.day.stemInfo.pinyin}) - {result.translatedPillars.day.stemInfo.element}</div>
                        <div className="flex-1 flex items-center justify-center px-2 py-2 text-red-800">{result.translatedPillars.month.stem} ({result.translatedPillars.month.stemInfo.pinyin}) - {result.translatedPillars.month.stemInfo.element}</div>
                        <div className="flex-1 flex items-center justify-center px-2 py-2 text-red-800">{result.translatedPillars.year.stem} ({result.translatedPillars.year.stemInfo.pinyin}) - {result.translatedPillars.year.stemInfo.element}</div>
                        <div className=" px-2 py-2 font-semibold bg-gray-100" style={{ writingMode: 'vertical-rl' }}>Stems</div>
                    </div>
                    <div className="flex ">
                        <div className="flex-1 flex items-center justify-center px-2 py-2 text-red-800">{result.translatedPillars.hour.branch} ({result.translatedPillars.hour.branchInfo.pinyin}) - {result.translatedPillars.hour.branchInfo.animal}</div>
                        <div className="flex-1 flex items-center justify-center px-2 py-2 text-red-800">{result.translatedPillars.day.branch} ({result.translatedPillars.day.branchInfo.pinyin}) - {result.translatedPillars.day.branchInfo.animal}</div>
                        <div className="flex-1 flex items-center justify-center px-2 py-2 text-red-800">{result.translatedPillars.month.branch} ({result.translatedPillars.month.branchInfo.pinyin}) - {result.translatedPillars.month.branchInfo.animal}</div>
                        <div className="flex-1 flex items-center justify-center px-2 py-2 text-red-800">{result.translatedPillars.year.branch} ({result.translatedPillars.year.branchInfo.pinyin}) - {result.translatedPillars.year.branchInfo.animal}</div>
                        <div className="px-2 py-2 font-semibold bg-gray-100" style={{ writingMode: 'vertical-rl' }}>Branches</div>
                    </div>
                    <div className="flex">
                        {['hour', 'day', 'month', 'year'].map((pillarKey) => {
                            const pillar = result.translatedPillars[pillarKey];
                            return (
                                <div key={pillarKey} className="flex-1 flex flex-col items-center justify-center px-2 py-2 text-red-800 space-y-1">
                                    {pillar.hiddenStems.map((hs, index) => {
                                        const info = pillar.hiddenStemsInfo[index];
                                        return (
                                            <div key={hs}>
                                                {hs} ({info.pinyin}) - {info.element}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                        <div
                            className="px-2 py-2 font-semibold bg-gray-100"
                            style={{ writingMode: 'vertical-rl' }}
                        >
                            Hidden Stem
                        </div>
                    </div>


                    {/* Branches Row */}
                    <div className="flex ">
                    </div>
                    <div className="flex ">
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                <div className='w-full'>
                    <div className="w-full rounded-md overflow-hidden border">

                        <div className="flex bg-red-800 dark:bg-red-800  text-white font-semibold">
                            <div className="flex-1 p-2">DAY MASTER</div>
                            <div className="flex-1 p-2">{result.dayMaster}</div>
                        </div>


                        <div className="">
                            <div className="flex bg-gray-100">
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 font-medium">Celestial Animal</div>
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800">{result.animal.celestial}</div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 font-medium">Noble People</div>
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800">{result.animal.noble}</div>
                            </div>
                            <div className="flex bg-gray-100">
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 font-medium">Intelligence</div>
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800">{result.animal.intelligence}</div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 font-medium">Peach Blossom</div>
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800">{result.animal.peach_blossom}</div>
                            </div>
                            <div className="flex bg-gray-100">
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 font-medium">Sky Horse</div>
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800">{result.animal.sky_horse}</div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 font-medium">Solitary</div>
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800">{result.animal.solitary}</div>
                            </div>
                            {/* <div className="flex bg-gray-100">
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 font-medium ">Life Palace</div>
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800">{result.animal.life_palace.full}</div>
                            </div> */}
                            <div className="flex bg-gray-100">
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 font-medium">Conception Palace</div>
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800">{result.animal.conception_palace.ganzhi}</div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* <div>
                    <div className="w-full rounded-md overflow-hidden border">

                        <div
                            className="bg-red-800  text-white font-semibold p-2">
                            Five Elemental
                        </div>


                        <div className="flex bg-red-800  text-white font-semibold">
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

                <div className='flex flex-col gap-2'>
                    <div className='text-left'>
                        <h2 className='text-3xl'>Five Elemental</h2>
                        <p>
                            This is your five elemental Wood, Fire, Earth, Metal & Water
                        </p>
                    </div>
                    <div className="w-full rounded-md overflow-hidden border"
                        data-tooltip-id="my-tooltip" data-tooltip-content="In BaZi (Four Pillars), each person has a combination of 8 characters (Heavenly Stems and Earthly Branches)
                        that represent the elements of Wood, Fire, Earth, Metal, and Water.
                        The purpose of this calculation is to identify which elements are dominant and which are weak in your life."
                    >
                        {/* Title Row */}
                        <div className="bg-red-800  text-white font-semibold p-2">
                            Five Elemental
                        </div>

                        {/* Header Row */}
                        <div className="flex flex-wrap sm:flex-nowrap bg-red-800 text-white font-semibold text-center">
                            <div className="flex-1 min-w-[40px] p-2 bg-green-600 flex items-center justify-center">木 - Wood</div>
                            <div className="flex-1 min-w-[40px] p-2 bg-red-600 flex items-center justify-center">火 - Fire</div>
                            <div className="flex-1 min-w-[40px] p-2 bg-orange-950 flex items-center justify-center">土 - Earth</div>
                            <div className="flex-1 min-w-[40px] p-2 bg-slate-600 flex items-center justify-center">金 - Metal</div>
                            <div className="flex-1 min-w-[40px] p-2 bg-blue-600 flex items-center justify-center">水 - Water</div>
                        </div>

                        {/* Row */}
                        <div className="flex ">
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementBalance.Wood}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementBalance.Fire}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementBalance.Earth}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementBalance.Metal}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementBalance.Water}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="w-full rounded-md overflow-hidden border">
                        {/* Title Row */}
                        <div className="bg-red-800  text-white font-semibold p-2">
                            Elemental Chart
                        </div>

                        {/* Row */}
                        <div className="flex flex-col">
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
                        <div className="bg-red-800  text-white font-semibold p-2">
                            Categorize elements
                        </div>

                        {/* Header Row */}
                        <div className="flex bg-red-800  text-white font-semibold">
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
                    <div className='w-full rounded-md overflow-hidden border'
                        data-tooltip-id='my-tooltip'
                        data-tooltip-content={
                            `This direction brings luck, health, harmony, and success.
                            It is usually determined based on a person's dominant element from their BaZi chart and their Kua number (in the Eight Mansions system).
                            It is ideal for facing while working, sleeping, or designing home and office layouts.`
                        }
                    >
                        <div className='flex bg-red-800  text-white '>
                            <div className='flex-1 p-2'>FAVORABLE DIRECTIONS</div>
                            <div className='flex-1 p-2'>本命吉方</div>
                        </div>
                        <div className='flex'>
                            <div className='flex-1 px-2 py-2 bg-gray-100 '>Fu Wei (Stability)</div>
                            <div className='flex-1 px-2 py-2 text-red-800'>{result.favorableDirections[0]}</div>
                        </div>
                        <div className='flex'>
                            <div className='flex-1 px-2 py-2 bg-gray-100 '>Tian Yi (Heavenly Doctor)</div>
                            <div className='flex-1 px-2 py-2 text-red-800'>{result.favorableDirections[1]}</div>
                        </div>
                        <div className='flex'>
                            <div className='flex-1 px-2 py-2 bg-gray-100 '>Sheng Qi (Life Generating)</div>
                            <div className='flex-1 px-2 py-2 text-red-800'>{result.favorableDirections[2]}</div>
                        </div>
                        <div className='flex'>
                            <div className='flex-1 px-2 py-2 bg-gray-100 '>Yan Nian (Longevity)</div>
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
                        <div className='flex bg-red-800  text-white '>
                            <div className='flex-1 p-2'>UNFAVORABLE DIRECTIONS</div>
                            <div className='flex-1 p-2'>不利的方向</div>
                        </div>
                        <div className='flex'>
                            <div className='flex-1 px-2 py-2 bg-gray-100 '>Wu Gui (Five Ghosts)</div>
                            <div className='flex-1 px-2 py-2 text-red-800'>{result.unfavorableDirections[0]}</div>
                        </div>
                        <div className='flex'>
                            <div className='flex-1 px-2 py-2 bg-gray-100 '>Hou Hai (Mishaps)</div>
                            <div className='flex-1 px-2 py-2 text-red-800'>{result.unfavorableDirections[1]}</div>
                        </div>
                        <div className='flex'>
                            <div className='flex-1 px-2 py-2 bg-gray-100 '>Liu Sha (Six Killings)</div>
                            <div className='flex-1 px-2 py-2 text-red-800'>{result.unfavorableDirections[2]}</div>
                        </div>
                        <div className='flex'>
                            <div className='flex-1 px-2 py-2 bg-gray-100 '>Jue Ming (Life Threatening)</div>
                            <div className='flex-1 px-2 py-2 text-red-800'>{result.unfavorableDirections[3]}</div>
                        </div>
                    </div>
                </div>
                {/* <div>
                    <h2 className='text-3xl'>Recommendation</h2>
                    {loading && <p>Generating...</p>}
                    <div style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
                        {responseText}
                    </div>
                </div> */}
                {/* <div>
                    <div className='w-full rounded-md overflow-hidden border'>
                        <div className='flex bg-blue-800 dark:bg-blue-500  text-white '>
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
                </div> */}
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
