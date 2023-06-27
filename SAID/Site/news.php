<?php
$fichier = 'https://www.france24.com/fr/france/rss';
$contenu = simplexml_load_file($fichier);
$totalArticles = count($contenu->channel->item);
?>

<div class="news">
    <?php for ($i = 0; $i < $totalArticles; $i++): ?>
        <div class="article <?php echo 'article' . ($i + 1); ?>">
            <h2>
                <?php echo $contenu->channel->item[$i]->title; ?> :
            </h2>
            <p>
                <?php echo $contenu->channel->item[$i]->description; ?>
            </p>
        </div>
    <?php endfor; ?>
</div>

<style>
    .news {
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: white;
        height: 15%;
        width: 75%;
        margin-left: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        border-radius: 20px;
        color: black;
        text-align: center;
        overflow: hidden;
    }

    p{
        top: 10px;
    }

    .article {
        position: absolute;
        top: -20px;
        left: 0;
        width: 100%;
        opacity: 0;
        transition: opacity 1s ease-in-out;
    }

    .article.active {
        opacity: 1;
    }
</style>

<script>
    (function () {
        var articles = document.getElementsByClassName('article');
        var currentIndex = 0;

        function showNextArticle() {
            articles[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % articles.length;
            articles[currentIndex].classList.add('active');
            setTimeout(showNextArticle, 1000); 
        }

        articles[currentIndex].classList.add('active');
        setTimeout(showNextArticle, 1000); 
    })();
</script>