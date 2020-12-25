import cors from 'cors'
import nextConnect from 'next-connect'

import Login from '@/controllers/login'

const handler = nextConnect()

handler
    .use(cors({
        origin: '*',
        credentials: true,
        allowedHeaders: 'Origin, Content-Type, X-Auth-Token',
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']
    }))
    .post(Login.post)

export default handler