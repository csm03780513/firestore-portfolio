import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [bio, setBio] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const projectsSnap = await getDocs(collection(db, 'projects'));
            setProjects(projectsSnap.docs.map(doc => doc.data()));

            const skillsSnap = await getDocs(collection(db, 'skills'));
            setSkills(skillsSnap.docs.map(doc => doc.data()));

            const bioSnap = await getDocs(collection(db, 'bio'));
            setBio(bioSnap.docs[0]?.data().text || '');
        };

        fetchData();
    }, []);

    return (
        <div>
            <div>
                <h1>Welcome to My Portfolio</h1>
                <button onClick={() => navigate('/login')}>Admin Login</button>
            </div>
            <h1>Portfolio</h1>
            <h2>Bio</h2>
            <p>{bio}</p>
            <h2>Projects</h2>
            {projects.map((project, index) => (
                <div key={index}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <img src={project.imageURL} alt={project.title} width="200" />
                </div>
            ))}
            <h2>Skills</h2>
            <ul>
                {skills.map((skill, index) => (
                    <li key={index}>{skill.name} - {skill.level}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;