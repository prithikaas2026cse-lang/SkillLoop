export const INITIAL_CONNECTIONS = [
  {
    id: 'conn-1',
    fromStudentId: 'student-2', // Maya Patel
    toStudentId: 'student-1',   // Alex Rivera (Current User)
    status: 'accepted',
    initiatedAt: '2026-11-18T10:30:00Z',
    note: 'Hey Alex! I saw you build clean React apps. I teach Figma design systems and would love a mutual skill swap!',
    mutualSkills: {
      theyTeach: 'Figma UI/UX',
      youTeach: 'React.js'
    }
  },
  {
    id: 'conn-2',
    fromStudentId: 'student-1', // Alex Rivera
    toStudentId: 'student-3',   // Marcus Chen
    status: 'accepted',
    initiatedAt: '2026-11-19T14:15:00Z',
    note: 'Hi Marcus! Would love to learn the intuition behind machine learning models. Happy to help you with modern React frontends!',
    mutualSkills: {
      theyTeach: 'Machine Learning',
      youTeach: 'React.js'
    }
  },
  {
    id: 'conn-3',
    fromStudentId: 'student-5', // David Kim
    toStudentId: 'student-1',   // Alex Rivera
    status: 'pending',
    initiatedAt: '2026-11-21T09:00:00Z',
    note: 'Hey Alex! Prepping for summer internships. Could exchange tech mock interviews for tips on responsive CSS.',
    mutualSkills: {
      theyTeach: 'Tech Interview Prep',
      youTeach: 'CSS & Tailwind'
    }
  },
  {
    id: 'conn-4',
    fromStudentId: 'student-1', // Alex Rivera
    toStudentId: 'student-4',   // Sophia Rodriguez
    status: 'pending',
    initiatedAt: '2026-11-20T16:45:00Z',
    note: 'Hola Sophia! I am planning a study abroad trip next semester and would love conversational Spanish practice.',
    mutualSkills: {
      theyTeach: 'Conversational Spanish',
      youTeach: 'React.js / Web Basics'
    }
  }
];
