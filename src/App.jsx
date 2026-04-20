import './App.css';
import React, { useState } from 'react';

// --- Experience Data ---
const experienceData = [
  {
    id: 1,
    role: "Backend and DevOps Intern",
    company: "SPS.inc",
    duration: "June 2025 - August 2025",
    description: "Assisted in backend development using Express.js, collaborated with the engineering team to build scalable applications, and gained hands-on experience in modern development workflows."
  }
];

// --- Education Data ---
const educationData = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science", 
    institution: "FAST University, Islamabad", 
    cgpa: 3.56,
    duration: "2023 - 2027", 
    description: "Relevant Coursework: Data Structures, Algorithms, Machine Learning, Object-Oriented Programming, and Software Engineering."
  }
];

// --- Project Data ---
const projects = [
  {
    id: 12,
    category: "dev",
    title: "Veloce: AI-Powered Agency Intake",
    description: "An end-to-end agency intake platform. The Dev component features a highly interactive Next.js Kanban board, Prisma database schemas, and real-time updates via Server-Sent Events (SSE). The AI component utilizes a custom deterministic pipeline to automatically process and analyze incoming client briefs.",
    tech: ["Next.js", "Prisma", "Node.js", "OpenAI API", "Redis"],
    github: "https://github.com/TayyabMuhammad5/veloce",
    live: "https://veloce-woad.vercel.app/" // <-- Update this placeholder with your actual live link
  },
  {
    id: 1,
    category: "dev",
    title: "Mega Project: Property Listings",
    description: "A full-stack MVC web application for exploring, creating, and reviewing property listings. Features user authentication, image uploads, and a robust backend.",
    tech: ["Node.js", "Express", "MongoDB", "EJS"],
    github: "https://github.com/TayyabMuhammad5/mega-project" 
  },
  {
    id: 11,
    category: "dev",
    title: "Xonix Arcade Game",
    description: "A feature-rich C++ clone of the classic Xonix game using SFML. Features local multiplayer, player profiles, and custom data structures (AVL Trees, Hash Maps) for game logic.",
    tech: ["C++", "SFML", "Data Structures"],
    github: "https://github.com/TayyabMuhammad5/data-final-project" 
  },
  {
    id: 2,
    category: "dev",
    title: "Racing Metrics Dashboard",
    description: "A Java-based desktop application to track, analyze, and visualize motorsport data, including lap times, pit stops, and tire strategies.",
    tech: ["Java", "JavaFX", "MVC"],
    github: "https://github.com/TayyabMuhammad5/sda-project"
  },
  {
    id: 3,
    category: "ml",
    title: "Topic Analysis of Clothing Reviews",
    description: "Analyzed e-commerce feedback using text embeddings and vector databases to uncover themes and customer sentiments.",
    tech: ["Python", "OpenAI API", "ChromaDB", "t-SNE"],
    github: "https://github.com/TayyabMuhammad5/Topic-Analysis-of-Clothing-Reviews-with-Embeddings"
  },
  {
    id: 4,
    category: "ml",
    title: "Predictive Modeling for Agriculture",
    description: "Machine learning model identifying the most predictive soil features (N, P, K, pH) to optimize crop yields for farmers.",
    tech: ["Python", "Scikit-Learn", "Logistic Regression"],
    github: "https://github.com/TayyabMuhammad5/Predictive-Modeling-for-Agriculture"
  },
  {
    id: 5,
    category: "ml",
    title: "Predicting Movie Rental Durations",
    description: "Regression model built to predict DVD rental times to improve inventory planning, achieving an MSE of under 3.",
    tech: ["Python", "Random Forest", "Lasso Regression"],
    github: "https://github.com/TayyabMuhammad5/Predicting-Movie-Rental-Durations"
  },
  {
    id: 6,
    category: "ml",
    title: "Paris Travel Guide via OpenAI API",
    description: "An AI-powered virtual travel guide chatbot providing insights into Parisian landmarks using LLMs.",
    tech: ["Python", "OpenAI API", "Prompt Engineering"],
    github: "https://github.com/TayyabMuhammad5/Planning-a-Trip-to-Paris-with-the-OpenAI-API"
  },
  {
    id: 7,
    category: "ml",
    title: "Organizing Medical Transcriptions",
    description: "Automated extraction of patient age and recommended treatments from natural language medical transcripts using LLM Function Calling.",
    tech: ["Python", "OpenAI API", "JSON"],
    github: "https://github.com/TayyabMuhammad5/Organizing-Medical-Transcriptions-with-the-OpenAI-API"
  },
  {
    id: 8,
    category: "ml",
    title: "Multi-Input Models For OCR",
    description: "A multi-modal deep learning classification model fusing 2D document image tensors and 1D categorical text tensors.",
    tech: ["Python", "PyTorch", "Deep Learning"],
    github: "https://github.com/TayyabMuhammad5/Developing-Multi-Input-Models-For-OCR"
  },
  {
    id: 9,
    category: "ml",
    title: "Clustering Antarctic Penguin Species",
    description: "Unsupervised machine learning to group native penguin species based on physical measurements using the Elbow Method.",
    tech: ["Python", "Scikit-Learn", "KMeans Clustering"],
    github: "https://github.com/TayyabMuhammad5/Clustering-Antarctic-Penguin-Species"
  },
  {
    id: 10,
    category: "ml",
    title: "Analyzing Car Reviews with LLMs",
    description: "NLP pipeline performing sentiment analysis, language translation, and extractive question answering on car dealership reviews.",
    tech: ["Python", "Hugging Face", "Transformers"],
    github: "https://github.com/TayyabMuhammad5/Analyzing-Car-Reviews-with-LLMs"
  }
];

