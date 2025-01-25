// src/data/prizesData.js

export const smallPrizes   = [200, 300, 400, 500];
export const middlePrizes  = [250, 400, 600, 800, 1000, 1200];
export const bigPrizes     = [300, 600, 900, 1200, 1500, 1800, 2000];
export const biggestPrizes = [500, 1000, 1500, 2000, 2500, 3000];

export const allPrizes = [
  ...smallPrizes.map(p => ({ label: `${p} ש"ח`, value: p })),
  ...middlePrizes.map(p => ({ label: `${p} ש"ח`, value: p })),
  ...bigPrizes.map(p => ({ label: `${p} ש"ח`, value: p })),
  ...biggestPrizes.map(p => ({ label: `${p} ש"ח`, value: p }))
];
