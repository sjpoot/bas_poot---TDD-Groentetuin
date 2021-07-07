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

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield
}