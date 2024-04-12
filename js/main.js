let colorLis = document.querySelectorAll(".colors-list li");
let img = document.querySelector(".landing img");

if (localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color")
  );

  colorLis.forEach((color) => {
    if (
      color.dataset.color ===
      document.documentElement.style.getPropertyValue("--main-color")
    ) {
      color.classList.remove("main-color");
      color.classList.add("active");
    }
  });
}

if (localStorage.getItem("landingImg")) {
  img.src = localStorage.getItem("landingImg");
}

let links = document.querySelectorAll(".landing nav a");

links.forEach((a) => {
  a.addEventListener("click", () => {
    links.forEach((a) => {
      a.classList.remove("active");
    });
    a.classList.add("active");
  });
});

// random background and settings

let setBtn = document.querySelectorAll(
  ".settings-box .background-options span"
);
let landing = document.querySelector(".landing");

let imgs = ["04.jpg", "01.jpg", "02.jpg", "03.jpg", "05.jpg"];

// localStorage Restore
if (localStorage.getItem("settingRandomBackground")) {
  setBtn.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.bg === localStorage.getItem("settingRandomBackground")) {
      btn.classList.add("active");
    }
    imgsInterval(btn);
  });
} else {
  setBtn.forEach((btn) => {
    imgsInterval(btn);
  });
}

setBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    activeClassForForeach(setBtn, btn);
    localStorage.setItem("settingRandomBackground", btn.dataset.bg);
    imgsInterval(btn);
  });
});

function imgsInterval(btn) {
  let count = setInterval(() => {
    if (btn.classList.contains("active") && btn.classList.contains("yes")) {
      img.src = `./imgs/${imgs[parseInt(Math.random() * imgs.length)]}`;
      localStorage.setItem("landingImg", img.src);
    } else {
      clearInterval(count);
    }
  }, 6000);
}

// settings box toggle
let settings = document.querySelector(".settings-box");
let settingsToggle = document.querySelector(".settings-box .toggle");

settingsToggle.addEventListener("click", () => {
  settings.classList.toggle("open");
});

// colors Active

colorLis.forEach((color) => {
  color.addEventListener("click", () => {
    activeClassForForeach(colorLis, color);

    document.documentElement.style.setProperty(
      "--main-color",
      color.dataset.color
    );

    // colors Local Storage
    localStorage.setItem("color", color.dataset.color);
  });
});

// our skills

let ourSkills = document.querySelector(".our-skills");
let progress = document.querySelectorAll(".our-skills .range span");

window.onscroll = () => {
  if (window.scrollY >= ourSkills.offsetTop - 400) {
    progress.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};

// gallery popup

let cards = document.querySelectorAll(".our-gallery .card");

let popup = document.createElement("div");
popup.className = "gallery-popup";

let popupH2 = document.createElement("h2");

let popupImg = document.createElement("img");

let closeBtn = document.createElement("button");
closeBtn.innerHTML = "X";

let popupOverlay = document.createElement("div");
popupOverlay.className = "gallery-overlay";

cards.forEach((card) => {
  card.addEventListener("click", () => {
    popupH2.innerHTML = card.dataset.number;
    popup.appendChild(popupH2);

    popupImg.src = card.querySelector("img").src;
    popup.appendChild(popupImg);

    popup.appendChild(closeBtn);

    document.body.appendChild(popup);
    document.body.appendChild(popupOverlay);
  });
});

closeBtn.addEventListener("click", () => {
  popup.remove();
  popupOverlay.remove();
});

popupOverlay.addEventListener("click", () => {
  popup.remove();
  popupOverlay.remove();
});

// bullets

function jumpToSectionAfterClick(Selector) {
  Selector.forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelector(link.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

jumpToSectionAfterClick(document.querySelectorAll(".nav-bullets .bullet"));
jumpToSectionAfterClick(document.querySelectorAll(".landing nav a"));

// bullets show & localStorage

let bulletsSpans = document.querySelectorAll(
  ".settings-box .bullets-options span"
);
let navBullets = document.querySelector(".nav-bullets");

if (localStorage.getItem("bulletsShow")) {
  bulletsSpans.forEach((span) => {
    span.classList.remove("active");
    if (span.dataset.show == localStorage.getItem("bulletsShow")) {
      span.classList.add("active");
    }
    localStorage.getItem("bulletsShow") == "yes"
      ? navBullets.classList.remove("hidden")
      : navBullets.classList.add("hidden");
  });
}

bulletsSpans.forEach((span) => {
  span.addEventListener("click", () => {
    activeClassForForeach(bulletsSpans, span);
    span.classList.contains("yes")
      ? navBullets.classList.remove("hidden")
      : navBullets.classList.add("hidden");
    localStorage.setItem("bulletsShow", span.dataset.show);
  });
});

// reset btn option
let resetBtn = document.querySelector(".settings-box button.reset");

resetBtn.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

// handle active class
function activeClassForForeach(parent, child) {
  parent.forEach((child) => child.classList.remove("active"));
  child.classList.add("active");
}

// nav bars
let bar = document.querySelector("header .icon");
let navbar = document.querySelector("header nav");

bar.addEventListener("click", (e) => {
  e.stopPropagation();
  navbar.classList.toggle("open");
  bar.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (
    e.target != navbar &&
    e.target != bar &&
    navbar.classList.contains("open")
  ) {
    navbar.classList.remove("open");
    bar.classList.remove("open");
  }
});
