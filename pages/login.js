import React, {useState} from 'react'
import Router, {useRouter} from 'next/router'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const Home = () => {
    const {query} = useRouter()
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()

        if (query.refid) headers.refid = query.refid

        const res = await fetch('/api/login', {
            headers, method: 'POST',
            withCredential: true,
            body: JSON.stringify({email, password})
        })

        if (res.ok) {
            await Router.push('/')
        } else {
            const data = await res.json()
            setError(data.error)
        }
    }

    return <div>
        <h1>Sign In</h1>
        <div>Continue to {query.refid || 'server'}</div>
        <br/>
        <p>{error}</p>
        <input placeholder='Email' value={email} onChange={({target: {value}}) => setEmail(value)}/>
        <br/>
        <input placeholder='Password' value={password} onChange={({target: {value}}) => setPassword(value)}/>
        <br/>
        <button onClick={handleSubmit}>Submit</button>
    </div>
}

export default Home