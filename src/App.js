import React, { useState, useEffect } from 'react';
import './App.css';
import Counter from './components/Counter';
import Input from './components/Input';
import Modal from './components/Modal';

function App() {
  const [targetDate, setTargetDate] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalBorderColor, setModalBorderColor] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleSetTargetDate = (date) => {
    const now = new Date();
    const targetDateTime = new Date(date);

    if (date === null) {
      setTargetDate(null);
      setIsTimerRunning(false);
      setIsOpen(false);
      return;
    } else if (targetDateTime <= now) {
      setModalMessage('Please select a future date and time.');
      setModalBorderColor('red');
      setIsOpen(true);
      return;
    } else if (targetDateTime.getTime() - now.getTime() > 1000 * 60 * 60 * 24 * 99) {
      setModalMessage('Maximum countdown duration is 99 days.');
      setModalBorderColor('red');
      setIsOpen(true);
      return;
    }

    setTargetDate(date);
    setIsTimerRunning(true);
  };

  useEffect(() => {
    if (isTimerRunning) {
      const calculateTimeLeft = () => {
        const now = new Date();
        const targetDateTime = new Date(targetDate);

        if (targetDateTime > now) {
          const difference = targetDateTime.getTime() - now.getTime();
          let days = Math.floor(difference / (1000 * 60 * 60 * 24));
          let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          let minutes = Math.floor((difference / 1000 / 60) % 60);
          let seconds = Math.floor((difference / 1000) % 60);

          // Apply maximum values
          days = Math.min(days, 99);
          hours = Math.min(hours, 23);
          minutes = Math.min(minutes, 59);
          seconds = Math.min(seconds, 59);

          return { days, hours, minutes, seconds };
        } else {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      };

      const timer = setInterval(() => {
        const timeLeft = calculateTimeLeft();
        setTimeLeft(timeLeft);

        if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
          setIsTimerRunning(false);
          setIsOpen(true);
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [targetDate, isTimerRunning]);

  useEffect(() => {
    if (!isTimerRunning && targetDate !== null) {
      setModalMessage('Timer Completed!');
      setModalBorderColor('green');
      setIsOpen(true);
    }
  }, [isTimerRunning, targetDate]);

  return (
    <div className="App bg-gray-100 min-h-screen flex flex-col justify-center items-center ">
      <div>
      <h2 className='heading text-2xl md:text-3xl lg:text-4xl xl:text-5xl my-4'>COUNTDOWN TIMER</h2>
      </div>
      <div>
        <Input
          onSetTargetDate={handleSetTargetDate}
          isTimerRunning={isTimerRunning}
          setIsTimerRunning={setIsTimerRunning}
          setTimeLeft={setTimeLeft}
        />
      </div>
      <div className="mt-4 flex flex-wrap justify-center">
        <Counter title="DAYS" timestamp={timeLeft.days} />
        <Counter title="HRS" timestamp={timeLeft.hours} />
        <Counter title="MIN" timestamp={timeLeft.minutes} />
        <Counter title="SEC" timestamp={timeLeft.seconds} />
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          message={modalMessage}
          borderColor={modalBorderColor}
        />
      )}
    </div>
  );
}

export default App;
