import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SinglePostPage = () => {
    const { postId } = useParams()

    const post = useSelector((state) => selectPostById(state, Number(postId)))

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        
    <div className="container p-3 ">
            
    
            <div className="card-deck p-1 d-flex justify-content-center ">
               <div className=" card" style={{width: "60rem"}}>
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">{post.body.substring(0, 75)}</p>
          <Link to={`/post/edit/${post.id}`} className="btn btn-primary">Edit Post</Link>
          <PostAuthor userId={post.userId} />
      
          <TimeAgo timestamp={post.date} />
          <ReactionButtons post={post} />
          </div>
            </div>
            </div>
            </div>
    )
}

export default SinglePostPage