if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const o=e=>a(e,i),r={module:{uri:i},exports:c,require:o};s[i]=Promise.all(n.map((e=>r[e]||o(e)))).then((e=>(t(...e),c)))}}define(["./workbox-83b758e3"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/3F2PvpICAx5bTUu2oFHom/_buildManifest.js",revision:"50654c4134ba6f71b423498e9447ee91"},{url:"/_next/static/3F2PvpICAx5bTUu2oFHom/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/118-de7a0c94c205e0ee.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/289-6d674b33c7212238.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/326-b9e01955a75dfb41.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/492-c509e849153acc5e.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/529-f1bdb0f2b55bd6cc.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/643-1f4e6a009477db3e.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/777.2f0656006694a0bd.js",revision:"2f0656006694a0bd"},{url:"/_next/static/chunks/852-8d577b7b4e06e7aa.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/905-fee7e5518cca8fd8.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/990-8e3c5166d2150a19.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/app/_not-found-acfa08c4e862ad56.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/app/auth/login/page-9a3d4c100e8fd0a4.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/app/layout-f43effac7a8b4fa5.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/app/page-3c5e74adec265109.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/app/profile/code/page-a28114c82d3ac6f8.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/app/profile/edit/page-ad8fc94697ebd92b.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/app/profile/page-bc9e481f2ab40998.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/app/transactions/%5Bid%5D/page-8690e076389796aa.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/app/transactions/page-2b84910da3998efb.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/app/transactions/send/page-d3b24afa2036c1e8.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/bf6a786c-5b2efc3f70c2eca9.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/main-918216f5b1357067.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/main-app-bca7e04e8258eb03.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/pages/_app-1534f180665c857f.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/pages/_error-b646007f40c4f0a8.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-7a7715197ec6cf21.js",revision:"3F2PvpICAx5bTUu2oFHom"},{url:"/_next/static/css/47ee83f19e19c50f.css",revision:"47ee83f19e19c50f"},{url:"/_next/static/css/dc328064e2317fc1.css",revision:"dc328064e2317fc1"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));