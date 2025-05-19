import { Lunar } from 'lunar-javascript';

const stemToElement = {
    甲: 'Wood', 乙: 'Wood',
    丙: 'Fire', 丁: 'Fire',
    戊: 'Earth', 己: 'Earth',
    庚: 'Metal', 辛: 'Metal',
    壬: 'Water', 癸: 'Water',
};

// Optional: branch characters if you want to map branches directly
// const branchToElement = {
//     寅: 'Wood', 卯: 'Wood',
//     巳: 'Fire', 午: 'Fire',
//     辰: 'Earth', 丑: 'Earth', 未: 'Earth', 戌: 'Earth',
//     申: 'Metal', 酉: 'Metal',
//     亥: 'Water', 子: 'Water'
// };

const relationships = {
    Wood: { productive: 'Fire', draining: 'Water', controlling: 'Earth', same: 'Wood' },
    Fire: { productive: 'Earth', draining: 'Wood', controlling: 'Water', same: 'Fire' },
    Earth: { productive: 'Metal', draining: 'Fire', controlling: 'Wood', same: 'Earth' },
    Metal: { productive: 'Water', draining: 'Earth', controlling: 'Fire', same: 'Metal' },
    Water: { productive: 'Wood', draining: 'Metal', controlling: 'Earth', same: 'Water' },
};

const elementMap = {
    Wood: ['Jia', 'Yi', 'Yin', 'Mao'],
    Fire: ['Bing', 'Ding', 'Si', 'Wu'],
    Earth: ['Wu', 'Ji', 'Chou', 'Chen', 'Wei', 'Xu'],
    Metal: ['Geng', 'Xin', 'Shen', 'You'],
    Water: ['Ren', 'Gui', 'Zi', 'Hai'],
};

const hiddenStemsMap = {
    子: ['癸'], 丑: ['己', '癸', '辛'], 寅: ['甲', '丙', '戊'],
    卯: ['乙'], 辰: ['戊', '乙', '癸'], 巳: ['丙', '庚', '戊'],
    午: ['丁', '己'], 未: ['己', '丁', '乙'], 申: ['庚', '壬', '戊'],
    酉: ['辛'], 戌: ['戊', '辛', '丁'], 亥: ['壬', '甲']
};

const stemMap = {
    '甲': 'Jia', '乙': 'Yi', '丙': 'Bing', '丁': 'Ding', '戊': 'Wu', '己': 'Ji',
    '庚': 'Geng', '辛': 'Xin', '壬': 'Ren', '癸': 'Gui'
};

const branchMap = {
    '子': 'Zi', '丑': 'Chou', '寅': 'Yin', '卯': 'Mao', '辰': 'Chen', '巳': 'Si',
    '午': 'Wu', '未': 'Wei', '申': 'Shen', '酉': 'You', '戌': 'Xu', '亥': 'Hai'
};

const translatePillars = (pillars) => {
    return {
        day: {
            stem: stemMap[pillars.day.stem],
            branch: branchMap[pillars.day.branch],
        },
        hour: {
            stem: stemMap[pillars.hour.stem],
            branch: branchMap[pillars.hour.branch],
        },
        month: {
            stem: stemMap[pillars.month.stem],
            branch: branchMap[pillars.month.branch],
        },
        year: {
            stem: stemMap[pillars.year.stem],
            branch: branchMap[pillars.year.branch],
        }
    };
};



const getGuaNumber = (year, isMale) => {
    const last2 = year % 100;
    let gua = isMale ? 10 - last2 : last2 + 5;
    if (gua > 9) gua -= 9;
    return gua;
};

const getDirections = (gua) => {
    const eastGroup = [1, 3, 4, 9];
    const favorable = eastGroup.includes(gua) ? ['N', 'E', 'SE', 'S'] : ['NE', 'W', 'NW', 'SW'];
    const unfavorable = eastGroup.includes(gua) ? ['NE', 'W', 'NW', 'SW'] : ['N', 'E', 'SE', 'S'];
    return { favorable, unfavorable };
};

