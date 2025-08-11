import { app, BrowserWindow, ipcMain, Task } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

const userTasks: Task[] = [
  {
    program: process.execPath,
    arguments: ". --25-minutes",
    title: "Start a 25-minute timer",
    description: "",
    iconPath: process.execPath,
    iconIndex: 0,
    workingDirectory: process.env.APP_ROOT
  },
  {
    program: process.execPath,
    arguments: ". --15-minutes",
    title: "Start a 15-minute timer",
    description: "",
    iconPath: process.execPath,
    iconIndex: 0,
    workingDirectory: process.env.APP_ROOT
  }
]

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'clock.png'),
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      devTools: !app.isPackaged
    },
    width: 500,
    height: 350,
    resizable: false,
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.setUserTasks(userTasks)

app.whenReady().then(createWindow)

ipcMain.on('set-progress-bar', (_event, progress: number) => {
  win?.setProgressBar(progress)
})

ipcMain.on('close-window', () => {
  win?.close()
})

ipcMain.on('minimize-window', () => {
  win?.minimize()
})
