import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Mail, Award, Briefcase, Code, Heart, MapPin, Sparkles } from "lucide-react";
import "./App.css"; // Use updated CSS from below

const PROFILE_PHOTO = "laksh.jpeg"; // Place your photo in public/laksh.jpeg

// ======== TYPEWRITER HOOK ========
function useTypewriter(words = [], speed = 80) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const full = words[index % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(full.slice(0, text.length + 1));
        if (text.length + 1 === full.length) setDeleting(true);
      } else {
        setText(full.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setIndex(i => (i + 1) % words.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, speed]);
  return text + (deleting ? "" : "|");
}

// ======== DATA ========
const DATA = {
  name: "Laksh Gupta",
  tagline: "Building practical AI & slick UIs",
  location: "Jaipur, India",
  email: "mailto:ilakshgupta@gmail.com",
  github: "https://github.com/lakshcity",
  resumeUrl: "https://drive.google.com/uc?export=download&id=1a4PRhy_LVzCy0Iv75KK03cs8YAH7xqCF",
  roles: ["ML Engineer", "Frontend Developer", "Data Science Enthusiast"],
  skills: [
    "Python", "C++", "Java", "TensorFlow", "scikit-learn",
    "React", "TailwindCSS", "PostgreSQL", "SQL",
    "Data Visualization", "REST APIs", "Git/GitHub", "ML/DL", "Excel", "PowerBI"
  ],
  services: [
    { title: "AI & ML Prototyping", desc: "End-to-end ML solutions from datasets to deployable models." },
    { title: "Interactive Frontend Development", desc: "Responsive, dynamic, and user-friendly interfaces." },
    { title: "Data Visualization & Insights", desc: "Intuitive dashboards turning complex data into actionable insights." }
  ],
  projects: [
    {
      title: "Lane Detection and Traffic sign Recognition for Autonomous vehicles",
      desc: "Lane detection (Cityscapes) + YOLO traffic-sign recognition with real-time inference on Jetson Nano.",
      tags: ["TensorFlow", "YOLO", "Jetson Nano", "OpenCV"],
      github: "https://github.com/lakshcity/Autonomous-vehicle"
    },
    {
      title: "E-commerce Recommendation System",
      desc: "Personalized recommendation engine using collaborative & content-based filtering, boosting UX & sales.",
      tags: ["Python", "Pandas", "scikit-learn", "ML", "Recommendation System"],
      github: "https://github.com/lakshcity/Ecommerce-recommendation"
    },
    {
      title: "Credit Card Fraud Detection",
      desc: "Imbalanced learning with feature engineering, ensemble models, and explainability.",
      tags: ["XGBoost", "SMOTE", "SHAP"],
      github: "https://github.com/lakshcity/credit-card-fraud-detction"
    }
  ],
  achievements: [
    { year: "2025", what: "Campus Ambassador – Perplexity AI" },
    { year: "2024", what: "Udemy Certification – TensorFlow 2.0" },
    { year: "2023", what: "NPTEL Certification – Object-Oriented Programming in Java" },
    { year: "2023", what: "NPTEL Certification – Programming in Java" }
  ],
  hobbies: ["Football", "Travel", "Photography", "Blogging"]
};

// ======== ANIMATION PRESETS ========
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" }
};
const fadeInScale = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: "easeOut" }
};
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

