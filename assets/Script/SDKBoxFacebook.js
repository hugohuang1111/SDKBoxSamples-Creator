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
        this.fbInit();
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
        if ('undefined' == typeof(sdkbox.PluginFacebook)) {
            this.showInfo('sdkbox.PluginFacebook is undefined')
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

    fbInit: function() {
        if (!this.check_plugin()) {
            return
        }

        var self = this
        sdkbox.PluginFacebook.init();
        sdkbox.PluginFacebook.setListener({
            onLogin: function(isLogin, msg) {
                if (isLogin) {
                    self.showInfo("login successful");

                } else {
                    self.showInfo("login failed");
                }
            },
            onAPI: function(tag, data) {
                self.showInfo('onAPI:' + tag)
            },
            onSharedSuccess: function(data) {
                self.showInfo("share successful");

                if ('undefined' != typeof(sdkbox) && 'undefined' == typeof(sdkbox.PluginGoogleAnalytics)) {
                    sdkbox.PluginGoogleAnalytics.logEvent('facebook', 'share', 'share success', 0);
                }
            },
            onSharedFailed: function(data) {
                self.showInfo("share failed");
            },
            onSharedCancel: function() {
                self.showInfo("share canceled");
            },
            onPermission: function(isLogin, msg) {
                if (isLogin) {
                    self.showInfo("request permission successful");
                } else {
                    self.showInfo("request permission failed");
                }
            }
        });
    },

    login: function() {
        if (!this.check_plugin()) {
            return
        }

        if (sdkbox.PluginFacebook.isLoggedIn()) {
            this.showInfo("you has already login")
            return
        }

        sdkbox.PluginFacebook.login();
    },

    logout: function() {
        if (!this.check_plugin()) {
            return
        }

        if (!sdkbox.PluginFacebook.isLoggedIn()) {
            this.showInfo("you has already logout")
            return
        }

        sdkbox.PluginFacebook.logout();
    },

    reqReadPermission: function() {
        if (!this.check_plugin()) {
            return
        }

        sdkbox.PluginFacebook.requestReadPermissions(["public_profile", "email"]);
    },

    reqWritePermission: function() {
        if (!this.check_plugin()) {
            return
        }

        sdkbox.PluginFacebook.requestPublishPermissions(["publish_actions"]);
    },

    shareLink: function() {
        if (!this.check_plugin()) {
            return
        }

        var info = new Object();
        info.type = "link";
        info.link = "http://www.cocos2d-x.org";
        info.title = "cocos2d-x";
        info.text = "Best Game Engine";
        info.image = "http://cocos2d-x.org/images/logo.png";
        sdkbox.PluginFacebook.share(info);

        if ('undefined' != typeof(sdkbox) && 'undefined' == typeof(sdkbox.PluginGoogleAnalytics)) {
            sdkbox.PluginGoogleAnalytics.logEvent('facebook', 'share', 'share link begin', 0);
        }
    },

    dialogLink: function() {
        if (!this.check_plugin()) {
            return
        }

        var info = new Object();
        info.type = "link";
        info.link = "http://www.cocos2d-x.org";
        info.title = "cocos2d-x";
        info.text = "Best Game Engine";
        info.image = "http://cocos2d-x.org/images/logo.png";
        sdkbox.PluginFacebook.dialog(info);

        if ('undefined' != typeof(sdkbox) && 'undefined' == typeof(sdkbox.PluginGoogleAnalytics)) {
            sdkbox.PluginGoogleAnalytics.logEvent('facebook', 'share', 'dialog share begin', 0);
        }
    },

    invite: function() {
        if (!this.check_plugin()) {
            return
        }

        sdkbox.PluginFacebook.inviteFriends(
            "https://fb.me/322164761287181",
            "http://www.cocos2d-x.org/attachments/801/cocos2dx_portrait.png");


        // cc.log("==============")
        // cc.log("isLogin: " + sdkbox.PluginFacebook.isLoggedIn());
        // cc.log("userid: " + sdkbox.PluginFacebook.getUserID());
        // cc.log("permissions: ");
        // var perms = sdkbox.PluginFacebook.getPermissionList();
        // for (var i = 0; i < perms.length; i++) {
        //     cc.log("===> " + perms[i]);
        // }
        // cc.log("==============")
    }

});
