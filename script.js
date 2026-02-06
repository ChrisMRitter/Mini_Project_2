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

