const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    on: (channel, callback) => {
        ipcRenderer.on(channel, callback);
    },

    send: (channel, args) => {
        ipcRenderer.send(channel, args);
    },

    saveData: (data) => {
        ipcRenderer.send('saveData', data);
    },

    readData: (data) => {
        ipcRenderer.send('readData', data);
    },

    connectToDb: () => {
      return ipcRenderer.sendSync('connectToDb');
    },

    getDbData: () => {
      return ipcRenderer.sendSync('getDbData')
    },

    getMergedByTourData: () => {
      return ipcRenderer.sendSync('getDbTourData');
    },

    getIsFirstUse: () => {
      return ipcRenderer.sendSync('first-use');
    },

    loadDbData: (requestedData) => {

      switch(requestedData) {
        case 'hands':
          return ipcRenderer.sendSync('load/db/hands');
        case 'tours':
          return ipcRenderer.sendSync('load/db/tours');
        case 'players':
          return ipcRenderer.sendSync('load/db/players');
        case 'mergedHands':
          return ipcRenderer.sendSync('load/db/mergedHands');
        default:
          return 'Invalid request';
      }
    }
    

});