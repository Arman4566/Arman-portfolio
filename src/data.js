export const links = {
  email: 'armanahmad15368@gmail.com',
  github: 'https://github.com/Arman4566',
  linkedin: 'https://www.linkedin.com/in/arman-ahamad-b96413318/',
  hackerrank: 'https://www.hackerrank.com/profile/armanahmad15368',
  resume: '/ArmanAhamadResume.pdf',
};

export const facts = [
  ['Studying', 'BCA at MIET Kumaon, 2025 to 2028'],
  ['Led', 'Team Strawhats at HackIndia Spark 10'],
  ['Earned', "NCC 'A' Certificate"],
  ['Based in', 'Haldwani, Uttarakhand'],
];

export const featured = [
  {
    id: 'sathi',
    name: 'My Sathi',
    kind: 'Patient care companion',
    summary:
      'A health companion for patients. It reads prescriptions and reports with the phone camera, remembers the patient’s context on the device, and rings medicine and emergency alarms.',
    points: [
      'On-device OCR with Google ML Kit, then Gemini 1.5 Flash turns the text into structured data.',
      'A Node.js proxy server keeps API keys and patient requests out of the app.',
      'Local SQLite memory gives the companion context for every answer.',
      'A Python AI service handles X-ray analysis.',
    ],
    tech: ['Flutter', 'Dart', 'Node.js', 'Gemini API', 'SQLite', 'Google ML Kit', 'Python'],
  },
  {
    id: 'buddy',
    name: 'My Buddy',
    kind: 'Study pack from a photo',
    summary:
      'Snap a textbook page or type a topic and get notes, Q&A, flashcards, a quiz and YouTube videos. Built so a student can go from a blurry photo to revision in under a minute.',
    points: [
      'Tesseract.js reads the photo in the browser; SerpApi Google Lens identifies pictures with no text.',
      'Flip flashcards, a quiz with streaks and confetti, XP levels and a daily study streak.',
      'Express server caches packs in PostgreSQL for 7 days and rate-limits paid searches.',
      'Per-page SEO, JSON-LD, sitemap and shareable topic pages.',
    ],
    tech: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'Tesseract.js', 'SerpApi'],
  },
];

export const more = [
  {
    name: 'College Management System',
    kind: 'Web application',
    text: 'A responsive platform for academic records, student profiles and day-to-day college operations, with Node.js and Express REST APIs over a relational SQL schema.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'SQL'],
  },
  {
    name: 'My Eyes',
    kind: 'Accessibility app',
    text: 'A voice-driven Flutter app for visually impaired users: speech-to-text commands, spoken feedback with flutter_tts, GPS location alerts and a camera tool.',
    tech: ['Flutter', 'Dart', 'Speech-to-Text', 'Geolocator', 'Camera'],
  },
];

export const skillGroups = [
  ['Languages', ['C', 'Java', 'Python', 'JavaScript', 'Dart', 'SQL', 'Prolog']],
  ['Mobile and web', ['Flutter', 'React', 'Node.js', 'Express', 'HTML', 'CSS']],
  ['Data and tools', ['MySQL', 'PostgreSQL', 'SQLite', 'Git', 'GitHub', 'VS Code']],
  ['Computer science', ['Data Structures', 'Algorithms', 'Operating Systems', 'Networks', 'DBMS']],
];

export const globeWords = [
  'Flutter', 'Dart', 'React', 'Node.js', 'Express', 'Python', 'Java', 'C',
  'JavaScript', 'SQL', 'PostgreSQL', 'MySQL', 'SQLite', 'Git', 'GitHub',
  'Gemini API', 'ML Kit', 'OCR', 'DSA', 'DBMS', 'OS', 'Networks', 'Prolog',
  'HTML', 'CSS', 'REST',
];

export const education = [
  {
    when: '2025 to 2028 (expected)',
    title: 'Bachelor of Computer Applications',
    place: 'MIET Kumaon, Haldwani',
  },
  {
    when: 'Jun 2024 to Aug 2025',
    title: 'Master Diploma in Computer Information and System Management',
    place: 'Annex Computer Centre (Om Sai Society of Information and Technology), Haldwani',
  },
  {
    when: 'Apr 2024 to Mar 2025',
    title: 'Intermediate (12th grade)',
    place: 'Kendriya Vidyalaya Sangathan, Haldwani',
  },
  {
    when: 'Apr 2022 to Mar 2023',
    title: 'High School (10th grade)',
    place: 'Kendriya Vidyalaya Sangathan, Haldwani',
  },
];

export const certs = [
  { when: 'Aug 2026', title: 'SQL (Basic)', issuer: 'HackerRank' },
  { when: 'Feb 2026', title: 'Fundamentals of Computer Systems', issuer: 'SWAYAM, MHRD' },
  { when: 'Jan 2026', title: 'Artificial Intelligence Using Prolog', issuer: 'SWAYAM, MHRD' },
];
