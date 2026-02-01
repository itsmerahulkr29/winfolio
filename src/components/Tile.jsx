const Tile = ({ size = 'small', color = 'accent', icon: Icon, title, subtitle, children, href, onClick }) => {
    const sizeClass = `tile-${size}`
    const colorClass = `tile-${color}`

    const handleClick = (e) => {
        if (onClick) {
            e.preventDefault()
            onClick()
        }
    }

    const content = (
        <div className={`tile ${sizeClass} ${colorClass}`} onClick={handleClick}>
            {Icon && <div className="tile-icon"><Icon /></div>}
            {children}
            {title && <div className="tile-title">{title}</div>}
            {subtitle && <div className="tile-subtitle">{subtitle}</div>}
        </div>
    )

    if (href && !onClick) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="tile-link">
                {content}
            </a>
        )
    }

    return content
}

export default Tile
