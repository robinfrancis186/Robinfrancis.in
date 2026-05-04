import{r as c,j as a,C as h,N as C,S as M,u as d,d as x,s as F,e as w,f as m,V as y}from"./three-vendor-Bgo_zJSc.js";import{z as b}from"./index-Sh0gT_G2.js";import"./animation-vendor-BT51U7pO.js";const S=F({time:0,resolution:new y,dotColor:new m("#FFFFFF"),bgColor:new m("#121212"),mouseTrail:null,render:0,rotation:0,gridSize:50,dotOpacity:.05},`
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
  `);function k(){const i=d(e=>e.size),o=d(e=>e.viewport),{theme:t}=b(),n=0,f=100,s=(()=>{switch(t){case"dark":return{dotColor:"#FFFFFF",bgColor:"#121212",dotOpacity:.025};case"light":return{dotColor:"#e1e1e1",bgColor:"#F4F5F5",dotOpacity:.15};default:return{dotColor:"#FFFFFF",bgColor:"#121212",dotOpacity:.05}}})(),[v,p]=x({size:512,radius:.1,maxAge:400,interpolate:1,ease:function(l){return l<.5?(1-Math.sqrt(1-Math.pow(2*l,2)))/2:(Math.sqrt(1-Math.pow(-2*l+2,2))+1)/2}}),r=c.useMemo(()=>new S,[]);c.useEffect(()=>{r.uniforms.dotColor.value.setHex(parseInt(s.dotColor.replace("#","0x"))),r.uniforms.bgColor.value.setHex(parseInt(s.bgColor.replace("#","0x"))),r.uniforms.dotOpacity.value=s.dotOpacity},[t,r,s]),w(e=>{r.uniforms.time.value=e.clock.elapsedTime});const g=e=>{p(e)},u=Math.max(o.width,o.height)/2;return a.jsxs("mesh",{scale:[u,u,1],onPointerMove:g,children:[a.jsx("planeGeometry",{args:[2,2]}),a.jsx("primitive",{object:r,resolution:[i.width*o.dpr,i.height*o.dpr],rotation:n,gridSize:f,mouseTrail:v,render:0})]})}const T=()=>{const[i,o]=c.useState(!1);return c.useEffect(()=>{const t=window.matchMedia("(prefers-reduced-motion: reduce)"),n=()=>o(t.matches);return n(),t.addEventListener("change",n),()=>t.removeEventListener("change",n)},[]),i?a.jsx("div",{className:"h-full w-full bg-gradient-to-b from-background to-muted/20","aria-hidden":"true"}):a.jsx(h,{gl:{antialias:!0,powerPreference:"high-performance",outputColorSpace:M,toneMapping:C},children:a.jsx(k,{})})};export{T as DotScreenShader};
