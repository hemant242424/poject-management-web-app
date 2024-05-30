import './project.css'
import Avatar from '../../components/Avatar'
import { useFirestore } from "../../hooks/useFirestore"
import {useAuthContext} from "../../hooks/useAuthContext"
import {useNavigate} from "react-router-dom"

export default function ProjectSummary({ project }) {
  const { deleteDocument } = useFirestore('projects')
  const {user}= useAuthContext()
  const navigate = useNavigate()

  const handleClick = (e)=>{
    deleteDocument(project.id)
    navigate('/Dashboard')
  }

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p>Owner: {project.createdBy.displayName}</p>
        <p className="details">
          {project.details}
        </p>
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map(user => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      
      {project.createdBy.id===user.uid && (
      <button className="btn" onClick={handleClick}>Mark as completed</button>
      )}
    </div>
  )
}