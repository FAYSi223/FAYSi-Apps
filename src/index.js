const { app, BrowserWindow, Menu, dialog, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hiddenInset',
    icon: path.join(__dirname, 'assets', 'icon.ico'), // Pfad zum Icon hier angegeben
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadURL("https://faysi.de/");

  const menuTemplate = [
    {
      label: 'More',
      submenu: [
        { label: 'Home', click: () => { win.loadURL("https://faysi.de/"); } },
        { label: 'Social', click: () => { win.loadURL("https://social.faysi.de"); } },
        { label: 'App Store', click: () => { win.loadURL("https://apps.faysi.de"); } },
        { label: 'AI', click: () => { win.loadURL("https://ai.faysi.de"); } },
        { type: 'separator' },
        { label: 'Check for Updates', click: () => { checkForUpdates(); } },
        { label: 'Info', click: () => { showAppInfo(); } },
        { type: 'separator' },
        { label: 'Exit', click: () => { app.quit(); } }
      ]
    },
    {
      label: 'Info',
      submenu: [
        {
          label: 'About Creator',
          click: () => {
            dialog.showMessageBox(win, {
              type: 'info',
              title: 'Creator Info',
              message: 'The creator of FAYSi-App is FAYSi. For more information, visit our website.'
            });
          }
        },
        {
          label: 'Contact',
          click: () => {
            dialog.showMessageBox(win, {
              type: 'info',
              title: 'Contact Creator',
              message: 'You can contact the creator at support@faysi.de.'
            });
          }
        },
        {
          label: 'Share Apps',
          click: () => {
            const newWin = new BrowserWindow({
              width: 800,
              height: 600,
              titleBarStyle: 'hiddenInset',
              icon: path.join(__dirname, 'assets', 'icon.ico'),
              webPreferences: {
                preload: path.join(__dirname, 'preload.js')
              }
            });
            newWin.loadURL("https://faysi.de/files/download.exe");
          }
        },
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  function checkForUpdates() {
    dialog.showMessageBox(win, {
      type: 'info',
      title: 'Check for Updates',
      message: 'Check Updates is not here'
    });
  }

  function showAppInfo() {
    dialog.showMessageBox(win, {
      type: 'info',
      title: 'App Info',
      message: 'This App is the Official App from FAYSi | App Version: 1.0.1'
    });
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
