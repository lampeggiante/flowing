#!/bin/sh

# 确保脚本在出错时退出
set -e

# 定义变量
push_addr=https://github.com/lampeggiante/flowing.git
commit_info=`git describe --all --always --long`
repo_path=packages/flowing-note
dist_path=dist
push_branch=gh-pages

# 检查是否在正确的目录
if [ ! -d "$repo_path" ]; then
    echo "错误: 找不到 $repo_path 目录"
    exit 1
fi

# 进入项目目录并构建
cd $repo_path
echo "开始构建项目..."
pnpm build

# 进入构建目录
cd $dist_path
echo "准备部署到 GitHub Pages..."

# 初始化 git 仓库
git init
git add -A
git commit -m "deploy $commit_info"
git remote add origin $push_addr
git branch -M master
git push -f $push_addr HEAD:$push_branch

# 清理
cd ../
rm -rf $dist_path

echo "部署完成！"
