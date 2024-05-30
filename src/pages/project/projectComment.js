import Avatar from '../../components/Avatar'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import {timeStamp} from "../../firebase/config"
import {useFirestore} from '../../hooks/useFirestore'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function ProjectComment({project}) {
    const { user } = useAuthContext()
    const [newComment, setNewComment] = useState('');
    const {updateDocument,response}=useFirestore('projects')

    const handleSubmit=async(e)=>{
        e.preventDefault();

        const commentToAdd={
            displayName:user.displayName,
            photoURL:user.photoURL,
            content:newComment,
            createdAt:timeStamp.fromDate(new Date()),
            id:Math.random()
        }

        await updateDocument(project.id,{
            comments:[...project.comments,commentToAdd]
        })
        if(!response.error){
        setNewComment('')
        }
    }

    return (
        <div className="project-comments">
           
            <h4>Project comments</h4>
            <ul>
                {project.comments.length>0 && project.comments.map(comment=>{
                    return (
                    <li key={comment.id}>
                        <div className="comment-author">
                            <Avatar src={comment.photoURL} />
                            <p>{comment.displayName}</p>
                        </div>
                        <div className="comment-date">
                            <p>{formatDistanceToNow(comment.createdAt.toDate(),{addSuffix:true})}</p>
                        </div>
                        <div className="comment-content">
                            <p>{comment.content}</p>
                        </div>
                    </li>
                )})}
            </ul>
            <form className="add-comment" onSubmit={handleSubmit}>
                <label>
                    <span>Add new comment</span>
                    <textarea
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                    />
                </label>
                <button className="btn">Add Comment</button>
            </form>
        </div>
    )
}