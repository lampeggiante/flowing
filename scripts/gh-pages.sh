#!/usr/bin/env sh

set -e
push_addr=https://github.com/YuXingLiang214/flowing.git
commit_info=`git describe --all --always --long`
repo_path=packages/flowing-note
dist_path=dist # 打包生成的文件夹路径
push_branch=gh-pages # 推送的分支

cd $repo_path
pnpm build
cd $dist_path
git init
git add -A
git commit -m "deploy $commit_info"
git remote add origin $push_addr
git branch -M master
git push -f $push_addr HEAD:$push_branch

cd ../
rm -rf $dist_path
