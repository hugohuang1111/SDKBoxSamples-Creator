# SDKBox Samples for cocos creator

## English

this is a sample project for how to use SDKBox plugin in cocos creator project.

Steps:
1. build project in creator build setting window(or press Shift+Command+B and build)
2. now creator has generate cocos2d-x project under `build/jsb-xxx` folder
3. run `sdkbox import iap -p build/jsb-xxx` or `sdkbox import facebook -p build/jsb-xxx`
4. compile this project
5. run

Now, this project just implement code how to invoke `IAP`, `Facebook` plugins, other plugins of SDKBox is the sample.
and we will add more sample code of other plugins ASAP.

## 中文
这是一个把SDKBox的插件集成到cocos creator project中的样例工程.
在creator中已写好了IAP,Facebook插件的代码,只需要你构建好工程,把对应你想验证的插件集成进工程中就可以了.

以下是步骤:
1. 在 Creator 的工程构建界面,构建工程(也可以直接快捷键 Shift+Command+B 调出构建窗口,然后构建)
2. 构建好后, Creator 就把-x工程生成出来了, 放在 build/jsb-xxx 下
3. 把 `iap`, `facebook` 安装到工程中, 运行以下命令 `sdkbox import iap -p build/jsb-xxx` 或 `sdkbox facewbook -p build/jsb-xxx`
4. 编译工程
5. 运行

现在此工程中只写了 `IAP`, `Facebook` 插件的调用实现代码,其它插件雷同,后续也会不断补充进新的插件调用方法
