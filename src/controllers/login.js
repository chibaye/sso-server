import {serialize} from 'cookie'

const TOKEN_NAME = 'session'
const MAX_AGE = 60 * 60 * 24 // 24 hours

const user = {
    id: '5ec8f74f32973c7b7cb7cce9',
    name: 'Test User',
    email: 'test@user.com'
}

const Login = {
    post(req, res) {
        const {refid} = req.headers
        const {email, password} = req.body

        console.log({refid, email, password})

        const cookie = serialize(TOKEN_NAME, user.id, {
            maxAge: MAX_AGE,
            expires: new Date(Date.now() + MAX_AGE * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax'
        })

        res.setHeader('Set-Cookie', cookie)

        if (email !== user.email && password !== 'secret') return res.status(422).send({error: 'Invalid email/password'})

        if (refid) return res.redirect(`https://sso-consumer.herokuapp.com/?ssoToken=${user.id}&refid=${refid}`)

        return res.send(user)
    }
}

export default Login