import AppHeader from '../components/AppHeader'

const CallApp = ({ onBack }) => {
    // ... contact data ...

    /* Note: I'm skipping the contact details as they are unchanged */

    // Okay, I need to include the contact data to be safe with context matching.
    const contact = {
        name: 'Rahul Kumar',
        title: 'Full Stack Developer',
        phone: '+91-7739331093',
        email: 'itsmerahulkr29@gmail.com',
        linkedin: 'https://linkedin.com/in/rahul-kumar-901a01238',
        github: 'https://github.com/itsmerahulkr29',
        location: 'Patna, India'
    }

    const handleCall = () => {
        window.location.href = `tel:${contact.phone}`
    }

    const handleEmail = () => {
        window.location.href = `mailto:${contact.email}`
    }

    return (
        <div className="app-container call-app">
            <AppHeader title="Contact" onBack={onBack} />
            <div className="contact-grid-top">
                <div className="contact-left">
                    <div className="contact-avatar">
                        <img src="profile.jpg" alt="Rahul Kumar" className="contact-avatar-img" />
                    </div>
                    <div className="contact-info-text">
                        <h1 className="contact-name">{contact.name}</h1>
                        <p className="contact-title">{contact.title}</p>
                    </div>
                </div>

                <div className="contact-right-actions">
                    <button className="grid-action-btn call" onClick={handleCall}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                        <span>Call</span>
                    </button>
                    <button className="grid-action-btn email" onClick={handleEmail}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                        <span>Email</span>
                    </button>
                    <button className="grid-action-btn linkedin" onClick={() => window.open(contact.linkedin, '_blank')}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        <span>LinkedIn</span>
                    </button>
                    <button className="grid-action-btn github" onClick={() => window.open(contact.github, '_blank')}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span>GitHub</span>
                    </button>
                </div>
            </div>

            <div className="contact-details">
                <div className="detail-item">
                    <div className="detail-icon">📱</div>
                    <div className="detail-content">
                        <div className="detail-label">Phone</div>
                        <div className="detail-value">{contact.phone}</div>
                    </div>
                </div>
                <div className="detail-item">
                    <div className="detail-icon">📧</div>
                    <div className="detail-content">
                        <div className="detail-label">Email</div>
                        <div className="detail-value">{contact.email}</div>
                    </div>
                </div>
                <div className="detail-item" onClick={() => window.open(contact.linkedin, '_blank')}>
                    <div className="detail-icon">💼</div>
                    <div className="detail-content">
                        <div className="detail-label">LinkedIn</div>
                        <div className="detail-value link">linkedin.com/in/rahul-kumar</div>
                    </div>
                </div>
                <div className="detail-item" onClick={() => window.open(contact.github, '_blank')}>
                    <div className="detail-icon">💻</div>
                    <div className="detail-content">
                        <div className="detail-label">GitHub</div>
                        <div className="detail-value link">github.com/itsmerahulkr29</div>
                    </div>
                </div>
                <div className="detail-item">
                    <div className="detail-icon">📍</div>
                    <div className="detail-content">
                        <div className="detail-label">Location</div>
                        <div className="detail-value">{contact.location}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallApp
