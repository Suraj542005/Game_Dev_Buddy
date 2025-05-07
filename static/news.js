
document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const articlesGrid = document.getElementById('articlesGrid');
    const featuredArticle = document.getElementById('featuredArticle');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const pagination = document.getElementById('pagination');
    const newsletterForm = document.getElementById('newsletterForm');
    const emailNewsletter = document.getElementById('emailNewsletter');
    const emailNewsletterError = document.getElementById('emailNewsletterError');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const closeToast = document.getElementById('closeToast');

    // Game dev news articles data
    const articles = [
        {
            id: 1,
            title: "Unreal Engine 5 Revolutionizes Game Development with New Features",
            excerpt: "The latest update introduces groundbreaking rendering capabilities and improved workflows for game developers of all scales.",
            image: "/static/Img/id_1.jpeg",
            category: "technology",
            date: "May 5, 2025",
            comments: 42,
            featured: true,
            content: "Full article content here..."
        },
        {
            id: 2,
            title: "Indie Game 'Hollow Dreams' Wins Multiple Awards at GDC",
            excerpt: "The atmospheric puzzle platformer created by a two-person team has captured the attention of the industry with its innovative mechanics.",
            image: "/static/Img/id_2.jpg",
            category: "indie",
            date: "May 3, 2025",
            comments: 28,
            featured: false,
            content: "Full article content here..."
        },
        {
            id: 3,
            title: "AI-Driven NPCs: The Future of Game Character Development",
            excerpt: "New machine learning techniques are enabling more realistic and responsive non-player characters in open world games.",
            image: "/static/Img/id_3.png",
            category: "technology",
            date: "April 29, 2025",
            comments: 36,
            featured: false,
            content: "Full article content here..."
        },
        {
            id: 4,
            title: "Major Publisher Aquires Indie Studio Behind 'Starlight Ventures'",
            excerpt: "The acquisition marks another big move in the ongoing consolidation trend within the gaming industry.",
            image: "/static/Img/id_4.jpg",
            category: "industry",
            date: "April 27, 2025",
            comments: 19,
            featured: false,
            content: "Full article content here..."
        },
        {
            id: 5,
            title: "Creating Realistic Water Effects in Unity: A Step-by-Step Guide",
            excerpt: "Learn how to implement advanced water simulation using the latest shader techniques and optimization strategies.",
            image: "/static/Img/id_5.webp",
            category: "tutorials",
            date: "April 25, 2025",
            comments: 51,
            featured: false,
            content: "Full article content here..."
        },
        {
            id: 6,
            title: "Godot 4.0: The Open Source Engine Gaining Mainstream Adoption",
            excerpt: "More studios are turning to this free engine as capabilities expand and the community grows.",
            image: "/static/Img/id_6.jpeg",
            category: "technology",
            date: "April 23, 2025",
            comments: 33,
            featured: false,
            content: "Full article content here..."
        }
    ];

    // Filter and display articles based on search and category
    function filterAndDisplayArticles() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filteredArticles = articles.filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchTerm) ||
                article.excerpt.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        renderArticles(filteredArticles);
    }

    // Render articles to the grid
    function renderArticles(articlesToRender) {
        articlesGrid.innerHTML = '';

        if (articlesToRender.length === 0) {
            articlesGrid.innerHTML = '<p class="no-results">No articles found matching your criteria.</p>';
            return;
        }

        articlesToRender.forEach(article => {
            const articleCard = document.createElement('div');
            articleCard.className = 'article-card';
            articleCard.innerHTML = `
          <div class="article-image">
            <img src="${article.image}" alt="${article.title}">
          </div>
          <div class="article-content">
            <span class="article-category category-${article.category}">${article.category}</span>
            <h3 class="article-title">${article.title}</h3>
            <p class="article-excerpt">${article.excerpt}</p>
            <div class="article-meta">
              <div class="article-date">
                <i class="far fa-calendar"></i>
                <span>${article.date}</span>
              </div>
              <div class="article-comments">
                <i class="far fa-comment"></i>
                <span>${article.comments}</span>
              </div>
            </div>
          </div>
        `;

            // Add click event to open article (placeholder)
            articleCard.addEventListener('click', function () {
                showToast(`Article "${article.title}" would open here`);
            });

            articlesGrid.appendChild(articleCard);
        });
    }

    // Render featured article
    function renderFeaturedArticle() {
        const featured = articles.find(article => article.featured);

        if (featured) {
            featuredArticle.innerHTML = `
          <div class="featured-image">
            <img src="${featured.image}" alt="${featured.title}">
          </div>
          <h3 class="featured-title">${featured.title}</h3>
          <p class="featured-excerpt">${featured.excerpt}</p>
          <a href="#" class="read-more">Read Full Article →</a>
        `;

            featuredArticle.querySelector('.read-more').addEventListener('click', function (e) {
                e.preventDefault();
                showToast(`Featured article "${featured.title}" would open here`);
            });
        }
    }

    // Show toast notification
    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    // Close toast
    closeToast.addEventListener('click', function () {
        toast.classList.remove('show');
    });

    // Setup search and filter events
    searchInput.addEventListener('input', filterAndDisplayArticles);
    categoryFilter.addEventListener('change', filterAndDisplayArticles);

    // Setup pagination (simple implementation for demonstration)
    pagination.addEventListener('click', function (e) {
        if (e.target.classList.contains('page-button') || e.target.classList.contains('next-button')) {
            // Remove active class from all buttons
            document.querySelectorAll('.page-button').forEach(btn => {
                btn.classList.remove('active');
            });

            // If a page button was clicked, add active class
            if (e.target.classList.contains('page-button')) {
                e.target.classList.add('active');
                const page = e.target.getAttribute('data-page');
                showToast(`Navigated to page ${page}`);
            } else {
                // Handle next button click
                const activeButton = document.querySelector('.page-button.active');
                const nextPage = parseInt(activeButton.getAttribute('data-page')) + 1;

                // Find next button if it exists
                const nextPageButton = document.querySelector(`.page-button[data-page="${nextPage}"]`);
                if (nextPageButton) {
                    activeButton.classList.remove('active');
                    nextPageButton.classList.add('active');
                    showToast(`Navigated to page ${nextPage}`);
                }
            }
        }
    });

    // Newsletter signup
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Reset error
        emailNewsletterError.textContent = '';

        // Simple validation
        const email = emailNewsletter.value.trim();
        if (!email) {
            emailNewsletterError.textContent = 'Email is required';
            return;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            emailNewsletterError.textContent = 'Please enter a valid email';
            return;
        }

        // Simulate subscription
        const subscribeButton = document.getElementById('subscribeButton');
        subscribeButton.disabled = true;
        subscribeButton.textContent = 'Subscribing...';

        setTimeout(() => {
            newsletterForm.reset();
            showToast('Thank you for subscribing to our newsletter!');
            subscribeButton.disabled = false;
            subscribeButton.textContent = 'Subscribe';
        }, 1500);
    });

    // Initialize the page
    renderFeaturedArticle();
    filterAndDisplayArticles();

    // Clear email newsletter error on input
    emailNewsletter.addEventListener('input', function () {
        emailNewsletterError.textContent = '';
    });

    // Add "Home" link to each page
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.classList.contains('active')) {
                e.preventDefault(); // Prevent navigating to the current page
            }
        });
    });
});