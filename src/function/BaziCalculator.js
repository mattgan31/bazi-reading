import { Lunar } from 'lunar-javascript';

const stemToElement = {
    甲: 'Wood', 乙: 'Wood',
    丙: 'Fire', 丁: 'Fire',
    戊: 'Earth', 己: 'Earth',
    庚: 'Metal', 辛: 'Metal',
    壬: 'Water', 癸: 'Water',
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
    const count = (char) => {
        const el = stemToElement[char];
        if (el) elements[el]++;
    };

    Object.values(pillars).forEach(({ stem, branch }) => {
        count(stem);
        hiddenStemsMap[branch]?.forEach(count);
    });

    return elements;
};


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
    const date = new Date(birthDate);

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
    const hourIndex = Math.floor(birthTimeInMinutes / 2); // Each GanZhi hour is 2 hours

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

    const translatedPillars = translatePillars(pillars);
    // Get element balance and other computations
    const elementBalance = countElements(pillars);
    const elementBalancePercentage = calculateElementBalance(translatedPillars)
    const dayMaster = pillars.day.stem;
    const guaNumber = getGuaNumber(date.getFullYear(), gender === 'male');
    const { favorable, unfavorable } = getDirections(guaNumber);

    return {
        name,
        baziPillars: pillars,
        dayMaster,
        elementBalance,
        elementBalancePercentage,
        guaNumber,
        favorableDirections: favorable,
        unfavorableDirections: unfavorable,
    };
};

