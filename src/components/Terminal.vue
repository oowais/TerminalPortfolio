<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import CommandPrompt from "./CommandPrompt.vue";
import CommandOutput from "./CommandOutput.vue";
import CommandHistory from "./CommandHistory.vue";
import { useTerminalStore } from "../stores/terminal";
import { availableCommands } from "../data/commands";

const terminalStore = useTerminalStore();
const terminal = ref(null);
const commandPromptRef = ref(null);
const isFocused = ref(false);

const setFocus = () => {
  isFocused.value = true;
  terminalStore.focusInput();
  terminalStore.startCursorBlink();
};

const handleBlur = () => {
  isFocused.value = false;
};

const handleKeyDown = (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    terminalStore.handleTabCompletion();
  }
};

// Focus the terminal when clicked anywhere in the terminal window
const handleTerminalClick = (e) => {
  e.stopPropagation();
  // Prevent refocusing if clicking on an input or button
  const target = e.target;
  const tagName = target.tagName.toLowerCase();
  if (tagName !== "input" && tagName !== "button" && tagName !== "a") {
    setFocus();
  }
};

// Handle global key events
const handleGlobalKeyDown = (e) => {
  if (e.key === "l" && e.ctrlKey) {
    e.preventDefault();
    terminalStore.executeCommand("clear");
  }
};

// Track if user is actively scrolling
const userScrolled = ref(false);
const scrollTimeout = ref(null);

// Function to check if user has manually scrolled up
const checkUserScroll = () => {
  if (terminal.value) {
    const terminalContent = terminal.value.querySelector(".terminal-content");
    if (terminalContent) {
      // Check if user has scrolled up from bottom
      const isScrolledUp =
        terminalContent.scrollHeight - terminalContent.scrollTop >
        terminalContent.clientHeight + 50;
      userScrolled.value = isScrolledUp;
    }
  }
};

// Reset userScrolled after a delay of inactivity
const resetUserScrollFlag = () => {
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }
  scrollTimeout.value = setTimeout(() => {
    userScrolled.value = false;
  }, 60000); // Reset after 1 minute of inactivity
};

// Improved scroll-to-bottom function with better reliability
const scrollToBottom = () => {
  // Only auto-scroll if user hasn't manually scrolled up
  if (userScrolled.value) return;

  // We need multiple levels of nextTick to ensure DOM is fully updated
  nextTick(() => {
    nextTick(() => {
      if (terminal.value) {
        const terminalContent =
          terminal.value.querySelector(".terminal-content");
        if (terminalContent) {
          // Force scroll to bottom with a small delay to ensure content is fully rendered
          setTimeout(() => {
            // Force scroll to the absolute bottom
            const scrollHeight = terminalContent.scrollHeight;
            terminalContent.scrollTop = scrollHeight + 1000; // Add extra to ensure it goes all the way down
          }, 10);
        }
      }
    });
  });
};

onMounted(() => {
  setFocus();
  window.addEventListener("keydown", handleGlobalKeyDown);

  // Listen for command execution to force scroll to bottom
  window.addEventListener("command-executed", () => {
    // Reset user scroll flag when executing a command
    userScrolled.value = false;
    resetUserScrollFlag();

    // Use multiple scroll attempts for reliability
    scrollToBottom();
    setTimeout(scrollToBottom, 100);
    setTimeout(scrollToBottom, 300);
  });

  // Force a reliable scroll to bottom whenever history changes
  watch(
    () => terminalStore.history.length,
    () => {
      scrollToBottom();
      // Additional delayed scroll for reliability
      setTimeout(scrollToBottom, 100);
    },
    { immediate: true }
  );

  // Also watch for changes in current command
  watch(
    () => terminalStore.currentCommand,
    () => {
      // Reset scroll behavior when typing any command
      userScrolled.value = false;
      resetUserScrollFlag();
      scrollToBottom();
    }
  );

  // Set up observer after component is fully mounted
  nextTick(() => {
    if (terminal.value) {
      const contentObserver = new MutationObserver(() => {
        scrollToBottom();
      });

      contentObserver.observe(terminal.value, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
      });
    }
  });

  // Initial scroll to bottom
  scrollToBottom();
  setTimeout(scrollToBottom, 500); // Extra scroll after initial render
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleGlobalKeyDown);
  window.removeEventListener("command-executed", scrollToBottom);
});
</script>

<template>
  <div
    class="terminal"
    ref="terminal"
    :class="{ focused: isFocused }"
    @click="handleTerminalClick"
    @keydown="handleKeyDown"
    tabindex="0"
    @blur="handleBlur"
  >
    <div class="terminal-header">
      <div class="terminal-controls">
        <span class="control close"></span>
        <span class="control minimize"></span>
        <span class="control maximize"></span>
      </div>
      <div class="terminal-title">user@portfolio: ~/</div>
    </div>
    <div class="terminal-content" @scroll="checkUserScroll">
      <div class="welcome-message">
        <pre style="padding-top: 10px; padding-bottom: 10px">
  _______                  _             _   ______           _    __      _ _       
 |__   __|                (_)           | | |  ____|         | |  / _|    | (_)      
    | | ___ _ __ _ __ ___  _ _ __   __ _| | | |__   ___  _ __| |_| |_ ___ | |_  ___  
    | |/ _ \ '__| '_ ` _ \| | '_ \ / _` | | |  __| / _ \| '__| __|  _/ _ \| | |/ _ \ 
    | |  __/ |  | | | | | | | | | | (_| | | | |   | (_) | |  | |_| || (_) | | | (_) |
    |_|\___|_|  |_| |_| |_|_|_| |_|\__,_|_| |_|    \___/|_|   \__|_| \___/|_|_|\___/ 

    
        </pre>
        <p>Welcome to my interactive terminal portfolio!</p>
        <p>Type 'help' to see available commands.</p>
      </div>
      <CommandHistory />
      <CommandPrompt ref="commandPromptRef" />
    </div>
  </div>
</template>

<style>
.terminal {
  width: 100%;
  max-width: 900px;
  height: 80vh;
  max-height: 600px;
  background-color: #282a36;
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  cursor: text;
}

.terminal.focused {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

.terminal-header {
  height: 30px;
  background-color: #1e1e2e;
  display: flex;
  align-items: center;
  padding: 0 12px;
  user-select: none;
  cursor: default;
}

.terminal-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
}

.close {
  background-color: #ff5f56;
}

.minimize {
  background-color: #ffbd2e;
}

.maximize {
  background-color: #27c93f;
}

.terminal-title {
  font-size: 14px;
  color: #f8f8f2;
  margin: 0 auto;
  font-family: "JetBrains Mono", monospace;
}

.terminal-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: "JetBrains Mono", monospace;
  color: #f8f8f2;
  background-color: #282a36;
  scroll-behavior: smooth; /* Smooth scrolling */
}

.welcome-message {
  margin-bottom: 20px;
}

.welcome-message pre {
  color: #50fa7b;
  font-size: 12px;
  line-height: 1;
  margin: 0;
  white-space: pre;
  overflow-x: auto;
}

.welcome-message p {
  color: #bd93f9;
  margin: 8px 0;
}

@media (max-width: 768px) {
  .terminal {
    height: 90vh;
    max-height: none;
    border-radius: 0;
  }

  .welcome-message pre {
    font-size: 8px;
  }
}

/* For small mobile screens */
@media (max-width: 480px) {
  .welcome-message pre {
    display: none;
  }
}
</style>
