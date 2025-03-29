import { defineStore } from "pinia";
import { ref } from "vue";
import {
  availableCommands,
  executeCommand as executeCommandFromData,
} from "../data/commands";

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
  const cursorPosition = ref<number>(0); // Track cursor position for left/right keys
  let focusFunction: (() => void) | null = null;
  let cursorInterval: number | null = null;

  // Start cursor blinking with a persistent interval
  function startCursorBlink(): void {
    // Clear any existing interval to prevent duplicates
    if (cursorInterval) {
      clearInterval(cursorInterval);
    }

    // Set cursor to visible initially
    cursorVisible.value = true;

    // Create a new persistent blinking interval
    cursorInterval = window.setInterval(() => {
      cursorVisible.value = !cursorVisible.value;
    }, 500);
  }

  // Start the cursor blinking right away
  startCursorBlink();

  // Command execution
  function executeCommand(cmd: string): void {
    const normalizedCmd = cmd.trim().toLowerCase();

    // Handle clear command specifically in the store
    if (normalizedCmd === "clear") {
      // Clear history directly
      history.value = [];
      currentCommand.value = "";
      historyIndex.value = -1;
      cursorPosition.value = 0;
      return;
    }

    const output = getCommandOutput(normalizedCmd);

    // Add to history
    history.value.push({
      command: cmd,
      output: output,
    });

    // Reset command, history navigation and cursor position
    currentCommand.value = "";
    historyIndex.value = -1;
    cursorPosition.value = 0;

    // Ensure cursor keeps blinking after command execution
    startCursorBlink();
  }

  // Get command output based on input
  function getCommandOutput(cmd: string): CommandOutput {
    // Extract the base command (before any arguments)
    const baseCmd = cmd.split(" ")[0];

    // Check if command exists and execute
    return executeCommandFromData(cmd, baseCmd);
  }

  // Navigate through command history
  function navigateHistory(direction: number): void {
    if (history.value.length === 0) return;

    // Flip the direction for more intuitive behavior
    // Up key (direction -1) should get older commands (higher index)
    // Down key (direction 1) should get newer commands (lower index)
    const adjustedDirection = -direction;

    // Calculate new index
    const newIndex = historyIndex.value + adjustedDirection;

    // Bounds check
    if (newIndex >= -1 && newIndex < history.value.length) {
      historyIndex.value = newIndex;

      if (newIndex === -1) {
        // At the newest history position, show empty command
        currentCommand.value = "";
        cursorPosition.value = 0;
      } else {
        // Show historical command
        const historyCommand =
          history.value[history.value.length - 1 - newIndex].command;
        currentCommand.value = historyCommand;
        // Set cursor position to the end of the command
        cursorPosition.value = historyCommand.length;
      }
    }
  }

  // Handle tab completion
  function handleTabCompletion(): void {
    if (!currentCommand.value) return;

    const input = currentCommand.value.toLowerCase();

    // Find potential matches
    const matches = Object.keys(availableCommands).filter((cmd) =>
      cmd.startsWith(input)
    );

    if (matches.length === 1) {
      // Exact match found
      currentCommand.value = matches[0];
    } else if (matches.length > 1) {
      // Multiple matches, show them
      const output: CommandOutput = {
        type: "success",
        content: `<div>Available commands:</div><div>${matches.join(
          ", "
        )}</div>`,
      };

      history.value.push({
        command: currentCommand.value,
        output: output,
      });
    }
  }

  // Focus the input element
  function focusInput(): void {
    if (focusFunction) {
      focusFunction();
    }

    // Restart cursor blink when focusing
    startCursorBlink();
  }

  // Set the focus function from the component
  function setFocusFunction(fn: () => void): void {
    focusFunction = fn;
  }

  // Update cursor position for left/right arrow navigation
  function updateCursorPosition(position: number): void {
    cursorPosition.value = position;
  }

  // Add to history without executing (for Ctrl+C and other special cases)
  function addToHistory(cmd: string, output: CommandOutput): void {
    history.value.push({
      command: cmd,
      output: output,
    });
  }

  // For history search with Ctrl+R or history command
  const searchMode = ref<boolean>(false);
  const searchQuery = ref<string>("");
  const searchResults = ref<HistoryEntry[]>([]);
  const selectedSearchResult = ref<number>(-1);

  // Start history search mode (Ctrl+R or history command)
  function startHistorySearch(): void {
    searchMode.value = true;
    searchQuery.value = currentCommand.value;
    performHistorySearch();

    // Add to history if it was triggered by the history command
    if (currentCommand.value === "history") {
      const output: CommandOutput = {
        type: "history",
        content: "Searching command history...",
      };

      history.value.push({
        command: "history",
        output: output,
      });

      // Clear current command
      currentCommand.value = "";
      historyIndex.value = -1;
      cursorPosition.value = 0;
    }
  }

  // Perform the actual history search with fuzzy matching
  function performHistorySearch(): void {
    if (!searchQuery.value) {
      searchResults.value = [...history.value].reverse();
      return;
    }

    const query = searchQuery.value.toLowerCase();
    searchResults.value = history.value
      .filter((item) => item.command.toLowerCase().includes(query))
      .reverse(); // Most recent first

    selectedSearchResult.value = searchResults.value.length > 0 ? 0 : -1;
  }

  // Exit search mode
  function exitSearchMode(): void {
    searchMode.value = false;
    searchQuery.value = "";
    searchResults.value = [];
    selectedSearchResult.value = -1;
  }

  // Use selected search result
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

  return {
    history,
    currentCommand,
    cursorVisible,
    cursorPosition,
    executeCommand,
    navigateHistory,
    handleTabCompletion,
    focusInput,
    setFocusFunction,
    startCursorBlink,
    updateCursorPosition,
    addToHistory,
    searchMode,
    searchQuery,
    searchResults,
    selectedSearchResult,
    startHistorySearch,
    performHistorySearch,
    exitSearchMode,
    useSearchResult,
  };
});
