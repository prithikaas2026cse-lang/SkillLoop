# 🔄 SkillLoop — College Student Peer-to-Peer Skill Exchange

SkillLoop is a peer-to-peer college skill exchange platform built with **React**, **Vite**, **JavaScript**, and **Tailwind CSS**. It connects university students who have different skills and want to learn from each other — without paying tutoring fees or subscription paywalls.

Students trade skills 1-for-1: teach what you already know in exchange for learning what you are passionate about.

---

## 🌟 Special Feature: Reverse Skill Matching Engine

Unlike traditional one-way tutor marketplaces where learning is gated behind hourly cash payments, SkillLoop features a **reciprocal reverse matching engine**:

- **Mutual 2-Way Loop Match (100% Synergy)**:
  - If **Student A** can teach `React.js` and wants to learn `Figma UI/UX`
  - And **Student B** can teach `Figma UI/UX` and wants to learn `React.js`
  - SkillLoop detects the inverted vectors, scores synergy (up to 99%), and highlights a **"Perfect 2-Way Loop"** badge!
- **1-Way Mentorship & Wishlist Matches**: Identifies peers who teach skills on your wishlist or peers who need your specific domain expertise.
- **Synergy Scoring**: Factors in skill overlaps, proficiency tiers (Beginner / Intermediate / Advanced), and shared academic campuses.

---

## 🚀 Key Pages & Features

1. **Home Page (`/`)**:
   - Modern blue-and-white theme with hero section, live reverse matching visualizer, and "Get Started" CTA.
   - Interactive breakdown comparing traditional tutoring vs. reciprocal 2-way skill swapping.
   - 4-step process guide, popular campus skills catalog, and peer testimonials.

2. **Student Registration & Login**:
   - Multi-step registration wizard: Student Profile → Skills You Can Teach → Skills You Want to Learn.
   - Instant demo profile switcher (switch between Alex, Maya, Marcus, David, Sophia, etc. to test reciprocal matching instantly).

3. **Student Dashboard**:
   - Learning stats overview (Peer Rating, Swaps Finished, Active Network, SkillLoop Karma Points).
   - **Reverse Skill Matches for You** with synergy percentages and one-click "Connect & Swap" triggers.
   - Quick schedule manager with next upcoming session details and tips for split-time sessions.

4. **Explore Page**:
   - Search directory by skill name, student name, major, or college.
   - Filter by skill categories (Software, Design, Data & AI, Academics, Business, Creative).
   - **"Perfect 2-Way Loops Only" toggle** to immediately isolate 100% mutual exchanges.

5. **Student Profile**:
   - View and edit bio, college, major, and academic standing.
   - Interactive **"Skills I Can Teach"** manager with endorsement counters and proficiency tags.
   - Interactive **"Skills I Want to Learn"** wishlist manager with priority tags.
   - Peer endorsements and review history.

6. **Connections Hub**:
   - Incoming swap requests (Accept or Decline with reverse match preview).
   - Outgoing pending requests.
   - Active learning partners list with direct links to schedule sessions.

7. **Peer Session Planner**:
   - Schedule 1-on-1 sessions (date, time, duration: 30/45/60/90 mins, campus study room or online video link).
   - Agenda planner and balanced time-split indicator (30 min teaching / 30 min learning).
   - Mark session completed to earn **+30 Karma points**.

8. **Feedback & Rating System**:
   - 5-Star rating system with feedback tags (e.g., *Clear Explanations*, *Super Patient*, *Punctual & Prepared*).
   - Skill endorsements that increment mentors' public endorsement counters.
   - Earn **+20 Karma points** per constructive review submitted.

---

## 📁 Project Structure

