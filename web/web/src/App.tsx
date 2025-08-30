
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [posts,setPosts] = useState([]);
  useEffect(()=>{
    const getPosts = async()=>{
      const res =await fetch(`http://localhost:3000/v1/posts`,
        {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMTNhYWQwYi1iMmQ2LTQ2NzEtYWJkYi0xNzJhOTM0YTgzYTUiLCJpYXQiOjE3NTI2ODQyMzh9.7iV9w5uchGMfM4F5iQDdCIzq0f8nZhAlO9TnqWmaZWQ'
          }
      }
      );
      const data = await res.json();
      return data.posts;
    }
    let fetchedPosts =[];

    getPosts().then((res)=>{
      fetchedPosts=res;
      setPosts(fetchedPosts);
      console.log(fetchedPosts);
      
    });

  },[])

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.url}</p>
          <small>Posted by {post.userId} at {post.postedAt}</small>
        </div>
      ))}
    </>
  )
}

export default App
