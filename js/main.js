/* 牛排安逸的小屋 - 交互脚本（纯前端，零后端依赖） */

// ---------- 主题切换（雾玻璃深浅色） ----------
(function () {
  var saved = localStorage.getItem("theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);
})();

function toggleTheme() {
  var root = document.documentElement;
  var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  // 添加过渡类，让所有元素颜色缓慢渐变
  root.classList.add("theme-transition");
  if (next === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
  setTimeout(function () { root.classList.remove("theme-transition"); }, 900);
  localStorage.setItem("theme", next);
  document.querySelectorAll(".theme-btn").forEach(function (b) {
    b.textContent = next === "dark" ? "☀️" : "🌙";
  });
}

// ---------- 中英文切换 ----------
var LANG = localStorage.getItem("lang") || "zh";

// 中文 -> 英文 词典（以中文原文为键）
var I18N = {
  // 通用
  "牛排安逸的小屋": "niupai's Cozy Cabin",
  "首页": "Home",
  "关于我": "About",
  "文章": "Posts",
  "牛排安逸的小屋 · Powered by Cloudflare Pages": "niupai's Cozy Cabin · Powered by Cloudflare Pages",
  "← 返回首页": "← Back Home",
  "牛排": "niupai",

  // 首页 Hero
  "你好，我是 <span>牛排</span>": "Hi, I'm <span>niupai</span>",
  "📝 最近的文章": "📝 Latest Posts",
  "📜 箴言": "📜 Quotes",
  "点击复制当前箴言": "Click to copy this quote",
  "✓ 箴言已复制": "✓ Quote copied",

  // 置顶卡片
  "📌 置顶 · 我的世界": "📌 Pinned · Minecraft",
  "「牛排纯生存服务器」开服啦，欢迎来玩！": "\"niupai Pure Survival\" server is open — come play!",
  "Java / 基岩多端互通，1.21.7 ~ 26.2 任意版本都能进。扫码加 QQ 群，一起挖矿、建房、打末影龙！": "Java & Bedrock cross-play, any version 1.21.7 ~ 26.2. Scan the QR code to join our QQ group — mine, build and fight the Ender Dragon together!",

  // 文章卡片
  "技术笔记": "Tech Notes",
  "用 Cloudflare Pages 白嫖一个个人博客": "A Free Blog on Cloudflare Pages",
  "零成本、零后端、全球 CDN 加速。分享把静态博客部署上 Cloudflare Pages 的全过程与踩坑记录。": "Zero cost, zero backend, global CDN. My full journey of deploying a static blog on Cloudflare Pages.",
  "前端设计": "Frontend Design",
  "雾玻璃 Glassmorphism 实践手记": "Glassmorphism in Practice",
  "backdrop-filter 的魔法参数怎么调？深色模式如何兼容？这个小屋的样式就是这么写出来的。": "How to tune backdrop-filter? How to handle dark mode? This cabin's style was built exactly this way.",
  "生活随笔": "Life Notes",
  "猫系程序员的安逸周末": "A Lazy Weekend of a Cat-like Coder",
  "睡到自然醒，写一点代码，撸一会儿猫。程序员的周末不只有 Debug，还有阳光和呼噜声。": "Wake up naturally, write some code, pet the cat. A coder's weekend is more than debugging — sunshine and purrs included.",

  // 关于页
  "关于牛排": "About niupai",
  "昵称牛排（niupai），一只喜欢 Coding、动漫与摸鱼的猫系开发者，同时也是《我的世界》「牛排纯生存服务器」的服主。": "My nickname is niupai — a cat-like developer who loves coding, anime and lazy afternoons. I'm also the owner of the Minecraft server \"niupai Pure Survival\".",
  "平时写写 Python、捣鼓 PyQt5 桌面小工具，也玩 ESP32 硬件和 Godot 游戏开发。开服务器、带朋友一起挖矿建房，是我另一种「编程」—— 经营一个安逸的小世界。": "I mostly write Python and build desktop toys with PyQt5, and I play with ESP32 hardware and Godot game dev. Running a server and mining/building with friends is another kind of \"programming\" — tending a cozy little world.",
  "我尤其热爱电子类的东西 —— 电路板、传感器、小屏幕、各种稀奇古怪的电子模块，焊台一坐就是一下午，拆解和点亮一块板子的成就感无可替代。": "I'm especially passionate about electronics — circuit boards, sensors, tiny screens and all kinds of quirky modules. A soldering iron can keep me happy all afternoon; the thrill of lighting up a board is irreplaceable.",
  "这个小屋是我记录技术、生存服日常与生活随笔的地方。": "This cabin is where I record tech notes, survival-server daily life and essays.",
  "前端": "Frontend",
  "二次元": "Anime & ACG",
  "MC 服主": "MC Server Owner",
  "技能条 📊": "Skill Bars 📊",
  "前端 (HTML/CSS/JS)": "Frontend (HTML/CSS/JS)",
  "嵌入式 (ESP32 / Arduino)": "Embedded (ESP32 / Arduino)",
  "游戏开发 (Godot)": "Game Dev (Godot)",
  "找到我 ✉️": "Find Me ✉️",
  "欢迎交流技术、摸鱼心得，或者来我的《我的世界》生存服玩": "Talk tech, slacking tips, or come play on my Minecraft survival server",
  "QQ 号（点击可复制）": "QQ (click to copy)",
  "复制": "Copy",
  "✓ 已复制到剪贴板": "✓ Copied to clipboard",
  "📺 我的 B 站：牛排电子科普": "📺 My Bilibili: niupai's Electronics",
  "我是一名电子爱好者，在 B 站分享电路板制作、ESP32 硬件折腾、电子小制作与科普视频。 每一个项目从画板、焊接到点亮，都拍成了视频记录。如果你喜欢电子、喜欢动手， 点个关注不迷路 —— 你的每一个三连，都是我熬夜焊板子的动力！": "I'm an electronics hobbyist. On Bilibili I share PCB making, ESP32 tinkering, DIY electronics and science videos — every project filmed from layout and soldering to the first blink. If you love electronics and hands-on making, hit follow! Your likes, coins and favorites keep me soldering late into the night!",
  "去 B 站关注我": "Follow me on Bilibili",

  // 文章：Cloudflare
  "用 Cloudflare Pages 白嫖一个个人博客": "A Free Blog on Cloudflare Pages (Zero Cost)",
  "2026-10-12 · 牛排": "2026-10-12 · niupai",
  "一直想有个自己的博客，但不想付服务器钱，也不想维护后端。试了一圈之后发现：<strong>静态站 + Cloudflare Pages</strong> 就是白嫖的终极答案。": "I always wanted a personal blog but refused to pay for servers or maintain a backend. After trying many options, I found the ultimate free answer: <strong>static site + Cloudflare Pages</strong>.",
  "为什么选 Cloudflare Pages？": "Why Cloudflare Pages?",
  "免费额度非常慷慨：无限带宽、无限请求数（Pages 静态托管本身不限量），全球 CDN，自动 HTTPS。对于个人博客这种纯静态场景，基本等于永久免费。": "The free tier is generous: unlimited bandwidth and requests for static hosting, global CDN, automatic HTTPS. For a personal blog it is basically free forever.",
  "我的策略：所有交互都放在前端 —— 主题切换用 localStorage，访问计数也用 localStorage，完全不碰 Workers，省下每日 10 万次的后端额度留给真正需要的功能。": "My strategy: keep everything on the frontend — theme toggle and visit counter both use localStorage, never touching Workers, saving the 100k daily backend quota for features that truly need it.",
  "部署只要三步": "Deploy in 3 steps",
  "踩坑记录": "Pitfalls",
  "单文件不能超过 25MB，图片记得压缩。我用 webp 格式存头像，jpeg 存封面，整站加起来不到 200KB，加载飞快。": "A single file must stay under 25 MB, so compress images. My avatar is webp and covers are jpeg — the whole site is under 200 KB and loads instantly.",
  "另外注意相对路径要写对，Pages 没有目录索引回退时记得每个目录放 <code>index.html</code>。": "Also keep relative paths correct; if directory index fallback is off, put an <code>index.html</code> in every directory.",

  // 文章：Glassmorphism
  "雾玻璃 Glassmorphism 实践手记": "Glassmorphism in Practice",
  "2026-10-05 · 牛排": "2026-10-05 · niupai",
  "你现在看到的小屋，就是雾玻璃风格。磨砂、半透明、背后有彩色光斑在飘 —— 好看又好写。": "The cabin you're looking at is pure glassmorphism: frosted, translucent, with colorful blobs floating behind — beautiful and easy to write.",
  "核心就三行 CSS": "It's basically 3 lines of CSS",
  "<code>blur()</code> 决定磨砂程度，<code>saturate()</code> 让透出来的颜色更鲜艳。加上半透明白边，玻璃质感一下就出来了。": "<code>blur()</code> sets the frost level, <code>saturate()</code> makes colors pop. Add a translucent white border and the glass feel appears instantly.",
  "小技巧：背景一定要是渐变或彩色光斑，纯白背景是看不出雾玻璃效果的。": "Tip: the background must be a gradient or colorful blobs — glassmorphism is invisible on plain white.",
  "深色模式怎么兼容": "Dark mode made easy",
  "用 CSS 变量切换 <code>--glass-bg</code> 和 <code>--glass-border</code>，深色下把背景换成半透明深色、边框透明度调低即可，一行 JS 切换 <code>data-theme</code> 属性就够了。": "Switch <code>--glass-bg</code> and <code>--glass-border</code> via CSS variables: in dark mode use a translucent dark background and lower the border opacity. One line of JS toggling <code>data-theme</code> is enough.",
  "配合动画库": "Pairing with animation libraries",
  "入场用 Animate.css 的 <code>fadeInUp</code>，悬停用 Hover.css 的 <code>hvr-bounce-to-right</code>、<code>hvr-wobble-horizontal</code>，组件风格参考 UIverse 的按钮和进度条 —— 全部是现成的 CSS，零 JS 成本。": "Entrance uses Animate.css <code>fadeInUp</code>, hover uses Hover.css <code>hvr-bounce-to-right</code> / <code>hvr-wobble-horizontal</code>, components follow UIverse buttons and progress bars — all ready-made CSS with zero JS cost.",

  // 文章：猫系周末
  "猫系程序员的安逸周末": "A Lazy Weekend of a Cat-like Coder",
  "2026-09-28 · 牛排": "2026-09-28 · niupai",
  "周六早上十一点，自然醒。没有闹钟，没有站会，阳光正好落在键盘上。": "11 AM on Saturday — woke up naturally. No alarm, no stand-up meeting, sunlight falling right on the keyboard.",
  "给 ESP32 接了块小屏幕，跑通了 LVGL 的中文显示；下午写了个 PyQt5 的小桌宠，看着它在屏幕角落发呆，比刷短视频治愈多了。": "Hooked a small screen to my ESP32 and got Chinese LVGL rendering working; in the afternoon I wrote a tiny PyQt5 desktop pet. Watching it space out in the corner of the screen heals me better than short videos.",
  "程序员的周末不只有 Debug。睡饱、玩硬件、撸猫、发一会儿呆 —— 周一回来时，bug 反而更好修了。": "A coder's weekend is more than debugging. Sleep well, play with hardware, pet the cat, stare into space — bugs get easier to fix on Monday.",
  "晚上把 Godot 里那个 2D MOBA 的小原型推进了一点：英雄移动的手感调顺了。做游戏和养猫一样，急不得。": "At night I pushed my 2D MOBA prototype in Godot a bit further: hero movement feels smooth now. Game dev is like raising a cat — no rushing.",
  "这就是牛排安逸的小屋存在的意义：把日子过慢一点，把喜欢的事做多一件。": "That's why this cozy cabin exists: slow down life, and do one more thing you love.",

  // 文章：MC 服务器
  "「牛排纯生存服务器」开服啦，欢迎来玩！": "\"niupai Pure Survival\" server is open — come play!",
  "2026-10-17 · 牛排": "2026-10-17 · niupai",
  "我自己的《我的世界》生存服务器正式开放！纯生存、无氪金、氛围友好，主打一个安逸。不管你是建筑党、红石大佬还是刚入坑的小白，都欢迎来小屋做客。": "My own Minecraft survival server is officially open! Pure survival, no pay-to-win, friendly community — all about coziness. Builders, redstone wizards or total beginners, everyone is welcome.",
  "服务器信息": "Server Info",
  "🟩 服务器名称：牛排纯生存服务器<br>      🟩 游戏版本：1.21.7 ~ 26.2 任意版本<br>      🟩 多端支持互通：Java 版 / 基岩版（手机、电脑、主机）都能进<br>      🟩 服务器地址：<code>play.simpfun.cn:33255</code>": "🟩 Name: niupai Pure Survival<br>      🟩 Versions: any between 1.21.7 ~ 26.2<br>      🟩 Cross-play: Java / Bedrock (phone, PC, console)<br>      🟩 Address: <code>play.simpfun.cn:33255</code>",
  "怎么玩？": "How to join?",
  "打开 Minecraft，进入「多人游戏」→「添加服务器」，把上面的 IP 地址粘贴进去即可直连。版本选择很宽松，1.21.7 到 26.2 之间的任意版本都能连接，不用为了进服专门换版本。": "Open Minecraft, go to Multiplayer → Add Server, paste the IP above and connect directly. Version choice is flexible — anything from 1.21.7 to 26.2 works, no need to switch versions just to visit.",
  "服务器规矩": "Server rules",
  "纯生存体验：不卖装备、不卖属性，人人平等。保护别人的建筑，不偷不炸，友好交流。想圈地、想合伙修城堡、想挑战末影龙，群里喊一声就有人陪你肝。": "Pure survival: no gear or stats for sale, everyone equal. Respect others' builds — no stealing, no griefing, keep it friendly. Want to claim land, build a castle together or challenge the Ender Dragon? Just shout in the group chat.",
  "加入游戏群聊": "Join the game group chat",
  "服务器进度、活动通知、组队挖矿都在 QQ 群里聊。扫描下方二维码加入「牛排」的《我的世界》游戏群，一起来安逸地生存吧！": "Server updates, events and mining parties are all announced in the QQ group. Scan the QR code below to join niupai's Minecraft group and live the cozy survival life with us!",
  "📱 扫一扫，加入 MC 生存群聊": "📱 Scan to join the Minecraft survival group"
};

function applyLang(lang) {
  LANG = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
  // 规范化空白后的词典（源 HTML 缩进/换行不影响匹配）
  var norm = {};
  Object.keys(I18N).forEach(function (k) { norm[k.replace(/\s+/g, " ")] = I18N[k]; });
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    if (!el.hasAttribute("data-zh")) el.setAttribute("data-zh", el.innerHTML);
    if (lang === "en") {
      var key = el.getAttribute("data-zh").trim().replace(/\s+/g, " ");
      if (key in norm) el.innerHTML = norm[key];
    } else {
      el.innerHTML = el.getAttribute("data-zh");
    }
  });
  document.querySelectorAll(".lang-btn").forEach(function (b) {
    b.textContent = lang === "en" ? "中" : "EN";
  });
}

