const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

const SDKBox = {};

SDKBox.utils = require('./js/utils.js').utils;
SDKBox.querys = SDKBox.utils.queryParams();

let SDKBoxConfig = {};
SDKBoxConfig.column_max = 4;
SDKBoxConfig.plugins = 
[
    "achievement",
    "adcolony",
    "admob",
    "agecheq",
    "amazon",
    "anysdk",
    "appnext",
    "appodeal",
    "apteligent",
    "bee7",
    "chartboost",
    "facebook",
    "flurryanalytics",
    "fyber",
    "googleanalytics",
    "googleplayservices",
    "iap",
    "inmobi",
    "kochava",
    "leadbolt",
    "leaderboard",
    "onesignal",
    "playphone",
    "review",
    "scientificrevenue",
    "sdkboxads",
    "sdkboxplay",
    "share",
    "soomlagrow",
    "tune",
    "valuepotion",
    "vungle",
    "youtube",
];

// log console 
var console = document.getElementById("console");

let main = function () 
{
    SDKBox.utils.showPlugins(SDKBoxConfig.plugins, 4);

    fs.readdir(path.normalize(path.join(SDKBox.querys.project, 'build')),
        (err, files) => 
        {
            if (err) 
            {
                console.log(err);
                console.log('SDKBox: read build folder failed');
                console.innerHTML += 'SDKBox: read build folder failed';
                console.scrollIntoView(false);
            } 
            else 
            {
                SDKBox.utils.showProjects(files, 4);
            }
        });
}

let importClick = function () 
{

    let getPluginsName = function () 
    {
        let selected_plugins = [];
        SDKBoxConfig.plugins.map((name) => 
        {
            let cb = document.getElementsByName(name);
            if (cb[0].checked) 
            {
                selected_plugins.push(name);
            }
        })

        return selected_plugins;
    }

    let projectFolder = SDKBox.utils.getProjectName('projects_radio_box');
    let import_plugins = getPluginsName();
    //alert(import_plugins);

    if (null == projectFolder) 
    {
        //alert('Must select a project.<br />if no project show, you build project first');
        console.innerHTML += 'Must select a project. If no project shows, you must build project first<br />';
        console.scrollIntoView(false);
        return;
    }
    if (import_plugins.length < 1) 
    {
        //alert('At least select one plugin to import');
        console.innerHTML += 'At least select one plugin to import<br />';
        console.scrollIntoView(false);
        return;
    }

    let projectDir = path.normalize(path.join(SDKBox.querys.project, 'build', projectFolder));

    let import_success_plugins = [];
    let import_fail_plugins = [];

    //alert(projectDir);

    let showResult = function () 
    {
        let resultText = `SDKBox: <br />success import plugins: ${import_success_plugins}`;
        if (import_fail_plugins.length > 0) 
        {
            resultText += `<br />failed import plugins: ${import_fail_plugins}`;
        }
        //alert(resultText);
        console.innerHTML += resultText + "<br />";
        console.scrollIntoView(false);
    }
    let runImport = function (import_plugins) 
    {
        if (import_plugins.length < 1) 
        {
            showResult();
            return 0;
        }
        let plugin_name = import_plugins.shift();
        if (!plugin_name) 
        {
            return;
        }
        let isWindows = function ()
        {
            return navigator.platform.indexOf('Win') > -1;
        }
        
        //alert(plugin_name);
        if (isWindows())
        {
            var sdkbox_import = spawn('cmd.exe', 
            [
                '/c', 'sdkbox',
                'import', plugin_name,
                '-p', projectDir,
                '--alwaysupdate',
                '--nohelp'
            ]);
        }
        else
        {
            var sdkbox_import = spawn('sdkbox', 
            [
                'import', plugin_name,
                '-p', projectDir,
                '--alwaysupdate',
                '--nohelp'
            ]);
        }
        sdkbox_import.stderr.on('data', (data) => 
        {
            getOutput(data);
            
            //alert('ERROR:' + data);
            console.log('ERROR:' + data);
        });
        sdkbox_import.stdout.on('data', (data) => 
        {
            getOutput(data);

            //alert('INFO:' + data);
            console.log('INFO:' + data);
        });
        sdkbox_import.on('close', (code) => 
        {
            if (0 != code) 
            {
                //alert(`sdkbox import ${plugin_name} process exited with code ${code}`);
                //alert(`sdkbox import process exited with code ${code} run "sdkbox import ${plugin_name} -p ${projectDir} -vv" in console manual`);
                
                console.innerHTML += `sdkbox import ${plugin_name} process exited with code ${code}<br />`;
                console.innerHTML += `sdkbox import process exited with code ${code} run "sdkbox import ${plugin_name} -p ${projectDir} -vv" in console manual<br />`;
                console.scrollIntoView(false);
                import_fail_plugins.push(plugin_name);
                showResult();
            } 
            else 
            {
                import_success_plugins.push(plugin_name);
                runImport(import_plugins);
            }
        });
    }

    let getOutput = function (data)
    {
        var str = data.toString(); 
        var lines = str.split(/(\r?\n)/g);

        getURL(str);
        
        for (var i=0; i < lines.length; i++) 
        {
            // Process the line, noting it might be incomplete.
            console.innerHTML += lines[i] + "<p>";
            console.scrollIntoView(false);
        }
    }

    runImport(import_plugins);

    let getURL = function (data)
    {
        var match = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.exec(data);

        if (match !== null)
        {
            // open documentation url 
            //document.location = match[0];                     // redirect
            //window.open(match[0], "_blank", "resizable=yes"); // open native browser
            spawn('explorer', [match[0]]);                      // open default external 
        }
    }
}
