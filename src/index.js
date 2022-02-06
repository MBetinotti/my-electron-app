const { app, BrowserWindow, Menu } = require('electron')

const url = require('url');
const path = require('path');
const process = require('process');

let newProductWindow

if (process.env.NODE_ENV !== "production") {
  require('electron-reload')(__dirname,{
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
  })
}

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
  
    win.loadURL(url.format({
      pathname: path.join(__dirname,'index.html'),
      protocol:'file',
      slashes: true
    }))

    // win.loadFile('src/index.html')
    const mainMenu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(mainMenu)
  }

  function createNewProductWindow (){
    newProductWindow = new BrowserWindow({
      width: 400,
      height: 330,
      title: 'New Product'
    });

    newProductWindow.setMenu(null)
    newProductWindow.loadURL(url.format({
      pathname: path.join(__dirname,'views/new-product.html'),
      protocol:'file',
      slashes: true
    }))
  }

  const templateMenu = [
    {
      label: 'File',
      submenu: [
        {
          label:'New Product',
          accelerator: 'Ctrl+N',
          click(){
            createNewProductWindow()
          }
        }
      ]
    }
  ]

  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

 