function toggleLang() {
  var root = document.documentElement;
  // 淡出 -> 替换文字 -> 淡入
  root.classList.add("lang-fade");
  setTimeout(function () {
    applyLang(LANG === "en" ? "zh" : "en");
    root.classList.remove("lang-fade");
    startTyper(); // 打字机文案跟随语言
  }, 480);
}

// ---------- Hero 打字机 ----------
var typerTimer = null;
function startTyper() {
  var typer = document.getElementById("typer");
  if (!typer) return;
  if (typerTimer) clearTimeout(typerTimer);
  var texts = LANG === "en"
    ? ["A cat who loves coding and slacking off 🐱", "Recording tech, life and little joys ✨", "Welcome to niupai's Cozy Cabin 🏠"]
    : ["一只喜欢 Coding 与摸鱼的猫 🐱", "记录技术、生活与小确幸 ✨", "欢迎来到牛排安逸的小屋 🏠"];
  var ti = 0, ci = 0, deleting = false;
  (function tick() {
    var t = texts[ti];
    if (!deleting) {
      ci++;
      typer.textContent = t.slice(0, ci);
      if (ci === t.length) { deleting = true; typerTimer = setTimeout(tick, 1800); return; }
      typerTimer = setTimeout(tick, 90);
    } else {
      ci--;
      typer.textContent = t.slice(0, ci);
      if (ci === 0) { deleting = false; ti = (ti + 1) % texts.length; typerTimer = setTimeout(tick, 400); return; }
      typerTimer = setTimeout(tick, 40);
    }
  })();
}

