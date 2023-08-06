import log4js from 'log4js'

log4js.configure({
    appenders: {
        console: { type: 'console' },
        errorFile: {
            type: 'file',
            filename: 'logs/error.log',
        },
    },
    categories: {
        default: {
            appenders: ['console', 'errorFile'],
            level: 'error',
        },
    },
})

export const logger = log4js.getLogger()
