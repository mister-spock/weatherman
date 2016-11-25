// main.js
'use strict';

const
    iconCache                             = require('./core/localcache').getInstance(),
    {enquireApi, getIcon}                 = require('./core/enquire'),
    {app, BrowserWindow, ipcMain, dialog} = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({
        width           : 196,
        height          : 95,
        resizable       : false,
        titleBarStyle   : 'hidden',
        useContentSize  : true,
        backgroundColor : '#161e35'
    });

    win.loadURL(`file://${__dirname}/index.html`);

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
            dialog.showErrorBox('API request error!', err.message);
        });
});

ipcMain.on('icon-enquire', (event, iconCode) => {
    let cachedIcon = iconCache.get(iconCode);

    if (cachedIcon) {
        event.sender.send('icon-reply', cachedIcon);
    }

    getIcon(iconCode)
        .then((iconEncoded) => {
            event.sender.send('icon-reply', iconEncoded);
            iconCache.set(iconCode, iconEncoded);
        })
        .catch((err) => {
            event.sender.send('render-error');
            dialog.showErrorBox('Icon request error!', err.message);
        });
});
