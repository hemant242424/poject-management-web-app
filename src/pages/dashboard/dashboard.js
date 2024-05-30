import './dashboard.css'
import ProjectList from "../../components/ProjectList"
import { useCollection } from '../../hooks/useCollection'
import ProjectFilter from './projectFilter';
import {useState} from 'react'
import {useAuthContext} from '../../hooks/useAuthContext'

export default function Dashboard(){
    const {documents,error}=useCollection('projects');
    const [currFilter,setCurrentFilter]=useState('all');
    const changeFilter=(newFilter)=>{
       
        setCurrentFilter(newFilter)
    }
    const {user}=useAuthContext()
    const filteredprojects=documents ? documents.filter((document)=>{
        switch(currFilter){ 
            case 'all':
                return true
            case 'mine':
                let assignedToMe=false
                document.assignedUsersList.forEach((u)=>{
                    if(user.uid===u.id){
                        assignedToMe=true
                    }
                })
                return assignedToMe
            case 'development':
            case 'design':
            case 'sales':
            case 'marketing':
                return document.category===currFilter
             default:
                 return true       
    }
    }):null

    return (
        <div>
           <h2 className="page-title">Dashboard</h2>
           {error && <div className="error">{error}</div>}
           {document && <ProjectFilter currFilter={currFilter} changeFilter={changeFilter}/>}
           {filteredprojects && <ProjectList projects={filteredprojects}/>}
        </div>
    )
}