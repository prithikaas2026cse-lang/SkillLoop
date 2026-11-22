import React from 'react';
import { UserCheck, Sparkles, Calendar, Award, ArrowRight } from 'lucide-react';
import { useSkillLoop } from '../../context/SkillLoopContext';

export const HowItWorks = () => {
  const { setCurrentPage } = useSkillLoop();

  const steps = [
    {
      icon: UserCheck,
      number: '01',
      title: 'Build Your Student Profile',
      desc: 'List the subjects or practical tools you can teach (e.g. React, Excel, Video Editing) and the skills on your wishlist.',
      color: 'blue'
    },
    {
      icon: Sparkles,
      number: '02',
      title: 'Discover Reverse Matches',
      desc: 'SkillLoop highlights peers where their learning wishlist matches your strengths, and their strengths match your wishlist.',
      color: 'indigo'
    },
    {
      icon: Calendar,
      number: '03',
      title: 'Schedule a Balanced Session',
      desc: 'Use the built-in session planner to book 1-on-1 swaps at the campus library, student center, or via video call.',
      color: 'sky'
    },
    {
      icon: Award,
      number: '04',
      title: 'Earn Badges & Endorsements',
      desc: 'Rate each other, leave constructive feedback, and build a verified skill portfolio to show off on your resume.',
      color: 'emerald'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How SkillLoop Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            From setup to your first 1-on-1 peer exchange session in less than 3 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft hover:shadow-card-hover transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-300 tracking-tighter">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
