"use client";

import React, { useState, useEffect } from "react";
import { X, Settings, Shield, Globe, Cookie } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent-v2");
    if (!consent) {
      setIsVisible(true);
    } else {
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch (e) {
        console.error("Error parsing cookie consent");
      }
    }
  }, []);

  const saveConsent = (prefs: typeof preferences) => {
    localStorage.setItem("cookie-consent-v2", JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);
    window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: prefs }));
  };

  const acceptAll = () =>
    saveConsent({ necessary: true, functional: true, analytics: true, marketing: true });

  const acceptSelected = () => {
    saveConsent(preferences);
    setShowDetails(false);
  };

  const declineAll = () =>
    saveConsent({ necessary: true, functional: false, analytics: false, marketing: false });

  if (!isVisible) return null;

  return (
    <>
      {/* ── Banner ── */}
      <div className="cc-banner">
        <div className="cc-banner-inner">
          <div className="cc-banner-content">
            <div className="cc-icon-wrap">
              <Cookie className="cc-icon" />
            </div>

            <div className="cc-text">
              <h3 className="cc-title">
                We value your privacy
                <span className="cc-badge">GDPR Compliant</span>
              </h3>
              <p className="cc-desc">
                We use cookies and similar technologies to enhance your browsing experience,
                analyze site traffic, and personalize content. By clicking "Accept All",
                you consent to our use of cookies.
              </p>
              <div className="cc-links">
                <button onClick={() => setShowDetails(true)} className="cc-link">
                  <Settings className="cc-link-icon" />
                  Customize settings
                </button>
                <button onClick={declineAll} className="cc-link">Essential only</button>
                <a href="/privacy-policy" className="cc-link">Privacy Policy</a>
              </div>
            </div>

            <div className="cc-actions">
              <button onClick={declineAll} className="cc-btn cc-btn-secondary">Decline</button>
              <button onClick={acceptAll} className="cc-btn cc-btn-primary">Accept All</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      {showDetails && (
        <div className="cc-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowDetails(false); }}>
          <div className="cc-modal">
            {/* Header */}
            <div className="cc-modal-header">
              <div className="cc-modal-header-left">
                <div className="cc-modal-icon">
                  <Shield className="cc-icon" />
                </div>
                <div>
                  <h2 className="cc-modal-title">Cookie Preferences</h2>
                  <p className="cc-modal-subtitle">Manage your privacy settings</p>
                </div>
              </div>
              <button onClick={() => setShowDetails(false)} className="cc-close-btn">
                <X className="cc-icon-sm" />
              </button>
            </div>

            {/* Body */}
            <div className="cc-modal-body">

              {/* Necessary */}
              <div className="cc-row cc-row-locked">
                <div className="cc-row-text">
                  <div className="cc-row-title-line">
                    <h3 className="cc-row-title">Strictly Necessary Cookies</h3>
                    <span className="cc-tag cc-tag-green">Always Active</span>
                  </div>
                  <p className="cc-row-desc">
                    These cookies are essential for the website to function properly.
                    They enable basic features like page navigation, security, and accessibility.
                  </p>
                </div>
                <div className="cc-toggle-locked">
                  <div className="cc-toggle-thumb" />
                </div>
              </div>

              {/* Functional */}
              <div className="cc-row">
                <div className="cc-row-text">
                  <h3 className="cc-row-title">Functional Cookies</h3>
                  <p className="cc-row-desc">
                    Enhance website performance and personalization, such as remembering
                    your language preferences and login details.
                  </p>
                </div>
                <label className="cc-toggle">
                  <input type="checkbox" checked={preferences.functional}
                    onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })} />
                  <span className="cc-toggle-track"><span className="cc-toggle-thumb" /></span>
                </label>
              </div>

              {/* Analytics */}
              <div className="cc-row">
                <div className="cc-row-text">
                  <h3 className="cc-row-title">Analytics Cookies</h3>
                  <p className="cc-row-desc">
                    Help us understand how visitors interact with our website by collecting
                    anonymous information about page visits, traffic sources, and user behavior.
                  </p>
                </div>
                <label className="cc-toggle">
                  <input type="checkbox" checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })} />
                  <span className="cc-toggle-track"><span className="cc-toggle-thumb" /></span>
                </label>
              </div>

              {/* Marketing */}
              <div className="cc-row">
                <div className="cc-row-text">
                  <h3 className="cc-row-title">Marketing Cookies</h3>
                  <p className="cc-row-desc">
                    Used to deliver relevant advertisements and track marketing campaign
                    performance across different platforms.
                  </p>
                </div>
                <label className="cc-toggle">
                  <input type="checkbox" checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })} />
                  <span className="cc-toggle-track"><span className="cc-toggle-thumb" /></span>
                </label>
              </div>

              {/* Info */}
              <div className="cc-info-box">
                <Globe className="cc-info-icon" />
                <p>
                  You can change your cookie preferences at any time by clicking the cookie icon
                  at the bottom right corner of any page.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="cc-modal-footer">
              <button onClick={() => setShowDetails(false)} className="cc-btn cc-btn-ghost">Cancel</button>
              <button onClick={declineAll} className="cc-btn cc-btn-secondary">Essential Only</button>
              <button onClick={acceptSelected} className="cc-btn cc-btn-primary">Save Preferences</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ── Reset ── */
        .cc-banner *, .cc-overlay * { box-sizing: border-box; }

        /* ── Tokens ── */
        :root {
          --cc-bg-dark:      #111827;
          --cc-bg-dark-2:    #1f2937;
          --cc-border-dark:  #374151;
          --cc-text-white:   #f9fafb;
          --cc-text-muted:   #9ca3af;
          --cc-text-soft:    #d1d5db;
          --cc-blue:         #3b82f6;
          --cc-blue-dim:     rgba(59,130,246,0.15);
          --cc-blue-border:  rgba(59,130,246,0.3);
          --cc-surface:      #ffffff;
          --cc-surface-2:    #f9fafb;
          --cc-border:       #e5e7eb;
          --cc-text:         #111827;
          --cc-text-sub:     #6b7280;
          --cc-green:        #16a34a;
          --cc-green-bg:     #dcfce7;
          --cc-green-text:   #15803d;
          --cc-radius:       12px;
          --cc-radius-sm:    8px;
          --cc-radius-pill:  999px;
        }

        /* ══════════════════════════════
           BANNER
        ══════════════════════════════ */
        .cc-banner {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 9998;
          animation: cc-slideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes cc-slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .cc-banner-inner {
          background: var(--cc-bg-dark);
          border-top: 1px solid var(--cc-border-dark);
          box-shadow: 0 -8px 32px rgba(0,0,0,0.35), 0 -2px 8px rgba(0,0,0,0.2);
        }

        .cc-banner-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 28px;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        @media (max-width: 900px) {
          .cc-banner-content { flex-direction: column; align-items: stretch; padding: 18px 16px; gap: 16px; }
        }

        /* Banner icon */
        .cc-icon-wrap {
          flex-shrink: 0;
          width: 46px; height: 46px;
          background: var(--cc-blue-dim);
          border: 1px solid var(--cc-blue-border);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        @media (max-width: 480px) { .cc-icon-wrap { display: none; } }

        .cc-icon     { width: 20px; height: 20px; color: var(--cc-blue); }
        .cc-icon-sm  { width: 16px; height: 16px; }
        .cc-link-icon { width: 12px; height: 12px; }

        /* Banner text */
        .cc-text { flex: 1; }

        .cc-title {
          color: var(--cc-text-white);
          font-size: 15px; font-weight: 600;
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 5px;
        }

        .cc-badge {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.4px;
          padding: 2px 8px;
          border-radius: var(--cc-radius-pill);
          background: var(--cc-blue-dim);
          color: #93c5fd;
          border: 1px solid var(--cc-blue-border);
          text-transform: uppercase;
        }

        .cc-desc {
          color: var(--cc-text-soft);
          font-size: 13.5px; line-height: 1.55;
          max-width: 640px;
        }

        .cc-links {
          display: flex; flex-wrap: wrap;
          gap: 4px 0;
          align-items: center;
          margin-top: 10px;
        }

        .cc-link {
          font-size: 12px; color: var(--cc-text-muted);
          background: none; border: none; cursor: pointer;
          display: inline-flex; align-items: center; gap: 4px;
          padding: 0; text-decoration: none;
          transition: color 0.15s;
        }
        .cc-link:hover { color: var(--cc-blue); }
        .cc-link + .cc-link::before {
          content: "·";
          color: var(--cc-border-dark);
          margin: 0 10px;
        }

        /* Buttons */
        .cc-actions {
          display: flex; gap: 8px; flex-shrink: 0;
        }
        @media (max-width: 900px) { .cc-actions { width: 100%; } .cc-actions .cc-btn { flex: 1; } }

        .cc-btn {
          font-size: 13.5px; font-weight: 500;
          padding: 9px 20px;
          border-radius: var(--cc-radius-sm);
          border: none; cursor: pointer;
          transition: background 0.18s, transform 0.14s, box-shadow 0.18s;
          white-space: nowrap;
        }
        .cc-btn:active { transform: scale(0.98); }

        .cc-btn-primary {
          background: var(--cc-blue);
          color: #fff;
          box-shadow: 0 1px 6px rgba(59,130,246,0.4);
        }
        .cc-btn-primary:hover {
          background: #2563eb;
          box-shadow: 0 3px 12px rgba(59,130,246,0.45);
          transform: translateY(-1px);
        }

        .cc-btn-secondary {
          background: var(--cc-bg-dark-2);
          color: var(--cc-text-soft);
          border: 1px solid var(--cc-border-dark);
        }
        .cc-btn-secondary:hover {
          background: #374151;
          border-color: #6b7280;
          color: var(--cc-text-white);
        }

        .cc-btn-ghost {
          background: var(--cc-surface-2);
          color: var(--cc-text-sub);
          border: 1px solid var(--cc-border);
        }
        .cc-btn-ghost:hover { background: #f3f4f6; color: var(--cc-text); }


        /* ══════════════════════════════
           OVERLAY + MODAL
        ══════════════════════════════ */
        .cc-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.6);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          animation: cc-fadeIn 0.2s ease both;
        }
        @keyframes cc-fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .cc-modal {
          background: var(--cc-surface);
          border-radius: 18px;
          max-width: 600px; width: 100%;
          max-height: 92vh;
          display: flex; flex-direction: column;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.06);
          animation: cc-scaleIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes cc-scaleIn {
          from { transform: scale(0.95) translateY(10px); opacity: 0; }
          to   { transform: scale(1)    translateY(0);    opacity: 1; }
        }

        /* Modal header */
        .cc-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 24px 18px;
          border-bottom: 1px solid var(--cc-border);
          background: var(--cc-surface);
        }

        .cc-modal-header-left {
          display: flex; align-items: center; gap: 12px;
        }

        .cc-modal-icon {
          width: 40px; height: 40px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: var(--cc-radius-sm);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .cc-modal-title { font-size: 17px; font-weight: 700; color: var(--cc-text); }
        .cc-modal-subtitle { font-size: 12.5px; color: var(--cc-text-sub); margin-top: 1px; }

        .cc-close-btn {
          width: 32px; height: 32px;
          background: var(--cc-surface-2);
          border: 1px solid var(--cc-border);
          border-radius: var(--cc-radius-sm);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--cc-text-sub);
          transition: background 0.15s, color 0.15s;
        }
        .cc-close-btn:hover { background: #f3f4f6; color: var(--cc-text); }

        /* Modal body */
        .cc-modal-body {
          flex: 1; overflow-y: auto;
          padding: 20px 24px;
          background: var(--cc-surface-2);
        }
        .cc-modal-body::-webkit-scrollbar { width: 4px; }
        .cc-modal-body::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 2px; }

        /* Cookie rows */
        .cc-row {
          background: var(--cc-surface);
          border: 1px solid var(--cc-border);
          border-radius: var(--cc-radius);
          padding: 16px;
          margin-bottom: 8px;
          display: flex; align-items: flex-start; gap: 16px;
          transition: border-color 0.15s;
        }
        .cc-row:hover { border-color: #d1d5db; }
        .cc-row-locked {
          border-color: #bbf7d0;
          background: linear-gradient(to right, #f0fdf4, var(--cc-surface));
        }
        .cc-row-text { flex: 1; }

        .cc-row-title-line { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
        .cc-row-title { font-size: 14px; font-weight: 600; color: var(--cc-text); }
        .cc-row-desc  { font-size: 13px; color: var(--cc-text-sub); line-height: 1.5; }

        .cc-tag {
          font-size: 10px; font-weight: 600;
          padding: 2px 8px; border-radius: var(--cc-radius-pill);
          text-transform: uppercase; letter-spacing: 0.3px;
        }
        .cc-tag-green { background: var(--cc-green-bg); color: var(--cc-green-text); }

        /* Locked toggle (static green) */
        .cc-toggle-locked {
          flex-shrink: 0;
          width: 44px; height: 24px;
          background: var(--cc-green);
          border-radius: var(--cc-radius-pill);
          display: flex; align-items: center;
          justify-content: flex-end;
          padding-right: 3px;
          margin-top: 2px;
        }

        /* Interactive toggle */
        .cc-toggle {
          flex-shrink: 0;
          position: relative;
          display: inline-block;
          width: 44px; height: 24px;
          margin-top: 2px; cursor: pointer;
        }
        .cc-toggle input { position: absolute; opacity: 0; width: 0; height: 0; }
        .cc-toggle-track {
          position: absolute; inset: 0;
          background: #d1d5db;
          border-radius: var(--cc-radius-pill);
          transition: background 0.22s;
          display: flex; align-items: center;
          padding: 3px;
        }
        .cc-toggle input:checked ~ .cc-toggle-track { background: var(--cc-blue); }

        .cc-toggle-thumb {
          width: 18px; height: 18px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
          flex-shrink: 0;
        }
        .cc-toggle input:checked ~ .cc-toggle-track .cc-toggle-thumb {
          transform: translateX(20px);
        }

        /* Info box */
        .cc-info-box {
          display: flex; align-items: flex-start; gap: 10px;
          margin-top: 12px;
          padding: 14px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: var(--cc-radius);
        }
        .cc-info-icon { width: 16px; height: 16px; color: #2563eb; flex-shrink: 0; margin-top: 1px; }
        .cc-info-box p { font-size: 12.5px; color: #1e40af; line-height: 1.55; }

        /* Modal footer */
        .cc-modal-footer {
          display: flex; gap: 8px;
          padding: 16px 24px;
          border-top: 1px solid var(--cc-border);
          background: var(--cc-surface);
        }
        .cc-modal-footer .cc-btn { flex: 1; }
        @media (max-width: 480px) {
          .cc-modal-footer { flex-direction: column; }
        }
      `}</style>
    </>
  );
}