module.exports={
    devServer: {
        proxy: {
            '^/api/v1/devices$': {
                target: 'http://localhost:5000/smartDevice',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {'^/api/v1/devices' : '/'},
            },
            '^/api/v1/devices/': {
                target: 'http://localhost:5000/SmartDeviceDetails',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {'^/api/v1/devices/' : '/'},
            },
        }
    }
}