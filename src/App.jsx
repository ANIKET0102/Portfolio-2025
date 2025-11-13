import React, { useState, useEffect, useCallback, useRef } from "react";
// Import only the necessary Lucide icons
import {
  Home,
  User,
  Folder,
  Linkedin,
  Github,
  Zap,
  Code,
  Layout,
  TrendingUp,
  X,
  Menu,
  Award,
  ExternalLink,
  Briefcase,
  Mail,
  Palette,
} from "lucide-react";
import "./App.css"; // Import the new Pure CSS file

// --- CONFIGURATION & THEME CONSTANTS ---
// Retained for dynamic JS use (gradients, progress bar colors)
const ThemeConfig = {
  primaryOrange: "rgb(255, 107, 0)",
  darkGray: "rgb(25, 25, 25)",
  mediumGray: "rgb(40, 40, 40)",
  lightGrayBg: "rgb(30, 30, 30)",
  buttonGradient:
    "linear-gradient(to right, rgb(255, 130, 0), rgb(255, 107, 0))",
};

// --- MOCK DATA (Retained) ---
const portfolioData = {
  name: "Aniket Pawar",
  role: "Full-Stack Developer | Creative Technologist",
  tagline: "Building beautiful, functional, and scalable digital experiences.",
  email: "anipawar9028@gmail.com",
  linkedin: "https://linkedin.com/in/auroraboreal",
  github: "https://github.com/auroraboreal",
  bio: "Hello! I'm a passionate and enthusiastic BTech Computer Science student dedicated to exploring the vast world of technology and its endless possibilities. My journey in computer science has been filled with learning and experimenting with programming languages like C++, diving deep into web development, and understanding the intricacies of HTML, CSS, JavaScript",

  skills: [
    { name: "React & Next.js", icon: Code, level: 95 },
    { name: "Node.js & Express", icon: Zap, level: 90 },
    { name: "TypeScript", icon: Code, level: 85 },
    { name: "Tailwind CSS", icon: Layout, level: 98 },
    { name: "Databases (SQL/NoSQL)", icon: TrendingUp, level: 80 },
  ],
  experience: [
    {
      title: "UI/UX Intern",
      company: "GROOTT Digitals.",
      years: "2024 - 2025",
      description:
        "Contributed to 2 client-facing projects, improving user experience and achieving a 15% faster navigation flow. Collaborated in an Agile development environment, participating in sprint planning and daily stand-ups. ",
    },
    {
      title: "AI Intern",
      company: "Edunet & SHELL",
      years: "2025 - 2025",
      description:
        "I am currently working as an AI Intern at Edunet Foundation in collaboration with Shell, where I am contributing to an industry-level project focused on developing AI-driven solutions. This internship is providing me with hands-on experience in applying machine learning and data-driven techniques to solve real-world business challenges while enhancing my technical and analytical skills.",
    },
    
    {
      title: "Web Developer",
      company: "Horizon Flare",
      years: "2025 - 2025",
      description:
        "I’m delighted to announce that I’ve been selected as a Web Development Intern at Horizon Flare, I’m gonna be working remotely on live, high-impact projects that integrate Web Development, Cybersecurity, Artificial Intelligence, and emerging technologies. This opportunity will allow me to gain hands-on industry experience, collaborate with a talented technical team, and contribute to innovative digital solutions.",
    },
  ],
  projects: [
    {
      title: "AI-Campus",
      description:
        "An AI Integrated ERP System for Educational Institutions.",
      techs: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
      liveLink: "#",
      githubLink: "#",
    },
    {
      title: "Personalized Career and Skills Advisor",
      description:
        "Personlized Career and Skills Advisor, Designed and built a system to generate career & skill recommendations based on user background. ",
      techs: ["React", "Node.js", "Express", "MongoDB", "Redux"],
      liveLink: "#",
      githubLink: "#",
    },
    {
      title: "Portfolio",
      description:
        "The portfolio highlights your web development skills, including projects you've completed, technologies used, and your design capabilities. ",
      techs: ["React", "D3.js", "WebSockets", "CSS Grid"],
      liveLink: "#",
      githubLink: "#",
    },
  ],
  uiUxDesigns: [
    {
      title: "Abun.com",
      tools: "Figma, User Testing",
      description:
        "",
      caseStudyLink: "https://www.figma.com/design/XjHJWe2JEcAY7eigdH5DEb/abun.com?node-id=0-1&t=0ihfXnG0pK20nzT8-1",
    },
    {
      title: "Umla",
      tools: "Sketch, Principle",
      description:
        "",
      caseStudyLink: "https://www.figma.com/design/j0NIIufGM8fKtf03CakPme/Umla-Assignment?node-id=23-282&t=Sp52wu5ReRiQFgVn-1",
    },
    {
      title: "Hackathon",
      tools: "Figma, Adobe XD",
      description:
        "",
      caseStudyLink: "https://www.figma.com/design/Zw0JZ860oslWgqhBVw575o/Hakathon?node-id=0-1&t=koeeXN6gxMZCUIL4-1",
    },
  ],
  certificates: [
    {
      name: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
      issuer: "Amazon Web Services (AWS)",
      date: "August 2024",
      link: "https://drive.google.com/file/d/1KYBAofHZW28oYAUkYAavmbp01PLqxb6U/view",
    },
    {
      name: "Google AppSheet: Getting Started",
      issuer: "Udemy / Angela Yu",
      date: "December 2023",
      link: "https://drive.google.com/file/d/178rq-p7i7QI_06OgBqn96LdH1TTZ5Ruu/view",
    },
    {
      name: "Google Cloud Computing Foundations",
      issuer: "Stanford / Coursera",
      date: "May 2023",
      link: "https://www.skills.google/public_profiles/a2235649-5ce4-4cf1-a144-8468464bf57a",
    },
  ],
};

