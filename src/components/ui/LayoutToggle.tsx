import { useState, useEffect } from 'react';

type LayoutMode = 'minimal' | 'engineer';

const STORAGE_KEY = 'devfolio-layout';

function getIcon(mode: LayoutMode) {
  if (mode === 'minimal') {
    // Single-column / list icon
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    );
  }
  // Two-column / grid icon
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="18" rx="1" />
      <rect x="14" y="3" width="7" height="18" rx="1" />
    </svg>
  );
}

function getLabel(mode: LayoutMode) {
  if (mode === 'minimal') return 'Switch to Engineer layout';
  return 'Switch to Minimal layout';
}

export default function LayoutToggle() {
  const [layout, setLayout] = useState<LayoutMode>('minimal');

  useEffect(() => {
    // Sync state from DOM attribute (set by inline script before paint)
    const sync = () => {
      const current = document.documentElement.getAttribute('data-layout') as LayoutMode | null;
      if (current === 'minimal' || current === 'engineer') setLayout(current);
    };

    sync();

    // Keep both instances (one per layout's Header) in sync via MutationObserver
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-layout'],
    });
    return () => observer.disconnect();
  }, []);

  function toggle() {
    // Always read ground truth from DOM — React state may be stale on the
    // instance that was hidden when the other toggle fired.
    const current = (document.documentElement.getAttribute('data-layout') || 'minimal') as LayoutMode;
    const next: LayoutMode = current === 'minimal' ? 'engineer' : 'minimal';
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.setAttribute('data-layout', next);
    // MutationObserver will call sync() and update setLayout for both instances
  }

  return (
    <button
      onClick={toggle}
      aria-label={getLabel(layout)}
      title={getLabel(layout)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2rem',
        height: '2rem',
        borderRadius: '0.375rem',
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        color: 'var(--color-text-muted)',
        cursor: 'pointer',
        transition: 'color 0.15s, border-color 0.15s, background 0.15s',
        padding: 0,
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-accent)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-accent)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-muted)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
      }}
    >
      {getIcon(layout)}
    </button>
  );
}
