const getYieldForPlant = (crop, environmentFactors) => {
    let factorSun = 1;
    let factorWind = 1;

    if (environmentFactors) {
        if (crop.factors.sun) {
            const sunValue = environmentFactors.sun;
            if (crop.factors.sun[sunValue] == 100) { factorSun = 1 }
            else {
                factorSun = (100 + crop.factors.sun[sunValue]) / 100;
            }
        };
        if (crop.factors.wind) {
            const windValue = environmentFactors.wind;
            if (crop.factors.wind[windValue] == 100) { factorWind = 1 }
            else {
                factorWind = (100 + crop.factors.wind[windValue]) / 100;
            }
        };
    };
    return (crop.yield * factorSun * factorWind);
};

const getYieldForCrop = (input, environmentFactors) => {
    return (getYieldForPlant(input.crop, environmentFactors) * input.numCrops);
}

const getTotalYield = ({ crops }, environmentFactors) => {
    let totalYield = 0;

    crops.forEach(currentCrop => {
        totalYield += getYieldForCrop(currentCrop, environmentFactors);
    });
    return totalYield;
}

const getCostsForCrop = (input) => {
    return (input.crop.costs * input.numCrops);
};

const getRevenueForCrop = (input, environmentFactors) => {
    return (getYieldForCrop(input, environmentFactors) * input.crop.price);
};

const getProfitForCrop = (input, environmentFactors) => {
    return (Math.round(getRevenueForCrop(input, environmentFactors) - getCostsForCrop(input)));
}

const getTotalProfit = ({ crops }, environmentFactors) => {
    let totalProfit = 0;

    crops.forEach(currentCrop => {
        totalProfit += getRevenueForCrop(currentCrop, environmentFactors) - getCostsForCrop(currentCrop);
    });
    return totalProfit;
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
}