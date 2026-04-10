import React, { useState, useEffect, useRef } from "react";

/* ═══ Simple hash function for password storage ═══ */
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '_mirei_salt_2024');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/* ═══ User DB — stored in localStorage ═══ */
const UserDB = {
  getAll() {
    try { return JSON.parse(localStorage.getItem('mirei_users') || '{}'); } catch { return {}; }
  },
  save(users) {
    localStorage.setItem('mirei_users', JSON.stringify(users));
  },
  async createUser(email, password) {
    const users = this.getAll();
    if (users[email]) return { success: false, error: 'Account already exists' };
    users[email] = { hash: await hashPassword(password), created: Date.now() };
    this.save(users);
    return { success: true };
  },
  async verifyUser(email, password) {
    const users = this.getAll();
    if (!users[email]) return { success: false, error: 'Account not found. Please create one first.' };
    const hash = await hashPassword(password);
    if (users[email].hash !== hash) return { success: false, error: 'Incorrect password' };
    return { success: true };
  },
  exists(email) {
    return !!this.getAll()[email];
  }
};

/* ═══ Pupil Component ═══ */
const Pupil = ({ size = 12, maxDistance = 5, pupilColor = "black", forceLookX, forceLookY }) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const pupilRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => { setMouseX(e.clientX); setMouseY(e.clientY); };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY };
    const rect = pupilRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
    const dx = mouseX - cx, dy = mouseY - cy;
    const dist = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
    const angle = Math.atan2(dy, dx);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  };

  const pos = calculatePosition();

  return (
    <div ref={pupilRef} style={{
      width: size, height: size, borderRadius: '50%', backgroundColor: pupilColor,
      transform: `translate(${pos.x}px, ${pos.y}px)`, transition: 'transform 0.1s ease-out',
    }} />
  );
};

/* ═══ EyeBall Component ═══ */
const EyeBall = ({ size = 48, pupilSize = 16, maxDistance = 10, eyeColor = "white", pupilColor = "black", isBlinking = false, forceLookX, forceLookY }) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const eyeRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => { setMouseX(e.clientX); setMouseY(e.clientY); };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY };
    const rect = eyeRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
    const dx = mouseX - cx, dy = mouseY - cy;
    const dist = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
    const angle = Math.atan2(dy, dx);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  };

  const pos = calculatePosition();

  return (
    <div ref={eyeRef} style={{
      width: size, height: isBlinking ? 2 : size, borderRadius: '50%',
      backgroundColor: eyeColor, overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all 0.15s',
    }}>
      {!isBlinking && (
        <div style={{
          width: pupilSize, height: pupilSize, borderRadius: '50%', backgroundColor: pupilColor,
          transform: `translate(${pos.x}px, ${pos.y}px)`, transition: 'transform 0.1s ease-out',
        }} />
      )}
    </div>
  );
};