// --- UTILITY COMPONENTS ---

/**
 * AnimateOnScroll
 * Custom hook wrapper to apply scroll-reveal animation using IntersectionObserver.
 * Uses custom CSS classes and the 'transition' class.
 */
const AnimateOnScroll = ({ children, delay = 0, effect = "fade-up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const animationClass = (() => {
    switch (effect) {
      case "fade-up":
        return isVisible ? "fadeUp-visible" : "fadeUp-base";
      case "fade-in":
        return isVisible ? "fadeIn-visible" : "fadeIn-base";
      default:
        return "";
    }
  })();

  return (
    <div
      ref={domRef}
      className={`transition ${animationClass}`}
      style={{ transitionDelay: `${delay}ms` }}
      data-animated
    >
      {children}
    </div>
  );
};

// --- SMALLER PRESENTATIONAL COMPONENTS ---

const SectionTitle = ({ icon: Icon, children }) => (
  <AnimateOnScroll effect="fade-in">
    <h2 className="sectionTitle" style={{ color: ThemeConfig.primaryOrange }}>
      <Icon
        className="w-8 h-8 mr-3"
        style={{ color: ThemeConfig.primaryOrange }}
      />
      {children}
    </h2>
  </AnimateOnScroll>
);

/**
 * NavItem
 * Uses custom CSS class 'navItem' and 'isActive'.
 */
const NavItem = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`navItem ${isActive ? "isActive" : ""}`}
      style={
        isActive
          ? { background: ThemeConfig.buttonGradient } // Dynamic style for active state
          : {}
      }
      // Custom hover logic for INACTIVE buttons (remains in JS to use ThemeConfig)
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = ThemeConfig.buttonGradient;
          e.currentTarget.style.transform = "scale(1.03)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = ThemeConfig.darkGray; // Revert to dark background
          e.currentTarget.style.transform = "scale(1)";
        }
      }}
    >
      <Icon className="w-5 h-5" />
      <span className="hidden lg:block">{label}</span>
    </button>
  );
};

// --- NAVIGATION / SIDEBAR ---

/**
 * Sidebar
 * Uses custom CSS classes for position and translation.
 */
