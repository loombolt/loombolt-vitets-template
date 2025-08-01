import  { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkle } from "lucide-react";
import useCountStore from '../store/useCountStore';
import { findWelcomeRecordById } from '../db/loomboltdb-function-tutorial';


export default function Home () {
  const { count, increment, decrement, reset } = useCountStore();
  const [scale, setScale] = useState(0.5);
  const [DBMessage, setDBMessage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await findWelcomeRecordById(1);
      if (error) {
        setDBMessage('Error fetching data from DB');
      } else {
        setDBMessage(data?.message || 'No data found for ID 1.');
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  
  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Animations
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Silky smooth animation
            </p>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="flex flex-col items-center gap-4">
              <motion.div 
                className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg"
                animate={{ 
                  scale,
                  rotate: scale * 90,
                  borderRadius: `${scale * 20}px`
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              
              <div className="w-full space-y-2">
                <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                  Adjust Scale: {scale.toFixed(1)}
                </p>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Interactive Elements
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Making your application's components interactive.
            </p>
          </div>
          <div className="px-6 pb-6 flex flex-col items-center gap-4">
            <motion.div 
              className="text-5xl font-bold text-slate-900 dark:text-white"
              key={count}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring" }}
            >
              {count}
            </motion.div>
            
            <div className="flex gap-2">
              <button 
                className="w-10 h-10 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                onClick={decrement}
              >
                -
              </button>
              <button 
                className="px-4 py-2 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-md hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                onClick={reset}
              >
                Reset
              </button>
              <button 
                className="w-10 h-10 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                onClick={increment}
              >
                +
              </button>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">
              Counter persists between pages
            </p>
          </div>
        </div>
      </div>
      
      {/* Loombolt DB Card - Full Width */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
        <div className="p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Loombolt DB
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Lightweight NoSQL Database
          </p>
        </div>
        <div className="px-6 pb-6 flex flex-col items-center">
          <code className="font-mono bg-slate-100 dark:bg-slate-700 py-1 px-2 rounded text-sm text-slate-600 dark:text-slate-400 text-center whitespace-pre-wrap">
            {loading ? 'Fetching data...' : DBMessage || 'No data found for ID 1.'}
          </code>
        </div>
      </div>
         <div className="container mx-auto flex flex-col items-center justify-center space-x-4 py-2 text-sm text-muted-foreground">
          
          <a href="https://loombolt.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
           <Sparkle className="h-4 w-4"/>
            <span>Built with</span>
            <span className="font-medium">Loombolt</span>
          </a>
        </div>
    </div>
  );
};
