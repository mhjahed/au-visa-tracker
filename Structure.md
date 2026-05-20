src/assets/logos/
  ├── uom.png          ← University of Melbourne
  ├── usyd.png         ← University of Sydney
  ├── monash.png       ← Monash University
  ├── uq.png           ← University of Queensland
  ├── unsw.png         ← UNSW Sydney
  ├── rmit.png         ← RMIT University
  ├── uadl.png         ← University of Adelaide
  ├── uwa.png          ← University of Western Australia
  ├── mqu.png          ← Macquarie University
  ├── deakin.png       ← Deakin University
  ├── uts.png          ← University of Technology Sydney
  ├── griffith.png     ← Griffith University
  ├── cqu.png          ← CQUniversity
  ├── scu.png          ← Southern Cross University
  └── acu.png          ← Australian Catholic University

src/assets/flags/
  └── bd.png           ← Bangladesh flag (optional)

src/assets/backgrounds/
  └── hero-bg.png      ← Hero background (optional)

src/
├── pages/
│   └── Home/
│       ├── Home.jsx                          ← Main page
│       ├── Home.module.scss                  ← Page styles
│       └── sections/
│           ├── HeroSection.jsx
│           ├── HeroSection.module.scss
│           ├── SummaryCards.jsx
│           ├── SummaryCards.module.scss
│           ├── UpdateCards.jsx
│           ├── UpdateCards.module.scss
│           ├── UniversityGrid.jsx
│           ├── UniversityGrid.module.scss
│           ├── RecentTable.jsx
│           ├── RecentTable.module.scss
│           └── HomeCharts.jsx
│           └── HomeCharts.module.scss
├── components/
│   ├── common/
│   │   ├── StatusBadge.jsx
│   │   ├── StatusBadge.module.scss
│   │   └── SearchBar.jsx
│   │   └── SearchBar.module.scss
│   └── charts/
│       ├── BarChart.jsx
│       ├── PieChart.jsx
│       └── LineChart.jsx



src/
├── pages/
│   ├── Settings/
│   │   ├── Settings.jsx
│   │   ├── Settings.module.scss
│   │   └── sections/
│   │       ├── ExportSection.jsx
│   │       ├── ExportSection.module.scss
│   │       ├── SystemInfo.jsx
│   │       ├── SystemInfo.module.scss
│   │       └── DangerZone.jsx
│   │       └── DangerZone.module.scss
│   ├── Developer/
│   │   ├── Developer.jsx
│   │   └── Developer.module.scss
│   └── Admin/
│       ├── Admin.jsx
│       ├── Admin.module.scss
│       ├── AdminAuth.jsx
│       ├── AdminAuth.module.scss
│       ├── AdminLayout.jsx
│       ├── AdminLayout.module.scss
│       └── sections/
│           ├── AddApplicant.jsx
│           ├── AddApplicant.module.scss
│           ├── ManageApplicants.jsx
│           ├── ManageApplicants.module.scss
│           ├── ManageUniversities.jsx
│           ├── ManageUniversities.module.scss
│           ├── ManageCourses.jsx
│           ├── ManageCourses.module.scss
│           └── ManageUpdates.jsx
│           └── ManageUpdates.module.scss
├── hooks/
│   └── useAdmin.js
└── utils/
    └── adminHelpers.js