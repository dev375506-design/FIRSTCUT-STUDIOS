import {useEffect,useState} from 'react'; import {Menu,X,ArrowUp,Mail} from 'lucide-react'; import {brand,nav,services} from '../config'
export const Logo=({s=36}:{s?:number})=>(<span className="inline-flex items-center gap-2.5"><svg width={s} height={s} viewBox="0 0 64 64" aria-hidden><rect x="6" y="6" width="52" height="52" rx="6" fill="none" stroke="#c9a24b" strokeWidth="3"/><path d="M6 20h52M6 44h52" stroke="#c9a24b" strokeWidth="2" strokeDasharray="4 4"/><text x="32" y="39" fontFamily="Georgia,serif" fontSize="20" fontWeight="700" textAnchor="middle" fill="#e6b866">FC</text></svg><span className="font-display uppercase tracking-widest text-ivory leading-none">FirstCut<span className="text-gold"> Studios</span></span></span>)
export function Nav({go}:{go:()=>void}){const[o,setO]=useState(false),[sc,setSc]=useState(false)
 useEffect(()=>{const f=()=>setSc(scrollY>30);f();addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[])
 return(<header className={`fixed top-0 inset-x-0 z-40 transition ${sc||o?'bg-ink/95 backdrop-blur border-b border-line':''}`}><div className="max-w-7xl mx-auto px-5 h-[68px] flex items-center justify-between">
 <a href="#home" aria-label="FirstCut Studios home"><Logo/></a>
 <nav aria-label="Main" className="hidden lg:flex gap-7 text-sm">{nav.slice(1,6).map(([l,id])=><a key={id} href={'#'+id} className="text-ivory/75 hover:text-amber transition">{l}</a>)}</nav>
 <div className="flex items-center gap-3"><button onClick={go} className="btn btn-gold hidden sm:inline-flex !py-2.5">Start a Project</button>
 <button className="lg:hidden p-2" aria-label={o?'Close menu':'Open menu'} aria-expanded={o} onClick={()=>setO(!o)}>{o?<X/>:<Menu/>}</button></div></div>
 {o&&<nav aria-label="Mobile" className="lg:hidden px-5 pb-6 grid gap-1">{nav.map(([l,id])=><a key={id} href={'#'+id} onClick={()=>setO(false)} className="py-3 border-b border-line text-ivory/85">{l}</a>)}<button onClick={()=>{setO(false);go()}} className="btn btn-gold mt-4">Start a Project</button></nav>}</header>)}
export function Footer(){const l=(t:string,h:string)=><a href={h} className="block py-1 text-ivory/65 hover:text-amber">{t}</a>
 return(<footer className="border-t border-line bg-char/60 mt-10"><div className="max-w-7xl mx-auto px-5 py-14 grid gap-10 md:grid-cols-4">
 <div><Logo/><p className="mt-4 text-sm text-gold font-serif italic">{brand.tagline}</p></div>
 <div><h3 className="eyebrow mb-3">Navigate</h3>{nav.map(([t,id])=>l(t,'#'+id))}</div>
 <div><h3 className="eyebrow mb-3">Services</h3>{services.map(s=>l(s.title,'#services'))}</div>
 <div><h3 className="eyebrow mb-3">Contact</h3><a href={`mailto:${brand.email}`} className="text-ivory/80 hover:text-amber break-all">{brand.email}</a>{l('Portfolio website ↗',brand.portfolioUrl)}{brand.instagram&&l('Instagram ↗',brand.instagram)}</div></div>
 <p className="text-center text-xs text-ivory/45 pb-8">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p></footer>)}
export function Floaters({go}:{go:()=>void}){const[s,setS]=useState(false);useEffect(()=>{const f=()=>setS(scrollY>600);addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[])
 return(<>{s&&<button aria-label="Back to top" onClick={()=>scrollTo({top:0,behavior:'smooth'})} className="fixed bottom-5 left-5 z-30 p-3 bg-char border border-gold/40 text-gold rounded-full hover:bg-gold hover:text-ink transition"><ArrowUp size={18}/></button>}
 <button aria-label="Start a project" onClick={go} className="sm:hidden fixed bottom-5 right-5 z-30 p-4 bg-gold text-ink rounded-full shadow-lg shadow-black/50"><Mail size={20}/></button></>)}
