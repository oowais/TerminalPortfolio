export interface Project {
  name: string;
  description: string;
  technologies: string[];
  github: string | null;
  live: string | null;
  teamSize: number;
  duration: string;
}

export interface Contact {
  email: string;
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
  website: string | null;
}

export interface Experience {
  position: string;
  company: string;
  duration: string;
  website: string | null;
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
  name: "Owais",
  title: "Frontend Developer",
  about: `
    Hi! I'm Owais, a passionate Frontend Developer with experience in building web applications
    using modern technologies. Focused on creating efficient, scalable, and user-friendly
    solutions.
  `,

  projects: [
    {
      name: "Jaadu - An Alien in a Terrarium",
      description:
        "Jaadu is an alien in the FabTerrarium, an open space with different animals/plants interacting with their environment or external users. It crawls in the terrarium reading the emotions of the other entities and displaying those emotions in itself. The materialization of Jaadu is a combination of Arduino, RasPI, 3D Modelling, Sensors, comm modes and LEDs.",
      technologies: ["Python", "C++", "3D Modelling", "Arduino", "RasPI"],
      github: "https://github.com/oowais/Jaadu",
      live: "https://oowais.github.io/Jaadu/",
      teamSize: 3,
      duration: "Oct 2018 - Jan 2019",
    },
    {
      name: "LabChain",
      description:
        "Created a Blockchain core called LabChain as part of a lab held by Fraunhofer FIT Blockchain Lab. Components developed: Blockchain Core component (Blocks, Branches, Transactions handling); Automatic Peer Discovery using DNS Seeding; Database store and recovery of Blocks.",
      technologies: ["Python", "Blockchain"],
      github: "https://github.com/oowais/LabChain",
      live: null,
      teamSize: 5,
      duration: "Apr 2018 - Aug 2018",
    },
    {
      name: "Link Discovery (Master Thesis)",
      description:
        "Unsupervised Link Discovery Between Unstructured Text and Taxonomy.",
      technologies: ["Python", "NLP", "Taxonomy"],
      github:
        "https://github.com/rwth-acis/Unsupervised-Link-Discovery-Between-Unstructured-Text-and-Taxonomy/tree/master/profile-discovery",
      live: null,
      teamSize: 1,
      duration: "Nov 2020 - Jun 2021",
    },
    {
      name: "Muses",
      description:
        "Music recommendation system using content based music similarity. An audio comparison system which compares features of sound/music and recommends the closest song.",
      technologies: [
        "Python",
        "Machine Learning",
        "Audio Processing",
        "Feature Extraction",
      ],
      github: "https://github.com/oowais/Muses",
      live: null,
      teamSize: 1,
      duration: "Oct 2018 - Feb 2019",
    },
    {
      name: "Sock it Up",
      description:
        "A robot built using 'MakeBlock Ultimate Robot Kit' to help physically impaired or older people to wear socks without using any hands. Made as part of UIST Student Innovation Contest 2018",
      technologies: ["Python", "Arduino", "MakeBlock"],
      github: null,
      live: null,
      teamSize: 5,
      duration: "2018",
    },
    {
      name: "Trajectory Tracking of a Laser Beam",
      description:
        "Tracking of a laser beam and rendering it on the display screen using projector using OpenCV.",
      technologies: ["C++", "OpenCV"],
      github: null,
      live: null,
      teamSize: 2,
      duration: "2013",
    },
    {
      name: "Terminal Portfolio",
      description:
        "A terminal portfolio made using 'Vibe Coding'. It is made via Replit and debugged via Cursor IDE. Made in Vue.js. It is a simple portfolio that displays the projects and skills of the developer.",
      technologies: ["Vue.js", "Replit", "Cursor IDE"],
      github: "https://github.com/oowais/TerminalPortfolio",
      live: null,
      teamSize: 1,
      duration: "Mar 2025",
    },
    {
      name: "GitHub User Search",
      description:
        "Input any GitHub username to see their details. Live demo link is located in REAMDE of the GitHub repo.",
      technologies: ["Angular 2", "TypeScript", "GitHub API"],
      github: "https://github.com/oowais/coding-challenge-user-search",
      live: "https://reverent-minsky-7484a4.netlify.app/c",
      teamSize: 1,
      duration: "Nov 2021",
    },
  ],

