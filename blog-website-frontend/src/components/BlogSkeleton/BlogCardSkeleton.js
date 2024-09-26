// BlogCardSkeleton.jsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const BlogCardSkeleton = () => {
  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      <Skeleton height={140} />
      <CardContent>
        <Typography variant="h5">
          <Skeleton width="60%" />
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <Skeleton width="80%" />
          <Skeleton width="80%" />
          <Skeleton width="80%" />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCardSkeleton;
