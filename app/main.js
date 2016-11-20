// main.js
'use strict';

const
    {enquireApi, getIcon}                 = require('./core/enquire'),
    {app, BrowserWindow, ipcMain, dialog} = require('electron');

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

ipcMain.on('api-enquire', (event) => {
    enquireApi()
        .then((data) => {
            event.sender.send('api-reply', data);
        })
        .catch((err) => {
            event.sender.send('render-error');
            dialog.showErrorBox('API request error!', message);
        });
});

ipcMain.on('icon-enquire', (event, iconCode) => {
    getIcon(iconCode)
        .then((iconEncoded) => {
            event.sender.send('icon-reply', iconEncoded);
        })
        .catch((err) => {
            event.sender.send('render-error');
            dialog.showErrorBox('Icon request error!', message);
        });
});
