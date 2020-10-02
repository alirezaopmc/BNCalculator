const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const { ipcMain } = require('electron');

let mainWindow;
let integralWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 560,
    frame: false,
    resizable: false,
    webPreferences: { nodeIntegration: true },
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  //   mainWindow.removeMenu();
  mainWindow.on('closed', () => (mainWindow = null));
}

function createIntegralWindow() {
  integralWindow = new BrowserWindow({
    width: 400,
    height: 560,
    frame: true,
    webPreferences: { nodeIntegration: true },
  });
  integralWindow.loadURL(
    isDev
      ? 'http://localhost:3000/integral'
      : `file://${path.join(__dirname, '../build/index.html#integral')}`
  );
  integralWindow.on('closed', () => (mainWindow = null));
  integralWindow.removeMenu();
}

ipcMain.on('openIntegralWindow', () => {
  createIntegralWindow();
});

ipcMain.on('resizeWindow', (e, deg) => {
  if (deg < 300) {
    integralWindow.setFullScreen(false);
    integralWindow.setSize(400 + deg * 2, 560 + deg * 2);
  } else integralWindow.setFullScreen(true);
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('close-me', (e, args) => {
  app.quit();
});

ipcMain.on('minimize-me', (e, args) => {
  mainWindow.minimize();
});
