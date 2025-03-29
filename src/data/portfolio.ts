interface Project {
  name: string;
  description: string;
  technologies: string[];
  github: string;
  live: string;
}

interface Portfolio {
  about: string;
  projects: Project[];
}

export const portfolio: Portfolio = {
  about: `
  
  `,

  projects: [
    {
      name: "E-commerce Platform",
      description:
        "A full-stack e-commerce solution with product management, shopping cart, and payment processing integration.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      github: "https://github.com/username/ecommerce-platform",
      live: "https://ecommerce-platform-demo.com",
    },
    {
      name: "Task Management App",
      description:
        "A productivity application for managing tasks with features like drag-and-drop, filters, and team collaboration.",
      technologies: ["Vue.js", "Vuex", "Firebase", "Tailwind CSS"],
      github: "https://github.com/username/task-manager",
      live: "https://task-manager-demo.com",
    },
    {
      name: "Weather Dashboard",
      description:
        "A responsive weather application displaying current conditions and forecasts using real-time data.",
      technologies: ["JavaScript", "Chart.js", "OpenWeather API", "HTML/CSS"],
      github: "https://github.com/username/weather-dashboard",
      live: "https://weather-dashboard-demo.com",
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
    },
  ],
};
