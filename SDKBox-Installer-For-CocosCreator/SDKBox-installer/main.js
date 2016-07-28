'use strict';

const electron = require('electron');
const FS = require("fire-fs");
const Path = require("fire-path");

module.exports = {
    load: function() {
        // 当 package 被正确加载的时候执行
        // Editor.log(Editor);
        electron.globalShortcut.register('f12', () => {
            let win = electron.BrowserWindow.getFocusedWindow();
            if (!win) return;
            win.webContents.toggleDevTools();
        });
    },

    unload: function() {
        // 当 package 被正确卸载的时候执行
    },

    messages: {
        'import' () {
            let win = new electron.BrowserWindow({
                width: 640,
                height: 380,
                resizable: false
            });
            win.on('closed', () => {
                win = null
            })
            win.SDKBoxData = {
                "projectPath": "a/b/c.jpg"
            }
            Editor.log(win);
            win.loadURL(Path.join('file://', __dirname,
                './windows/import.html' + '?project=' + encodeURIComponent(Editor.projectInfo.path)));
        },
        'update' () {
            let win = new electron.BrowserWindow({
                width: 640,
                height: 380,
                resizable: false
            });
            win.on('closed', () => {
                win = null
            })
            win.SDKBoxData = {
                "projectPath": "a/b/c.jpg"
            }
            Editor.log(win);
            win.loadURL(Path.join('file://', __dirname,
                './windows/update.html' + '?project=' + encodeURIComponent(Editor.projectInfo.path)));
        },
        'editor:build-finished': function(event, target) {
            let root = Path.normalize(target.dest);
            //let sdkbox_install_dir = Path.normalize(Path.join(target.dest, '..', 'packages', 'SDKBox-installer'))
            let dest_config = Path.normalize(Path.join(target.dest, "jsb-" + target.template, 'res', 'sdkbox_config.json'));
            let backup_config = Path.normalize(Path.join(Editor.projectInfo.path, 'temp', 'SDKBox', 'sdkbox_config.json'));
            FS.readFile(backup_config, "utf8", function(err, data) {
                if (err) {
                    Editor.log('SDKBox: read backup config file failed');
                } else {
                    Editor.log('SDKBox: read backup config file successed');
                    FS.writeFile(dest_config, data, function(error) {
                        if (err) {
                            Editor.log('SDKBox: write config failed');
                        } else {
                            Editor.log('SDKBox: write config successed')
                        }
                    });
                }
            });
        },
        'editor:build-start': function(event, target) {
            let root = Path.normalize(target.dest);
            let sdkbox_install_dir = Path.normalize(Path.join(target.dest, '..', 'packages', 'SDKBox-installer'))
            let url = Path.join(root, "jsb-" + target.template, 'res', 'sdkbox_config.json');
            FS.readFile(url, 'utf8', (err, data) => {
                if (err) {
                    Editor.log('SDKBox: read config file failed');
                } else {
                    Editor.log('SDKBox: read config file successed');
                    let dest = Path.normalize(Path.join(Editor.projectInfo.path, 'temp', 'SDKBox', 'sdkbox_config.json'));
                    FS.mkdirp(Path.dirname(dest), (err) => {
                        if (err) {
                            Editor.log('SDKBox: create sdkbox temp folder failed');
                        } else {
                            FS.writeFile(dest, data, (err) => {
                                if (err) {
                                    Editor.log('SDKBox backup config file failed');
                                } else {
                                    Editor.log('SDKBox: backup config file successed');
                                }
                            })
                        };
                    });
                }
            });
        },
    },
};