function App() {
  // Filter projects by category
  const devProjects = projects.filter(p => p.category === 'dev');
  const mlProjects = projects.filter(p => p.category === 'ml');

  const [copied, setCopied] = useState(false);

  // Function to handle the copy action
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mohdtayyab200645@gmail.com"); 
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="portfolio-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-logo">MyPortfolio</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#resume">Resume</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* 1. Introduction Section */}
      <section id="about" className="intro-section">
        <div className="intro-content">
          <h1>Hi, I'm <span className="highlight">Muhammad Tayyab</span></h1>
          <h2>Software Developer & Machine Learning Engineer</h2>
          <p>
            I build robust full-stack applications and intelligent data-driven systems. 
            With a passion for bridging the gap between software engineering and artificial intelligence, 
            I love turning complex problems into scalable, user-friendly solutions. 
            Explore my recent work below!
          </p>
          <div className="intro-actions">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-outline">Get in Touch</a>
          </div>
        </div>
      </section>

      {/* 2. Resume Section (Experience & Education) */}
      <section id="resume" className="resume-section">
        <h2 className="section-title">Experience & Education</h2>
        
        <div className="resume-grid">
          {/* Experience Timeline */}
          <div className="resume-column">
            <h3 className="category-title">💼 Experience</h3>
            <div className="timeline">
              {experienceData.map((exp) => (
                <div key={exp.id} className="timeline-item">
                  <h4 className="timeline-title">{exp.role}</h4>
                  <h5 className="timeline-subtitle">{exp.company}</h5>
                  <p className="timeline-duration">{exp.duration}</p>
                  <p className="timeline-desc">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div className="resume-column">
            <h3 className="category-title">🎓 Education</h3>
            <div className="timeline">
              {educationData.map((edu) => (
                <div key={edu.id} className="timeline-item">
                  <h4 className="timeline-title">{edu.degree}</h4>
                  <h5 className="timeline-subtitle">{edu.institution}</h5>
                  <h5 className="timeline-cgpa" style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '0.2rem 0' }}>CGPA: {edu.cgpa}</h5>
                  <p className="timeline-duration">{edu.duration}</p>
                  <p className="timeline-desc">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Projects Section */}
      <section id="projects" className="projects-section">
        <h2 className="section-title">Featured Projects</h2>
        
        {/* Dev Sub-portion */}
        <div className="project-category">
          <h3 className="category-title">&lt; Software Development /&gt;</h3>
          <div className="projects-grid">
            {devProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* ML Sub-portion */}
        <div className="project-category">
          <h3 className="category-title">🤖 Machine Learning & AI</h3>
          <div className="projects-grid">
            {mlProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Contact Section */}
      <section id="contact" className="contact-section">
        <h2 className="section-title">Let's Connect</h2>
        <p>I'm currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open!</p>
        <div className="contact-links">
          
          {/* EMAIL BUTTON */}
          <button onClick={handleCopyEmail} className="contact-btn email" style={{ cursor: 'pointer', border: 'none', font: 'inherit' }}>
            {copied ? "Email Copied! 📋" : "Copy My Email"}
          </button>
          
          <a href="https://github.com/TayyabMuhammad5" target="_blank" rel="noopener noreferrer" className="contact-btn github">
            GitHub
          </a>
          <a href="https://linkedin.com/in/TayyabMuhammad1" target="_blank" rel="noopener noreferrer" className="contact-btn linkedin">
            LinkedIn
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Muhammad Tayyab. Built with React.</p>
      </footer>
    </div>
  );
}

// Reusable Component for Project Cards
// Reusable Component for Project Cards
function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="card-content">
        <h4>{project.title}</h4>
        <p>{project.description}</p>
        <div className="tech-stack">
          {project.tech.map((techItem, index) => (
            <span key={index} className="tech-badge">{techItem}</span>
          ))}
        </div>
      </div>
      
      {/* Cleaned up footer: No more inline styles! */}
      <div className="card-footer">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            View Code &rarr;
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer">
            Live Demo &rarr;
          </a>
        )}
      </div>
    </div>
  );
}
export default App;