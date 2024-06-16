const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  sendSearchQuery: (query) => ipcRenderer.send('search-query', query)
});

ipcRenderer.on('search-result', (event, url) => {
  const iframe = document.getElementById('contentFrame');
  iframe.src = url;
});
