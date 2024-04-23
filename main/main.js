const { app, BrowserWindow, ipcMain } = require("electron");
const serve = require("electron-serve");
const path = require("path");
const fs = require("fs");
const { Pool, Client } = require('pg');

// Common variables
let conn;
let client;
let mergedByDayData = [];
let mergedByTourData = [];


const appServe = app.isPackaged ? serve({
  directory: path.join(__dirname, "../out")
}) : null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1360,
    height: 1024,
    minHeight: 800,
    maxHeight: 1200,
    minWidth: 1024,
    maxWidth: 1360,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
    }
  });

  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
}

ipcMain.on('saveData', (event, arg) => {
  fs.writeFile(path.join(app.getPath('userData'), 'data.json'), JSON.stringify(arg), (err) => {
    console.log('complete')
    if(err) throw err;
  });
});

ipcMain.on('readData', async (event, arg) => {
  const data = await fs.readFile(path.join(app.getPath('userData'), 'data.json'), (err, data) => {
    if(err) throw err;
    event.returnValue = data;
    data = JSON.parse(data);
  });
});

ipcMain.on('first-use', async (event, arg) => {
  fs.access(path.join(app.getPath('userData'), 'data.json'), fs.F_OK, async (err) => {
    if(err) {
      event.returnValue = true;
      console.log(app.getPath('userData'));
    } else {
      event.returnValue = false;
    }
  });
});

ipcMain.on('connectToDb', async (event, arg) => {
    const userData = JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), 'data.json')));

    try {
      if(!conn) {
        conn = new Pool({
        user: 'postgres',
        host: userData.host,
        database: userData.database,
        password: userData.password,
        port: userData.port,
      });

      event.returnValue = true;
  };
    } catch (err) {
      throw new Error(err);
    }
});

  ipcMain.on('load/db/mergedHands', async (event, arg) => {
    const current_date = new Date();
    const halfYearAgo = new Date(current_date.setMonth(current_date.getMonth() - 6));
    const hoursZero = new Date(halfYearAgo.setHours(0,0,0,0));

    try {
      client = await conn.connect();
      const result = await client.query(`SELECT amt_won, date_played, id_tourney FROM tourney_hand_player_statistics WHERE flg_hero = TRUE ORDER BY date_played DESC`);

      function mergeByDate(data) {
        const resultArray = [];
        resultArray.push(data[0]);

        data.slice(1).map((item) => {
          if (resultArray.find((resultItem) => (
            resultItem.monthPlayed === item.monthPlayed 
            && resultItem.dayPlayed === item.dayPlayed
            && resultItem.yearPlayed === item.yearPlayed
          ))) {
            const index = resultArray.findIndex((resultItem) => resultItem.monthPlayed === item.monthPlayed && resultItem.dayPlayed === item.dayPlayed);
            resultArray[index].chipsWon += item.chipsWon;
          } else {
            resultArray.push(item);
          }
        });

        return resultArray;
    }

      function mergeByTour(data) {
        const resultArray = [data[0]];

        data.slice(1).map((item) => {
          if (resultArray.find((resultItem) => (
            resultItem.id_tourney === item.id_tourney
          ))) {
            const index = resultArray.findIndex((resultItem) => resultItem.id_tourney === item.id_tourney);
            resultArray[index].chipsWon += item.chipsWon;
          } else {
            resultArray.push(item);
          }
        });
        
        return resultArray;
      }
      
      const lastSixMonthsData = result.rows.filter(row => row.date_played >= hoursZero);
      const filteredDataByDay = lastSixMonthsData.map(row => {
        return {
          chipsWon: parseFloat(row.amt_won),
          yearPlayed: row.date_played.getFullYear(),
          monthPlayed: row.date_played.getMonth() + 1,
          dayPlayed: row.date_played.getDate(),
        }
      });
      const filteredDataByTour = lastSixMonthsData.map(row => {
        return {
          chipsWon: parseFloat(row.amt_won),
          id_tourney: row.id_tourney,
        }
      });

      mergedByDayData = mergeByDate(filteredDataByDay);
      mergedByTourData = mergeByTour(filteredDataByTour);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      client.release();
    }
});

ipcMain.on('getDbData', (event, arg) => {
  event.returnValue = JSON.stringify(mergedByDayData);
});

ipcMain.on('getDbTourData', (event, arg) => {
  event.returnValue = JSON.stringify(mergedByTourData);
});

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});