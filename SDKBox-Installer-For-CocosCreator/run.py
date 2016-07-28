#!/usr/bin/python
# -*- coding: utf-8 -*-

import os
import distutils.dir_util
import subprocess

def create_dir_if(path):
    if os.path.exists(path):
        return
    if path.endswith('/'):
        os.makedirs(path)
        return
    else:
        dir_name = os.path.dirname(path)
        if not os.path.exists(dir_name):
            os.makedirs(dir_name)

def copy_folder(src, dest):
    distutils.dir_util.copy_tree(src, dest)

def run(cmd, quiet=False):
    if quiet:
        ret = subprocess.call(cmd, shell=True, stdout=subprocess.PIPE)
    else:
        ret = subprocess.call(cmd, shell=True)
    if ret != 0:
        print("==> Command failed: {0}".format(cmd))
        print("==> Stopping build.")
        sys.exit(1)

def main():
    cur_dir = os.path.dirname(os.path.realpath(__file__))

    # 1. check creator exist if
    CREATOR_HOME = os.path.join(os.path.expanduser('~'), '.CocosCreator')
    if (not os.path.isdir(CREATOR_HOME)):
        print("Can't find Creator, please install CocosCreator.");
        return;

    # 2. check instaler installed if
    creator_package_folder = os.path.join(CREATOR_HOME, 'packages');
    sdkbox_installer_folder = 'SDKBox-installer'
    dest_folder = os.path.join(creator_package_folder, sdkbox_installer_folder)
    if (os.path.isdir(dest_folder)):
        print('Abort. SDKBox installer for CocosCreator has been installed')
        return;

    # 3. copy installer
    create_dir_if(dest_folder)
    copy_folder(os.path.join(cur_dir, sdkbox_installer_folder), dest_folder)

    # 4. check installer console exist if and install it
    SDKBOX_HOME = os.path.join(os.path.expanduser('~'), '.sdkbox')
    if (not os.path.isdir(SDKBOX_HOME)):
        run('python -c \"import urllib; s = urllib.urlopen(\'https://raw.githubusercontent.com/sdkbox-doc/en/master/install/install.py\').read(); exec s\"')

    print('SUCCESS! SDKBox installer for CocosCreator has been installed');

if __name__ == '__main__':
    main()
