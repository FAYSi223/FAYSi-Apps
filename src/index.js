const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hiddenInset',
    icon: path.join(__dirname, 'assets', 'icon.png')
  });

  win.loadURL("https://faysi.de/");

  // Erstelle das Dropdown-Menü
  const menuTemplate = [
    {
      label: 'More',
      submenu: [
        {
          label: 'Home',
          click: () => { win.loadURL("https://faysi.de/"); }
        },
        {
          label: 'Social',
          click: () => { win.loadURL("https://social.faysi.de"); }
        },
        {
          label: 'App Store',
          click: () => { win.loadURL("https://apps.faysi.de"); }
        },
        {
          label: 'AI',
          click: () => { win.loadURL("https://ai.faysi.de"); }
        },
        {
          type: 'separator'
        },
        {
          label: 'Check for Updates',
          click: () => { checkForUpdates(); }
        },
        {
          label: 'Info',
          click: () => { showAppInfo(); }
        },
        {
          type: 'separator'
        },
        {
          label: 'Exit',
          click: () => { app.quit(); }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  function checkForUpdates() {
    dialog.showMessageBox(win, {
      type: 'info',
      title: 'Check for Updates',
      message: 'Check Updates is not here '
    });
  }

  function showAppInfo() {
    dialog.showMessageBox(win, {
      type: 'info',
      title: 'App Info',
      message: 'This App is the Offical App from FAYSi | App Version : 1.0.1'
    });
  }
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
