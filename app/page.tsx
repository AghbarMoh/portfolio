'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// ── Floating particles background ──────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 60 }, (_, i) => i);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: i % 3 === 0 ? '#00f5d4' : i % 3 === 1 ? '#7b61ff' : '#ffffff',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ── Nav ─────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1rem 2rem',
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,245,212,0.1)' : 'none',
        transition: 'all 0.3s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}
    >
      <motion.span
        style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.5px', cursor: 'pointer' }}
        whileHover={{ color: '#00f5d4' }}
        transition={{ duration: 0.2 }}
      >
        MA<span style={{ color: '#00f5d4' }}>.</span>
      </motion.span>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: '2rem' }} className="hidden-mobile">
        {links.map((link) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.5px' }}
            whileHover={{ color: '#00f5d4', y: -2 }}
            transition={{ duration: 0.2 }}
          >
            {link}
          </motion.a>
        ))}
      </div>

      <motion.a
        href="mailto:mohammad.aghbarr@gmail.com"
        style={{
          padding: '0.5rem 1.2rem',
          border: '1px solid #00f5d4',
          borderRadius: '4px',
          color: '#00f5d4',
          textDecoration: 'none',
          fontSize: '0.85rem',
          letterSpacing: '0.5px',
        }}
        whileHover={{ background: '#00f5d4', color: '#080808' }}
        transition={{ duration: 0.2 }}
      >
        Hire Me
      </motion.a>
    </motion.nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [typedText, setTypedText] = useState('');
  const phrases = ['Problem Solver.', 'Builder.', 'Security Thinker.', 'Life Simplifier.'];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(current.slice(0, typedText.length + 1));
        if (typedText.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setTypedText(current.slice(0, typedText.length - 1));
        if (typedText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((i) => (i + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, phraseIndex]);

  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        gap: '4rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Left: text */}
      <div style={{ flex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ color: '#00f5d4', fontSize: '0.95rem', letterSpacing: '2px', marginBottom: '1rem' }}
        >
          HEY, I'M
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-2px',
            marginBottom: '0.5rem',
          }}
        >
          Mohammad
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #00f5d4, #7b61ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Aghbar
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: '#888', marginBottom: '1.5rem', minHeight: '2rem' }}
        >
          I'm a{' '}
          <span style={{ color: '#00f5d4', fontWeight: 600 }}>
            {typedText}
            <span style={{ animation: 'blink 1s infinite' }}>|</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          style={{ color: '#777', lineHeight: 1.8, maxWidth: '520px', marginBottom: '2.5rem', fontSize: '1rem' }}
        >
          Cybersecurity student at HTU Jordan who doesn't just study systems —
          he builds them. I spent 9 months inside HTU's admissions department,
          saw real problems, and shipped real solutions that are now under
          institutional review.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <motion.a
            href="#projects"
            style={{
              padding: '0.85rem 2rem',
              background: 'linear-gradient(135deg, #00f5d4, #7b61ff)',
              color: '#080808',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '0.5px',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,245,212,0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            See My Work
          </motion.a>
          <motion.a
            href="https://github.com/Aghbarmoh"
            target="_blank"
            style={{
              padding: '0.85rem 2rem',
              border: '1px solid #333',
              color: '#f0f0f0',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '0.95rem',
            }}
            whileHover={{ borderColor: '#00f5d4', color: '#00f5d4', scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            GitHub ↗
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ display: 'flex', gap: '2.5rem', marginTop: '3rem' }}
        >
          {[
            { number: '2', label: 'Shipped Projects' },
            { number: '9mo', label: 'Industry Experience' },
            { number: '∞', label: 'Problems to Solve' },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00f5d4' }}>{stat.number}</div>
              <div style={{ fontSize: '0.75rem', color: '#555', letterSpacing: '1px' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right: photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 60 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease: 'easeOut' }}
style={{ position: 'relative', flexShrink: 0, padding: '40px' }}
className="hero-photo-wrap"      >
        {/* Glow ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: '-8px',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #00f5d4, #7b61ff, #080808, #00f5d4)',
            zIndex: 0,
          }}
        />
        <div style={{
          position: 'relative',
          zIndex: 1,
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid #080808',
        }}>
          <Image
            src="/profile.jpg"
            alt="Mohammad Aghbar"
            fill
            style={{ objectFit: 'cover', objectPosition: 'top' }}
            priority
          />
        </div>
        {/* Floating badge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '-20px',
            background: 'rgba(8,8,8,0.9)',
            border: '1px solid rgba(0,245,212,0.3)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '0.6rem 1rem',
            fontSize: '0.8rem',
            color: '#00f5d4',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          🔒 Cybersecurity @ HTU
        </motion.div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          style={{
            position: 'absolute',
            top: '20px',
            left: '-30px',
            background: 'rgba(8,8,8,0.9)',
            border: '1px solid rgba(123,97,255,0.3)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '0.6rem 1rem',
            fontSize: '0.8rem',
            color: '#7b61ff',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          ⚡ Based in Jordan
        </motion.div>
      </motion.div>

      <style>{`
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @media(max-width:768px){
    section { flex-direction: column !important; padding-top: 7rem !important; padding-left: 1.5rem !important; padding-right: 1.5rem !important; text-align: center; align-items: center !important; }
    .hero-photo-wrap { width: 220px !important; height: 220px !important; margin: 0 auto !important; }
    .hero-photo-wrap > div:nth-child(2) { width: 220px !important; height: 220px !important; }
    .hidden-mobile { display: none !important; }
    h1 { text-align: center !important; }
    p { text-align: center !important; }
    div[style*="display: flex"] { justify-content: center !important; }
  }
  * { box-sizing: border-box; }
  body { overflow-x: hidden !important; }
`}</style>
    </section>
  );
}

// ── Experience ───────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p style={{ color: '#00f5d4', fontSize: '0.85rem', letterSpacing: '3px', marginBottom: '0.5rem' }}>WHERE I'VE BEEN</p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-1px', marginBottom: '3rem' }}>
          Experience
        </h2>

        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(0,245,212,0.15)',
          borderRadius: '16px',
          padding: '2.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Accent line */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
            background: 'linear-gradient(180deg, #00f5d4, #7b61ff)',
            borderRadius: '3px 0 0 3px',
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.3rem' }}>
                Working Program Student
              </h3>
              <p style={{ color: '#00f5d4', fontWeight: 600, fontSize: '0.95rem' }}>
                HTU — Admissions & Registration Department
              </p>
            </div>
            <span style={{
              background: 'rgba(0,245,212,0.08)',
              border: '1px solid rgba(0,245,212,0.2)',
              color: '#00f5d4',
              padding: '0.3rem 0.8rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}>
              9 Months
            </span>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {[
              'Embedded inside the admissions workflow — handled real student data, real processes, real pressure.',
              'Identified gaps in how HTU communicated with prospective students, which inspired the AI chatbot.',
              'Built a full-stack Students Recruitment & Outreach CRM from scratch, now under IT department audit.',
              'Developed an AI-powered admission assistant chatbot that handles student queries autonomously.',
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', gap: '0.8rem', color: '#999', lineHeight: 1.7, fontSize: '0.95rem' }}
              >
                <span style={{ color: '#00f5d4', marginTop: '0.1rem', flexShrink: 0 }}>▹</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}

// ── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  const projects = [
    {
      title: 'Students Recruitment & Outreach CRM',
      tag: 'Full-Stack Web App',
      tagColor: '#7b61ff',
      description:
        'A massive enterprise-grade CRM built entirely from scratch to manage student recruitment pipelines, outreach campaigns, analytics, budgets, scheduling, and more. Currently under IT audit at HTU Jordan.',
      tech: ['Next.js', 'Node.js', 'REST APIs', 'Analytics', 'Multi-module'],
      stats: [
        { label: 'API Routes', value: '30+' },
        { label: 'Modules', value: '20+' },
        { label: 'Status', value: 'In Audit' },
      ],
      accent: '#7b61ff',
      icon: '🏛️',
    },
    {
      title: 'HTU Admission AI Assistant',
      tag: 'AI Chatbot',
      tagColor: '#00f5d4',
      description:
        'An intelligent admission chatbot powered by the Gemini API that answers prospective student questions in real-time. Features an admin panel for managing Q&A, live logging, and a typewriter-effect UI.',
      tech: ['React', 'TypeScript', 'Gemini API', 'Admin Panel', 'Real-time'],
      stats: [
        { label: 'AI Model', value: 'Gemini' },
        { label: 'Panel', value: 'Admin' },
        { label: 'Status', value: 'In Audit' },
      ],
      accent: '#00f5d4',
      icon: '🤖',
    },
  ];

  return (
    <section id="projects" style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <p style={{ color: '#00f5d4', fontSize: '0.85rem', letterSpacing: '3px', marginBottom: '0.5rem' }}>WHAT I'VE BUILT</p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-1px', marginBottom: '3rem' }}>Projects</h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '2rem' }}>
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.7 }}
            whileHover={{ y: -8 }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid rgba(${p.accent === '#00f5d4' ? '0,245,212' : '123,97,255'},0.2)`,
              borderRadius: '20px',
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
            }}
          >
            {/* Background glow */}
            <div style={{
              position: 'absolute', top: '-60px', right: '-60px',
              width: '200px', height: '200px', borderRadius: '50%',
              background: `radial-gradient(circle, ${p.accent}15, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <span style={{ fontSize: '2rem' }}>{p.icon}</span>
              <span style={{
                background: `${p.accent}15`,
                border: `1px solid ${p.accent}40`,
                color: p.accent,
                padding: '0.3rem 0.8rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '1px',
              }}>
                {p.tag}
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.8rem', lineHeight: 1.3 }}>{p.title}</h3>
            <p style={{ color: '#777', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '1.5rem' }}>{p.description}</p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              {p.stats.map((s) => (
                <div key={s.label} style={{
                  flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: '10px',
                  padding: '0.7rem', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: p.accent }}>{s.value}</div>
                  <div style={{ fontSize: '0.7rem', color: '#555', marginTop: '0.2rem' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Tech tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {p.tech.map((t) => (
                <span key={t} style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid #222',
                  color: '#888',
                  padding: '0.25rem 0.7rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  const categories = [
    {
      title: 'Security',
      icon: '🔒',
      color: '#ff6b6b',
      skills: ['Network Security', 'Penetration Testing', 'Threat Analysis', 'Secure Architecture'],
    },
    {
      title: 'Frontend',
      icon: '⚡',
      color: '#00f5d4',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      title: 'Backend',
      icon: '🛠️',
      color: '#7b61ff',
      skills: ['Node.js', 'REST APIs', 'Database Design', 'Auth Systems'],
    },
    {
      title: 'AI & Tools',
      icon: '🤖',
      color: '#ffd166',
      skills: ['Gemini API', 'Prompt Engineering', 'Git', 'Vercel', 'VS Code'],
    },
  ];

  return (
    <section id="skills" style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p style={{ color: '#00f5d4', fontSize: '0.85rem', letterSpacing: '3px', marginBottom: '0.5rem' }}>WHAT I WORK WITH</p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-1px', marginBottom: '3rem' }}>Skills</h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6, borderColor: `${cat.color}50` }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid #1a1a1a',
              borderRadius: '16px',
              padding: '2rem',
              transition: 'border-color 0.3s ease',
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>{cat.icon}</div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: cat.color, marginBottom: '1rem', letterSpacing: '1px' }}>
              {cat.title.toUpperCase()}
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {cat.skills.map((skill) => (
                <li key={skill} style={{ color: '#888', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: cat.color, fontSize: '0.6rem' }}>◆</span>
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{ padding: '6rem 2rem 4rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <p style={{ color: '#00f5d4', fontSize: '0.85rem', letterSpacing: '3px', marginBottom: '0.5rem' }}>WHAT'S NEXT</p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, letterSpacing: '-1px', marginBottom: '1.5rem' }}>
          Let's Build Something
        </h2>
        <p style={{ color: '#777', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '3rem', maxWidth: '520px', margin: '0 auto 3rem' }}>
          I'm almost 21, almost graduated, and already shipping production-grade software.
          If you're looking for someone who thinks in systems and builds with purpose — let's talk.
        </p>

        <motion.a
          href="mailto:mohammad.aghbarr@gmail.com"
          style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            background: 'linear-gradient(135deg, #00f5d4, #7b61ff)',
            color: '#080808',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 800,
            fontSize: '1rem',
            letterSpacing: '0.5px',
            marginBottom: '3rem',
          }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,245,212,0.4)' }}
          whileTap={{ scale: 0.97 }}
        >
          Say Hello →
        </motion.a>

        {/* Social links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/Aghbarmoh' },
            { label: 'Email', href: 'mailto:mohammad.aghbarr@gmail.com' },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              style={{ color: '#555', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '1px' }}
              whileHover={{ color: '#00f5d4', y: -3 }}
              transition={{ duration: 0.2 }}
            >
              {s.label}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      textAlign: 'center', padding: '2rem',
      borderTop: '1px solid #111',
      color: '#333', fontSize: '0.8rem',
      position: 'relative', zIndex: 1,
    }}>
      Designed & Built by <span style={{ color: '#00f5d4' }}>Mohammad Aghbar</span> · 2026
    </footer>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main style={{ background: '#080808', minHeight: '100vh', overflowX: 'hidden' }}>
      <Particles />
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}