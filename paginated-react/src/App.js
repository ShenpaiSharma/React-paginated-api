import './App.css';
import { useEffect, useState } from "react";

function App() {

  const [posts, setPosts] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const pages = new Array(totalPages).fill(null).map((v, i) => i);

  useEffect(() => {
    fetch(`http://localhost:4000/posts?page=${pageNum}`)
      .then((response) => response.json())
      .then(({ total_pages, posts }) => {
        setPosts(posts);
        setTotalPages(total_pages);
        console.log(posts);
      })
  }, [pageNum]);

  function previousClick() {
    setPageNum(Math.max(0, pageNum - 1));
  }

  function nextClick() {
    setPageNum(Math.min(totalPages - 1, pageNum + 1));
  }

  return (
    <div className="App">
      <h3>Page is {pageNum + 1}</h3>
      {posts.map((post, id) => (
        <div key={id} className="post">
          <h3>{post.text}</h3>
          <p>{post.post}</p>
        </div>
      ))}

      <button onClick={previousClick} >Previous</button>
      {pages.map((index) => (
        <button key={index} onClick={() => setPageNum(index)} >{index + 1}</button>
      ))}
      <button onClick={nextClick} >Next</button>

    </div>
  );
}

export default App;
