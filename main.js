const { app, BrowserWindow, screen, ipcMain, Tray, Menu } = require('electron');
const path = require('path');

require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

let win;
let tray;
let isClickThrough = true;

function createTray() {
  tray = new Tray(path.join(__dirname, 'assets', 'icon.png'));
  
  const contextMenu = Menu.buildFromTemplate([
    { 
      label: 'Show/Hide', 
      click: () => {
        if (win.isVisible()) {
          win.hide();
        } else {
          win.show();
        }
      }
    },
    { type: 'separator' },
    { 
      label: 'Quit', 
      click: () => {
        app.quit();
      }
    }
  ]);

  tray.setToolTip('Virtual Pet');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
    }
  });
}

function createWindow() {
  const currentDisplay = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
  const { width, height } = currentDisplay.bounds;
  
  win = new BrowserWindow({
    width: width,
    height: height,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    fullscreen: true,
    fullscreenable: false,
    maximizable: false,
    minimizable: false,
    movable: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.setIgnoreMouseEvents(true, { forward: true });
  //win.webContents.openDevTools()
  win.loadFile(path.join(__dirname, 'src', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

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

// ipcMain.on('toggle-click', () => {
//   isClickThrough = !isClickThrough;
//   win.setIgnoreMouseEvents(isClickThrough, { forward: true });
//   console.log(`[Mouse] Click-through durumu: ${isClickThrough}`);
// });
