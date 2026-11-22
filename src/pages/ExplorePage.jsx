import React, { useState, useMemo } from 'react';
import { useSkillLoop } from '../context/SkillLoopContext';
import { StudentCard } from '../components/explore/StudentCard';
import { ConnectModal } from '../components/explore/ConnectModal';
import { SKILL_CATEGORIES } from '../data/skillsCatalog';
import { calculateSkillMatch } from '../utils/matchingAlgorithm';
import { Search, Filter, Sparkles, ArrowLeftRight, X, Users } from 'lucide-react';

export const ExplorePage = () => {
  const { students, currentUser } = useSkillLoop();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [onlyMutualMatches, setOnlyMutualMatches] = useState(false);
  const [selectedPeerForConnect, setSelectedPeerForConnect] = useState(null);

  // Filter peers
  const filteredStudents = useMemo(() => {
    return students
      .filter(s => s.id !== currentUser.id)
      .filter(s => {
        // Query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const nameMatch = s.name.toLowerCase().includes(q);
          const collegeMatch = s.college.toLowerCase().includes(q);
          const majorMatch = s.major.toLowerCase().includes(q);
          const teachMatch = s.teachSkills.some(sk => sk.name.toLowerCase().includes(q));
          const learnMatch = s.learnSkills.some(sk => sk.name.toLowerCase().includes(q));
          if (!nameMatch && !collegeMatch && !majorMatch && !teachMatch && !learnMatch) return false;
        }

        // Category match
        if (selectedCategory !== 'all') {
          const inCategory = s.teachSkills.some(sk => sk.category === selectedCategory) ||
                             s.learnSkills.some(sk => sk.category === selectedCategory);
          if (!inCategory) return false;
        }

        // Only mutual matches filter
        if (onlyMutualMatches) {
          const match = calculateSkillMatch(currentUser, s);
          if (!match.isMutualLoop) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const scoreA = calculateSkillMatch(currentUser, a).score;
        const scoreB = calculateSkillMatch(currentUser, b).score;
        return scoreB - scoreA;
      });
  }, [students, currentUser, searchQuery, selectedCategory, onlyMutualMatches]);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200 mb-2">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Campus Skill Directory</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Peer Skills
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Find students to teach you new skills or discover peers seeking your expertise.
            </p>
          </div>

          {/* Quick stats pill */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{filteredStudents.length} Available Peer Mentors</span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-soft space-y-4">
          
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by skill (e.g. React, Figma, Spanish), student name, or major..."
                className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50/50 focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mutual Matches Toggle Button */}
            <button
              onClick={() => setOnlyMutualMatches(!onlyMutualMatches)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                onlyMutualMatches
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Perfect 2-Way Loops Only</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>

        {/* Results Grid */}
        {filteredStudents.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Search className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No student peers found</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Try adjusting your search keywords, clear category filters, or disable the "2-Way Loops Only" toggle.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setOnlyMutualMatches(false);
              }}
              className="px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((peer) => (
              <StudentCard
                key={peer.id}
                peer={peer}
                onConnectClick={(p) => setSelectedPeerForConnect(p)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Connect Modal */}
      <ConnectModal
        peer={selectedPeerForConnect}
        isOpen={Boolean(selectedPeerForConnect)}
        onClose={() => setSelectedPeerForConnect(null)}
      />
    </div>
  );
};
