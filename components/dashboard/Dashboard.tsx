"use client";

import { Button } from "@/components/ui/button";
import { onBoardUser } from "@/modules/auth/actions";
import ClaimLinkForm from "@/modules/home/components/cliam-link-form";
import { getCurrentUsername } from "@/modules/profile/actions";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { 
  Plus, 
  BarChart3, 
  Settings, 
  Copy, 
  Check, 
  TreePine, 
  ExternalLink,
  Eye,
  Link2,
  MousePointer,
  TrendingUp,
  Clock,
  Globe,
  User,
  Moon,
  Sun,
  ArrowRight
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
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
            <div className="glass-card bg-white/5 p-1.5 rounded-2xl flex flex-col sm:flex-row items-center gap-2 max-w-xl group focus-within:ring-2 focus-within:ring-[#FFA116]/40 transition-all duration-300">
              <div className="flex items-center flex-1 px-4 w-full">
                <span className="text-gray-500 font-medium select-none">{getCurrentUrl()}/</span>
                <span className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-600 w-full font-medium text-lg">
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
              <a 
                href="/admin/my-tree"
                className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 font-semibold text-sm uppercase tracking-widest"
              >
                <span>TreeBio Dashboard</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right 3D Visual Column */}
          <div className="relative flex items-center justify-center min-h-[600px]" style={{ perspective: '1200px' }}>
            {/* Connection Lines SVG Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 600 600">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFA116" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FFA116" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g style={{ transform: `translate3d(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px, 0)` }}>
                <path className="animate-pulse" d="M300,300 L450,150" fill="none" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="100" opacity="0.3" />
                <path className="animate-pulse" d="M300,300 L150,150" fill="none" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="100" opacity="0.3" />
                <path className="animate-pulse" d="M300,300 L150,450" fill="none" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="100" opacity="0.3" />
                <path className="animate-pulse" d="M300,300 L450,450" fill="none" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="100" opacity="0.3" />
              </g>
            </svg>

            {/* Central Hub */}
            <div className="relative z-20 group" style={{
              transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`
            }}>
              {/* Rotating Rings */}
              <div className="absolute inset-[-40px] border-2 border-[#FFA116]/20 border-t-[#FFA116]/80 rounded-full animate-spin" style={{ animationDuration: '12s' }}></div>
              <div className="absolute inset-[-20px] border-2 border-[#FFA116]/20 border-t-[#FFA116]/80 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
              
              {/* Sphere */}
              <div className="w-40 h-40 bg-gradient-to-br from-[#FFA116] to-orange-700 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(255,161,22,0.4)] relative">
                <div className="w-[94%] h-[94%] bg-[#0F0A05] rounded-full flex items-center justify-center overflow-hidden border border-white/10">
                  <TreePine className="w-12 h-12 text-[#FFA116]" />
                </div>
                <div className="absolute -bottom-6 bg-white text-black px-4 py-1 rounded-full text-xs font-black shadow-2xl tracking-tight">
                  @{profile?.username || 'YOU'}
                </div>
              </div>
            </div>

            {/* Orbital Cards */}
            {/* Stats Card */}
            <div className="absolute animate-spin" style={{ 
              animationDuration: '20s',
              transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)`
            }}>
              <div className="glass-card bg-white/5 p-4 rounded-2xl w-40 flex flex-col gap-3" style={{
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transform: 'translateX(180px) rotate(0deg)'
              }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#FFA116]/10 rounded flex items-center justify-center">
                    <Eye className="w-4 h-4 text-[#FFA116]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white">Views</span>
                </div>
                <div className="space-y-1.5">
                  <div className="text-2xl font-black text-white">1.2K</div>
                  <div className="h-1 w-full bg-white/10 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Links Card */}
            <div className="absolute animate-spin" style={{ 
              animationDuration: '25s',
              animationDelay: '-5s',
              transform: `translate3d(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px, 0)`
            }}>
              <div className="glass-card bg-white/5 p-4 rounded-2xl w-44 flex flex-col gap-3" style={{
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transform: 'translateX(180px) rotate(0deg)'
              }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500/20 rounded border border-blue-500/30 flex items-center justify-center">
                    <Link2 className="w-3 h-3 text-blue-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white">Links</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="h-10 bg-white/5 rounded flex items-center justify-center text-white font-bold">12</div>
                  <div className="h-10 bg-white/5 rounded flex items-center justify-center text-gray-400">Active</div>
                </div>
              </div>
            </div>

            {/* Clicks Card */}
            <div className="absolute animate-spin" style={{ 
              animationDuration: '30s',
              animationDelay: '-10s',
              transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`
            }}>
              <div className="glass-card bg-white/5 p-4 rounded-2xl w-36 flex flex-col gap-3" style={{
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transform: 'translateX(180px) rotate(0deg)'
              }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">
                    <MousePointer className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white">Clicks</span>
                </div>
                <div className="text-2xl font-black text-white">892</div>
              </div>
            </div>

            {/* CTR Card */}
            <div className="absolute animate-spin" style={{ 
              animationDuration: '22s',
              animationDelay: '-15s',
              transform: `translate3d(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px, 0)`
            }}>
              <div className="glass-card bg-white/5 p-4 rounded-2xl w-48" style={{
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transform: 'translateX(180px) rotate(0deg)'
              }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-bold text-[#FFA116] uppercase tracking-tighter">CTR Rate</span>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></div>
                </div>
                <div className="space-y-3">
                  <div className="text-2xl font-black text-white">69.5%</div>
                  <div className="h-7 w-full bg-white/5 rounded-lg border border-white/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

 

      <style jsx>{`
        .glass-card {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
        }
        .glass-card:hover {
          border-color: rgba(255, 161, 22, 0.4);
          transform: translateY(-10px) rotateX(10deg) rotateY(10deg);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(255,161,22,0.1);
        }
        @keyframes dash {
          to { stroke-dashoffset: -200; }
        }
      `}</style>
    </div>
  );
}