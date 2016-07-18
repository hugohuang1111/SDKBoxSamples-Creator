cc.Class({
    extends: cc.Component,

    properties: {
        infoLabel: {
            default: null,
            type: cc.Label,
        }
    },

    // use this for initialization
    onLoad: function() {
        this.chartboostInit();
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
        if ('undefined' == typeof(sdkbox.PluginChartboost)) {
            this.showInfo('sdkbox.PluginChartboost is undefined')
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

    chartboostInit: function() {
        if (!this.check_plugin()) {
            return
        }

        let self = this
        sdkbox.PluginChartboost.setListener({
            onChartboostCached: function(name) {
                self.showInfo("onChartboostCached " + name);
            },
            onChartboostShouldDisplay: function(name) {
                self.showInfo("onChartboostShouldDisplay " + name);
            },
            onChartboostDisplay: function(name) {
                self.showInfo("onChartboostDisplay " + name);
            },
            onChartboostDismiss: function(name) {
                self.showInfo("onChartboostDismiss " + name);
            },
            onChartboostClose: function(name) {
                self.showInfo("onChartboostClose " + name);
            },
            onChartboostClick: function(name) {
                self.showInfo("onChartboostClick " + name);
            },
            onChartboostReward: function(name, reward) {
                self.showInfo("onChartboostReward " + name + " reward " + reward.toString());
            },
            onChartboostFailedToLoad: function(name, e) {
                self.showInfo("onChartboostFailedToLoad " + name + " load error " + e.toString());
            },
            onChartboostFailToRecordClick: function(name, e) {
                self.showInfo("onChartboostFailToRecordClick " + name + " click error " + e.toString());
            },
            onChartboostConfirmation: function() {
                self.showInfo("onChartboostConfirmation");
            },
            onChartboostCompleteStore: function() {
                self.showInfo("onChartboostCompleteStore");
            }
        });
        sdkbox.PluginChartboost.init();
        sdkbox.PluginChartboost.setAutoCacheAds(true);
    },

    showInterstitial: function() {
        if (!this.check_plugin()) {
            return
        }

        sdkbox.PluginChartboost.show("Default");
    },

    showReward: function() {
        if (!this.check_plugin()) {
            return
        }

        sdkbox.PluginChartboost.show("Level Complete");
    },

});
