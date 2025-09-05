// DOM Elements
const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
const nav = document.getElementById("nav")
const themeToggle = document.getElementById("theme-toggle")
const header = document.getElementById("header")
const clientsTrack = document.getElementById("clients-track")

// Mobile Menu Toggle
function toggleMobileMenu() {
  const isExpanded = nav.classList.contains("active")
  nav.classList.toggle("active")

  // Update ARIA attributes
  mobileMenuToggle.setAttribute("aria-expanded", !isExpanded)
  mobileMenuToggle.setAttribute("aria-label", !isExpanded ? "Fechar menu de navegação" : "Abrir menu de navegação")

  // Animate hamburger menu
  const hamburgers = mobileMenuToggle.querySelectorAll(".hamburger")
  if (nav.classList.contains("active")) {
    hamburgers[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    hamburgers[1].style.opacity = "0"
    hamburgers[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
  } else {
    hamburgers[0].style.transform = "none"
    hamburgers[1].style.opacity = "1"
    hamburgers[2].style.transform = "none"
  }
}

// Close mobile menu when clicking on nav links
function closeMobileMenu() {
  nav.classList.remove("active")
  mobileMenuToggle.setAttribute("aria-expanded", "false")
  mobileMenuToggle.setAttribute("aria-label", "Abrir menu de navegação")

  const hamburgers = mobileMenuToggle.querySelectorAll(".hamburger")
  hamburgers[0].style.transform = "none"
  hamburgers[1].style.opacity = "1"
  hamburgers[2].style.transform = "none"
}

// Theme Toggle
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)

  // Update theme toggle icon
  const themeIcon = themeToggle.querySelector(".theme-icon")
  themeIcon.textContent = newTheme === "dark" ? "☀️" : "🌙"
}

// Initialize theme from localStorage
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"
  document.documentElement.setAttribute("data-theme", savedTheme)

  const themeIcon = themeToggle.querySelector(".theme-icon")
  themeIcon.textContent = savedTheme === "dark" ? "☀️" : "🌙"
}

// Header scroll effect
function handleHeaderScroll() {
  if (window.scrollY > 100) {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(10px)"
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.backgroundColor = "var(--background)"
    header.style.backdropFilter = "none"
    header.style.boxShadow = "none"
  }
}

// Smooth scroll for anchor links
function initializeSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = header.offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Close mobile menu if open
        closeMobileMenu()
      }
    })
  })
}

// Duplicate clients for infinite scroll
function setupClientsCarousel() {
  if (clientsTrack) {
    const clients = Array.from(clientsTrack.children)

    // Duplicar clientes para loop infinito
    clients.forEach((client) => {
      const clone = client.cloneNode(true)
      clientsTrack.appendChild(clone)
    })

    // Adicionar mais uma cópia para garantir loop suave
    clients.forEach((client) => {
      const clone = client.cloneNode(true)
      clientsTrack.appendChild(clone)
    })
  }
}

// Intersection Observer for animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".service-card, .news-item, .contact-card, .partner-logo")

  animatedElements.forEach((el) => {
    observer.observe(el)
  })
}

// Contact form interactions
function initializeContactInteractions() {
  const contactCards = document.querySelectorAll(".contact-card")

  contactCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
}

// Service cards hover effects
function initializeServiceCards() {
  const serviceCards = document.querySelectorAll(".service-card")

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".service-icon")
      if (icon) {
        icon.style.transform = "scale(1.1) rotate(5deg)"
      }
    })

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".service-icon")
      if (icon) {
        icon.style.transform = "scale(1) rotate(0deg)"
      }
    })
  })
}

// Loading animation for page
function showPageContent() {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease-in-out"

  window.addEventListener("load", () => {
    document.body.style.opacity = "1"
  })
}

// Parallax effect for hero section
function initializeParallax() {
  const heroImage = document.querySelector(".hero-image")

  if (heroImage) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      heroImage.style.transform = `translateY(${rate}px)`
    })
  }
}

