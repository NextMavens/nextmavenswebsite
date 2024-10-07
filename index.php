<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="apple-touch-icon" sizes="180x180" href="./assets/favs/android-chrome-192x192.png">
    <link rel="icon" type="./assets/favs/favicon-32x32.png" sizes="32x32" href="./assets/favs/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./assets/favs/favicon-16x16.png">
    <link rel="manifest" href="./assets/favs/site.webmanifest">
    <link rel="mask-icon" href="./assets/favs/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <link rel="stylesheet" href="./styles/styles.css">
    <link rel="stylesheet" href="./styles/head-nav.css">
    <link rel="stylesheet" href="./styles/hero-section-styles.css">
    <link rel="stylesheet" href="./styles/sub-hero-section.css">
    <link rel="stylesheet" href="./styles/footer.css">
    <link rel="stylesheet" href="./styles/our-experties.css">
    <link rel="stylesheet" href="./styles/feedback-carosels.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    <title>Next Mavens</title>


</head>

<body>
    <header>
        <?php
        include "./landing-page-section/head-nav.php"
        ?>
    </header>
    <main>
        <?php
        include "./landing-page-section/hero-section.php";
        include "./landing-page-section/sub-hero-section.php";
        include "./landing-page-section/our-experties-section.php";
        include "./landing-page-section/feedback-carosels.php"
        ?>
    </main>
    <footer>
        <?php
        include "./landing-page-section/footer.php";

        ?>
    </footer>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
    <script>
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    </script>
    <script src="./js/script.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js"></script>
</body>

</html>