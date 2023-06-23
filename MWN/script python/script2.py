import tinytuya
import time
import mysql.connector

# Informations de connexion à la base de données MySQL
db_host = "172.17.0.7"
db_user = "root"
db_password = "Bassem01!"
db_name = "doorsensors"

# Fonction de gestion de l'événement de changement d'état de l'appareil
def on_status_change(status):
    # Connexion à la base de données MySQL
    conn = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=db_name
    )
    cursor = conn.cursor()

    new_status = ""

    # Mise à jour du statut dans la base de données
    if status == "ouvert":
        # Fenêtre ouverte
        new_status = "ouvert"
    elif status == "fermé":
        # Fenêtre fermée
        new_status = "fermé"

    update_query = "UPDATE devices SET status = %s WHERE dev_id = %s"
    update_values = (new_status, dev_id)
    cursor.execute(update_query, update_values)
    conn.commit()

    # Fermeture de la connexion à la base de données
    cursor.close()
    conn.close()

# Connexion à la base de données MySQL
conn = mysql.connector.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    database=db_name
)
cursor = conn.cursor()

# Récupération des informations du capteur depuis la base de données
select_query = "SELECT name, dev_id, ip, local_key, status FROM devices WHERE id = %s"
select_values = ("2",)  # Remplacez par l'ID de votre capteur
cursor.execute(select_query, select_values)
device_info = cursor.fetchone()

if device_info is None:
    print("Aucun capteur trouvé dans la base de données.")
    cursor.close()
    conn.close()
    exit()

nom, dev_id, ip, local_key, status = device_info

# Fermeture du curseur et de la connexion à la base de données
cursor.close()
conn.close()

# Boucle d'événements
while True:
    # Connexion à l'appareil Tuya Smart
    device = tinytuya.OutletDevice(dev_id, ip, local_key)
    device.set_version(3.3)
    response = str(device.status())
    # Récupération de l'état de l'appareil
    if "True" in response:
        if status == "fermé":
            status = "ouvert"
            on_status_change(status)
            print("ouvert")
    elif "False" in response:
        if status == "ouvert":
            status = "fermé"
            on_status_change(status)
            print("fermé")

    time.sleep(2)  # Délai d'attente avant la prochaine vérification
