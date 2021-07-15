const getYieldForPlant = (crop) => {
    return (crop.yield);
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