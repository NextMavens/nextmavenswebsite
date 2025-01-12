<?php
// Array for expertise cards
$expertise = [
    [
        'title' => "Branding",
        'icon' => "./assets/sub-hero/branding-icon.png",
        'description' => "We craft unique brand identities that resonate with your audience. Our branding expertise covers logo design, brand messaging, and comprehensive brand guidelines to ensure consistency across all touchpoints.",
        'learn_more_link' => "#"
    ],
    [
        'title' => "Development",
        'icon' => "./assets/sub-hero/development-icon.png",
        'description' => "Our development team creates robust, scalable solutions tailored to your needs. From responsive websites to complex web applications, we leverage cutting-edge technologies to bring your vision to life.",
        'learn_more_link' => "#"
    ],
    [
        'title' => "Marketing",
        'icon' => "./assets/sub-hero/marketing-icon.png",
        'description' => "We develop comprehensive marketing strategies to boost your brand's visibility and engagement. Our approach combines digital marketing, content creation, and data-driven insights to maximize your ROI.",
        'learn_more_link' => "#"
    ]
];

// Updated portfolio items array
$portfolio_items = [
    [
        'slideshow_id' => "websiteSlideshow",
        'slides' => [
            ['image' => "./assets/websites/power-logistics.png", 'url' => "https://dashioexpress.com/", 'alt' => "Power Logistics website preview"],
            ['image' => "./assets/websites/dashio express.png", 'url' => "https://dashioexpress.com/", 'alt' => "Dashio Express website preview"],
            ['image' => "./assets/websites/divine-pflege.png", 'url' => "https://divinepflege.de/", 'alt' => "Divine Pflege Website"]
        ],
        'tags' => [
            ['name' => 'Website', 'class' => 'website'],
            ['name' => 'Portfolio', 'class' => 'portfolio']
        ]
    ],
    [
        'slideshow_id' => "designSlideshow",
        'slides' => [
            ['image' => "./assets/sub-hero/design 4.png", 'alt' => "Design 4"],
            ['image' => "./assets/sub-hero/design1.png", 'alt' => "Design 1"],
            ['image' => "./assets/sub-hero/design 2.png", 'alt' => "Design 2"],
            ['image' => "./assets/sub-hero/design3.png", 'alt' => "Design 3"],

            ['image' => "./assets/sub-hero/design 5.png", 'alt' => "Design 5"],
            ['image' => "./assets/sub-hero/design 6.png", 'alt' => "Design 6"],
        ],
        'tags' => [
            ['name' => 'Design', 'class' => 'design'],
            ['name' => 'Portfolio', 'class' => 'portfolio']
        ]
    ]
];

// About section content
$about_content = [
    'image' => "./assets/about-section/group-background-image.png",
    'title' => "About Next Mavens",
    'paragraphs' => [
        "We are a forward-thinking digital agency specializing in creating innovative web solutions and cutting-edge design experiences. Our team combines technical expertise with creative excellence to deliver projects that stand out in today's digital landscape.",
        "From responsive web applications to intuitive mobile interfaces, we transform complex challenges into seamless user experiences. Our approach integrates the latest technologies with timeless design principles to create solutions that drive real business value.",
        "Partner with us to bring your digital vision to life. Whether you're a startup looking to establish your presence or an enterprise seeking digital transformation, we have the expertise to elevate your brand in the digital space."
    ],
    'cta_link' => "#",
    'cta_text' => "Get in touch"
];
?>


<div class="progress-bar"></div>
<!-- Expertise Section -->
<div class="experties-header">Our Expertise! Our Expertise! Our Expertise!</div>
<div class="experties-container">
    <div class="cards">
        <?php foreach ($expertise as $card): ?>
            <div class="card" data-aos="fade-up">
                <div class="top-sect">
                    <h2><?= $card['title'] ?></h2>
                    <img class="icon desc-icon" src="<?= $card['icon'] ?>" alt="<?= $card['title'] ?> icon">
                </div>
                <p><?= $card['description'] ?></p>
                <div class="learn-more">
                    <a href="<?= $card['learn_more_link'] ?>" class="learn-more-link">Learn more</a>
                    <div class="icon">➚</div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<!-- Portfolio Section -->
<div class="portfolio-grid">
    <?php foreach ($portfolio_items as $index => $item): ?>
        <div class="portfolio-item" data-aos="fade-up" data-aos-delay="<?= $index * 100 ?>">
            <div class="slideshow-container" id="<?= $item['slideshow_id'] ?>">
                <?php foreach ($item['slides'] as $slide): ?>
                    <div class="slide <?= $slide === reset($item['slides']) ? 'active' : '' ?>" data-url="<?= $slide['url'] ?? '#' ?>">
                        <img src="<?= $slide['image'] ?>" alt="<?= $slide['alt'] ?>" loading="lazy">
                        <?php if (isset($slide['url'])): ?>
                            <a href="<?= $slide['url'] ?>" target="_blank" rel="noopener noreferrer" class="visit-website">Visit Website</a>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
                <div class="slideshow-controls">
                    <button class="slideshow-btn prev" aria-label="Previous slide">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button class="slideshow-btn next" aria-label="Next slide">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
                <div class="slide-indicators" id="<?= $item['slideshow_id'] ?>Indicators"></div>
            </div>
            <div class="portfolio-tags">
                <?php foreach ($item['tags'] as $tag): ?>
                    <span class="tag <?= $tag['class'] ?>"><?= $tag['name'] ?></span>
                <?php endforeach; ?>
            </div>
        </div>
    <?php endforeach; ?>
</div>

<!-- About Section -->
<div class="about-section">
    <div class="about-image" data-aos="fade-right">
        <img src="<?= $about_content['image'] ?>" alt="Next Mavens Team">
    </div>
    <div class="about-content" data-aos="fade-left">
        <h2><?= $about_content['title'] ?></h2>
        <?php foreach ($about_content['paragraphs'] as $paragraph): ?>
            <p><?= $paragraph ?></p>
        <?php endforeach; ?>
        <a href="<?= $about_content['cta_link'] ?>" class="cta-button">
            <?= $about_content['cta_text'] ?>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
        </a>
    </div>
</div>