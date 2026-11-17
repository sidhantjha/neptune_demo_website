import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react'
import { showcase, type Demo } from './types/showcase'

function Media({ demo, expanded = false, active = false }: { demo: Demo; expanded?: boolean; active?: boolean }) {
  const [failed, setFailed] = useState(false)
  if (failed || !demo.media.src) return <div className="fallback">{demo.title}<small>Media unavailable</small></div>
  return demo.media.type === 'video' ? <video src={active || expanded ? demo.media.src : undefined} poster={demo.media.poster} controls={expanded} playsInline preload={expanded ? 'auto' : 'metadata'} onError={() => setFailed(true)} aria-label={demo.media.alt} /> : <img src={demo.media.src} alt={demo.media.alt} width="1200" height="760" loading={active ? 'eager' : 'lazy'} onError={() => setFailed(true)} draggable={false} />
}
function Viewer({ demo, close }: { demo: Demo; close: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    ref.current?.focus()
    return () => { document.body.style.overflow = overflow }
  }, [])
  return <motion.div className="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
    <div className="viewer" ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="viewer-title" onClick={e => e.stopPropagation()} onKeyDown={e => {
      if (e.key === 'Escape') close()
      if (e.key === 'Tab') {
        const items = ref.current?.querySelectorAll<HTMLElement>('button,video[controls]')
        if (!items?.length) return
        if (e.shiftKey && (document.activeElement === items[0] || document.activeElement === ref.current)) { e.preventDefault(); items[items.length - 1].focus() }
        else if (!e.shiftKey && document.activeElement === items[items.length - 1]) { e.preventDefault(); items[0].focus() }
      }
    }}>
      <div className="viewer-heading"><div><h2 id="viewer-title">{demo.title}</h2><small>{demo.category}</small></div><button aria-label="Close preview" onClick={close}><X size={22} /></button></div>
      <motion.div className="expanded-media" layoutId={`media-${demo.id}`}><Media demo={demo} expanded /></motion.div>
    </div>
  </motion.div>
}
export default function App() {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const reduced = useReducedMotion()
  const hero = useRef<HTMLElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  const start = useRef(0)
  const swiped = useRef(false)
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] })
  const progress = useSpring(scrollYProgress, { stiffness: 210, damping: 32 })
  const scale = useTransform(progress, [0, .15, .8], [1, 1, .85])
  const opacity = useTransform(progress, [0, .18, .7], [1, 1, 0])
  const y = useTransform(progress, [0, .8], [0, -90])
  const { demos, project } = showcase
  const navigate = (n: number) => setActive(i => (i + n + demos.length) % demos.length)
  return <MotionConfig reducedMotion="user" transition={{ type: 'spring', stiffness: 280, damping: 32 }}>
    <a className="skip" href="#timeline">Skip to timeline</a>
    <main inert={expanded}>
      <section className="hero" ref={hero} aria-labelledby="project-title">
        <motion.div className="hero-stage" style={reduced ? {} : { scale, opacity, y }}>
          <header className="intro text-center"><span className="presenter">{project.presentedBy} presents</span><h1 id="project-title">{project.name}</h1><h2>{project.sectionTitle}</h2></header>
          <section className="carousel" aria-label="Project demonstrations" aria-roledescription="carousel" onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); navigate(e.key === 'ArrowRight' ? 1 : -1) } }} onPointerDown={e => { start.current = e.clientX; swiped.current = false }} onPointerUp={e => { const dx = e.clientX - start.current; if (Math.abs(dx) > 45) { swiped.current = true; navigate(dx < 0 ? 1 : -1) } }}>
            <div className="card-stage">{demos.map((demo, i) => {
              let d = (i - active + demos.length) % demos.length
              if (d > demos.length / 2) d -= demos.length
              const current = d === 0
              return <motion.article key={demo.id} className="demo-card" aria-hidden={!current} style={{ zIndex: current ? 10 : 4 - Math.abs(d), pointerEvents: Math.abs(d) > 1 ? 'none' : 'auto' }} animate={{ x: `${d * 15}%`, scale: current ? 1 : .9 - (Math.abs(d) - 1) * .12, rotateY: 0, opacity: current ? 1 : Math.abs(d) === 1 ? .42 : 0 }}>
                <button className="media-button" tabIndex={current ? 0 : -1} aria-label={`Expand ${demo.title}`} onClick={event => { if (!swiped.current) { opener.current = event.currentTarget; setExpanded(true) } }}><motion.div className={`media-shell${demo.media.type === "image" ? " media-shell--image" : ""}`} style={demo.media.type === "image" ? { backgroundImage: `url("${demo.media.src}")` } : undefined} layoutId={`media-${demo.id}`}><Media key={`${demo.id}-${current}`} demo={demo} active={current} /></motion.div><span className="mock-label">{demo.category}</span></button>
                <div className="card-copy"><h3>{demo.title}</h3><p className="demo-description">{demo.description}</p><button className="expand-button" tabIndex={current ? 0 : -1} aria-label={`Open ${demo.title}`} onClick={event => { opener.current = event.currentTarget; setExpanded(true) }}><Maximize2 size={19} strokeWidth={1.5} /></button></div>
                {!current && <button className="neighbor-hit" tabIndex={-1} aria-label={`Show ${demo.title}`} onClick={() => setActive(i)} />}
              </motion.article>
            })}</div>
            <button className="arrow previous" aria-label="Previous demonstration" onClick={() => navigate(-1)}><ArrowLeft size={17} /></button><button className="arrow next" aria-label="Next demonstration" onClick={() => navigate(1)}><ArrowRight size={17} /></button>
          </section>
          <div className="pagination" aria-label="Choose demonstration">{demos.map((demo, i) => <button key={demo.id} aria-label={`Show ${demo.title}`} aria-current={active === i ? 'true' : undefined} onClick={() => setActive(i)}><span className="dot" />{active === i && <motion.span layoutId="active-dot" className="active-dot" />}</button>)}</div>
          <span className="sr-only" aria-live="polite">{demos[active].title}</span>
          <button className="timeline-button" onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' })}>{project.timelineButton}<ArrowDown size={15} /></button>
        </motion.div>
      </section>
      <section id="timeline" className="timeline" aria-labelledby="timeline-title"><header><h2 id="timeline-title">{project.timelineTitle}</h2><p>{project.timelineNote}</p></header><ol>{showcase.timeline.map(item => <motion.li key={item.id} initial={reduced ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .5 }}><span className={`marker ${item.status}`} /><div className="milestone"><div><h3>{item.title}</h3>{item.description && <p>{item.description}</p>}{item.date && <time>{item.date}</time>}</div><span className={`status ${item.status}`}>{showcase.statusLabels[item.status]}</span></div></motion.li>)}</ol></section>
      <footer>{project.attribution}</footer>
    </main>
    <AnimatePresence onExitComplete={() => opener.current?.focus({ preventScroll: true })}>{expanded && <Viewer demo={demos[active]} close={() => setExpanded(false)} />}</AnimatePresence>
  </MotionConfig>
}
