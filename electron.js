const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('path')
const url = require("url")
const sqlite3 = require('sqlite3');
const isDev = require('electron-is-dev');
const bcrypt = require("bcryptjs")
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');



log.info('App starting...');
log.transports.file.resolvePath = () => path.join(`C:/Users/vikas/OneDrive/Desktop/rams_ent_final/rams-official`, `/logs/main.logs`)

function sendStatusToWindow(text) {
    log.info(text);
    win.webContents.send('message', text);
}


function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: `Ram's Enterprises ${app.getVersion()}`,
        width: 800,
        height: 600,
        icon: __dirname + '/icon/favicon.ico',
        webPreferences: {
            preload: path.join(__dirname, "/preload.js"),
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            devTools: isDev ? true : false,
            nodeIntegration: true,
        }
    })

    const startUrl = url.format({
        pathname: path.join(__dirname, "./official/build/index.html"),
        protocol: "file",

    })

    mainWindow.loadURL(isDev ? "http://localhost:3000" : startUrl)

}



app.whenReady().then(() => {
    createMainWindow();
    autoUpdater.checkForUpdatesAndNotify();
})

// Listen for updates
autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater. ' + err);
})

autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
})

autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded');
});

const dbPath = isDev
    ? path.join(__dirname, "ramsent.db")
    : path.join(process.resourcesPath, 'ramsent.db')


const db = new sqlite3.Database(dbPath,
    (err) => {
        if (err) {
            console.log(`Database Error: ${err}`);
        } else {
            console.log('Database Loaded');
        }
    }
);

db.get(`CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )`, () => {
    makeSuperUser()
})

db.get(`CREATE TABLE IF NOT EXISTS AllMaterials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    item_name TEXT NOT NULL,
    qty NUMBER NOT NULL,
    location TEXT,
    person TEXT
  )`)

db.get(`CREATE TABLE IF NOT EXISTS AllStocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name TEXT NOT NULL UNIQUE,
    stock NUMBER NOT NULL,
    discarded BOOL NOT NULL
  )`)

db.get(`CREATE TABLE IF NOT EXISTS MaterialConsumed (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    item_name TEXT NOT NULL,
    qty NUMBER NOT NULL,
    location TEXT,
    person TEXT
  )`)

db.get(`CREATE TABLE IF NOT EXISTS Workers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    safetyPassNo TEXT ,
    empName TEXT ,
    fathersName TEXT,
    designation TEXT,
    spValid TEXT,
    woNo TEXT,
    gpNo TEXT,
    gpValid TEXT,
    email TEXT,
    profileImg TEXT,
    mobileNo NUMBER UNIQUE
  )`)

db.get(`CREATE TABLE IF NOT EXISTS Workerppe (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employeeName TEXT NOT NULL,
    mobileNo NUMBER NOT NULL,
    head_protection TEXT ,
    face_protection TEXT,
    hand_protection TEXT,
    leg_protection TEXT,
    eye_protection TEXT,
    road_protection TEXT,
    head_protection_issue TEXT,
    face_protection_issue TEXT,
    hand_protection_issue TEXT,
    leg_protection_issue TEXT,
    eye_protection_issue TEXT,
    road_protection_issue TEXT,
    head_protection_custom_issue TEXT,
    face_protection_custom_issue TEXT,
    hand_protection_custom_issue TEXT,
    leg_protection_custom_issue TEXT,
    eye_protection_custom_issue TEXT,
    road_protection_custom_issue TEXT,
    date_issue TEXT NOT NULL,
    previous_date_issue TEXT
  )`)

db.get(`CREATE TABLE IF NOT EXISTS Safetyobservation (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    violation_date TEXT ,
    site_supervisor_concerned TEXT ,
    manpower TEXT,
    violation_detail TEXT,
    attachment TEXT,
    observation_locked_by TEXT,
    action_taken TEXT,
    current_status TEXT
  )`)

db.get(`CREATE TABLE IF NOT EXISTS VehicleData (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    typeOfVehicle TEXT NOT NULL,
    vehicleNumber TEXT NOT NULL UNIQUE,
    gPNo TEXT ,
    gPValidity TEXT ,
    insValidity TEXT ,
    polution TEXT ,
    fitnes TEXT ,
    roadTax TEXT ,
    permit TEXT,
    loadTest TEXT
  )`)

db.get(`CREATE TABLE IF NOT EXISTS VehicleEntry (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    driverName TEXT NOT NULL,
    date TEXT NOT NULL,
    vehicleNumber TEXT ,
    location TEXT ,
    time TEXT ,
    drop_loc TEXT ,
    trip TEXT ,
    entryTime Date 
  )`)

