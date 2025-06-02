
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const PolicyBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m PolicyBot, your trading policy assistant. I can help you understand trading rules, compliance requirements, and policy guidelines. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('trading limit') || input.includes('position limit')) {
      return 'Trading limits are set based on your risk profile and account type. Individual position limits are typically 5% of portfolio value for equities and 2% for options. Please consult the Trading Policy Manual section 3.2 for detailed limits.';
    }
    
    if (input.includes('compliance') || input.includes('regulation')) {
      return 'All trading activities must comply with SEC regulations and internal policies. Key requirements include pre-trade approval for large positions, position reporting, and adherence to insider trading policies. See Compliance Manual sections 1-4.';
    }
    
    if (input.includes('approval') || input.includes('authorize')) {
      return 'Trade approvals are required for positions exceeding $1M in notional value, new product types, or trades outside normal risk parameters. Submit requests through the TPC system with full justification and risk analysis.';
    }
    
    if (input.includes('risk') || input.includes('var')) {
      return 'Risk management policies require daily VaR monitoring, stress testing, and position concentration limits. Maximum portfolio VaR is set at 2% at 99% confidence level. Risk reports are generated daily at market close.';
    }
    
    if (input.includes('option') || input.includes('derivative')) {
      return 'Options and derivatives trading requires Level 3 authorization. Permitted strategies include covered calls, protective puts, and cash-secured puts. Naked options and complex strategies require additional approval. See Derivatives Policy section 2.1.';
    }
    
    return 'I can help you with trading policies, compliance requirements, risk management guidelines, and approval processes. Please ask me about specific policy areas such as trading limits, compliance regulations, risk management, or derivative policies.';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="h-[600px] flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            PolicyBot - Trading Rules & Compliance Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 text-slate-900 rounded-lg px-4 py-2 max-w-[80%]">
                    <p className="text-sm">PolicyBot is typing...</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about trading policies, compliance, or risk management..."
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                size="sm"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PolicyBot;
