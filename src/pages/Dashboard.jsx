import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Smartphone, 
  Building2, 
  FileText, 
  Wallet, 
  PiggyBank,
  Shield, 
  TrendingUp,
  Target,
  Gift,
  Leaf,
  MoreHorizontal 
} from 'lucide-react';

const MenuItem = ({ icon: Icon, label, isNew }) => (
  <div className="flex flex-col items-center p-4 bg-white rounded-xl cursor-pointer transition-transform hover:-translate-y-1 relative">
    
    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
      <Icon className="w-6 h-6 text-blue-600" />
      
    </div>
    <span className="text-sm text-gray-700">{label}</span>
    {isNew && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
        New
      </span>
    )}
  </div>
);

const Dashboard = () => {
  const [balance, setBalance] = useState(50);
  const [countdown, setCountdown] = useState(7);
  const [isIncreasing, setIsIncreasing] = useState(false);

  useEffect(() => {
    let countdownTimer;
    if (countdown > 0) {
      countdownTimer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsIncreasing(true);
      clearInterval(countdownTimer);
    }

    return () => clearInterval(countdownTimer);
  }, [countdown]);

  useEffect(() => {
    // Continuous balance increase after countdown
    let increaseTimer;
    if (isIncreasing) {
      increaseTimer = setInterval(() => {
        setBalance(prev => prev + 10);
      }, 40); // Increases every 100ms
    }

    return () => clearInterval(increaseTimer);
  }, [isIncreasing]);

  const menuItems = [
    { icon: Send, label: 'Send' },
    { icon: Smartphone, label: 'Load' },
    { icon: Building2, label: 'Transfer' },
    { icon: FileText, label: 'Bills' },
    { icon: Wallet, label: 'Borrow' },
    { icon: PiggyBank, label: 'GSave' },
    { icon: Shield, label: 'GInsure' },
    { icon: TrendingUp, label: 'GInvest', isNew: true },
    { icon: Target, label: 'GLife' },
    { icon: Gift, label: 'A+ Rewards' },
    { icon: Leaf, label: 'GForest' },
    { icon: MoreHorizontal, label: 'View All' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
          G
        </div>
        <h1 className="text-2xl font-semibold text-blue-700">GKash</h1>
      </div>

      {/* Balance Card */}
      <div className="bg-blue-600 text-white p-6 rounded-2xl mb-8 flex justify-between items-center">
        <div>
          <div className="text-sm mb-1">AVAILABLE BALANCE</div>
          <div className="text-3xl text-left font-bold">₱ {balance.toFixed(2)}</div>
        </div>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors">
          + Cash In
        </button>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            isNew={item.isNew}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;