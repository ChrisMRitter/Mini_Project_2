// https://github.com/TahaSh/card-to-modal-transition/blob/main/main.js

/***********************
 *      Variables       *
 ***********************/

let expandedCard
let initialProperties = []
let finalProperties = []
let cardClip

let cart = [];

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

    // Add to cart button click
    if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Add to Cart') {
        e.stopPropagation()
        const card = e.target.closest('.js-card')
        addToCart(card)
        return
    }

    // Cart display click
    if (e.target.closest('#cart-display')) {
        e.preventDefault()
        showCart()
        return
    }

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

/**********************
 *      Cart      *
 **********************/

function addToCart(card) {
    const title = card.querySelector('.card__title').textContent
    const priceText = card.querySelector('.card__images h4').textContent
    const price = parseFloat(priceText.replace('Price: $', ''))

    // Checks if item is already in cart
    if (cart.some(item => item.title === title)) {
        alert('Already in cart')
        return
    }

    // Add item to cart
    cart.push({ title, price })
    updateCartDisplay()
}

function updateCartDisplay() {
    // Update the cart link in the header to show the number of items in the cart
    const cartLink = document.querySelector('#cart-display')
    if (cart.length === 0) {
        cartLink.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Cart'
    }
    else {
        cartLink.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart (${cart.length})`
    }
}

// Displays the cart items
function showCart() {
    let cartHTML = '<div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; display: flex; justify-content: center; align-items: center;" id="cart-items">'
    cartHTML += '<div style="background: #24304a; padding: 30px; border-radius: 10px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; color: #f2f5ff;">'
    cartHTML += '<h2 style="font-family: \'Playfair Display\', serif; margin-bottom: 20px;">Shopping Cart</h2>'

    if (cart.length === 0) {
        cartHTML += '<p style="font-family: \'Manrope\', sans-serif;">Your cart is empty</p>'
    } 
    else {
        cartHTML += '<ul style="list-style: none; padding: 0; margin-bottom: 20px;">'
        let total = 0
        cart.forEach((item, index) => {
            cartHTML += `<li style="font-family: 'Manrope', sans-serif; padding: 10px 0; border-bottom: 1px solid #1a2133; display: flex; justify-content: space-between; align-items: center;">
            <span>${item.title}</span>
            <div style="display: flex; align-items: center; gap: 15px;">
                <span>$${item.price.toFixed(2)}</span>
                <button class="remove-item" data-index="${index}" style="background-color: #e43b3b; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">X</button>
            </div>
            </li>`
            total += item.price
        })
    cartHTML += '</ul>'
    cartHTML += `<div style="font-family: 'Manrope', sans-serif; font-size: 1.2rem; font-weight: bold; margin-bottom: 20px; text-align: right;">
    Total: $${total.toFixed(2)}
    </div>`
    // Checkout button
    cartHTML += '<div style="display: flex; gap: 200px; justify-content: flex-end;">'
    cartHTML += '<button id="checkout-btn" style="background-color: #1100ff; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 16px; transition: background-color 0.3s;">Checkout</button>'
    cartHTML += '</div>'
    } 

    // Close button
    cartHTML += '<button id="close-cart" style="background-color: #1100ff; color: white; border: none; padding: 10px 20px;border-radius: 8px; cursor: pointer; font-size: 16px; margin-top: 20px; width: 100%; transition: background-color 0.3s;">Close</button>'
    cartHTML += '</div></div>'

    document.body.insertAdjacentHTML('beforeend', cartHTML)

    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'))
            removeFromCart(index)
        })
        // Add hover effect for X buttons
        button.addEventListener('mouseenter', (e) => {
            e.target.style.backgroundColor = '#c51818'
        })
        button.addEventListener('mouseleave', (e) => {
            e.target.style.backgroundColor = '#ff5252'
        })
    })

    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn')
    if (checkoutBtn) {
        checkoutBtn.addEventListener('mouseenter', (e) => {
            e.target.style.backgroundColor = '#0d00c9bd'
        })
        checkoutBtn.addEventListener('mouseleave', (e) => {
            e.target.style.backgroundColor = '#1100ff'
        })
    }

    const closeBtn = document.getElementById('close-cart')
    closeBtn.addEventListener('mouseenter', (e) => {
        e.target.style.backgroundColor = '#0d00c9bd'
    })
    closeBtn.addEventListener('mouseleave', (e) => {
        e.target.style.backgroundColor = '#1100ff'
    })
    closeBtn.addEventListener('click', () => {
        document.getElementById('cart-items').remove()
    })

    document.getElementById('cart-items').addEventListener('click', (e) => {
        if (e.target.id === 'cart-items') {
            document.getElementById('cart-items').remove()
        }
    })
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1)
    updateCartDisplay()
    document.getElementById('cart-items').remove()
    showCart()
}

/***********************
 *      Start Here     *
 ***********************/

setup()