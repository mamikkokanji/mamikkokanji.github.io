# 公開サイト（リポジトリの直下）を www/ にコピーし、Google Fonts をダウンロードしてアプリの中に入れる。
# アプリはネットなしで動き、外のサーバーにアクセスしない（審査・プライバシー対応）。
import os, re, shutil, urllib.request, hashlib
HERE=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.dirname(HERE); W=os.path.join(HERE,"www")
SKIP={"native",".git",".github","en","og-image.png","og-image-v2.png","og-image-v3.png","og-image-v4.png","privacy.html","support.html"}
if os.path.exists(W): shutil.rmtree(W)
os.makedirs(W)
for n in os.listdir(ROOT):
    if n in SKIP or n.startswith("."): continue
    s=os.path.join(ROOT,n); d=os.path.join(W,n)
    shutil.copytree(s,d) if os.path.isdir(s) else shutil.copy2(s,d)
UA={"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"}
def get(u): return urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=60).read()
os.makedirs(os.path.join(W,"fonts"),exist_ok=True); cache={}
def local_css(url):
    if url in cache: return cache[url]
    css=get(url.replace("&amp;","&")).decode()
    def fetch(m):
        fu=m.group(1); fn=hashlib.md5(fu.encode()).hexdigest()[:16]+".woff2"
        p=os.path.join(W,"fonts",fn)
        if not os.path.exists(p): open(p,"wb").write(get(fu))
        return f"url({fn})"
    css=re.sub(r"url\((https://fonts\.gstatic\.com/[^)]+)\)",fetch,css)
    name="f-"+hashlib.md5(url.encode()).hexdigest()[:10]+".css"
    open(os.path.join(W,"fonts",name),"w").write(css); cache[url]="fonts/"+name; return cache[url]
SAFE_TOP='<style id="kf-safe-top">html{padding-top:env(safe-area-inset-top,0px)}#kf-sb{position:fixed;left:0;right:0;top:0;height:env(safe-area-inset-top,0px);background:var(--bg,#FFF8EE);z-index:2147483000;pointer-events:none;transform:translateZ(0)}.sheet{top:env(safe-area-inset-top,0px)}</style>\n'
n=0
for dp,_,fs in os.walk(W):
    for f in fs:
        if not f.endswith(".html"): continue
        p=os.path.join(dp,f); s=open(p,encoding="utf-8").read(); o=s
        s=re.sub(r'<link[^>]+href="https://fonts\.(googleapis|gstatic)\.com"[^>]*>\s*',"",s)
        s=re.sub(r'href="(https://fonts\.googleapis\.com/css2\?[^"]+)"',lambda m:'href="'+local_css(m.group(1))+'"',s)
        s=re.sub(r'<meta property="og:[^>]*>\s*|<meta name="twitter:[^>]*>\s*',"",s)
        # アプリでは 画面の上の 時計・電池の ところに 重ならないように する（Web版は かえない）
        if "</head>" in s and "kf-safe-top" not in s:
            s=s.replace("</head>",SAFE_TOP+"</head>",1)
            s=re.sub(r"(<body[^>]*>)",r'\1<div id="kf-sb" aria-hidden="true"></div>',s,count=1)
        if s!=o: open(p,"w",encoding="utf-8").write(s); n+=1
left=[]
for dp,_,fs in os.walk(W):
    for f in fs:
        if f.endswith((".html",".js",".css")):
            t=open(os.path.join(dp,f),encoding="utf-8",errors="ignore").read()
            left+= [f+": "+u for u in set(re.findall(r"https?://[a-zA-Z0-9.-]+",t)) if "w3.org" not in u]
print("html rewritten:",n,"fonts:",len(os.listdir(os.path.join(W,"fonts"))))
print("remaining external hosts:",sorted(set(left))[:20])
