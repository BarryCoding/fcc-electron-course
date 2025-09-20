import { app, BrowserWindow } from 'electron'
import path from 'path'
import { DEV_SERVER_URL, IS_DEV, REACT_ENTRY_HTML } from './util.js'
import { pollResources } from './resource-manager.js'
import { getPreloadPath } from './path-resolver.js'

const createWindow = () => {
  // Create a new browser window with specified width and height
  let mainWindow: BrowserWindow | null = new BrowserWindow({
    width: 800, // Set the window width to 800 pixels
    height: 600, // Set the window height to 600 pixels
    webPreferences: {
      preload: getPreloadPath(),
    },
  })

  if (IS_DEV) {
    // Load the React app from the development server
    mainWindow.loadURL(DEV_SERVER_URL)

    // Open the DevTools in a separate (detached) window for debugging
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    // Build the absolute path to the index.html file in the dist-react directory
    const html = path.join(app.getAppPath(), REACT_ENTRY_HTML)

    // Load the HTML file into the browser window
    mainWindow.loadFile(html)
  }

  // Listen for the 'closed' event and set mainWindow to null when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()

  pollResources()
})

// Listen for the 'activate' event on macOS
app.on('activate', () => {
  // On macOS, re-create a window when the dock icon is clicked and no other windows are open
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
