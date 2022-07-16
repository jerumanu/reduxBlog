import { useSelector,  } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError  } from "./postsSlice";

import PostsExcerpt from "./PostsExcept";
import SpinnerCoin from '../../components/SpinnerCoin';


const PostsList = () => {
  

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

   

    let content;
    if (postStatus === 'loading') {
        content = <SpinnerCoin />
    } else if (postStatus === 'succeeded') {
     const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
       content = orderedPosts.map(post => <PostsExcerpt  post={post} key={post.id}/> )
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }
    return (
        <div className="container">
        <section>
            
           {content}
        </section>
        </div>
    )
}
export default PostsList
