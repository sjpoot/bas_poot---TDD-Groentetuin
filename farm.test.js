const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop,
    getRevenueForCrop, getProfitForCrop, getTotalProfit } = require('./farm');

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    }

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });

    test("Get yield for plant with factor sun is low", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                }
            }
        };

        const environmentFactors = {
            sun: "low",
            wind: "medium",
        }

        expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
    });

    test("Get yield for plant with factor sun is low and wind is medium", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: -30,
                    high: -60,
                },
            },
        };

        const environmentFactors = {
            sun: "low",
            wind: "medium"
        };

        expect(getYieldForPlant(corn, environmentFactors)).toBe(10.5);
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

    test("Get yield for crop, with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 4,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: -30,
                    high: -60,
                },
            },
        };

        const environmentFactors = {
            sun: "low",
            wind: "medium"
        };

        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(14);
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

    test("Calculate total yield with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: -30,
                    high: -60,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factors: {
                sun: {
                    low: -65,
                    medium: 0,
                    high: 50,
                },
            },
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];

        const environmentFactors = {
            sun: "high",
            wind: "low"
        };
        expect(getTotalYield({ crops }, environmentFactors)).toBe(34.5);
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
        yield: 3,
        price: 2,
    };
    const input = {
        crop: apple,
        numCrops: 10,
    };

    test("get revenue for crop with no environment factors", () => {
        expect(getRevenueForCrop(input)).toBe(60);
    });

    test("get revenue for crop with environment factors", () => {
        const apple = {
            name: "apple",
            yield: 4,
            price: 2,
            factors: {
                sun: {
                    low: -40,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: -20,
                    high: -50,
                }
            },
        };
        const input = {
            crop: apple,
            numCrops: 10,
        };

        const environmentFactors = {
            sun: "low",
            wind: "medium",
        };
        expect(getRevenueForCrop(input, environmentFactors)).toBe(38.4);
    })
});

describe("getProfitForCrop", () => {
    const apple = {
        name: "apple",
        yield: 3,
        price: 2,
        costs: 1,
    };
    const input = {
        crop: apple,
        numCrops: 10,
    };
    test("get profit for crop with no environment factors", () => {
        expect(getProfitForCrop(input)).toBe(50);
    });

    test("get profit for crop with environment factors", () => {
        const apple = {
            name: "apple",
            yield: 4,
            price: 2,
            costs: 1,
            factors: {
                sun: {
                    low: -40,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: -20,
                    high: -50,
                }
            },
        };
        const input = {
            crop: apple,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: "high",
            wind: "medium",
        };
        expect(getProfitForCrop(input, environmentFactors)).toBe(86);
    });
});

describe("getTotalProfit", () => {
    test("Calculate total profit with multiple crops with no environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costs: 1,
            price: 2,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            costs: 2,
            price: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];

        expect(getTotalProfit({ crops })).toBe(53);
    });

    test("Calculate total profit with multiple crops with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costs: 1,
            price: 2,
            factors: {
                sun: {
                    low: -40,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: -20,
                    high: -50,
                }
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            costs: 2,
            price: 4,
            factors: {
                sun: {
                    low: -60,
                    medium: 0,
                    high: 50,
                },
            },
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        const environmentFactors = {
            sun: "high",
            wind: "medium",
        };

        expect(getTotalProfit({ crops }, environmentFactors)).toBe(75);
    });
});