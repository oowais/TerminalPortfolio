export interface Project {
  name: string;
  description: string;
  technologies: string[];
  github: string;
  live: string;
  teamSize: number;
  duration: string;
}

export interface Contact {
  email: string;
  phone: string;
  location: string;
}

export interface Social {
  name: string;
  url: string;
  icon: string;
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  description?: string;
}

export interface Experience {
  position: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

interface Portfolio {
  name: string;
  title: string;
  about: string;
  projects: Project[];
  skills: Record<string, string[]>;
  experience: Experience[];
  education: Education[];
  contact: Contact;
  social: Social[];
}

export const portfolio: Portfolio = {
  name: "Your Name",
  title: "Full Stack Developer",
  about: `
    A passionate Full Stack Developer with experience in building web applications
    using modern technologies. Focused on creating efficient, scalable, and user-friendly
    solutions.
  `,

  projects: [
    {
      name: "E-commerce Platform",
      description:
        "A full-stack e-commerce solution with product management, shopping cart, and payment processing integration.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      github: "https://github.com/username/ecommerce-platform",
      live: "https://ecommerce-platform-demo.com",
      teamSize: 5,
      duration: "6 months",
    },
    {
      name: "Task Management App",
      description:
        "A productivity application for managing tasks with features like drag-and-drop, filters, and team collaboration.",
      technologies: ["Vue.js", "Vuex", "Firebase", "Tailwind CSS"],
      github: "https://github.com/username/task-manager",
      live: "https://task-manager-demo.com",
      teamSize: 3,
      duration: "4 months",
    },
    {
      name: "Weather Dashboard",
      description:
        "A responsive weather application displaying current conditions and forecasts using real-time data.",
      technologies: ["JavaScript", "Chart.js", "OpenWeather API", "HTML/CSS"],
      github: "https://github.com/username/weather-dashboard",
      live: "https://weather-dashboard-demo.com",
      teamSize: 1,
      duration: "2 months",
    },
    {
      name: "Social Media Analytics Tool",
      description:
        "A data visualization platform for social media metrics, enabling businesses to track engagement and growth.",
      technologies: [
        "React",
        "D3.js",
        "Node.js",
        "PostgreSQL",
        "Social Media APIs",
      ],
      github: "https://github.com/username/social-analytics",
      live: "https://social-analytics-demo.com",
      teamSize: 4,
      duration: "5 months",
    },
  ],

  skills: {
    Frontend: [
      "HTML5/CSS3",
      "JavaScript/TypeScript",
      "React",
      "Vue.js",
      "Responsive Design",
      "Webpack",
    ],
    Backend: [
      "Node.js",
      "Express",
      "Python",
      "Django",
      "RESTful APIs",
      "GraphQL",
    ],
    Database: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
    DevOps: ["Git", "Docker", "CI/CD", "AWS", "Linux"],
  },

  experience: [
    {
      position: "Senior Full Stack Developer",
      company: "Tech Solutions Inc.",
      duration: "2020 - Present",
      responsibilities: [
        "Lead development of enterprise web applications",
        "Mentor junior developers and conduct code reviews",
        "Implement CI/CD pipelines and DevOps practices",
        "Optimize application performance and scalability",
      ],
    },
    {
      position: "Full Stack Developer",
      company: "Digital Innovations Ltd.",
      duration: "2018 - 2020",
      responsibilities: [
        "Developed and maintained multiple client projects",
        "Implemented responsive designs and user interfaces",
        "Integrated third-party APIs and services",
        "Collaborated with design and product teams",
      ],
    },
  ],

  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "Tech University",
      duration: "2016 - 2018",
      description:
        "Specialized in Software Engineering and Distributed Systems",
    },
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "State University",
      duration: "2012 - 2016",
      description: "Minor in Mathematics",
    },
  ],

  contact: {
    email: "your.email@example.com",
    phone: "+1 (123) 456-7890",
    location: "San Francisco, CA",
  },

  social: [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: "fa-github",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: "fa-linkedin",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: "fa-twitter",
    },
  ],
};
