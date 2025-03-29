import { ref, computed } from "vue";
import portfolioData from "../data/portfolio";

export function useTerminal() {
  const commandHistory = ref([]);
  const outputHistory = ref([]);
  const currentCommand = ref("");
  const historyIndex = ref(-1);
  const commandSuggestions = ref([]);

  const availableCommands = [
    "help",
    "about",
    "projects",
    "skills",
    "experience",
    "education",
    "contact",
    "clear",
    "ls",
    "cat",
    "download",
    "welcome",
    "social",
    "theme",
  ];

  // Add command to history
  const addToCommandHistory = (command) => {
    commandHistory.value.push(command);
    outputHistory.value.push({
      type: "command",
      content: command,
    });
  };

  // Add response to output history
  const addToOutputHistory = (content, isError = false, useTyping = true) => {
    outputHistory.value.push({
      type: "response",
      content,
      isError,
      useTyping,
    });
  };

  // Clear terminal
  const clearTerminal = () => {
    outputHistory.value = [];
  };

  // Handle command execution
  const handleCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();

    if (!command) return;

    // Add the command to history
    if (command !== "welcome") {
      addToCommandHistory(command);
    }

    // Reset history index
    historyIndex.value = -1;

    // Process the command
    switch (command) {
      case "help":
        showHelp();
        break;
      case "about":
        showAbout();
        break;
      case "projects":
        showProjects();
        break;
      case "skills":
        showSkills();
        break;
      case "experience":
        showExperience();
        break;
      case "education":
        showEducation();
        break;
      case "contact":
        showContact();
        break;
      case "clear":
        clearTerminal();
        break;
      case "ls":
        showLs();
        break;
      case "social":
        showSocial();
        break;
      case "download":
      case "download cv":
      case "download resume":
        downloadResume();
        break;
      case "welcome":
        showWelcome();
        break;
      case "theme":
        showTheme();
        break;
      default:
        if (command.startsWith("cat ")) {
          const fileName = command.substring(4).trim();
          catFile(fileName);
        } else {
          addToOutputHistory(
            `Command not found: ${command}. Type 'help' to see available commands.`,
            true
          );
        }
    }
  };

  // Handle tab completion
  const handleTabCompletion = () => {
    const input = currentCommand.value.toLowerCase();
    if (!input) return;

    const matches = availableCommands.filter((cmd) => cmd.startsWith(input));

    if (matches.length === 1) {
      // If only one match, autocomplete
      currentCommand.value = matches[0];
      commandSuggestions.value = [];
    } else if (matches.length > 1) {
      // If multiple matches, show suggestions
      commandSuggestions.value = matches;
    } else commandSuggestions.value = [];
  };

  // Navigate through command history
  const navigateHistory = (direction) => {
    if (commandHistory.value.length === 0) return;

    if (direction === "up") {
      if (historyIndex.value < commandHistory.value.length - 1) {
        historyIndex.value++;
        currentCommand.value =
          commandHistory.value[
            commandHistory.value.length - 1 - historyIndex.value
          ];
      }
    } else if (direction === "down") {
      if (historyIndex.value > 0) {
        historyIndex.value--;
        currentCommand.value =
          commandHistory.value[
            commandHistory.value.length - 1 - historyIndex.value
          ];
      } else if (historyIndex.value === 0) {
        historyIndex.value = -1;
        currentCommand.value = "";
      }
    }
  };

  // Command handlers
  const showHelp = () => {
    const helpText = `
<pre>
Available commands:

  <span style="color: #56b6c2;">help</span>        - Show this help message
  <span style="color: #56b6c2;">about</span>       - Display information about me
  <span style="color: #56b6c2;">projects</span>    - View my portfolio projects
  <span style="color: #56b6c2;">skills</span>      - See my technical skills
  <span style="color: #56b6c2;">experience</span>  - View my work experience
  <span style="color: #56b6c2;">education</span>   - Show my educational background
  <span style="color: #56b6c2;">contact</span>     - Display contact information
  <span style="color: #56b6c2;">social</span>      - Show social media links
  <span style="color: #56b6c2;">ls</span>          - List available sections
  <span style="color: #56b6c2;">cat</span> [file]  - View content of a file
  <span style="color: #56b6c2;">download</span>    - Download my resume/CV
  <span style="color: #56b6c2;">clear</span>       - Clear the terminal
  <span style="color: #56b6c2;">theme</span>       - Change terminal theme

Keyboard shortcuts:
  <span style="color: #d19a66;">Tab</span>         - Autocomplete commands
  <span style="color: #d19a66;">↑/↓</span>         - Navigate command history
</pre>
    `;
    addToOutputHistory(helpText);
  };

  const showAbout = () => {
    const aboutText = `
<div class="about-section">
  <h2>${portfolioData.name}</h2>
  <p>${portfolioData.title}</p>
  <div class="divider"></div>
  <p>${portfolioData.about}</p>
</div>
    `;
    addToOutputHistory(aboutText);
  };

  const showProjects = () => {
    let projectsText = `
<div class="projects-section">
  <h2>Projects</h2>
  <div class="divider"></div>
`;

    portfolioData.projects.forEach((project, index) => {
      projectsText += `
  <div class="project-item">
    <h3>${project.name}</h3>
    <p class="project-description">${project.description}</p>
    <div class="project-tech">
      <strong>Technologies:</strong> ${project.technologies.join(", ")}
    </div>
    ${
      project.link
        ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer">View Project →</a>`
        : ""
    }
  </div>
  ${
    index < portfolioData.projects.length - 1
      ? '<div class="divider"></div>'
      : ""
  }
`;
    });

    projectsText += `</div>`;
    addToOutputHistory(projectsText);
  };

  const showSkills = () => {
    let skillsText = `
<div class="skills-section">
  <h2>Technical Skills</h2>
  <div class="divider"></div>
  <div class="skills-grid">
`;

    Object.entries(portfolioData.skills).forEach(([category, skills]) => {
      skillsText += `
    <div class="skill-category">
      <h3>${category}</h3>
      <ul>
        ${skills.map((skill) => `<li>${skill}</li>`).join("")}
      </ul>
    </div>
`;
    });

    skillsText += `
  </div>
</div>
    `;
    addToOutputHistory(skillsText);
  };

  const showExperience = () => {
    let experienceText = `
<div class="experience-section">
  <h2>Work Experience</h2>
  <div class="divider"></div>
`;

    portfolioData.experience.forEach((job, index) => {
      experienceText += `
  <div class="job-item">
    <div class="job-header">
      <h3>${job.position}</h3>
      <p class="job-company">${job.company}</p>
      <p class="job-duration">${job.duration}</p>
    </div>
    <ul class="job-responsibilities">
      ${job.responsibilities.map((resp) => `<li>${resp}</li>`).join("")}
    </ul>
  </div>
  ${
    index < portfolioData.experience.length - 1
      ? '<div class="divider"></div>'
      : ""
  }
`;
    });

    experienceText += `</div>`;
    addToOutputHistory(experienceText);
  };

  const showEducation = () => {
    let educationText = `
<div class="education-section">
  <h2>Education</h2>
  <div class="divider"></div>
`;

    portfolioData.education.forEach((edu, index) => {
      educationText += `
  <div class="education-item">
    <h3>${edu.degree}</h3>
    <p class="education-institution">${edu.institution}</p>
    <p class="education-duration">${edu.duration}</p>
    ${
      edu.description
        ? `<p class="education-description">${edu.description}</p>`
        : ""
    }
  </div>
  ${
    index < portfolioData.education.length - 1
      ? '<div class="divider"></div>'
      : ""
  }
`;
    });

    educationText += `</div>`;
    addToOutputHistory(educationText);
  };

  const showContact = () => {
    const contactText = `
<div class="contact-section">
  <h2>Contact Information</h2>
  <div class="divider"></div>
  <div class="contact-details">
    <p><i class="fas fa-envelope"></i> Email: <a href="mailto:${portfolioData.contact.email}">${portfolioData.contact.email}</a></p>
    <p><i class="fas fa-phone"></i> Phone: ${portfolioData.contact.phone}</p>
    <p><i class="fas fa-map-marker-alt"></i> Location: ${portfolioData.contact.location}</p>
  </div>
  <div class="contact-form-note">
    <p>Feel free to reach out through any of these channels!</p>
  </div>
</div>
    `;
    addToOutputHistory(contactText);
  };

  const showLs = () => {
    const lsText = `
<div class="ls-output">
  <span class="file">about.txt</span>
  <span class="file">projects.txt</span>
  <span class="file">skills.txt</span>
  <span class="file">experience.txt</span>
  <span class="file">education.txt</span>
  <span class="file">contact.txt</span>
  <span class="file">resume.pdf</span>
</div>
    `;
    addToOutputHistory(lsText, false, false);
  };

  const showSocial = () => {
    let socialText = `
<div class="social-section">
  <h2>Social Media</h2>
  <div class="divider"></div>
  <div class="social-links">
`;

    portfolioData.social.forEach((platform) => {
      socialText += `    <a href="${platform.url}" target="_blank" rel="noopener noreferrer"><i class="fab ${platform.icon}"></i> ${platform.name}</a>\n`;
    });

    socialText += `
  </div>
</div>
    `;
    addToOutputHistory(socialText);
  };

  const catFile = (fileName) => {
    const normalizedFileName = fileName.toLowerCase().replace(".txt", "");

    switch (normalizedFileName) {
      case "about":
        showAbout();
        break;
      case "projects":
        showProjects();
        break;
      case "skills":
        showSkills();
        break;
      case "experience":
        showExperience();
        break;
      case "education":
        showEducation();
        break;
      case "contact":
        showContact();
        break;
      case "resume":
      case "resume.pdf":
        addToOutputHistory(
          'Use the "download" command to download the resume.pdf file.'
        );
        break;
      default:
        addToOutputHistory(`Error: File '${fileName}' not found.`, true);
    }
  };

  const downloadResume = () => {
    addToOutputHistory("Downloading resume.pdf...");

    // Create an anchor element
    const link = document.createElement("a");
    link.href = "/src/assets/resume.pdf"; // Path to your resume file
    link.download = `${portfolioData.name.replace(/\s+/g, "_")}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToOutputHistory("Resume downloaded successfully!");
  };

  const showWelcome = () => {
    const welcomeText = `
<div class="welcome-message">
  <pre class="ascii-art">
   ___         _   __      _ _       
  / _ \\___  __| |_/ _|___ | (_)___   
 / /_)/ _ \\/ _\` | |  _/ _ \\| | / _ \\ 
/ ___/  __/ (_| | | || (_) | | | (_) |
\\/    \\___|\\__,_|_|_| \\___/|_|_|\\___/ 
                                      
  </pre>
  <p>Welcome to my interactive terminal portfolio!</p>
  <p>Type <span class="cmd-highlight">help</span> to see available commands.</p>
</div>
    `;
    addToOutputHistory(welcomeText, false, false);
  };

  const showTheme = () => {
    // Placeholder for theme feature - could be expanded in the future
    const themeText = `
<div class="theme-section">
  <h2>Theme Settings</h2>
  <div class="divider"></div>
  <p>Theme customization is coming soon. Stay tuned!</p>
</div>
    `;
    addToOutputHistory(themeText);
  };

  return {
    commandHistory,
    outputHistory,
    currentCommand,
    handleCommand,
    clearTerminal,
    handleTabCompletion,
    commandSuggestions,
    historyIndex,
    navigateHistory,
  };
}
