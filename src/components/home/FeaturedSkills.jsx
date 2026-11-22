import React from 'react';
import { POPULAR_SKILLS, SKILL_CATEGORIES } from '../../data/skillsCatalog';
import { ArrowRight, Code, Palette, Database, BookOpen, Briefcase, Music, Sparkles } from 'lucide-react';
import { useSkillLoop } from '../../context/SkillLoopContext';

export const FeaturedSkills = () => {
  const { setCurrentPage } = useSkillLoop();

  const categoryIcons = {
    coding: Code,
    design: Palette,
    data: Database,
    academics: BookOpen,
    business: Briefcase,
    creative: Music
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Skills in High Demand</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Most Exchanged Skills on Campus
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Browse popular topics students are currently teaching and learning.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentPage('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
          >
            <span>View All 50+ Skills</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_SKILLS.slice(0, 6).map((skill, idx) => {
            const Icon = categoryIcons[skill.category] || Code;
            return (
              <div
                key={idx}
                onClick={() => {
                  setCurrentPage('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-5 rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-card-hover transition-all cursor-pointer group bg-slate-50/50 hover:bg-white"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                    {skill.level}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                  {skill.name}
                </h3>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200/60 text-xs text-slate-500">
                  <span>{skill.learners} active students</span>
                  <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Find Match &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
