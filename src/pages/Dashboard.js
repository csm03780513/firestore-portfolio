import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [project, setProject] = useState({ title: '', description: '', imageURL: '' });
    const navigate = useNavigate();

    const handleAddProject = async () => {
        if (project.title && project.description && project.imageURL) {
            await addDoc(collection(db, 'projects'), project);
            setProject({ title: '', description: '', imageURL: '' });
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <h3>Add Project</h3>
            <input type="text" placeholder="Title" value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value })} />
            <input type="text" placeholder="Description" value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} />
            <input type="text" placeholder="Image URL" value={project.imageURL} onChange={(e) => setProject({ ...project, imageURL: e.target.value })} />
            <button onClick={handleAddProject}>Add Project</button>
        </div>
    );
};

export default Dashboard;