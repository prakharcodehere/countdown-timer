import React, { useState } from 'react';
import Modal from './Modal';

const Input = ({ onSetTargetDate, isTimerRunning, setIsTimerRunning , setTimeLeft}) => {
  const [inputDate, setInputDate] = useState('');
  const [inputTime, setInputTime] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputDate || !inputTime) {
      setShowErrorModal(true);
      return;
    }
    const targetDateTime = new Date(`${inputDate}T${inputTime}`);
    onSetTargetDate(targetDateTime);
    setInputDate('');
    setInputTime('');
  };

  const handleStop = (e) => {
    e.preventDefault();
    onSetTargetDate(null); // Reset the target date to stop the timer
    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); 
    
  };
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    if (name === 'date') setInputDate(value);
    if (name === 'time') setInputTime(value);
  };

  return (
    <>
      <div className="max-w-md mx-auto p-8 rounded-lg border border-gray-300 form-container mb-4">
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="flex flex-col">
            <label htmlFor="date" className="text-sm">Select Date</label>
            <input type="date" className="input mt-1 px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500" value={inputDate} id="date" name="date" onChange={handleEventChange} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="time" className="text-sm">Select Time</label>
            <input type="time" className="input mt-1 px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500" value={inputTime} id="time" name="time" onChange={handleEventChange} />
          </div>
          {isTimerRunning ? (
            <button onClick={handleStop} className="button-push bg-red-600 text-white py-2 px-4 rounded-md w-full hover:bg-red-700 focus:outline-none focus:bg-red-700 button">Stop</button>
          ) : (
            <button type="submit" className="button-push bg-gray-600 text-white py-2 px-4 rounded-md w-full hover:bg-gray-700 focus:outline-none focus:bg-gray-700 button">Start</button>
          )}
        </form>
      </div>
      {showErrorModal && (
        <Modal
          message="Please select both date and time."
          onClose={() => setShowErrorModal(false)}
        />
      )}
    </>
  );
};

export default Input;
