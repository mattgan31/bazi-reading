import { Lunar } from 'lunar-javascript';

const stemToElement = {
    甲: 'Wood', 乙: 'Wood',
    丙: 'Fire', 丁: 'Fire',
    戊: 'Earth', 己: 'Earth',
    庚: 'Metal', 辛: 'Metal',
    壬: 'Water', 癸: 'Water',
};

const relationships = {
    Wood: { productive: 'Fire', draining: 'Water', controlling: 'Earth', same: 'Wood' },
    Fire: { productive: 'Earth', draining: 'Wood', controlling: 'Water', same: 'Fire' },
    Earth: { productive: 'Metal', draining: 'Fire', controlling: 'Wood', same: 'Earth' },
    Metal: { productive: 'Water', draining: 'Earth', controlling: 'Fire', same: 'Metal' },
    Water: { productive: 'Wood', draining: 'Metal', controlling: 'Earth', same: 'Water' },
};

// const skyHorseMap = {
//     '申': '寅', '子': '寅', '辰': '寅', // Monkey, Rat, Dragon → Tiger
//     '寅': '申', '午': '申', '戌': '申', // Tiger, Horse, Dog → Monkey
//     '巳': '亥', '酉': '亥', '丑': '亥', // Snake, Rooster, Ox → Pig
//     '亥': '巳', '卯': '巳', '未': '巳'  // Pig, Rabbit, Goat → Snake
// };

// const skyHorseMap = {
//     '寅': '申', '午': '申', '戌': '申',     // Sky Horse = Shen
//     '亥': '寅', '卯': '寅', '未': '寅',     // Sky Horse = Yin
//     '申': '寅', '子': '寅', '辰': '寅',     // Sky Horse = Yin
//     '巳': '亥', '酉': '亥', '丑': '亥'      // Sky Horse = Hai
// };
const skyHorseMap = {
    '寅': '申', '午': '申', '戌': '申',   // Group 1 → Shen
    '申': '寅', '子': '寅', '辰': '寅',   // Group 2 → Yin
    '巳': '亥', '酉': '亥', '丑': '亥',   // Group 3 → Hai
    '亥': '巳', '卯': '巳', '未': '巳'    // Group 4 → Si
};

const noblePeopleMap = {
    '甲': ['丑', '未'],
    '乙': ['子', '申'],
    '丙': ['亥', '酉'],
    '丁': ['亥', '酉'],
    '戊': ['丑', '未'],
    '己': ['子', '申'],
    '庚': ['丑', '未'],
    '辛': ['子', '申'],
    '壬': ['亥', '酉'],
    '癸': ['亥', '酉']
};

const solitaryMap = {
    '寅': '丑',
    '卯': '子',
    '辰': '酉',
    '巳': '午',
    '午': '丑',
    '未': '子',
    '申': '亥',
    '酉': '午',
    '戌': '丑',
    '亥': '子',
    '子': '酉',
    '丑': '寅'
};

const peachBlossomMap = {
    '子': '卯',
    '丑': '午',
    '寅': '酉',
    '卯': '子',
    '辰': '卯',
    '巳': '午',
    '午': '酉',
    '未': '子',
    '申': '酉',
    '酉': '午',
    '戌': '酉',
    '亥': '子'
};


