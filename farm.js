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
    return (input.crop.revenue * input.numCrops);
};

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop
}