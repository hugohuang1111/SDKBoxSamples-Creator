const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

const SDKBox = {};

SDKBox.utils = require('./js/utils.js').utils;
SDKBox.querys = SDKBox.utils.queryParams();

let SDKBoxConfig = {}
SDKBoxConfig.column_max = 4;
SDKBoxConfig.plugins = [
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


let main = function() {
    SDKBox.utils.showPlugins(SDKBoxConfig.plugins, 4);

    fs.readdir(path.normalize(path.join(SDKBox.querys.project, 'build')),
        (err, files) => {
            if (err) {
                console.log(err);
                console.log('SDKBox: read build folder failed');
            } else {
                SDKBox.utils.showProjects(files, 4);
            }
        });

    let a = ['a', 'b'];
    console.log(`array ${a}`);
}

let importClick = function() {

    let getPluginsName = function() {
        let selected_plugins = [];
        SDKBoxConfig.plugins.map((name) => {
            let cb = document.getElementsByName(name);
            if (cb[0].checked) {
                selected_plugins.push(name);
            }
        })

        return selected_plugins;
    }

    let projectFolder = SDKBox.utils.getProjectName('projects_radio_box');
    let import_plugins = getPluginsName();
    if (null == projectFolder) {
        alert('Must select a project.\nif no project show, you build project first');
        return;
    }
    if (import_plugins.length < 1) {
        alert('At least select on plugin to import');
        return;
    }

    let projectDir = path.normalize(path.join(SDKBox.querys.project, 'build', projectFolder));

    let import_success_plugins = [];
    let import_fail_plugins = [];
    let showResult = function() {
        let resultText = `SDKBox: success import plugins ${import_success_plugins}`;
        if (import_fail_plugins.length > 0) {
            resultText += `\nfailed import plugins: ${import_fail_plugins}`;
        }
        alert(resultText);
    }
    let runImport = function(import_plugins) {
        if (import_plugins.length < 1) {
            showResult();
            return 0;
        }
        let plugin_name = import_plugins.shift();
        if (!plugin_name) {
            return;
        }
        const sdkbox_import = spawn('sdkbox', [
            'import', plugin_name,
            '-p', projectDir,
            '--alwaysupdate',
            '--nohelp'
        ])
        sdkbox_import.stderr.on('data', (data) => {
            console.log('ERROR:' + data);
        });
        sdkbox_import.stdout.on('data', (data) => {
            console.log('INFO:' + data);
        });
        sdkbox_import.on('close', (code) => {
            if (0 != code) {
                alert(`sdkbox import ${plugin_name} process exited with code ${code}`);
                alert(`sdkbox import process exited with code ${code}
                run "sdkbox import ${plugin_name} -p ${projectDir} -vv" in console manual`);
                import_fail_plugins.push(plugin_name);
                showResult();
            } else {
                import_success_plugins.push(plugin_name);
                runImport(import_plugins);
            }
        });
    }

    runImport(import_plugins);

}
