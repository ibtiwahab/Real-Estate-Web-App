import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaPaperPlane, FaVolumeUp, FaSpinner } from 'react-icons/fa';

const AIChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const waveformRef = useRef(null);

  // Animation frames state and refs
  const animationFrameIdRef = useRef(null);
  const waveformAnimationRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Initialize audio context for visualizer
  useEffect(() => {
    if (!waveformRef.current) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
    }

    const canvas = waveformRef.current;
    const ctx = canvas.getContext('2d');
    
    // Responsive canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Visualizer animation for speaking AI
  const startSpeakingAnimation = () => {
    if (!waveformRef.current) return;
    
    const canvas = waveformRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Random waveform for AI speaking
      const centerY = height / 2;
      const amplitude = isSpeaking ? 30 : 5;
      
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      
      for (let i = 0; i < width; i += 5) {
        const randomY = isSpeaking 
          ? centerY + (Math.sin(i * 0.05 + Date.now() * 0.002) * amplitude * Math.random())
          : centerY + (Math.sin(i * 0.05) * amplitude);
        ctx.lineTo(i, randomY);
      }
      
      ctx.lineTo(width, centerY);
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  };

  // Visualizer animation for user recording
  const startRecordingAnimation = () => {
    if (!waveformRef.current || !analyserRef.current) return;
    
    const canvas = waveformRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      
      // Use microphone data for visualization or fake it if not available
      if (isRecording) {
        // Simulated recording visualization
        const barWidth = (width / 64) * 2.5;
        let x = 0;
        
        for (let i = 0; i < 64; i++) {
          // Simulate microphone input with random values if actual data not available
          const barHeight = (Math.sin(Date.now() * 0.005 + i * 0.2) * 0.5 + 0.5) * height * 0.8;
          
          const hue = i * 4 % 360;
          ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
          ctx.fillRect(x, height - barHeight, barWidth, barHeight);
          
          x += barWidth + 1;
        }
      } else {
        // Idle state - just draw a thin line
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.strokeStyle = '#CBD5E0';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      waveformAnimationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  };

  const sendMessage = async () => {
    if (!input.trim() && !isRecording) return;
    
    // Add user message
    const userMessage = input.trim() || "🎤 [Voice message]";
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);
    
    try {
      // In a real app, you would send the message to your backend API
      // const response = await axios.post('/api/v1/ai-chat', { message: userMessage });
      
      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add AI response
      const aiResponse = "This feature will be available later.";
      setMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { type: 'ai', text: 'Sorry, there was an error processing your request.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      
      // In a real app, you would send the audio to your backend
      // For now, we'll just simulate sending a voice message
      sendMessage();
      
      if (waveformAnimationRef.current) {
        cancelAnimationFrame(waveformAnimationRef.current);
      }
    } else {
      // Start recording
      setIsRecording(true);
      startRecordingAnimation();
      
      // In a real app, you would initialize the microphone recording here
      setInput(''); // Clear text input when starting recording
    }
  };

  const toggleSpeaking = (text) => {
    if (isSpeaking) {
      setIsSpeaking(false);
      window.speechSynthesis?.cancel();
    } else {
      setIsSpeaking(true);
      startSpeakingAnimation();
      
      // Use browser's text-to-speech if available
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      } else {
        // Simulate speech if not available
        setTimeout(() => setIsSpeaking(false), 3000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">AI Property Assistant</h1>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Chat Header */}
          <div className="bg-blue-600 p-4 text-white">
            <h2 className="text-xl font-semibold">Ask me anything about properties</h2>
            <p className="text-blue-100">I can help you find the perfect property based on your preferences</p>
          </div>
          
          {/* Visualizer Canvas */}
          <div className="h-32 bg-gray-900 p-2 flex items-center justify-center relative">
            <canvas 
              ref={waveformRef} 
              className="w-full h-full"
            ></canvas>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse bg-blue-500 rounded-full h-24 w-24 flex items-center justify-center">
                  <FaSpinner className="animate-spin text-white text-3xl" />
                </div>
              </div>
            )}
          </div>
          
          {/* Chat Messages */}
          <div className="p-4 h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                <p className="text-lg mb-2">Welcome to AI Property Assistant!</p>
                <p>Ask me anything about properties, neighborhoods, or real estate advice.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs sm:max-w-md md:max-w-lg rounded-lg px-4 py-2 ${
                        msg.type === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-gray-200 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p className="break-words">{msg.text}</p>
                      {msg.type === 'ai' && (
                        <button 
                          onClick={() => toggleSpeaking(msg.text)}
                          className="mt-1 text-xs flex items-center text-gray-600 hover:text-blue-600"
                        >
                          <FaVolumeUp className="mr-1" />
                          {isSpeaking ? 'Stop' : 'Listen'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <button
                onClick={toggleRecording}
                className={`p-3 rounded-full mr-3 flex-shrink-0 ${
                  isRecording 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isRecording ? <FaStop /> : <FaMicrophone />}
              </button>
              
              <div className="relative flex-grow">
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  disabled={isRecording}
                  placeholder={isRecording ? "Recording..." : "Type your message..."}
                  className="w-full border border-gray-300 rounded-full py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
                  rows="1"
                ></textarea>
                <button
                  onClick={sendMessage}
                  disabled={isLoading || (!input.trim() && !isRecording)}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                    isLoading || (!input.trim() && !isRecording)
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isLoading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                </button>
              </div>
            </div>
            
            {/* Notice about feature availability */}
            <p className="text-center text-gray-500 text-sm mt-4">
              This AI chat feature is coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;