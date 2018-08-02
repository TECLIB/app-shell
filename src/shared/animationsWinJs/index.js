/** @module animations WinJS */

/** Import dependencies */
import WinJS from 'winjs'

/**
 * Enable / Disable WinJS animations
 * @param {boolean} isAnimate
 */
export default function (isAnimate) {
  if (isAnimate) {
    WinJS.UI.enableAnimations()
  } else {
    WinJS.UI.disableAnimations()
  }
}

/** Get WinJS animations configuration from local store */
const animate = () => (
  localStorage.getItem('display')
    ? JSON.parse(localStorage.getItem('display')).animations
    : {}
)

/**
 * Execute animation expanded or contract splitview
 * @param {object} element
 * @param {boolean} expanded
 */
const splitview = (element, expanded) => {
  const animation = element.animate({
    width: expanded ? ['0px', '200px'] : ['200px', '0px'],
  }, 150)
  if (!animate()) animation.play = () => {}
  return animation
}

/** Export SplitView animation */
export {
  splitview,
}
