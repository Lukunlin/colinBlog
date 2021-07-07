module.exports = {
    title: 'colinBlog',
    description: '专注记事和一些技术技巧记录的博客',
    markdown: {
        lineNumbers: true
    },
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'colinBlog',
            description: '专注记事和一些技术技巧记录的博客'
        }
    },
    head: [
        ['link', { rel: 'icon', href: 'http://static.tongnianya.vip/renyiLogo.jpeg' }]
    ],
    dest: './dist',
    themeConfig: {
        smoothScroll: true,
        nav: [
            { text: '仁义咏春官网', link: 'http://www.renyi1893.com' },
            { text: '联系我', link: 'mailto:bboykungu@qq.com' },
        ],
        nextLinks: false,
        prevLinks: false,
        sidebar: [
            {
                title: '仁义咏春专栏',
                path: '/renyiyongchun/',
            },
            {
                title: 'macOs专栏',
                path: '/mac/'
            },
            {
                title: 'windows专栏',
                path: '/windows/'
            },
            {
                title: '软件开发专栏',
                children: ['coding/git', 'coding/webstorm', 'coding/vscode', 'coding/problem']
            },
            {
                title: '实用工具',
                path: '/practicalTools/'
            }
        ],
        lastUpdated: '最后更新时间为: ',
        plugins: [
            [
                '@vuepress/google-analytics',
                {
                    ga: 'UA-153242456-1'
                }
            ],
            '@vuepress/back-to-top',
            [
                '@vuepress/pwa',
                {
                    updatePopup: {
                        message: '发现新内容可用',
                        buttonText: '刷新'
                    }
                }
            ]
        ]
    }
}
