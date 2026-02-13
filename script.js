// https://github.com/TahaSh/card-to-modal-transition/blob/main/main.js

/***********************
 *      Variables       *
 ***********************/

let expandedCard
let initialProperties = []
let finalProperties = []
let cardClip

/***********************
 *    Helper Functions   *
 ***********************/

function getAnimatableElements() {
  if (!expandedCard) return
  return expandedCard.querySelectorAll('.js-animatable')
}

function getCardContent() {
  if (!expandedCard) return
  return expandedCard.querySelector('.card__content')
}

function resetAnimatableInlineStyles() {
  const elements = getAnimatableElements()
  if (!elements) return
  for (const el of elements) {
    el.style.transform = ''
    el.style.opacity = ''
    el.style.willChange = ''
  }
}

function resetCardContentInlineStyles() {
  const content = getCardContent()
  if (!content) return
  content.style.clipPath = ''
  content.style.willChange = ''
}

/***********************
 *        Setup        *
 ***********************/

function setup() {
  document.addEventListener('click', (e) => {
    if (expandedCard) return

    const card = e.target.closest('.js-card')
    if (!card) return
    expandedCard = card

    const closeButton = expandedCard.querySelector('.js-close-button')
    if (closeButton) {
      closeButton.addEventListener(
        'click',
        (ev) => {
          ev.preventDefault()
          ev.stopPropagation()
          collapse()
        },
        { once: true }
      )
    }

    expand()
  })
}

/********************
 *      Expand      *
 ********************/
function expand() {
  const cardContent = getCardContent()
  if (!cardContent) {
    cleanup()
    return
  }

  cardContent.addEventListener('transitionend', onExpandTransitionEnd)

  disablePageScroll()
  collectInitialProperties()

  expandedCard.classList.add('card--expanded')

  collectFinalProperties()

  setInvertedTransformAndOpacity()
  clipCardContent()

  requestAnimationFrame(() => {
    expandedCard.classList.add('card--animatable')
    startExpanding()
  })
}

function collectInitialProperties() {
  const elements = getAnimatableElements()
  if (!elements) return

  initialProperties = []
  for (const element of elements) {
    initialProperties.push({
      rect: element.getBoundingClientRect(),
      opacity: parseFloat(window.getComputedStyle(element).opacity)
    })
  }

  const cardRect = expandedCard.getBoundingClientRect()
  cardClip = {
    top: cardRect.top,
    right: window.innerWidth - cardRect.right,
    bottom: window.innerHeight - cardRect.bottom,
    left: cardRect.left
  }
}

function collectFinalProperties() {
  const elements = getAnimatableElements()
  if (!elements) return

  finalProperties = []
  for (const element of elements) {
    finalProperties.push({
      rect: element.getBoundingClientRect(),
      opacity: parseFloat(window.getComputedStyle(element).opacity)
    })
  }
}