  skills: {
    Frontend: [
      "Vue.js",
      "TypeScript/JavaScript",
      "HTML5/CSS3",
      "Responsive Design",
      "Webpack",
      "Vite",
      "Vuetify",
      "Nuxt.js",
    ],
    Backend: ["Python", "Django", "RESTful APIs", "Node.js", "PostgreSQL"],
    DevOps: ["Git", "Docker", "CI/CD", "AWS", "Linux"],
  },

  experience: [
    {
      position: "Frontend Developer",
      company: "Einhundert Energie GmbH",
      duration: "Dec 2021 - Present",
      website: "https://einhundert.de/",
      responsibilities: [
        "Lead development of enterprise web applications",
        "Developed and maintained web apps for internal administrative purposes and for external customers",
        "Upgraded Django backend REST API for the web app",
        "Developed custom Django management commands for automated data processing and system administration",
        "Upgraded the frontends from Vue 2 to Vue 3",
        "Created Android and iOS mobile apps of the web app using Capacitor",
        "Implement CI/CD pipelines and DevOps practices",
        "Worked on parsing and creating EDIFACT messages for energy suppliers",
        "Optimize application performance and scalability",
      ],
    },
    {
      position: "Student Research Scientist",
      company: "Fraunhofer FKI",
      duration: "Sep 2018 - Sep 2021",
      website: "https://fki.fraunhofer.de/",
      responsibilities: [
        "Created and delivered UI services for demo purposes",
        "Developed and maintained XML validation software in Java EE",
        "Developed REST services using Django framework in Python",
        "Successfully finished master thesis 'Unsupervised Link Discovery Between Unstructured Text and Taxonomy' during the student research scientist job",
        "Developed and maintained map related UI in Angular 8 allowing to modify elements on the map using mouse and voice recognition",
        "Prepared a variety of different written communications, reports and documents to ensure smooth operations",
      ],
    },
    {
      position: "Systems Engineer",
      company: "Tata Consultancy Services",
      duration: "Aug 2014 - Oct 2017",
      website: "https://www.tcs.com/",
      responsibilities: [
        "Ericsson Network Manager(ENM): ENM is a collection of virtual management tools based on a single software platform designed to provide unified network management capability across Radio access, Transport, and Core networks",
        "Developed the UI of 'Link Management' module for creating and managing links between network elements as part of ENM",
        "Developed software functionalities using Node.js, the JavaScript runtime environment, Java EE and REST",
        "Produced Integration tests for the modules created using Arquillian and later on tested the same on Docker images.",
        "Helped pass on the knowledge to the new hires by training them in aforementioned modules and regarding coding practices/guidelines.",
        "Worked on minimizing the resources held by Jboss EAP servers in a cluster environment to increase the efficiency.",
        "Managed development milestones from initial steps through final delivery.",
        "Coordinated with other engineers to evaluate and improve software interfaces.",
        "Consulted with engineering team members to determine system loads and develop improvement plans.",
      ],
    },
    {
      position: "Computer Engineer (Trainee)",
      company: "Dion Global Solutions",
      duration: "May 2013 - Jun 2013",
      website: "https://www.dionglobal.com/",
      responsibilities: [
        "Aided in analyzing and migrating the code from Java SE 5 to 6",
        "Learnt basics of Android programming and database management",
        "Created product design modifications",
      ],
    },
  ],

  education: [
    {
      degree: "Master of Science in Media Informatics",
      institution: "RWTH Aachen University",
      duration: "2018 - 2021",
      description: "Grade: 1.8 (German scale)",
      website: "https://www.rwth-aachen.de/",
    },
    {
      degree: "Bachelor of Technology in Computer Engineering",
      institution: "Faculty of Engineering & Technology, Jamia Millia Islamia",
      duration: "2009 - 2013",
      description: "Grade: 7.9/10 (CGPA)",
      website: "https://www.jmi.ac.in/fet",
    },
  ],

  contact: {
    email: "oowais7@pm.me",
    location: "Bonn, Germany",
  },

  social: [
    {
      name: "GitHub",
      url: "https://github.com/oowais",
      icon: "fa-github",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/owaisahmed92/",
      icon: "fa-linkedin",
    },
  ],
};
