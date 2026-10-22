import {useEffect,useState} from 'react'; import {Nav,Footer,Floaters} from './components/Layout'
import {Hero,Offer,Services,Experience,Process,About,FAQ} from './components/Sections'; import Portfolio from './components/Portfolio'; import Pricing from './components/Pricing'; import Contact from './components/Contact'
export default function App(){const[s,setS]=useState({pkg:'',free:false,n:0})
 const go=(pkg='',free=false)=>{setS(x=>({pkg,free,n:x.n+1}));setTimeout(()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}),30)}
 useEffect(()=>{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.rv').forEach(el=>io.observe(el));return()=>io.disconnect()},[])
 return(<><Nav go={()=>go()}/><main><Hero go={go}/><Offer go={go}/><Services go={go}/><Portfolio/><Experience/><Process/><Pricing go={go}/><About/><FAQ/><Contact pkg={s.pkg} free={s.free} nonce={s.n}/></main><Footer/><Floaters go={()=>go()}/></>)}
