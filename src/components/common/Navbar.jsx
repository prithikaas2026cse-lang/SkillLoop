import React, { useState } from 'react';
import { 
  Repeat, 
  Compass, 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Star, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  LogIn,
  UserPlus,
  ShieldCheck
} from 'lucide-react';
import { useSkillLoop } from '../../context/SkillLoopContext';

export const Navbar = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    currentUser, 
    students, 
    switchUser, 
    connections, 
    sessions,
    setAuthModalState 
  } = useSkillLoop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Pending incoming requests count
  const pendingRequestsCount = connections.filter(
    c => c.toStudentId === currentUser.id && c.status === 'pending'
  ).length;

  // Upcoming confirmed sessions count
  const upcomingSessionsCount = sessions.filter(
    s => (s.peerId === currentUser.id || s.peerId) && s.status === 'confirmed'
  ).length;

  const navItems = [
    { id: 'home', label: 'Home', icon: Repeat },
    { id: 'explore', label: 'Explore Skills', icon: Compass },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { 
      id: 'connections', 
      label: 'Connections', 
      icon: Users,
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : null 
    },
    { 
      id: 'sessions', 
      label: 'Sessions', 
      icon: Calendar,
      badge: upcomingSessionsCount > 0 ? upcomingSessionsCount : null 
    },
    { id: 'feedback', label: 'Reviews', icon: Star },
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Repeat className="w-5 h-5 text-white animate-spin" style={{ animationDuration: '12s' }} />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-blue-800 to-slate-900 bg-clip-text text-transparent">
                SkillLoop
              </span>
              <span className="hidden sm:inline-block ml-1.5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/60 rounded-full">
                Peer Exchange
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    isActive
                      ? 'text-blue-700 bg-blue-50/80 font-semibold shadow-sm shadow-blue-500/5'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[11px] font-bold bg-blue-600 text-white rounded-full leading-tight">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Controls & Simulation Switcher */}
          <div className="hidden md:flex items-center gap-3">
            {/* Student Switcher Dropdown (Allows testing 2-way reverse match easily) */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full border border-slate-200 bg-white hover:border-blue-300 transition-all shadow-sm"
                title="Switch test student profile"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                />
                <div className="text-left leading-tight hidden lg:block">
                  <div className="text-xs font-bold text-slate-800">{currentUser.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-blue-600 font-medium truncate max-w-[80px]">
                    {currentUser.major.split(' ')[0]}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Current Logged Student</p>
                    <p className="text-sm font-bold text-slate-800">{currentUser.name}</p>
                    <p className="text-xs text-slate-500">{currentUser.college}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleNavClick('profile');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5" />
                      View & Edit My Profile
                    </button>
                  </div>

                  <div className="px-3 pt-2 pb-1 border-t border-slate-100">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Switch Student (Test 2-Way Match):
                    </p>
                  </div>
                  <div className="max-h-48 overflow-y-auto py-1">
                    {students.map((std) => (
                      <button
                        key={std.id}
                        onClick={() => {
                          switchUser(std.id);
                          setProfileDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${
                          std.id === currentUser.id 
                            ? 'bg-blue-50 font-bold text-blue-700' 
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <img src={std.avatar} className="w-5 h-5 rounded-full object-cover" alt="" />
                          <span className="truncate">{std.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{std.teachSkills[0]?.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 p-2 flex gap-1.5">
                    <button
                      onClick={() => {
                        setAuthModalState('login');
                        setProfileDropdownOpen(false);
                      }}
                      className="flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center gap-1"
                    >
                      <LogIn className="w-3.5 h-3.5" /> Login
                    </button>
                    <button
                      onClick={() => {
                        setAuthModalState('register');
                        setProfileDropdownOpen(false);
                      }}
                      className="flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1"
                    >
                      <UserPlus className="w-3.5 h-3.5" /> Sign Up
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => handleNavClick('explore')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/30 hover:shadow-md transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Find a Peer Match
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('profile')}
              className="p-1 rounded-full border border-slate-200"
            >
              <img src={currentUser.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-1 animate-fadeIn">
          <div className="p-3 bg-blue-50/70 rounded-xl mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src={currentUser.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-blue-200" />
              <div>
                <p className="text-sm font-bold text-slate-800">{currentUser.name}</p>
                <p className="text-xs text-blue-600">{currentUser.major}</p>
              </div>
            </div>
            <button
              onClick={() => handleNavClick('profile')}
              className="text-xs font-semibold px-2.5 py-1 bg-white text-blue-700 rounded-lg border border-blue-200 shadow-xs"
            >
              Edit Profile
            </button>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive 
                    ? 'text-blue-700 bg-blue-50 font-bold' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-blue-600 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                setAuthModalState('login');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 bg-slate-50"
            >
              Login
            </button>
            <button
              onClick={() => {
                setAuthModalState('register');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-sm"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
