import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import './BlogDetailPage.css';
import CloudinaryImage from './CloudinaryImage';
import SampleBlog from '../components/SampleBlog';

const BlogDetailPage = () => {
  function findBlogById(id, blogs) {
    return blogs.find(blog => blog._id === id);
  }

  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [toc, setToc] = useState([]);
  const blogLocal = findBlogById(id, SampleBlog);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/${id}`);
        const blogData = response.data;
        console.log(blogData)
        blogData.createdAt = formatDate(blogData.createdAt);
        blogData.updatedAt = formatDate(blogData.updatedAt);
        setBlog(blogData);
        generateToc(blogData.content);
      } catch (error) {
        setBlog(blogLocal);
        generateToc(blogLocal);
        
        console.error('Failed to fetch blog:', error);
      }
    };

    fetchBlog();
  }, [id, blogLocal]);
  const generateToc = (content) => {
    if (typeof content !== 'string') {
      return;
    }

    const headings = [];
    parse(content, {
      replace: domNode => {
        if (domNode.type === 'tag' && /h[1-6]/.test(domNode.name)) {
          const id = domNode?.children[0]?.data?.replace(/\s+/g, '-').toLowerCase();
          headings.push({ id, text: domNode.children[0].data, level: domNode.name });
        }
      }
    });
    setToc(headings);
  };
  const formatDate = (date) => {
    if (typeof date === 'string') {
      const parsedDate = new Date(date);
      return isNaN(parsedDate.getTime()) ? date : parsedDate.toLocaleString();
    }
    return date;
  };

  const addIdsToHeadings = (content) => {
    if (typeof content !== 'string') {
      return content;
    }

    return parse(content, {
      replace: domNode => {
        if (domNode.type === 'tag' && /h[1-6]/.test(domNode.name)) {
          const id = domNode?.children[0]?.data?.replace(/\s+/g, '-').toLowerCase();
          domNode.attribs.id = id;
        }
      }
    });
  };

  return (
    <>
      <div className='blog-page-container'>
        <div className='pageLeft'>
          <h3>Table of Content</h3>
          <ul className='toc'>
            { toc && toc.map((heading, index) => (
              <li key={index} className={`toc-item toc-${heading.level}`}>
                <a href={`#${heading.id}`}>{heading.text}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className='blog-page'>

          <div className='blog-title'>
            <h2>{blog?.title}<sub className='viewCount'>Blog Views: {blog.viewCount}</sub></h2>
            </div>
          <div className='blog-author'><strong>by {blog?.author} </strong> created at <strong>{blog?.createdAt}</strong></div>
          <CloudinaryImage public_id={blog?.public_id} />
          {/* <div className='blog-description' dangerouslySetInnerHTML={{ __html: blog?.content }}> */}
          <div className='blog-description'>
            {addIdsToHeadings(blog?.content)}
          </div>

          {/* </div> */}
        </div>
      </div>
      
    </>
  );
};

export default BlogDetailPage;
