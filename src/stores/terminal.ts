import { defineStore } from "pinia";
import { ref } from "vue";
import { availableCommands } from "../data/commands";
import { portfolio } from "../data/portfolio";
import type { CommandOutput } from "../data/commands";

interface HistoryEntry {
  command: string;
  output: CommandOutput;
}

export const useTerminalStore = defineStore("terminal", () => {
  // State
  const history = ref<HistoryEntry[]>([]);
  const currentCommand = ref<string>("");
  const historyIndex = ref<number>(-1);
  const cursorVisible = ref<boolean>(true);
  const cursorPosition = ref<number>(0);
  const commandSuggestions = ref<string[]>([]);
  let focusFunction: (() => void) | null = null;
  let cursorInterval: number | null = null;

  // Search mode state
  const searchMode = ref<boolean>(false);
  const searchQuery = ref<string>("");
  const searchResults = ref<HistoryEntry[]>([]);
  const selectedSearchResult = ref<number>(-1);

  // Cursor management
  function stopCursorBlink(): void {
    if (cursorInterval) {
      clearInterval(cursorInterval);
      cursorInterval = null;
    }
    cursorVisible.value = false;
  }

  function startCursorBlink(): void {
    if (cursorInterval) {
      clearInterval(cursorInterval);
    }
    cursorVisible.value = true;
    cursorInterval = window.setInterval(() => {
      cursorVisible.value = !cursorVisible.value;
    }, 500);
  }

  // Command execution
  function executeCommand(cmd: string): CommandOutput {
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
      case "skills":
        return {
          type: "skills",
          content: portfolio.skills,
        };
      case "experience":
        return {
          type: "experience",
          content: portfolio.experience,
        };
      case "education":
        return {
          type: "education",
          content: portfolio.education,
        };
      case "contact":
        return {
          type: "contact",
          content: portfolio.contact,
        };
      case "social":
        return {
          type: "success",
          content: portfolio.social,
        };
      case "clear":
        return {
          type: "system",
          content: "",
        };
      default:
        if (cmd.startsWith("cat "))
          return handleCatCommand(cmd.substring(4).trim());
        return {
          type: "error",
          content: `Command '${cmd}' not found. Type 'help' to see available commands.`,
        };
    }
  }

  function handleCatCommand(fileName: string): CommandOutput {
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
          content:
            'Use the "download" command to download the resume.pdf file.',
        };
      default:
        return {
          type: "error",
          content: `Error: File '${fileName}' not found.`,
        };
    }
  }

  function handleCommand(cmd: string): void {
    const normalizedCmd = cmd.trim().toLowerCase();
    if (!normalizedCmd) return;

    if (normalizedCmd === "clear") {
      history.value = [];
      currentCommand.value = "";
      historyIndex.value = -1;
      cursorPosition.value = 0;
      return;
    }

    if (
      normalizedCmd === "download" ||
      normalizedCmd === "download cv" ||
      normalizedCmd === "download resume"
    ) {
      downloadResume();
      return;
    }

    const output = executeCommand(normalizedCmd);
    history.value.push({
      command: cmd,
      output: output,
    });

    currentCommand.value = "";
    historyIndex.value = -1;
    cursorPosition.value = 0;
    startCursorBlink();
  }

  function downloadResume(): void {
    const link = document.createElement("a");
    link.href = "/src/assets/resume.pdf";
    link.download = `${portfolio.name.replace(/\s+/g, "_")}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // History navigation
  function navigateHistory(direction: "up" | "down"): void {
    if (history.value.length === 0) return;

    if (direction === "up") {
      if (historyIndex.value < history.value.length - 1) {
        historyIndex.value++;
        currentCommand.value =
          history.value[history.value.length - 1 - historyIndex.value].command;
      }
    } else if (direction === "down") {
      if (historyIndex.value > 0) {
        historyIndex.value--;
        currentCommand.value =
          history.value[history.value.length - 1 - historyIndex.value].command;
      } else if (historyIndex.value === 0) {
        historyIndex.value = -1;
        currentCommand.value = "";
      }
    }
  }

  // Tab completion
  function handleTabCompletion(): void {
    if (!currentCommand.value) return;
    const input = currentCommand.value.toLowerCase();
    const matches = Object.keys(availableCommands).filter((cmd) =>
      cmd.startsWith(input)
    );

    if (matches.length === 1) {
      currentCommand.value = matches[0];
      commandSuggestions.value = [];
    } else if (matches.length > 1) {
      commandSuggestions.value = matches;
    } else {
      commandSuggestions.value = [];
    }
  }

  // Search functionality
  function startHistorySearch(): void {
    searchMode.value = true;
    searchQuery.value = currentCommand.value;
    performHistorySearch();

    if (currentCommand.value === "history") {
      history.value.push({
        command: "history",
        output: {
          type: "history",
          content: "Searching command history...",
        },
      });
      currentCommand.value = "";
      historyIndex.value = -1;
      cursorPosition.value = 0;
    }
  }

  function performHistorySearch(): void {
    if (!searchQuery.value) {
      searchResults.value = [...history.value].reverse();
      return;
    }

    const query = searchQuery.value.toLowerCase();
    searchResults.value = history.value
      .filter((item) => item.command.toLowerCase().includes(query))
      .reverse();
    selectedSearchResult.value = searchResults.value.length > 0 ? 0 : -1;
  }

  function exitSearchMode(): void {
    searchMode.value = false;
    searchQuery.value = "";
    searchResults.value = [];
    selectedSearchResult.value = -1;
    if (focusFunction) {
      focusFunction();
    }
    startCursorBlink();
  }

  function useSearchResult(): void {
    if (
      selectedSearchResult.value >= 0 &&
      selectedSearchResult.value < searchResults.value.length
    ) {
      currentCommand.value =
        searchResults.value[selectedSearchResult.value].command;
      cursorPosition.value = currentCommand.value.length;
    }
    exitSearchMode();
  }

  // Focus management
  function focusInput(): void {
    if (focusFunction) {
      focusFunction();
    }
    startCursorBlink();
  }

  function setFocusFunction(fn: () => void): void {
    focusFunction = fn;
  }

  function updateCursorPosition(position: number): void {
    cursorPosition.value = position;
  }

  return {
    // State
    history,
    currentCommand,
    cursorVisible,
    cursorPosition,
    commandSuggestions,
    searchMode,
    searchQuery,
    searchResults,
    selectedSearchResult,
    historyIndex,

    // Methods
    handleCommand,
    executeCommand,
    navigateHistory,
    handleTabCompletion,
    focusInput,
    setFocusFunction,
    startCursorBlink,
    stopCursorBlink,
    updateCursorPosition,
    startHistorySearch,
    performHistorySearch,
    exitSearchMode,
    useSearchResult,
  };
});
