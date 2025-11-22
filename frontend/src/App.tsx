import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import HomePage from './pages/HomePage';
import MemoryGamePage from './pages/games/MemoryGamePage';
import GrammarGamePage from './pages/games/GrammarGamePage';
import ListeningGamePage from './pages/games/ListeningGamePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserProfile from './pages/UserProfile';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <HomePage />
              </motion.div>
            } />
            
            <Route path="/games/memory" element={
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MemoryGamePage />
              </motion.div>
            } />
            
            <Route path="/games/grammar" element={<GrammarGamePage />} />
            <Route path="/games/listening" element={<ListeningGamePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
