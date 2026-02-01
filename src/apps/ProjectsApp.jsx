import AppHeader from '../components/AppHeader'

const ProjectsApp = ({ onBack }) => {
    const projects = [
        { name: 'FlavorHub', description: 'A modern recipe search application built with React to showcase frontend development skills.', link: 'https://github.com/itsmerahulkr29/flavorhub' },
        { name: 'URL Shortener', description: 'Efficient link management tool.', link: '#' },
        { name: 'WinFolio', description: 'A Windows Phone UI inspired portfolio site.', link: '#' }
    ]

    return (
        <div className="app-container projects-app">
            <AppHeader title="Projects" onBack={onBack} />
            <div className="app-content">
                <div className="projects-list">
                    {projects.map((p, i) => (
                        <div key={i} className="project-item" onClick={() => p.link !== '#' && window.open(p.link, '_blank')}>
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
