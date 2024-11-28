document.addEventListener("scroll", () => {
    document.querySelector('.scroll-progress').style.setProperty("width", ((document.documentElement.scrollTop / document.documentElement.scrollHeight) * 106).toString() + "%")
})