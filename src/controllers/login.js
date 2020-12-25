import {serialize} from 'cookie'

const TOKEN_NAME = 'session'
const MAX_AGE = 60 * 60 * 24 // 24 hours

const user = {
    id: '5ec8f74f32973c7b7cb7cce9',
    name: 'Test User',
    email: 'test@user.com'
}

const sessionUser = {}
const sessionApp = {}

const originAppName = {
    'https://sso-consumer.herokuapp.com': 'sso-consumer'
}

// these token are for the validation purpose
const intrmTokenCache = {}

const fillIntrmTokenCache = (origin, id, intrmToken) => {
    intrmTokenCache[intrmToken] = [id, originAppName[origin]]
}
const storeApplicationInCache = (origin, id, intrmToken) => {
    if (sessionApp[id] == null) {
        sessionApp[id] = {
            [originAppName[origin]]: true
        }
        fillIntrmTokenCache(origin, id, intrmToken)
    } else {
        sessionApp[id][originAppName[origin]] = true
        fillIntrmTokenCache(origin, id, intrmToken)
    }
    console.log({...sessionApp}, {...sessionUser}, {intrmTokenCache})
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

        storeApplicationInCache(refid, user, user.id)
        if (refid) return res.redirect(`https://sso-consumer.herokuapp.com/?ssoToken=${user.id}&refid=${refid}`)

        return res.send(user)
    }
}

export default Login