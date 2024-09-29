import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enavled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    // TODO: add your preload functions here
  })
} catch (error) {
  console.error(error)
}

try {
  contextBridge.exposeInMainWorld('electronAPI', {
    closeWindow: () => ipcRenderer.send('window-close'),
    minimizeWindow: () => ipcRenderer.send('window-minimize'),
    maximizeWindow: () => ipcRenderer.send('window-maximize')
  })
} catch (error) {
  console.error(error)
}
