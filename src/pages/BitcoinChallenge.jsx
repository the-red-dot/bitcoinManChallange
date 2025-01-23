// src/pages/BitcoinChallenge.jsx
import React, { useState, useRef, useEffect } from 'react';
import '../styles/BitcoinChallenge.css';

// Data
import { challengesData } from '../data/challengesData';
import { allPrizes, smallPrizes, middlePrizes, bigPrizes, biggestPrizes } from '../data/prizesData';

// Components
import ChallengeSlot from '../components/ChallengeSlot';
import PrizeSlot from '../components/PrizeSlot';
import SelectedChallenge from '../components/SelectedChallenge';
import SelectedPrize from '../components/SelectedPrize';
import CountdownTimer from '../components/CountdownTimer';

// Helper: Weighted selection for final logic
function getWeightedPrize(score) {
  const randomVal = Math.random();
  if (score >= 8) {
    return randomVal < 0.7 ? getRandomItem(smallPrizes) : getRandomItem(middlePrizes);
  } else if (score >= 5) {
    if (randomVal < 0.5) return getRandomItem(smallPrizes);
    else if (randomVal < 0.8) return getRandomItem(middlePrizes);
    else return getRandomItem(bigPrizes);
  } else if (score >= 3) {
    if (randomVal < 0.2) return getRandomItem(smallPrizes);
    else if (randomVal < 0.7) return getRandomItem(middlePrizes);
    else return getRandomItem(bigPrizes);
  } else {
    if (randomVal < 0.1) return getRandomItem(middlePrizes);
    else if (randomVal < 0.6) return getRandomItem(bigPrizes);
    else return getRandomItem(biggestPrizes);
  }
}

// Helper: get random item from array
function getRandomItem(arr) {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function BitcoinChallenge() {
  // CHALLENGE states
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [spinningChallenges, setSpinningChallenges] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  // PRIZE states
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [spinningPrize, setSpinningPrize] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);

  // Refs to timeouts
  const challengeTimeoutRef = useRef(null);
  const prizeTimeoutRef = useRef(null);

  // Start spinning challenges (slot machine style) with deceleration
  const handleRollChallenge = () => {
    // Reset previous challenge/prize
    setSelectedChallenge(null);
    setSelectedPrize(null);

    // If already spinning, do nothing
    if (spinningChallenges) return;

    setSpinningChallenges(true);

    const spinSteps = 30;
    const initialInterval = 50;
    const intervalIncrement = 10;
    let currentStep = 0;

    const spin = () => {
      if (currentStep < spinSteps) {
        challengeTimeoutRef.current = setTimeout(() => {
          setChallengeIndex(prev => (prev + 1) % challengesData.length);
          currentStep++;
          spin();
        }, initialInterval + currentStep * intervalIncrement);
      } else {
        // Spin complete, select final challenge
        const finalChallenge = getRandomItem(challengesData);
        const finalIndex = challengesData.indexOf(finalChallenge);
        setChallengeIndex(finalIndex);
        setSelectedChallenge(finalChallenge);
        setSpinningChallenges(false);
      }
    };

    spin();
  };

  // Start spinning prizes (slot machine style) with deceleration
  const handleRollPrize = () => {
    if (!selectedChallenge) return;
    if (spinningPrize) return;

    setSpinningPrize(true);
    setSelectedPrize(null);

    const spinSteps = 25;
    const initialInterval = 40;
    const intervalIncrement = 12;
    let currentStep = 0;

    const spin = () => {
      if (currentStep < spinSteps) {
        prizeTimeoutRef.current = setTimeout(() => {
          setPrizeIndex(prev => (prev + 1) % allPrizes.length);
          currentStep++;
          spin();
        }, initialInterval + currentStep * intervalIncrement);
      } else {
        // Spin complete, select final prize
        const finalPrizeValue = getWeightedPrize(selectedChallenge.score);
        const finalPrizeObj = allPrizes.find(p => p.value === finalPrizeValue);
        const finalIndex = allPrizes.indexOf(finalPrizeObj);
        setPrizeIndex(finalIndex);
        setSelectedPrize(finalPrizeValue);
        setSpinningPrize(false);
      }
    };

    spin();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (challengeTimeoutRef.current) clearTimeout(challengeTimeoutRef.current);
      if (prizeTimeoutRef.current) clearTimeout(prizeTimeoutRef.current);
    };
  }, []);

  // For slot display: show 3 items (prev, current, next)
  const challengePrev = (challengeIndex - 1 + challengesData.length) % challengesData.length;
  const challengeNext = (challengeIndex + 1) % challengesData.length;

  const prizePrev = (prizeIndex - 1 + allPrizes.length) % allPrizes.length;
  const prizeNext = (prizeIndex + 1) % allPrizes.length;

  return (
    <div className="bitcoin-challenge-container">
      <h1>האתגר של איש הביטקוין</h1>

      {/* CHALLENGE SLOT MACHINE */}
      <div className="slot-machine">
        <ChallengeSlot challenge={challengesData[challengePrev]} isActive={false} />
        <ChallengeSlot challenge={challengesData[challengeIndex]} isActive={true} />
        <ChallengeSlot challenge={challengesData[challengeNext]} isActive={false} />
      </div>

      <div className="buttons-container">
        <button onClick={handleRollChallenge} disabled={spinningChallenges}>
          {spinningChallenges ? 'סובב...' : 'הגרל אתגר'}
        </button>
      </div>

      <SelectedChallenge challenge={selectedChallenge} />

      {/* PRIZE SLOT MACHINE */}
      <div className="slot-machine">
        <PrizeSlot prize={allPrizes[prizePrev]} isActive={false} />
        <PrizeSlot prize={allPrizes[prizeIndex]} isActive={true} />
        <PrizeSlot prize={allPrizes[prizeNext]} isActive={false} />
      </div>

      <div className="buttons-container">
        <button onClick={handleRollPrize} disabled={!selectedChallenge || spinningPrize}>
          {spinningPrize ? 'סובב...' : 'הגרל את הפרס'}
        </button>
      </div>

      <SelectedPrize prize={selectedPrize} />

      {/* Add the CountdownTimer with your desired default time */}
      <CountdownTimer defaultTime={45} />
    </div>
  );
}

export default BitcoinChallenge;
