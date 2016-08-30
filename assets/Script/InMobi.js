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
        this.inmobiInit();
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
        if ('undefined' == typeof(sdkbox.PluginInMobi)) {
            this.showInfo('sdkbox.PluginInMobi is undefined')
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

    inmobiInit: function() {
        if (!this.check_plugin()) {
            return
        }

        let self = this
        sdkbox.PluginInMobi.setListener({
            bannerDidFinishLoading: function() {
                self.showInfo('bannerDidFinishLoading');
            },
            bannerDidFailToLoadWithError: function(code, description) {
                self.showInfo('bannerDidFailToLoadWithError code:' + code + ' desc:' + description);
            },
            bannerDidInteractWithParams: function(params) {
                self.showInfo('bannerDidInteractWithParams');
            },
            userWillLeaveApplicationFromBanner: function() {
                self.showInfo('userWillLeaveApplicationFromBanner');
            },
            bannerWillPresentScreen: function() {
                self.showInfo('bannerWillPresentScreen');
            },
            bannerDidPresentScreen: function() {
                self.showInfo('bannerDidPresentScreen');
            },
            bannerWillDismissScreen: function() {
                self.showInfo('bannerWillDismissScreen');
            },
            bannerDidDismissScreen: function() {
                self.showInfo('bannerDidDismissScreen');
            },
            bannerRewardActionCompletedWithRewards: function(rewards) {
                self.showInfo('bannerRewardActionCompletedWithRewards');
                console.log(rewards);
            },
            interstitialDidFinishLoading: function() {
                self.showInfo('interstitialDidFinishLoading');
            },
            interstitialDidFailToLoadWithError: function(code, description) {
                self.showInfo('interstitialDidFailToLoadWithError code:' + code + ' desc:' + description);
            },
            interstitialWillPresent: function() {
                self.showInfo('interstitialWillPresent');
            },
            interstitialDidPresent: function() {
                self.showInfo('interstitialDidPresent');
            },
            interstitialDidFailToPresentWithError: function(code, description) {
                self.showInfo('interstitialDidFailToPresentWithError code:' + code + ' desc:' + description);
            },
            interstitialWillDismiss: function() {
                self.showInfo('interstitialWillDismiss');
            },
            interstitialDidDismiss: function() {
                self.showInfo('interstitialDidDismiss');
            },
            interstitialDidInteractWithParams: function(params) {
                self.showInfo('interstitialDidInteractWithParams');
            },
            interstitialRewardActionCompletedWithRewards: function(rewards) {
                self.showInfo('interstitialRewardActionCompletedWithRewards');
            },
            userWillLeaveApplicationFromInterstitial: function() {
                self.showInfo('userWillLeaveApplicationFromInterstitial');
            }
        });
        sdkbox.PluginInMobi.init();

        var ver = sdkbox.PluginInMobi.getVersion();
        this.showInfo("inmobi plugin version: " + ver.toString());

        sdkbox.PluginInMobi.setLogLevel(sdkbox.PluginInMobi.SBIMSDKLogLevel.kIMSDKLogLevelDebug);
        sdkbox.PluginInMobi.addIdForType("test", sdkbox.PluginInMobi.SBIMSDKIdType.kIMSDKIdTypeLogin);
        sdkbox.PluginInMobi.removeIdType(sdkbox.PluginInMobi.SBIMSDKIdType.kIMSDKIdTypeLogin);
        sdkbox.PluginInMobi.setAge(18);
        sdkbox.PluginInMobi.setAreaCode("area code");
        sdkbox.PluginInMobi.setAgeGroup(sdkbox.PluginInMobi.SBIMSDKAgeGroup.kIMSDKAgeGroupBetween18And20);
        sdkbox.PluginInMobi.setYearOfBirth(1989);
        sdkbox.PluginInMobi.setEducation(sdkbox.PluginInMobi.SBIMSDKEducation.kIMSDKEducationHighSchoolOrLess);
        sdkbox.PluginInMobi.setEthnicity(sdkbox.PluginInMobi.SBIMSDKEthnicity.kIMSDKEthnicityHispanic);
        sdkbox.PluginInMobi.setGender(sdkbox.PluginInMobi.SBIMSDKGender.kIMSDKGenderMale);
        sdkbox.PluginInMobi.setHouseholdIncome(sdkbox.PluginInMobi.SBIMSDKHouseholdIncome.kIMSDKHouseholdIncomeBelow5kUSD);
        sdkbox.PluginInMobi.setIncome(4500);
        sdkbox.PluginInMobi.setInterests("game");
        sdkbox.PluginInMobi.setLanguage("zh-cn");
        sdkbox.PluginInMobi.setLocation("cd", "sc", "usa");
        sdkbox.PluginInMobi.setLocation(102, 348);
        sdkbox.PluginInMobi.setNationality("nationality");
        sdkbox.PluginInMobi.setPostalCode("618000");

        // interstitail setting
        sdkbox.PluginInMobi.disableHardwareAccelerationForInterstitial();
        sdkbox.PluginInMobi.setInterstitialKeywords("spoort");

        // banner setting
        sdkbox.PluginInMobi.disableHardwareAccelerationForBanner();
        sdkbox.PluginInMobi.setBannerAnimationType(sdkbox.PluginInMobi.SBIMBannerAnimationType.kIMBannerAnimationTypeRotateHorizontalAxis);
        sdkbox.PluginInMobi.setBannerKeywords("music");

        sdkbox.PluginInMobi.shouldAutoRefresh(true);
        sdkbox.PluginInMobi.setRefreshInterval(60);
    },

    cacheInterstitial: function() {
        if (!this.check_plugin()) {
            return
        }

        sdkbox.PluginInMobi.loadInterstitial();
    },

    showInterstitial: function() {
        if (!this.check_plugin()) {
            return
        }

        if (sdkbox.PluginInMobi.isInterstitialReady()) {
            cc.log("Plugin InMobi interstitial ad is ready");
            sdkbox.PluginInMobi.showInterstitial();
        } else {
            cc.log("Plugin InMobi interstitial ad is not ready");
        }
    },

    showBanner: function() {
        if (!this.check_plugin()) {
            return
        }

        sdkbox.PluginInMobi.loadBanner();
    },

});
