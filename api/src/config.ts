export const config: { [key: string]: any } = {
    default: {
        server: {
            port: 8080,
        },
    },
    dev: {
        database: {
            url: `https://your-dev-projectID.firebaseio.com`,
        }
    },
    prd: {
        database: {
            url: `https://your-prd-projectID.firebaseio.com`,
        }
    },
}