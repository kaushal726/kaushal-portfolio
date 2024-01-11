import React from 'react'
import { Body } from './Home/Body'
import Connect from './Connect/Connect'

const Index = () => {
    return (
        <div className=" h-full fancy-scrollbar">
            {<Body />}
            {<Connect />}
        </div>
    )
}

export default Index