const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    // Invoke Methods
    userDetails: (args) => ipcRenderer.invoke('user-details', args),
    verifyToken: (args) => ipcRenderer.invoke("verify-token",args),
    materialDetails: () => ipcRenderer.invoke('material-details'),
    allStocks: () => ipcRenderer.invoke('all-stocks'),
    stockDetail: (args) => ipcRenderer.invoke('stock-detail', args),
    materialConsumed: () => ipcRenderer.invoke('material-consumed'),
    addMaterial: (args) => ipcRenderer.invoke('add-material', args),
    addStock: (args) => ipcRenderer.invoke('add-stock', args),
    updateStock: (args) => ipcRenderer.invoke('update-stock', args),
    addDispatchMaterial: (args) => ipcRenderer.invoke('add-dispatchMaterial', args),
    allWorkers: () => ipcRenderer.invoke('all-workers'),
    addWorker: (args) => ipcRenderer.invoke('add-worker', args),
    updateWorker: (args) => ipcRenderer.invoke('update-worker', args),
    deleteWorker: (args) => ipcRenderer.invoke('delete-worker', args),
    workerPpe: (args) => ipcRenderer.invoke('worker-ppe', args),
    addPpe: (args) => ipcRenderer.invoke('add-ppe', args),
    safetyObservations: (args) => ipcRenderer.invoke('safety-observations', args),
    addSafety: (args) => ipcRenderer.invoke('add-safety', args),
    updateSafety: (args) => ipcRenderer.invoke('update-safety', args),
    vehicleData: () => ipcRenderer.invoke('all-vehicle-data'),
    vehicleEntry: () => ipcRenderer.invoke('all-vehicle-entry'),
    addVehicleData: (args) => ipcRenderer.invoke('add-vehicle-data', args),
    updateVehicleData: (args) => ipcRenderer.invoke('update-vehicle-data', args),
    addVehicleEntry: (args) => ipcRenderer.invoke('add-vehicle-entry', args),
    updateVehicleEntry: (args) => ipcRenderer.invoke('update-vehicle-entry', args),
    rentalItems: () => ipcRenderer.invoke('all-rentalItems'),
    addRentalItem: (args) => ipcRenderer.invoke('add-rentalItem', args),
    updateRentalItem: (args) => ipcRenderer.invoke('update-rentalItem', args),
    // Send Methods
    testSend: (args) => ipcRenderer.send('test-send'),
    // Receive Methods
    testReceive: (callback) => ipcRenderer.on('test-receive', (event, data) => { callback(data) })
});