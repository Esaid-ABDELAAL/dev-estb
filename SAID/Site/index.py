import tinytuya
import time
from lxml import etree
import xml.etree.ElementTree as ET



# Connect to Device
d = tinytuya.OutletDevice(
    dev_id='bfd23b3c166dbc4e60maym',
    address='192.168.0.120',     
    local_key='$u@kp.w2j(*H1?W_', 
    version=3.3)



status = ""

import time

while True:
    data = d.status()
    if data.get('dps', {}).get('1'):
        if status != "ouvert":
            status = "ouvert"
            tree = ET.parse('data.xml')
            croissy = tree.getroot()
            device = croissy.find(".//device/status")
            device.text = status
            tree.write('data.xml')
        print("ouvert")
    else:
        if status == "ouvert":
            status = "fermer"
            tree = ET.parse('data.xml')
            croissy = tree.getroot()
            device = croissy.find(".//device/status")
            device.text = status
            tree.write('data.xml')
        print("fermer")
    time.sleep(1)
