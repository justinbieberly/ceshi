/**
 * iView Admin Pro 开发配置
 * */

const env = process.env.NODE_ENV;

const Config = {
    // logo地址
    logo: {
        logoPath: '/assets/images/logo.jpg',
        logoDesc: ''
    },
    // 请求域名设置
    baseApiUrl: env === 'development' ? '/' : '/',
    /**
     *  路由设置
     * */
    route: {

    },
    /**
     * 版权设置
     * */
    copyright: {
        copyright: ' Copyright © www.longyi.com , All Rights Reserved.',
        contact: 'Email : 1234567@qq.com   QQ: 1234567'
    }
};

module.exports = Config;
