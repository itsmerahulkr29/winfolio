import React from 'react'

const AppHeader = ({ title, onBack, actions }) => {
    return (
        <div className="app-header">
            <div className="header-left">
                {onBack && (
                    <button className="back-btn" onClick={onBack} aria-label="Back">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                        </svg>
                    </button>
                )}
                <h1>{title}</h1>
            </div>
            {actions && <div className="header-actions">{actions}</div>}
        </div>
    )
}

export default AppHeader
