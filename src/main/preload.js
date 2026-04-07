const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  saveProject: (data) => ipcRenderer.invoke('save-project', data),
  loadProject: () => ipcRenderer.invoke('load-project'),
  exportMod: (data) => ipcRenderer.invoke('export-mod', data),
  buildCheck: (data) => ipcRenderer.invoke('build-check', data),
  onBuildProgress: (callback) => {
    const listener = (event, msg) => callback(msg);
    ipcRenderer.on('build-progress', listener);
    return () => ipcRenderer.removeListener('build-progress', listener);
  }
});
