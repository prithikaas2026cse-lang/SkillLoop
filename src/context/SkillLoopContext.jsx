import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_STUDENTS } from '../data/initialStudents';
import { INITIAL_CONNECTIONS } from '../data/initialConnections';
import { INITIAL_SESSIONS, INITIAL_REVIEWS } from '../data/initialSessions';
import { calculateSkillMatch, rankSuggestedPeers } from '../utils/matchingAlgorithm';

const SkillLoopContext = createContext();

export const SkillLoopProvider = ({ children }) => {
  // Load from localStorage or use defaults
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('skillloop_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [currentUserId, setCurrentUserId] = useState(() => {
    return localStorage.getItem('skillloop_currentUser') || 'student-1';
  });

  const [connections, setConnections] = useState(() => {
    const saved = localStorage.getItem('skillloop_connections');
    return saved ? JSON.parse(saved) : INITIAL_CONNECTIONS;
  });

  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('skillloop_sessions');
    return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('skillloop_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [currentPage, setCurrentPage] = useState('home');
  const [toast, setToast] = useState(null);
  const [authModalState, setAuthModalState] = useState(null); // 'login' | 'register' | null

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('skillloop_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('skillloop_currentUser', currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem('skillloop_connections', JSON.stringify(connections));
  }, [connections]);

  useEffect(() => {
    localStorage.setItem('skillloop_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('skillloop_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Toast handler
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast(prev => (prev && prev.id === id ? null : prev));
    }, 4000);
  };

  const currentUser = students.find(s => s.id === currentUserId) || students[0];

  // Ranked peers using Reverse Skill Matching
  const rankedPeers = rankSuggestedPeers(currentUser, students);

  // Send learning/connection request
  const sendConnectionRequest = (targetStudentId, note = '') => {
    const existing = connections.find(
      c => (c.fromStudentId === currentUserId && c.toStudentId === targetStudentId) ||
           (c.fromStudentId === targetStudentId && c.toStudentId === currentUserId)
    );

    if (existing) {
      showToast('You already have a connection or pending request with this peer.', 'info');
      return;
    }

    const peer = students.find(s => s.id === targetStudentId);
    const match = calculateSkillMatch(currentUser, peer);

    const newConn = {
      id: `conn-${Date.now()}`,
      fromStudentId: currentUserId,
      toStudentId: targetStudentId,
      status: 'pending',
      initiatedAt: new Date().toISOString(),
      note: note || `Hi ${peer.name.split(' ')[0]}, I found you on SkillLoop and would love to exchange skills!`,
      mutualSkills: {
        theyTeach: match.youLearn[0] || peer.teachSkills[0]?.name || 'Skill Exchange',
        youTeach: match.youTeach[0] || currentUser.teachSkills[0]?.name || 'Skill Exchange'
      }
    };

    setConnections(prev => [newConn, ...prev]);
    showToast(`Exchange request sent to ${peer.name}!`, 'success');
  };

  // Accept connection request
  const acceptConnectionRequest = (connectionId) => {
    setConnections(prev =>
      prev.map(c => c.id === connectionId ? { ...c, status: 'accepted' } : c)
    );
    const conn = connections.find(c => c.id === connectionId);
    const otherId = conn.fromStudentId === currentUserId ? conn.toStudentId : conn.fromStudentId;
    const peer = students.find(s => s.id === otherId);
    showToast(`You are now connected with ${peer?.name || 'peer'}! Ready to schedule sessions.`, 'success');
  };

  // Decline connection request
  const declineConnectionRequest = (connectionId) => {
    setConnections(prev => prev.filter(c => c.id !== connectionId));
    showToast('Connection request removed.', 'info');
  };

  // Book a session
  const bookSession = (sessionData) => {
    const newSession = {
      id: `session-${Date.now()}`,
      peerId: sessionData.peerId,
      title: sessionData.title,
      date: sessionData.date,
      time: sessionData.time,
      durationMinutes: parseInt(sessionData.durationMinutes) || 60,
      format: sessionData.format || 'Online Video Call',
      location: sessionData.location || 'Campus / Google Meet',
      meetingLink: sessionData.meetingLink || `https://meet.skillloop.college/room-${Math.floor(Math.random() * 8999 + 1000)}`,
      status: 'confirmed',
      notes: sessionData.notes || '',
      skillExchange: {
        teach: sessionData.teachSkill || currentUser.teachSkills[0]?.name,
        learn: sessionData.learnSkill || 'Peer Learning'
      }
    };

    setSessions(prev => [newSession, ...prev]);
    showToast('Peer learning session booked successfully!', 'success');
  };

  // Mark session complete
  const completeSession = (sessionId) => {
    setSessions(prev =>
      prev.map(s => s.id === sessionId ? { ...s, status: 'completed' } : s)
    );
    // Add karma points for current user
    setStudents(prev =>
      prev.map(s => s.id === currentUserId ? {
        ...s,
        sessionsCompleted: (s.sessionsCompleted || 0) + 1,
        karmaPoints: (s.karmaPoints || 0) + 30
      } : s)
    );
    showToast('Session marked as completed! You earned +30 SkillLoop Karma points.', 'success');
  };

  // Submit review & rating
  const submitReview = (reviewData) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      authorId: currentUserId,
      targetId: reviewData.targetId,
      rating: reviewData.rating,
      date: 'Just now',
      skillReviewed: reviewData.skillReviewed || 'Peer Exchange',
      tags: reviewData.tags || ['Helpful Peer'],
      comment: reviewData.comment
    };

    setReviews(prev => [newReview, ...prev]);

    // Update target student's rating and review count
    setStudents(prev =>
      prev.map(s => {
        if (s.id === reviewData.targetId) {
          const oldTotal = (s.rating || 5.0) * (s.reviewCount || 1);
          const newCount = (s.reviewCount || 0) + 1;
          const newRating = parseFloat(((oldTotal + reviewData.rating) / newCount).toFixed(2));
          return {
            ...s,
            rating: Math.min(newRating, 5.0),
            reviewCount: newCount,
            karmaPoints: (s.karmaPoints || 0) + 20
          };
        }
        return s;
      })
    );

    // If linked to a session, mark feedbackGiven
    if (reviewData.sessionId) {
      setSessions(prev =>
        prev.map(sess => sess.id === reviewData.sessionId ? {
          ...sess,
          feedbackGiven: newReview
        } : sess)
      );
    }

    showToast('Thank you for rating your peer! Feedback recorded.', 'success');
  };

  // Profile update
  const updateProfile = (updatedFields) => {
    setStudents(prev =>
      prev.map(s => s.id === currentUserId ? { ...s, ...updatedFields } : s)
    );
    showToast('Profile updated successfully!', 'success');
  };

  // Add skill to teach
  const addTeachSkill = (skill) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id === currentUserId) {
          const exists = s.teachSkills.some(item => item.name.toLowerCase() === skill.name.toLowerCase());
          if (exists) return s;
          return {
            ...s,
            teachSkills: [...s.teachSkills, { ...skill, endorsements: 0 }]
          };
        }
        return s;
      })
    );
    showToast(`Added "${skill.name}" to your teaching skills!`, 'success');
  };

  // Remove skill to teach
  const removeTeachSkill = (skillName) => {
    setStudents(prev =>
      prev.map(s => s.id === currentUserId ? {
        ...s,
        teachSkills: s.teachSkills.filter(sk => sk.name !== skillName)
      } : s)
    );
    showToast(`Removed "${skillName}"`, 'info');
  };

  // Add skill to learn
  const addLearnSkill = (skill) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id === currentUserId) {
          const exists = s.learnSkills.some(item => item.name.toLowerCase() === skill.name.toLowerCase());
          if (exists) return s;
          return {
            ...s,
            learnSkills: [...s.learnSkills, skill]
          };
        }
        return s;
      })
    );
    showToast(`Added "${skill.name}" to your wishlist!`, 'success');
  };

  // Remove skill to learn
  const removeLearnSkill = (skillName) => {
    setStudents(prev =>
      prev.map(s => s.id === currentUserId ? {
        ...s,
        learnSkills: s.learnSkills.filter(sk => sk.name !== skillName)
      } : s)
    );
    showToast(`Removed "${skillName}" from wishlist`, 'info');
  };

  // Switch active user (super useful for testing and demonstrations!)
  const switchUser = (studentId) => {
    setCurrentUserId(studentId);
    const target = students.find(s => s.id === studentId);
    showToast(`Switched view to student: ${target?.name}`, 'info');
  };

  // Simple Register
  const registerUser = (userData) => {
    const newStudent = {
      id: `student-${Date.now()}`,
      name: userData.name,
      avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`,
      college: userData.college || 'Pacific Coast University',
      major: userData.major || 'Undeclared',
      year: userData.year || 'Sophomore',
      bio: userData.bio || 'New student joining SkillLoop to exchange knowledge!',
      rating: 5.0,
      reviewCount: 0,
      sessionsCompleted: 0,
      karmaPoints: 100,
      availability: userData.availability || ['Weekdays Flexible'],
      teachSkills: userData.teachSkills || [
        { name: 'Python Basics', category: 'coding', level: 'Beginner', endorsements: 0 }
      ],
      learnSkills: userData.learnSkills || [
        { name: 'React.js', category: 'coding', priority: 'High', currentLevel: 'Beginner' }
      ]
    };

    setStudents(prev => [newStudent, ...prev]);
    setCurrentUserId(newStudent.id);
    setAuthModalState(null);
    setCurrentPage('dashboard');
    showToast(`Welcome to SkillLoop, ${newStudent.name}! Your account is active.`, 'success');
  };

  // Simple Login
  const loginUser = (email) => {
    // If email contains a known student first name, pick them, otherwise keep current or student-1
    const match = students.find(s => s.name.toLowerCase().includes(email.split('@')[0].toLowerCase()));
    const targetId = match ? match.id : 'student-1';
    setCurrentUserId(targetId);
    setAuthModalState(null);
    setCurrentPage('dashboard');
    const u = students.find(s => s.id === targetId);
    showToast(`Welcome back, ${u?.name || 'Student'}!`, 'success');
  };

  return (
    <SkillLoopContext.Provider
      value={{
        currentUser,
        currentUserId,
        students,
        connections,
        sessions,
        reviews,
        rankedPeers,
        currentPage,
        setCurrentPage,
        toast,
        showToast,
        authModalState,
        setAuthModalState,
        sendConnectionRequest,
        acceptConnectionRequest,
        declineConnectionRequest,
        bookSession,
        completeSession,
        submitReview,
        updateProfile,
        addTeachSkill,
        removeTeachSkill,
        addLearnSkill,
        removeLearnSkill,
        switchUser,
        registerUser,
        loginUser
      }}
    >
      {children}
    </SkillLoopContext.Provider>
  );
};

export const useSkillLoop = () => useContext(SkillLoopContext);
