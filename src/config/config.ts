import dotenv from 'dotenv'

dotenv.config();

const config = {
    environment: process.env.NODE_ENV || 'development',
    server: {
        port: process.env.NODE_PORT || '3000'
    },
    mongoose: {
        url: process.env.MONGODBURL || "",
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    },
    integrations: {
        bling: {
            token: process.env.BLING_TOKEN || ''
        },
        pipedrive: {
            token: process.env.PIPEDRIVE_TOKEN || ''
        }
    }
}

export default config;