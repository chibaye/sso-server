import React from 'react'
import {parse} from 'cookie'

export const getServerSideProps = async ctx => {
    const {req, res} = ctx
    const {session} = parse(req.headers?.cookie || '')

    if (!session) {
        res.writeHead(303, {Location: '/login'})
        res.end()
    }

    return {
        props: {}
    }
}

const Home = () =>
    <div>
        <h1>Secure page for the SSO Server app</h1>
        <a href='https://sso-consumer.herokuapp.com'>Go to the Consumer app</a>
    </div>

export default Home