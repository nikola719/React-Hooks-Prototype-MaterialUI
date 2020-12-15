import React, { useCallback } from 'react';
import { Poster, PostAlbum } from '../../components';
import NavBar from '../../components/layout/NavBar';
import Container from '@material-ui/core/Container';

const HomePage = () => {
    return (
        <div>
            <NavBar />
            <Container maxWidth="sm">
                <PostAlbum />
                <Poster />
            </Container>
        </div>
    )
}

export default HomePage;