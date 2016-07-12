'use strict';

const electron = require('electron');
const Fs = require("fire-fs");
const Path = require("fire-path");

module.exports = {
    load: function () {
    // 当 package 被正确加载的时候执行
    },

    unload: function () {
    // 当 package 被正确卸载的时候执行
    },

    messages: {
        'import' () {
            let win = new electron.BrowserWindow({width: 960, height: 640});
            win.on('closed', () => {
                win = null
            })
            win.loadURL('www.so.com');
        },
        'update' () {
            Editor.log('run update');
        },
        'editor:build-finished': function (event, target) {
            let root = Path.normalize(target.dest);
            let sdkbox_install_dir = Path.normalize(Path.join(target.dest, '..', 'packages', 'SDKBox-installer'))
            let url = Path.join(root, "jsb-" + target.template, 'res', 'sdkbox_config.json');
            let source = Path.join(sdkbox_install_dir, 'data', 'sdkbox_config.json');
            Fs.readFile(source, "utf8", function (err, data) {
                if (err) {
                    throw err;
                }

                Fs.writeFile(url, data, function (error) {
                    if (err) {
                        throw err;
                    }
                });
            });
        },
        'editor:build-started': function (event, target) {
            Editor.log('build started');
        },
        'editor:build-start': function (event, target) {
            Editor.log('build start');
        },
        'editor:build-begin': function (event, target) {
            Editor.log('build start');
        },
        'editor:build-begined': function (event, target) {
            Editor.log('build start');
        },
        'editor:build-init': function (event, target) {
            Editor.log('build start');
        }
    },
};
