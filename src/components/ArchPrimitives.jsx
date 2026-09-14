import React from 'react';

/**
 * Architectural Container Primitive
 * Provides responsive gutters and max-width bounding.
 */
export function Container({
  children,
  variant = 'default', // 'default' | 'editorial' | 'narrow'
  className = '',
  as: Component = 'div',
  ...props
}) {
  const variantClass =
    variant === 'editorial'
      ? 'arch-container-editorial'
      : variant === 'narrow'
      ? 'arch-container-narrow'
      : 'arch-container';

  return (
    <Component className={`${variantClass} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}

/**
 * Architectural Section Primitive
 * Standardized vertical rhythm and surface styling.
 */
export function Section({
  children,
  surface = 'dark', // 'dark' | 'light'
  compact = false,
  className = '',
  as: Component = 'section',
  ...props
}) {
  const surfaceClass = surface === 'light' ? 'surface-light' : 'surface-dark';
  const paddingClass = compact ? 'arch-section-compact' : 'arch-section';

  return (
    <Component
      className={`${paddingClass} ${surfaceClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Eyebrow / Technical Label Primitive
 */
export function Eyebrow({ children, className = '', as: Component = 'span', ...props }) {
  return (
    <Component className={`arch-eyebrow ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}

/**
 * Section Header Primitive
 * Combines section indexing, category eyebrow, and architectural display title.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  subtitle,
  className = '',
  ...rest
}) {
  return (
    <header className={`arch-section-header ${className}`.trim()} {...rest}>
      {(index || eyebrow) && (
        <div className="header-meta">
          {index && <span className="arch-section-index">{index}</span>}
          {eyebrow && <span className="arch-eyebrow">{eyebrow}</span>}
        </div>
      )}
      {title && <h2 className="arch-section-heading">{title}</h2>}
      {subtitle && (
        <p className="arch-body-large" style={{ marginTop: 'var(--space-xs)' }}>
          {subtitle}
        </p>
      )}
    </header>
  );
}

/**
 * Architectural Text Link Primitive
 */
export function ArchLink({
  children,
  href = '#',
  className = '',
  ...props
}) {
  return (
    <a href={href} className={`arch-link ${className}`.trim()} {...props}>
      {children}
    </a>
  );
}

/**
 * Architectural Arrow Link Primitive
 */
export function ArrowLink({
  children,
  href = '#',
  className = '',
  onClick,
  ...props
}) {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (href && href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault();
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`arch-arrow-link ${className}`.trim()}
      {...props}
    >
      <span>{children}</span>
      <span className="arrow-glyph" aria-hidden="true">→</span>
    </a>
  );
}

/**
 * Architectural Button Primitive
 */
export function ArchButton({
  children,
  variant = 'outline', // 'outline' | 'accent'
  className = '',
  type = 'button',
  ...props
}) {
  const variantClass = variant === 'accent' ? 'arch-button-accent' : '';
  return (
    <button
      type={type}
      className={`arch-button ${variantClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Architectural Metadata Row Primitive
 */
export function MetadataRow({
  label,
  value,
  className = '',
}) {
  return (
    <div className={`arch-metadata-row ${className}`.trim()}>
      <span className="arch-tech-label">{label}</span>
      <span className="arch-tech-value">{value}</span>
    </div>
  );
}

/**
 * Hairline Divider Primitive
 */
export function Hairline({
  variant = 'default', // 'default' | 'subtle' | 'strong'
  className = '',
  ...rest
}) {
  const variantClass =
    variant === 'subtle'
      ? 'arch-hairline-subtle'
      : variant === 'strong'
      ? 'arch-hairline-strong'
      : 'arch-hairline';

  return <hr className={`${variantClass} ${className}`.trim()} {...rest} />;
}
