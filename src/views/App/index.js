import React from 'react'
import { BrowserRouter } from 'react-router-dom'
// import styled from 'styled-components'
// import Header from 'components/Header'
import routes from './routes'

const App = () => {
    return (
        <BrowserRouter basename='/TQL_V'>
            <div style={{ height: '100%'}}>
                {routes}
            </div>
            {/* <div>
                <Footer />
            </div> */}
        </BrowserRouter>
    )
}

export default App
