const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

const SDKBox = {};

SDKBox.utils = require('./js/utils.js').utils;
SDKBox.querys = SDKBox.utils.queryParams();

let main = function() {
    fs.readdir(path.normalize(path.join(SDKBox.querys.project, 'build')),
        (err, files) => {
            if (err) {
                console.log(err);
                console.log('SDKBox: read build folder failed');
            } else {
                SDKBox.utils.showProjects(files, 4);
            }
        });
}

let updateClick = function() {
    const projectFolder = SDKBox.utils.getProjectName('projects_radio_box');
    if (null == projectFolder) {
        alert('You must select a project');
        return;
    }
    const projectDir = path.normalize(path.join(SDKBox.querys.project, 'build', projectFolder));

    const sdkbox_update = spawn('sdkbox', [
        'update',
        '-p', projectDir,
        '--alwaysupdate',
        '--nohelp'
    ])
    sdkbox_update.stderr.on('data', (data) => {
        console.log('ERROR:' + data);
    });
    // sdkbox_update.stdout.on('data', (data) => {
    //     console.log('INFO:' + data);
    // });
    sdkbox_update.on('close', (code) => {
        if (0 != code) {
            alert(`sdkbox update process exited with code ${code}
                run "sdkbox update -p ${projectDir} -vv" in console manual`);
        } else {
            alert(`SDKBox: plugins in ${projectFolder} has been updated`);
        }
    });
}
