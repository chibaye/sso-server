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
    <h1>Secure page for the SSO Server app</h1>

export default Home