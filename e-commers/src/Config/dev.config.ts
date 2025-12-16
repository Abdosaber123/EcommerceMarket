export default () => ({
    port: process.env.PORT,
    db: {
        url: process.env.DB_URL
    },
    Access: {
        JWB_SECRET: process.env.JWB_SECRET
    },
    EMAIL: {
        USER_EMAIL: process.env.USER_EMAIL,
        USER_PASSWORD: process.env.USER_PASSWORD
    }
})