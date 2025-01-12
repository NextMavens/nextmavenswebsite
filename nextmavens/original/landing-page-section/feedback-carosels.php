<?php
// Array of partner data
$partners = [

    [
        'name' => "I Course +",
        'logo' => "./assets/partners/icourseplus.png"
    ],
    [
        'name' => "Power Logistics",
        'logo' => "./assets/partners/power-logistics.png"
    ],
    [
        'name' => "Nearskool",
        'logo' => "./assets/partners/nearskool.png"
    ],
    [
        'name' => "Evergreen Imports",
        'logo' => "./assets/partners/evergreen-imports.webp"
    ],
    [
        'name' => "Divine Pflege",
        'logo' => "./assets/partners/divine-pflege.jpg"
    ],

    [
        'name' => "Dashio Express",
        'logo' => "./assets/partners/dashio-express.png"
    ],
    [
        'name' => "Amaizing Pals",
        'logo' => "./assets/partners/amaizing-pals.png"
    ]
];

// Array of review data
$reviews = [
    [
        'name' => "John Mwangi",
        'date' => "1 day ago",
        'rating' => 5,
        'text' => "Next Mavens took our digital marketing to the next level! Our brand has never looked better. Amazing team!",
        'avatar' => "./assets/feedback-profiles/p2.jpg"
    ],
    [
        'name' => "Grace Achieng",
        'date' => "4 days ago",
        'rating' => 4,
        'text' => "The website they built for us was impressive. There were a few minor bugs, but they were quick to resolve them.",
        'avatar' => "./assets/feedback-profiles/p1.jpg"
    ],
    [
        'name' => "David Wanjohi",
        'date' => "2 weeks ago",
        'rating' => 5,
        'text' => "Their SEO strategy brought us a lot of organic traffic. Next Mavens truly understands how to deliver results!",
        'avatar' => "./assets/feedback-profiles/p8.jpg"
    ],
    [
        'name' => "Emily Njeri",
        'date' => "3 days ago",
        'rating' => 5,
        'text' => "The branding they created for us was exactly what we were looking for. Our clients love it, and we couldn’t be more pleased!",
        'avatar' => "./assets/feedback-profiles/p10.jpg"
    ],
    [
        'name' => "James Kibet",
        'date' => "1 week ago",
        'rating' => 4,
        'text' => "Next Mavens designed a beautiful website for us, though the process took a bit longer than expected. The final result was worth it.",
        'avatar' => "./assets/feedback-profiles/p3.jpg"
    ],
    [
        'name' => "Lucy Wairimu",
        'date' => "5 days ago",
        'rating' => 5,
        'text' => "Our mobile app runs smoothly, thanks to their expert team. The level of professionalism was unmatched!",
        'avatar' => "./assets/feedback-profiles/p7.jpg"
    ],
    [
        'name' => "Peter Otieno",
        'date' => "2 weeks ago",
        'rating' => 5,
        'text' => "Their marketing strategies helped us double our conversions in just a few months. I’m impressed with the entire team.",
        'avatar' => "./assets/feedback-profiles/p4.jpg"
    ],
    [
        'name' => "Sarah Njuguna",
        'date' => "3 days ago",
        'rating' => 4,
        'text' => "Next Mavens gave our website a modern look. We had a few revisions, but they handled them professionally.",
        'avatar' => "./assets/feedback-profiles/p9.jpg"
    ],
    [
        'name' => "Robert Kimani",
        'date' => "1 day ago",
        'rating' => 5,
        'text' => "They completely transformed our online branding. The attention to detail was impressive!",
        'avatar' => "./assets/feedback-profiles/p6.jpg"
    ],
    [
        'name' => "Anne Ndungu",
        'date' => "1 week ago",
        'rating' => 5,
        'text' => "Next Mavens' digital marketing services exceeded our expectations. We've seen incredible growth in our audience!",
        'avatar' => "./assets/feedback-profiles/p5.jpg"
    ]
];

?>


<!-- Our Partners Carousel -->
<div class="carousel-container">
    <h2>Our Partners</h2>
    <div class="carousel" id="logo-carousel">
        <?php foreach ($partners as $partner): ?>
            <div class="carousel-item">
                <img src="<?= $partner['logo'] ?>" alt="<?= $partner['name'] ?>" class="logo">
            </div>
        <?php endforeach; ?>
    </div>
    <button class="carousel-control left" onclick="moveCarousel('logo-carousel', -1)">&lt;</button>
    <button class="carousel-control right" onclick="moveCarousel('logo-carousel', 1)">&gt;</button>
    <div class="progress-bar" id="logo-progress"></div>
</div>

<!-- Customer Reviews Carousel -->
<div class="carousel-container">
    <h2>Customer Reviews</h2>
    <div class="carousel" id="review-carousel">
        <?php foreach ($reviews as $review): ?>
            <div class="carousel-item">
                <div class="review">
                    <div class="review-header">
                        <img src="<?= $review['avatar'] ?>" alt="<?= $review['name'] ?>" class="review-avatar">
                        <div>
                            <div class="review-name"><?= $review['name'] ?></div>
                            <div class="review-date"><?= $review['date'] ?></div>
                        </div>
                    </div>
                    <div class="review-rating"><?= str_repeat('★', $review['rating']) . str_repeat('☆', 5 - $review['rating']) ?></div>
                    <p class="review-text"><?= $review['text'] ?></p>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <button class="carousel-control left" onclick="moveCarousel('review-carousel', -1)">&lt;</button>
    <button class="carousel-control right" onclick="moveCarousel('review-carousel', 1)">&gt;</button>
    <div class="progress-bar" id="review-progress"></div>
</div>