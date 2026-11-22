import React from 'react';
import { Star, Quote, ArrowLeftRight } from 'lucide-react';

export const PeerTestimonials = () => {
  const testimonials = [
    {
      name: 'Maya Patel & Alex Rivera',
      college: 'Pacific Coast University',
      skills: 'React.js ↔ Figma UI/UX',
      avatar1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      avatar2: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      quote: 'SkillLoop matched us within 10 minutes of creating our accounts. I taught Alex design systems and how to structure Figma components, while he walked me through React hooks. We ended up building our final capstone project together!',
      sessions: '8 Dual Sessions Completed'
    },
    {
      name: 'David Kim & Elena Rostova',
      college: 'Bay Area Tech',
      skills: 'Algorithms ↔ Premiere Video Editing',
      avatar1: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      avatar2: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      quote: 'I needed video editing for my startup demo reel, and Elena needed someone to drill LeetCode and Big-O notation for her CS midterm. Reverse matching saved us hundreds of dollars in tutoring fees.',
      sessions: '12 Dual Sessions Completed'
    },
    {
      name: 'Marcus Chen & Sophia Rodriguez',
      college: 'Stanford State & Metro Univ',
      skills: 'Machine Learning ↔ Conversational Spanish',
      avatar1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      avatar2: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      quote: 'Teaching forces you to understand your own craft much deeper. By explaining neural networks to a non-engineer, my own grasp solidified, and my conversational Spanish improved drastically before study abroad!',
      sessions: '6 Dual Sessions Completed'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
            Student Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Real Peer-to-Peer Loops
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            See how college students across campuses are trading skills and building friendships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-7 border border-slate-200 shadow-soft flex flex-col justify-between relative hover:border-blue-300 transition-all"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Swap Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 mb-4">
                  <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600" />
                  <span>{t.skills}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <img src={t.avatar1} className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-xs" alt="" />
                    <img src={t.avatar2} className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-xs" alt="" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                    <p className="text-[11px] text-slate-500">{t.college}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
