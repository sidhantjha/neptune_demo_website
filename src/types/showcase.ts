import content from '../content/showcase.json'
export type Demo = { id: string; title: string; category: string; description: string; order: number; media: { type: 'image' | 'video'; src: string; poster?: string; alt: string } }
type Status = 'completed' | 'in-progress' | 'planned'
type Showcase = { project: { name: string; presentedBy: string; sectionTitle: string; timelineTitle: string; timelineButton: string; timelineNote: string; attribution: string }; demos: Demo[]; timeline: { id: string; title: string; date?: string; status: Status; description?: string }[]; statusLabels: Record<Status, string> }
function validate(value: unknown): Showcase {
  const c = value as Showcase
  if (!c.project || !['name','presentedBy','sectionTitle','timelineTitle','timelineButton','timelineNote','attribution'].every(k => typeof c.project[k as keyof Showcase['project']] === 'string') || !Array.isArray(c.demos) || !c.demos.length || !Array.isArray(c.timeline)) throw new Error('Invalid showcase content')
  const ids = new Set<string>()
  for (const d of c.demos) {
    if (!d.id || ids.has(d.id) || !d.title || typeof d.category !== 'string' || typeof d.description !== 'string' || !Number.isFinite(d.order) || !d.media || !['image','video'].includes(d.media.type) || typeof d.media.src !== 'string' || typeof d.media.alt !== 'string') throw new Error('Invalid demo content')
    ids.add(d.id)
  }
  for (const t of c.timeline) if (!t.id || !t.title || !['completed','in-progress','planned'].includes(t.status) || !c.statusLabels?.[t.status]) throw new Error('Invalid timeline content')
  return { ...c, demos: [...c.demos].sort((a,b) => a.order - b.order) }
}
export const showcase = validate(content)
