"use client";

import { Button } from "@/components/ui/button";
import { onBoardUser } from "@/modules/auth/actions";
import ClaimLinkForm from "@/modules/home/components/cliam-link-form";
import { getCurrentUsername } from "@/modules/profile/actions";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { 
  Copy, 
  Check, 
  ArrowRight
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<{[key: string]: any} | null>(null);
  const [profile, setProfile] = useState<{[key: string]: any} | null>(null);
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);

  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      const host = window.location.host;
      const port = window.location.port;
      // If port is not standard (80/443), include it
      if (port && port !== '80' && port !== '443') {
        return host;
      }
      // For localhost, always include port 3000
      if (window.location.hostname === 'localhost') {
        return 'localhost:3000';
      }
      return host;
    }
    return 'localhost:3000';
  };

  const handleCopyLink = async () => {
    const url = `${getCurrentUrl()}/${profile?.username || 'username'}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await onBoardUser();
        const profileData = await getCurrentUsername();
        
        setUser(userData);
        setProfile(profileData);
        
        if (!userData.success) {
          window.location.href = "/sign-in";
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;
      setMousePos({ x, y });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (loading || !user?.success) {
    return (
      <div className="min-h-screen" style={{
        background: 'radial-gradient(circle at 70% 50%, #231B0F 0%, #0F0A05 100%)'
      }}>
        <div className="flex items-center justify-center h-screen">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100vh] text-[#F9FAFB] font-sans selection:bg-[#FFA116]/30 overflow-x-hidden" style={{
      background: 'radial-gradient(circle at 70% 50%, #231B0F 0%, #0F0A05 100%)'
    }}>
     

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6 lg:px-12 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#FFA116]/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Content Column */}
          <div className="flex flex-col space-y-10 z-10" style={{
            transform: `translate3d(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px, 0)`
          }}>
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFA116]/10 border border-[#FFA116]/20 text-[#FFA116] text-xs font-bold tracking-widest uppercase">
                Welcome back, {profile?.firstName || 'User'}
              </div>
              <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
                Everything you create. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA116] to-orange-400">One powerful link.</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-400 max-w-lg leading-relaxed">
                The premium way to connect your audience to your digital world. Simple, powerful, and beautifully integrated.
              </p>
            </div>

            {/* User Link Section */}
            <div className="bg-white/5 p-1.5 rounded-2xl flex flex-col sm:flex-row items-center gap-2 max-w-xl group focus-within:ring-2 focus-within:ring-[#FFA116]/40 transition-all duration-300">
              <div className="flex items-center flex-1 px-4 w-full">
                <span className="text-gray-500 font-medium select-none">{getCurrentUrl()}/</span>
                <span className="bg-transparent border-none  text-white placeholder-gray-600 w-full font-medium text-lg ">
                  {profile?.username || 'username'}
                </span>
              </div>
              <Button 
                className={`w-full sm:w-auto font-bold px-8 py-4 rounded-xl transition-all duration-300 transform active:scale-95 whitespace-nowrap ${
                  copied 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-[#FFA116] hover:bg-white text-black'
                }`}
                onClick={handleCopyLink}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>

            {/* Dashboard Link */}
            <div className="flex items-center gap-6">
              <Link 
                href="/admin/my-tree"
                className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 font-semibold text-sm uppercase tracking-widest"
              >
                <span>LinkNode Dashboard</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right 3D Visual Column - New Animation */}
          <div className="relative flex items-center justify-center min-h-[600px]" style={{ perspective: '1200px' }}>
            {/* Radar/Ring Animation Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Concentric Rings */}
              <div className="absolute w-80 h-80 border border-[#FFA116]/10 rounded-full animate-ping"></div>
              <div className="absolute w-64 h-64 border border-[#FFA116]/15 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute w-48 h-48 border border-[#FFA116]/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              <div className="absolute w-32 h-32 border border-[#FFA116]/25 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
            </div>

            {/* Central Hub */}
            <div className="relative z-20 group" style={{
              transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`
            }}>
              {/* Rotating Rings */}
              <div className="absolute inset-[-50px] border-2 border-[#FFA116]/20 border-t-[#FFA116]/60 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
              <div className="absolute inset-[-35px] border-2 border-[#FFA116]/15 border-t-[#FFA116]/40 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
              
              {/* Central Sphere */}
              <div className="w-40 h-40 bg-gradient-to-br from-[#FFA116] to-orange-600 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(255,161,22,0.5)] relative">
                <div className="w-[90%] h-[90%] bg-[#0F0A05] rounded-full flex items-center justify-center overflow-hidden border-2 border-white/20">
                  <ArrowRight className="w-10 h-10 text-[#FFA116]" />
                </div>
                <div className="absolute -bottom-8 bg-white text-black px-6 py-2 rounded-full text-sm font-black shadow-2xl tracking-tight">
                  @{profile?.username || 'YOU'}
                </div>
              </div>
            </div>

            {/* Orbital Cards - Match Image Layout */}
            
            {/* VIDEO Card - Top Right */}
            <div className="absolute animate-orbit" style={{ 
              animationDuration: '25s',
              animationDelay: '0s',
              transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`
            }}>
              <div className="glass-card bg-white/10 p-6 rounded-2xl w-48 flex flex-col gap-4" style={{
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                transform: 'translateX(200px) translateY(-150px) rotate(0deg)'
              }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-4 bg-red-500 rounded-sm"></div>
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider text-white">VIDEO</span>
                </div>
                <div className="h-16 bg-white/5 rounded-lg"></div>
              </div>
            </div>

            {/* WORK Card - Middle Left */}
            <div className="absolute animate-orbit" style={{ 
              animationDuration: '30s',
              animationDelay: '-8s',
              transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)`
            }}>
              <div className="glass-card bg-white/10 p-6 rounded-2xl w-48 flex flex-col gap-4" style={{
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                transform: 'translateX(-200px) translateY(0px) rotate(0deg)'
              }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <div className="w-5 h-3 bg-blue-400 rounded-sm"></div>
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider text-white">WORK</span>
                </div>
                <div className="h-16 bg-white/5 rounded-lg"></div>
              </div>
            </div>

            {/* UPDATES Card - Bottom Left */}
            <div className="absolute animate-orbit" style={{ 
              animationDuration: '35s',
              animationDelay: '-16s',
              transform: `translate3d(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px, 0)`
            }}>
              <div className="glass-card bg-white/10 p-6 rounded-2xl w-48 flex flex-col gap-4" style={{
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                transform: 'translateX(-200px) translateY(150px) rotate(0deg)'
              }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider text-white">UPDATES</span>
                </div>
                <div className="h-16 bg-white/5 rounded-lg"></div>
              </div>
            </div>

            {/* SUBSCRIBERS Card - Bottom */}
            <div className="absolute animate-orbit" style={{ 
              animationDuration: '40s',
              animationDelay: '-24s',
              transform: `translate3d(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px, 0)`
            }}>
              <div className="glass-card bg-white/10 p-6 rounded-2xl w-56 flex flex-col gap-4" style={{
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                transform: 'translateX(0px) translateY(200px) rotate(0deg)'
              }}>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold uppercase tracking-wider text-white">SUBSCRIBERS</span>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 text-sm focus:outline-none focus:border-[#FFA116] focus:ring-1 focus:ring-[#FFA116]/50"
                  />
                  <Button className="bg-[#FFA116] hover:bg-orange-500 text-black font-bold px-4 py-2 rounded-lg text-sm transition-colors">
                    SUBSCRIBE
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(180px);
          }
          to {
            transform: rotate(360deg) translateX(180px);
          }
        }
        
        .animate-orbit {
          animation: orbit linear infinite;
          transform-origin: center;
        }
        
        .glass-card {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
        }
        .glass-card:hover {
          border-color: rgba(255, 161, 22, 0.4);
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(255,161,22,0.1);
        }
      `}</style>
    </div>
  );
}
