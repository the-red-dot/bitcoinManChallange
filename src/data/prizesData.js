// src/data/prizesData.js

export const smallPrizes   = [100, 150, 200, 250];
export const middlePrizes  = [250, 350, 400, 450, 500, 1000];
export const bigPrizes     = [500, 700, 800, 1000, 1100, 1200, 1300, 1500];
export const biggestPrizes = [1000, 1200, 1400, 1600, 1800, 2000];

export const allPrizes = [
  ...smallPrizes.map(p => ({ label: `${p} ש"ח`, value: p })),
  ...middlePrizes.map(p => ({ label: `${p} ש"ח`, value: p })),
  ...bigPrizes.map(p => ({ label: `${p} ש"ח`, value: p })),
  ...biggestPrizes.map(p => ({ label: `${p} ש"ח`, value: p }))
];