const Sidebar = ({
  activeSection,
  setActiveSection,
  isMenuOpen,
  toggleMenu,
}) => {
  const links = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About Me", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Folder },
    { id: "ui-designs", label: "UI/UX Designs", icon: Palette },
    { id: "certificates", label: "Certificates", icon: Award },
  ];

  return (
    <nav className={`sidebarNav ${isMenuOpen ? "isOpen" : ""}`}>
      <div className="flex justify-between items-center mb-10">
        <h1
          className="text-2xl font-black tracking-widest"
          style={{ color: ThemeConfig.primaryOrange }}
        >
          {portfolioData.name.split(" ")[0]}
        </h1>
        <button onClick={toggleMenu} className="lg:hidden p-2">
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="space-y-4">
        {links.map((link) => (
          <NavItem
            key={link.id}
            icon={link.icon}
            label={link.label}
            isActive={activeSection === link.id}
            onClick={() => {
              setActiveSection(link.id);
              // Auto-close menu on mobile after clicking a link
              if (window.innerWidth < 1024) toggleMenu();
            }}
          />
        ))}
      </div>

      {/* Social Links Bar at the bottom */}
      <div className="absolute bottom-6 left-0 right-0 px-6 pt-4 border-t border-gray-700">
        <div className="flex justify-around">
          <a
            href={portfolioData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href={portfolioData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
            aria-label="GitHub Profile"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href={`mailto:${portfolioData.email}`}
            className="text-gray-400 hover:text-white transition"
            aria-label="Email Aurora"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </nav>
  );
};

// --- SECTION COMPONENTS ---

const HeroSection = ({ setActiveSection }) => {
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  // Determine button styles based on hover state (retained in JS for dynamic colors)
  const ctaStyle = isCtaHovered
    ? {
        background: ThemeConfig.buttonGradient,
        borderColor: "transparent",
        boxShadow: `0 5px 15px rgba(255, 107, 0, 0.4)`,
      }
    : {
        backgroundColor: "transparent",
        borderColor: ThemeConfig.primaryOrange,
        borderStyle: "solid",
        borderWidth: "2px",
        boxShadow: `0 5px 15px rgba(0, 0, 0, 0.4)`,
      };

  return (
    <section
      id="hero"
      className="heroSection"
      style={{ backgroundColor: ThemeConfig.darkGray }}
    >
      <div className="heroContent">
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <AnimateOnScroll effect="fade-in" delay={0}>
            <p
              className="text-lg md:text-xl font-semibold mb-2"
              style={{ color: ThemeConfig.primaryOrange }}
            >
              Hi, I'm
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll effect="fade-in" delay={200}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
              {portfolioData.name}
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll effect="fade-in" delay={400}>
            <h2 className="text-xl md:text-3xl text-gray-300 mt-2 mb-6">
              {portfolioData.role}
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll effect="fade-in" delay={600}>
            <p className="text-gray-200 text-base md:text-lg mb-8 max-w-lg lg:max-w-full mx-auto lg:mx-0">
              {portfolioData.tagline}
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll effect="fade-in" delay={800}>
            <button
              onClick={() => setActiveSection("projects")}
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              className="px-8 py-3 text-white font-bold rounded-full text-lg shadow-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50"
              style={ctaStyle}
            >
              View My Work
            </button>
          </AnimateOnScroll>
        </div>
        <div className="order-1 lg:order-2 flex justify-center">
          <AnimateOnScroll effect="fade-in" delay={1000}>
            <div
              className="heroImagePlaceholder"
              style={{
                backgroundColor: ThemeConfig.primaryOrange,
                color: ThemeConfig.darkGray,
              }}
            >
              <User className="w-20 h-20 md:w-24 md:h-24" />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section
    id="about"
    className="sectionBase"
    style={{ backgroundColor: ThemeConfig.lightGrayBg }}
  >
    <div className="sectionContent">
      <SectionTitle icon={User}>About Me</SectionTitle>

      <div className="aboutGrid">
        <div className="lg:col-span-2">
          <AnimateOnScroll delay={100}>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
              {portfolioData.bio}
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={300}>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              I'm always on the lookout for opportunities to apply my knowledge
              in practical settings, whether it be internships, collaborative
              projects. My goal is to continue growing as a tech professional,
              contributing to innovative solutions that make a difference.
            </p>
          </AnimateOnScroll>
        </div>

        <div>
          <AnimateOnScroll delay={500}>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
              Key Skills
            </h3>
          </AnimateOnScroll>
          <div className="space-y-4">
            {portfolioData.skills.map((skill, index) => (
              <AnimateOnScroll key={skill.name} delay={700 + index * 100}>
                <div>
                  <div className="flex justify-between items-center text-gray-300 mb-1">
                    <span className="flex items-center text-sm md:text-base">
                      <skill.icon
                        className="w-4 h-4 mr-2"
                        style={{ color: ThemeConfig.primaryOrange }}
                      />
                      {skill.name}
                    </span>
                    <span className="text-xs md:text-sm font-semibold">
                      {skill.level}%
                    </span>
                  </div>
                  {/* Skill Progress Bar */}
                  <div className="skillProgressBar">
                    <div
                      className="h-2.5 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: ThemeConfig.primaryOrange,
                      }}
                    ></div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ExperienceCard = ({ job, index }) => (
  <AnimateOnScroll delay={index * 150} effect="fade-up">
    <div className="group cardBase experienceCard">
      <div className="cardGlow"></div>
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <h3 className="text-lg md:text-xl font-bold text-white mb-1 sm:mb-0">
            {job.title}
          </h3>
          <span
            className="text-xs font-medium px-3 py-1 rounded-full text-black whitespace-nowrap"
            style={{ backgroundColor: ThemeConfig.primaryOrange }}
          >
            {job.years}
          </span>
        </div>
        <p className="text-base md:text-lg font-semibold text-gray-300 mb-3">
          {job.company}
        </p>
        <p className="text-sm md:text-base text-gray-400 leading-relaxed border-t border-gray-700 pt-3">
          {job.description}
        </p>
      </div>
    </div>
  </AnimateOnScroll>
);

const ExperienceSection = () => (
  <section
    id="experience"
    className="sectionBase"
    style={{ backgroundColor: ThemeConfig.darkGray }}
  >
    <div className="sectionContent">
      <SectionTitle icon={Briefcase}>Work Experience</SectionTitle>
      <div className="space-y-8 md:space-y-12">
        {portfolioData.experience.map((job, index) => (
          <ExperienceCard key={index} job={job} index={index} />
        ))}
      </div>
    </div>
  </section>
);

const ProjectCard = ({ project, index }) => (
  <AnimateOnScroll delay={index * 150} effect="fade-up">
    <div className="group cardBase projectCard">
      <div className="cardGlow"></div>
      <div className="relative z-10">
        <Folder
          className="w-6 h-6 mb-3"
          style={{ color: ThemeConfig.primaryOrange }}
        />
        <h3 className="text-lg md:text-xl font-bold text-white mb-3">
          {project.title}
        </h3>
        <p className="text-sm text-gray-300 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.techs.map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium px-2 py-1 rounded-full text-black"
              style={{ backgroundColor: ThemeConfig.primaryOrange }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex space-x-4">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium hover:text-gray-300 transition flex items-center text-sm"
          >
            Live Demo <Layout className="w-4 h-4 ml-1" />
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 font-medium hover:text-white transition flex items-center text-sm"
          >
            GitHub <Github className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  </AnimateOnScroll>
);

const ProjectsSection = () => (
  <section
    id="projects"
    className="sectionBase"
    style={{ backgroundColor: ThemeConfig.lightGrayBg }}
  >
    <div className="sectionContent">
      <SectionTitle icon={Folder}>Featured Projects</SectionTitle>
      <div className="grid-2-3-col">
        {portfolioData.projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
);

const UIDesignCard = ({ design, index }) => (
  <AnimateOnScroll delay={index * 150} effect="fade-up">
    <div className="group cardBase uiDesignCard">
      <div className="cardGlow"></div>
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <h3 className="text-lg md:text-xl font-bold text-white mb-1 sm:mb-0">
            {design.title}
          </h3>
          <span
            className="text-xs font-medium px-3 py-1 rounded-full text-black whitespace-nowrap"
            style={{ backgroundColor: ThemeConfig.primaryOrange }}
          >
            {design.tools}
          </span>
        </div>
        <p className="text-base md:text-lg font-semibold text-gray-300 mb-3">
          UI/UX Case Study
        </p>
        <p className="text-sm md:text-base text-gray-400 leading-relaxed border-t border-gray-700 pt-3">
          {design.description}
        </p>
        <a
          href={design.caseStudyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:text-gray-300 transition flex items-center text-sm mt-3"
          style={{ color: ThemeConfig.primaryOrange }}
        >
          View Case Study
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  </AnimateOnScroll>
);

const UIDesignsSection = () => (
  <section
    id="ui-designs"
    className="sectionBase"
    style={{ backgroundColor: ThemeConfig.darkGray }}
  >
    <div className="sectionContent">
      <SectionTitle icon={Palette}>UI/UX Designs</SectionTitle>
      <div className="space-y-8 md:space-y-12">
        {portfolioData.uiUxDesigns.map((design, index) => (
          <UIDesignCard key={index} design={design} index={index} />
        ))}
      </div>
    </div>
  </section>
);

const CertificateCard = ({ cert, index }) => (
  <AnimateOnScroll delay={index * 150} effect="fade-up">
    <div className="group cardBase certificateCard">
      <div className="cardGlow"></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
              {cert.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-400 mb-4">
              {cert.issuer} &bull; {cert.date}
            </p>
          </div>
          <Award
            className="w-6 h-6 flex-shrink-0"
            style={{ color: ThemeConfig.primaryOrange }}
          />
        </div>

        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:text-gray-300 transition flex items-center text-sm mt-2"
          style={{ color: ThemeConfig.primaryOrange }}
        >
          View Credential
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  </AnimateOnScroll>
);

const CertificatesSection = () => (
  <section
    id="certificates"
    className="sectionBase"
    style={{ backgroundColor: ThemeConfig.lightGrayBg }}
  >
    <div className="sectionContent">
      <SectionTitle icon={Award}>Certifications & Awards</SectionTitle>
      <div className="grid-2-3-col">
        {portfolioData.certificates.map((cert, index) => (
          <CertificateCard key={index} cert={cert} index={index} />
        ))}
      </div>
      <AnimateOnScroll delay={450} effect="fade-in">
        <p className="text-center text-gray-400 mt-8 md:mt-12 text-sm">
          See my full credential list on{" "}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline"
            style={{ color: ThemeConfig.primaryOrange }}
          >
            Credly
          </a>{" "}
          or{" "}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline"
            style={{ color: ThemeConfig.primaryOrange }}
          >
            LinkedIn
          </a>
          .
        </p>
      </AnimateOnScroll>
    </div>
  </section>
);

// --- MAIN APPLICATION COMPONENT ---

const App = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = useCallback((sectionId) => {
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (activeSection !== "hero") {
      scrollToSection(activeSection);
    }
  }, [activeSection, scrollToSection]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Mobile Header: Sticky top navigation */}
      <header
        className="sticky top-0 z-30 lg:hidden shadow-lg p-4 flex justify-between items-center"
        style={{ backgroundColor: ThemeConfig.mediumGray }}
      >
        <h1
          className="text-xl font-black"
          style={{ color: ThemeConfig.primaryOrange }}
        >
          {portfolioData.name.split(" ")[0]}
        </h1>
        <button onClick={toggleMenu} className="p-2 text-white">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="menuOverlay lg:hidden" onClick={toggleMenu}></div>
      )}

      {/* Sidebar (Navigation) - isMenuOpen state controls 'isOpen' class */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={scrollToSection}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />

      {/* Main Content Area */}
      <main className="mainContent">
        <HeroSection setActiveSection={scrollToSection} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <UIDesignsSection />
        <CertificatesSection />

        <footer className="appFooter">
          &copy; {new Date().getFullYear()} {portfolioData.name}. 
        </footer>
      </main>
    </div>
  );
};

export default App;
