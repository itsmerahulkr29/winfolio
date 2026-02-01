import AppHeader from '../components/AppHeader'

const ProjectsApp = ({ onBack }) => {
    const projects = [
        { name: 'URL Shortener', description: 'Efficient link management tool.', link: '#' },
        { name: 'Dev Drop', description: 'Developer resources code drop.', link: '#' },
        { name: 'Algo Viz', description: 'Algorithm Visualizer.', link: '#' },
        { name: 'WinFolio', description: 'This Portfolio OS.', link: '#' }
    ]

    return (
        <div className="app-container projects-app">
            <AppHeader title="Projects" onBack={onBack} />
            <div className="app-content">
                <div className="projects-list">
                    {projects.map((p, i) => (
                        <div key={i} className="project-item">
                            <h3>{p.name}</h3>
                            <p>{p.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectsApp
