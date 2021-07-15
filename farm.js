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

/*const getProfitForCrop = (input) => {
    console.log(getRevenueForCrop(input));
    console.log(getCostsForCrop(input));
    return (getRevenueForCrop(input) - getCostsForCrop(input));
}*/

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    //getProfitForCrop
}