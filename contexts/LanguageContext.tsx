'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { Language, Translations } from '@/lib/translations';
import { flattenTranslations, getTranslation, mergeTranslations, unflattenTranslations } from '@/lib/translations';
import en from '@/public/locales/en.json';
import km from '@/public/locales/km.json';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Translations;
  t: (key: string, fallback?: string) => string;
  isLoading: boolean;
  loadError: string | null;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/* ─────────────────────────────────────────────
   True 3D Spinner — Three.js WebGL
   Navy #0c1d3a sphere + 3 orbiting blue rings
───────────────────────────────────────────── */
function Spinner3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let cancelled = false;

    // Dynamically load Three.js from CDN (avoids adding it as a hard dep)
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
      if (cancelled) return;
      const THREE = (window as any).THREE;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const W = 140, H = 140;
      const DPR = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(DPR);
      renderer.setSize(W, H);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
      camera.position.set(0, 0, 5.5);

      // Lighting — key + rim + fill for realistic shading
      scene.add(new THREE.AmbientLight(0xffffff, 0.3));

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
      keyLight.position.set(4, 6, 5);
      keyLight.castShadow = true;
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0x378ADD, 0.7);
      rimLight.position.set(-4, -2, -3);
      scene.add(rimLight);

      const fillLight = new THREE.PointLight(0x85B7EB, 0.5, 20);
      fillLight.position.set(-3, 3, 2);
      scene.add(fillLight);

      // Core sphere — dark navy, metallic
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 64),
        new THREE.MeshStandardMaterial({ color: 0x0c1d3a, metalness: 0.55, roughness: 0.25 })
      );
      sphere.castShadow = true;
      scene.add(sphere);

      // Equatorial seam ring
      const eqRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.01, 0.012, 16, 120),
        new THREE.MeshStandardMaterial({ color: 0x378ADD, metalness: 0.8, roughness: 0.15 })
      );
      scene.add(eqRing);

      function makeRing(
        radius: number, tube: number, color: number,
        tiltX: number, tiltZ: number,
        metalness: number, roughness: number
      ) {
        const mesh = new THREE.Mesh(
          new THREE.TorusGeometry(radius, tube, 24, 140),
          new THREE.MeshStandardMaterial({ color, metalness, roughness })
        );
        mesh.rotation.x = tiltX;
        mesh.rotation.z = tiltZ;
        mesh.castShadow = true;
        scene.add(mesh);
        return mesh;
      }

      const ring1 = makeRing(1.72, 0.055, 0x185FA5, Math.PI / 2,       0,             0.75, 0.15);
      const ring2 = makeRing(1.44, 0.042, 0x378ADD, Math.PI * 0.28,    Math.PI * 0.15, 0.70, 0.18);
      const ring3 = makeRing(1.20, 0.032, 0x85B7EB, Math.PI * 0.12,   -Math.PI * 0.30, 0.65, 0.22);

      // Outer halo
      const halo = new THREE.Mesh(
        new THREE.TorusGeometry(1.95, 0.018, 12, 100),
        new THREE.MeshBasicMaterial({ color: 0x378ADD, transparent: true, opacity: 0.18 })
      );
      halo.rotation.x = Math.PI * 0.4;
      scene.add(halo);

      let t = 0;
      function animate() {
        if (cancelled) return;
        rafRef.current = requestAnimationFrame(animate);
        t += 0.012;

        sphere.rotation.y = t * 0.4;
        sphere.rotation.x = Math.sin(t * 0.3) * 0.12;

        ring1.rotation.y = t * 0.9;
        ring2.rotation.y = -t * 1.2;
        ring2.rotation.x = Math.PI * 0.28 + Math.sin(t * 0.5) * 0.08;
        ring3.rotation.y = t * 1.7;
        ring3.rotation.z = -Math.PI * 0.30 + Math.cos(t * 0.6) * 0.06;

        eqRing.rotation.y = t * 0.4;
        eqRing.rotation.x = Math.sin(t * 0.3) * 0.12;

        halo.rotation.y = -t * 0.35;

        renderer.render(scene, camera);
      }
      animate();
    };
    document.head.appendChild(script);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      // remove script tag if still loading
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', borderRadius: '50%' }}
    />
  );
}

