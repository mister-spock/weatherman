// main.js
'use strict';

const {app, BrowserWindow, ipcMain, dialog} = require('electron');
let win;

function createWindow() {
    win = new BrowserWindow({ width: 200, height: 100 });

    win.loadURL(`file://${__dirname}/index.html`);
    // win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

ipcMain.on('api-error', (event, message) => {
    dialog.showErrorBox('API request error!', message);
});

ipcMain.on('icon-error', (event, message) => {
    dialog.showErrorBox('Icon fetch error!', message);
});
