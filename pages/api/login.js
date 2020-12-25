import nextConnect from 'next-connect'

import Login from '@/controllers/login'

const handler = nextConnect()

handler
    .post(Login.post)

export default handler