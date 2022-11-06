const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
 
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

function display(){
  var u_name = document.getElementById("city").value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${u_name}&appid=9fd7a449d055dba26a982a3220f32aa2`)
  .then((response) => response.json())
  .then((data) => {console.log(data)
  document.getElementById(`link`).innerHTML=("Status location: " + data.weather[0].description),
  document.getElementById(`tempe`).innerHTML="Temperature of location: " + Math.ceil(data.main.temp - 273.15) + " celcius",
  document.getElementById(`pre`).innerHTML=("The pressure: " + data.main.pressure),
  document.getElementById(`wind`).innerHTML=("Wind Speed: " + data.wind.speed),
  document.getElementById(`humi`).innerHTML=("The humidity of location: " + data.main.humidity)
})

}