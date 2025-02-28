import { app, BrowserWindow, globalShortcut, ipcMain, shell } from "electron";
import updater from "electron-simple-updater";
import { release } from "node:os";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

const platform = process.platform || os.platform();
const currentDir = fileURLToPath(new URL(".", import.meta.url));
const url = process.env.APP_URL as string;

const preload = path.resolve(
  currentDir,
  path.join(
    process.env.QUASAR_ELECTRON_PRELOAD_FOLDER as string,
    "electron-preload" + process.env.QUASAR_ELECTRON_PRELOAD_EXTENSION
  )
);

const indexHtml = "index.html";
let mainWindow: BrowserWindow | undefined;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Test",
    icon: path.resolve(currentDir, "icons/icon.png"),
    width: 1280,
    height: 720,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      preload
    }
  });

  globalShortcut.register("F5", () => {
    mainWindow?.webContents.reload();
  });

  if (process.env.DEV) {
    mainWindow.loadURL(url);
  } else {
    mainWindow.loadFile(indexHtml);
  }

  mainWindow.webContents.on("did-finish-load", async () => {
    mainWindow?.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith("https:")) shell.openExternal(url);
      return { action: "deny" };
    });
  });

  mainWindow.on("closed", () => {
    mainWindow = undefined;
  });
}

ipcMain.handle("getBuild", () => updater.buildId);

ipcMain.handle("getVersion", () => updater.version);

ipcMain.handle("checkForUpdates", () => {
  updater.checkForUpdates();
});

ipcMain.handle("downloadUpdate", () => {
  updater.downloadUpdate();
});

ipcMain.handle("quitAndInstall", () => {
  updater.quitAndInstall();
});

ipcMain.handle("setOption", (_, opt, val) => {
  updater.setOptions(opt, val);
});

app.whenReady().then(() => {
  updater.init({
    checkUpdateOnStart: false,
    autoDownload: false,
    logger: {
      info(...args) {
        console.log("info: ", args);
      },
      warn(...args) {
        console.log("warn: ", args);
      }
    }
  });
  createWindow();
});

app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.commandLine.appendSwitch("ignore-certificate-errors");
app.commandLine.appendSwitch("allow-insecure-localhost", "true");

ipcMain.handle("open-win", (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (process.env.DEV) {
    childWindow.loadURL(`${url}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
