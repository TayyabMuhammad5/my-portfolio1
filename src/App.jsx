import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #050a0e;
    --bg2: #0b1117;
    --bg3: #111820;
    --surface: #131c24;
    --surface2: #1a2530;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --text: #e8f0f7;
    --muted: #6b8a9e;
    --muted2: #4a6478;
    --cyan: #00d4ff;
    --cyan2: #00b8db;
    --cyan-dim: rgba(0,212,255,0.12);
    --cyan-glow: rgba(0,212,255,0.25);
    --green: #00e5a0;
    --green-dim: rgba(0,229,160,0.1);
    --amber: #ffb84d;
    --amber-dim: rgba(255,184,77,0.1);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    overflow-x: hidden;
  }

  ::selection { background: var(--cyan-dim); color: var(--cyan); }

  /* scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--surface2); border-radius: 2px; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 clamp(1.5rem, 5vw, 4rem);
    height: 64px;
    background: rgba(5,10,14,0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    transition: all 0.3s;
  }

  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.1rem;
    letter-spacing: 0.05em;
    color: var(--cyan);
  }

  .nav-links { display: flex; gap: 2.5rem; }
  .nav-links a {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--muted);
    text-decoration: none;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: color 0.2s;
    position: relative;
  }
  .nav-links a::after {
    content: '';
    position: absolute; bottom: -4px; left: 0; right: 0; height: 1px;
    background: var(--cyan);
    transform: scaleX(0);
    transition: transform 0.3s;
    transform-origin: left;
  }
  .nav-links a:hover { color: var(--text); }
  .nav-links a:hover::after { transform: scaleX(1); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center;
    justify-content: center; /* Added to center horizontally */
    text-align: center; /* Added to center text */
    padding: 6rem clamp(1.5rem, 5vw, 4rem) 4rem;
    position: relative;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 60% 60% at 70% 50%, rgba(0,212,255,0.04) 0%, transparent 70%),
                radial-gradient(ellipse 40% 40% at 20% 80%, rgba(0,229,160,0.03) 0%, transparent 60%);
  }

  .hero-grid {
    position: absolute; inset: 0; pointer-events: none; opacity: 0.03;
    background-image: linear-gradient(var(--border2) 1px, transparent 1px),
                      linear-gradient(90deg, var(--border2) 1px, transparent 1px);
    background-size: 60px 60px;
  }

 .hero-content { 
    position: relative; 
    max-width: 780px; 
    display: flex;
    flex-direction: column;
    align-items: center; /* Added to center the badge and text blocks */
  }

  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.4rem 1rem;
    border: 1px solid var(--cyan-dim);
    border-radius: 100px;
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--cyan);
    margin-bottom: 1.5rem;
    background: rgba(0,212,255,0.05);
    animation: fadeUp 0.6s ease both;
  }

  .hero-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--cyan);
    animation: pulse 2s ease infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(3rem, 7vw, 5.5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin-bottom: 0.3em;
    animation: fadeUp 0.6s 0.1s ease both;
  }

  .hero h1 .name { color: var(--cyan); }

  .hero-sub {
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    color: var(--muted);
    font-weight: 300;
    margin-bottom: 1.5rem;
    animation: fadeUp 0.6s 0.2s ease both;
  }

  .hero-sub strong { color: var(--text); font-weight: 500; }

  .hero-desc {
    font-size: 1rem;
    color: var(--muted);
    max-width: 560px;
    line-height: 1.8;
    margin-bottom: 2.5rem;
    animation: fadeUp 0.6s 0.3s ease both;
  }

  .hero-actions {
    display: flex; gap: 1rem; flex-wrap: wrap;
    animation: fadeUp 0.6s 0.4s ease both;
  }

  .hero-stats {
    display: flex; gap: 2.5rem; margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
    animation: fadeUp 0.6s 0.5s ease both;
  }

  .stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: var(--cyan);
    line-height: 1;
  }

  .stat-label { font-size: 0.8rem; color: var(--muted); margin-top: 0.25rem; text-transform: uppercase; letter-spacing: 0.05em; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* BUTTONS */
  .btn {
    padding: 0.75rem 1.75rem;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    border: none;
    transition: all 0.25s;
    letter-spacing: 0.02em;
    display: inline-flex; align-items: center; gap: 0.5rem;
  }

  .btn-cyan {
    background: var(--cyan);
    color: #050a0e;
    font-weight: 600;
  }
  .btn-cyan:hover { background: var(--cyan2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,212,255,0.25); }

  .btn-ghost {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border2);
  }
  .btn-ghost:hover { border-color: var(--cyan); color: var(--cyan); transform: translateY(-2px); }

  /* SECTION */
  section { padding: 5rem clamp(1.5rem, 5vw, 4rem); }
  .section-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--cyan);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 3rem;
    line-height: 1.1;
  }

  /* SKILLS */
  .skills-section { background: var(--bg2); }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1px;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .skill-group {
    background: var(--surface);
    padding: 1.5rem;
    transition: background 0.25s;
  }
  .skill-group:hover { background: var(--surface2); }

  .skill-group-icon {
    font-size: 1.4rem;
    margin-bottom: 0.75rem;
  }

  .skill-group-name {
    font-family: 'Syne', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    margin-bottom: 0.75rem;
  }

  .skill-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }

  .skill-tag {
    font-size: 0.78rem;
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
    background: var(--bg3);
    color: var(--muted);
    border: 1px solid var(--border);
    transition: all 0.2s;
  }
  .skill-tag:hover { border-color: var(--cyan); color: var(--cyan); background: var(--cyan-dim); }

  .skill-tag.hot { color: var(--cyan); border-color: rgba(0,212,255,0.2); background: var(--cyan-dim); }

  /* EXPERIENCE */
  .timeline { position: relative; padding-left: 1.5rem; }
  .timeline::before {
    content: '';
    position: absolute; left: 0; top: 8px; bottom: 0;
    width: 1px; background: var(--border2);
  }

  .timeline-item {
    position: relative;
    padding-bottom: 2.5rem;
  }
  .timeline-item::before {
    content: '';
    position: absolute; left: -1.5rem; top: 8px;
    width: 9px; height: 9px; border-radius: 50%;
    background: var(--cyan);
    box-shadow: 0 0 0 3px var(--bg), 0 0 0 4px rgba(0,212,255,0.3);
    margin-left: -4px;
  }

  .timeline-role {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
  }

  .timeline-company {
    font-size: 0.9rem;
    color: var(--cyan);
    font-weight: 500;
    margin: 0.15rem 0;
  }

  .timeline-meta {
    font-size: 0.8rem;
    color: var(--muted2);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
  }

  .timeline-bullets { list-style: none; }
  .timeline-bullets li {
    font-size: 0.9rem;
    color: var(--muted);
    line-height: 1.7;
    padding-left: 1rem;
    position: relative;
    margin-bottom: 0.3rem;
  }
  .timeline-bullets li::before {
    content: '→';
    position: absolute; left: 0;
    color: var(--cyan);
    font-size: 0.75rem;
    top: 0.15em;
  }

  /* PROJECTS */
  .projects-section { background: var(--bg2); }

  .project-tabs {
    display: flex; gap: 0.5rem;
    margin-bottom: 2.5rem;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0;
  }

  .project-tab {
    padding: 0.6rem 1.25rem;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--muted);
    background: none;
    border: none;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: all 0.2s;
    letter-spacing: 0.03em;
  }
  .project-tab:hover { color: var(--text); }
  .project-tab.active { color: var(--cyan); border-bottom-color: var(--cyan); }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }

  .project-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1.5rem;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
  }
  .project-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--cyan), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .project-card:hover {
    border-color: var(--border2);
    background: var(--surface2);
    transform: translateY(-3px);
  }
  .project-card:hover::before { opacity: 1; }

  .card-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }

  .card-title {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text);
    line-height: 1.3;
  }

  .card-arrow {
    color: var(--muted2);
    font-size: 1rem;
    flex-shrink: 0;
    transition: all 0.2s;
  }
  .project-card:hover .card-arrow { color: var(--cyan); transform: translate(2px, -2px); }

  .card-desc {
    font-size: 0.875rem;
    color: var(--muted);
    line-height: 1.7;
    flex: 1;
  }

  .card-tech { display: flex; flex-wrap: wrap; gap: 0.35rem; }
  .tech-pill {
    font-size: 0.72rem;
    padding: 0.2rem 0.55rem;
    border-radius: 3px;
    background: var(--bg3);
    color: var(--muted);
    border: 1px solid var(--border);
    font-weight: 500;
    letter-spacing: 0.02em;
  }
  .tech-pill.primary { color: var(--cyan); border-color: rgba(0,212,255,0.2); background: var(--cyan-dim); }

  /* EDUCATION */
  .edu-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1.75rem;
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    transition: border-color 0.25s;
    margin-bottom: 1rem;
  }
  .edu-card:hover { border-color: var(--border2); }

  .edu-icon {
    width: 48px; height: 48px;
    border-radius: 10px;
    background: var(--cyan-dim);
    border: 1px solid rgba(0,212,255,0.15);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.3rem;
    flex-shrink: 0;
  }

  .edu-degree {
    font-family: 'Syne', sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.2rem;
  }

  .edu-inst { color: var(--cyan); font-size: 0.9rem; font-weight: 500; margin-bottom: 0.2rem; }
  .edu-meta { font-size: 0.8rem; color: var(--muted2); margin-bottom: 0.5rem; }
  .edu-desc { font-size: 0.875rem; color: var(--muted); line-height: 1.7; }

  .cgpa-badge {
    display: inline-flex;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    background: var(--green-dim);
    color: var(--green);
    font-size: 0.78rem;
    font-weight: 600;
    border: 1px solid rgba(0,229,160,0.15);
    margin-left: 0.5rem;
  }

  /* CERTS */
  .certs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }

  .cert-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.25rem;
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    transition: all 0.25s;
  }
  .cert-card:hover { border-color: var(--border2); background: var(--surface2); }

  .cert-dot {
    width: 8px; height: 8px; border-radius: 50%;
    margin-top: 0.4rem; flex-shrink: 0;
  }

  .cert-title {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 0.2rem;
    line-height: 1.35;
  }

  .cert-issuer { font-size: 0.78rem; color: var(--muted2); }

  /* CONTACT */
  .contact-section { text-align: center; }

  .contact-card {
    max-width: 640px;
    margin: 0 auto;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 3rem 2.5rem;
  }

  .contact-heading {
    font-family: 'Syne', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  .contact-desc { color: var(--muted); font-size: 1rem; margin-bottom: 2rem; line-height: 1.8; }

  .contact-links { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }

  .contact-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    border: none;
    transition: all 0.25s;
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-family: inherit;
  }

  .cb-email { background: var(--cyan); color: #050a0e; font-weight: 600; }
  .cb-email:hover { background: var(--cyan2); transform: translateY(-2px); }
  .cb-github { background: var(--surface2); color: var(--text); border: 1px solid var(--border2); }
  .cb-github:hover { border-color: var(--text); transform: translateY(-2px); }
  .cb-linkedin { background: rgba(10,102,194,0.15); color: #4da6ff; border: 1px solid rgba(10,102,194,0.25); }
  .cb-linkedin:hover { background: rgba(10,102,194,0.25); transform: translateY(-2px); }

  /* FOOTER */
  footer {
    text-align: center;
    padding: 2rem;
    border-top: 1px solid var(--border);
    font-size: 0.8rem;
    color: var(--muted2);
    letter-spacing: 0.05em;
  }

  /* FADE IN on scroll */
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .reveal.visible { opacity: 1; transform: none; }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hero h1 { font-size: 2.5rem; }
    .hero-stats { gap: 1.5rem; flex-wrap: wrap; }
    .projects-grid { grid-template-columns: 1fr; }
    .edu-card { flex-direction: column; }
  }
`;

const skills = [
  {
    icon: "🧠",
    name: "ML / AI",
    tags: ["PyTorch", "Scikit-learn", "HuggingFace", "Transfer Learning", "NLP", "Computer Vision", "FCN", "ResNet", "LLM Function Calling"],
    hot: ["PyTorch", "HuggingFace", "LLM Function Calling"],
  },
  {
    icon: "💻",
    name: "Languages",
    tags: ["Python", "JavaScript", "C++", "Java", "SQL", "TypeScript"],
    hot: ["Python", "JavaScript"],
  },
  {
    icon: "🌐",
    name: "Web / Backend",
    tags: ["Node.js", "Fast API", "Express.js", "Next.js", "React", "Prisma ORM", "MySQL", "MongoDB", "REST APIs", "MERN Stack"],
    hot: ["Next.js", "Node.js"],
  },
  {
    icon: "🐳",
    name: "DevOps / Cloud",
    tags: ["Docker", "Kubernetes", "Jenkins", "Grafana", "IBM Cloud", "Git", "GitHub", "CI/CD"],
    hot: ["Docker", "Kubernetes"],
  },
  {
    icon: "📊",
    name: "Data / Eval",
    tags: ["NumPy", "Pandas", "Matplotlib", "NLTK", "BLEU", "ROUGE", "METEOR", "Streamlit", "Vector Databases", "Text Embeddings"],
    hot: ["Streamlit", "Vector Databases"],
  },
  {
    icon: "⚡",
    name: "Automation",
    tags: ["N8n", "GoHighLevel (GHL)", "OpenAI API", "JSON Schema"],
    hot: ["N8n", "OpenAI API"],
  },
];

const experience = [
  {
    role: "DevOps & Backend Intern",
    company: "SPS.inc — Remote",
    duration: "July 2025 – September 2025",
    bullets: [
      "Built and maintained RESTful APIs using Node.js and Express.js with MySQL; designed efficient data models and server-side business logic for internal tooling.",
      "Designed and implemented CI/CD pipelines using Jenkins, reducing manual deployment overhead and improving release consistency.",
      "Containerized applications with Docker and orchestrated deployments using Kubernetes on IBM Cloud for scalable production-like environments.",
      "Monitored system performance and infrastructure health using Grafana dashboards, enabling rapid issue detection.",
    ],
  },
];

const education = [
  {
    degree: "B.Sc. Computer Science (BSCS)",
    institution: "FAST-NUCES, Islamabad",
    cgpa: "3.56 / 4.00",
    duration: "August 2023 – August 2027",
    description: "Relevant coursework: Data Structures & Algorithms, Machine Learning, Object-Oriented Programming, Software Engineering, Database Systems.",
  },
 
];

const certifications = [
  { title: "Machine Learning Specialization", issuer: "DeepLearning.AI · Coursera", color: "#00d4ff" },
  { title: "Associate AI Engineer for Developers", issuer: "DataCamp", color: "#00e5a0" },
  { title: "Associate AI Engineer for Data Scientists", issuer: "DataCamp", color: "#00e5a0" },
  { title: "Google IT Automation with Python", issuer: "Google · Coursera", color: "#ffb84d" },
];

const mlProjects = [
  {
    title: "Weakly Supervised Remote Sensing Segmentation",
    description: "Semantic segmentation framework for aerial imagery (Dubai dataset) using sparse point annotations. Custom pfCE loss achieved 15.7% mIoU with just 1 labeled pixel per class and 19.04% with 15 points — 38% loss reduction.",
    tech: ["PyTorch", "FCN", "ResNet-50", "Transfer Learning", "Computer Vision"],
    primary: "PyTorch",
    github: "https://github.com/TayyabMuhammad5/Weakly-Supervised-Remote-Sensing-Segmentation-using-Partial-Focal-Cross-Entropy-Loss-",
  },
   {
    title: "Ultra-Low Latency AI Voice Agent",
    description: "Full-duplex conversational AI agent achieving sub-800ms latency. Engineered a custom WebSocket streaming architecture utilizing asynchronous Python (FastAPI) and Next.js, integrating Deepgram STT/TTS and Groq LLMs. Optimized browser performance by bypassing main-thread bottlenecks with raw PCM audio chunk rendering.",
    tech:["FastAPI", "Next.js", "WebSockets", "Deepgram", "Groq", "Web Audio API"],
    primary: "FastAPI",
    github: "https://github.com/TayyabMuhammad5/Voice-Agent",
  },
  {
    title: "RACE-RC: Intelligent Reading Comprehension System",
    description: "End-to-end MCQ pipeline on RACE dataset: answer verification, question/distractor/hint generation using Logistic Regression, LinearSVC & K-Means. 4-page Streamlit UI with live confidence scores and latency dashboards.",
    tech: ["Python", "Scikit-learn", "Streamlit", "NLTK", "BLEU", "ROUGE"],
    primary: "Scikit-learn",
    github: "https://github.com/TayyabMuhammad5/AI-Project",
  },
  {
    title: "Multi-Input OCR Document Classifier",
    description: "Dual-branch deep learning model fusing CNN-based 2D document image encoding with 1D categorical text embeddings via late fusion for insurance document classification.",
    tech: ["PyTorch", "CNN", "Multi-modal DL", "Python"],
    primary: "PyTorch",
    github: "https://github.com/TayyabMuhammad5/Developing-Multi-Input-Models-For-OCR",
  },
  {
    title: "Medical Transcription Extraction",
    description: "Automated structured extraction of patient data and treatment plans from free-form clinical transcripts using LLM function calling with strict JSON schema enforcement.",
    tech: ["Python", "OpenAI API", "LLM Function Calling", "JSON"],
    primary: "OpenAI API",
    github: "https://github.com/TayyabMuhammad5/Organizing-Medical-Transcriptions-with-the-OpenAI-API",
  },
  {
    title: "NLP Car Review Pipeline",
    description: "End-to-end NLP pipeline on automotive reviews performing multi-task inference: sentiment classification, language translation, and extractive QA using open-source LLMs with standard NLP benchmark evaluation.",
    tech: ["Python", "HuggingFace", "Transformers", "Open-source LLMs"],
    primary: "HuggingFace",
    github: "https://github.com/TayyabMuhammad5/Analyzing-Car-Reviews-with-LLMs",
  },
  {
    title: "E-Commerce Topic Analysis",
    description: "Customer feedback analysis at scale using dense text embeddings and vector databases to cluster sentiments and surface product themes. Dimensionality reduction and cluster visualization for data-driven insights.",
    tech: ["Python", "OpenAI API", "ChromaDB", "t-SNE", "Text Embeddings"],
    primary: "ChromaDB",
    github: "https://github.com/TayyabMuhammad5/Topic-Analysis-of-Clothing-Reviews-with-Embeddings",
  },
  {
    title: "Predictive Modeling for Agriculture",
    description: "ML model identifying the most predictive soil features (N, P, K, pH) to optimize crop yield recommendations for farmers.",
    tech: ["Python", "Scikit-learn", "Logistic Regression", "Feature Selection"],
    primary: "Scikit-learn",
    github: "https://github.com/TayyabMuhammad5/Predictive-Modeling-for-Agriculture",
  },
  {
    title: "Predicting Movie Rental Durations",
    description: "Regression model built to predict DVD rental times for inventory planning. Achieved MSE under 3 using ensemble methods.",
    tech: ["Python", "Random Forest", "Lasso Regression", "Scikit-learn"],
    primary: "Random Forest",
    github: "https://github.com/TayyabMuhammad5/Predicting-Movie-Rental-Durations",
  },
  {
    title: "Clustering Antarctic Penguin Species",
    description: "Unsupervised ML to group native penguin species based on physical measurements using K-Means with Elbow Method for optimal cluster selection.",
    tech: ["Python", "Scikit-learn", "KMeans", "Data Visualization"],
    primary: "KMeans",
    github: "https://github.com/TayyabMuhammad5/Clustering-Antarctic-Penguin-Species",
  },
  {
    title: "Paris Travel Guide via OpenAI API",
    description: "AI-powered virtual travel guide chatbot providing insights into Parisian landmarks using prompt-engineered LLM interactions.",
    tech: ["Python", "OpenAI API", "Prompt Engineering"],
    primary: "OpenAI API",
    github: "https://github.com/TayyabMuhammad5/Planning-a-Trip-to-Paris-with-the-OpenAI-API",
  },
];

const devProjects = [
  {
    title: "Veloce: AI-Powered Agency Intake System",
    description: "Scalable agency intake platform with custom OpenAI integration using strict JSON schema enforcement to automatically parse and route complex multi-field client briefs into a structured database.",
    tech: ["Next.js", "Prisma ORM", "OpenAI API", "MySQL"],
    primary: "Next.js",
    github: "https://veloce-woad.vercel.app/",
  },
  {
    title: "Race Metrics Dashboard",
    description: "Java desktop application to track, analyze and visualize motorsport data including lap times, pit stops and tire strategies. Full F1 racing management system.",
    tech: ["Java", "JavaFX", "MySQL", "MVC"],
    primary: "JavaFX",
    github: "https://github.com/TayyabMuhammad5/sda-project",
  },
  {
    title: "Xonix Arcade Game",
    description: "Feature-rich C++ clone of the classic Xonix game with local multiplayer, player profiles, and custom data structures (AVL Trees, Hash Maps) for game logic.",
    tech: ["C++", "SFML", "AVL Trees", "Hash Maps"],
    primary: "C++",
    github: "https://github.com/TayyabMuhammad5/data-final-project",
  },
  {
    title: "Mega Project: Property Listings",
    description: "Full-stack MVC web application for exploring, creating and reviewing property listings. Features user authentication, image uploads, and robust backend.",
    tech: ["Node.js", "Express", "MongoDB", "EJS"],
    primary: "Node.js",
    github: "https://github.com/TayyabMuhammad5/mega-project",
  },
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, style: s }) {
  const ref = useReveal();
  return <div ref={ref} className="reveal" style={s}>{children}</div>;
}

export default function App() {
  const [tab, setTab] = useState("ml");
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("mohdtayyab200645@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentProjects = tab === "ml" ? mlProjects : devProjects;

  return (
    <>
      <style>{style}</style>

      {/* NAV */}
      <nav>
        <div className="nav-logo">MT</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="about" className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Available for opportunities
          </div>
          <h1>
            Hi, I'm<br />
            <span className="name">Muhammad Tayyab</span>
          </h1>
          <p className="hero-sub">
            <strong>ML Engineer</strong> &amp; <strong>Full-Stack Developer</strong>
          </p>
          <p className="hero-desc">
            CS student at FAST-NUCES (CGPA 3.56) specializing in deep learning, NLP, and production-grade web systems. I build end-to-end AI pipelines and scalable applications — from semantic segmentation models to agency automation platforms.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-cyan">View Projects →</a>
            <a href="#contact" className="btn btn-ghost">Get in Touch</a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-num">14+</div>
              <div className="stat-label">Projects Built</div>
            </div>
            <div>
              <div className="stat-num">3.56</div>
              <div className="stat-label">CGPA</div>
            </div>
            <div>
              <div className="stat-num">4</div>
              <div className="stat-label">Certifications</div>
            </div>
            <div>
              <div className="stat-num">1</div>
              <div className="stat-label">Internship</div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="skills-section">
        <RevealSection>
          <div className="section-label">Toolkit</div>
          <div className="section-title">Technical Skills</div>
          <div className="skills-grid">
            {skills.map((g) => (
              <div className="skill-group" key={g.name}>
                <div className="skill-group-icon">{g.icon}</div>
                <div className="skill-group-name">{g.name}</div>
                <div className="skill-tags">
                  {g.tags.map((t) => (
                    <span key={t} className={`skill-tag${g.hot.includes(t) ? " hot" : ""}`}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ background: "var(--bg)" }}>
        <RevealSection>
          <div className="section-label">Work</div>
          <div className="section-title">Experience</div>
          <div className="timeline">
            {experience.map((e, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-role">{e.role}</div>
                <div className="timeline-company">{e.company}</div>
                <div className="timeline-meta">{e.duration}</div>
                <ul className="timeline-bullets">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="projects-section">
        <RevealSection>
          <div className="section-label">Portfolio</div>
          <div className="section-title">Featured Projects</div>
          <div className="project-tabs">
            <button className={`project-tab${tab === "ml" ? " active" : ""}`} onClick={() => setTab("ml")}>
              🤖 Machine Learning & AI ({mlProjects.length})
            </button>
            <button className={`project-tab${tab === "dev" ? " active" : ""}`} onClick={() => setTab("dev")}>
              {'</>'} Software Development ({devProjects.length})
            </button>
          </div>
          <div className="projects-grid">
            {currentProjects.map((p, i) => (
              <a
                key={i}
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="card-header">
                  <div className="card-title">{p.title}</div>
                  <span className="card-arrow">↗</span>
                </div>
                <p className="card-desc">{p.description}</p>
                <div className="card-tech">
                  {p.tech.map((t, j) => (
                    <span key={j} className={`tech-pill${t === p.primary ? " primary" : ""}`}>{t}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ background: "var(--bg)" }}>
        <RevealSection>
          <div className="section-label">Academic</div>
          <div className="section-title">Education</div>
          {education.map((e, i) => (
            <div className="edu-card" key={i}>
              <div className="edu-icon">🎓</div>
              <div>
                <div className="edu-degree">
                  {e.degree}
                  {e.cgpa && <span className="cgpa-badge">GPA {e.cgpa}</span>}
                  {e.grade && <span className="cgpa-badge" style={{ background: "var(--amber-dim)", color: "var(--amber)", borderColor: "rgba(255,184,77,0.2)" }}>Grade {e.grade}</span>}
                </div>
                <div className="edu-inst">{e.institution}</div>
                <div className="edu-meta">{e.duration}</div>
                <div className="edu-desc">{e.description}</div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "3rem" }}>
            <div className="section-label" style={{ marginBottom: "1rem" }}>Certifications</div>
            <div className="certs-grid">
              {certifications.map((c, i) => (
                <div className="cert-card" key={i}>
                  <div className="cert-dot" style={{ background: c.color, boxShadow: `0 0 6px ${c.color}60` }} />
                  <div>
                    <div className="cert-title">{c.title}</div>
                    <div className="cert-issuer">{c.issuer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section" style={{ background: "var(--bg2)" }}>
        <RevealSection>
          <div className="contact-card">
            <div className="contact-heading">Let's Build Something</div>
            <p className="contact-desc">
              I'm currently looking for new opportunities — internships, part-time roles, or open-source collaboration. Whether you have a project, a question, or just want to say hi, I'd love to hear from you.
            </p>
            <div className="contact-links">
              <button onClick={copyEmail} className="contact-btn cb-email">
                {copied ? "✓ Copied!" : "✉ Copy Email"}
              </button>
              <a href="https://github.com/TayyabMuhammad5" target="_blank" rel="noopener noreferrer" className="contact-btn cb-github">
                GitHub ↗
              </a>
              <a href="https://linkedin.com/in/TayyabMuhammad1" target="_blank" rel="noopener noreferrer" className="contact-btn cb-linkedin">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </RevealSection>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Muhammad Tayyab · Built with React</p>
      </footer>
    </>
  );
}
