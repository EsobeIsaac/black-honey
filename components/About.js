import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image'

function About() {
  return (
    <Box py={8}>
        <Container>
            <Typography variant='h4' mb={6} color={'primary.main'}>ABOUT ME</Typography>
            <Typography variant='body1' gutterBottom>Welcome to the realm of words, where emotions dance in the delicate cadence of verse and imagination takes flight on the wings of ink. I am Black-Honey, a poet who seeks to capture the ephemeral beauty of the human experience and distill it into the timeless elixir of poetry. In the hushed corridors of language, I weave threads of sentiment, crafting verses that resonate with the heartbeat of the soul.</Typography>
            <Typography variant='body2'>Within these pages, you will discover a tapestry of emotions, woven with the threads of introspection, love, melancholy, and the kaleidoscope of human existence. Each poem is a brushstroke on the canvas of my thoughts, an intimate exploration of the extraordinary within the ordinary.</Typography>
        </Container>
    </Box>
  );
}

export default About;
