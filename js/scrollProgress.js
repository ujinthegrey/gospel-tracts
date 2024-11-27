document.addEventListener("scroll", () => {
    document.getElementById('meter').setAttribute('value', (document.documentElement.scrollTop / document.documentElement.scrollHeight) * 107)
})

