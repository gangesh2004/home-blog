import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/heroImage.jpg';
import './HomePage.css';
import CloudinaryImage from './CloudinaryImage';
import BlogCardSkeleton from '../components/BlogSkeleton/BlogCardSkeleton';
import SampleBlog from '../components/SampleBlog';


const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`);
        const blog = response.data.blogs;
        setBlogs(blog);
      } catch (error) {
        setBlogs(SampleBlog);
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    
    
    <Container sx={{mt:'1rem',mb:'2rem'}}>
    <div className='title-introducer'>
      {/* <h4>HomeBlog</h4> */}
      {/* <p> The Home Of Bloggers</p> */}
      
    
    {/* <img src={heroImage} alt='hero' loading='lazy'/> */}
    <div className='hero-text'>


    <h4> Unlock Your Voice: Share Your Thoughts, Showcase Your Talent</h4>
    <p className='subtitle'>
    Join a thriving community of bloggers and connect with our top bloggers.
    </p>
    <button className='btn-blog' onClick={()=>navigate("/create-blog")}> Start Writing Today!</button>
    </div>
    </div>


    <div className='about-blogger'>
      <h4>Welcome to HomeBlog</h4>
    <p>
    At HomeBlog, we believe that every voice matters. Our mission is to provide a user-friendly platform where passionate bloggers can share their insights, ideas, and stories. Whether you're an aspiring writer or a seasoned blogger, HomeBlog offers you the tools you need to showcase your talent to a wider audience, including opportunities to connect with recruiters from leading companies. 
    
    </p><p>Join us on this exciting journey of creativity and self-expression!


    </p>
    </div>
    
      <Typography variant='h3' gutterBottom sx={{fontWeight:600}}>Featured Blogs</Typography>
      <p className='feature-p'>Explore our most popular blogs, carefully curated based on view counts. Dive into diverse topics, gain fresh perspectives, and engage with like-minded individuals. Here are a few to check out:</p>
      <Grid container spacing={3}>
        {loading ? (
          [...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <BlogCardSkeleton />
            </Grid>
          ))
        ) : (
          blogs.map(blog => (
            <Grid item key={blog._id} xs={12} sm={6} md={4}>
              <Card className="blog-card">
                <CloudinaryImage public_id={blog.public_id} />
                <CardContent>
                  <Typography variant="h5">{blog.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{blog.author}</Typography>
                  <Button onClick={() => navigate(`/blog/${blog._id}`)}>View Detail</Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <div className='about-blogger'>
          <h4> Join Our Community</h4>

          <p>
          Creating an account with HomeBlog is quick and easy! Sign up to unlock features like uploading your own blogs and accessing personalized content tailored just for you.
          </p>

          <button className='btn-blog' onClick={()=>navigate("/login")}>Login / Sign Up</button>
      </div>

      <div className='upload-your-blog-section'>
        <h4>
        Share Your Stories with the World
        </h4>

        <p>
        Once you’re logged in, you can easily add your own blogs to HomeBlog. Showcase your knowledge, creativity, and unique voice. Engage with an audience eager to discover what you have to say!
        </p>

        <button className='btn-blog' onClick={()=>navigate("/create-blog")}>Add Your Blog Now</button>
      </div>
      <div className='testimonials'>
        <h4>
        What Our Users Say
        </h4>
        <div className='cards'>
          <div className='card'>
          <p className='quotes'>
          “HomeBlog has been a fantastic platform for me to share my thoughts and connect with professionals. I've even caught the eye of a recruiter!”
          </p>
          <p className='writer'>
          -Neesha R
          </p>
          </div>


          <div className='card'>
          <p className='quotes'>
         “I love how easy it is to upload my blogs. The community is supportive, and I feel encouraged to express my ideas.”
          </p>
          <p className='writer'>
          -Abhishek M
          </p>
          </div>
          <div className='card'>
          <p className='quotes'>
          “As a newcomer to blogging, HomeBlog made the process intuitive and enjoyable. I'm excited about the networking opportunities!”
          </p>
          <p className='writer'>
          -Sneha T
          </p>
          </div>
        </div>
      </div>


    </Container>
    
    
  );
};

export default HomePage;
