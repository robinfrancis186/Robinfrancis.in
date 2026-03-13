import{j as t,C as j,N,S as F,u as h,a as S,s as z,b as U,d as y,V as I}from"./threejs-DCZv9mnd.js";import{r as p,R as O}from"./reactConfig-BBnIpS6R.js";import{z as D,b as T,a as x}from"./index-ARPm9pW9.js";import"./animations-52dTnFc4.js";const V=z({time:0,resolution:new I,dotColor:new y("#FFFFFF"),bgColor:new y("#121212"),mouseTrail:null,render:0,rotation:0,gridSize:50,dotOpacity:.05},`
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,`
    uniform float time;
    uniform int render;
    uniform vec2 resolution;
    uniform vec3 dotColor;
    uniform vec3 bgColor;
    uniform sampler2D mouseTrail;
    uniform float rotation;
    uniform float gridSize;
    uniform float dotOpacity;

    vec2 rotate(vec2 uv, float angle) {
        float s = sin(angle);
        float c = cos(angle);
        mat2 rotationMatrix = mat2(c, -s, s, c);
        return rotationMatrix * (uv - 0.5) + 0.5;
    }

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 rotatedUv = rotate(uv, rotation);

      // Create a grid
      vec2 gridUv = fract(rotatedUv * gridSize);
      vec2 gridUvCenterInScreenCoords = rotate((floor(rotatedUv * gridSize) + 0.5) / gridSize, -rotation);

      // Calculate distance from the center of each cell
      float baseDot = sdfCircle(gridUv, 0.25);

      // Screen mask
      float screenMask = smoothstep(0.0, 1.0, 1.0 - uv.y); // 0 at the top, 1 at the bottom
      vec2 centerDisplace = vec2(0.7, 1.1);
      float circleMaskCenter = length(uv - centerDisplace);
      float circleMaskFromCenter = smoothstep(0.5, 1.0, circleMaskCenter);
      
      float combinedMask = screenMask * circleMaskFromCenter;
      float circleAnimatedMask = sin(time * 2.0 + circleMaskCenter * 10.0);

      // Mouse trail effect
      float mouseInfluence = texture2D(mouseTrail, gridUvCenterInScreenCoords).r;
      
      float scaleInfluence = max(mouseInfluence * 0.5, circleAnimatedMask * 0.3);

      // Create dots with animated scale, influenced by mouse
      float dotSize = min(pow(circleMaskCenter, 2.0) * 0.3, 0.3);

      float sdfDot = sdfCircle(gridUv, dotSize * (1.0 + scaleInfluence * 0.5));

      float smoothDot = smoothstep(0.05, 0.0, sdfDot);

      float opacityInfluence = max(mouseInfluence * 50.0, circleAnimatedMask * 0.5);

      // Mix background color with dot color, using animated opacity to increase visibility
      vec3 composition = mix(bgColor, dotColor, smoothDot * combinedMask * dotOpacity * (1.0 + opacityInfluence));

      gl_FragColor = vec4(composition, 1.0);

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `);function P(){const a=h(n=>n.size),o=h(n=>n.viewport),{theme:e}=D(),c=0,u=100,s=(()=>{switch(e){case"dark":return{dotColor:"#FFFFFF",bgColor:"#121212",dotOpacity:.025};case"light":return{dotColor:"#e1e1e1",bgColor:"#F4F5F5",dotOpacity:.15};default:return{dotColor:"#FFFFFF",bgColor:"#121212",dotOpacity:.05}}})(),[l,v]=S({size:512,radius:.1,maxAge:400,interpolate:1,ease:function(f){return f<.5?(1-Math.sqrt(1-Math.pow(2*f,2)))/2:(Math.sqrt(1-Math.pow(-2*f+2,2))+1)/2}}),r=p.useMemo(()=>new V,[]);p.useEffect(()=>{r.uniforms.dotColor.value.setHex(parseInt(s.dotColor.replace("#","0x"))),r.uniforms.bgColor.value.setHex(parseInt(s.bgColor.replace("#","0x"))),r.uniforms.dotOpacity.value=s.dotOpacity},[e,r,s]),U(n=>{r.uniforms.time.value=n.clock.elapsedTime});const d=n=>{v(n)},m=Math.max(o.width,o.height)/2;return t.jsxs("mesh",{scale:[m,m,1],onPointerMove:d,children:[t.jsx("planeGeometry",{args:[2,2]}),t.jsx("primitive",{object:r,resolution:[a.width*o.dpr,a.height*o.dpr],rotation:c,gridSize:u,mouseTrail:l,render:0})]})}const R=()=>t.jsx(j,{gl:{antialias:!0,powerPreference:"high-performance",outputColorSpace:F,toneMapping:N},children:t.jsx(P,{})}),C=a=>typeof a=="boolean"?`${a}`:a===0?"0":a,w=T,_=(a,o)=>e=>{var c;if((o==null?void 0:o.variants)==null)return w(a,e==null?void 0:e.class,e==null?void 0:e.className);const{variants:u,defaultVariants:i}=o,s=Object.keys(u).map(r=>{const d=e==null?void 0:e[r],m=i==null?void 0:i[r];if(d===null)return null;const n=C(d)||C(m);return u[r][n]}),l=e&&Object.entries(e).reduce((r,d)=>{let[m,n]=d;return n===void 0||(r[m]=n),r},{}),v=o==null||(c=o.compoundVariants)===null||c===void 0?void 0:c.reduce((r,d)=>{let{class:m,className:n,...f}=d;return Object.entries(f).every(M=>{let[b,g]=M;return Array.isArray(g)?g.includes({...i,...l}[b]):{...i,...l}[b]===g})?[...r,m,n]:r},[]);return w(a,s,v,e==null?void 0:e.class,e==null?void 0:e.className)},$=_("relative group border text-foreground mx-auto text-center rounded-full",{variants:{variant:{default:"bg-blue-500/5 hover:bg-blue-500/0 border-blue-500/20",solid:"bg-blue-500 hover:bg-blue-600 text-white border-transparent hover:border-foreground/50 transition-all duration-200",ghost:"border-transparent bg-transparent hover:border-zinc-600 hover:bg-white/10"},size:{default:"px-7 py-1.5 ",sm:"px-4 py-0.5 ",lg:"px-10 py-2.5 "}},defaultVariants:{variant:"default",size:"default"}}),k=O.forwardRef(({className:a,neon:o=!0,size:e,variant:c,children:u,...i},s)=>t.jsxs("button",{className:x($({variant:c,size:e}),a),ref:s,...i,children:[t.jsx("span",{className:x("absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-blue-500 via-blue-600 to-transparent hidden",o&&"block")}),u,t.jsx("span",{className:x("absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-blue-500 via-blue-600 to-transparent hidden",o&&"block")})]}));k.displayName="Button";const G=()=>{const[a,o]=p.useState(""),[e,c]=p.useState(""),[u,i]=p.useState(""),s=l=>{l.preventDefault();const v=`Portfolio Contact from ${a}`,r=`Name: ${a}
Email: ${e}

Message:
${u}`;window.location.href=`mailto:robinfrancis186@gmail.com?subject=${encodeURIComponent(v)}&body=${encodeURIComponent(r)}`};return t.jsxs("section",{id:"contact",className:"h-[40rem] w-full rounded-md bg-white relative flex flex-col items-center justify-center antialiased",children:[t.jsxs("div",{className:"max-w-2xl mx-auto p-4",children:[t.jsx("h1",{className:"relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500  text-center font-sans font-bold",children:"Get in touch"}),t.jsx("p",{}),t.jsx("p",{className:"text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10",children:"I’m always open to collaborations, mentorship, community projects, or opportunities to build meaningful technology"}),t.jsx("div",{className:"relative z-10 mt-8",children:t.jsxs("form",{onSubmit:s,className:"space-y-4",children:[t.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 w-full",children:[t.jsx("input",{type:"text",placeholder:"Your Name",value:a,onChange:l=>o(l.target.value),required:!0,className:"rounded-lg border border-neutral-200/50 dark:border-neutral-800 focus:ring-2 focus:ring-primary/50 w-full bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm placeholder:text-neutral-500 text-neutral-900 dark:text-neutral-100 px-4 py-3 outline-none transition-all"}),t.jsx("input",{type:"email",placeholder:"Your Email",value:e,onChange:l=>c(l.target.value),required:!0,className:"rounded-lg border border-neutral-200/50 dark:border-neutral-800 focus:ring-2 focus:ring-primary/50 w-full bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm placeholder:text-neutral-500 text-neutral-900 dark:text-neutral-100 px-4 py-3 outline-none transition-all"})]}),t.jsx("textarea",{placeholder:"Your Message",rows:5,value:u,onChange:l=>i(l.target.value),required:!0,className:"rounded-lg border border-neutral-200/50 dark:border-neutral-800 focus:ring-2 focus:ring-primary/50 w-full relative z-10 mt-4 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm placeholder:text-neutral-500 text-neutral-900 dark:text-neutral-100 px-4 py-3 outline-none transition-all resize-none"}),t.jsx(k,{neon:!0,className:"w-full bg-primary hover:bg-primary/90 text-primary-foreground border-transparent font-medium py-6 text-sm",children:"Send Message"})]})})]}),t.jsx("div",{className:"absolute inset-0 z-0",children:t.jsx(R,{})})]})};export{G as default};
//# sourceMappingURL=Contact-BlZF3dCV.js.map