```
SkillLoop/
├── index.html                       # HTML template with Google Fonts (Inter & Plus Jakarta Sans)
├── package.json                     # Vite, React 18, Tailwind CSS, Lucide icons
├── vite.config.js                   # Vite configuration (port 3000)
├── tailwind.config.js               # Blue-and-white brand palette & custom soft shadows
├── postcss.config.js                # PostCSS with Tailwind & Autoprefixer
├── src/
│   ├── assets/                      # Static brand assets
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginModal.jsx       # Quick login & one-click demo student switchers
│   │   │   └── RegisterModal.jsx    # 3-step student onboarding wizard
│   │   ├── common/
│   │   │   ├── Navbar.jsx           # Responsive glass header with active notifications & profile pill
│   │   │   ├── Footer.jsx           # Modern footer with safety & privacy guarantees
│   │   │   ├── Modal.jsx            # Accessible reusable modal dialog
│   │   │   ├── Toast.jsx            # Notification toast for user actions
│   │   │   └── ReverseMatchBadge.jsx# Visual 2-way reciprocal match badge & synergy score
│   │   ├── dashboard/
│   │   │   ├── StatsOverview.jsx    # 4-card metric overview
│   │   │   ├── SuggestedMatches.jsx # Ranked reverse matches with instant connect
│   │   │   └── QuickSchedule.jsx    # Upcoming session snapshots & exchange tips
│   │   ├── explore/
│   │   │   ├── StudentCard.jsx      # Individual peer card with skill badges
│   │   │   └── ConnectModal.jsx     # Send exchange proposal modal
│   │   ├── feedback/
│   │   │   └── ReviewModal.jsx      # Star rating and endorsement tag submitter
│   │   ├── home/
│   │   │   ├── HeroSection.jsx      # Value proposition & live interactive preview card
│   │   │   ├── ReverseMatchingExplainer.jsx # Interactive 1-way vs. 2-way comparison
│   │   │   ├── HowItWorks.jsx       # 4-step walkthrough
│   │   │   ├── FeaturedSkills.jsx   # Top campus skills grid
│   │   │   ├── PeerTestimonials.jsx # Real peer stories & mutual swap examples
│   │   │   └── CTASection.jsx       # Final registration banner
│   │   └── sessions/
│   │       └── BookSessionModal.jsx # Schedule study pod or video swap
│   ├── context/
│   │   └── SkillLoopContext.jsx     # Central state & actions with localStorage persistence
│   ├── data/
│   │   ├── initialStudents.js       # 8 diverse fictional college student profiles
│   │   ├── initialConnections.js    # Pre-seeded active & pending requests
│   │   ├── initialSessions.js       # Pre-seeded upcoming & past sessions with reviews
│   │   └── skillsCatalog.js         # Disciplines, categories, and popular skills
│   ├── pages/
│   │   ├── HomePage.jsx             # Landing page
│   │   ├── AuthPage.jsx             # Standalone login/register screen
│   │   ├── DashboardPage.jsx        # Learning hub & reverse match center
│   │   ├── ExplorePage.jsx          # Searchable skill catalog & peer directory
│   │   ├── ProfilePage.jsx          # Editable teaching & wishlist profile
│   │   ├── ConnectionsPage.jsx      # Manage incoming & outgoing requests
│   │   ├── SessionsPage.jsx         # Planner for scheduled & completed sessions
│   │   └── FeedbackPage.jsx         # Reviews and endorsements feed
│   ├── utils/
│   │   └── matchingAlgorithm.js     # Vector matching & synergy scoring logic
│   ├── App.jsx                      # App root router and modal wrapper
│   ├── index.css                    # Tailwind imports & custom glassmorphism styles
│   └── main.jsx                     # React DOM entry point
```

---

## 💻 How to Run the Application

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation & Launch

1. **Open a terminal in the project directory:**
   ```bash
   cd c:\Users\prith\Downloads\SkillLoop
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The application will start at: `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## 🔒 Student Privacy & Safety
- Only educational/academic email addresses are recommended for registration.
- No sensitive student IDs, phone numbers, or private addresses are collected or displayed.
- Sessions emphasize public campus locations (Library study pods, student unions) or verified video meeting links.

---

## 🔮 Future Supabase Integration Roadmap
The project state is structured in `src/context/SkillLoopContext.jsx` with normalized schema shapes (`students`, `connections`, `sessions`, `reviews`), making it a drop-in migration to Supabase tables:
1. `auth.users` for student login/registration.
2. `public.profiles` for major, college, avatar, and bio.
3. `public.skills` with foreign keys for `taught_by` and `wanted_by`.
4. `public.connections` and `public.sessions` with Row Level Security (RLS).
