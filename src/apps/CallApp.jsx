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
        location: 'Bharatpur, India'
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
            <div className="contact-header">
                <div className="contact-avatar">
                    <img src="profile.jpg" alt="Rahul Kumar" className="contact-avatar-img" />
                </div>
                <h1 className="contact-name">{contact.name}</h1>
                <p className="contact-title">{contact.title}</p>
            </div>

            <div className="contact-actions">
                <button className="action-btn call" onClick={handleCall}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    <span>Call</span>
                </button>
                <button className="action-btn email" onClick={handleEmail}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <span>Email</span>
                </button>
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