/* ─────────────────────────────────────────────
   Loading Overlay
───────────────────────────────────────────── */
function LoadingOverlay() {
  return (
    <>
      <style>{`
        @keyframes lp-sweep {
          0%   { transform: translateX(-140%); }
          100% { transform: translateX(400%); }
        }
        @keyframes lp-fadein {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Full-screen white backdrop — turns whole site white */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          animation: 'lp-fadein 0.2s ease both',
        }}
      >
        {/* 3D spinner */}
        <Spinner3D />

        {/* Label block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#0c1d3a',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            Loading
          </span>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 400,
              color: '#378ADD',
              letterSpacing: '0.02em',
            }}
          >
            Translating interface…
          </span>

          {/* Sweeping progress bar */}
          <div
            style={{
              marginTop: '4px',
              width: '88px',
              height: '2px',
              background: 'rgba(12,29,58,0.10)',
              borderRadius: '99px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: '38%',
                background: 'linear-gradient(90deg, #0c1d3a, #185FA5, #378ADD)',
                borderRadius: '99px',
                animation: 'lp-sweep 1.7s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   Language Provider
───────────────────────────────────────────── */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>(en);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const requestIdRef = useRef(0);
  const fetchControllerRef = useRef<AbortController | null>(null);
  const loadedTranslationsRef = useRef<Record<Language, Translations>>({ en });

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language | null;
    if (!storedLanguage) return;

    requestIdRef.current += 1;
    setLanguageState(storedLanguage);

    if (storedLanguage !== 'en') {
      const cacheKey = `translations_${storedLanguage}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached) as Translations;
          loadedTranslationsRef.current[storedLanguage] = parsed;
          setTranslations(parsed);
        } catch (error) {
          console.warn('⚠️ Failed to parse cached translations for stored language', error);
          localStorage.removeItem(cacheKey);
        }
      }
    }
  }, []);

  const inFlightTranslationsRef = useRef<Partial<Record<Language, Promise<Translations>>>>({});
  const GOOGLE_TRANSLATE_URL = 'https://translate.googleapis.com/translate_a/single';
  const LANGUAGE_MAP: Record<string, string> = { jw: 'jv' };

  function normalizeTargetLanguage(target: Language) {
    return LANGUAGE_MAP[target] || target;
  }

  async function translateViaGoogleTranslate(texts: string[], target: Language, signal?: AbortSignal): Promise<string[]> {
    const normalizedTarget = normalizeTargetLanguage(target);
    return Promise.all(
      texts.map(async (text) => {
        const params = new URLSearchParams({
          client: 'gtx', sl: 'en', tl: normalizedTarget, dt: 't',
          q: text.substring(0, 500),
        });
        const response = await fetch(`${GOOGLE_TRANSLATE_URL}?${params.toString()}`, { method: 'GET', signal });
        if (!response.ok) throw new Error(`Google Translate returned ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data) || !Array.isArray(data[0])) return text;
        const translated = data[0]
          .filter((segment: any) => Array.isArray(segment) && typeof segment[0] === 'string')
          .map((segment: any) => segment[0])
          .join('');
        return translated || text;
      })
    );
  }

  async function translateTexts(texts: string[], target: Language, signal?: AbortSignal): Promise<string[]> {
    const useApiRoute = typeof window !== 'undefined';
    if (useApiRoute) {
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target, texts }),
          signal,
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.error || `Translation service returned ${response.status}`);
        }
        const data = (await response.json()) as { translations?: string[] };
        if (!data?.translations || !Array.isArray(data.translations)) {
          throw new Error('Translation service returned invalid data');
        }
        return data.translations.map((translation, index) => translation || texts[index] || '');
      } catch (error) {
        console.warn('Fallback to direct Google Translate fetch because /api/translate failed:', error);
      }
    }
    return translateViaGoogleTranslate(texts, target, signal);
  }

  async function translateObject(base: Translations, target: Language, signal?: AbortSignal): Promise<Translations> {
    const flattened = flattenTranslations(base);
    const entries = Object.entries(flattened);
    const translatedEntries: Array<[string, string]> = [];
    const batchSize = 10;
    for (let batchStart = 0; batchStart < entries.length; batchStart += batchSize) {
      const batch = entries.slice(batchStart, batchStart + batchSize);
      const texts = batch.map(([, value]) => value);
      const translatedTexts = await translateTexts(texts, target, signal);
      for (let i = 0; i < batch.length; i += 1) {
        translatedEntries.push([batch[i][0], translatedTexts[i] || batch[i][1]]);
      }
    }
    return unflattenTranslations(Object.fromEntries(translatedEntries));
  }

  async function fetchLocaleTranslations(target: Language, signal?: AbortSignal): Promise<Translations> {
    if (target === 'en') return en;
    if (target === 'km') {
      const mergedKm = mergeTranslations(en, km);
      loadedTranslationsRef.current.km = mergedKm;
      return mergedKm;
    }
    if (loadedTranslationsRef.current[target]) return loadedTranslationsRef.current[target];
    const cacheKey = `translations_${target}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as Translations;
        loadedTranslationsRef.current[target] = parsed;
        return parsed;
      } catch (error) {
        console.warn('⚠️ Failed to parse cached translations', error);
        localStorage.removeItem(cacheKey);
      }
    }
    if (inFlightTranslationsRef.current[target]) return inFlightTranslationsRef.current[target]!;
    const translationPromise = (async () => {
      const translated = await translateObject(en, target, signal);
      loadedTranslationsRef.current[target] = translated;
      try {
        localStorage.setItem(cacheKey, JSON.stringify(translated));
      } catch (error) {
        console.warn('⚠️ Failed to cache translations in localStorage', error);
      }
      return translated;
    })();
    inFlightTranslationsRef.current[target] = translationPromise;
    try {
      return await translationPromise;
    } finally {
      delete inFlightTranslationsRef.current[target];
    }
  }

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    fetchControllerRef.current?.abort();
    const controller = new AbortController();
    fetchControllerRef.current = controller;

    const loadTranslations = async () => {
      if (language === 'en') {
        setTranslations(en);
        setIsLoading(false);
        setLoadError(null);
        return;
      }
      const cachedTranslations = loadedTranslationsRef.current[language];
      if (cachedTranslations) {
        setTranslations(cachedTranslations);
        setIsLoading(false);
        setLoadError(null);
        return;
      }
      setLoadError(null);
      setIsLoading(true);
      try {
        const translated = await fetchLocaleTranslations(language, controller.signal);
        if (requestIdRef.current !== requestId) return;
        setTranslations(translated);
        setLoadError(null);
      } catch (error: any) {
        if (requestIdRef.current !== requestId) return;
        if (error?.name === 'AbortError') return;
        console.warn('⚠️ Failed to load translations:', error);
        setTranslations(en);
        setLoadError(`Failed to load ${language} translations. Showing English fallback.`);
      } finally {
        if (requestIdRef.current === requestId) setIsLoading(false);
      }
    };

    loadTranslations();
    return () => { controller.abort(); };
  }, [language]);

  const setLanguage = (lang: Language) => {
    requestIdRef.current += 1;
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string, fallback?: string): string => getTranslation(translations, key, fallback);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, t, isLoading, loadError }}>
      {children}
      {isLoading ? <LoadingOverlay /> : null}
    </LanguageContext.Provider>
  );
}

/* ─────────────────────────────────────────────
   Hook
───────────────────────────────────────────── */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}