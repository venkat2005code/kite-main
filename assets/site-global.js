
 (function(){
 const routes={
  "home":"index.html","home 1":"index.html","home 2":"home-2.html",
  "categories":"products.html", "products":"products.html","product catalog":"products.html","shop":"products.html",
  "zephyr pro":"product-zephyr-pro.html","product detail":"product-zephyr-pro.html",
  "beach gear":"beach-gear.html","outdoor beach gear":"beach-gear.html",
  "events":"events.html","events & festivals":"events.html","festivals":"events.html",
  "buying guide":"buying-guide.html","wind buying guide":"buying-guide.html",
  "contact":"contact.html","gear support":"contact.html","support":"contact.html"
 };
 const norm=s=>(s||"").replace(/\s+/g," ").trim().toLowerCase();
 function toast(msg){
  let t=document.getElementById("kite-toast"); if(!t)return;
  t.textContent=msg;t.classList.add("show");clearTimeout(window.__kiteToast);
  window.__kiteToast=setTimeout(()=>t.classList.remove("show"),1500);
 }
 function controls(){
  const toastEl=document.createElement("div");toastEl.id="kite-toast";document.body.appendChild(toastEl);
  
  const thToggle = document.getElementById("theme-toggle");
  if(thToggle){
   thToggle.onclick=()=>{
    const n=document.documentElement.dataset.theme==="dark"?"light":"dark";
    document.documentElement.dataset.theme=n;localStorage.setItem("kite-theme",n);update();toast(n==="dark"?"Dark theme enabled":"Light theme enabled");
   };
  }
  
  const rtlToggle = document.getElementById("rtl-toggle");
  if(rtlToggle){
   rtlToggle.onclick=()=>{
    const n=document.documentElement.dir==="rtl"?"ltr":"rtl";
    document.documentElement.dir=n;localStorage.setItem("kite-dir",n);update();toast(n==="rtl"?"RTL enabled":"LTR enabled");
   };
  }

  if(!thToggle || !rtlToggle) {
   if(document.getElementById("kite-controls"))return;
   const d=document.createElement("div");d.id="kite-controls";
   d.innerHTML='<button id="kite-theme" title="Toggle theme">☾</button><button id="kite-dir" title="Toggle RTL">RTL</button>';
   document.body.appendChild(d);
   document.getElementById("kite-theme").onclick=()=>{
    const n=document.documentElement.dataset.theme==="dark"?"light":"dark";
    document.documentElement.dataset.theme=n;localStorage.setItem("kite-theme",n);update();toast(n==="dark"?"Dark theme enabled":"Light theme enabled");
   };
   document.getElementById("kite-dir").onclick=()=>{
    const n=document.documentElement.dir==="rtl"?"ltr":"rtl";
    document.documentElement.dir=n;localStorage.setItem("kite-dir",n);update();toast(n==="rtl"?"RTL enabled":"LTR enabled");
   };
  }
 }
 function navInit(){
  const homeBtn = document.getElementById("home-dropdown-btn");
  const homeMenu = document.getElementById("home-dropdown-menu");
  const homeWrapper = document.getElementById("home-dropdown-wrapper");
  if(homeBtn && homeMenu) {
   homeBtn.setAttribute("aria-haspopup", "true");
   homeBtn.setAttribute("aria-expanded", "false");
   homeMenu.setAttribute("aria-labelledby", "home-dropdown-btn");
   let mouseOverMenu=false;
   let suppressHover=false;
   const openMenu=()=>{
    homeMenu.style.display="block";
    homeBtn.setAttribute("aria-expanded", "true");
   };
   const closeMenu=()=>{
    homeMenu.style.display="none";
    homeBtn.setAttribute("aria-expanded", "false");
   };
   if(homeWrapper){
    homeWrapper.addEventListener("pointerenter",e=>{
     if(e.pointerType!=="mouse")return;
     mouseOverMenu=true;
     if(!suppressHover)openMenu();
    });
    homeWrapper.addEventListener("pointerleave",e=>{
     if(e.pointerType!=="mouse")return;
     mouseOverMenu=false;suppressHover=false;closeMenu();
    });
    homeWrapper.addEventListener("focusout",e=>{
     if(!homeWrapper.contains(e.relatedTarget)&&!mouseOverMenu)closeMenu();
    });
   }
   homeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if(mouseOverMenu&&!suppressHover){openMenu();return;}
    const open=homeBtn.getAttribute("aria-expanded")==="true";
    if(open)closeMenu();else openMenu();
   });
   document.addEventListener("click", (e) => {
    if(!homeBtn.contains(e.target) && !homeMenu.contains(e.target)) {
     closeMenu();
    }
   });
   document.addEventListener("keydown", (e) => {
    if(e.key==="Escape"&&homeBtn.getAttribute("aria-expanded")==="true"){
      closeMenu();suppressHover=mouseOverMenu;homeBtn.focus();
    }
   });
  }
 }
 function headerInit(){
  const desktopNav=document.getElementById("kite-desktop-nav")||document.querySelector("header nav");
  const mobileMenu=document.getElementById("kite-mobile-menu");
  const themeToggle=document.getElementById("theme-toggle");
  const actionBar=themeToggle&&themeToggle.parentElement;
  const profileElement=document.querySelector('header button[aria-label="Profile"], header img[alt="Profile"]');
  if(profileElement){
   const profileWrapper=profileElement.closest("button, .ms-space-xs");
   (profileWrapper||profileElement).remove();
  }

  const desktopLabels={
   "products-catalog":"Shop",
   "product-detail":"Product",
   "buying-guide":"Guide",
   "events-festivals":"Events",
   "outdoor-gear":"Beach",
   "contact-support":"Help"
  };
  if(desktopNav){
   Object.entries(desktopLabels).forEach(([path,label])=>{
    const link=desktopNav.querySelector(`a[data-path="${path}"]`);
    if(link)link.textContent=label;
   });
  desktopNav.querySelectorAll('a[href="products.html#ordering"], a[href="contact.html#store-location"]').forEach(link=>link.remove());
  [["coastal-winds","Coastal"],["mountain-pro","Mountain"]].forEach(([path,label])=>{
   const title=desktopNav.querySelector(`#home-dropdown-menu a[data-path="${path}"] div:first-child`);
    if(title)title.textContent=label;
   });
  }

  if(mobileMenu){
   const mobileLabels={
    "index.html":["Home","Coastal"],
    "home-2.html":["Mountain","Pro kites"],
    "products.html":["Shop","All products"],
    "product-zephyr-pro.html":["Product","Zephyr Pro kite"],
    "buying-guide.html":["Guide","Choose by wind"],
    "events.html":["Events","Fly-ins and festivals"],
    "beach-gear.html":["Beach","Shelters and gear"],
    "contact.html":["Help","Advice and repairs"]
   };
   Object.entries(mobileLabels).forEach(([href,[label,description]])=>{
    const link=mobileMenu.querySelector(`a[href="${href}"]`);
    const title=link&&link.querySelector("div > div:first-child");
    const subtitle=link&&link.querySelector("div > div:nth-child(2)");
    if(title)title.textContent=label;
    if(subtitle)subtitle.textContent=description;
   });
  mobileMenu.querySelectorAll('a[href="products.html#ordering"], a[href="contact.html#store-location"]').forEach(link=>link.remove());
  }

    if(actionBar&&!actionBar.querySelector(".kite-header-ctas")){
     const ctas=document.createElement("div");
     ctas.className="kite-header-ctas";
     ctas.innerHTML='<a class="kite-header-cta kite-header-cta-secondary" href="contact.html">Contact</a><a class="kite-header-cta kite-header-cta-primary" href="products.html">Shop Kites</a>';
     actionBar.insertBefore(ctas,themeToggle);
    }
    if(mobileMenu&&!mobileMenu.querySelector(".kite-mobile-ctas")){
     const mobileCtas=document.createElement("div");
     mobileCtas.className="kite-header-ctas kite-mobile-ctas";
     mobileCtas.innerHTML='<a class="kite-header-cta kite-header-cta-secondary" href="contact.html">Contact</a><a class="kite-header-cta kite-header-cta-primary" href="products.html">Shop Kites</a>';
     mobileMenu.insertBefore(mobileCtas,mobileMenu.firstChild);
    }
 }
 function update(){
  const dark=document.documentElement.dataset.theme==="dark";
  const rtl=document.documentElement.dir==="rtl";
  const th=document.getElementById("kite-theme"),di=document.getElementById("kite-dir");
  if(th){th.textContent=dark?"☀":"☾";th.title=dark?"Switch to light theme":"Switch to dark theme"}
  if(di){di.textContent=rtl?"LTR":"RTL";di.title=rtl?"Switch to LTR":"Switch to RTL"}

  const rtlToggle=document.getElementById("rtl-toggle");
  if(rtlToggle){
   const icon=rtlToggle.querySelector(".material-symbols-outlined");
   const label=rtl?"Switch to left-to-right layout":"Switch to right-to-left layout";
   if(icon)icon.textContent="translate";
   rtlToggle.title=label;rtlToggle.setAttribute("aria-label",label);
  }
  
  const themeIcon=document.getElementById("theme-icon");
  if(themeIcon){themeIcon.textContent=dark?"light_mode":"dark_mode";}
  if(dark){document.documentElement.classList.add("dark");}
  else{document.documentElement.classList.remove("dark");}
 }
 function links(){
  const pathRoutes={
   "coastal-winds":"index.html",
   "mountain-pro":"home-2.html",
   "products-catalog":"products.html",
   "product-detail":"product-zephyr-pro.html",
   "buying-guide":"buying-guide.html",
   "events-festivals":"events.html",
   "outdoor-gear":"beach-gear.html",
   "contact-support":"contact.html"
  };
  document.querySelectorAll('a[href="#"]').forEach(a=>{
   const txt=norm(a.textContent);
   const path=a.getAttribute('data-path');
   let target=pathRoutes[path]||null;
   if(!target){
    const keys=Object.keys(routes).sort((x,y)=>y.length-x.length);
    for(const k of keys) if(txt===k || txt.includes(k)){target=routes[k];break}
   }
   if(!target && /categories|shop|browse|catalog|buy now|view product|add to cart/.test(txt)) target="products.html";
   if(!target && /contact|support|quote|enquir|help/.test(txt)) target="contact.html";
   if(!target && /guide|how to choose/.test(txt)) target="buying-guide.html";
   if(!target && /event|festival/.test(txt)) target="events.html";
   if(target)a.href=target;
  });
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(a=>a.addEventListener("click",e=>{
   const el=document.querySelector(a.getAttribute("href"));if(el){e.preventDefault();el.scrollIntoView({behavior:"smooth"})}
  }));
 }
 function forms(){
  document.querySelectorAll("form").forEach(f=>f.addEventListener("submit",e=>{
   e.preventDefault();
   const bad=[...f.querySelectorAll("[required]")].find(x=>!x.value.trim());
   if(bad){bad.focus();toast("Please complete the required fields");return}
   f.reset();toast("Your request was submitted successfully");
  }));
 }
 function orderActions(){
  const purchasePattern=/^(add to cart|instant buy|add complete bundle|add .* to kit|quick add|one-click coastal pack order|order daytripper)/i;
  document.querySelectorAll("main button").forEach(button=>{
   const icon=button.querySelector(".material-symbols-outlined");
  const text=norm(button.textContent);
  const label=icon?text.replace(/^(add_shopping_cart|shopping_cart_checkout|shopping_cart|shopping_bag|bolt|add)\s*/,""):text;
   if(button.title!=="Quick Add"&&!purchasePattern.test(label))return;
  const kitMatch=label.match(/^add (.+) to kit$/i);
  const card=button.closest(".product-item")||button.closest(".group")||button.closest("article")||button.closest("section")||button.parentElement;
  const item=kitMatch?.[1]||card?.querySelector("h3")?.textContent.trim()||card?.querySelector("h2")?.textContent.trim()||document.querySelector("main h1")?.textContent.trim()||"this gear";
   const link=document.createElement("a");
   link.className=`${button.className} kite-order-link`;
   link.href="tel:8009374972";
   link.title=`Call to order ${item}`;
   link.setAttribute("aria-label",`Call to order ${item} at (800) 937-4972`);
   link.innerHTML='<span class="material-symbols-outlined text-lg" aria-hidden="true">call</span><span>Call to Order</span>';
   button.replaceWith(link);
  });
 }
 function catalogInit(){
  const filters=document.querySelector(".kite-catalog-filters");
  const grid=document.querySelector(".kite-catalog-grid");
  if(!filters||!grid)return;
  document.body.classList.add("kite-catalog-page");
  filters.open=window.matchMedia("(min-width: 1024px)").matches;

  const cards=[...grid.children];
  const filterButtons=[...document.querySelectorAll(".kite-category-filter")];
  const resultCount=document.getElementById("catalog-results-count");
  const sortSelect=grid.parentElement.querySelector("select");
  let activeFilter="all";
  const numericValue=(card,pattern,fallback=0)=>Number(card.innerText.match(pattern)?.[1]||fallback);
  const sortCards=(items)=>{
   const sortBy=norm(sortSelect?.value);
   if(sortBy.includes("price: low"))return items.sort((a,b)=>numericValue(a,/\$(\d+(?:\.\d+)?)/,Infinity)-numericValue(b,/\$(\d+(?:\.\d+)?)/,Infinity));
   if(sortBy.includes("price: high"))return items.sort((a,b)=>numericValue(b,/\$(\d+(?:\.\d+)?)/)-numericValue(a,/\$(\d+(?:\.\d+)?)/));
   if(sortBy.includes("rating")||sortBy.includes("best seller"))return items.sort((a,b)=>numericValue(b,/[1-5](\.\d+)?/)-numericValue(a,/[1-5](\.\d+)?/));
   return items.sort((a,b)=>numericValue(b,/\d+\s*[–-]\s*(\d+)\s*kts/i)-numericValue(a,/\d+\s*[–-]\s*(\d+)\s*kts/i));
  };
  const render=()=>{
    const visible=cards.filter(card=>activeFilter==="all"||card.dataset.category===activeFilter);
   cards.forEach(card=>{card.hidden=!visible.includes(card)});
   sortCards([...cards]).forEach(card=>grid.appendChild(card));
   if(resultCount)resultCount.textContent=`Showing ${visible.length} featured ${visible.length===1?"product":"products"}`;
  };
  filterButtons.forEach(button=>button.addEventListener("click",()=>{
   activeFilter=button.dataset.filter||"all";
   filterButtons.forEach(filter=>filter.setAttribute("aria-pressed",String(filter===button)));
   render();
  }));
  if(sortSelect)sortSelect.addEventListener("change",render);
  render();
 }
 function activeNavInit(){
  const curPath = window.location.pathname.split("/").pop() || "index.html";
  const desktopNav = document.getElementById("kite-desktop-nav");
  if(desktopNav){
   desktopNav.querySelectorAll("a").forEach(a => a.removeAttribute("aria-current"));
   const homeWrapper = document.getElementById("home-dropdown-wrapper");
   if(homeWrapper) homeWrapper.classList.remove("active-nav");

   if(curPath === "index.html" || curPath === "" || curPath === "home-2.html"){
     if(homeWrapper) homeWrapper.classList.add("active-nav");
   } else if(curPath === "products.html"){
     const a = desktopNav.querySelector('a[data-path="products-catalog"]');
     if(a) a.setAttribute("aria-current", "page");
   } else if(curPath === "product-zephyr-pro.html"){
     const a = desktopNav.querySelector('a[data-path="product-detail"]');
     if(a) a.setAttribute("aria-current", "page");
   } else if(curPath === "buying-guide.html"){
     const a = desktopNav.querySelector('a[data-path="buying-guide"]');
     if(a) a.setAttribute("aria-current", "page");
   } else if(curPath === "events.html"){
     const a = desktopNav.querySelector('a[data-path="events-festivals"]');
     if(a) a.setAttribute("aria-current", "page");
   } else if(curPath === "beach-gear.html"){
     const a = desktopNav.querySelector('a[data-path="outdoor-gear"]');
     if(a) a.setAttribute("aria-current", "page");
   } else if(curPath === "contact.html"){
     const a = desktopNav.querySelector('a[data-path="contact-support"]');
     if(a) a.setAttribute("aria-current", "page");
   }
  }
 }
 function paletteInit(){
  const palette = document.getElementById("kite-coating-palette") || document.querySelector(".grid.grid-cols-3.gap-space-sm.pt-space-xs");
  if(palette){
   const options = palette.querySelectorAll("div.cursor-pointer");
   options.forEach(opt => {
    opt.addEventListener("click", () => {
     options.forEach(o => {
      o.classList.remove("border-2", "border-secondary", "bg-surface-container-high", "active", "ring-2", "ring-secondary/30");
      o.classList.add("border-2", "border-transparent");
      const sub = o.querySelector("span:last-child");
      if(sub){
       sub.classList.remove("text-secondary", "font-bold");
       sub.classList.add("text-on-surface-variant");
      }
     });
     opt.classList.remove("border-transparent");
     opt.classList.add("border-2", "border-secondary", "bg-surface-container-high", "active", "ring-2", "ring-secondary/30");
     const name = opt.querySelector("span:first-of-type")?.textContent.trim() || "Option";
     const sub = opt.querySelector("span:last-child");
     if(sub){
      sub.classList.remove("text-on-surface-variant");
      sub.classList.add("text-secondary", "font-bold");
     }
     toast(`Selected ${name} coating`);
    });
   });
  }
 }
 function headerOffsetInit(){
  const update = () => {
   const header = document.querySelector("header");
   if(!header) return;
   const h = header.offsetHeight;
   document.documentElement.style.setProperty("--kite-header-height", h + "px");
  };
  update();
  window.addEventListener("resize", update);
  window.addEventListener("load", update);
 }
 function helpLayoutInit(){
  const faq=document.getElementById("help-faq");
  const community=document.getElementById("help-community");
  if(faq&&community)faq.parentNode.insertBefore(community,faq);
 }
 document.documentElement.dataset.theme=localStorage.getItem("kite-theme")||"light";
 document.documentElement.dir=localStorage.getItem("kite-dir")||"ltr";
 const prepareImages=()=>{
  document.querySelectorAll("img").forEach(img=>{
   if(!img.hasAttribute("alt"))img.alt=img.dataset.alt||"";
   img.decoding="async";
   if(!img.hasAttribute("loading")&&!img.closest("header")&&!img.closest("main > div > section:first-child"))img.loading="lazy";
  });
 };
 const init = ()=>{prepareImages();controls();headerInit();navInit();activeNavInit();headerOffsetInit();paletteInit();update();links();forms();catalogInit();helpLayoutInit();orderActions();document.documentElement.classList.add("kite-header-ready")};
 if(document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
 } else {
  init();
 }
})();