// ---------- 页面初始化 ----------
document.addEventListener("DOMContentLoaded", function () {
  // 主题按钮
  document.querySelectorAll(".theme-btn").forEach(function (b) {
    b.textContent =
      document.documentElement.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";
    b.addEventListener("click", toggleTheme);
  });

  // 语言按钮
  document.querySelectorAll(".lang-btn").forEach(function (b) {
    b.addEventListener("click", toggleLang);
  });
  applyLang(LANG);

  // IntersectionObserver 驱动 .reveal 元素入场
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          e.target.querySelectorAll(".progress-bar i").forEach(function (bar) {
            bar.style.width = bar.dataset.width || "0%";
          });
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  // Hero 打字机
  startTyper();


  // 箴言打字机（古典箴言保持中文展示，随机轮播）
  var QUOTES = [
    ["英雄谁无落难日", "总有一朝龙抬头"],
    ["今人不见古时月", "今月曾经照古人"],
    ["取食仅充腹中需", "莫使珍馐委沟渠"],
    ["虎落平阳终振爪", "龙潜渊底必凌云"],
    ["莫道久困尘埃里", "长风一至上青云"],
    ["时来天地皆同力", "运去英雄不自由"],
    ["潜龙勿用待风起", "莫叹今朝路坎坷"],
    ["暂时俯首非庸志", "静待春雷再举头"],
    ["穷且益坚存傲骨", "否极泰来自有期"],
    ["古人今月皆成往", "唯有清辉万古留"],
    ["流水千年仍赴海", "浮生百岁若尘埃"],
    ["盛衰自古寻常事", "天地无言阅往来"],
    ["饱食何须罗百味", "安身不必筑高台"],
    ["饭够充饥休厌淡", "衣能蔽体莫贪华"],
    ["万物皆有辛劳铸", "莫将轻易作等闲"],
    ["但求身暖腹能饱", "不羡豪门酒肉稠"],
    ["莫因一时失意处", "便忘他日凌云心"],
    ["沧海尚有潮平落", "人生岂无起伏时"],
    ["世事循环皆有数", "休将困顿作终局"],
    ["星河万古恒如是", "来去浮生一过客"],
    ["千秋风物依然在", "不见当年行路人"],
    ["身安不在金玉满", "腹饱何须佳肴繁"],
    ["物力生成皆不易", "寸物亦当惜本源"],
    ["寒梅静待春风至", "志士藏锋待有时"],
    ["莫道征途多坎坷", "云开终有见光时"],
    ["一轮明月照今古", "百世悲欢付逝川"],
    ["粗茶淡饭安心地", "不恋奢豪虚浮筵"],
    ["困守浅滩休自馁", "风云再起踏长津"],
    ["岁月千秋观过客", "山河万古阅浮沉"],
    ["知足何求金满屋", "安身唯愿食无虚"],
    ["久伏鳞甲终腾起", "暂敛锋芒莫自轻"],
    ["世事浮沉皆定数", "人生起落本寻常"],
    ["皓月长存观世代", "江河不息送流年"],
    ["一饭当思耕耘苦", "寸丝勿忘织造辛"],
    ["宁守清贫存傲骨", "不随俗浪逐浮华"]
  ];

  var quoteEl = document.getElementById("quote");
  if (quoteEl) {
    var currentQuote = "";
    var lastIdx = -1;
    function pickIdx() {
      var i;
      do { i = Math.floor(Math.random() * QUOTES.length); } while (i === lastIdx);
      lastIdx = i;
      return i;
    }
    function nextQuote() {
      var pair = QUOTES[pickIdx()];
      var full = pair[0] + "，" + pair[1];
      currentQuote = full;
      var ci = 0;
      quoteEl.style.opacity = "1";
      quoteEl.innerHTML = "";
      var cursor = document.createElement("span");
      cursor.className = "q-cursor";
      quoteEl.appendChild(cursor);
      (function step() {
        cursor.insertAdjacentText("beforebegin", full.charAt(ci++));
        if (ci < full.length) setTimeout(step, 140);
        else setTimeout(function () {
          cursor.remove();
          setTimeout(function () {
            quoteEl.style.opacity = "0";
            setTimeout(nextQuote, 700);
          }, 6000);
        }, 150);
      })();
    }
    nextQuote();

    // 点击灰色小字复制当前箴言
    var qCopy = document.getElementById("quote-copy");
    if (qCopy) {
      qCopy.addEventListener("click", function () {
        if (!currentQuote || qCopy.getAttribute("data-copying")) return;
        var prev = qCopy.textContent;
        qCopy.setAttribute("data-copying", "1");
        function done() {
          qCopy.textContent = LANG === "en" ? "✓ Quote copied" : "✓ 箴言已复制";
          setTimeout(function () {
            qCopy.textContent = prev;
            qCopy.removeAttribute("data-copying");
          }, 1600);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(currentQuote).then(done);
        } else {
          var ta = document.createElement("textarea");
          ta.value = currentQuote;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
          done();
        }
      });
    }
  }

  // QQ 号一键复制
  var qqEl = document.getElementById("qq");
  var copyBtn = document.getElementById("copy-qq");
  var tip = document.getElementById("copy-tip");
  function copyQQ() {
    var num = qqEl ? qqEl.textContent.trim() : "";
    function done() {
      if (!tip) return;
      tip.style.opacity = "1";
      setTimeout(function () { tip.style.opacity = "0"; }, 1600);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(num).then(done);
    } else {
      var ta = document.createElement("textarea");
      ta.value = num;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      done();
    }
  }
  if (copyBtn) copyBtn.addEventListener("click", copyQQ);
  if (qqEl) qqEl.addEventListener("click", copyQQ);
});
