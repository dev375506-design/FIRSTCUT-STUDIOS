import {Check} from 'lucide-react'; import {pricing,addons,pricingNote} from '../config'; import {Sec,Head} from './Sections'
export default function Pricing({go}:{go:(p?:string)=>void}){return(<Sec id="pricing" alt><Head e="Pricing" t="Clear, Starting Rates"/>
 {pricing.map(g=><div key={g.title} className="mb-12"><h3 className="text-xl text-amber mb-5">{g.title}</h3><div className="grid md:grid-cols-3 gap-5">{g.plans.map(p=><div key={p.id} className={`card p-7 flex flex-col ${p.hot?'!border-gold/70':''}`}>
 <h4 className="font-display uppercase tracking-wide text-xl text-ivory">{p.name}</h4>
 <p className="mt-3 text-3xl font-display text-gold">{p.price??'Custom Quote'}{p.price&&<span className="text-sm text-ivory/50 font-sans"> onwards</span>}</p>
 <ul className="mt-5 grid gap-2 text-sm text-ivory/70 flex-1">{p.features.map(f=><li key={f} className="flex gap-2"><Check size={14} className="text-gold mt-1 shrink-0"/>{f}</li>)}</ul>
 <button onClick={()=>go(p.id)} className={`btn mt-6 ${p.hot?'btn-gold':'btn-ghost'}`}>{p.price?'Choose This Package':'Get a Quote'}</button></div>)}</div></div>)}
 <h3 className="text-xl text-amber mb-5">Add-Ons</h3><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{addons.map(a=><div key={a.name} className="card px-5 py-3 flex justify-between gap-3 text-sm"><span className="text-ivory/85">{a.name}</span><span className="text-gold">{a.price}</span></div>)}</div>
 <p className="mt-8 text-sm text-ivory/55 max-w-3xl">{pricingNote} Revisions are defined per package, not unlimited.</p></Sec>)}
