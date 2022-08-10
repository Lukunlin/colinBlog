# MacOs系列

## Homebrew

Mac 上安装命令行程序最好的工具

安装

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

切换镜像

```sh
# 切换 brew.git
cd "$(brew --repo)"
git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git

# 切换 homebrew-core.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git

# 刷新
brew update

# 切换 homebrew-bottles
# 查看当前 shell
echo $SHELL

# Bash 版本
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile

# Zsh 版本
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.zshrc
source ~/.zshrc
```

切换镜像详细可查看[阿里云 Homebrew 镜像](https://developer.aliyun.com/mirror/homebrew?spm=a2c6h.13651102.0.0.e40a1b11ZkPX9D)

[Github](https://github.com/Homebrew)
[软件官网](https://brew.sh/index_zh-cn)


## iTerm2

Mac 上最好用的终端

0. 需要设置为zsh
1. 支持子窗口
2. 自动补全
3. 查看粘贴历史
4. 自定义配置项

```sh
# 查看所有的 shell
cat /etc/shells

# 查看当前窗口使用的 shell
echo $SHELL

# 查看系统用户默认的 shell
cat /etc/passwd | grep sh

# 切换系统默认 shell
chsh -s /bin/zsh
```

[Github](https://github.com/gnachman/iTerm2)
[软件官网](https://www.iterm2.com)

如果你的电脑是初次安装,那么对于zsh的配置,参考如下(自行安装Git管理工具)

```sh
# oh-my-zsh安装
git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh

# 导出.zshrc配置
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc

# 修改zshrc配置
vim ~/.zshrc
```

到这里就是自行配置一些自己需要的指令拉

我的配置如下:(个人爱好)

```sh
# 配置默认ls命令的展示形式
alias ll='ls -lhGF'
# 配置ls命令按照大小排序
alias lls='ls -lhSGF'
# 配置ls命令按照时间先后排序
alias llt='ls -lhtGF'
# 配置默认ls命令的展示形式,包含隐藏文件
alias lla='ls -alhGF'
# 强制删除
alias crm='rm -rf'
# 快速查看当前分支
alias gss='git branch | grep \*'
```

最后按照上面设置iTerm2的配置,设定zsh为默认配置

```sh
# 切换系统默认 shell
chsh -s /bin/zsh
```

输入管理员密码,确认后即可重启终端即可使用

## 效率神器 Alfred

1. 定位文件、打开文件
2. 打开网址、书签、App
3. 自定义搜索
4. 查看剪贴板历史
5. 计算器、查词典、运行 `shell` 命令

[软件官网](https://www.alfredapp.com)

## Mac 微信的功能拓展

1. 消息防撤回并同步到手机
2. 免认证登录与多开
3. 退群监控
4. 屏蔽更新
5. Ai自动回复自动聊天
6. 自动转发
7. 远程控制(bigSur11.4存在问题)


## 怎么安装?

### 安装方式一：普通安装(clone最新版本并安装)
```
sudo rm -r -f WeChatExtension-ForMac && git clone --depth=1 https://github.com/MustangYM/WeChatExtension-ForMac && cd WeChatExtension-ForMac/WeChatExtension/Rely && ./Install.sh && cd ~
```
### 其他方式请在Github社区获取

[Github](https://github.com/MustangYM/WeChatExtension-ForMac)



## eZip

专为 macOS 而设计的压缩软件

1. 界面简洁、美观，完美兼容 Mojave
2. 支持超过 20 种压缩格式
3. 批量文件加密

[软件官网](https://ezip.awehunt.com)




## 超强支持截图翻译的软件 Bob

1. 支持划词、截图、输入翻译
2. 支持翻译多开
3. 自动识别语种
4. 可自定义插件

[Github](https://github.com/ripperhe/Bob)
[软件官网](https://ripperhe.gitee.io/bob)