// ======== SECTION WRAPPER ========
function Section({ id, title, icon: Icon, children }) {
  return (
    <section id={id}>
      <div className="max-w-6xl mx-auto px-4 text-center md:text-left">
        <motion.div {...fadeInUp} className="flex items-center gap-3 mb-8 justify-center md:justify-start">
          {Icon && <Icon className="w-6 h-6" />}
          <h2>{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

// ======== CHIP & CARD ========
function Chip({ children }) {
  return (
    <motion.span {...fadeInScale} className="chip">
      {children}
    </motion.span>
  );
}

function Card({ children, className = "" }) {
  return (
    <motion.div {...fadeInScale} className={`card ${className}`}>
      {children}
    </motion.div>
  );
}

// ======== NAVBAR ========
function Navbar() {
  const links = [
    "home", "about", "skills", "projects", "achievements", "hobbies", "contact"
  ];
  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5" /> Laksh
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map(l => (
            <a key={l} href={`#${l}`} className="hover:opacity-80 capitalize">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={DATA.github} target="_blank" rel="noreferrer" className="p-2 rounded-xl border bg-white hover:bg-gray-100">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ======== HERO ========
function Hero() {
  const typed = useTypewriter(DATA.roles, 70);
  return (
    <section id="home" className="hero-section">
      <motion.div {...fadeInUp} className="hero-content">
        <img src={PROFILE_PHOTO} alt="Laksh Gupta" className="profile-photo" />
        <h1>
          Hi, I'm <span className="gradient-name">{DATA.name.split(" ")[0]}</span> 👋
        </h1>
        <p>{DATA.tagline}</p>
        <p className="typed">{typed}</p>
        <div className="cta-buttons">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href={DATA.resumeUrl} className="btn btn-secondary">Download Resume</a>
        </div>
        <div className="location">
          <MapPin className="inline-icon" /> {DATA.location}
        </div>
      </motion.div>
    </section>
  );
}

// ======== ABOUT ========
function About() {
  return (
    <Section id="about" title="About" icon={Briefcase}>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" className="grid md:grid-cols-3 gap-6">
        <motion.div variants={fadeInUp} className="md:col-span-2 space-y-4 leading-relaxed text-center md:text-left">
          <p>
            I'm {DATA.name}, a final-year B.Tech IT student passionate about <strong>ML, AI</strong> and building <strong>clean UIs</strong>.
          </p>
          <p>
            Passionate about AI, machine learning, and full-stack development; seeking Summer 2026 internships to apply innovative technology solutions.
          </p>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Card>
            <div className="text-sm text-gray-500">Services</div>
            <ul className="services-list mt-2 space-y-2">
              {DATA.services.map(s => (
                <li key={s.title} className="flex flex-col items-center gap-1">
                  <div className="font-medium">{s.title}</div>
                  <div className="text-sm text-gray-500 text-center">{s.desc}</div>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  );
}

// ======== SKILLS ========
function Skills() {
  return (
    <Section id="skills" title="Skills" icon={Code}>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" className="flex flex-wrap gap-2 justify-center md:justify-start">
        {DATA.skills.map(sk => (
          <Chip key={sk}>{sk}</Chip>
        ))}
      </motion.div>
    </Section>
  );
}

// ======== PROJECTS ========
function ProjectCard({ title, desc, tags, github }) {
  return (
  <Card className="project-card group overflow-visible h-full flex flex-col">
    <motion.div variants={fadeInUp} className="flex-1 p-4 pb-2">
      <h3 className="font-semibold text-lg group-hover:underline">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{desc}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map(t => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
    </motion.div>
    <div className="flex gap-2 px-4 pt-0 pb-2 -mt-2">
      <a href={github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-xl border hover:bg-gray-100">
        <Github className="w-4 h-4" /> Code
      </a>
    </div>
  </Card>
);

}

function Projects() {
  return (
    <Section id="projects" title="Projects" icon={Code}>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {DATA.projects.map(p => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </motion.div>
    </Section>
  );
}

// ======== ACHIEVEMENTS ========
function Achievements() {
  return (
    <Section id="achievements" title="Achievements" icon={Award}>
      <motion.ol variants={staggerContainer} initial="hidden" whileInView="show" className="achievements-list relative pl-0 space-y-10 flex flex-col items-center list-none">
        {DATA.achievements.map(a => (
          <motion.li key={a.year} variants={fadeInUp} className="achievement-item relative text-center max-w-md">
            <div className="achievement-year font-semibold text-xl text-purple-700">{a.year}</div>
            <div className="font-medium mt-1">{a.what}</div>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}

// ======== HOBBIES ========
function Hobbies() {
  return (
    <Section id="hobbies" title="Hobbies & Interests" icon={Heart}>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" className="flex flex-wrap gap-2 justify-center md:justify-start">
        {DATA.hobbies.map(h => (
          <Chip key={h}>{h}</Chip>
        ))}
      </motion.div>
    </Section>
  );
}

// ======== CONTACT ========
function Contact() {
  return (
    <Section id="contact" title="Contact" icon={Mail}>
      <Card className="p-6 flex flex-col md:flex-row md:justify-between gap-4">
        <div>
          <div className="text-sm text-gray-500">Have a project or opportunity?</div>
          <div className="text-lg font-semibold">Let's talk!</div>
        </div>
        <div className="flex gap-3">
          <a href={DATA.email} className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-blue-600 text-white hover:opacity-90">
            <Mail className="w-4 h-4" /> Email Me
          </a>
          <a href={DATA.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-100">
            <Github className="w-4 h-4" /> GitHub
          </a>
        </div>
      </Card>
    </Section>
  );
}

// ======== FOOTER ========
function Footer() {
  return (
    <footer>
      © {new Date().getFullYear()} {DATA.name}. Built with React, Tailwind & Framer Motion.
    </footer>
  );
}

// ======== ROOT COMPONENT ========
export default function Portfolio() {
  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth");
  }, []);
  return (
    <div className="portfolio-bg">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Hobbies />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
