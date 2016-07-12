cc.Class({
    extends: cc.Component,

    properties: {
        productItemPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    resetProductsList: function(products) {
        let createItem = function(product_name, x, y) {
            var item = cc.instantiate(self.productItemPrefab);
            var productItem = item.getComponent('ProductItem');
            productItem.label.string = product_name;

            item.x = x;
            item.y = y;
            return item;
        }

        let list = this.node
        list.removeAllChildren();
        if ('undefined' == typeof(products)) {
            return
        }
        //Returns you the data for all the iap products
        //You can get each item using following method
        let itemH = -50;
        let itemX = -130;
        let self = this
        for (let i = 0; i < products.length; i++) {
            list.addChild(createItem(products[i].name, itemX, itemH * i));

            console.log("================");
            console.log("name: " + products[i].name);
            console.log("price: " + products[i].price);
            console.log("================");
        }
        list.height = Math.abs(products.length * itemH) + 30;
    }

});
