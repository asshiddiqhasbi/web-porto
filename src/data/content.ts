export interface HeroContent {
  subtitle: string;
  name: string;
  tagline: string;
  ctaProjects: string;
  ctaContact: string;
}

export interface AboutDetail {
  label: string;
  value: string;
}

export interface AboutContent {
  intro: string;
  details: AboutDetail[];
}

export interface Project {
  title: string;
  tags: string[];
  badge: string;
  description: string;
  link: string;
}

export interface Skill {
  name: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export interface Interest {
  title: string;
  description: string;
}

export interface ContactContent {
  email: string;
  github: string;
  linkedin: string;
  cvUrl: string;
}

export interface PortfolioContent {
  hero: HeroContent;
  about: AboutContent;
  projects: Project[];
  skills: SkillCategory[];
  interests: Interest[];
  contact: ContactContent;
}

export const content: PortfolioContent = {
  hero: {
    subtitle: "Informatics Student · AI & Software",
    name: "Hasbi As Shiddiq",
    tagline:
      "Informatics Engineering student at Universitas Ma'soem, exploring artificial intelligence, software development, and modern web systems. One project at a time.",
    ctaProjects: "View Projects",
    ctaContact: "Get In Touch",
  },

  about: {
    intro:
      "I'm an Informatics Engineering student exploring the intersection of software development, artificial intelligence, and modern web technologies. I learn mostly by building, breaking, and rebuilding things.",
    details: [
      {
        label: "Currently",
        value: "Informatics Engineering Student, Universitas Ma'soem",
      },
      {
        label: "Based in",
        value: "Indonesia",
      },
      {
        label: "Focus",
        value: "Software Development, AI, Web Systems",
      },
      {
        label: "Learning",
        value: "Applied AI, system design, networks",
      },
    ],
  },

  projects: [
    {
      title: "Smart Expired Food Tracker",
      tags: ["Laravel", "PHP", "MySQL"],
      badge: "Full-Stack · Featured",
      description:
        "A tracking system that helps households and small businesses monitor food expiry, cutting waste through automated alerts and reporting.",
      link: "",
    },
    {
      title: "AI Concept Showcase",
      tags: ["AI/ML", "Experimentation"],
      badge: "Upcoming",
      description:
        "An experimental space for prototyping applied AI ideas, from model behavior demos to small interactive machine learning concepts.",
      link: "",
    },
    {
      title: "Web Systems Exploration",
      tags: ["System Design", "Networking"],
      badge: "Architecture · Exploration",
      description:
        "Ongoing study of how modern web systems are designed and scaled, from database architecture to network-aware application structure.",
      link: "",
    },
  ],

  skills: [
    {
      category: "Languages",
      items: [
        {
          name: "Java",
          description:
            "Object-oriented programming for backend logic and application development.",
        },
        {
          name: "JavaScript",
          description:
            "Dynamic scripting for interactive web experiences and frontend logic.",
        },
        {
          name: "Python",
          description:
            "Versatile language for scripting, data work, and AI experimentation.",
        },
        {
          name: "PHP",
          description:
            "Server-side web development and backend application logic.",
        },
      ],
    },
    {
      category: "Web",
      items: [
        {
          name: "HTML/CSS",
          description:
            "Structuring and styling responsive, accessible web interfaces.",
        },
        {
          name: "Laravel",
          description:
            "Full-stack PHP framework for building scalable web applications.",
        },
        {
          name: "React.js",
          description:
            "Component-based UI development for modern single-page applications.",
        },
      ],
    },
    {
      category: "Database",
      items: [
        {
          name: "MySQL",
          description:
            "Relational database design, querying, and data modeling.",
        },
        {
          name: "SQL Server",
          description:
            "Enterprise database management and structured data storage.",
        },
      ],
    },
    {
      category: "Tools",
      items: [
        {
          name: "Git/GitHub",
          description:
            "Version control, branching workflows, and collaborative development.",
        },
        {
          name: "VS Code",
          description:
            "Primary editor for coding, debugging, and project management.",
        },
        {
          name: "Figma",
          description:
            "UI design, wireframing, and visual prototyping.",
        },
      ],
    },
  ],

  interests: [
    {
      title: "Artificial Intelligence",
      description:
        "Exploring machine learning models, applied AI systems, and intelligent automation.",
    },
    {
      title: "Blockchain",
      description:
        "Understanding decentralized systems, smart contracts, and distributed ledger technology.",
    },
    {
      title: "Web Development",
      description:
        "Building modern, responsive web applications with clean architecture.",
    },
    {
      title: "Computer Networking",
      description:
        "Studying how data flows across networks and how systems scale reliably.",
    },
  ],

  contact: {
    email: "hasbidiqas@gmail.com",
    github: "https://github.com/asshiddiqhasbi",
    linkedin: "https://www.linkedin.com/in/hasbi-as-shiddiq-91230436b",
    cvUrl: "",
  },
};
