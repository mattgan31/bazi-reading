import React from 'react'
import Form from '../components/Form'

export default function Home() {
    return (
        <div className='flex flex-col gap-4'>
            <h1>Bazi Reading App</h1>
            <div>
                Discover the ancient wisdom of Chinese metaphysics through personalized Bazi (Four Pillars of Destiny) analysis.
            </div>
            <Form/>
        </div>
    )
}
