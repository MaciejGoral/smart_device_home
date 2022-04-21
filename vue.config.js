module.exports={
    devServer: {
        proxy: {
            '^/api/v1/devices$': {
                target: 'https://smart-device-home2.herokuapp.com/smartDevice',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {'^/api/v1/devices' : '/'},
            },
            '^/api/v1/devices/': {
                target: 'https://smart-device-home2.herokuapp.com/SmartDeviceDetails',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {'^/api/v1/devices/' : '/'},
            },
        }
    }
}