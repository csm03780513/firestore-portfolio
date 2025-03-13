import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({ id: null, title: '', description: '', imageURL: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            const projectsSnap = await getDocs(collection(db, 'projects'));
            setProjects(projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchProjects();
    }, []);

    const handleAddOrUpdateProject = async () => {
        if (project.title && project.description && project.imageURL) {
            if (project.id) {
                await updateDoc(doc(db, 'projects', project.id), project);
            } else {
                await addDoc(collection(db, 'projects'), project);
            }
            setProject({ id: null, title: '', description: '', imageURL: '' });
            window.location.reload();
        }
    };

    const handleEdit = (proj) => {
        setProject(proj);
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, 'projects', id));
        setProjects(projects.filter(proj => proj.id !== id));
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <h3>{project.id ? 'Edit' : 'Add'} Project</h3>
            <input type="text" placeholder="Title" value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value })} />
            <input type="text" placeholder="Description" value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} />
            <input type="text" placeholder="Image URL" value={project.imageURL} onChange={(e) => setProject({ ...project, imageURL: e.target.value })} />
            <button onClick={handleAddOrUpdateProject}>{project.id ? 'Update' : 'Add'} Project</button>
            <h3>Existing Projects</h3>
            {projects.map((proj) => (
                <div key={proj.id}>
                    <h4>{proj.title}</h4>
                    <p>{proj.description}</p>
                    <img src={proj.imageURL} alt={proj.title} width="200" />
                    <button onClick={() => handleEdit(proj)}>Edit</button>
                    <button onClick={() => handleDelete(proj.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;