const countElements = (pillars) => {
    const elements = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };

    const countStem = (char) => {
        const el = stemToElement[char];
        if (el) elements[el]++;
    };

    Object.values(pillars).forEach(({ stem, branch }) => {
        countStem(stem); // Count Heavenly Stem
        const hiddenStems = hiddenStemsMap[branch];
        if (hiddenStems) {
            hiddenStems.forEach(countStem); // Count hidden stems inside Earthly Branch
        }
    });

    return elements;
};

function categorizeElements(dayMaster, chartElementCounts) {

    const dayMasterElement = stemToElement[dayMaster];

    const rel = relationships[dayMasterElement];

    return {
        supportive: { element: rel.draining, count: chartElementCounts[rel.draining] || 0 },     // 生我
        weakening: { element: rel.productive, count: chartElementCounts[rel.productive] || 0 },   // 我生
        controlling: { element: rel.controlling, count: chartElementCounts[rel.controlling] || 0 }, // 克我
        same: { element: rel.same, count: chartElementCounts[rel.same] || 0 }                    // 同我
    };
}


// Function to get the element from a Gan (Stem) or Zhi (Branch)
function getElementFromGanZhi(ganOrZhi) {
    for (const [element, gansAndZhis] of Object.entries(elementMap)) {
        if (gansAndZhis.includes(ganOrZhi)) {
            return element;
        }
    }
    return null;
}

function calculateElementBalance(pillars) {
    const elementCount = {
        Wood: 0,
        Fire: 0,
        Earth: 0,
        Metal: 0,
        Water: 0,
    };

    // Loop through each pillar (year, month, day, hour)
    for (const pillar of Object.values(pillars)) {
        // Count the elements for Gan (Heavenly Stem)
        const ganElement = getElementFromGanZhi(pillar.stem);
        if (ganElement) {
            elementCount[ganElement]++;
        }

        // Count the elements for Zhi (Earthly Branch)
        const zhiElement = getElementFromGanZhi(pillar.branch);
        if (zhiElement) {
            elementCount[zhiElement]++;
        }
    }

    // Calculate the total number of elements in the four pillars
    const totalElements = Object.values(elementCount).reduce((sum, count) => sum + count, 0);

    // Calculate the percentage of each element
    const elementPercentages = {};
    for (const [element, count] of Object.entries(elementCount)) {
        elementPercentages[element] = (count / totalElements) * 100;
    }

    return elementPercentages;
}

