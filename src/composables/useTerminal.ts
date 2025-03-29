import { ref } from "vue";
import portfolioData from "../data/portfolio";
import { CommandOutput, availableCommands } from "../data/commands";

export function useTerminal() {
  const commandHistory = ref<string[]>([]);
  const outputHistory = ref<{ type: string; content: string; isError?: boolean; useTyping?: boolean }[]>([]);
  const currentCommand = ref("");
  const historyIndex = ref(-1);
  const commandSuggestions = ref<string[]>([]);

  // Add command to history
  const addToCommandHistory = (command: string) => {
    commandHistory.value.push(command);
    outputHistory.value.push({
      type: "command",
      content: command,
    });
  };

  // Add response to output history
  const addToOutputHistory = (content: string, isError = false, useTyping = true) => {
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

  // Execute command and return output
  const executeCommand = (cmd: string): CommandOutput => {
    const baseCmd = cmd.split(" ")[0];
    
    switch (baseCmd) {
      case "help":
        return {
          type: "help",
          content: availableCommands,
        };
      case "about":
        return {
          type: "about",
          content: portfolioData.about,
        };
      case "projects":
        return {
          type: "projects",
          content: portfolioData.projects
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
      case "skills":
        return {
          type: "skills",
          content: portfolioData.skills,
        };
      case "experience":
        return {
          type: "experience",
          content: portfolioData.experience,
        };
      case "education":
        return {
          type: "education",
          content: portfolioData.education,
        };
      case "contact":
        return {
          type: "contact",
          content: portfolioData.contact,
        };
      case "social":
        return {
          type: "success",
          content: portfolioData.social,
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
        if (cmd.startsWith("cat ")) {
          const fileName = cmd.substring(4).trim();
          return handleCatCommand(fileName);
        }
        return {
          type: "error",
          content: `Command '${cmd}' not found. Type 'help' to see available commands.`,
        };
    }
  };

  // Handle the cat command
  const handleCatCommand = (fileName: string): CommandOutput => {
    const normalizedFileName = fileName.toLowerCase().replace(".txt", "");

    switch (normalizedFileName) {
      case "about":
      case "projects":
      case "skills":
      case "experience":
      case "education":
      case "contact":
        return executeCommand(normalizedFileName);
      case "resume":
      case "resume.pdf":
        return {
          type: "success",
          content: 'Use the "download" command to download the resume.pdf file.',
        };
      default:
        return {
          type: "error",
          content: `Error: File '${fileName}' not found.`,
        };
    }
  };

  // Handle command execution
  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();

    if (!command) return;

    // Add the command to history
    if (command !== "welcome") {
      addToCommandHistory(command);
    }

    // Reset history index
    historyIndex.value = -1;

    // Process the command
    if (command === "clear") {
      clearTerminal();
    } else if (command === "download" || command === "download cv" || command === "download resume") {
      downloadResume();
    } else {
      const output = executeCommand(command);
      addToOutputHistory(output.content as string, output.type === "error");
    }
  };

  // Handle tab completion
  const handleTabCompletion = () => {
    const input = currentCommand.value.toLowerCase();
    if (!input) return;

    const matches = Object.keys(availableCommands).filter((cmd) =>
      cmd.startsWith(input)
    );

    if (matches.length === 1) {
      // If only one match, autocomplete
      currentCommand.value = matches[0];
      commandSuggestions.value = [];
    } else if (matches.length > 1) {
      // If multiple matches, show suggestions
      commandSuggestions.value = matches;
    } else {
      commandSuggestions.value = [];
    }
  };

  // Navigate through command history
  const navigateHistory = (direction: "up" | "down") => {
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

  const downloadResume = () => {
    addToOutputHistory("Downloading resume.pdf...");

    // Create an anchor element
    const link = document.createElement("a");
    link.href = "/src/assets/resume.pdf";
    link.download = `${portfolioData.name.replace(/\s+/g, "_")}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToOutputHistory("Resume downloaded successfully!");
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
