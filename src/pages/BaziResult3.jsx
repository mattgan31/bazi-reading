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

    const directionMap = {
        N: { zh: '北', pinyin: 'Běi' },
        NE: { zh: '东北', pinyin: 'Dōngběi' },
        E: { zh: '东', pinyin: 'Dōng' },
        SE: { zh: '东南', pinyin: 'Dōngnán' },
        S: { zh: '南', pinyin: 'Nán' },
        SW: { zh: '西南', pinyin: 'Xīnán' },
        W: { zh: '西', pinyin: 'Xī' },
        NW: { zh: '西北', pinyin: 'Xīběi' },
        Center: { zh: '中', pinyin: 'Zhōng' },
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
                    <p>Birth Date: {biodata.birthDate.toLocaleDateString()}  </p>
                    <p>Birth Time: {biodata.birthTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}  </p>
                    <p>Gender: {biodata.gender == "male" ? "Male" : "Female"}  </p>
                </div>
            </div>

            {/* Main Content */}


            <div className='flex flex-col gap-4'>
                <div className='text-left'>
                    <h2 className='text-2xl md:text-3xl'>The Four Pillars of BaZi</h2>
                </div>

                {/* Mobile View (shown only on small screens) */}
                <div className="hidden">
                    <div className="w-full rounded-md overflow-hidden border">
                        <div className="bg-red-800 text-white font-semibold p-2 text-center">
                            Four Pillars | Bazi
                        </div>

                        {['hour', 'day', 'month', 'year'].map((pillarKey) => {
                            const pillar = result.translatedPillars[pillarKey];
                            const pillarName = pillarKey.charAt(0).toUpperCase() + pillarKey.slice(1);
                            const tenGod = result.tenGod[pillarKey]

                            return (
                                <div key={pillarKey} className="border-b">
                                    {/* Pillar Header */}
                                    <div className="bg-red-800 text-white font-semibold p-2 text-center">
                                        {pillarName}
                                    </div>

                                    {/* Stem Section */}
                                    <div className="p-3 border-b">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-2xl font-bold text-red-800">{pillar.stem}</div>
                                                <div className="text-xs text-gray-600">({pillar.stemInfo.pinyin}) {pillar.stemInfo.element}</div>
                                                <div className='text-xs'>{ tenGod.hanzi} </div>
                                            </div>
                                            <div className="text-sm font-semibold">Stem</div>
                                        </div>
                                    </div>

                                    {/* Branch Section */}
                                    <div className="p-3 border-b">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-2xl font-bold text-red-800">{pillar.branch}</div>
                                                <div className="text-xs text-gray-600">({pillar.branchInfo.pinyin}) {pillar.branchInfo.animal}</div>
                                            </div>
                                            <div className="text-sm font-semibold">Branch</div>
                                        </div>
                                    </div>

                                    {/* Hidden Stems Section */}
                                    <div className="p-3 bg-gray-50">
                                        <div className="flex justify-between">
                                            <div className="flex items-center flex-wrap gap-1">
                                                {pillar.hiddenStems.map((hs, index) => {
                                                    const info = pillar.hiddenStemsInfo[index];
                                                    return (
                                                        <div key={hs} className="text-xs">
                                                            {hs} ({info.pinyin}) <span className="text-red-800">{info.element}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="text-sm font-semibold pl-2">Stem<br />(Hidden)</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Desktop View (shown on medium screens and up) */}

                <div className=" w-full rounded-md overflow-hidden border"
                    data-tooltip-id='my-tooltip'
                    data-tooltip-content={`The Four Pillars of BaZi...`}>

                    {/* Title Row */}
                    <div className="bg-red-800 text-white font-semibold p-2 text-center">
                        Four Pillars | Bazi
                    </div>

                    {/* Main Table Container */}
                    <div className="flex">
                        {/* Pillars Content */}
                        <div className="grid grid-cols-4 flex-1">
                            {['hour', 'day', 'month', 'year'].map((pillarKey) => {
                                const pillar = result.translatedPillars[pillarKey];
                                const pillarName = pillarKey.charAt(0).toUpperCase() + pillarKey.slice(1);
                                const tenGod = result.tenGod[pillarKey]

                                return (
                                    <div key={pillarKey} className="flex flex-col">
                                        {/* Pillar Header */}
                                        <div className="bg-red-800 text-white font-semibold p-2 text-center">
                                            {pillarName}
                                        </div>

                                        {/* Stem Section */}
                                        <div className="flex-1 p-4 border-b border-r">
                                            <div className="text-center">
                                                <div className="text-3xl md:text-4xl font-bold text-red-800">
                                                    {pillar.stem}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    ({pillar.stemInfo.pinyin})
                                                </div>
                                                <div className="text-sm">
                                                    {pillar.stemInfo.element}
                                                </div>
                                                <div className='text-xs'>{tenGod.hanzi} </div>
                                            </div>
                                        </div>

                                        {/* Branch Section */}
                                        <div className="flex-1 p-4 border-b border-r">
                                            <div className="text-center">
                                                <div className="text-3xl md:text-4xl font-bold text-red-800">
                                                    {pillar.branch}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    ({pillar.branchInfo.pinyin})
                                                </div>
                                                <div className="text-sm">
                                                    {pillar.branchInfo.animal}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hidden Stems Section */}
                                        <div className="min-h-[140px] md:min-h-[80px] flex-1 flex justify-center items-center p-2 bg-gray-50 border-r">
                                            <div className="flex flex-wrap justify-center gap-1">
                                                {pillar.hiddenStems.map((hs, index) => {
                                                    const info = pillar.hiddenStemsInfo[index];
                                                    return (
                                                        <div key={hs} className="text-xs text-center px-1">
                                                            {hs} ({info.pinyin})<br />
                                                            <span className="text-red-800">{info.element}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right Side Captions */}
                        <div className="w-8 sm:w-16 flex flex-col">
                            {/* Empty space for header - matches pillar header height */}
                            <div className="h-[36px] bg-red-800 border-b"></div>

                            {/* Stem Caption - matches stem section height */}
                            <div className="flex-1 flex items-center justify-center font-semibold bg-gray-100 border-b">
                                <span style={{ writingMode: 'vertical-rl' }}>Stem</span>
                            </div>

                            {/* Branch Caption - matches branch section height */}
                            <div className="flex-1 flex items-center justify-center font-semibold bg-gray-100 border-b">
                                <span style={{ writingMode: 'vertical-rl' }}>Branch</span>
                            </div>

                            {/* Hidden Stems Caption - matches hidden stems section height */}
                            <div className="hidden sm:flex min-h-[80px] flex items-center justify-center font-semibold bg-gray-100">
                                <span style={{ writingMode: 'vertical-rl' }}>Stem<br />(Hidden)</span>
                            </div>

                            <div className="sm:hidden min-h-[140px] flex items-center justify-center font-semibold bg-gray-100">
                                <span style={{ writingMode: 'vertical-rl' }}>Stem (Hidden)</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='flex flex-col gap-4'>
                <div className='w-full'>
                    <div className="w-full rounded-md overflow-hidden border border-black">

                        {/* Day Master */}
                        <div className="flex bg-red-800 dark:bg-red-800 text-white font-semibold">
                            <div className="flex-1 p-2">DAY MASTER 日主</div>
                            <div className="flex-1 p-2">{result.dayMaster}</div>
                        </div>

                        <div>
                            {/* Celestial Animal */}
                            <div className="flex bg-gray-100">
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 border-b border-black border-r font-medium">
                                    Celestial Animal 生肖
                                </div>
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 border-b border-black">
                                    {result.animal.celestial}
                                </div>
                            </div>

                            {/* Noble People */}
                            <div className="flex">
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 border-b border-black border-r font-medium">
                                    Noble People 贵人
                                </div>
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 border-b border-black">
                                    {result.animal.noble}
                                </div>
                            </div>

                            {/* Intelligence Star */}
                            <div className="flex bg-gray-100">
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 border-b border-black border-r font-medium">
                                    Intelligence 文昌
                                </div>
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 border-b border-black">
                                    {result.animal.intelligence}
                                </div>
                            </div>

                            {/* Peach Blossom */}
                            <div className="flex">
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 border-b border-black border-r font-medium">
                                    Peach Blossom 桃花
                                </div>
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 border-b border-black">
                                    {result.animal.peach_blossom}
                                </div>
                            </div>

                            {/* Sky Horse */}
                            <div className="flex bg-gray-100">
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 border-b border-black border-r font-medium">
                                    Sky Horse 驛馬
                                </div>
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 border-b border-black">
                                    {result.animal.sky_horse}
                                </div>
                            </div>

                            {/* Solitary Star */}
                            <div className="flex">
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 border-b border-black border-r font-medium">
                                    Solitary 孤辰
                                </div>
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 border-b border-black">
                                    {result.animal.solitary}
                                </div>
                            </div>

                            {/* Conception Palace */}
                            <div className="flex bg-gray-100">
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800 border-r font-medium">
                                    Conception Palace 胎元
                                </div>
                                <div className="flex-1 px-2 py-2 text-red-800 dark:text-red-800">
                                    {result.animal.conception_palace.ganzhi}
                                </div>
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

                <div className='flex flex-col gap-4'>
                    <div className='text-left'>
                        <h2 className='text-2xl md:text-3xl'>Five Elemental</h2>
                        <p className='text-sm md:text-base'>
                            This is your five elemental Wood, Fire, Earth, Metal & Water
                        </p>
                    </div>

                    <div className="w-full rounded-md overflow-hidden border"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="In BaZi (Four Pillars), each person has a combination of 8 characters (Heavenly Stems and Earthly Branches) that represent the elements of Wood, Fire, Earth, Metal, and Water. The purpose of this calculation is to identify which elements are dominant and which are weak in your life."
                    >
                        {/* Title Row */}
                        <div className="bg-red-800 text-white font-semibold p-2 text-center">
                            Five Elemental
                        </div>

                        {/* Mobile-friendly table structure */}
                        <div className="hidden sm:block">
                            {/* Header Row - shown on desktop/tablet */}
                            <div className="flex bg-red-800 text-white font-semibold text-center">
                                {["Wood", "Fire", "Earth", "Metal", "Water"].map((element) => (
                                    <div
                                        key={element}
                                        className={`flex-1 p-2 min-w-0 ${element === "Wood" ? "bg-green-600" :
                                            element === "Fire" ? "bg-red-600" :
                                                element === "Earth" ? "bg-orange-950" :
                                                    element === "Metal" ? "bg-slate-600" : "bg-blue-600"
                                            }`}
                                    >
                                        {element === "Wood" ? "木 - Wood" :
                                            element === "Fire" ? "火 - Fire" :
                                                element === "Earth" ? "土 - Earth" :
                                                    element === "Metal" ? "金 - Metal" : "水 - Water"}
                                    </div>
                                ))}
                                <div className="w-10"></div>
                            </div>

                            {/* Data Rows - desktop/tablet */}
                            <div className="flex border-b">
                                {["Wood", "Fire", "Earth", "Metal", "Water"].map((element) => (
                                    <div key={`value-${element}`} className="flex-1 flex justify-center items-center border-r text-center p-2 text-red-800 last:border-r-0 ">
                                        {result.elementBalancePercentage.find(item => item.key === element)?.value || 0}
                                    </div>
                                ))}
                                <div className="w-10 sm:min-h-[60px] flex items-center justify-center font-semibold bg-gray-100">
                                    <span style={{ writingMode: 'vertical-rl' }}>Value</span>
                                </div>
                            </div>

                            <div className="flex">
                                {["Wood", "Fire", "Earth", "Metal", "Water"].map((element) => (
                                    <div key={`percentage-${element}`} className="flex-1 flex justify-center items-center border-r text-center p-2 text-red-800 last:border-r-0 ">
                                        {result.elementBalancePercentage.find(item => item.key === element)?.percentage || 0}%
                                    </div>
                                ))}
                                <div className="w-10 sm:min-h-[100px] flex items-center justify-center font-semibold bg-gray-100">
                                    <span style={{ writingMode: 'vertical-rl' }}>Percentage</span>
                                </div>
                            </div>
                        </div>

                        {/* Mobile view - stacked layout */}
                        <div className="sm:hidden">
                            <div className="bg-red-800 text-white font-semibold p-2 text-center">
                                Elements Breakdown
                            </div>

                            {["Wood", "Fire", "Earth", "Metal", "Water"].map((element) => {
                                const item = result.elementBalancePercentage.find(item => item.key === element);
                                return (
                                    <div key={element} className="">
                                        <div className={`p-2 text-white font-semibold text-center ${element === "Wood" ? "bg-green-600" :
                                            element === "Fire" ? "bg-red-600" :
                                                element === "Earth" ? "bg-orange-950" :
                                                    element === "Metal" ? "bg-slate-600" : "bg-blue-600"
                                            }`}>
                                            {element === "Wood" ? "木 - Wood" :
                                                element === "Fire" ? "火 - Fire" :
                                                    element === "Earth" ? "土 - Earth" :
                                                        element === "Metal" ? "金 - Metal" : "水 - Water"}
                                        </div>
                                        <div className="flex">
                                            <div className="flex-1 p-2 border-r text-center font-semibold bg-gray-100">
                                                Value
                                            </div>
                                            <div className="flex-1 p-2 text-center text-red-800">
                                                {item?.value || 0}
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="flex-1 p-2 border-r text-center font-semibold bg-gray-100">
                                                Percentage
                                            </div>
                                            <div className="flex-1 p-2 text-center text-red-800">
                                                {item?.percentage || 0}%
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
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
                {/* <div>
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
                        <div className="bg-red-800  text-white font-semibold p-2">
                            Categorize elements
                        </div>

                        <div className="flex bg-red-800  text-white font-semibold">
                            <div className="flex-1 p-2">Supportive</div>
                            <div className="flex-1 p-2">Weakening</div>
                            <div className="flex-1 p-2">Controlling</div>
                            <div className="flex-1 p-2">Same</div>
                        </div>

                        <div className="flex ">
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementCategories.supportive.element}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementCategories.weakening.element}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementCategories.controlling.element}</div>
                            <div className="flex-1 px-2 py-2 text-red-800">{result.elementCategories.same.element}</div>
                        </div>
                    </div>

                </div> */}

<div>
                    {/* FAVORABLE DIRECTIONS */}
                    <div
                        className="w-full rounded-md overflow-hidden border"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={`This direction brings luck, health, harmony, and success.
It is usually determined based on a person's dominant element from their BaZi chart and their Kua number (in the Eight Mansions system).
It is ideal for facing while working, sleeping, or designing home and office layouts.`}
                    >
                        <div className="flex bg-red-800 text-white">
                            <div className="flex-1 p-2">FAVORABLE DIRECTIONS</div>
                            <div className="flex-1 p-2">本命吉方</div>
                        </div>
                        <div className="flex">
                            <div className="flex-1 px-2 py-2 bg-gray-100 border-r border-b">
                                Fu Wei (Stability) <br /><span className="text-sm text-gray-500">伏位（稳定）</span>
                            </div>
                            <div className="flex-1 px-2 py-2 text-red-800 border-black border-b text-center">
                                <div className="text-lg font-semibold">{result.favorableDirections[0]}</div>
                                <div className="text-sm text-gray-600">
                                    {directionMap[result.favorableDirections[0]]?.zh} ({directionMap[result.favorableDirections[0]]?.pinyin})
                                </div>
                            </div>

                        </div>
                        <div className="flex">
                            <div className="flex-1 px-2 py-2 bg-gray-100 border-r border-b">
                                Tian Yi (Heavenly Doctor) <br /><span className="text-sm text-gray-500">天医（健康）</span>
                            </div>
                            <div className="flex-1 px-2 py-2 text-red-800 border-black border-b text-center">
                                <div className="text-lg font-semibold">{result.favorableDirections[1]}</div>
                                <div className="text-sm text-gray-600">
                                    {directionMap[result.favorableDirections[1]]?.zh} ({directionMap[result.favorableDirections[1]]?.pinyin})
                                </div>
                            </div>

                        </div>
                        <div className="flex">
                            <div className="flex-1 px-2 py-2 bg-gray-100 border-r border-b">
                                Sheng Qi (Life Generating) <br /><span className="text-sm text-gray-500">生气（兴旺）</span>
                            </div>
                            <div className="flex-1 px-2 py-2 text-red-800 border-black border-b text-center">
                                <div className="text-lg font-semibold">{result.favorableDirections[2]}</div>
                                <div className="text-sm text-gray-600">
                                    {directionMap[result.favorableDirections[2]]?.zh} ({directionMap[result.favorableDirections[2]]?.pinyin})
                                </div>
                            </div>

                        </div>
                        <div className="flex">
                            <div className="flex-1 px-2 py-2 bg-gray-100 border-r">
                                Yan Nian (Longevity) <br /><span className="text-sm text-gray-500">延年（长寿）</span>
                            </div>
                            <div className="flex-1 px-2 py-2 text-red-800 border-black  text-center">
                                <div className="text-lg font-semibold">{result.favorableDirections[3]}</div>
                                <div className="text-sm text-gray-600">
                                    {directionMap[result.favorableDirections[3]]?.zh} ({directionMap[result.favorableDirections[3]]?.pinyin})
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div>
                    {/* UNFAVORABLE DIRECTIONS */}
                    <div
                        className="w-full rounded-md overflow-hidden border mt-4"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={`This direction may cause obstacles, conflicts, illness, or setbacks.
It is best avoided for important activities.
Knowing and avoiding this direction helps maintain energetic balance and reduce negative influences in life.`}
                    >
                        <div className="flex bg-red-800 text-white">
                            <div className="flex-1 p-2">UNFAVORABLE DIRECTIONS</div>
                            <div className="flex-1 p-2">不利的方向</div>
                        </div>
                        <div className="flex">
                            <div className="flex-1 px-2 py-2 bg-gray-100 border-r border-b">
                                Wu Gui (Five Ghosts) <br /><span className="text-sm text-gray-500">五鬼（祸害）</span>
                            </div>
                            <div className="flex-1 px-2 py-2 text-red-800 border-black border-b text-center">
                                <div className="text-lg font-semibold">{result.unfavorableDirections[0]}</div>
                                <div className="text-sm text-gray-600">
                                    {directionMap[result.unfavorableDirections[0]]?.zh} ({directionMap[result.unfavorableDirections[0]]?.pinyin})
                                </div>
                            </div>

                        </div>
                        <div className="flex">
                            <div className="flex-1 px-2 py-2 bg-gray-100 border-r border-b">
                                Hou Hai (Mishaps) <br /><span className="text-sm text-gray-500">祸害（小人）</span>
                            </div>
                            <div className="flex-1 px-2 py-2 text-red-800 border-black border-b text-center">
                                <div className="text-lg font-semibold">{result.unfavorableDirections[1]}</div>
                                <div className="text-sm text-gray-600">
                                    {directionMap[result.unfavorableDirections[1]]?.zh} ({directionMap[result.unfavorableDirections[1]]?.pinyin})
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1 px-2 py-2 bg-gray-100 border-r border-b">
                                Liu Sha (Six Killings) <br /><span className="text-sm text-gray-500">六煞（损耗）</span>
                            </div>
                            <div className="flex-1 px-2 py-2 text-red-800 border-black border-b text-center">
                                <div className="text-lg font-semibold">{result.unfavorableDirections[2]}</div>
                                <div className="text-sm text-gray-600">
                                    {directionMap[result.unfavorableDirections[2]]?.zh} ({directionMap[result.unfavorableDirections[2]]?.pinyin})
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1 px-2 py-2 bg-gray-100 border-r">
                                Jue Ming (Life Threatening) <br /><span className="text-sm text-gray-500">绝命（危机）</span>
                            </div>
                            <div className="flex-1 px-2 py-2 text-red-800 border-black text-center">
                                <div className="text-lg font-semibold">{result.unfavorableDirections[3]}</div>
                                <div className="text-sm text-gray-600">
                                    {directionMap[result.unfavorableDirections[3]]?.zh} ({directionMap[result.unfavorableDirections[3]]?.pinyin})
                                </div>
                            </div>
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
                <div className='block sm:hidden text-left'>
                    <h2 className='text-2xl md:text-3xl'>10-Year Luck Pillars</h2>

                    {/* Mobile View */}
                    <div className="w-full rounded-md overflow-hidden border mt-4">
                        <div className="bg-red-800 text-white font-semibold p-2 text-center">
                            Luck Pillars
                        </div>

                        {result.luckyPillars.map((pillar, index) => {
                            return (
                                <div key={index} className="border-b">
                                    {/* Pillar Header */}
                                    <div className="bg-red-800 text-white font-semibold p-2 text-center">
                                        Age {pillar.startAge} – {pillar.endAge}
                                    </div>

                                    {/* Stem Section */}
                                    <div className="p-3 border-b">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-2xl font-bold text-red-800">{pillar.stem.hanzi}</div>
                                                <div className="text-xs text-gray-600">
                                                    ({pillar.stem.pinyin}) {pillar.stem.yinYang} {pillar.stem.element}
                                                </div>
                                            </div>
                                            <div className="text-sm font-semibold">Stem</div>
                                        </div>
                                    </div>

                                    {/* Branch Section */}
                                    <div className="p-3 border-b">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-2xl font-bold text-red-800">{pillar.branch.hanzi}</div>
                                                <div className="text-xs text-gray-600">
                                                    ({pillar.branch.pinyin}) {pillar.branch.animal}
                                                </div>
                                            </div>
                                            <div className="text-sm font-semibold">Branch</div>
                                        </div>
                                    </div>

                                    {/* Hidden Stems Section */}
                                    <div className="p-3 bg-gray-50">
                                        <div className="flex justify-between">
                                            <div className="flex items-center flex-wrap gap-1">
                                                {pillar.branch.hiddenStems.map((hs, idx) => (
                                                    <div key={idx} className="text-xs">
                                                        {hs.hanzi} ({hs.pinyin}) <span className="text-red-800">{hs.element}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-sm font-semibold pl-2 text-right">Stem<br />(Hidden)</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="">
                            {/* Pillar Header */}
                            <div className="bg-red-800 text-white font-semibold p-2 text-center">
                                Current Year
                            </div>

                            {/* Stem Section */}
                            <div className="p-3 border-b">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-2xl font-bold text-red-800">{result.currentYearPillar.stem}</div>
                                        <div className="text-xs text-gray-600">
                                            ({result.currentYearPillar.stemInfo.pinyin}) {result.currentYearPillar.stemInfo.yinYang} {result.currentYearPillar.stemInfo.element}
                                        </div>
                                    </div>
                                    <div className="text-sm font-semibold">Stem</div>
                                </div>
                            </div>

                            {/* Branch Section */}
                            <div className="p-3 border-b">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-2xl font-bold text-red-800">{result.currentYearPillar.branch}</div>
                                        <div className="text-xs text-gray-600">
                                            ({result.currentYearPillar.branchInfo.pinyin}) {result.currentYearPillar.branchInfo.animal}
                                        </div>
                                    </div>
                                    <div className="text-sm font-semibold">Branch</div>
                                </div>
                            </div>

                            {/* Hidden Stems Section */}
                            <div className="p-3 bg-gray-50">
                                <div className="flex justify-between">
                                    <div className="flex items-center flex-wrap gap-1">
                                        {result.currentYearPillar.hiddenStems.map((hs, index) => {
                                            const info = result.currentYearPillar.hiddenStemsInfo[index];
                                            return (
                                                <div key={hs} className="text-xs text-center">
                                                    {hs} ({info.pinyin})<br />
                                                    <span className="text-red-800">{info.element}</span>
                                                </div>
                                            );
                                        })}

                                    </div>
                                    <div className="text-sm font-semibold pl-2 text-right">Stem<br />(Hidden)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="hidden sm:flex w-full flex-col rounded-md overflow-hidden border"
                    data-tooltip-id="luck-tooltip"
                    data-tooltip-content="10-Year Luck Pillars based on your BaZi chart"
                >
                    {/* Title Row */}
                    <div className=" bg-red-800 text-white font-semibold p-2 text-center">
                        Luck Pillars (10-Year)
                    </div>

                    {/* Main Table Container */}
                    <div className="hidden sm:flex">
                        {/* Luck Pillars Grid */}
                        <div className="grid grid-cols-10 flex-1">
                            {result.luckyPillars.map((pillar, index) => (
                                <div key={index} className="flex flex-col">
                                    {/* Age Header */}
                                    <div className="bg-red-800 text-white font-semibold p-2 text-center text-xs sm:text-sm">
                                        Age {pillar.startAge}-{pillar.endAge}
                                    </div>

                                    {/* Stem Section */}
                                    <div className="flex-1 p-4 border-b border-r">
                                        <div className="text-center">
                                            <div className="text-3xl md:text-4xl font-bold text-red-800">
                                                {pillar.stem.hanzi}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                ({pillar.stem.pinyin})
                                            </div>
                                            <div className="text-sm">{pillar.stem.element}</div>
                                        </div>
                                    </div>

                                    {/* Branch Section */}
                                    <div className="flex-1 p-4 border-b border-r">
                                        <div className="text-center">
                                            <div className="text-3xl md:text-4xl font-bold text-red-800">
                                                {pillar.branch.hanzi}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                ({pillar.branch.pinyin})
                                            </div>
                                            <div className="text-sm">{pillar.branch.animal}</div>
                                        </div>
                                    </div>

                                    {/* Hidden Stems Section */}
                                    <div className="min-h-[140px] sm:min-h-[80px] flex-1 flex justify-center items-center p-2 bg-gray-50 border-r">
                                        <div className="flex flex-wrap justify-center gap-1">
                                            {pillar.branch.hiddenStems.map((hs, i) => (
                                                <div key={i} className="text-xs text-center px-1">
                                                    {hs.hanzi} ({hs.pinyin})<br />
                                                    <span className="text-red-800">{hs.element}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Current Year Pillar */}
                            <div className="flex flex-col">
                                <div className="min-h-[36px] md:min-h-[56px] lg:min-h-[36px] bg-red-800 text-white font-semibold p-2 text-center text-xs sm:text-sm">
                                    <span className='hidden xl:block'>
                                        Current Year
                                    </span>
                                    <span className='block xl:hidden'>
                                        Current
                                    </span>
                                </div>

                                {/* Stem Section */}
                                <div className="flex-1 p-4 border-b border-r">
                                    <div className="text-center">
                                        <div className="text-3xl md:text-4xl font-bold text-red-800">
                                            {result.currentYearPillar.stem}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            ({result.currentYearPillar.stemInfo.pinyin})
                                        </div>
                                        <div className="text-sm">{result.currentYearPillar.stemInfo.element}</div>
                                    </div>
                                </div>

                                {/* Branch Section */}
                                <div className="flex-1 p-4 border-b border-r">
                                    <div className="text-center">
                                        <div className="text-3xl md:text-4xl font-bold text-red-800">
                                            {result.currentYearPillar.branch}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            ({result.currentYearPillar.branchInfo.pinyin})
                                        </div>
                                        <div className="text-sm">{result.currentYearPillar.branchInfo.animal}</div>
                                    </div>
                                </div>

                                {/* Hidden Stems Section */}
                                <div className="min-h-[140px] sm:min-h-[80px] flex-1 flex justify-center items-center p-2 bg-gray-50 border-r">
                                    <div className="flex flex-wrap justify-center gap-1">
                                        {result.currentYearPillar.hiddenStems.map((hs, index) => {
                                            const info = result.currentYearPillar.hiddenStemsInfo[index];
                                            return (
                                                <div key={hs} className="text-xs text-center">
                                                    {hs} ({info.pinyin})<br />
                                                    <span className="text-red-800">{info.element}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side Captions */}
                        <div className="flex flex-col">
                            {/* Header Spacer */}
                            <div className="bg-red-800 border-b min-h-[56px] lg:min-h-[36px]"></div>

                            {/* Stem Label */}
                            <div className="flex-1 flex items-center justify-center font-semibold bg-gray-100 border-b">
                                <span style={{ writingMode: 'vertical-rl' }}>Stem</span>
                            </div>

                            {/* Branch Label */}
                            <div className="flex-1 flex items-center justify-center font-semibold bg-gray-100 border-b">
                                <span style={{ writingMode: 'vertical-rl' }}>Branch</span>
                            </div>

                            {/* Hidden Stem Label */}
                            <div className="hidden sm:flex min-w-8 lg:min-w-12 md:min-h-[114.67px] lg:min-h-[104px] items-center justify-center font-semibold bg-gray-100">
                                <span style={{ writingMode: 'vertical-rl' }}>Stem<br />(Hidden)</span>
                            </div>

                            {/* Mobile Hidden Stem Label */}
                            <div className="sm:hidden min-h-[140px] flex items-center justify-center font-semibold bg-gray-100">
                                <span style={{ writingMode: 'vertical-rl' }}>Stem (Hidden)</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* <div
                    className="w-full rounded-md overflow-hidden border"
                    data-tooltip-id="luck-tooltip"
                    data-tooltip-content="Current Year Pillar based on your BaZi chart"
                >


                    <div className="flex">

                        <div className="w-full rounded-md overflow-hidden">

                            <div className="bg-red-800 text-white font-semibold p-2 text-center">
                                Current Year Pillar
                            </div>


                            <div className="flex border-b">

                                <div className="flex-1 flex items-center justify-between p-4 ">
                                    <div>
                                        <div className="text-3xl font-bold text-red-800">
                                            {result.currentYearPillar.stem}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            ({result.currentYearPillar.stemInfo.pinyin})
                                        </div>
                                        <div className="text-sm">{result.currentYearPillar.stemInfo.element}</div>
                                    </div>
                                    <div className="text-sm font-semibold">Stem</div>
                                </div>
                            </div>


                            <div className="flex border-b">

                                <div className="flex-1 flex items-center justify-between p-4 ">
                                    <div>
                                        <div className="text-3xl font-bold text-red-800">
                                            {result.currentYearPillar.branch}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            ({result.currentYearPillar.branchInfo.pinyin})
                                        </div>
                                        <div className="text-sm">{result.currentYearPillar.branchInfo.animal}</div>
                                    </div>
                                    <div className="text-sm font-semibold">Branch</div>
                                </div>
                            </div>


                            <div className="flex">

                                <div className="flex-1 flex items-center justify-between p-4  bg-gray-50">
                                    <div className="flex flex-wrap gap-2">
                                        {result.currentYearPillar.hiddenStems.map((hs, index) => {
                                            const info = result.currentYearPillar.hiddenStemsInfo[index];
                                            return (
                                                <div key={hs} className="text-xs text-center">
                                                    {hs} ({info.pinyin})<br />
                                                    <span className="text-red-800">{info.element}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="text-sm font-semibold text-right">
                                        Stem<br />(Hidden)
                                    </div>
                                </div>
                            </div>
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
