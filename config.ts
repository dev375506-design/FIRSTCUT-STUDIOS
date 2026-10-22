// ===== CENTRAL CONFIG: edit content here, no component changes needed =====
export const brand={name:'FirstCut Studios',tagline:'Ideas | Shoots | Edits | Stories',founder:'Dev Nayak',email:'marvelousedits423@gmail.com',
 portfolioUrl:'https://devportfoliomyy.netlify.app/',
 instagram:'', // e.g. 'https://instagram.com/yourhandle' (hidden while empty)
 apiBaseUrl:'' // Set to the deployed API origin when frontend and API use separate hosts.
}
export const offer={enabled:true,title:'A Few Projects. On Us.',text:'To mark the launch of FirstCut Studios, I’m offering free editing for a limited number of selected initial projects while building my portfolio and collaborating with new creators.',cta:'Apply for a Free Edit',
 terms:['Availability is limited.','Projects are accepted based on suitability and capacity.','Scope must be agreed before editing begins.','Covers the agreed editing deliverable, not external expenses.','Work outside the agreed scope may be quoted separately.']}
export type Mode='remote'|'onsite'|'both'
export const services:{id:string;title:string;icon:string;mode:Mode;image:string;items:string[]}[]=[
{id:'edit',title:'Video Editing',icon:'scissors',mode:'remote',image:'photo-1574717024653-61fd2cf4d44d',items:['Instagram Reels','YouTube Shorts','Long-form YouTube videos','Vlogs & travel videos','Talking-head & educational videos','Podcast editing & interviews','Promotional & music videos','Wedding & event edits (subject to availability)']},
{id:'post',title:'Post-Production',icon:'wand',mode:'remote',image:'photo-1536240478700-b869070f9279',items:['Advanced editing & storytelling','After Effects motion graphics','Visual effects & compositing','Cinematic color grading','Transitions & sound design','Subtitles, captions & typography','Basic thumbnail & graphic support']},
{id:'pre',title:'Pre-Production',icon:'clipboard',mode:'both',image:'photo-1455390582262-044c42d85e24',items:['Concept development','Creative planning','Script & content planning','Storyboarding & shot lists','Video structure & creative direction']},
{id:'prod',title:'Production & Cinematography',icon:'camera',mode:'onsite',image:'photo-1492619375914-88005aa9e8fb',items:['Camera shoots','Product & promotional shoots','Interview shoots','Lighting & composition','Social media content production','Event & behind-the-scenes footage']},
{id:'brand',title:'Brand & Digital Content',icon:'megaphone',mode:'both',image:'photo-1542038784456-1ea8e935640e',items:['Brand advertisements','Product promotional videos','Social media campaigns','Creator content','Business & corporate films','Short-form promo campaigns']}]
export type Plan={id:string;name:string;price:string|null;features:string[];hot?:boolean}
export const pricing:{title:string;plans:Plan[]}[]=[
{title:'Short-Form Editing',plans:[
 {id:'Starter Reel',name:'Starter Reel',price:'₹499',features:['Basic editing & clean cuts','Music & pacing','Simple transitions','One requested revision']},
 {id:'Creator Reel',name:'Creator Reel',price:'₹999',hot:true,features:['Detailed storytelling','Captions & animated text','Enhanced transitions & sound design','Color correction','Up to two revision rounds']},
 {id:'Premium Reel',name:'Premium Reel',price:'₹1,999',features:['Advanced editing','Motion graphics & VFX where appropriate','Detailed sound design','Cinematic color grading','More involved storytelling']}]},
{title:'YouTube Editing',plans:[
 {id:'YouTube Starter',name:'YouTube Starter',price:'₹1,499',features:['Basic long-form editing','Clean cuts & pacing','Music & simple transitions']},
 {id:'YouTube Creator',name:'YouTube Creator',price:'₹2,999',hot:true,features:['Detailed storytelling & pacing','Captions & graphics as needed','Sound design & color correction','More involved post-production']},
 {id:'YouTube Advanced',name:'YouTube Advanced',price:null,features:['Complex editing','Motion graphics & VFX','Multi-layered storytelling','Advanced post-production']}]},
{title:'Brand Films & Production',plans:[
 {id:'Brand Film / Production Quote',name:'Brand Films & Production',price:null,features:['Brand promotional films','Cinematography & full production','Events','Multi-video packages']}]}]
