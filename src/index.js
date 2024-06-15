const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hiddenInset',
    icon: path.join(__dirname, 'assets', 'icon.png')
  });

  win.loadURL("https://social.faysi.de/");

  // Erstelle das Dropdown-Menü
  const menuTemplate = [
    {
      label: 'Navigation',
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
          label: 'Ai',
          click: () => { win.loadURL("https://ai.faysi.de"); }
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
