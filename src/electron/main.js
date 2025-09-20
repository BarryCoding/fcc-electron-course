import { app, BrowserWindow } from 'electron'
import path from 'path'

app.whenReady().then(() => {
  // Create a new browser window with specified width and height
  const mainWindow = new BrowserWindow({
    width: 800, // Set the window width to 800 pixels
    height: 600, // Set the window height to 600 pixels
  })

  // Build the absolute path to the index.html file in the dist-react directory
  const html = path.join(app.getAppPath(), 'dist-react/index.html')

  // Load the HTML file into the browser window
  mainWindow.loadFile(html)

  // Open the DevTools in a separate (detached) window for debugging
  mainWindow.webContents.openDevTools({ mode: 'detach' })

  // Listen for the 'closed' event and set mainWindow to null when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

// Listen for the 'window-all-closed' event, which is emitted when all windows are closed
app.on('window-all-closed', () => {
  // On macOS, it's common for applications to stay active until the user explicitly quits
  // On platforms other than macOS (darwin), quit the application when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
