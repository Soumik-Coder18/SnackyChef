import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiList, FiCheckCircle, FiPlay, FiPause, FiRotateCcw, FiAlertTriangle, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import notificationSound from '../../assets/animations/sound/notification.wav';

function Instructions({ instructions }) {
  const [completedSteps, setCompletedSteps] = useState({});
  const [activeTimers, setActiveTimers] = useState({});
  const [timerSeconds, setTimerSeconds] = useState({});
  const [expandedSteps, setExpandedSteps] = useState({});
  const notifiedTimersRef = useRef({});

  if (!instructions) return null;

  // Parse time phrases and extract seconds
  const parseTimeToSeconds = (timeStr) => {
    const timeRegex = /(\d+)\s*(minutes?|mins?|hours?|hrs?|seconds?|secs?|days?|d|h|m|s)/i;
    const match = timeStr.match(timeRegex);
    if (!match) return 0;

    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();

    switch(unit) {
      case 'hour':
      case 'hours':
      case 'hr':
      case 'hrs':
      case 'h':
        return value * 3600;
      case 'minute':
      case 'minutes':
      case 'min':
      case 'mins':
      case 'm':
        return value * 60;
      case 'day':
      case 'days':
      case 'd':
        return value * 86400;
      default: // seconds
        return value;
    }
  };

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds(prev => {
        const newTimers = {...prev};
        Object.keys(activeTimers).forEach(key => {
          if (activeTimers[key] && newTimers[key] > 0) {
            newTimers[key] -= 1;

            if (newTimers[key] === 0 && !notifiedTimersRef.current[key]) {
              notifiedTimersRef.current[key] = true;
              const audio = new Audio(notificationSound);
              audio.play();
              toast.success(
                <div className="flex items-center gap-2">
                  <FiClock className="text-[#E07A5F]" />
                  <span>Timer complete for step!</span>
                </div>,
                { icon: false }
              );
            }
          }
        });
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTimers]);

  // Enhanced time phrase highlighting and timer detection
  const processStepText = (text) => {
    const timeRegex = /(\d+\s?(?:minutes?|mins?|hours?|hrs?|seconds?|secs?|days?|d|h|m|s))\b/gi;
    let lastIndex = 0;
    const elements = [];
    let match;

    while ((match = timeRegex.exec(text)) !== null) {
      // Text before the match
      if (match.index > lastIndex) {
        elements.push(text.substring(lastIndex, match.index));
      }

      // The time match
      const timeText = match[0];
      const seconds = parseTimeToSeconds(timeText);
      const timerId = `${elements.length}-${timeText}`;

      if (seconds > 0) {
        // Initialize timer if not exists
        if (timerSeconds[timerId] === undefined) {
          setTimerSeconds(prev => ({ ...prev, [timerId]: seconds }));
        }

        elements.push(
          <React.Fragment key={timerId}>
            <span className="text-[#E07A5F] font-semibold bg-[#FFD6A5]/20 px-1 rounded">
              {timeText}
            </span>
            <div className="inline-flex items-center ml-2 bg-[#FFF7ED] border border-[#FFD6A5] rounded-full px-2 py-0.5 shadow-sm space-x-1">
              <span className="font-mono text-xs text-[#5C2C1E]">
                {formatTime(timerSeconds[timerId] || seconds)}
              </span>
              <div className="flex gap-0.5">
                {activeTimers[timerId] ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTimers(prev => ({ ...prev, [timerId]: false }));
                    }}
                    className="text-[#E07A5F] hover:bg-[#FFE8DC] rounded-full p-1"
                  >
                    <FiPause size={12} />
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTimers(prev => ({ ...prev, [timerId]: true }));
                    }}
                    className="text-[#5C2C1E] hover:bg-[#FFE8DC] rounded-full p-1"
                  >
                    <FiPlay size={12} />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTimerSeconds(prev => ({ ...prev, [timerId]: seconds }));
                    setActiveTimers(prev => ({ ...prev, [timerId]: false }));
                  }}
                  className="text-[#A0522D] hover:bg-[#FFE8DC] rounded-full p-1"
                  >
                  <FiRotateCcw size={12} />
                </button>
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        elements.push(
          <span key={timerId} className="text-[#E07A5F] font-semibold bg-[#FFD6A5]/20 px-1 rounded">
            {timeText}
          </span>
        );
      }

      lastIndex = timeRegex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return elements;
  };

  // Split instructions into steps with better handling
  const steps = instructions
    .split(/(?:\r\n|\r|\n)+/)
    .map(step => step.trim())
    .filter(step => step.length > 0)
    .flatMap(step => 
      step.endsWith('.') ? 
      step.split('.').filter(s => s.trim().length > 0) : 
      [step]
    )
    .map(step => step.trim().replace(/\.$/, ''));

  const toggleStepCompletion = (index) => {
    setCompletedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleStepExpansion = (index) => {
    setExpandedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-12 bg-white rounded-xl shadow-sm border border-[#FFD6A5]/30 overflow-hidden"
    >
      <div className="bg-[#FFF7ED] p-6 border-b border-[#FFD6A5]/30">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2A1A0F] flex items-center gap-3">
            <span className="p-2 bg-[#FFD6A5] rounded-full">
              <FiList className="text-[#5C2C1E]" />
            </span>
            Cooking Instructions
          </h2>
          <div className="flex items-center gap-2 text-sm text-[#7B4B2A] bg-[#FFD6A5]/30 px-3 py-1 rounded-full">
            <FiClock className="text-[#E07A5F]" />
            <span>~{Math.floor(steps.length * 1.5)} mins</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-2 bg-[#FFD6A5]/30 rounded-full flex-1 min-w-[100px]">
              <motion.div 
                className="h-full bg-[#E07A5F] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-sm font-medium text-[#5C2C1E]">
              {completedCount}/{steps.length}
            </span>
          </div>
          {completedCount > 0 && (
            <button
              onClick={() => setCompletedSteps({})}
              className="text-sm text-[#E07A5F] hover:text-[#5C2C1E] transition-colors flex items-center gap-1"
            >
              Reset all
            </button>
          )}
        </div>
      </div>

      <div className="p-4 bg-yellow-50 border-b border-yellow-100 flex items-start gap-2">
        <FiAlertTriangle className="text-yellow-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-yellow-800">
          <span className="font-medium">Tip:</span> Click time phrases to set timers. Steps with long content can be expanded.
        </p>
      </div>

      <ol className="divide-y divide-[#FFD6A5]/30">
        {steps.map((step, idx) => {
          const isLongStep = step.length > 120;
          const isExpanded = expandedSteps[idx] || !isLongStep;
          
          return (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`group ${completedSteps[idx] ? 'bg-[#FFF7ED]/50' : 'bg-white'}`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleStepCompletion(idx)}
                    className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded-full border flex items-center justify-center transition-colors ${
                      completedSteps[idx]
                        ? 'bg-[#E07A5F] border-[#E07A5F] text-white'
                        : 'border-[#FFD6A5] text-transparent group-hover:text-[#FFD6A5]'
                    }`}
                  >
                    <FiCheckCircle size={14} />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div 
                      className={`flex flex-wrap items-baseline gap-1 cursor-pointer ${
                        completedSteps[idx] ? 'opacity-75' : 'opacity-100'
                      }`}
                      onClick={() => isLongStep && toggleStepExpansion(idx)}
                    >
                      <span className={`font-bold ${
                        completedSteps[idx] ? 'text-[#7B4B2A]' : 'text-[#5C2C1E]'
                      }`}>
                        {idx + 1}.
                      </span>
                      <div className={`${
                        completedSteps[idx] ? 'text-[#7B4B2A]' : 'text-[#3E2A20]'
                      } ${completedSteps[idx] ? 'line-through' : ''}`}>
                        {isExpanded ? (
                          processStepText(step)
                        ) : (
                          <>
                            {processStepText(step.substring(0, 120))}
                            <span className="text-[#E07A5F]">... </span>
                            <button 
                              className="text-[#E07A5F] hover:underline text-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStepExpansion(idx);
                              }}
                            >
                              Read more
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {step.toLowerCase().includes('preheat') && (
                      <div className="mt-2 inline-flex items-center px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full">
                        <FiAlertTriangle className="mr-1" size={12} />
                        Oven Alert
                      </div>
                    )}

                    {isLongStep && isExpanded && (
                      <button 
                        className="mt-2 text-xs text-[#E07A5F] hover:underline flex items-center gap-1"
                        onClick={() => toggleStepExpansion(idx)}
                      >
                        <FiChevronUp size={12} />
                        Show less
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </motion.section>
  );
}

export default Instructions;