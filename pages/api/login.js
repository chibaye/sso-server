import cors from 'cors'
import nextConnect from 'next-connect'

import Login from '@/controllers/login'

const handler = nextConnect()

handler
    .use(cors())
    .post(Login.post)

export default handler