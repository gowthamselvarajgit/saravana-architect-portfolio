import React, { useState, useEffect, Suspense, lazy } from 'react';
import HomePage from '../pages/HomePage';
import DesignSystemPreview from '../pages/DesignSystemPreview';
import PageTransition from '../components/PageTransition';
import CloudMistTransition from '../components/transitions/CloudMistTransition';

// Lazy-load AtlasPage to keep the primary monograph homepage lightweight
const AtlasPage = lazy(() => import('../pages/AtlasPage'));

// Lazy-load MobiusProjectPage for the real 3D architectural maquette
const MobiusProjectPage = lazy(() => import('../pages/MobiusProjectPage'));

// Lazy-load ProjectDossierPage for dedicated project monograph pages
const ProjectDossierPage = lazy(() => import('../pages/ProjectDossierPage'));

const VALID_PROJECT_SLUGS = ['mobius', 'cultural-oasis', 'ribbon-of-life', 'eco-resort', 'flow-spire'];

function parseCurrentRoute() {
  if (typeof window === 'undefined') return { path: '/', projectSlug: null };
  const pathname = window.location.pathname;
  const search = new URLSearchParams(window.location.search);

  if (pathname === '/atlas' || search.get('view') === 'atlas') {
    return { path: '/atlas', projectSlug: null };
  }
  if (pathname === '/preview' || search.get('view') === 'preview') {
    return { path: '/preview', projectSlug: null };
  }

  // Check ?project=:slug
  const querySlug = search.get('project');
  if (querySlug && VALID_PROJECT_SLUGS.includes(querySlug)) {
    return { path: `/projects/${querySlug}`, projectSlug: querySlug };
  }

  // Check /projects/:slug
  if (pathname.startsWith('/projects/')) {
    const slug = pathname.replace('/projects/', '').replace(/\/$/, '');
    if (VALID_PROJECT_SLUGS.includes(slug)) {
      return { path: `/projects/${slug}`, projectSlug: slug };
    }
  }

  return { path: '/', projectSlug: null };
}

export default function App() {
  const [route, setRoute] = useState(parseCurrentRoute);
  const [cloudTransition, setCloudTransition] = useState({
    active: false,
    targetUrl: null,
  });

  // Listen to browser popstate (back/forward button)
  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(parseCurrentRoute());
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (to, options = {}) => {
    // Check if cloud transition is requested or if routing into a 3D project detail page
    const isProjectRoute = to.startsWith('/projects/') || options.withClouds;
    if (isProjectRoute && !cloudTransition.active) {
      setCloudTransition({ active: true, targetUrl: to });
      return;
    }

    // Handle in-page anchor navigation (e.g. /projects#archive, /contact)
    if (to.includes('#')) {
      const [basePath, hash] = to.split('#');
      if (route.path !== '/' && basePath === '/projects') {
        window.history.pushState({}, '', '/');
        setRoute(parseCurrentRoute());
      }
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const sectionMap = {
      '/projects': 'projects',
      '/about': 'about',
      '/experience': 'experience',
      '/education': 'education',
      '/achievements': 'achievements',
      '/technology': 'technology',
      '/gallery': 'gallery',
      '/archive': 'archive',
      '/contact': 'contact',
    };

    if (sectionMap[to]) {
      const targetId = sectionMap[to];
      if (route.path !== '/') {
        window.history.pushState({}, '', '/');
        setRoute(parseCurrentRoute());
      }
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (to === route.path) return;
    window.history.pushState({}, '', to);
    setRoute(parseCurrentRoute());
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const renderContent = () => {
    // 1. Digital Atlas Page
    if (route.path === '/atlas') {
      return (
        <PageTransition triggerKey={route.path}>
          <Suspense
            fallback={
              <div
                style={{
                  width: '100vw',
                  height: '100vh',
                  background: '#0A0906',
                  color: '#F4F0E8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                }}
              >
                INITIALIZING DIGITAL ATLAS...
              </div>
            }
          >
            <AtlasPage onNavigate={navigate} />
          </Suspense>
        </PageTransition>
      );
    }

    // 2. Design System Preview Page
    if (route.path === '/preview') {
      return (
        <PageTransition triggerKey={route.path}>
          <DesignSystemPreview onNavigate={navigate} />
        </PageTransition>
      );
    }

    // 3. Dedicated Mobius 3D Maquette & Monograph Page
    if (route.projectSlug === 'mobius') {
      return (
        <PageTransition triggerKey={route.path}>
          <Suspense
            fallback={
              <div
                style={{
                  width: '100vw',
                  height: '100vh',
                  background: '#F4F0E8',
                  color: '#1A1815',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                }}
              >
                LOADING MÖBIUS 3D ARCHITECTURAL MAQUETTE...
              </div>
            }
          >
            <MobiusProjectPage onNavigate={navigate} />
          </Suspense>
        </PageTransition>
      );
    }

    // 4. Dedicated Monograph Pages for Cultural Oasis, Ribbon, Eco Resort, Flow Spire
    if (route.projectSlug) {
      return (
        <PageTransition triggerKey={route.path}>
          <Suspense
            fallback={
              <div
                style={{
                  width: '100vw',
                  height: '100vh',
                  background: '#F4F0E8',
                  color: '#1A1815',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                }}
              >
                LOADING ARCHITECTURAL MONOGRAPH...
              </div>
            }
          >
            <ProjectDossierPage slug={route.projectSlug} onNavigate={navigate} />
          </Suspense>
        </PageTransition>
      );
    }

    // 5. Default Monograph Homepage
    return (
      <PageTransition triggerKey={route.path}>
        <HomePage onNavigate={navigate} currentPath={route.path} />
      </PageTransition>
    );
  };

  return (
    <>
      {renderContent()}

      {/* Cinematic Volumetric Cloud & Mist Transition Layer */}
      <CloudMistTransition
        isActive={cloudTransition.active}
        onCovered={() => {
          if (cloudTransition.targetUrl) {
            window.history.pushState({}, '', cloudTransition.targetUrl);
            setRoute(parseCurrentRoute());
            window.scrollTo({ top: 0, behavior: 'instant' });
          }
        }}
        onComplete={() => {
          setCloudTransition({ active: false, targetUrl: null });
        }}
      />
    </>
  );
}
