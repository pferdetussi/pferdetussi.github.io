(function () {
  "use strict";

  if (document.body && !document.body.classList.contains("javascript")) {
    document.body.classList.remove("nojs");
    document.body.classList.add("javascript");
  }

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function normalizePath(pathname) {
    if (!pathname) {
      return "/";
    }

    var path = pathname.replace(/\\/g, "/");

    if (path.length > 1 && path.charAt(path.length - 1) === "/") {
      path = path.slice(0, -1);
    }

    return path || "/";
  }

  function getCurrentPath() {
    var path = normalizePath(window.location.pathname);

    if (path === "" || path === "/index.html") {
      return "/";
    }

    return path;
  }

  function findLegacyNav() {
    return document.querySelector("nav.naviHeader");
  }

  function createNavItem(label, href, currentPath) {
    var item = document.createElement("li");
    item.className = "nav-item";

    var link = document.createElement("a");
    link.className = "nav-link";
    link.href = href;
    link.textContent = label;

    if (normalizePath(href) === currentPath) {
      link.className += " active";
      link.setAttribute("aria-current", "page");
    }

    item.appendChild(link);
    return item;
  }

  function createDropdown(currentPath) {
    var item = document.createElement("li");
    item.className = "nav-item dropdown";

    var toggle = document.createElement("a");
    toggle.className = "nav-link dropdown-toggle";
    toggle.href = "#";
    toggle.id = "siteNavServices";
    toggle.role = "button";
    toggle.setAttribute("data-bs-toggle", "dropdown");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Leistungen";

    var menu = document.createElement("ul");
    menu.className = "dropdown-menu";
    menu.setAttribute("aria-labelledby", "siteNavServices");

    var services = [
      {
        label: "Hufpflege nach NHC",
        href: "/hufpflege-nach-nhc.html",
      },
      {
        label: "Pferdewaage",
        href: "/pferdewaage.html",
      },
      {
        label: "Umstellung von Eisen auf Barhuf",
        href: "/umstellung-von-eisen-auf-barhuf.html",
      },
    ];

    var hasActiveChild = false;
    var i;

    for (i = 0; i < services.length; i += 1) {
      var serviceItem = document.createElement("li");
      var serviceLink = document.createElement("a");

      serviceLink.className = "dropdown-item";
      serviceLink.href = services[i].href;
      serviceLink.textContent = services[i].label;

      if (normalizePath(services[i].href) === currentPath) {
        serviceLink.className += " active";
        serviceLink.setAttribute("aria-current", "page");
        hasActiveChild = true;
      }

      serviceItem.appendChild(serviceLink);
      menu.appendChild(serviceItem);
    }

    if (hasActiveChild) {
      toggle.className += " active";
    }

    item.appendChild(toggle);
    item.appendChild(menu);

    return item;
  }

  function buildNavbar() {
    var currentPath = getCurrentPath();
    var nav = document.createElement("nav");

    nav.className =
      "navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm site-bootstrap-nav";
    nav.setAttribute("aria-label", "Hauptnavigation");

    nav.innerHTML =
      '<div class="container">' +
      '<a class="navbar-brand fw-semibold" href="/">' +
      "Heile Hufe" +
      "</a>" +
      '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#siteBootstrapNav" aria-controls="siteBootstrapNav" aria-expanded="false" aria-label="Navigation ein-/ausblenden">' +
      '<span class="navbar-toggler-icon"></span>' +
      "</button>" +
      '<div class="collapse navbar-collapse" id="siteBootstrapNav"></div>' +
      "</div>";

    var collapse = nav.querySelector("#siteBootstrapNav");
    var navList = document.createElement("ul");
    navList.className = "navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center";

    navList.appendChild(createNavItem("Über mich", "/about.html", currentPath));
    navList.appendChild(createDropdown(currentPath));
    navList.appendChild(
      createNavItem("Galerie", "/bildergalerie.html", currentPath),
    );
    navList.appendChild(createNavItem("Links", "/links.html", currentPath));
    navList.appendChild(createNavItem("Kontakt", "/kontakt.html", currentPath));
    navList.appendChild(
      createNavItem("Impressum & Datenschutz", "/impressum.html", currentPath),
    );

    var actionItem = document.createElement("li");
    actionItem.className = "nav-item ms-lg-3";

    var actionLink = document.createElement("a");
    actionLink.className = "btn btn-outline-light btn-sm mt-2 mt-lg-0";
    actionLink.href = "tel:01785131661";
    actionLink.textContent = "0178 / 51 31 661";

    actionItem.appendChild(actionLink);
    navList.appendChild(actionItem);
    collapse.appendChild(navList);

    return nav;
  }

  function buildFooter() {
    var footer = document.createElement("footer");
    footer.className = "site-bootstrap-footer bg-dark text-light mt-5 py-4";

    footer.innerHTML =
      '<div class="container">' +
      '<div class="row g-4 align-items-start">' +
      '<div class="col-12 col-md-6 col-lg-4">' +
      '<h2 class="h5 mb-3 text-uppercase">Barhufpflege Sarah Kohrt</h2>' +
      '<p class="mb-2">Heidewinkel 21<br>30659 Hannover</p>' +
      '<p class="mb-0"><a class="link-light text-decoration-none" href="mailto:info@heilehufe.de">info@heilehufe.de</a></p>' +
      "</div>" +
      '<div class="col-12 col-md-6 col-lg-4">' +
      '<h2 class="h5 mb-3 text-uppercase">Kontakt</h2>' +
      '<p class="mb-2"><a class="link-light text-decoration-none" href="tel:01785131661">0178 / 51 31 661</a></p>' +
      '<p class="mb-0">Zuverlässig, respektvoll und mit Zeit für dein Tier.</p>' +
      "</div>" +
      '<div class="col-12 col-lg-4">' +
      '<h2 class="h5 mb-3 text-uppercase">Seiten</h2>' +
      '<div class="d-flex flex-column gap-2">' +
      '<a class="link-light text-decoration-none" href="/about.html">Über mich</a>' +
      '<a class="link-light text-decoration-none" href="/hufpflege-nach-nhc.html">Hufpflege nach NHC</a>' +
      '<a class="link-light text-decoration-none" href="/pferdewaage.html">Pferdewaage</a>' +
      '<a class="link-light text-decoration-none" href="/kontakt.html">Kontakt</a>' +
      '<a class="link-light text-decoration-none" href="/impressum.html">Impressum & Datenschutz</a>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";

    return footer;
  }

  function insertNavbar() {
    var legacyNav = findLegacyNav();

    if (!legacyNav || document.querySelector(".site-bootstrap-nav")) {
      return;
    }

    legacyNav.parentNode.insertBefore(buildNavbar(), legacyNav);
  }

  function insertFooter() {
    var mobileLink = document.getElementById("mobile-link");

    if (!mobileLink || document.querySelector(".site-bootstrap-footer")) {
      return;
    }

    mobileLink.parentNode.insertBefore(buildFooter(), mobileLink);
  }

  function closeNavbarOnLinkClick() {
    var collapseEl = document.getElementById("siteBootstrapNav");

    if (
      !collapseEl ||
      typeof window.bootstrap === "undefined" ||
      !window.bootstrap.Collapse
    ) {
      return;
    }

    var navLinks = collapseEl.querySelectorAll(
      '.nav-link:not([data-bs-toggle="dropdown"]), .dropdown-item, .btn',
    );
    var i;

    for (i = 0; i < navLinks.length; i += 1) {
      navLinks[i].addEventListener("click", function (event) {
        var currentTarget = event.currentTarget;

        if (
          currentTarget &&
          currentTarget.getAttribute("data-bs-toggle") === "dropdown"
        ) {
          return;
        }

        if (window.innerWidth < 992 && collapseEl.classList.contains("show")) {
          window.bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
        }
      });
    }
  }

  function setBodyOffset() {
    var nav = document.querySelector(".site-bootstrap-nav");

    if (!nav) {
      return;
    }

    document.documentElement.style.setProperty(
      "--hh-navbar-height",
      nav.offsetHeight + "px",
    );
  }

  function init() {
    insertNavbar();
    insertFooter();
    closeNavbarOnLinkClick();
    setBodyOffset();

    window.addEventListener("resize", setBodyOffset);
  }

  onReady(init);
})();
