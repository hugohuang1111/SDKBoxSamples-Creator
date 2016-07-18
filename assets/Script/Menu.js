cc.Class({
    extends: cc.Component,

    properties: {
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

        //init google analytics
        if ('undefined' != typeof(sdkbox)) {
            if ('undefined' != typeof(sdkbox.PluginGoogleAnalytics)) {
                sdkbox.PluginGoogleAnalytics.init();
                sdkbox.PluginGoogleAnalytics.startSession();
                sdkbox.PluginGoogleAnalytics.logScreen('menu');
            }
            if ('undefined' != typeof(sdkbox.PluginReview)) {
                sdkbox.PluginReview.init();
            }
        }

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    showIAPScene: function() {
        cc.director.loadScene('IAP');
        if ('undefined' != typeof(sdkbox) && 'undefined' == typeof(sdkbox.PluginGoogleAnalytics)) {
            sdkbox.PluginGoogleAnalytics.logScreen('iap');
        }
    },

    showFacebookScene: function() {
        cc.director.loadScene('Facebook');
        if ('undefined' != typeof(sdkbox) && 'undefined' == typeof(sdkbox.PluginGoogleAnalytics)) {
            sdkbox.PluginGoogleAnalytics.logScreen('facebook');
        }
    },

    showAdMobScene: function() {
        cc.director.loadScene('AdMob');
        if ('undefined' != typeof(sdkbox) && 'undefined' == typeof(sdkbox.PluginGoogleAnalytics)) {
            sdkbox.PluginGoogleAnalytics.logScreen('AdMob');
        }
    },

    showChartboostScene: function() {
        cc.director.loadScene('Chartboost');
        if ('undefined' != typeof(sdkbox) && 'undefined' == typeof(sdkbox.PluginGoogleAnalytics)) {
            sdkbox.PluginGoogleAnalytics.logScreen('Chartboost');
        }
    },

});
