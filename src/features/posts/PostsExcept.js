import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from 'react-router-dom';



const PostsExcerpt = ({ post }) => {
    return (
        <div className="d-inline-flex p-3">
            
    
      <div className="card-deck p-1">
         <div className=" card shadow-sm p-5 mb-5 bg-body rounded " style={{width: "33rem"}}>
  <div className="card-body">
    <h5 className="card-title">{post.title}</h5>
    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p className="card-text">{post.body.substring(0, 75)}</p>
    <Link to={`post/${post.id}`} className="btn btn-primary">View Post</Link>
    <PostAuthor userId={post.userId} />

    <TimeAgo timestamp={post.date} />
    <ReactionButtons post={post} />
    </div>
      </div>
      </div>
   
</div>
           
         
    )
}
export default PostsExcerpt
