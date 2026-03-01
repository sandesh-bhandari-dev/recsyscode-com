'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY_PREFIX = 'rsc_course_';
const AUTH_KEY = 'rsc_auth_v1';

export function useCourseProgress(folderId) {
  const [state, setState] = useState({});
  const storageKey = STORAGE_KEY_PREFIX + folderId;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setState(JSON.parse(saved));
    } catch { /* ignore */ }
  }, [storageKey]);

  useEffect(() => {
    if (Object.keys(state).length === 0) return;
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {}
  }, [state, storageKey]);

  const cycleProgress = useCallback((id) => {
    setState((prev) => {
      const key = 'c' + id;
      const cur = prev[key] || 0;
      const next = cur >= 100 ? 0 : cur === 0 ? 33 : cur === 33 ? 66 : 100;
      return { ...prev, [key]: next };
    });
  }, []);

  const toggleMastered = useCallback((id) => {
    setState((prev) => {
      const key = 'c' + id;
      const next = (prev[key] || 0) >= 100 ? 0 : 100;
      return { ...prev, [key]: next };
    });
  }, []);

  const getProgress = useCallback((id) => state['c' + id] || 0, [state]);

  return { state, cycleProgress, toggleMastered, getProgress };
}

export function getFolderMastered(folderId, totalCount) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + folderId);
    if (!saved) return { mastered: 0, total: totalCount, pct: 0 };
    const data = JSON.parse(saved);
    const mastered = Object.values(data).filter((v) => v >= 100).length;
    return { mastered, total: totalCount, pct: totalCount > 0 ? Math.round((mastered / totalCount) * 100) : 0 };
  } catch {
    return { mastered: 0, total: totalCount, pct: 0 };
  }
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch {}
    setIsLoading(false);
  }, []);

  const signIn = useCallback((userData) => {
    setUser(userData);
    try { localStorage.setItem(AUTH_KEY, JSON.stringify(userData)); } catch {}
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    try { localStorage.removeItem(AUTH_KEY); } catch {}
  }, []);

  return { user, isLoading, signIn, signOut };
}
