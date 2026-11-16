  const TAU = Math.PI * 2;
  const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
  const rng = seed => { let n=(seed*1000000)>>>0; return () => { n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296; }; };
  class BluePuddle extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode:'open'}).innerHTML = `<style>
        :host { display:block; width:100%; height:100%; min-height:180px; }
        canvas { display:block; width:100%; height:100%; touch-action:pan-y; }
        :host(:focus-visible) { outline:2px solid #8ab9cf; outline-offset:-3px; }
      </style><canvas aria-hidden="true"></canvas>`;
      this.canvas = this.shadowRoot.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.puddles = []; this.ripples = []; this.time = 0; this.nextDrop = 0; this.paused = false;
      this.motion = matchMedia('(prefers-reduced-motion: reduce)');
      this.frame = this.frame.bind(this);
    }
    connectedCallback() {
      if (!this.hasAttribute('tabindex')) this.tabIndex = 0;
      this.abort = new AbortController();
      const opts = {signal:this.abort.signal};
      this.addEventListener('pointerdown', e => {
        if (e.button !== 0) return;
        const r = this.getBoundingClientRect();
        this.drop((e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height);
      }, opts);
      this.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.drop(.5,.5); }
      }, opts);
      document.addEventListener('visibilitychange', () => { this.last = undefined; }, opts);
      this.motion.addEventListener('change', () => { this.reset(); }, opts);
      this.observer = new ResizeObserver(() => this.resize());
      this.observer.observe(this);
      this.resize(); this.last = undefined;
      this.raf = requestAnimationFrame(this.frame);
    }
    disconnectedCallback() {
      cancelAnimationFrame(this.raf); this.observer.disconnect(); this.abort.abort();
    }
    resize() {
      const r = this.getBoundingClientRect();
      this.w = Math.max(1,r.width); this.h = Math.max(1,r.height);
      const dpr = Math.min(devicePixelRatio || 1,2);
      this.canvas.width = Math.round(this.w*dpr); this.canvas.height = Math.round(this.h*dpr);
      this.ctx.setTransform(dpr,0,0,dpr,0,0); this.draw();
    }
    reset() { this.puddles = []; this.ripples = []; this.time = 0; this.nextDrop = 0; this.draw(); }
    setPaused(value) { this.paused = !!value; this.last = undefined; }
    drop(x=.5,y=.5,ambient=false) {
      x=clamp(x,0,1); y=clamp(y,0,1);
      if(!ambient) {
        this.nextDrop=this.time+12+Math.random()*15;
        this.ripples.push({x,y,born:this.time,seed:Math.random()*TAU,speed:36+Math.random()*23,spacing:.3+Math.random()*.35,count:2+Math.floor(Math.random()*2)});
        this.ripples=this.ripples.slice(-5);
      }
      // Clicking existing paint disturbs that pool instead of stacking more circles.
      const nearby=this.puddles.find(p=>Math.hypot((p.x-x)*this.w,(p.y-y)*this.h)<this.base()*.8 && p.retire===undefined);
      if(!nearby) {
        const active=this.puddles.filter(p=>p.retire===undefined);
        if(active.length>=2) { active[0].retire=this.time; active[0].fadeDuration=8; }
        const p={x,y,born:this.time,ambient,expires:this.time+36+Math.random()*24,autoWave:ambient?this.time+10+Math.random()*4:Infinity,seed:Math.random()*TAU,scale:.65+Math.random()*.65};
        this.preparePool(p); this.puddles.push(p);
        this.puddles=this.puddles.slice(-4);
      }
      this.draw();
    }
    base() { return clamp(Math.min(this.w,this.h)*.36,110,290); }
    frame(now) {
      const delta=this.last===undefined?0:Math.min((now-this.last)/1000,.05);
      this.last=now;
      if(!document.hidden && !this.paused && !this.motion.matches) {
        this.time+=delta*clamp(Number(this.getAttribute('speed')||1),.1,3);
        for(const p of this.puddles) {
          if(p.retire===undefined && this.time>=p.expires) {p.retire=p.expires;p.fadeDuration=10;}
          if(this.time>=p.autoWave && p.retire===undefined) {
            this.ripples.push({x:p.x,y:p.y,born:this.time,seed:p.seed,speed:28+Math.random()*8,spacing:.7,count:2,quiet:.42});
            this.ripples=this.ripples.slice(-5);p.autoWave=Infinity;
          }
        }
        this.ripples=this.ripples.filter(r=>this.time-r.born<5);
        this.puddles=this.puddles.filter(p=>p.retire===undefined || this.time-p.retire<(p.fadeDuration||10));
        if(this.time>=this.nextDrop && this.getAttribute('ambient')!=='off') {
          // Let a second wash drift in before the first disappears, with bounded overlap.
          if(this.puddles.filter(p=>p.retire===undefined).length<2) {
            // Favor the upper right, with occasional drops elsewhere.
            const favorUpperRight = Math.random() < 0.75;
            const x = favorUpperRight ? 0.65 + Math.random() * 0.23 : 0.16 + Math.random() * 0.68;
            const y = favorUpperRight ? 0.15 + Math.random() * 0.22 : 0.40 + Math.random() * 0.40;
            this.drop(x, y, true);
            this.nextDrop=this.time+18+Math.random()*20;
          } else this.nextDrop=this.time+4;
        }
        this.draw();
      }
      this.raf=requestAnimationFrame(this.frame);
    }
    preparePool(p) {
      const random=rng(p.seed);
      p.duration=6+random()*8;p.aspect=.7+random()*.65;p.rotation=random()*TAU;
      p.breathe=.035+random()*.055;p.ringCount=2+Math.floor(random()*3);
      p.rings=Array.from({length:p.ringCount},()=>({offset:random()*.08,width:1+random()*3,seed:random()*TAU}));
      p.mist=Array.from({length:4},()=>({x:(random()-.5)*1.7,y:(random()-.5)*1.4,r:.5+random()*.8,phase:random()*TAU,rate:.025+random()*.04}));
      p.fish=Array.from({length:1+Math.floor(random()*3)},(_,i)=>({
        seed:random()*TAU,length:18+random()*19,width:.13+random()*.24,
        tail:.7+random()*1.5, bend:.12+random()*.3, phase:random()*TAU,
        speed:.035+random()*.045,beat:.55+random()*1.1,direction:i?1:-1,
        orbit:.27+random()*.27,flatten:.55+random()*.5,hue:random(),
        split:random()>.5, fin:random()*.45
      }));
      p.petals=Array.from({length:12+Math.floor(random()*18)},()=>({a:random()*TAU,r:.2+random()*.7,size:2+random()*4,rate:.08+random()*.17,phase:random()*TAU}));
      // Cache a unique pigment field once. Fine grain stays stable, never flickers.
      const texture=document.createElement('canvas');texture.width=texture.height=620;
      const c=texture.getContext('2d'),data=c.createImageData(620,620);
      const clouds=Array.from({length:7},()=>({x:(random()-.5)*1.2,y:(random()-.5)*1.1,r:.25+random()*.4,w:.3+random()*.65}));
      p.clouds=clouds;
      for(let y=0;y<620;y++)for(let x=0;x<620;x++) {
        const xx=(x-310)/205,yy=(y-310)/205;
        let density=0;
        for(const q of clouds)density+=q.w*Math.exp(-((xx-q.x)**2+(yy-q.y)**2)/(q.r*q.r));
        density=Math.min(1,density*.52);
        const grain=random();const mottling=.72+.2*Math.sin(xx*24+Math.sin(yy*16))+ .1*Math.cos(yy*47+xx*9);
        const alpha=density*(.13+grain*.22)*mottling*(grain<.1?.13:1);
        const i=(y*620+x)*4;
        // Slate wash toward site accent/highlight (#778ba4 / #b3bfcb), not cyan.
        data.data[i]=119+Math.floor(random()*50);data.data[i+1]=139+Math.floor(random()*42);data.data[i+2]=164+Math.floor(random()*32);
        data.data[i+3]=Math.round(alpha*255);
      }
      c.putImageData(data,0,0);p.texture=texture;
    }
    // Broken tapered brush bands, never perfect, uniform stroked circles.
    ring(x,y,r,alpha,seed,width=3) {
      const c=this.ctx;
      for(let part=0;part<3;part++) {
        const start=seed+part*TAU/3+.19*Math.sin(seed*3+part*5);
        const span=1.1+.65*(.5+.5*Math.sin(seed+part*2));
        for(let edge=0;edge<3;edge++) {
          c.beginPath();
          for(let side=1;side>=-1;side-=2) {
            for(let j=0;j<=65;j++) {
              const t=side===1?j/65:1-j/65;
              const a=start+t*span;
              const variation=1+.045*Math.sin(3*a+seed)+.016*Math.sin(11*a-seed)+.004*Math.sin(43*a+seed);
              const thickness=width*Math.pow(Math.sin(t*Math.PI),.65)*(1+.38*Math.sin(8*a+seed)+.15*Math.sin(39*a+seed));
              const rr=r*variation+side*thickness*(1+edge*.24);
              const xx=x+Math.cos(a)*rr, yy=y+Math.sin(a)*rr*.91;
              if(side===1&&j===0)c.moveTo(xx,yy);else c.lineTo(xx,yy);
            }
          }
          c.closePath();c.fillStyle=`rgba(119,139,164,${alpha/(edge+2)})`;c.fill();
          // Dry-brush pinholes and bristle fragments across the pigment ribbon.
          const random=rng(seed+part*2+edge*.1);
          for(let grain=0;grain<85;grain++) {
            const a=start+random()*span;
            const rr=r*(1+.045*Math.sin(3*a+seed)+.016*Math.sin(11*a-seed))+(random()-.5)*width*2;
            c.fillStyle=`rgba(247,247,247,${alpha*.75})`;
            c.fillRect(x+Math.cos(a)*rr,y+Math.sin(a)*rr*.91,.6+random()*1.6,.4+random());
          }
        }
        c.beginPath();
        for(let j=0;j<=70;j++) {
          const a=start+.12+j/70*(span-.22);
          const rr=(r-width*.65)*(1+.025*Math.sin(3*a+seed));
          const xx=x+Math.cos(a)*rr,yy=y+Math.sin(a)*rr*.91;
          j?c.lineTo(xx,yy):c.moveTo(xx,yy);
        }
        c.strokeStyle=`rgba(247,247,247,${alpha*.85})`;c.lineWidth=1.4;c.stroke();
      }
    }
    petal(x,y,size,angle,alpha,pink=false) {
      const c=this.ctx;c.save();c.translate(x,y);c.rotate(angle);
      c.beginPath();c.moveTo(0,-size);
      c.bezierCurveTo(size*.9,-size*.75,size*.75,size*.35,0,size);
      c.bezierCurveTo(-size*.65,size*.2,-size*.8,-size*.6,0,-size);
      c.fillStyle=`rgba(${pink?'214,220,228':'247,247,247'},${alpha})`;c.fill();c.restore();
    }
    fish(x,y,angle,time,alpha,f) {
      const c=this.ctx;c.save();c.translate(x,y);c.rotate(angle);
      const random=rng(f.seed);
      // A tapered, bending ink mark. Each creature has its own proportions,
      // asymmetric fins, tail length, pigment gaps and stroke rhythm; no eyes.
      const center=t=>Math.sin(t*3.8-time*f.beat+f.phase)*f.bend*t;
      const body=(t,side,layer)=>{
        const width=f.width*Math.pow(Math.sin(Math.PI*t),.72)*(1-.6*t);
        return [( .65-t*(1.35+f.tail*.35))*f.length,
          (center(t)+side*width*(1+layer*.08)+.008*Math.sin(t*71+f.seed))*f.length];
      };
      for(let layer=3;layer>=0;layer--) {
        c.beginPath();
        for(let side=1;side>=-1;side-=2)for(let j=0;j<=55;j++) {
          const t=side===1?j/55:1-j/55;const q=body(t,side,layer);
          side===1&&j===0?c.moveTo(...q):c.lineTo(...q);
        }
        c.closePath();c.fillStyle=`rgba(${f.hue>.5?'80,95,110':'119,139,164'},${alpha*.19})`;c.fill();
      }
      // Loose trailing filaments; some tails divide and some remain a single gesture.
      for(let k=0;k<(f.split?3:1);k++) {
        c.beginPath();
        for(let j=0;j<=38;j++) {
          const t=.55+j/38*.9;
          const xx=(.65-t*(1.35+f.tail*.35))*f.length;
          const yy=(center(t)+(k-1)*.07*Math.sin((t-.55)*2))*f.length;
          j?c.lineTo(xx,yy):c.moveTo(xx,yy);
        }
        c.strokeStyle=`rgba(107,117,127,${alpha*.26})`;c.lineWidth=.5+k*.2;c.stroke();
      }
      c.beginPath();c.moveTo(-f.length*.2,center(.45)*f.length);
      c.quadraticCurveTo(-f.length*.65,-f.length*f.fin,-f.length*.8,center(.7)*f.length);
      c.fillStyle=`rgba(179,191,203,${alpha*.2})`;c.fill();
      for(let j=0;j<120;j++) {
        const t=random(),q=body(t,(random()*2-1),0);
        c.fillStyle=`rgba(247,247,247,${alpha*(.15+random()*.6)})`;
        c.fillRect(q[0],q[1],.4+random(),.4+random()*.7);
      }
      c.restore();
    }
    draw() {
      const c=this.ctx;if(!c||!this.w)return;
      c.clearRect(0,0,this.w,this.h);
      const strength=.9*clamp(Number(this.getAttribute('intensity')||1),0,2);
      for(const p of this.puddles) {
        const age=this.motion.matches?14:this.time-p.born;
        const fade=clamp(age/5,0,1)*(p.retire===undefined?1:clamp(1-(this.time-p.retire)/(p.fadeDuration||10),0,1))*strength;
        const growth=.35+.65*(1-Math.exp(-age/p.duration));
        const radius=this.base()*p.scale*growth;
        const driftTime=this.motion.matches?0:age;
        const x=p.x*this.w+Math.sin(driftTime*.035+p.seed)*9,y=p.y*this.h+Math.sin(driftTime*.027+p.seed*2)*7;
        // Broad translucent pigment blooms move independently beneath the painted details.
        for(const mist of p.mist) {
          const mx=x+radius*(mist.x+Math.sin(driftTime*mist.rate+mist.phase)*.12);
          const my=y+radius*(mist.y+Math.cos(driftTime*mist.rate*.7+mist.phase)*.1);
          const mr=radius*mist.r;
          const fog=c.createRadialGradient(mx,my,0,mx,my,mr);
          fog.addColorStop(0,`rgba(155,178,179,${fade*.105})`);
          fog.addColorStop(.45,`rgba(174,190,197,${fade*.065})`);
          fog.addColorStop(1,'rgba(190,202,207,0)');
          c.fillStyle=fog;c.fillRect(mx-mr,my-mr,mr*2,mr*2);
        }
        c.save();c.translate(x,y);c.rotate(p.rotation);c.scale(1,p.aspect);
        c.globalAlpha=fade;
        c.drawImage(p.texture,-radius*1.5,-radius*1.5,radius*3,radius*3);
        c.restore();
        // A single, very quiet set of painted surface ripples within the wash.
        const breathing=this.motion.matches?0:Math.sin(age*p.breathe+p.seed)*.02;
        for(let k=0;k<p.ringCount;k++) {
          const ring=p.rings[k];
          this.ring(x-radius*.25,y+radius*.06,radius*(.22+k*.14+ring.offset+breathing),fade*(.24-k*.035),ring.seed,ring.width);
        }
        // A few petals, loosely clustered; the rest stays empty.
        for(let k=0;k<p.petals.length;k++) {
          const petal=p.petals[k];
          const a=petal.a;
          const rr=radius*petal.r;
          let px=x+Math.cos(a)*rr*.78,py=y+Math.sin(a)*rr;
          const drift=this.motion.matches?0:Math.sin(age*petal.rate+petal.phase)*4;
          px+=drift;py+=drift*.5;
          for(const wave of this.ripples) {
            const t=this.motion.matches?.65:this.time-wave.born;
            const dx=px-wave.x*this.w,dy=py-wave.y*this.h,d=Math.hypot(dx,dy)||1;
            const push=Math.exp(-Math.pow((d-12-t*wave.speed)/30,2))*5*Math.max(0,1-t/5);
            px+=dx/d*push;py+=dy/d*push;
          }
          this.petal(px,py,petal.size,a+drift*.05,fade*.85,k%5===0);
        }
        // Distinct meandering paths with pauses in pace; orientation follows the path.
        for(const f of p.fish) {
          const time=this.motion.matches?0:age;
          const t=time*f.speed*f.direction+f.phase+Math.sin(time*.13+f.seed)*.15;
          const position=u=>[Math.cos(u)*radius*f.orbit+Math.sin(u*2.3+f.seed)*radius*.1,
            Math.sin(u)*radius*f.orbit*f.flatten+Math.cos(u*1.7+f.seed)*radius*.07];
          const q=position(t),next=position(t+.01*f.direction);
          this.fish(x+q[0],y+q[1],Math.atan2(next[1]-q[1],next[0]-q[0]),time,fade*.7,f);
        }
        for(let k=0;k<10;k++) {
          const a=k*2.4+p.seed,rr=radius*(.4+(k%3)*.17);
          c.beginPath();c.arc(x+Math.cos(a)*rr,y+Math.sin(a)*rr, .7+(k%3)*.5,0,TAU);
          c.fillStyle=`rgba(247,247,247,${fade*.65})`;c.fill();
        }
      }
      // Pointer feedback begins immediately, then opens into broken brush ripples.
      for(const wave of this.ripples) {
        const age=this.motion.matches?.65:this.time-wave.born;
        for(let k=0;k<wave.count;k++) {
          const t=age-k*wave.spacing;if(t<0)continue;
          const alpha=Math.pow(clamp(1-t/5,0,1),1.7)*strength*.65*(wave.quiet||1);
          this.ring(wave.x*this.w,wave.y*this.h,10+t*wave.speed,alpha,wave.seed+k*.16,1.1+t*.45);
        }
      }
    }
  }

export function defineBluePuddle() {
  if (typeof window === "undefined") return;
  if (!customElements.get("blue-puddle")) {
    customElements.define("blue-puddle", BluePuddle);
  }
}
