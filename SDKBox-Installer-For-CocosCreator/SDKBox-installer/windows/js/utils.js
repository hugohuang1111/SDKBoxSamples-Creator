let utils = {};

let queryParams = function() {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
};

let createEmptyGridColumnDiv = function() {
    let plugin = document.createElement('div');
    plugin.className = 'grid_column';

    return plugin;
};

let showProjects = function(json_projects, column_max) {
    let filter = function(json_projects) {
        let project_array = [];
        json_projects.map((name) => {
            if ('jsb' == name.substring(0, 3)) {
                project_array.push(name);
            }
        })
        return project_array;
    }
    json_projects = filter(json_projects);
    let projects = document.getElementById('projects')

    //clear first
    while (projects.firstChild) {
        projects.removeChild(projects.firstChild);
    }

    let row = null;

    let createProjectDiv = function(name) {
        let plugin = createEmptyGridColumnDiv();
        let radioBox = document.createElement('input');
        radioBox.type = 'radio';
        radioBox.name = 'projects_radio_box';
        plugin.appendChild(radioBox);

        let nameLabel = document.createElement('label');;
        nameLabel.textContent = name;
        plugin.appendChild(nameLabel);

        return plugin;
    }

    for (let i = 0; i < json_projects.length; i++) {
        if (0 == i % column_max) {
            if (row) {
                projects.appendChild(row);
                row = null;
            }
            row = document.createElement('div');
            row.className = 'grid_container';
        }
        let plugin = createProjectDiv(json_projects[i])
        row.appendChild(plugin);
    }

    let empty_plugin_count = json_projects.length % column_max;
    if (empty_plugin_count > 0) {
        for (let i = 0; i < column_max - empty_plugin_count; i++) {
            row.appendChild(createEmptyGridColumnDiv());
        }
        projects.appendChild(row);
    }
};

let showPlugins = function(json_plugins, column_max) {
    let plugins = document.getElementById('plugins')

    //clear first
    while (plugins.firstChild) {
        plugins.removeChild(plugins.firstChild);
    }

    let row = null;

    let createPluginDiv = function(name) {
        let plugin = createEmptyGridColumnDiv();
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = name;
        // plugin.innerHTML = name;
        plugin.appendChild(checkbox);

        let nameLabel = document.createElement('label');;
        nameLabel.textContent = name;
        plugin.appendChild(nameLabel);

        return plugin;
    }

    for (let i = 0; i < json_plugins.length; i++) {
        if (0 == i % column_max) {
            if (row) {
                plugins.appendChild(row);
                row = null;
            }
            row = document.createElement('div');
            row.className = 'grid_container';
        }
        let plugin = createPluginDiv(json_plugins[i])
        row.appendChild(plugin);
    }

    let empty_plugin_count = json_plugins.length % column_max;
    if (empty_plugin_count > 0) {
        for (let i = 0; i < column_max - empty_plugin_count; i++) {
            row.appendChild(createEmptyGridColumnDiv());
        }
        plugins.appendChild(row);
    }
};

let getProjectName = function(name) {
    let getLabel = function(element) {
        return element.parentElement.lastChild.textContent;
    }

    let rb = document.getElementsByName(name);
    for (var i = rb.length - 1; i >= 0; i--) {
        if (rb[i].checked) {
            return getLabel(rb[i]);
        }
    }

    return null;
};


utils.queryParams = queryParams;
utils.createEmptyGridColumnDiv = createEmptyGridColumnDiv;
utils.showProjects = showProjects;
utils.showPlugins = showPlugins;
utils.getProjectName = getProjectName;

module.exports.utils = utils;
