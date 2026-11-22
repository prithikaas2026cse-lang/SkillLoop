export const INITIAL_SESSIONS = [
  {
    id: 'session-101',
    peerId: 'student-2', // Maya Patel
    title: 'Figma Auto-Layout & Component Variants to React Props',
    date: '2026-11-24',
    time: '16:00',
    durationMinutes: 60,
    format: 'Hybrid (Campus Library & Video Link)',
    location: 'Campus Hub 3rd Floor - Study Pod B',
    meetingLink: 'https://meet.skillloop.college/session-101',
    status: 'confirmed',
    notes: 'First 30 mins: Maya walks through responsive Figma frames. Second 30 mins: Alex demonstrates converting them into reusable React components.',
    skillExchange: {
      teach: 'React.js',
      learn: 'Figma UI/UX'
    }
  },
  {
    id: 'session-102',
    peerId: 'student-3', // Marcus Chen
    title: 'Machine Learning Basics: Linear Regression Intuition',
    date: '2026-11-26',
    time: '17:30',
    durationMinutes: 45,
    format: 'Online Video Call',
    location: 'Discord / Google Meet',
    meetingLink: 'https://meet.skillloop.college/session-102',
    status: 'confirmed',
    notes: 'Marcus explaining cost functions and gradient descent with interactive Jupyter notebook.',
    skillExchange: {
      teach: 'React.js State Management',
      learn: 'Machine Learning'
    }
  },
  {
    id: 'session-103',
    peerId: 'student-8', // Liam O\'Connor
    title: 'Building a Fast Music Portfolio on GitHub Pages',
    date: '2026-11-17',
    time: '14:00',
    durationMinutes: 60,
    format: 'Campus Coffee Shop',
    location: 'Brewed Awakenings Cafe',
    meetingLink: '',
    status: 'completed',
    notes: 'Configured Vite + GitHub Pages repo for Liam\'s audio tracks.',
    skillExchange: {
      teach: 'React.js & Deployment',
      learn: 'Acoustic Guitar Basics'
    },
    feedbackGiven: {
      rating: 5,
      tags: ['Super Patient', 'Great Listener', 'Quick Learner'],
      comment: 'Liam was super receptive and picked up the Git workflow in under 20 minutes! Also taught me awesome fingerstyle chord voicings.'
    }
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    authorId: 'student-2', // Maya Patel
    targetId: 'student-1', // Alex Rivera
    rating: 5,
    date: '1 week ago',
    skillReviewed: 'React.js',
    tags: ['Patient Mentor', 'Clear Explanations', 'Punctual'],
    comment: 'Alex was amazing at explaining React state without overwhelming jargon. He related state hooks directly to Figma component variants, which made it click immediately for me!'
  },
  {
    id: 'rev-2',
    authorId: 'student-8', // Liam O\'Connor
    targetId: 'student-1', // Alex Rivera
    rating: 5,
    date: '3 days ago',
    skillReviewed: 'Web Portfolio',
    tags: ['Super Helpful', 'Practical Real-World Tips'],
    comment: 'Helped me launch my audio portfolio on GitHub Pages in one afternoon. Extremely polite, focused, and answered all my silly beginner questions!'
  },
  {
    id: 'rev-3',
    authorId: 'student-1', // Alex Rivera
    targetId: 'student-2', // Maya Patel
    rating: 5,
    date: '2 weeks ago',
    skillReviewed: 'Figma UI/UX',
    tags: ['Design Wizard', 'Inspiring Teacher'],
    comment: 'Maya taught me auto-layout shortcuts that saved me hours of frustration. 10/10 peer exchange experience!'
  }
];
