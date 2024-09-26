// SkeletonBlogPage.jsx
import React from 'react';
import { Container, Grid } from '@mui/material';
import BlogCardSkeleton from './BlogCardSkeleton';

const SkeletonBlogPage = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <BlogCardSkeleton />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SkeletonBlogPage;
