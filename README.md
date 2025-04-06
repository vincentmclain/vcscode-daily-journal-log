# Daily Journal Extension

 A Visual Studio Code extension for quickly adding journal entries to daily notes.
 This is a personal project with only the options I required, feel free to take an modify to your needs.

 ## Features

 *   **Add Journal Entry:**  Adds a timestamped and properly formatted journal entry to a daily note file.
 *   **Daily Note Format:**  Daily notes are stored in a `journal/YYYY/MM/YYYY-MM-DD.md` folder structure. The extension automatically creates the `journal`, `YYYY`, and `MM` folders if they don't exis 
 *   **Automatic Formatting:** Journal entries are automatically bulleted, timestamped (24-hour format), and capitalized.
 *   **Keybinding Support:**  A keybinding (Ctrl+Shift+J or Cmd+Shift+J) is provided for quickly adding entries.
 *   **Workspace Relative Paths:** The journal directory can be specified as a path relative to the workspace root.

 ## Usage

 1.  Open the command palette (Ctrl+Shift+P or Cmd+Shift+P).
 2.  Type "Daily Journal: Add Entry" and select the command.
 3.  Enter your journal entry in the input box.
 4.  The entry will be added to the `## Log` section of your daily note file.
                                                                                                                                                                                                          
 Alternatively, use the keybinding Ctrl+Shift+J (or Cmd+Shift+J on macOS) to trigger the command.
                                                                                                                                                                                                          
 ## Configuration

 The following configuration option is available in the VS Code settings:

 *   `daily-journal.journalDirectory`: The base directory where your daily journal files are stored (e.g., `journal`). This directory will be created if it does not exist. It can be an absolute path or 
 path relative to the workspace root.  The default value is `journal`.

 ## Installation

 ### From the VS Code Marketplace (when published)
                                                                                                                                                                                                          
 1.  Open Visual Studio Code.
 2.  Go to the Extensions view (Ctrl+Shift+X or Cmd+Shift+X).
 3.  Search for "Daily Journal".
 4.  Click "Install".

 ### Local Installation (for development or testing)

 1.  Clone the repository to your local machine.
 2.  Open Visual Studio Code.
 3.  Open the cloned repository folder in VS Code.
 4.  Run `npm install` to install the dependencies.
 5.  Press F5 to start the extension in debug mode.  This will open a new VS Code window with the extension loaded.
 6.  In the debug VS Code window, open a workspace folder.
 7.  Configure the `daily-journal.journalDirectory` setting in your workspace settings (File -> Preferences -> Settings, then search for "Daily Journal").
 8.  Test the extension by using the command palette or the keybinding.

 ## Known Issues
                                                                                                                                                                                                          
 *   None at this time.
                                                                                                                                                                                                          
 ## Release Notes
                                                                                                                                                                                                          
 ### 0.0.1
                                                                                                                                                                                                          
 *   Initial release.
                                                                                                                                                                                                          
 ## Contributing

 Contributions are welcome! Please submit a pull request.
