
'use client';

import { useState, useEffect, useRef } from 'react';

type UseSpeechOptions = {
  onSpeechEnd?: (text: string) => void;
};

export const useSpeech = (options: UseSpeechOptions = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if the browser supports the Web Speech API
    if (typeof window === 'undefined' || !('webkitSpeechRecognition' in window)) {
      console.warn('Web Speech API is not supported in this browser.');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US'; // Default language

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(interimTranscript);
      if (finalTranscript) {
         setTranscript(finalTranscript); // Final update
         if(options.onSpeechEnd) {
             options.onSpeechEnd(finalTranscript);
         }
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionError) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    // Cleanup on unmount
    return () => {
      recognition.stop();
    };
  }, [options.onSpeechEnd]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const speak = (text: string, lang = 'en-US') => {
     if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Text-to-Speech is not supported in this browser.');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    speak,
  };
};
