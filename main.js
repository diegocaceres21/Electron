const { app, BrowserWindow } = require("electron");
const path = require('path');
const url = require('url');

const electronReload = require('electron-reload');
let appWin;

createWindow = () => {
    appWin = new BrowserWindow({
        fullscreen: true,
        title: "Angular and Electron",
        resizable: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });
    
    electronReload(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
      });
    
    appWin.loadURL(`file://${__dirname}/dist/index.html`);

    appWin.setMenu(null);

    //appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});