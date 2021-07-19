const getYieldForPlant = (crop, environmentFactors) => {
    let factorSun = 1;
    let factorWind = 1;

    if (environmentFactors) {
        if (crop.factors.sun) {
            const sunValue = environmentFactors.sun;
            factorSun = (100 + crop.factors.sun[sunValue]) / 100;
        }
        if (crop.factors.wind) {
            const windValue = environmentFactors.wind;
            factorWind = (100 + crop.factors.wind[windValue]) / 100;
        }
    }
    return (crop.yield * factorSun * factorWind);
};

const getYieldForCrop = (input) => {
    return (getYieldForPlant(input.crop) * input.numCrops);
}

const getTotalYield = ({ crops }) => {
    let totalYield = 0;

    crops.forEach(currentCrop => {
        totalYield += getYieldForCrop(currentCrop);
    });
    return totalYield;
}

const getCostsForCrop = (input) => {
    return (input.crop.costs * input.numCrops);
};

const getRevenueForCrop = (input) => {
    return (getYieldForCrop(input) * input.crop.price);
};

const getProfitForCrop = (input) => {
    return (getRevenueForCrop(input) - getCostsForCrop(input));
}

const getTotalProfit = ({ crops }) => {
    let totalProfit = 0;

    crops.forEach(currentCrop => {
        totalProfit += getRevenueForCrop(currentCrop) - getCostsForCrop(currentCrop);
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