export const addons=[{name:'Captions & subtitles',price:'₹199 onwards'},{name:'Motion graphics',price:'₹499 onwards'},{name:'Advanced visual effects',price:'₹999 onwards'},{name:'Color grading',price:'₹299 onwards'},{name:'Thumbnail design',price:'₹199 onwards'},{name:'Rush delivery',price:'+25% (subject to capacity)'}]
export const pricingNote='All prices are starting estimates in INR. The final quote depends on video duration, raw footage length, complexity, required assets, turnaround time and revision scope. Licensed stock footage, music, voice-over, travel, equipment rental and other external costs may be additional.'
export const categories=['Instagram Reels','YouTube Shorts','Long-Form YouTube','Motion Graphics & VFX','Color Grading','Brand Promos','Cinematography','Experimental Edits']
// demo:true shows a "Demo" badge. Replace with real work: set demo:false, add videoUrl (YouTube/Instagram/mp4), client, breakdown.
export type Project={id:string;title:string;category:string;platform:string;description:string;hue:number;image:string;demo:boolean;videoUrl?:string;client?:string;breakdown?:string}
export const projects:Project[]=[
{id:'p1',title:'Reel Edit Concept',category:'Instagram Reels',platform:'Instagram',description:'Fast-paced vertical edit with beat-synced cuts and animated captions.',hue:38,image:'photo-1516035069371-29a1b244cc32',demo:true},
{id:'p2',title:'Shorts Pacing Concept',category:'YouTube Shorts',platform:'YouTube',description:'Hook-first short-form structure built for retention.',hue:12,image:'photo-1492619375914-88005aa9e8fb',demo:true},
{id:'p3',title:'Long-Form Story Concept',category:'Long-Form YouTube',platform:'YouTube',description:'Narrative long-form edit with chapters, b-roll and sound design.',hue:30,image:'photo-1478720568477-152d9b164e26',demo:true},
{id:'p4',title:'Motion Titles Concept',category:'Motion Graphics & VFX',platform:'After Effects',description:'Kinetic typography and compositing study.',hue:200,image:'photo-1536240478700-b869070f9279',demo:true},
{id:'p5',title:'Cinematic Grade Concept',category:'Color Grading',platform:'DaVinci Resolve',description:'Before/after grading look with warm highlights and deep shadows.',hue:25,image:'photo-1500530855697-b586d89ba3ee',demo:true},
{id:'p6',title:'Product Promo Concept',category:'Brand Promos',platform:'Multi-platform',description:'Short promotional spot structure for a product launch.',hue:45,image:'photo-1542038784456-1ea8e935640e',demo:true},
{id:'p7',title:'Cinematography Study',category:'Cinematography',platform:'Film',description:'Composition and lighting reference study.',hue:350,image:'photo-1519608487953-e999c86e7455',demo:true},
{id:'p8',title:'Experimental Cut',category:'Experimental Edits',platform:'Social',description:'Playful transitions and rhythm experiments.',hue:280,image:'photo-1485846234645-a62644f84728',demo:true}]
export const experience=['YouTube video & Shorts editing','Instagram influencer content','Short-form storytelling','Visual effects & motion graphics','Color grading','Social-first editing & content pacing']
// Add verified collaborations here: {name:'Channel/Creator',note:'what you did',date:'2025',link:''}
export const collaborations:{name:string;note:string;date?:string;link?:string}[]=[]
export const tools=[{n:'After Effects',m:'Ae',c:'#9999ff'},{n:'DaVinci Resolve',m:'Dr',c:'#e6b866'},{n:'Premiere Pro',m:'Pr',c:'#9999ff'},{n:'CapCut',m:'Cc',c:'#f4efe6'},{n:'Photoshop',m:'Ps',c:'#31a8ff'}]
export const steps=[['Discover','The client shares their idea, goals, platform, audience and references.'],['Plan','We agree on deliverables, scope, pricing, assets and timeline.'],['Create','The project moves through editing, production or post-production as agreed.'],['Deliver','The client receives final deliverables, with revisions handled per the selected package.']]
export const faqs=[['How do I get started?','Send a project inquiry with your idea, platform and reference links. I’ll reply by email to discuss scope and pricing.'],['What footage should I provide?','Raw clips, preferred music or references, brand assets (logos, fonts) and a short brief. Share via a cloud link.'],['Can you edit videos remotely?','Yes. Editing and post-production are done remotely. Shoots require on-location planning.'],['How many revisions are included?','It depends on the package (see Pricing). Extra revision rounds can be quoted. Revisions are not unlimited.'],['What is your typical turnaround?','It depends on duration, footage and complexity. A timeline is agreed before work begins.'],['Do you offer complete video production?','Production and cinematography are quoted per project. Equipment, crew and locations are confirmed during planning.'],['How does the free introductory offer work?','A limited number of selected projects are edited free. Apply through the form; acceptance depends on suitability and capacity.'],['Can you work with an existing brand style?','Yes. Share your brand guidelines or reference videos and I’ll match them.']]
export const nav=[['Home','home'],['Services','services'],['Work','work'],['Experience','experience'],['Pricing','pricing'],['About','about'],['Contact','contact']]