export const generateBaziReading = ({ name, birthDate, birthTime, gender }) => {
    const date = new Date(`${birthDate}T${birthTime}:00`)

    // Validate birth date
    if (!birthDate || isNaN(new Date(birthDate))) {
        console.error("Invalid birth date");
        return;
    }

    // Convert birthTime into minutes for a valid index calculation
    const birthTimeArray = birthTime.split(':');  // Assuming format is "HH:MM"
    const birthTimeInMinutes = parseInt(birthTimeArray[0]) * 60 + parseInt(birthTimeArray[1]);

    // Validate birthTime format
    if (isNaN(birthTimeInMinutes)) {
        console.error("Invalid birth time");
        return;
    }

    // Get the lunar representation
    const lunar = Lunar.fromDate(date);
    const eightChar = lunar.getEightChar();

    // Debug log: Check the structure of the eightChar object
    console.log(eightChar);

    // Calculate the hour index (0-11)
    const hour = date.getHours();      // jam 0–23
    const minute = date.getMinutes();  // menit 0–59
    const totalMinutes = hour * 60 + minute;
    const hourIndex = Math.floor(birthTimeInMinutes / 120); // Each GanZhi hour is 2 hours

    // Fetch the Gan and Zhi for the hour using getTimeGan and getTimeZhi
    const hourGan = eightChar.getTimeGan(hourIndex);
    const hourZhi = eightChar.getTimeZhi(hourIndex);

    // If hourGan or hourZhi is undefined, return early
    if (!hourGan || !hourZhi) {
        console.error("Invalid hour data");
        return;
    }

    // Prepare pillars object
    const pillars = {
        year: { stem: eightChar.getYearGan(), branch: eightChar.getYearZhi() },
        month: { stem: eightChar.getMonthGan(), branch: eightChar.getMonthZhi() },
        day: { stem: eightChar.getDayGan(), branch: eightChar.getDayZhi() },
        hour: { stem: hourGan, branch: hourZhi }, // Use the Gan and Zhi for the hour
    };


    // Element Joey Yap
    const stemToElement = {
        甲: "Wood", 乙: "Wood", 丙: "Fire", 丁: "Fire", 戊: "Earth", 己: "Earth",
        庚: "Metal", 辛: "Metal", 壬: "Water", 癸: "Water"
    };

    const hiddenStemsMap = {
        寅: ["甲", "丙", "戊"], // Yin: Wood, Fire, Earth
        卯: ["乙"],
        辰: ["戊", "乙", "癸"],
        巳: ["丙", "庚", "戊"],
        午: ["丁", "己"],
        未: ["己", "丁", "乙"],
        申: ["庚", "壬", "戊"],
        酉: ["辛"],
        戌: ["戊", "辛", "丁"],
        亥: ["壬", "甲"],
        子: ["癸"],
        丑: ["己", "癸", "辛"]
    };

    const countElementsJoeyYap = (pillars) => {
        const elements = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };

        const addElement = (stem, weight = 1) => {
            const el = stemToElement[stem];
            if (el) elements[el] += weight;
        };

        Object.values(pillars).forEach(({ stem, branch }) => {
            // 1. Hitung dari Heavenly Stem (selalu bobot 1)
            addElement(stem, 1);

            // 2. Hitung dari Hidden Stems
            const hiddenStems = hiddenStemsMap[branch];
            if (hiddenStems) {
                hiddenStems.forEach((s, i) => {
                    const weight = i === 0 ? 1 : i === 1 ? 0.5 : 0.3;
                    addElement(s, weight);
                });
            }
        });

        return elements;
    };

    // TEST

    const stemMap = {
        '甲': 'Jia', '乙': 'Yi', '丙': 'Bing', '丁': 'Ding', '戊': 'Wu',
        '己': 'Ji', '庚': 'Geng', '辛': 'Xin', '壬': 'Ren', '癸': 'Gui',
    };

    const branchMap = {
        '子': 'Zi', '丑': 'Chou', '寅': 'Yin', '卯': 'Mao', '辰': 'Chen',
        '巳': 'Si', '午': 'Wu', '未': 'Wei', '申': 'Shen', '酉': 'You',
        '戌': 'Xu', '亥': 'Hai',
    };

    const seasonalMultipliers = {
        spring: {
            Wood: 1.5,
            Metal: 0.5,
            Water: 1.2,
            Fire: 1.0,
            Earth: 0.8
        },
        summer: {
            Fire: 1.5,
            Water: 0.5,
            Wood: 1.2,
            Earth: 1.0,
            Metal: 0.7
        },
        autumn: {
            Metal: 1.5,
            Wood: 0.5,
            Earth: 1.2,
            Water: 1.0,
            Fire: 0.7
        },
        winter: {
            Water: 1.5,
            Fire: 0.5,
            Earth: 0.5,
            Metal: 1.0,
            Wood: 1.0
        }
    };

    const convertPillarsToLatin = (pillars) => {
        const result = {};

        Object.entries(pillars).forEach(([key, { stem, branch }]) => {
            result[key] = {
                stem: stemMap[stem] || stem,
                branch: branchMap[branch] || branch,
            };
        });

        return result;
    };

    const stemInfo = {
        甲: { pinyin: 'Jia', element: 'Wood', yinYang: 'Yang' },
        乙: { pinyin: 'Yi', element: 'Wood', yinYang: 'Yin' },
        丙: { pinyin: 'Bing', element: 'Fire', yinYang: 'Yang' },
        丁: { pinyin: 'Ding', element: 'Fire', yinYang: 'Yin' },
        戊: { pinyin: 'Wu', element: 'Earth', yinYang: 'Yang' },
        己: { pinyin: 'Ji', element: 'Earth', yinYang: 'Yin' },
        庚: { pinyin: 'Geng', element: 'Metal', yinYang: 'Yang' },
        辛: { pinyin: 'Xin', element: 'Metal', yinYang: 'Yin' },
        壬: { pinyin: 'Ren', element: 'Water', yinYang: 'Yang' },
        癸: { pinyin: 'Gui', element: 'Water', yinYang: 'Yin' },
    };

    const branchInfo = {
        子: { pinyin: 'Zi', animal: 'Rat' },
        丑: { pinyin: 'Chou', animal: 'Ox' },
        寅: { pinyin: 'Yin', animal: 'Tiger' },
        卯: { pinyin: 'Mao', animal: 'Rabbit' },
        辰: { pinyin: 'Chen', animal: 'Dragon' },
        巳: { pinyin: 'Si', animal: 'Snake' },
        午: { pinyin: 'Wu', animal: 'Horse' },
        未: { pinyin: 'Wei', animal: 'Goat' },
        申: { pinyin: 'Shen', animal: 'Monkey' },
        酉: { pinyin: 'You', animal: 'Rooster' },
        戌: { pinyin: 'Xu', animal: 'Dog' },
        亥: { pinyin: 'Hai', animal: 'Pig' },
      };


    const stemToElement2 = {
        Jia: { element: 'Wood', weight: 1.0 }, // 甲
        Yi: { element: 'Wood', weight: 1.0 }, // 乙
        Bing: { element: 'Fire', weight: 1.0 }, // 丙
        Ding: { element: 'Fire', weight: 1.0 }, // 丁
        Wu: { element: 'Earth', weight: 1.0 }, // 戊
        Ji: { element: 'Earth', weight: 1.0 }, // 己
        Geng: { element: 'Metal', weight: 1.0 }, // 庚
        Xin: { element: 'Metal', weight: 1.0 }, // 辛
        Ren: { element: 'Water', weight: 1.0 }, // 壬
        Gui: { element: 'Water', weight: 1.0 }, // 癸
    };

    const hiddenStemsMap2 = {
        Zi: [ // 子
            { stem: 'Gui', element: 'Water', weight: 0.5 },
        ],
        Chou: [ // 丑
            { stem: 'Ji', element: 'Earth', weight: 0.5 },
            { stem: 'Gui', element: 'Water', weight: 0.3 },
            { stem: 'Xin', element: 'Metal', weight: 0.2 },
        ],
        Yin: [ // 寅
            { stem: 'Jia', element: 'Wood', weight: 0.6 },
            { stem: 'Bing', element: 'Fire', weight: 0.3 },
            { stem: 'Wu', element: 'Earth', weight: 0.1 },
        ],
        Mao: [ // 卯
            { stem: 'Yi', element: 'Wood', weight: 1.0 },
        ],
        Chen: [ // 辰
            { stem: 'Wu', element: 'Earth', weight: 0.5 },
            { stem: 'Yi', element: 'Wood', weight: 0.3 },
            { stem: 'Gui', element: 'Water', weight: 0.2 },
        ],
        Si: [ // 巳
            { stem: 'Bing', element: 'Fire', weight: 1.0 },
            { stem: 'Wu', element: 'Earth', weight: 0.5 },
            { stem: 'Geng', element: 'Metal', weight: 0.3 },
        ],
        Wu: [ // 午
            { stem: 'Ding', element: 'Fire', weight: 0.8 },
            { stem: 'Ji', element: 'Earth', weight: 0.2 },
        ],
        Wei: [ // 未
            { stem: 'Ji', element: 'Earth', weight: 0.6 },
            { stem: 'Yi', element: 'Wood', weight: 0.3 },
            { stem: 'Ding', element: 'Fire', weight: 0.1 },
        ],
        Shen: [ // 申
            { stem: 'Geng', element: 'Metal', weight: 0.6 },
            { stem: 'Ren', element: 'Water', weight: 0.3 },
            { stem: 'Wu', element: 'Earth', weight: 0.1 },
        ],
        You: [ // 酉
            { stem: 'Xin', element: 'Metal', weight: 1.0 },
        ],
        Xu: [ // 戌
            { stem: 'Wu', element: 'Earth', weight: 0.5 },
            { stem: 'Xin', element: 'Metal', weight: 0.3 },
            { stem: 'Ding', element: 'Fire', weight: 0.2 },
        ],
        Hai: [ // 亥
            { stem: 'Ren', element: 'Water', weight: 0.5 },
            { stem: 'Jia', element: 'Wood', weight: 0.3 },
        ],
    };

    const translatedPillars = {};

    Object.entries(pillars).forEach(([key, { stem, branch }]) => {
        console.log('Pillars:', pillars);

        const stemData = stemInfo[stem];
        const branchData = branchInfo[branch];

        if (!stemData) {
            console.warn(`Stem "${stem}" not found in stemInfo`);
        }
        if (!branchData) {
            console.warn(`Branch "${branch}" not found in branchInfo`);
        }

        translatedPillars[key] = {
            stem,
            stemInfo: stemData || { pinyin: 'Unknown', element: 'Unknown', yinYang: 'Unknown' },
            branch,
            branchInfo: branchData || { pinyin: 'Unknown', animal: 'Unknown' },
        };
    });

    console.log(translatedPillars);

    const latinPillars = convertPillarsToLatin(pillars)

    function applySeasonalCorrection(balance, season) {
        const corrected = { ...balance };
        const multipliers = seasonalMultipliers[season];

        Object.keys(corrected).forEach((element) => {
            corrected[element] = Number(
                (corrected[element] * (multipliers[element] || 1)).toFixed(2)
            );
        });

        return corrected;
    }

    const countElements2 = (pillars) => {
        const elements = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };

        // Hitung dari batang langit
        Object.values(pillars).forEach(({ stem, branch }) => {
            const stemData = stemToElement2[stem];
            if (stemData) {
                elements[stemData.element] += stemData.weight;
            }

            // Hitung dari hidden stems di cabang bumi
            const hiddenStems = hiddenStemsMap2[branch];
            if (hiddenStems) {
                hiddenStems.forEach(({ element, weight }) => {
                    elements[element] += weight;
                });
            }
        });

        Object.keys(elements).forEach(key => {
            elements[key] = Number(elements[key].toFixed(2));
        });

        const month = date.getMonth()

        let season = null

        switch (month) {
            case 0:
            case 1:
            case 2:
                season = "spring";
                break;
            case 3:
            case 4:
            case 5:
                season = "summer";
                break;
            case 6:
            case 7:
            case 8:
                season = "autumn";
                break;
            case 9:
            case 10:
            case 11:
                season = "winter";
                break;
            default:
                console.log("Invalid month");
        }


        const result = applySeasonalCorrection(elements, season)

        return result;
    };

    const elementPercentage = (element, total) => {
        return total > 0 ? (element / total) * 100 : 0;
    }

    const calculateElementBalance2 = (elements) => {
        const percentagePerElement = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };

        const totalElement = Object.values(elements).reduce((sum, val) => sum + val, 0);

        Object.entries(elements).forEach(([key, value]) => {
            percentagePerElement[key] += parseFloat(elementPercentage(value, totalElement).toFixed(2))
        })

        return percentagePerElement
    }


    // const translatedPillars = translatePillars(pillars);
    // Get element balance and other computations
    // const elementBalance = countElements(pillars);
    const elementBalance = countElements2(latinPillars);
    const elementJoeyYap = countElementsJoeyYap(pillars);
    console.log(elementJoeyYap)

    // const elementBalancePercentage = calculateElementBalance(translatedPillars)
    const elementBalancePercentage = calculateElementBalance2(elementBalance)
    const dayMaster = pillars.day.stem;
    const guaNumber = getGuaNumber(date.getFullYear(), gender === 'male');
    const { favorable, unfavorable } = getDirections(guaNumber);
    const elementCategories = categorizeElements(dayMaster, elementBalance);

    const descriptionResult = `Give me a simple (short) summary of personality about Bazi reading, I got the day master is ${dayMaster}, and the five elemental balance is ${Object.entries(elementBalance)
        .map(([key, value]) => `${key} = ${value}`)
        .join(', ')}`;


    return {
        name,
        baziPillars: pillars,
        dayMaster,
        elementBalance,
        elementBalancePercentage,
        elementCategories,
        guaNumber,
        favorableDirections: favorable,
        unfavorableDirections: unfavorable,
        elementJoeyYap,
        translatedPillars,
        descriptionResult
    };
};

