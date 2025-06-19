
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3Provider } from './contexts/Web3Context';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from "./pages/Home";
import Game from "./pages/Game";
import MyCards from "./pages/MyCards";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Web3Provider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
                <Route path="/my-cards" element={<MyCards />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </Web3Provider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
