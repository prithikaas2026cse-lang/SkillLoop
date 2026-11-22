/**
 * Normalizes skill string for comparison (case-insensitive, trimmed, punctuation-relaxed)
 */
export const normalizeSkill = (skill) => {
  if (!skill) return '';
  return skill.toLowerCase()
    .replace(/[.\-_]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Checks if two skills match (exact or substring match e.g. 'react' matches 'react.js')
 */
export const isSkillMatch = (skillA, skillB) => {
  const a = normalizeSkill(skillA);
  const b = normalizeSkill(skillB);
  if (!a || !b) return false;
  return a === b || a.includes(b) || b.includes(a);
};

/**
 * Core Reverse Skill Matching Algorithm for SkillLoop
 * Evaluates the peer-to-peer synergy between the current student and another peer.
 * 
 * @param {Object} currentUser - The currently active student profile
 * @param {Object} peer - The peer student profile to evaluate
 * @returns {Object} detailed match breakdown including score, badges, and matched skills
 */
export const calculateSkillMatch = (currentUser, peer) => {
  if (!currentUser || !peer || currentUser.id === peer.id) {
    return {
      score: 0,
      matchType: 'self',
      isMutualLoop: false,
      youTeach: [],
      youLearn: [],
      reason: 'Self or invalid peer'
    };
  }

  const userTeach = currentUser.teachSkills || [];
  const userLearn = currentUser.learnSkills || [];
  const peerTeach = peer.teachSkills || [];
  const peerLearn = peer.learnSkills || [];

  // Skills YOU can teach to PEER (You teach, peer wants to learn)
  const youTeachSkills = userTeach.filter(tSkill =>
    peerLearn.some(pLSkill => isSkillMatch(tSkill.name || tSkill, pLSkill.name || pLSkill))
  ).map(s => typeof s === 'string' ? s : s.name);

  // Skills PEER can teach to YOU (Peer teaches, you want to learn)
  const youLearnSkills = peerTeach.filter(pTSkill =>
    userLearn.some(uLSkill => isSkillMatch(pTSkill.name || pTSkill, uLSkill.name || uLSkill))
  ).map(s => typeof s === 'string' ? s : s.name);

  const hasMutualTeach = youTeachSkills.length > 0;
  const hasMutualLearn = youLearnSkills.length > 0;
  const isMutualLoop = hasMutualTeach && hasMutualLearn;

  let score = 0;
  let matchType = 'none';
  let reason = '';
  let badgeColor = 'gray';

  if (isMutualLoop) {
    matchType = 'mutual_loop';
    // Base 80 points for reciprocal match
    const synergyBonus = Math.min((youTeachSkills.length + youLearnSkills.length) * 5, 15);
    // Slight college bonus if same college
    const collegeBonus = currentUser.college === peer.college ? 4 : 0;
    score = Math.min(80 + synergyBonus + collegeBonus, 99);
    reason = `Perfect Loop! You teach ${youTeachSkills[0]} & ${peer.name.split(' ')[0]} teaches ${youLearnSkills[0]}`;
    badgeColor = 'brand';
  } else if (hasMutualLearn) {
    matchType = 'they_teach_you';
    score = Math.min(50 + (youLearnSkills.length * 8), 75);
    reason = `${peer.name.split(' ')[0]} teaches ${youLearnSkills.join(', ')} that you want to learn`;
    badgeColor = 'emerald';
  } else if (hasMutualTeach) {
    matchType = 'you_teach_them';
    score = Math.min(45 + (youTeachSkills.length * 8), 70);
    reason = `You can mentor ${peer.name.split(' ')[0]} in ${youTeachSkills.join(', ')}`;
    badgeColor = 'sky';
  } else {
    matchType = 'explore';
    score = Math.floor(Math.random() * 15) + 10;
    reason = 'Explore new skills outside your current wishlist';
    badgeColor = 'slate';
  }

  return {
    score,
    matchType,
    isMutualLoop,
    youTeach: youTeachSkills,
    youLearn: youLearnSkills,
    reason,
    badgeColor
  };
};

/**
 * Ranks all peers for the current user based on match score
 */
export const rankSuggestedPeers = (currentUser, peers = []) => {
  if (!currentUser) return peers;
  return peers
    .filter(p => p.id !== currentUser.id)
    .map(peer => ({
      ...peer,
      matchResult: calculateSkillMatch(currentUser, peer)
    }))
    .sort((a, b) => b.matchResult.score - a.matchResult.score);
};
