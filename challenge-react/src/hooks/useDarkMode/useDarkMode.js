// References: https://usehooks.com/useDarkMode/

import useLocalStorage from '~hooks/useLocalStorage'
import useMedia from '~hooks/useMedia'

function usePrefersDarkMode() {
    return useMedia(['(prefers-color-scheme: dark)'], [true], false)
}

function useDarkMode() {
    // Use useLocalStorage hook to persist state through a page refresh.
    // Read the recipe for this hook to learn more: usehooks.com/useLocalStorage
    const [enabledState, setEnabledState] = useLocalStorage('dark-mode-enabled')

    // See if user has set a browser or OS preference for dark mode.
    // The usePrefersDarkMode hook composes a useMedia hook (see code below).
    const prefersDarkMode = usePrefersDarkMode()

    // If enabledState is defined use it, otherwise fallback to prefersDarkMode.
    // This allows user to override OS level setting on our website.
    const enabled = typeof enabledState !== 'undefined' ? enabledState : prefersDarkMode

    // Return enabled state and setter
    return [enabled, setEnabledState]
}

export default useDarkMode
