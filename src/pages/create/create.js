import { useState, useEffect } from 'react';
import './create.css';
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection"
import { timeStamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import { useNavigate } from 'react-router-dom'




const categories = [
    { label: "Design", value: "design" },
    { label: "Development", value: "development" },
    { label: "Sales", value: "sales" },
    { label: "Marketing", value: "marketing" }
]

export default function Create() {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedTo, setAssignedTo] = useState([]);
    const [users, setUsers] = useState([]);
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { documents } = useCollection("users");
    const { addDocument, response } = useFirestore('projects');


    useEffect(() => {
        if (documents) {
            const options = documents.map(user => {
                return { label: user.displayName, value: user };
            })
            setUsers(options);
        }

    }, [documents])

    const createdBy = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.uid
    }

    const assignedUsersList = assignedTo.map((u) => {
        return {
            displayName: u.value.displayName,
            photoURL: u.value.photoURL,
            id: u.value.id

        }
    })

    const project = {
        name,
        details,
        category: category.value,
        dueDate: timeStamp.fromDate(new Date(dueDate)),
        comments: [],
        createdBy,

        assignedUsersList

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        if (!category) {
            setFormError("Please Select a Category");
            return;
        }
        if (assignedTo.length < 1) {
            setFormError("Please Select at least one user");
            return;
        }
        await addDocument(project)
        if (!response.error) {
            navigate('/dashboard');
        }
    }

    return (
        <div className="create-form">
            <h2 className="page-title">Add a Project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project Name:</span>
                    <input
                        required
                        type="text"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project Details:</span>
                    <textarea
                        required
                        type="text"
                        onChange={e => setDetails(e.target.value)}
                        value={details}
                    />
                </label>
                <label>
                    <span>Project Due Date:</span>
                    <input
                        required
                        type="date"
                        onChange={e => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>Project Category:</span>
                    <Select
                        onChange={option => setCategory(option)}
                        options={categories}
                    />
                </label>
                <label>
                    <span>Project Assigned Users:</span>
                    <Select
                        onChange={option => setAssignedTo(option)}
                        options={users}
                        isMulti
                    />
                </label>
                <button type="submit" className="btn">Add Project</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}