// src/components/CountdownTimer.jsx
import React, { useState, useEffect, useRef } from 'react';

function CountdownTimer({ defaultTime = 60 }) {
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTime, setSelectedTime] = useState(defaultTime); // אחסון הזמן הנבחר

  const countdownBeepRef = useRef(null);
  const endBuzzerRef = useRef(null);

  useEffect(() => {
    let timerInterval = null;
    if (isRunning) {
      timerInterval = setInterval(() => {
        setTimeLeft(prev => {
          const newVal = prev - 1;
          if (newVal > 0 && newVal <= 5 && countdownBeepRef.current) {
            countdownBeepRef.current.play().catch(() => {});
          }
          if (newVal <= 0) {
            clearInterval(timerInterval);
            setIsRunning(false);
            if (endBuzzerRef.current) {
              endBuzzerRef.current.play().catch(() => {});
            }
            return 0;
          }
          return newVal;
        });
      }, 1000);
    }
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [isRunning]);

  const handleStart = () => {
    if (timeLeft <= 0) {
      setTimeLeft(selectedTime);
    }
    setIsRunning(true);
  };

  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedTime);
  };

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
    setTimeLeft(newTime);
    setIsRunning(false); // עצירת השעון אם הוא רץ
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const displayTime =
    (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

  return (
    <div className="timer-container">
      <div id="timerDisplay" className="display-time">{displayTime}</div>

      <div className="time-options">
        <span className="option-label">בחר זמן:</span>
        <button
          className={`time-button ${selectedTime === 60 ? 'active' : ''}`}
          onClick={() => handleTimeChange(60)}
        >
          1 דקה
        </button>
        <button
          className={`time-button ${selectedTime === 120 ? 'active' : ''}`}
          onClick={() => handleTimeChange(120)}
        >
          2 דקות
        </button>
        <button
          className={`time-button ${selectedTime === 180 ? 'active' : ''}`}
          onClick={() => handleTimeChange(180)}
        >
          3 דקות
        </button>
        <button
          className={`time-button ${selectedTime === 300 ? 'active' : ''}`}
          onClick={() => handleTimeChange(300)}
        >
          5 דקות
        </button>
      </div>

      <div className="timer-controls">
        <button onClick={handleStart} className="control-button start-button" disabled={isRunning}>
          התחל שעון
        </button>
        <button onClick={handleStop} className="control-button stop-button" disabled={!isRunning}>
          עצור שעון
        </button>
        <button onClick={handleReset} className="control-button reset-button">
          אפס שעון
        </button>
      </div>

      {/* אלמנטים קוליים אופציונליים */}
      <audio ref={countdownBeepRef}>
        <source
          src="https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
          type="audio/ogg"
        />
      </audio>
      <audio ref={endBuzzerRef}>
        <source
          src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
          type="audio/ogg"
        />
      </audio>
    </div>
  );
}

export default CountdownTimer;
