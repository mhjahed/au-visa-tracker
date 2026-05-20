import { FaGithub, FaGlobe, FaCode, FaHeart, FaReact, FaNodeJs, FaCss3Alt, FaDatabase, FaPython, FaHtml5, FaGitAlt, FaLaptopCode } from 'react-icons/fa'
import { SiVite, SiChartdotjs, SiJavascript, SiNextdotjs, SiTailwindcss, SiCplusplus } from 'react-icons/si'
import styles from './Developer.module.scss'

const DEV = {
  name: 'MH Jahed',
  title: 'Full Stack Developer',
  role: 'Lead Developer',
  tagline: 'Building modern web applications with passion',
  github: 'https://github.com/mhjahed',
  website: 'https://mhjahedportfolio.netlify.app',
  skills: ['React', 'Python', 'C++', 'C', 'C#', 'Next JS', 'JavaScript', 'Node JS', 'Tailwind CSS', 'CSS', 'HTML', 'Git'],
}

const DEV_TECH = [
  { name: 'React', Icon: FaReact, color: '#61DAFB' },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#6B7280' },
  { name: 'Python', Icon: FaPython, color: '#3776AB' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Node.js', Icon: FaNodeJs, color: '#339933' },
  { name: 'C++', Icon: SiCplusplus, color: '#00599C' },
  { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Vite', Icon: SiVite, color: '#646CFF' },
  { name: 'CSS3', Icon: FaCss3Alt, color: '#1572B6' },
  { name: 'HTML5', Icon: FaHtml5, color: '#E34F26' },
  { name: 'Git', Icon: FaGitAlt, color: '#F05032' },
  { name: 'Database', Icon: FaDatabase, color: '#4DB33D' },
]

const PROJECT_TECH = [
  { name: 'React 18', role: 'Core UI Library', icon: 'bxl-react', color: '#61DAFB', desc: 'Component-based architecture' },
  { name: 'Vite', role: 'Build Tool', icon: 'bx-bolt-circle', color: '#646CFF', desc: 'Lightning-fast HMR & bundling' },
  { name: 'SCSS Modules', role: 'Styling System', icon: 'bx-palette', color: '#CC6699', desc: 'Scoped modular stylesheets' },
  { name: 'Bootstrap 5', role: 'Grid & Utilities', icon: 'bx-grid-alt', color: '#7952B3', desc: 'Responsive grid foundation' },
  { name: 'Chart.js', role: 'Data Visualization', icon: 'bx-line-chart', color: '#FF6384', desc: 'Interactive charts & graphs' },
  { name: 'React Router v6', role: 'Client Routing', icon: 'bx-route', color: '#F44250', desc: 'SPA navigation system' },
  { name: 'date-fns', role: 'Date Utilities', icon: 'bx-calendar', color: '#05C46B', desc: 'Lightweight date operations' },
  { name: 'Boxicons', role: 'Icon Library', icon: 'bx-diamond', color: '#FFD369', desc: '1500+ premium icons' },
  { name: 'LocalStorage', role: 'Data Persistence', icon: 'bx-data', color: '#0EA5E9', desc: 'Client-side data storage' },
  { name: 'uuid', role: 'ID Generation', icon: 'bx-hash', color: '#8B5CF6', desc: 'Unique identifier creation' },
]

const FEATURES = [
  { title: 'Visa Application Tracking', desc: 'Complete CRUD operations for managing Subclass 500 student visa applications with real-time status monitoring.', icon: 'bx-file', color: '#3B82F6' },
  { title: 'Interactive Analytics Dashboard', desc: 'Dynamic bar charts, doughnut charts, and line charts with 7/14/30 day trend toggles for deep data insights.', icon: 'bx-bar-chart-alt-2', color: '#10B981' },
  { title: 'Secure Admin Panel', desc: 'Passcode-protected admin area with 5-attempt rate limiting, 10-minute lockout timer, and session management.', icon: 'bx-shield-quarter', color: '#8B5CF6' },
  { title: 'Advanced Data Export/Import', desc: 'Full JSON backup, selective JSON export, and CSV spreadsheet export with one-click import restoration.', icon: 'bx-export', color: '#F59E0B' },
  { title: 'Fully Responsive Design', desc: 'Pixel-perfect layouts from 320px mobile to 2560px ultra-wide with optimized table scrolling.', icon: 'bx-mobile-alt', color: '#EC4899' },
  { title: 'University & Course Analytics', desc: 'Detailed breakdowns by university and course category with success rates, distribution bars, and rankings.', icon: 'bx-buildings', color: '#0D9488' },
  { title: 'Real-time Update Scheduling', desc: 'Last/next update tracking with live blinking indicators, announcements system, and admin-managed scheduling.', icon: 'bx-calendar-event', color: '#0EA5E9' },
  { title: 'Smart Search & Filtering', desc: 'Predictive search suggestions with multi-criteria filtering, status chips, and instant result updates.', icon: 'bx-search-alt', color: '#EF4444' },
]

const PROJECT_STATS = [
  { value: '7+', label: 'Pages', icon: 'bx-file' },
  { value: '50+', label: 'Components', icon: 'bx-package' },
  { value: '15', label: 'Universities', icon: 'bx-buildings' },
  { value: '12+', label: 'Courses', icon: 'bx-book-open' },
  { value: '3', label: 'Chart Types', icon: 'bx-line-chart' },
  { value: '100%', label: 'Frontend', icon: 'bx-code-alt' },
]

const ARCHITECTURE = [
  { label: 'Data Layer', desc: 'JSON files + LocalStorage sync', icon: 'bx-data' },
  { label: 'State Management', desc: 'React hooks + custom useApplicants', icon: 'bx-transfer' },
  { label: 'Routing', desc: 'Lazy-loaded routes with React Router', icon: 'bx-route' },
  { label: 'Styling', desc: 'SCSS Modules with design tokens', icon: 'bx-palette' },
  { label: 'Analytics Engine', desc: 'Custom utility calculations', icon: 'bx-stats' },
  { label: 'Security', desc: 'Rate-limited admin authentication', icon: 'bx-lock-alt' },
]

const CONTRIBUTIONS = [
  'Frontend Development (React + Vite)',
  'UI/UX Design & Responsive Layout',
  'Data Architecture & LocalStorage System',
  'Analytics Engine & Chart Integration',
  'Admin Panel & Authentication',
  'Export/Import System',
]

const Developer = () => {
  return (
    <div className={styles.page}>

      {/* ======================== HERO ======================== */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.c1}></div>
          <div className={styles.c2}></div>
          <div className={styles.c3}></div>
        </div>
        <div className={styles.heroInner}>
          <div className={styles.heroIconWrap}>
            <div className={styles.heroIcon}>
              <FaCode />
            </div>
            <div className={styles.heroRing}></div>
          </div>
          <h1 className={styles.heroTitle}>
            Developer & <span className={styles.heroHighlight}>Architecture</span>
          </h1>
          <p className={styles.heroSub}>
            A comprehensive look at the technology, architecture, and the developer
            behind the Australia Student Visa Tracker.
          </p>
          <div className={styles.heroBadges}>
            {['Production Ready', 'Fully Responsive', 'Analytics Engine', 'Secure Admin'].map((b, i) => (
              <span key={i} className={styles.heroBadge}>
                <i className={`bx ${['bx-check-shield', 'bx-mobile-alt', 'bx-bar-chart-alt-2', 'bx-lock-alt'][i]}`}></i>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.container}>

        {/* ======================== DEVELOPER PROFILE ======================== */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <FaHeart className={styles.heartIcon} />
              Meet The Developer
            </h2>
            <p className={styles.sectionSub}>The person behind this project</p>
          </div>

          <div className={styles.profileCard}>
            <div className={styles.profileGlow}></div>

            {/* Profile Header */}
            <div className={styles.profileHeader}>
              <div className={styles.avatarArea}>
                <div className={styles.avatarRing}>
                  <div className={styles.avatar}>
                    <FaCode className={styles.avatarIcon} />
                  </div>
                </div>
                <div className={styles.roleBadge}>
                  <i className='bx bx-star'></i>
                  {DEV.role}
                </div>
              </div>

              <div className={styles.profileInfo}>
                <h2 className={styles.profileName}>{DEV.name}</h2>
                <p className={styles.profileTitle}>{DEV.title}</p>
                <p className={styles.profileTagline}>{DEV.tagline}</p>

                {/* Social Links */}
                <div className={styles.socialLinks}>
                  <a href={DEV.github} target="_blank" rel="noreferrer" className={styles.socialGithub}>
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                  <a href={DEV.website} target="_blank" rel="noreferrer" className={styles.socialWeb}>
                    <FaGlobe />
                    <span>Portfolio</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className={styles.profileSection}>
              <h3 className={styles.profileSectionTitle}>
                <i className='bx bx-code-block'></i>
                Skills & Technologies
              </h3>
              <div className={styles.skillTags}>
                {DEV.skills.map((s, i) => (
                  <span key={i} className={styles.skillTag}>{s}</span>
                ))}
              </div>
            </div>

            {/* Tech Stack Visual */}
            <div className={styles.profileSection}>
              <h3 className={styles.profileSectionTitle}>
                <i className='bx bx-wrench'></i>
                Tech Stack
              </h3>
              <div className={styles.devTechGrid}>
                {DEV_TECH.map((tech, i) => (
                  <div
                    key={i}
                    className={styles.devTechItem}
                    title={tech.name}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div
                      className={styles.devTechIcon}
                      style={{ color: tech.color }}
                    >
                      <tech.Icon />
                    </div>
                    <span className={styles.devTechName}>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contributions */}
            <div className={styles.profileSection}>
              <h3 className={styles.profileSectionTitle}>
                <FaLaptopCode className={styles.contribTitleIcon} />
                Contributions to This Project
              </h3>
              <div className={styles.contribList}>
                {CONTRIBUTIONS.map((c, i) => (
                  <div key={i} className={styles.contribItem}>
                    <i className='bx bx-check-circle'></i>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================== PROJECT STATS ======================== */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className='bx bx-stats'></i>
              Project at a Glance
            </h2>
          </div>
          <div className={styles.statsGrid}>
            {PROJECT_STATS.map((stat, i) => (
              <div key={stat.label} className={styles.statCard} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className={styles.statIcon}><i className={`bx ${stat.icon}`}></i></div>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================== PROJECT TECH STACK ======================== */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className='bx bx-wrench'></i>
              Project Technology Stack
            </h2>
            <p className={styles.sectionSub}>Tools and libraries powering the application</p>
          </div>
          <div className={styles.techGrid}>
            {PROJECT_TECH.map((tech, i) => (
              <div key={tech.name} className={styles.techCard} style={{ animationDelay: `${i * 0.06}s` }}>
                <div className={styles.techIconWrap} style={{ background: `${tech.color}12`, color: tech.color }}>
                  <i className={`bx ${tech.icon}`}></i>
                </div>
                <div className={styles.techInfo}>
                  <div className={styles.techName}>{tech.name}</div>
                  <div className={styles.techRole}>{tech.role}</div>
                </div>
                <p className={styles.techDesc}>{tech.desc}</p>
                <div className={styles.techBorder} style={{ background: tech.color }}></div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================== ARCHITECTURE ======================== */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className='bx bx-layer'></i>
              System Architecture
            </h2>
            <p className={styles.sectionSub}>How the application is structured internally</p>
          </div>
          <div className={styles.archGrid}>
            {ARCHITECTURE.map((item, i) => (
              <div key={item.label} className={styles.archCard} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className={styles.archStep}>{i + 1}</div>
                <div className={styles.archIcon}><i className={`bx ${item.icon}`}></i></div>
                <h3 className={styles.archLabel}>{item.label}</h3>
                <p className={styles.archDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ======================== FEATURES ======================== */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className='bx bx-star'></i>
              Key Features
            </h2>
            <p className={styles.sectionSub}>Everything built into this platform</p>
          </div>
          <div className={styles.featureGrid}>
            {FEATURES.map((feat, i) => (
              <div key={feat.title} className={styles.featureCard} style={{ animationDelay: `${i * 0.07}s` }}>
                <div className={styles.featureIcon} style={{ background: `${feat.color}12`, color: feat.color }}>
                  <i className={`bx ${feat.icon}`}></i>
                </div>
                <h3 className={styles.featureTitle}>{feat.title}</h3>
                <p className={styles.featureDesc}>{feat.desc}</p>
                <div className={styles.featureBorder} style={{ background: feat.color }}></div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================== FOLDER STRUCTURE ======================== */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className='bx bx-folder-open'></i>
              Project Structure
            </h2>
            <p className={styles.sectionSub}>Professional modular architecture</p>
          </div>
          <div className={styles.structureCard}>
            <pre className={styles.structureCode}>{`src/
├── assets/          → Logos, flags, backgrounds
├── components/      → Reusable UI components
│   ├── common/      → Buttons, badges, search, toast
│   ├── charts/      → Bar, Pie, Line chart wrappers
│   ├── loaders/     → Skeleton & page loaders
│   └── navigation/  → Navbar component
├── data/            → JSON data files
├── hooks/           → useApplicants, useLocalStorage, useAdmin
├── layouts/         → MainLayout wrapper
├── pages/           → 7 page directories
│   ├── Home/        → Hero, stats, charts, table
│   ├── Applications/→ Filter, sort, modal
│   ├── Dashboard/   → Metrics, rankings
│   ├── Statistics/  → University & course tables
│   ├── Settings/    → Export, import, system info
│   ├── Developer/   → This page
│   └── Admin/       → Auth, CRUD management
├── routes/          → Route definitions
├── styles/          → Global SCSS system
└── utils/           → Analytics, export, filter, sort`}</pre>
          </div>
        </section>

        {/* ======================== DESIGN SYSTEM ======================== */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <i className='bx bx-palette'></i>
              Design System
            </h2>
            <p className={styles.sectionSub}>Colors, typography, and visual language</p>
          </div>
          <div className={styles.designGrid}>
            <div className={styles.designCard}>
              <h3 className={styles.designCardTitle}><i className='bx bx-droplet'></i> Color Palette</h3>
              <div className={styles.colorSwatches}>
                {[
                  { label: 'Navy Blue', hex: '#0A2647' },
                  { label: 'Blue', hex: '#144272' },
                  { label: 'Light Blue', hex: '#205295' },
                  { label: 'Gold', hex: '#FFD369', dark: true },
                  { label: 'Granted', hex: '#065F46' },
                  { label: 'Refused', hex: '#991B1B' },
                  { label: 'Process', hex: '#92400E' },
                  { label: 'Background', hex: '#F4F7FA', dark: true },
                ].map((c) => (
                  <div key={c.hex} className={styles.swatch}>
                    <div className={styles.swatchBox} style={{ background: c.hex, color: c.dark ? '#333' : '#fff' }}>
                      {c.hex}
                    </div>
                    <span className={styles.swatchLabel}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.designCard}>
              <h3 className={styles.designCardTitle}><i className='bx bx-font-family'></i> Typography</h3>
              <div className={styles.fontList}>
                {[
                  { name: 'Poppins', role: 'Primary — Headings & UI', family: 'Poppins' },
                  { name: 'Inter', role: 'Secondary — Data & Dates', family: 'Inter' },
                  { name: 'Nunito', role: 'Accent — Decorative', family: 'Nunito' },
                ].map((f) => (
                  <div key={f.name} className={styles.fontItem}>
                    <span className={styles.fontSample} style={{ fontFamily: f.family }}>{f.name}</span>
                    <span className={styles.fontRole}>{f.role}</span>
                  </div>
                ))}
              </div>
              <div className={styles.weightList}>
                {[400, 500, 600, 700, 800].map(w => (
                  <span key={w} className={styles.weightTag} style={{ fontWeight: w }}>
                    {w === 400 ? 'Regular' : w === 500 ? 'Medium' : w === 600 ? 'SemiBold' : w === 700 ? 'Bold' : 'ExtraBold'} {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================== CREDITS ======================== */}
        <section className={styles.section}>
          <div className={styles.creditCard}>
            <div className={styles.creditBg}>
              <div className={styles.cc1}></div>
              <div className={styles.cc2}></div>
            </div>
            <div className={styles.creditContent}>
              <div className={styles.creditFlag}>🇦🇺</div>
              <h2 className={styles.creditTitle}>
                <FaHeart style={{ color: '#F87171' }} />
                Built for Bangladeshi Students
              </h2>
              <p className={styles.creditDesc}>
                This visa tracker was designed and developed to help Bangladeshi students
                monitor and understand the Australian Subclass 500 Student Visa process.
                The entire platform runs on the client side — no backend, no database, no server costs.
              </p>
              <p className={styles.creditVersion}>Version 1.0.0</p>
              <div className={styles.creditActions}>
                <a href={DEV.github} target="_blank" rel="noreferrer" className={styles.githubBtn}>
                  <FaGithub />
                  Star on GitHub
                </a>
                <a href={DEV.website} target="_blank" rel="noreferrer" className={styles.portfolioBtn}>
                  <FaGlobe />
                  Portfolio
                </a>
                <a href="/" className={styles.homeLink}>
                  <i className='bx bx-home'></i>
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Developer