module.exports = {
	title: "colinBlog",
	description: "专注记事和一些技术技巧记录的博客",
	markdown: {
		lineNumbers: true
	},
	locales: {
		"/": {
			lang: "zh-CN",
			title: "colinBlog",
			description: "专注记事和一些技术技巧记录的博客"
		}
	},
	dest: "./dist",
	themeConfig: {
		logo: "http://static.tongnianya.vip/renyiLogo.jpeg",
		navbar: [
			{ text: "仁义咏春官网", link: "http://www.renyi1893.com" },
			{
				text: "技术支持 | 友情支持",
				children: [
					{
						text: "茂神博客",
						link: "https://fe-mm.com"
					},
					{
						text: "Vuepress",
						link: "https://v2.vuepress.vuejs.org/zh/"
					}
				]
			},
			{ text: "联系我", link: "mailto:bboykungu@qq.com" }
		],
		sidebar: [
			{
				text: "仁义咏春专栏",
				link: "/renyiyongchun/"
			},
			{
				text: "macOs专栏",
				link: "/mac/"
			},
			{
				text: "windows专栏",
				link: "/windows/"
			},
			{
				text: "软件开发专栏",
				children: ["/coding/git.md", "/coding/webstorm.md", "/coding/vscode.md", "/coding/problem.md", "/coding/typescripts.md"]
			},
			{
				text: "实用工具",
				link: "/practicalTools/"
			}
		],
		editLink: false,
		contributorsText: "贡献者们",
		lastUpdatedText: "最后更新时间为",
		notFound: ["没有找到当前页面路径,请联系管理员"],
		backToHome: "回到首页",
		plugins: [
			[
				"@vuepress/google-analytics",
				{
					ga: "UA-153242456-1"
				}
			],
			"@vuepress/back-to-top",
			[
				"@vuepress/pwa",
				{
					updatePopup: {
						message: "发现新内容可用",
						buttonText: "刷新"
					}
				}
			]
		]
	}
}
