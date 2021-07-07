const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop,
    getRevenueForCrop } = require('./farm');

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];

        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("getCostsForCrop", () => {
    const corn = {
        name: "corn",
        costs: 1,
    };
    const input = {
        crop: corn,
        numCrops: 10,
    };
    test("Get costs for crop with no environment factors", () => {
        expect(getCostsForCrop(input)).toBe(10);
    });
});

describe("getRevenueForCrop", () => {
    const apple = {
        name: "apple",
        revenue: 2,
    };
    const input = {
        crop: apple,
        numCrops: 10,
    };
    test("get revenue for crop with no environment factors", () => {
        expect(getRevenueForCrop(input)).toBe(20);
    });
});