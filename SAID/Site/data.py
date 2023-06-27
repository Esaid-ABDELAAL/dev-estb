# coding: utf-8

import tinytuya
import time
from lxml import etree

# Connect data.xml
tree = etree.parse("data.xml")
root = tree.getroot()

# Connect to Device

for device in root:
    print(device.tag, device.attrib)
    dev_id = device.find('dev_id').text
    ip = device.find('ip').text
    local_key = device.find('local_key').text
    version = device.find('version').text
    d = tinytuya.OutletDevice(
        dev_id=dev_id,
        address=ip,
        local_key=local_key, 
        version=version)
    status = device.find('status').text

# Get Status
while True:
    data = d.status()
    if data.get('dps', {}).get('1'):
        if status != "ouvert":
            status.text = str("ouvert")
            tree.write('data.xml')
        print("ouvert")
    else:
        if status == "ouvert":
            status.text = str("fermé")
            tree.write('data.xml')
        print("fermé")
    time.sleep(1)