/* ═══ Login Page ═══ */
export function LoginPage({ onLogin }) {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const [isPurplePeeking, setIsPurplePeeking] = useState(false);
  const purpleRef = useRef(null);
  const blackRef = useRef(null);
  const yellowRef = useRef(null);
  const orangeRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { setMouseX(e.clientX); setMouseY(e.clientY); };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Blinking
  useEffect(() => {
    const schedule = () => {
      const t = setTimeout(() => {
        setIsPurpleBlinking(true);
        setTimeout(() => { setIsPurpleBlinking(false); schedule(); }, 150);
      }, Math.random() * 4000 + 3000);
      return t;
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const schedule = () => {
      const t = setTimeout(() => {
        setIsBlackBlinking(true);
        setTimeout(() => { setIsBlackBlinking(false); schedule(); }, 150);
      }, Math.random() * 4000 + 3000);
      return t;
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const timer = setTimeout(() => setIsLookingAtEachOther(false), 800);
      return () => clearTimeout(timer);
    } else {
      setIsLookingAtEachOther(false);
    }
  }, [isTyping]);

  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const t = setTimeout(() => {
        setIsPurplePeeking(true);
        setTimeout(() => setIsPurplePeeking(false), 800);
      }, Math.random() * 3000 + 2000);
      return () => clearTimeout(t);
    } else {
      setIsPurplePeeking(false);
    }
  }, [password, showPassword, isPurplePeeking]);

  // Clear messages on mode switch
  useEffect(() => { setError(''); setSuccess(''); }, [mode]);

  const calcPos = (ref) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 3;
    const dx = mouseX - cx, dy = mouseY - cy;
    return {
      faceX: Math.max(-15, Math.min(15, dx / 20)),
      faceY: Math.max(-10, Math.min(10, dy / 30)),
      bodySkew: Math.max(-6, Math.min(6, -dx / 120)),
    };
  };

  const purplePos = calcPos(purpleRef);
  const blackPos = calcPos(blackRef);
  const yellowPos = calcPos(yellowRef);
  const orangePos = calcPos(orangeRef);

  const isHidingPassword = password.length > 0 && !showPassword;
  const isShowingPassword = password.length > 0 && showPassword;
  const isChhavi = email.toLowerCase().trim() === 'chhavi';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail) return;

    // Chhavi bypasses password entirely
    if (isChhavi) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      onLogin(cleanEmail);
      return;
    }

    if (!password) { setError('Password is required'); return; }

    setIsLoading(true);

    if (mode === 'signup') {
      // Create account flow
      if (password.length < 4) { setError('Password must be at least 4 characters'); setIsLoading(false); return; }
      if (password !== confirmPassword) { setError('Passwords do not match'); setIsLoading(false); return; }
      const result = await UserDB.createUser(cleanEmail, password);
      if (!result.success) { setError(result.error); setIsLoading(false); return; }
      setSuccess('Account created! Logging you in...');
      await new Promise(resolve => setTimeout(resolve, 800));
      onLogin(cleanEmail);
    } else {
      // Login flow
      if (!UserDB.exists(cleanEmail)) {
        setError('No account found. Click "Create Account" to register.');
        setIsLoading(false);
        return;
      }
      const result = await UserDB.verifyUser(cleanEmail, password);
      if (!result.success) { setError(result.error); setIsLoading(false); return; }
      await new Promise(resolve => setTimeout(resolve, 400));
      onLogin(cleanEmail);
    }
  };

  return (
    <div className="login-page">
      {/* Left Panel: Animated Characters */}
      <div className="login-left">
        <div className="login-left-header">
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <defs><linearGradient id="loginLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff85a1"/><stop offset="100%" stopColor="#a855f7"/>
              </linearGradient></defs>
              <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="url(#loginLogoGrad)" strokeWidth="1.5" fill="none"/>
              <circle cx="12" cy="12" r="2.5" fill="url(#loginLogoGrad)" opacity="0.8"/>
            </svg>
          </div>
          <span>Mirei Platform</span>
        </div>

        <div className="login-characters-area">
          <div style={{ position: 'relative', width: 550, height: 400 }}>
            {/* Purple Character */}
            <div ref={purpleRef} style={{
              position: 'absolute', bottom: 0, left: 70, width: 180,
              height: (isTyping || isHidingPassword) ? 440 : 400,
              backgroundColor: '#6C3FF5', borderRadius: '10px 10px 0 0', zIndex: 1,
              transform: isShowingPassword ? 'skewX(0deg)' :
                (isTyping || isHidingPassword) ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)` :
                `skewX(${purplePos.bodySkew || 0}deg)`,
              transformOrigin: 'bottom center', transition: 'all 0.7s ease-in-out',
            }}>
              <div style={{
                position: 'absolute', display: 'flex', gap: 32,
                left: isShowingPassword ? 20 : isLookingAtEachOther ? 55 : 45 + purplePos.faceX,
                top: isShowingPassword ? 35 : isLookingAtEachOther ? 65 : 40 + purplePos.faceY,
                transition: 'all 0.7s ease-in-out',
              }}>
                <EyeBall size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isPurpleBlinking}
                  forceLookX={isShowingPassword ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                  forceLookY={isShowingPassword ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined} />
                <EyeBall size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isPurpleBlinking}
                  forceLookX={isShowingPassword ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                  forceLookY={isShowingPassword ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined} />
              </div>
            </div>

            {/* Black Character */}
            <div ref={blackRef} style={{
              position: 'absolute', bottom: 0, left: 240, width: 120, height: 310,
              backgroundColor: '#2D2D2D', borderRadius: '8px 8px 0 0', zIndex: 2,
              transform: isShowingPassword ? 'skewX(0deg)' :
                isLookingAtEachOther ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)` :
                (isTyping || isHidingPassword) ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)` :
                `skewX(${blackPos.bodySkew || 0}deg)`,
              transformOrigin: 'bottom center', transition: 'all 0.7s ease-in-out',
            }}>
              <div style={{
                position: 'absolute', display: 'flex', gap: 24,
                left: isShowingPassword ? 10 : isLookingAtEachOther ? 32 : 26 + blackPos.faceX,
                top: isShowingPassword ? 28 : isLookingAtEachOther ? 12 : 32 + blackPos.faceY,
                transition: 'all 0.7s ease-in-out',
              }}>
                <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isBlackBlinking}
                  forceLookX={isShowingPassword ? -4 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={isShowingPassword ? -4 : isLookingAtEachOther ? -4 : undefined} />
                <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isBlackBlinking}
                  forceLookX={isShowingPassword ? -4 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={isShowingPassword ? -4 : isLookingAtEachOther ? -4 : undefined} />
              </div>
            </div>

            {/* Orange Character */}
            <div ref={orangeRef} style={{
              position: 'absolute', bottom: 0, left: 0, width: 240, height: 200, zIndex: 3,
              backgroundColor: '#FF9B6B', borderRadius: '120px 120px 0 0',
              transform: isShowingPassword ? 'skewX(0deg)' : `skewX(${orangePos.bodySkew || 0}deg)`,
              transformOrigin: 'bottom center', transition: 'all 0.7s ease-in-out',
            }}>
              <div style={{
                position: 'absolute', display: 'flex', gap: 32,
                left: isShowingPassword ? 50 : 82 + (orangePos.faceX || 0),
                top: isShowingPassword ? 85 : 90 + (orangePos.faceY || 0),
                transition: 'all 0.2s ease-out',
              }}>
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={isShowingPassword ? -5 : undefined} forceLookY={isShowingPassword ? -4 : undefined} />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={isShowingPassword ? -5 : undefined} forceLookY={isShowingPassword ? -4 : undefined} />
              </div>
            </div>

            {/* Yellow Character */}
            <div ref={yellowRef} style={{
              position: 'absolute', bottom: 0, left: 310, width: 140, height: 230,
              backgroundColor: '#E8D754', borderRadius: '70px 70px 0 0', zIndex: 4,
              transform: isShowingPassword ? 'skewX(0deg)' : `skewX(${yellowPos.bodySkew || 0}deg)`,
              transformOrigin: 'bottom center', transition: 'all 0.7s ease-in-out',
            }}>
              <div style={{
                position: 'absolute', display: 'flex', gap: 24,
                left: isShowingPassword ? 20 : 52 + (yellowPos.faceX || 0),
                top: isShowingPassword ? 35 : 40 + (yellowPos.faceY || 0),
                transition: 'all 0.2s ease-out',
              }}>
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={isShowingPassword ? -5 : undefined} forceLookY={isShowingPassword ? -4 : undefined} />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={isShowingPassword ? -5 : undefined} forceLookY={isShowingPassword ? -4 : undefined} />
              </div>
              {/* Mouth */}
              <div style={{
                position: 'absolute', width: 80, height: 4, background: '#2D2D2D', borderRadius: 20,
                left: isShowingPassword ? 10 : 40 + (yellowPos.faceX || 0),
                top: isShowingPassword ? 88 : 88 + (yellowPos.faceY || 0),
                transition: 'all 0.2s ease-out',
              }} />
            </div>
          </div>
        </div>

        <div className="login-left-footer">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>

      {/* Right Panel: Login/Signup Form */}
      <div className="login-right">
        <div className="login-form-container">
          {/* Mode Tabs */}
          <div className="login-tabs">
            <button
              className={`login-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => setMode('login')}
            >
              Log In
            </button>
            <button
              className={`login-tab ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => setMode('signup')}
            >
              Create Account
            </button>
          </div>

          <div className="login-form-header">
            <h1>{mode === 'login' ? 'Welcome Back' : 'Join Mirei'}</h1>
            <p>{mode === 'login' ? 'Log in to your profile to continue' : 'Create your account to start mastering DSA'}</p>
          </div>

          {/* Error / Success messages */}
          {error && (
            <div className="login-message login-error">{error}</div>
          )}
          {success && (
            <div className="login-message login-success">{success}</div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Username</label>
              <input
                id="email"
                type="text"
                className="form-input"
                placeholder="Enter your username"
                value={email}
                autoComplete="off"
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                required
              />
            </div>

            {/* Password field — hidden for Chhavi */}
            <div className="form-group" style={{
              maxHeight: isChhavi ? 0 : 200,
              opacity: isChhavi ? 0 : 1,
              overflow: 'hidden',
              transition: 'max-height 0.4s ease, opacity 0.3s ease',
            }}>
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Confirm password — only in signup mode and not Chhavi */}
            <div className="form-group" style={{
              maxHeight: (mode === 'signup' && !isChhavi) ? 200 : 0,
              opacity: (mode === 'signup' && !isChhavi) ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.4s ease, opacity 0.3s ease',
            }}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
              />
            </div>

            <button
              type="submit"
              className={`login-btn ${isChhavi ? 'chhavi-special' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." :
                isChhavi ? "Log in as Chhavi 💖" :
                mode === 'signup' ? "Create Account" : "Log In"}
            </button>
          </form>

          {/* Mode switch hint */}
          <div className="login-mode-hint">
            {mode === 'login' ? (
              <span>Don't have an account? <button onClick={() => setMode('signup')}>Create one</button></span>
            ) : (
              <span>Already have an account? <button onClick={() => setMode('login')}>Log in</button></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