db.get(`CREATE TABLE IF NOT EXISTS RentalItems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name TEXT NOT NULL,
    date TEXT NOT NULL,
    serial_no TEXT ,
    location TEXT ,
    person TEXT ,
    rented_qty NUMBER ,
    received_qty NUMBER
  )`)

exports.db = db

app.on('before-quit', () => {
    db.close((err) => {
        if (err) {
            console.log('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
});

function allQuerry(sql) {
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function getQuerry(sql) {
    return new Promise((resolve, reject) => {
        db.get(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function insertQuerry(sql, args) {
    return new Promise((resolve, reject) => {
        db.run(sql, [args.date, args.item_name, args.qty, args.location, args.person], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

function runQuerry(sql) {
    return new Promise((resolve, reject) => {
        db.run(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

async function makeSuperUser() {
    const existinguser = await (getQuerry(`SELECT * FROM Users WHERE username="Ramsent@admin"`))
    if (existinguser === undefined) {
        bcrypt.hash("Ramsent@8808", 10, function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                console.log(err)
            } else {
                runQuerry(`INSERT INTO Users (username,password) VALUES ("Ramsent@admin" , "${hash}")`)
            }
        })

    }
}



ipcMain.handle("user-details", async (event, args) => {

    return await getQuerry(`SELECT * FROM Users WHERE username="${args.username}"`)
        .then((results) => {
            // console.log(results)
            const compared = bcrypt.compareSync(args.password, results.password)

            if (results === undefined) {
                return "username is incorrect"
            } else if (compared === false) {
                return "Password is incorrect"
            } else {
                return results
            }
        })
        .catch((error) => {
            console.log(error);
        });

})

ipcMain.handle("verify-token", async (event, args) => {

    return await getQuerry(`SELECT * FROM Users WHERE password="${args}"`)
        .then((results) => {
            // console.log(results)
            if (results === undefined) {
                return false
            } else return true
        })
        .catch((error) => {
            console.log(error);
        });

})

ipcMain.handle("material-details", async () => {
    return await allQuerry(`SELECT * FROM AllMaterials`)
        .then((results) => {
            // console.log(results)
            return results
        })
        .catch((error) => {
            console.log(error);
        });
})

ipcMain.handle("all-stocks", async () => {
    return await allQuerry(`SELECT * FROM AllStocks`)
        .then((results) => {
            // console.log(results)
            return results
        })
        .catch((error) => {
            console.log(error);
        });
})

ipcMain.handle("stock-detail", async (event, args) => {
    return await allQuerry(`SELECT * FROM AllStocks
    WHERE item_name="${args}"`)
        .then((results) => {
            // console.log(results)
            return results
        })
        .catch((error) => {
            console.log(error);
        });
})

ipcMain.handle("material-consumed", async () => {
    return await allQuerry(`SELECT * FROM MaterialConsumed`)
        .then((results) => {
            // console.log(results)
            return results
        })
        .catch((error) => {
            console.log(error);
        });
})

ipcMain.handle("add-material", async (event, args) => {
    return await insertQuerry(`INSERT INTO AllMaterials (date,item_name,qty,location,person) VALUES(?,?,?,?,?)`, args)
        .then((results) => {
            // console.log(results)
            return results
        })
        .catch((error) => {
            console.log(error);
        });
})

ipcMain.handle("add-stock", async (event, args) => {
    return await runQuerry(`INSERT INTO AllStocks (item_name,stock,discarded) VALUES("${args.item_name}",${args.stock},${args.discarded})`)
        .then((results) => {
            // console.log(results)
            return results
        })
        .catch((error) => {
            console.log(error);
        });
})

ipcMain.handle("update-stock", async (event, args) => {
    return await runQuerry(`UPDATE AllStocks 
    SET stock=${args.stock}
    WHERE id=${args.id}`)
        .then((results) => {
            // console.log(results)
            return results
        })
        .catch((error) => {
            console.log(error);
        });
})

ipcMain.handle("add-dispatchMaterial", async (event, args) => {
    return await insertQuerry(`INSERT INTO MaterialConsumed (date,item_name,qty,location,person) VALUES(?,?,?,?,?)`, args)
        .then((results) => {
            // console.log(results)
            return true
        })
        .catch((error) => {
            console.log(error);
            return false
        });
})


ipcMain.handle("all-workers", async () => {
    return await allQuerry(`SELECT * FROM Workers`)
        .then((results) => {
            // console.log(results)
            return results
        })
        .catch((error) => {
            console.log(error);
        });
})


function addWorker(sql, args) {
    return new Promise((resolve, reject) => {
        db.run(sql, [args.safetyPassNo, args.empName, args.fathersName, args.designation, args.spValid, args.woNo, args.gpNo, args.gpValid, args.email.length === 0 ? "na" : args.email, args.profileImg.length === 0 ? "na" : args.profileImg, args.mobileNo], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

ipcMain.handle("add-worker", async (event, args) => {
    return await addWorker(`INSERT INTO Workers (safetyPassNo,empName,fathersName,designation,spValid,woNo,gpNo,gpValid,email,profileImg,mobileNo) VALUES(?,?,?,?,?,?,?,?,?,?,?)`, args)
        .then((results) => {
            return true
        })
        .catch((error) => {
            console.log(error);
            return false
        });
})

ipcMain.handle("delete-worker", async (event, args) => {

    return await runQuerry(`DELETE FROM Workers WHERE id=${args};`)
        .then((results) => {
            // console.log(results)
            return true
        })
        .catch((error) => {
            console.log(error);
            return false
        });
})

ipcMain.handle("update-worker", async (event, args) => {
    return await runQuerry(`UPDATE Workers 
    SET safetyPassNo="${args.safetyPassNo}",
    empName="${args.empName}",
    fathersName="${args.fathersName}",
    designation="${args.designation}",
    spValid="${args.spValid}",
    woNo="${args.woNo}",
    gpNo="${args.gpNo}",
    gpValid="${args.gpValid}",
    email="${args.email}",
    profileImg="${args.profileImg}",
    mobileNo=${args.mobileNo}
    WHERE id=${args.id}`)
        .then((results) => {
            // console.log(results)
            return true
        })
        .catch((error) => {
            console.log(error);
            return false
        });
})

ipcMain.handle("worker-ppe", async (event, args) => {
    // console.log(args)
    return await allQuerry(`SELECT * FROM Workerppe
    WHERE mobileNo=${args}
    `)
        .then((results) => {
            // console.log(results)
            return results
        })
        .catch((error) => {
            console.log(error);
        });
})

const addppe = (sql, args) => {
    return new Promise((resolve, reject) => {
        db.run(sql, [args.employeeName,
        args.mobileNo,
        args.head_protection,
        args.face_protection,
        args.hand_protection,
        args.leg_protection,
        args.eye_protection,
        args.road_protection,
        args.head_protection_issue,
        args.face_protection_issue,
        args.hand_protection_issue,
        args.leg_protection_issue,
        args.eye_protection_issue,
        args.road_protection_issue,
        args.head_protection_custom_issue,
        args.face_protection_custom_issue,
        args.hand_protection_custom_issue,
        args.leg_protection_custom_issue,
        args.eye_protection_custom_issue,
        args.road_protection_custom_issue,
        args.date_issue,
        args.previous_date_issue], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

ipcMain.handle("add-ppe", async (event, args) => {
    return await addppe(`INSERT INTO Workerppe (
        employeeName,
        mobileNo,
        head_protection,
        face_protection,
        hand_protection,
        leg_protection,
        eye_protection,
        road_protection,
        head_protection_issue,
        face_protection_issue,
        hand_protection_issue,
        leg_protection_issue,
        eye_protection_issue,
        road_protection_issue,
        head_protection_custom_issue,
        face_protection_custom_issue,
        hand_protection_custom_issue,
        leg_protection_custom_issue,
        eye_protection_custom_issue,
        road_protection_custom_issue,
        date_issue,
        previous_date_issue) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, args)
        .then((results) => {
            return true
        })
        .catch((error) => {
            console.log(error);
            return false
        });
})

ipcMain.handle("safety-observations", async () => {
    return await allQuerry(`SELECT * FROM Safetyobservation`)
        .then((results) => {
            // console.log(results)
            return results
        })
        .catch((error) => {
            console.log(error);
        });
})

const addSafetyData = (sql, args) => {
    return new Promise((resolve, reject) => {
        db.run(sql, [
            args.violation_date,
            args.site_supervisor_concerned,
            args.manpower,
            args.violation_detail,
            args.attachment,
            args.observation_locked_by,
            args.action_taken,
            args.current_status
        ], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

ipcMain.handle('add-safety', async (event, args) => {
    return await addSafetyData(`INSERT INTO Safetyobservation
    (violation_date ,
    site_supervisor_concerned ,
    manpower,
    violation_detail,
    attachment,
    observation_locked_by,
    action_taken,
    current_status) 
    VALUES(?,?,?,?,?,?,?,?)`, args).then(res => {
        return true;
    }).catch(err => {
        return false
    })
})

ipcMain.handle('update-safety', async (event, args) => {
    return await runQuerry(`UPDATE Safetyobservation 
    SET current_status="close"
    WHERE id=${args}`)
        .then((results) => {
            // console.log(results)
            return true
        })
        .catch((error) => {
            return false
        });
})

ipcMain.handle('all-vehicle-data', async () => {
    return await allQuerry(`SELECT * FROM VehicleData`).then(
        (results) => {
            return results
        })
        .catch((error) => {
            console.log(error)
        })
})

ipcMain.handle('all-vehicle-entry', async () => {
    return await allQuerry(`SELECT * FROM VehicleEntry`).then(
        (results) => {
            return results
        })
        .catch((error) => {
            console.log(error)
        })
})

const addVehicleData = (sql, args) => {
    return new Promise((resolve, reject) => {
        db.run(sql, [args.typeOfVehicle,
        args.vehicleNumber,
        args.gPNo,
        args.gPValidity,
        args.insValidity,
        args.polution,
        args.fitnes,
        args.roadTax,
        args.permit,
        args.loadTest], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

ipcMain.handle('add-vehicle-data', async (event, args) => {
    return await addVehicleData(`INSERT INTO VehicleData
    (
    typeOfVehicle,
    vehicleNumber,
    gPNo,
    gPValidity,
    insValidity,
    polution,
    fitnes,
    roadTax,
    permit,
    loadTest 
    ) VALUES(?,?,?,?,?,?,?,?,?,?)`, args).then(results => {
        return true
    }).catch(err => {
        return false
    })
})

ipcMain.handle('update-vehicle-data', async (event, args) => {
    return await runQuerry(`UPDATE VehicleData 
    SET gPNo="${args.gPNo}",
    gPValidity="${args.gPValidity}",
    insValidity="${args.insValidity}",
    polution="${args.polution}",
    fitnes="${args.fitnes}",
    roadTax="${args.roadTax}",
    permit="${args.permit}",
    loadTest="${args.loadTest}"
    WHERE id=${args.id}`)
        .then((results) => {
            // console.log(results)
            return true
        })
        .catch((error) => {
            console.log(error)
            return false
        });
})

const addVehicleEntry = (sql, args) => {
    return new Promise((resolve, reject) => {
        db.run(sql, [
            args.driverName,
            args.date,
            args.vehicleNumber,
            args.location,
            args.time,
            args.drop_loc,
            args.trip,
            args.entryTime
        ], ((err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        }))
    })
}

ipcMain.handle('add-vehicle-entry', async (event, args) => {
    return await addVehicleEntry(`INSERT INTO VehicleEntry
    (
        driverName,
        date,
        vehicleNumber,
        location,
        time,
        drop_loc,
        trip,
        entryTime  
    ) VALUES(?,?,?,?,?,?,?,?)`, args).then(results => {
        return true
    }).catch(err => {
        return false
    })
})

ipcMain.handle('update-vehicle-entry', async (event, args) => {
    return await runQuerry(`UPDATE VehicleEntry 
    SET driverName="${args.driverName}",
    vehicleNumber="${args.vehicleNumber}",
    location="${args.location}",
    time="${args.time}",
    drop_loc="${args.drop_loc}",
    trip="${args.trip}"
    WHERE id=${args.id}`)
        .then((results) => {
            // console.log(results)
            return true
        })
        .catch((error) => {
            console.log(error)
            return false
        });
})

ipcMain.handle('all-rentalItems', async () => {
    return await allQuerry(`SELECT * FROM RentalItems`).then(
        (results) => {
            return results
        })
        .catch((error) => {
            console.log(error)
        })
})

const addRentalItem = (sql, args) => {
    return new Promise((resolve, reject) => {
        db.run(sql, [
            args.item_name,
            args.date,
            args.serial_no,
            args.location,
            args.person,
            args.rented_qty,
            args.received_qty
        ], ((err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        }))
    })
}


ipcMain.handle('add-rentalItem', async (event, args) => {
    return await addRentalItem(`INSERT INTO RentalItems
    (
        item_name ,
        date ,
        serial_no  ,
        location  ,
        person  ,
        rented_qty,
        received_qty  
    ) VALUES(?,?,?,?,?,?,?)`, args).then(results => {
        return true
    }).catch(err => {
        return false
    })
})

ipcMain.handle('update-rentalItem', async (event, args) => {
    return await runQuerry(`UPDATE RentalItems
    SET rented_qty=${args.rented_qty},
    received_qty=${args.modified_qty}
    WHERE id=${args.id}`).then(results => {
        return true
    }).catch(err => {
        return false
    })
})


