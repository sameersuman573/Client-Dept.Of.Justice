import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, Scale } from 'lucide-react';
import { Server } from '../Constant/config';

const ChatbotUI = () => {
  const [messages, setMessages] = useState([
    { text: "Hello, I'm your assistant from the Department of Justice. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${Server}/api/v1/Bot/WebAsk`, {
        question: `Please provide an answer with respect to India: ${input}`
      });

      const botResponse = {
        text: response.data.data.answer.answer,
        isUser: false
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error fetching response:', error);
      const botResponse = {
        text: "Sorry, If I couldn't process request try again for your first query as server takes time to start............... \n and if you are asking your second query then wait for 1 minute\nbecause as of now I am allowed to ask 5 query Per 1 Minute",
        isUser: false
      };
      setMessages((prev) => [...prev, botResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800">
      <div className="flex-grow flex flex-col h-full">
        <div className="bg-black bg-opacity-30 p-4 flex items-center justify-center">
          <Scale className="text-yellow-400 mr-2" size={32} />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
            Department of Justice Chatbot
          </h1>
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.isUser 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                    : 'bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center text-gray-300">
              <Bot className="animate-pulse mr-2" />
              <span>Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-black bg-opacity-30 p-4">
        <div className="max-w-4xl mx-auto flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your question here..."
            className="flex-grow p-3 rounded-l-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-r-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Send size={24} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatbotUI;