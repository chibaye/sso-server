import cors from 'cors'
import nextConnect from 'next-connect'

import Login from '@/controllers/login'

const handler = nextConnect()

handler
    .use(cors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST']
    }))
    .post(Login.post)

export default handler