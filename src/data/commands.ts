import { Experience, Education, Contact, Social } from "./portfolio";

export interface CommandOutput {
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
    | "system"
    | "education";
  content:
    | string
    | Record<string, string>
    | Record<string, string[]>
    | Experience[]
    | Education[]
    | Contact
    | Social[];
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
