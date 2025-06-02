// This script is used for the blog page, to add functionality such as scroll to top button and dynamic table of contents highlighting.
const scrollBtn = document.getElementById("to-top-btn") as HTMLButtonElement;
const targetHeader = document.getElementById("blog-hero") as HTMLDivElement;

function callback(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    // only show the scroll to top button when the heading is out of view
    scrollBtn.dataset.show = (!entry.isIntersecting).toString();
  });
}

scrollBtn.addEventListener("click", () => {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
});

const observer = new IntersectionObserver(callback);
observer.observe(targetHeader);

// Script for dynamic highlighting of table of contents. Modified from https://stackoverflow.com/a/75346369/15587966.
const anchors: NodeListOf<Element> = document.querySelectorAll(
  "h2:not(.table-of-contents-blogpost),h3:not(.table-of-contents-blogpost),h4:not(.table-of-contents-blogpost),h5:not(.table-of-contents-blogpost),h6:not(.table-of-contents-blogpost)",
);
const links: NodeListOf<Element> = document.querySelectorAll(
  "aside.table-of-contents-blogpost > ul > li > a",
);
window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
    if (
      typeof anchors != "undefined" &&
      anchors != null &&
      typeof links != "undefined" &&
      links != null
    ) {
      let scrollTop = window.scrollY;
      // highlight the last scrolled-to: set everything inactive first
      links.forEach((link, _) => {
        link.classList.remove("section-scroll-active");
      });

      // Check if scrolled to the very bottom of page
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        // @ts-ignore: Object is possibly 'null'.
        links[anchors.length - 1].classList.add("section-scroll-active");
      } else {
        // then iterate backwards, on the first match highlight it and break
        for (let i = anchors.length - 1; i >= 0; i--) {
          // @ts-ignore: Object is possibly 'null'.
          if (scrollTop > anchors[i].offsetTop - 100) {
            // @ts-ignore: Object is possibly 'null'.
            links[i].classList.add("section-scroll-active");
            break;
          }
        }
      }
    }
  });
});

// Anchor resolving function.
(function (document, history, location) {
  let HISTORY_SUPPORT = !!(history && history.pushState);

  let anchorScrolls = {
    ANCHOR_REGEX: /^#[^ ]+$/,
    // ANCHOR_REGEX: /^#[^\s]+$/,
    // ANCHOR_REGEX: /^#[0-9%:a-z,A-Z-]+$/,
    OFFSET_HEIGHT_PX: 95,

    /**
     * Establish events, and fix initial scroll position if a hash is provided.
     */
    init: function () {
      this.scrollToCurrent();
      window.addEventListener("hashchange", this.scrollToCurrent.bind(this));
      document.body.addEventListener("click", this.delegateAnchors.bind(this));
    },

    /**
     * Return the offset amount to deduct from the normal scroll position.
     * Modify as appropriate to allow for dynamic calculations
     */
    getFixedOffset: function () {
      return this.OFFSET_HEIGHT_PX;
    },

    /**
     * If the provided href is an anchor which resolves to an element on the
     * page, scroll to it.
     * @param  {String} href
     * @return {Boolean} - Was the href an anchor.
     */
    scrollIfAnchor: function (href: string, pushToHistory: boolean) {
      let match, rect, anchorOffset;

      if (!this.ANCHOR_REGEX.test(href)) {
        return false;
      }

      match = document.getElementById(href.slice(1));

      if (match) {
        rect = match.getBoundingClientRect();
        anchorOffset = window.pageYOffset + rect.top - this.getFixedOffset();
        window.scrollTo(window.pageXOffset, anchorOffset);

        // Add the state to history as-per normal anchor links
        if (HISTORY_SUPPORT && pushToHistory) {
          history.pushState({}, document.title, location.pathname + href);
        }
      }

      return !!match;
    },

    /**
     * Attempt to scroll to the current location's hash.
     */
    scrollToCurrent: function () {
      this.scrollIfAnchor(window.location.hash, false);
    },

    /**
     * If the click event's target was an anchor, fix the scroll position.
     */
    delegateAnchors: function (e: any) {
      const anchorsToExclude: string[] = [
        "blog-content-anchor",
        "nav-anchor",
        "tags-anchor",
      ];
      let elem = e.target;
      const footerClassName: string =
        elem.parentNode.parentNode.parentNode.parentNode.className;
      if (
        elem.nodeName === "A" &&
        elem.getAttribute("href") &&
        elem.getAttribute("href").startsWith("#") &&
        !(
          anchorsToExclude
            .map((x) => elem.className.includes(x))
            .some(Boolean) || footerClassName === "footnotes"
        )
      ) {
        this.scrollIfAnchor(elem.getAttribute("href"), true); // For normal anchors
        e.preventDefault();
      } else if (elem.nodeName === "MJX-C") {
        this.scrollIfAnchor(
          decodeURIComponent(
            elem.parentNode.parentNode.parentNode.getAttribute("href"),
          ),
          true,
        ); // Special case for MathJax anchors
        e.preventDefault();
      }
    },
  };

  window.addEventListener(
    "DOMContentLoaded",
    anchorScrolls.init.bind(anchorScrolls),
  );
})(window.document, window.history, window.location);
