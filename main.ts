import { app, BrowserWindow } from 'electron';

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1100, height: 800,
        backgroundColor: '#ffffff',
        icon: `file://${__dirname}/dist/browser/assets/icons/icon-120x120.png`
    });

    // load the dist folder from Angular
    win.loadURL(`file://${__dirname}/dist/browser/index.html`);

    // The following is optional and will open the DevTools:
    // win.webContents.openDevTools()

    win.on('closed', () => {
      win = null;
    });
}

app.on('ready', createWindow);

// on macOS, closing the window doesn't quit the app
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// initialize the app's main window
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