const intelligenceStarMap = {
    '子' : '卯',
    '丑' : '巳',
    '寅' : '午',
    '卯' : '申',
    '辰' : '酉',
    '巳' : '亥',
    '午' : '子',
    '未' : '寅',
    '申' : '卯',
    '酉' : '巳',
    '戌' : '午',
    '亥' : '申',
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

// Element Joey Yap
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

const stemMap = {
    '甲': 'Jia', '乙': 'Yi', '丙': 'Bing', '丁': 'Ding', '戊': 'Wu',
    '己': 'Ji', '庚': 'Geng', '辛': 'Xin', '壬': 'Ren', '癸': 'Gui',
};

const branchMap = {
    '子': 'Zi', '丑': 'Chou', '寅': 'Yin', '卯': 'Mao', '辰': 'Chen',
    '巳': 'Si', '午': 'Wu', '未': 'Wei', '申': 'Shen', '酉': 'You',
    '戌': 'Xu', '亥': 'Hai',
};

const stemMeta = {
    '甲': { element: 'Wood', yinYang: 'Yang' },
    '乙': { element: 'Wood', yinYang: 'Yin' },
    '丙': { element: 'Fire', yinYang: 'Yang' },
    '丁': { element: 'Fire', yinYang: 'Yin' },
    '戊': { element: 'Earth', yinYang: 'Yang' },
    '己': { element: 'Earth', yinYang: 'Yin' },
    '庚': { element: 'Metal', yinYang: 'Yang' },
    '辛': { element: 'Metal', yinYang: 'Yin' },
    '壬': { element: 'Water', yinYang: 'Yang' },
    '癸': { element: 'Water', yinYang: 'Yin' },
};

const elementRelation = {
    Wood: { generates: 'Fire', controls: 'Earth', generatedBy: 'Water', controlledBy: 'Metal' },
    Fire: { generates: 'Earth', controls: 'Metal', generatedBy: 'Wood', controlledBy: 'Water' },
    Earth: { generates: 'Metal', controls: 'Water', generatedBy: 'Fire', controlledBy: 'Wood' },
    Metal: { generates: 'Water', controls: 'Wood', generatedBy: 'Earth', controlledBy: 'Fire' },
    Water: { generates: 'Wood', controls: 'Fire', generatedBy: 'Metal', controlledBy: 'Earth' },
};

const tenGodMap = {
    Friend: { hanzi: '比肩', pinyin: 'Bǐ Jiān', english: 'Friend' },
    RobWealth: { hanzi: '劫财', pinyin: 'Jié Cái', english: 'Rob Wealth' },
    EatingGod: { hanzi: '食神', pinyin: 'Shí Shén', english: 'Eating God' },
    HurtingOfficer: { hanzi: '伤官', pinyin: 'Shāng Guān', english: 'Hurting Officer' },
    DirectWealth: { hanzi: '正财', pinyin: 'Zhèng Cái', english: 'Direct Wealth' },
    IndirectWealth: { hanzi: '偏财', pinyin: 'Piān Cái', english: 'Indirect Wealth' },
    DirectOfficer: { hanzi: '正官', pinyin: 'Zhèng Guān', english: 'Direct Officer' },
    SevenKillings: { hanzi: '七杀', pinyin: 'Qī Shā', english: 'Seven Killings' },
    DirectResource: { hanzi: '正印', pinyin: 'Zhèng Yìn', english: 'Direct Resource' },
    IndirectResource: { hanzi: '偏印', pinyin: 'Piān Yìn', english: 'Indirect Resource' },
    Self: { hanzi: '日主', pinyin: 'Rì Zhǔ', english: 'Day Master' }
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

function isForwardDirection(dayStem, gender) {
    const yangStems = ['Jia', 'Bing', 'Wu', 'Geng', 'Ren'];
    const isYang = yangStems.includes(dayStem);

    if (gender.toLowerCase() === 'male') {
        return isYang; // Male + Yang => Forward
    } else if (gender.toLowerCase() === 'female') {
        return !isYang; // Female + Yin => Forward
    } else {
        throw new Error("Gender must be 'male' or 'female'");
    }
}

function getTenGod(dayMasterStem, targetStem) {
    if (dayMasterStem === targetStem) {
        return tenGodMap.Self;
    }

    const dm = stemMeta[dayMasterStem];
    const tg = stemMeta[targetStem];

    const sameYinYang = dm.yinYang === tg.yinYang;
    const relation = elementRelation[dm.element];

    if (tg.element === dm.element) {
        return sameYinYang ? tenGodMap.RobWealth : tenGodMap.Friend;
    }
    if (tg.element === relation.generates) {
        return sameYinYang ? tenGodMap.IndirectWealth : tenGodMap.DirectWealth;
    }
    if (tg.element === relation.generatedBy) {
        return sameYinYang ? tenGodMap.IndirectResource : tenGodMap.DirectResource;
    }
    if (tg.element === relation.controls) {
        return sameYinYang ? tenGodMap.HurtingOfficer : tenGodMap.EatingGod;
    }
    if (tg.element === relation.controlledBy) {
        return sameYinYang ? tenGodMap.SevenKillings : tenGodMap.DirectOfficer;
    }

    return { hanzi: '未知', pinyin: 'Wèi Zhī', english: 'Unknown' };
}

function generateLuckPillarsData(startStem, startBranch, forward, startingAge, count = 10) {
    const stems = [
        { hanzi: '甲', pinyin: 'Jia', element: 'Wood', yinYang: 'Yang' },
        { hanzi: '乙', pinyin: 'Yi', element: 'Wood', yinYang: 'Yin' },
        { hanzi: '丙', pinyin: 'Bing', element: 'Fire', yinYang: 'Yang' },
        { hanzi: '丁', pinyin: 'Ding', element: 'Fire', yinYang: 'Yin' },
        { hanzi: '戊', pinyin: 'Wu', element: 'Earth', yinYang: 'Yang' },
        { hanzi: '己', pinyin: 'Ji', element: 'Earth', yinYang: 'Yin' },
        { hanzi: '庚', pinyin: 'Geng', element: 'Metal', yinYang: 'Yang' },
        { hanzi: '辛', pinyin: 'Xin', element: 'Metal', yinYang: 'Yin' },
        { hanzi: '壬', pinyin: 'Ren', element: 'Water', yinYang: 'Yang' },
        { hanzi: '癸', pinyin: 'Gui', element: 'Water', yinYang: 'Yin' },
    ];

    const branches = [
        { hanzi: '子', pinyin: 'Zi', animal: 'Rat', hidden: ['癸'] },
        { hanzi: '丑', pinyin: 'Chou', animal: 'Ox', hidden: ['己', '癸', '辛'] },
        { hanzi: '寅', pinyin: 'Yin', animal: 'Tiger', hidden: ['甲', '丙', '戊'] },
        { hanzi: '卯', pinyin: 'Mao', animal: 'Rabbit', hidden: ['乙'] },
        { hanzi: '辰', pinyin: 'Chen', animal: 'Dragon', hidden: ['戊', '乙', '癸'] },
        { hanzi: '巳', pinyin: 'Si', animal: 'Snake', hidden: ['丙', '庚', '戊'] },
        { hanzi: '午', pinyin: 'Wu', animal: 'Horse', hidden: ['丁', '己'] },
        { hanzi: '未', pinyin: 'Wei', animal: 'Goat', hidden: ['己', '丁', '乙'] },
        { hanzi: '申', pinyin: 'Shen', animal: 'Monkey', hidden: ['庚', '壬', '戊'] },
        { hanzi: '酉', pinyin: 'You', animal: 'Rooster', hidden: ['辛'] },
        { hanzi: '戌', pinyin: 'Xu', animal: 'Dog', hidden: ['戊', '辛', '丁'] },
        { hanzi: '亥', pinyin: 'Hai', animal: 'Pig', hidden: ['壬', '甲'] },
    ];

    // Ambil index awal dari Hanzi input
    const stemIndex = stems.findIndex(s => s.hanzi === startStem);
    const branchIndex = branches.findIndex(b => b.hanzi === startBranch);

    if (stemIndex === -1 || branchIndex === -1) {
        throw new Error("Invalid stem or branch input. Use Chinese characters.");
    }

    const startIndex = (stemIndex * 12 + branchIndex) % 60;

    function getPillarData(index) {
        const stem = stems[index % 10];
        const branch = branches[index % 12];
        return {
            pillar: `${stem.hanzi}${branch.hanzi}`,
            stem: {
                hanzi: stem.hanzi,
                pinyin: stem.pinyin,
                element: stem.element,
                yinYang: stem.yinYang,
                description: `${stem.hanzi} (${stem.pinyin}) – ${stem.yinYang} ${stem.element}`
            },
            branch: {
                hanzi: branch.hanzi,
                pinyin: branch.pinyin,
                animal: branch.animal,
                hiddenStems: branch.hidden.map(hs => {
                    const ref = stems.find(s => s.hanzi === hs);
                    return {
                        hanzi: hs,
                        pinyin: ref?.pinyin || '',
                        element: ref?.element || '',
                        yinYang: ref?.yinYang || '',
                        description: `${hs} (${ref?.pinyin}) – ${ref?.yinYang} ${ref?.element}`
                    };
                }),
                description: `${branch.hanzi} (${branch.pinyin}) – ${branch.animal}`
            }
        };
    }

    // Bangun hasil akhir
    const result = [];
    for (let i = 0; i < count; i++) {
        const adjustedIndex = (startIndex + (forward ? i : -i) + 60) % 60;
        const pillarData = getPillarData(adjustedIndex);

        result.push({
            ...pillarData,
            startAge: startingAge + i * 10,
            endAge: startingAge + i * 10 + 9
        });
    }

    return result;
}

export const generateBaziReading = ({ name, birthDate, birthTime, gender }) => {
    // const date = new Date(`${birthDate}T${birthTime}:00`)
    const date = new Date(
        birthDate.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate(),
        birthTime.getHours(),
        birthTime.getMinutes(),
        birthTime.getSeconds()
    );

    // Validate birth date
    if (!birthDate || isNaN(new Date(birthDate))) {
        console.error("Invalid birth date");
        return;
    }

    // Convert birthTime into minutes for a valid index calculation
    const birthTimeSplit = birthTime.toTimeString().split(' ')[0]
    const birthTimeArray = birthTimeSplit.split(':');  // Assuming format is "HH:MM"
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
    // const hour = date.getHours();      // jam 0–23
    // const minute = date.getMinutes();  // menit 0–59
    // const totalMinutes = hour * 60 + minute;
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
        year: {
            stem: eightChar.getYearGan(),
            branch: eightChar.getYearZhi(),
            hiddenStems: hiddenStemsMap[eightChar.getYearZhi()]
        },
        month: {
            stem: eightChar.getMonthGan(),
            branch: eightChar.getMonthZhi(),
            hiddenStems: hiddenStemsMap[eightChar.getMonthZhi()]
        },
        day: {
            stem: eightChar.getDayGan(),
            branch: eightChar.getDayZhi(),
            hiddenStems: hiddenStemsMap[eightChar.getDayZhi()]
        },
        hour: {
            stem: hourGan,
            branch: hourZhi,
            hiddenStems: hiddenStemsMap[hourZhi]
        },
    };

    const countElementsJoeyYap = (pillars) => {
        const elements = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };

        const addElement = (stem, weight = 1) => {
            const el = stemToElement[stem];
            if (el) elements[el] += weight;
        };

        Object.values(pillars).forEach(({ stem, branch }) => {
            addElement(stem, 1);

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
        '子': { pinyin: 'Zi', animal: 'Rat', hiddenStems: ['癸'] },
        '丑': { pinyin: 'Chou', animal: 'Ox', hiddenStems: ['己', '癸', '辛'] },
        '寅': { pinyin: 'Yin', animal: 'Tiger', hiddenStems: ['甲', '丙', '戊'] },
        '卯': { pinyin: 'Mao', animal: 'Rabbit', hiddenStems: ['乙'] },
        '辰': { pinyin: 'Chen', animal: 'Dragon', hiddenStems: ['戊', '乙', '癸'] },
        '巳': { pinyin: 'Si', animal: 'Snake', hiddenStems: ['丙', '庚', '戊'] },
        '午': { pinyin: 'Wu', animal: 'Horse', hiddenStems: ['丁', '己'] },
        '未': { pinyin: 'Wei', animal: 'Goat', hiddenStems: ['己', '丁', '乙'] },
        '申': { pinyin: 'Shen', animal: 'Monkey', hiddenStems: ['庚', '壬', '戊'] },
        '酉': { pinyin: 'You', animal: 'Rooster', hiddenStems: ['辛'] },
        '戌': { pinyin: 'Xu', animal: 'Dog', hiddenStems: ['戊', '辛', '丁'] },
        '亥': { pinyin: 'Hai', animal: 'Pig', hiddenStems: ['壬', '甲'] },
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

    Object.entries(pillars).forEach(([key, { stem, branch, hiddenStems }]) => {
        console.log('Pillars:', pillars);

        const stemData = stemInfo[stem];
        const branchData = branchInfo[branch];
        const hiddenStemsData = Array.isArray(hiddenStems)
            ? hiddenStems.map(hs => {
                const data = stemInfo[hs];
                if (!data) {
                    console.warn(`Hidden stem "${hs}" not found in stemInfo`);
                }
                return data || { pinyin: 'Unknown', element: 'Unknown', yinYang: 'Unknown' };
            })
            : [];

        if (!stemData) {
            console.warn(`Stem "${stem}" not found in stemInfo`);
        }
        if (!branchData) {
            console.warn(`Branch "${branch}" not found in branchInfo`);
        }
        if (!hiddenStemsData) {
            console.warn(`Branch "${hiddenStems}" not found in hiddenStemsInfo`);
        }

        translatedPillars[key] = {
            stem,
            stemInfo: stemData || { pinyin: 'Unknown', element: 'Unknown', yinYang: 'Unknown' },
            branch,
            branchInfo: branchData || { pinyin: 'Unknown', animal: 'Unknown' },
            hiddenStems,
            hiddenStemsInfo: hiddenStemsData
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
        const elements = {
            Earth: 0,
            Fire: 0,
            Wood: 0,
            Water: 0,
            Metal: 0,
        };

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

    const calculateElementBalance2 = (elements) => {
        const elementLabels = {
            Earth: "土 (Earth)",
            Wood: "木 (Wood)",
            Fire: "火 (Fire)",
            Metal: "金 (Metal)",
            Water: "水 (Water)",
        };

        const totalElement = Object.values(elements).reduce((sum, val) => sum + val, 0);

        const result = Object.entries(elements).map(([key, value]) => {
            const percentage = totalElement === 0 ? 0 : Number(((value / totalElement) * 100).toFixed(2));
            return {
                key,
                label: elementLabels[key],
                percentage,
                value
            };
        });

        return result;
    };


    const calculateElementBalanceBar = (elements) => {
        const orderedKeys = ["Wood", "Fire", "Earth", "Metal", "Water"];

        const elementLabels = {
            Earth: "土 (Earth)",
            Wood: "木 (Wood)",
            Fire: "火 (Fire)",
            Metal: "金 (Metal)",
            Water: "水 (Water)",
        };

        // Reorder the input object
        const reordered = {};
        orderedKeys.forEach(key => {
            reordered[key] = elements[key] || 0;
        });

        const totalElement = orderedKeys.reduce((sum, key) => sum + reordered[key], 0);

        const result = orderedKeys.map((key) => {
            const percentage = totalElement === 0 ? 0 : Number(((reordered[key] / totalElement) * 100).toFixed(2));
            return {
                key,
                label: elementLabels[key],
                percentage
            };
        });

        return result;
      };

    // function getLifePalace(monthStem, monthBranch, hourBranch) {
    //     function mod(n, m) {
    //         return ((n % m) + m) % m;
    //     }

    //     const stemIndex = stems.indexOf(monthStem);
    //     const branchIndex = branches.indexOf(monthBranch);
    //     const hourIndex = branches.indexOf(hourBranch);

    //     // Jarak mundur dari Month Branch ke Hour Branch
    //     const offset = mod(branchIndex - hourIndex, 12); // hitung mundur 12 langkah

    //     // Hitung indeks baru
    //     const lifeStemIndex = mod(stemIndex + offset, 10);
    //     const lifeBranchIndex = mod(branchIndex + offset, 12);

    //     return [
    //         stems[lifeStemIndex],
    //         branches[lifeBranchIndex]
    //     ];
    // }

    // 60 Jia Zi (Stem + Branch)
//     const jiaZiCycle = [
//         '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉',
//         '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未',
//         '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
//         '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
//         '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
//         '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'
//     ];

//     function getLifePalace(monthStem, monthBranch, hourBranch) {
//         const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

//         const mIndex = branches.indexOf(monthBranch); // 0-based
//         const hIndex = branches.indexOf(hourBranch);  // 0-based

//         if (mIndex === -1 || hIndex === -1) return null;

//         // offset = (Month Branch + Hour Branch) - 2
//         const offset = mIndex + hIndex - 2;

//         const monthPillar = monthStem + monthBranch;
//         const startIndex = jiaZiCycle.indexOf(monthPillar);
//         if (startIndex === -1) return null;

//         // Move BACKWARD in the cycle
//         const lifePalaceIndex = (startIndex - offset + 60) % 60;
//         return jiaZiCycle[lifePalaceIndex];
//   }

    function generateJiaZi() {
        const jiaZi = [
            '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉',
            '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未',
            '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
            '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
            '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
            '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'
        ];
        return jiaZi;
    }


    function getLifePalace(monthStem, monthBranch, hourBranch) {
        const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        const jiaZiCycle = generateJiaZi();
        const monthPillar = monthStem + monthBranch;

        const monthIndex = jiaZiCycle.indexOf(monthPillar);
        const hourIndex = branches.indexOf(hourBranch);

        if (monthIndex === -1 || hourIndex === -1) return null;

        const lifePalaceIndex = (monthIndex + hourIndex) % 60;
        return jiaZiCycle[lifePalaceIndex];
    }

    const jiaZiCycle = generateJiaZi();
    console.log(jiaZiCycle);  // lihat daftar, cek urutan
    console.log(jiaZiCycle[0]);   // 甲子
    console.log(jiaZiCycle[1]);   // 乙丑
    console.log(jiaZiCycle[2]);   // 丙寅
    console.log(jiaZiCycle[25]);   // 戊子
    console.log(jiaZiCycle.indexOf('戊子')); // Harusnya 25
    console.log(jiaZiCycle[30]);

    const getConceptionPalace2 = (date) => {

        const conceptionDate = new Date(date);
        conceptionDate.setDate(date.getDate() - 280);
        const lunarConception = Lunar.fromDate(conceptionDate);
        const eightCharConception = lunarConception.getEightChar()

        const pillarConception = {
            month: {
                branch: eightCharConception.getMonthGan(),
                stem: eightCharConception.getMonthZhi()
            }
        }
        return {
            branch: pillarConception.month.branch,
            stem: pillarConception.month.stem,
            ganzhi: pillarConception.month.branch + pillarConception.month.stem
        }
    }


    function getCurrentYearPillar() {
        const currentYear = new Date().getFullYear();
        const lunar = Lunar.fromDate(new Date(`${currentYear}-03-01`));

        const stem = lunar.getYearGan();
        const branch = lunar.getYearZhi();

        const stemDetails = stemInfo[stem];
        const branchDetails = branchInfo[branch];

        const hiddenStemsInfo = branchDetails.hiddenStems.map(hs => ({
            hanzi: hs,
            ...stemInfo[hs],
        }));

        return {
            year: currentYear,
            stem,
            branch,
            stemInfo: stemDetails,
            branchInfo: {
                pinyin: branchDetails.pinyin,
                animal: branchDetails.animal,
            },
            hiddenStems: branchDetails.hiddenStems,
            hiddenStemsInfo,
        };
    }

    const elementBalance = countElements2(latinPillars);
    const elementJoeyYap = countElementsJoeyYap(pillars);


    const elementBalancePercentage = calculateElementBalance2(elementBalance)
    const dayMaster = pillars.day.stem;
    const guaNumber = getGuaNumber(date.getFullYear(), gender === 'male');
    const { favorable, unfavorable } = getDirections(guaNumber);
    const elementCategories = categorizeElements(dayMaster, elementBalance);

    const descriptionResult = `Give me a simple (short) summary of personality about Bazi reading, I got the day master is ${dayMaster}, and the five elemental balance is ${Object.entries(elementBalance)
        .map(([key, value]) => `${key} = ${value}`)
        .join(', ')}`;

    const animal = {
        celestial: lunar.getYearShengXiao(),
        noble: noblePeopleMap[pillars.day.stem] || [],
        intelligence: intelligenceStarMap[pillars.year.branch] || [],
        peach_blossom: peachBlossomMap[pillars.day.branch] || [],
        sky_horse: skyHorseMap[pillars.day.branch] || [],
        solitary: solitaryMap[pillars.day.branch] || [],
        // life_palace: getLifePalace(pillars.month.stem, pillars.month.branch, pillars.hour.branch),
        life_palace: getLifePalace(pillars.month.stem, pillars.month.branch, pillars.hour.branch),
        conception_palace: getConceptionPalace2(date)
    }

    const forwardDirection = isForwardDirection(translatedPillars.day.stemInfo.pinyin, gender)
    const luckyPillars = generateLuckPillarsData(pillars.month.stem, pillars.month.branch, forwardDirection, 8, 9)

    return {
        name,
        baziPillars: pillars,
        dayMaster,
        elementBalance,
        elementBalancePercentage,
        elementBalancePercentageBar: calculateElementBalanceBar(elementBalance),
        elementCategories,
        guaNumber,
        favorableDirections: favorable,
        unfavorableDirections: unfavorable,
        elementJoeyYap,
        translatedPillars,
        descriptionResult,
        luckyPillars,
        animal,
        currentYearPillar: getCurrentYearPillar(),
        tenGod: getTenGod()
    };
};

