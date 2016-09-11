const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

const SDKBox = {};

SDKBox.utils = require('./js/utils.js').utils;
SDKBox.querys = SDKBox.utils.queryParams();

// log console 
var console = document.getElementById("console");

let getOutput = function (data)
{
    var str = data.toString(); 
    var lines = str.split(/(\r?\n)/g);

    for (var i=0; i < lines.length; i++) 
    {
        // Process the line, noting it might be incomplete.
        console.innerHTML += lines[i] + "<p>";
        console.scrollIntoView(false);
    }
}

let main = function() 
{
    fs.readdir(path.normalize(path.join(SDKBox.querys.project, 'build')),
        (err, files) => 
        {
            if (err) 
            {
                console.innerHTML += 'SDKBox: read build folder failed';
                console.scrollIntoView(false);
                console.log(err);
                console.log('SDKBox: read build folder failed');
            } 
            else 
            {
                SDKBox.utils.showProjects(files, 4);
            }
        });
}

let isWindows = function ()
{
    return navigator.platform.indexOf('Win') > -1;
}

let updateClick = function() 
{
    const projectFolder = SDKBox.utils.getProjectName('projects_radio_box');
    if (null == projectFolder) 
    {
        console.innerHTML += 'You must select a project';
        console.scrollIntoView(false);
        //alert('You must select a project');
        return;
    }
    const projectDir = path.normalize(path.join(SDKBox.querys.project, 'build', projectFolder));

    if (isWindows())
    {
        var sdkbox_update = spawn('cmd.exe', 
        [
            '/c', 'sdkbox',
            'update',
            '-p', projectDir,
            '--alwaysupdate',
            '--nohelp'
        ]); 
    }
    else
    {
        var sdkbox_update = spawn('sdkbox', 
        [
            'update',
            '-p', projectDir,
            '--alwaysupdate',
            '--nohelp'
        ], 
        {
            shell: true,
            env: Object.assign({}, process.env, { PATH: process.env.PATH + ':~/.sdkbox/bin' })
        });
    }

    sdkbox_update.stderr.on('data', (data) => 
    {
        getOutput(data);
        //alert('ERROR:' + data);
        console.log('ERROR:' + data);
    });
    sdkbox_update.stdout.on('data', (data) => 
    {
        getOutput(data);
        //alert('INFO:' + data);
        console.log('INFO:' + data);
    });
    sdkbox_update.on('close', (code) => 
    {
        if (0 != code) 
        {
            console.innerHTML += `sdkbox update process exited with code ${code} run "sdkbox update -p ${projectDir} -vv" in console manual`;
        } 
        else 
        {
            console.innerHTML += `SDKBox: plugins in ${projectFolder} has been updated`;
        }
        console.scrollIntoView(false);
    });
}
