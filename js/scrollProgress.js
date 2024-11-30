document.addEventListener("scroll", () => {
    document.querySelector('.scroll-progress').style.setProperty("width", ((document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100).toString() + "%")
})