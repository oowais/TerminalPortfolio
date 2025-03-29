import { portfolio } from "./portfolio";

interface CommandOutput {
  type:
    | "success"
    | "error"
    | "projects"
    | "skills"
    | "experience"
    | "about"
    | "contact"
    | "help"
    | "easter-egg"
    | "history"
    | "system";
  content: string | Record<string, string>;
}

export const availableCommands: Record<string, string> = {
  help: "Show available commands",
  about: "Display information about me",
  projects: "Show my projects",
  skills: "Display my skills",
  experience: "Show my work experience",
  education: "Display my education",
  contact: "Show contact information",
  clear: "Clear the terminal",
  ls: "List files and directories",
  cat: "Display file contents",
  download: "Download resume",
  welcome: "Show welcome message",
  social: "Display social media links",
  theme: "Change terminal theme",
};

export function executeCommand(cmd: string, baseCmd: string): CommandOutput {
  switch (baseCmd) {
    case "help":
      return {
        type: "help",
        content: availableCommands,
      };
    case "about":
      return {
        type: "about",
        content: portfolio.about,
      };
    case "projects":
      return {
        type: "projects",
        content: portfolio.projects
          .map(
            (project) => `
          <div class="project">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="technologies">
              ${project.technologies
                .map((tech) => `<span class="tech">${tech}</span>`)
                .join("")}
            </div>
            <div class="links">
              <a href="${project.github}" target="_blank">GitHub</a>
              <a href="${project.live}" target="_blank">Live Demo</a>
            </div>
          </div>
        `
          )
          .join(""),
      };
    case "clear":
      return {
        type: "system",
        content: "",
      };
    case "welcome":
      return {
        type: "success",
        content: `
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
        `,
      };
    default:
      return {
        type: "error",
        content: `Command '${cmd}' not found. Type 'help' to see available commands.`,
      };
  }
}