// News items click animation
function initializeNewsInteractions() {
  const newsItems = document.querySelectorAll(".news-item")

  newsItems.forEach((item) => {
    item.addEventListener("click", function () {
      this.style.transform = "scale(0.98)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    })
  })
}

// Keyboard navigation support
function initializeKeyboardNavigation() {
  document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu
    if (e.key === "Escape" && nav.classList.contains("active")) {
      closeMobileMenu()
      mobileMenuToggle.focus()
    }

    // Enter and Space key on theme toggle
    if ((e.key === "Enter" || e.key === " ") && document.activeElement === themeToggle) {
      e.preventDefault()
      toggleTheme()
    }

    // Enter and Space key on mobile menu toggle
    if ((e.key === "Enter" || e.key === " ") && document.activeElement === mobileMenuToggle) {
      e.preventDefault()
      toggleMobileMenu()
    }
  })
}

// Performance optimization - debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Performance monitoring
function initializePerformanceMonitoring() {
  // Monitor Core Web Vitals
  if ("web-vital" in window) {
    // This would integrate with web-vitals library if available
    console.log("[v0] Performance monitoring initialized")
  }

  // Monitor loading performance
  window.addEventListener("load", () => {
    const loadTime = performance.now()
    console.log(`[v0] Page loaded in ${loadTime.toFixed(2)}ms`)
  })
}

// Error handling
function initializeErrorHandling() {
  window.addEventListener("error", (e) => {
    console.error("[v0] JavaScript error:", e.error)
  })

  window.addEventListener("unhandledrejection", (e) => {
    console.error("[v0] Unhandled promise rejection:", e.reason)
  })
}

// Lazy loading for images
function initializeLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute("data-src")
            imageObserver.unobserve(img)
          }
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }
}

// WhatsApp button analytics
function initializeWhatsAppButton() {
  const whatsappButton = document.querySelector(".whatsapp-btn")

  if (whatsappButton) {
    whatsappButton.addEventListener("click", () => {
      console.log("[v0] WhatsApp button clicked")

      // Adicionar efeito de clique
      whatsappButton.style.transform = "scale(0.95)"
      setTimeout(() => {
        whatsappButton.style.transform = ""
      }, 150)
    })

    // Adicionar efeito de entrada após carregamento
    setTimeout(() => {
      whatsappButton.style.opacity = "1"
      whatsappButton.style.transform = "translateY(0)"
    }, 1000)
  }
}

function handleClientImageErrors() {
  const clientImages = document.querySelectorAll(".client-logo img")

  clientImages.forEach((img) => {
    img.addEventListener("error", function () {
      console.log(`[v0] Erro ao carregar imagem: ${this.src}`)
      this.style.display = "none"

      // Adicionar placeholder se necessário
      const placeholder = document.createElement("div")
      placeholder.className = "client-placeholder"
      placeholder.textContent = "Logo"
      placeholder.style.cssText = `
        width: 120px;
        height: 80px;
        background: var(--border);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-muted);
        border-radius: 8px;
      `
      this.parentNode.appendChild(placeholder)
    })

    img.addEventListener("load", function () {
      console.log(`[v0] Imagem carregada com sucesso: ${this.src}`)
    })
  })
}

// Initialize all functionality
function initialize() {
  // Theme and UI setup
  initializeTheme()
  setupClientsCarousel()
  showPageContent()

  // Scroll and navigation
  initializeSmoothScroll()
  initializeAnimations()
  initializeParallax()

  // Interactive elements
  initializeContactInteractions()
  initializeServiceCards()
  initializeNewsInteractions()
  initializeKeyboardNavigation()
  initializeWhatsAppButton() // Adicionando inicialização do WhatsApp
  handleClientImageErrors() // Adicionando tratamento de erro de imagens

  // Performance and error handling
  initializePerformanceMonitoring()
  initializeErrorHandling()
  initializeLazyLoading()

  // Event listeners
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", toggleMobileMenu)
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }

  // Debounced scroll handler
  const debouncedScrollHandler = debounce(handleHeaderScroll, 10)
  window.addEventListener("scroll", debouncedScrollHandler)

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("active") && !nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      closeMobileMenu()
    }
  })

  // Handle window resize
  window.addEventListener(
    "resize",
    debounce(() => {
      if (window.innerWidth > 768 && nav.classList.contains("active")) {
        closeMobileMenu()
      }
    }, 250),
  )
}

// Start everything when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize)
} else {
  initialize()
}

// Export functions for potential external use
window.VenturaInformatica = {
  toggleTheme,
  toggleMobileMenu,
  closeMobileMenu,
}
