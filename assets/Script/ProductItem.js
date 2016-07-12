cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
    // },

    purchase: function() {
        console.log('purchase:' + this.label.string)
        sdkbox.IAP.purchase(this.label.string);
    }
});
