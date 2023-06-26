<!DOCTYPE html>
<html>
    <head>
        <title>Cours PHP / MySQL</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>Bases de données MySQL</h1>  
        <?php
            $servername = '192.168.0.166';
            $port = '33061';
            $username = 'root';
            $password = 'Bassem01!';
            $db_name = 'doorsensors';
            
            //On établit la connexion
            $conn = new mysqli($servername, $port,$username, $password, $db_name);
            
            //On vérifie la connexion
            if($conn->connect_error){
                die('Erreur : ' .$conn->connect_error);
            }
            echo 'Connexion réussie';
        ?>
    </body>
</html>