function setInvertedTransformAndOpacity() {
  const elements = getAnimatableElements()
  if (!elements) return

  for (const [i, element] of elements.entries()) {
    const init = initialProperties[i]
    const fin = finalProperties[i]
    if (!init || !fin) continue

    const scaleX = init.rect.width / (fin.rect.width || 1)
    const translateX = init.rect.left - fin.rect.left
    const translateY = init.rect.top - fin.rect.top

    element.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX})`
    element.style.opacity = `${init.opacity}`
    element.style.willChange = 'transform, opacity'
  }
}

function clipCardContent() {
  const cardContent = getCardContent()
  if (!cardContent || !cardClip) return

  cardContent.style.willChange = 'clip-path'
  cardContent.style.clipPath = `
    inset(${cardClip.top}px ${cardClip.right}px ${cardClip.bottom}px ${cardClip.left}px round 5px)
  `
}

function startExpanding() {
  const elements = getAnimatableElements()
  if (!elements) return

  for (const [i, element] of elements.entries()) {
    const fin = finalProperties[i]
    if (!fin) continue
    element.style.transform = 'translate(0, 0) scale(1)'
    element.style.opacity = `${fin.opacity}`
  }

  const cardContent = getCardContent()
  if (cardContent) cardContent.style.clipPath = 'inset(0)'
}

function onExpandTransitionEnd(e) {
  const cardContent = getCardContent()
  if (!cardContent || e.target !== cardContent) return

  expandedCard.classList.remove('card--animatable')
  cardContent.removeEventListener('transitionend', onExpandTransitionEnd)
  removeStyles()
}

function removeStyles() {
  resetAnimatableInlineStyles()
  resetCardContentInlineStyles()
}

/**********************
 *      Collapse      *
 **********************/

function collapse() {
  const cardContent = getCardContent()
  if (!cardContent) {
    cleanup()
    enablePageScroll()
    return
  }

  cardContent.addEventListener('transitionend', onCollapseTransitionEnd)

  setCollapsingInitialStyles()

  requestAnimationFrame(() => {
    expandedCard.classList.add('card--animatable')
    startCollapsing()
  })
}

function setCollapsingInitialStyles() {
  const elements = getAnimatableElements()
  if (elements) {
    for (const element of elements) {
      element.style.transform = `translate(0, 0) scale(1)`
      element.style.willChange = 'transform, opacity'
    }
  }

  const cardContent = getCardContent()
  if (cardContent) {
    cardContent.style.willChange = 'clip-path'
    cardContent.style.clipPath = 'inset(0)'
  }
}

function startCollapsing() {
  setInvertedTransformAndOpacity()
  clipCardContent()
}

function onCollapseTransitionEnd(e) {
  const cardContent = getCardContent()
  if (!cardContent || e.target !== cardContent) return

  expandedCard.classList.remove('card--animatable')
  expandedCard.classList.remove('card--expanded')

  cardContent.removeEventListener('transitionend', onCollapseTransitionEnd)

  removeStyles()
  enablePageScroll()

  cleanup()
}

function disablePageScroll() {
  document.body.style.overflow = 'hidden'
}

function enablePageScroll() {
  document.body.style.overflow = ''
}

function cleanup() {
  expandedCard = null
  cardClip = null
  initialProperties = []
  finalProperties = []
}

/***********************
 *      Start Here     *
 ***********************/

setup()

const state = {
  cart: [],
  wishlist: []
};

const $ = (sel) => document.querySelector(sel);

const cartToggle = $("#cartToggle");
const cartDropdown = $("#cartDropdown");
const cartClose = $("#cartClose");
const cartCount = $("#cartCount");
const cartList = $("#cartList");
const cartTotal = $("#cartTotal");

const wishlistToggle = $("#wishlistToggle");
const wishlistDropdown = $("#wishlistDropdown");
const wishlistClose = $("#wishlistClose");
const wishlistCount = $("#wishlistCount");
const wishlistList = $("#wishlistList");

function money(n) {
  return `$${n.toFixed(2)}`;
}

function openDropdown(dd, toggleBtn) {
  dd.classList.add("is-open");
  dd.setAttribute("aria-hidden", "false");
  toggleBtn.setAttribute("aria-expanded", "true");
}

function closeDropdown(dd, toggleBtn) {
  dd.classList.remove("is-open");
  dd.setAttribute("aria-hidden", "true");
  toggleBtn.setAttribute("aria-expanded", "false");
}

function closeAllDropdowns() {
  closeDropdown(cartDropdown, cartToggle);
  closeDropdown(wishlistDropdown, wishlistToggle);
}

cartToggle?.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = cartDropdown.classList.contains("is-open");
  closeAllDropdowns();
  if (!isOpen) openDropdown(cartDropdown, cartToggle);
});

wishlistToggle?.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = wishlistDropdown.classList.contains("is-open");
  closeAllDropdowns();
  if (!isOpen) openDropdown(wishlistDropdown, wishlistToggle);
});

cartClose?.addEventListener("click", (e) => {
  e.stopPropagation();
  closeDropdown(cartDropdown, cartToggle);
});

wishlistClose?.addEventListener("click", (e) => {
  e.stopPropagation();
  closeDropdown(wishlistDropdown, wishlistToggle);
});

document.addEventListener("click", () => {
  closeAllDropdowns();
});

cartDropdown?.addEventListener("click", (e) => e.stopPropagation());
wishlistDropdown?.addEventListener("click", (e) => e.stopPropagation());

function renderCart() {
  cartCount.textContent = String(state.cart.reduce((sum, it) => sum + it.qty, 0));
  cartList.innerHTML = "";

  let total = 0;

  state.cart.forEach((item, idx) => {
    total += item.price * item.qty;

    const li = document.createElement("li");
    li.className = "dd-item";
    li.innerHTML = `
      <div>
        <div class="dd-item__title">${item.title}</div>
        <div class="dd-item__meta">${money(item.price)} × ${item.qty}</div>
      </div>
      <div class="dd-item__actions">
        <button class="dd-remove" type="button" data-cart-dec="${idx}">−</button>
        <button class="dd-remove" type="button" data-cart-inc="${idx}">+</button>
        <button class="dd-remove" type="button" data-cart-remove="${idx}">✕</button>
      </div>
    `;
    cartList.appendChild(li);
  });

  cartTotal.textContent = money(total);
}

function decCart(index) {
  const item = state.cart[index];
  if (!item) return;
  item.qty -= 1;
  if (item.qty <= 0) state.cart.splice(index, 1);
  renderCart();
}

function incCart(index) {
  const item = state.cart[index];
  if (!item) return;
  item.qty += 1;
  renderCart();
}

cartList?.addEventListener("click", (e) => {
  const dec = e.target.closest("[data-cart-dec]");
  if (dec) {
    decCart(parseInt(dec.dataset.cartDec, 10));
    return;
  }

  const inc = e.target.closest("[data-cart-inc]");
  if (inc) {
    incCart(parseInt(inc.dataset.cartInc, 10));
    return;
  }

  const rm = e.target.closest("[data-cart-remove]");
  if (rm) {
    removeFromCart(parseInt(rm.dataset.cartRemove, 10));
  }
});

function addToCart(title, price) {
  const existing = state.cart.find((x) => x.title === title);
  if (existing) existing.qty += 1;
  else state.cart.push({ title, price, qty: 1 });

  renderCart();
}

function removeFromCart(index) {
  state.cart.splice(index, 1);
  renderCart();
}

cartList?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-cart-remove]");
  if (!btn) return;
  removeFromCart(parseInt(btn.dataset.cartRemove, 10));
});

function renderWishlist() {
  wishlistCount.textContent = String(state.wishlist.length);
  wishlistList.innerHTML = "";

  state.wishlist.forEach((item, idx) => {
    const li = document.createElement("li");
    li.className = "dd-item";
    li.setAttribute("draggable", "true");
    li.dataset.wishIndex = String(idx);

    li.innerHTML = `
      <div>
        <div class="dd-item__title">${idx + 1}. ${item.title}</div>
        <div class="dd-item__meta">${money(item.price)}</div>
      </div>
      <div class="dd-item__actions">
        <button class="dd-remove" type="button" data-wish-remove="${idx}">Remove</button>
      </div>
    `;

    wishlistList.appendChild(li);
  });
}

function addToWishlist(title, price) {
  if (state.wishlist.some((x) => x.title === title)) return;
  state.wishlist.push({ title, price });
  renderWishlist();
}

function removeFromWishlist(index) {
  state.wishlist.splice(index, 1);
  renderWishlist();
}

wishlistList?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-wish-remove]");
  if (!btn) return;
  removeFromWishlist(parseInt(btn.dataset.wishRemove, 10));
});

/* Drag & drop sorting (wishlist) */
let dragFrom = null;

wishlistList?.addEventListener("dragstart", (e) => {
  const li = e.target.closest(".dd-item");
  if (!li) return;
  dragFrom = parseInt(li.dataset.wishIndex, 10);
  li.classList.add("dragging");
});

wishlistList?.addEventListener("dragend", (e) => {
  const li = e.target.closest(".dd-item");
  if (li) li.classList.remove("dragging");
  dragFrom = null;
});

wishlistList?.addEventListener("dragover", (e) => {
  e.preventDefault();
  const over = e.target.closest(".dd-item");
  if (!over || dragFrom === null) return;

  const dragTo = parseInt(over.dataset.wishIndex, 10);
  if (dragTo === dragFrom) return;

  const moved = state.wishlist.splice(dragFrom, 1)[0];
  state.wishlist.splice(dragTo, 0, moved);
  dragFrom = dragTo;

  renderWishlist();
});

document.addEventListener("click", (e) => {
  const cartBtn = e.target.closest(".add-to-cart");
  if (cartBtn) {
    e.preventDefault();
    e.stopPropagation();
    const title = cartBtn.dataset.title;
    const price = parseFloat(cartBtn.dataset.price);
    if (title && !Number.isNaN(price)) addToCart(title, price);
    return;
  }

  const wishBtn = e.target.closest(".add-to-wishlist");
  if (wishBtn) {
    e.preventDefault();
    e.stopPropagation();
    const title = wishBtn.dataset.title;
    const price = parseFloat(wishBtn.dataset.price);
    if (title && !Number.isNaN(price)) addToWishlist(title, price);
    return;
  }
});

document.addEventListener("click", (e) => {
  const prev = e.target.closest("[data-prev]");
  const next = e.target.closest("[data-next]");
  if (!prev && !next) return;

  e.preventDefault();
  e.stopPropagation();

  const slider = e.target.closest("[data-slider]");
  if (!slider) return;

  const imgs = Array.from(slider.querySelectorAll(".slider-img"));
  if (imgs.length === 0) return;

  let activeIndex = imgs.findIndex((img) => img.classList.contains("is-active"));
  if (activeIndex === -1) activeIndex = 0;

  imgs[activeIndex].classList.remove("is-active");

  if (prev) activeIndex = (activeIndex - 1 + imgs.length) % imgs.length;
  if (next) activeIndex = (activeIndex + 1) % imgs.length;

  imgs[activeIndex].classList.add("is-active");
});

renderCart();
renderWishlist();
