import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLandingPage = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledWelcome = styled.div`
    font-size: 2rem;
`

const StyledLink = styled.div`
    margin: 2rem;
`

class LandingPage extends React.Component {
    render () {
        return (
            <StyledLandingPage>
                <StyledWelcome>Welcome to the Data Visualizer!</StyledWelcome>
                <StyledLink>
                    <Link to='gui'>Let's Go!</Link>
                </StyledLink>
            </StyledLandingPage>
        )
    }
}

export default LandingPage
