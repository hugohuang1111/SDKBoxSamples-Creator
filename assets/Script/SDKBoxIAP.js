cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function() {
        this.iap_init();

        let list = cc.find('Canvas/scrollView/view/product_list').getComponent('ProductList');
        list.resetProductsList()
            //list.resetProductsList([{name: 'name1', price: '2344'}, {name: 'name2', price: '2344'}, {name: 'name3', price: '2344'}])
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
    // },

    popScene: function() {
        cc.director.loadScene('Menu');
    },

    /*
     * IAP Plugin Begin
     */
    iap_init: function() {
        if ('undefined' == typeof(sdkbox)) {
            console.log('sdkbox is undefined')
            return
        }
        if ('undefined' == typeof(sdkbox.IAP)) {
            console.log('sdkbox.IAP is undefined')
            return
        }

        sdkbox.IAP.init();
        sdkbox.IAP.setDebug(true);
        let a = {
            onSuccess: function(product) {
                //Purchase success
                console.log("Purchase successful: " + product.name)
            },
            onFailure: function(product, msg) {
                //Purchase failed
                //msg is the error message
                console.log("Purchase failed: " + product.name + " error: " + msg);
            },
            onCanceled: function(product) {
                //Purchase was canceled by user
                console.log("Purchase canceled: " + product.name);
            },
            onRestored: function(product) {
                //Purchase restored
                console.log("Restored: " + product.name);
            },
            onProductRequestSuccess: function(products) {
                let list = cc.find('Canvas/scrollView/view/product_list').getComponent('ProductList');
                list.resetProductsList(products)
            },
            onProductRequestFailure: function(msg) {
                //When product refresh request fails.
                console.log("Failed to get products");
            }
        }
        sdkbox.IAP.setListener(a);
    },

    iap_purchase: function() {
        if ('undefined' == typeof(sdkbox)) {
            console.log('sdkbox is undefined')
            return
        }
        if ('undefined' == typeof(sdkbox.IAP)) {
            console.log('sdkbox.IAP is undefined')
            return
        }

        sdkbox.IAP.purchase();
    },

    iap_restore: function() {
        if ('undefined' == typeof(sdkbox)) {
            console.log('sdkbox is undefined')
            return
        }
        if ('undefined' == typeof(sdkbox.IAP)) {
            console.log('sdkbox.IAP is undefined')
            return
        }

        sdkbox.IAP.restore();
    },

    iap_refresh: function() {
        if ('undefined' == typeof(sdkbox)) {
            console.log('sdkbox is undefined')
            return
        }
        if ('undefined' == typeof(sdkbox.IAP)) {
            console.log('sdkbox.IAP is undefined')
            return
        }

        sdkbox.IAP.refresh();
    },
    /*
     * IAP Plugin End
     */


});
