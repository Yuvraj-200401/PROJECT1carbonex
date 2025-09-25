
'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Mic, Send, Bot, User, X, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useSpeech } from '@/hooks/use-speech';
import { oceanGuardian } from '@/ai/flows/ocean-guardian-flow';

type Message = {
  text: string;
  sender: 'user' | 'ai';
};

export function OceanGuardian() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isListening, transcript, startListening, stopListening, speak } = useSpeech({
    onSpeechEnd: (text) => {
      setInputValue(text);
      handleSend(text);
    },
  });

  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMessage: Message = { text, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    try {
      const response = await oceanGuardian({ query: text });
      const aiMessage: Message = { text: response.reply, sender: 'ai' };
      setMessages((prev) => [...prev, aiMessage]);
      speak(response.reply);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: 'ai',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="lg"
            className="rounded-full w-16 h-16 shadow-lg bg-primary/90 backdrop-blur-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <MessageSquare />}
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 w-[90vw] max-w-sm h-[70vh] max-h-[600px] z-50 bg-card/80 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Bot className="text-primary" />
                <h3 className="font-bold text-foreground">Ocean Guardian</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/20 rounded-full"><Bot className="text-primary" /></div>
                  <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm">Hello! I'm the Ocean Guardian. Ask me about blue carbon, our projects, or your impact.</p>
                  </div>
                </div>

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                  >
                    {msg.sender === 'ai' && <div className="p-2 bg-primary/20 rounded-full"><Bot className="text-primary" /></div>}
                    <div className={`p-3 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                     {msg.sender === 'user' && <div className="p-2 bg-muted rounded-full"><User /></div>}
                  </div>
                ))}
                {isThinking && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/20 rounded-full"><Bot className="text-primary" /></div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                            <Bot className="h-4 w-4" />
                        </motion.div>
                        <span>Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isListening ? 'Listening...' : 'Ask me anything...'}
                  className="flex-1"
                  disabled={isThinking}
                />
                <Button type="button" size="icon" variant={isListening ? 'destructive' : 'outline'} onClick={handleMicClick} disabled={isThinking}>
                  <Mic />
                </Button>
                <Button type="submit" size="icon" disabled={isThinking || !inputValue.trim()}>
                  <Send />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
