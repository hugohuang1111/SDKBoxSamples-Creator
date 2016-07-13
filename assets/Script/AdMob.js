cc.Class({
    extends: cc.Component,

    properties: {
        infoLabel: {
            default: null,
            type: cc.Label,
        }
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function() {
        this.admobInit();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    popScene: function() {
        cc.director.loadScene('Menu');
    },

    check_plugin: function() {
        if ('undefined' == typeof(sdkbox)) {
            this.showInfo('sdkbox is undefined')
            return false;
        }
        if ('undefined' == typeof(sdkbox.PluginAdMob)) {
            this.showInfo('sdkbox.PluginAdMob is undefined')
            return false;
        }

        return true;
    },

    showInfo: function(text) {
        console.log(text);
        if (this.infoLabel) {
            var lines = this.infoLabel.string.split('\n');
            var t = '';
            if (lines.length > 0) {
                t = lines[lines.length - 1] + '\n';
            }
            t += text;
            this.infoLabel.string = t;
        }
    },

    admobInit: function() {
        if (!this.check_plugin()) {
            return
        }

        let self = this
        sdkbox.PluginAdMob.setListener({
            adViewDidReceiveAd: function(name) {
                self.showInfo('adViewDidReceiveAd name=' + name);
            },
            adViewDidFailToReceiveAdWithError: function(name, msg) {
                self.showInfo('adViewDidFailToReceiveAdWithError name=' + name + ' msg=' + msg);
            },
            adViewWillPresentScreen: function(name) {
                self.showInfo('adViewWillPresentScreen name=' + name);
            },
            adViewDidDismissScreen: function(name) {
                self.showInfo('adViewDidDismissScreen name=' + name);
            },
            adViewWillDismissScreen: function(name) {
                self.showInfo('adViewWillDismissScreen=' + name);
            },
            adViewWillLeaveApplication: function(name) {
                self.showInfo('adViewWillLeaveApplication=' + name);
            }
        });
        sdkbox.PluginAdMob.init();

        // just for test
        let plugin = sdkbox.PluginAdMob
        if ("undefined" != typeof(plugin.deviceid) && plugin.deviceid.length > 0) {
            this.showInfo('deviceid=' + plugin.deviceid);
            // plugin.setTestDevices(plugin.deviceid);
        }
    },

    cacheInterstitial: function() {
        if (!this.check_plugin()) {
            return
        }

        sdkbox.PluginAdMob.cache('gameover');
    },

    showInterstitial: function() {
        if (!this.check_plugin()) {
            return
        }

        sdkbox.PluginAdMob.show('gameover');
    },

    cacheBanner: function() {
        if (!this.check_plugin()) {
            return
        }

        sdkbox.PluginAdMob.cache('home');
    },

    showBanner: function() {
        if (!this.check_plugin()) {
            return
        }

        sdkbox.PluginAdMob.show('home');
    },

    hideBanner: function() {
        if (!this.check_plugin()) {
            return
        }

        sdkbox.PluginAdMob.hide('home');
    },

});
