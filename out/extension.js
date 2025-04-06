"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const fs = __importStar(require("fs")); // Import the 'fs' module
const vscode = __importStar(require("vscode"));
function capitalize(text) {
    if (!text) {
        return text;
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
}
function activate(context) {
    let disposable = vscode.commands.registerCommand('daily-journal.addEntry', async () => {
        const today = new Date();
        const year = String(today.getFullYear());
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const filename = `${year}-${month}-${day}.md`;
        //Configuration for the journal location
        const journalLocation = vscode.workspace.getConfiguration('daily-journal').get('journalDirectory');
        if (!journalLocation) {
            vscode.window.showErrorMessage('Journal directory not set. Please configure in settings.');
            return;
        }
        let journalRootPath;
        if (journalLocation.startsWith('/') || journalLocation.match(/^[A-Za-z]:\\/)) {
            // Absolute path
            journalRootPath = journalLocation;
        }
        else {
            // Relative path
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (!workspaceFolders) {
                vscode.window.showErrorMessage('No workspace folder open.');
                return;
            }
            const workspaceRoot = workspaceFolders[0].uri.fsPath;
            journalRootPath = `${workspaceRoot}/${journalLocation}`;
        }
        // Create the year and month directories if they don't exist
        const yearDirPath = `${journalRootPath}/${year}`;
        const monthDirPath = `${yearDirPath}/${month}`;
        // Create directories recursively
        [journalRootPath, yearDirPath, monthDirPath].forEach(dirPath => {
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath); // Create the directory
            }
        });
        const filePath = vscode.Uri.file(`${monthDirPath}/${filename}`);
        try {
            let fileContent;
            try {
                const file = await vscode.workspace.fs.readFile(filePath);
                fileContent = Buffer.from(file).toString('utf8');
            }
            catch (error) {
                //File does not exist
                fileContent = ''; // Handle the case where the file doesn't exist
            }
            const logSection = '## Log';
            const logIndex = fileContent.indexOf(logSection);
            if (logIndex === -1) {
                vscode.window.showErrorMessage('## Log section not found in daily note.');
                return;
            }
            const entry = await vscode.window.showInputBox({ prompt: 'Enter journal entry:' });
            if (!entry) {
                return; // User cancelled
            }
            const capitalizedEntry = capitalize(entry);
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const time = `${hours}:${minutes}`;
            const newEntry = `* ${time} - ${capitalizedEntry}.\n`;
            // Find the position to insert the new entry. Insert after the ## Log line
            const insertPosition = new vscode.Position(fileContent.substring(0, logIndex + logSection.length).split('\n').length, 0);
            const edit = new vscode.WorkspaceEdit();
            //edit.insert(filePath, insertPosition, '\n' + newEntry);
            edit.insert(filePath, insertPosition, newEntry);
            await vscode.workspace.applyEdit(edit);
            vscode.window.showInformationMessage('Journal entry added!');
        }
        catch (err) {
            vscode.window.showErrorMessage(`Error adding journal entry: ${err}`);
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map