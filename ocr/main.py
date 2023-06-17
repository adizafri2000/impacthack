from fastapi import FastAPI, File, UploadFile
from PIL import Image
import pytesseract
import re
import os 

app = FastAPI()
pytesseract.pytesseract.tesseract_cmd = r'Tesseract-OCR\tesseract.exe'

@app.post("/convert_receipt")
async def convert_receipt(file: UploadFile = File(...)):
    # Save the uploaded image temporarily
    with open("temp_img.jpg", "wb") as temp_img:
        temp_img.write(await file.read())

    # Read the image using pytesseract
    img = Image.open("temp_img.jpg")
    text = pytesseract.image_to_string(img)

    # Filter merchant
    merchant = text.strip().split('\n')[0]

    # Filter time
    time = ""
    matchesTime = re.findall(r'\b(?:\d{1,2}:\d{1,2}:\d{1,2}|\d{1,2}:\d{1,2})\b', text)
    if matchesTime:
        time = matchesTime[0]

    # Filter date
    date = ""
    matchesDate = re.findall(r'\b(?:(?:\d{4}[/]\d{1,2}[/]\d{1,2})|(?:\d{1,2}[/]\d{1,2}[/]\d{2,4}))\b', text)
    if matchesDate:
        date = matchesDate[0]

    # Filter total price
    total = ""
    matchesPrice = re.findall(r'\b(?:total|cash)\b.*?([+-]?\d+(?:\.\d+)?)', text, re.IGNORECASE)
    if matchesPrice:
        total = matchesPrice[-1]

    # Filter items
    items = []
    priceList = []
    itemList = []
    pattern = r".*[A-Za-z]+\s+\d+(?:\.\d{2})?\s*$|^\d+\s+[A-Za-z\s]+\d+\.\d+$"
    matches = re.findall(pattern, text, re.MULTILINE)
    if matches:
        for line in matches:
            if re.search('Motel|Card|Total|Debit|1064938', line):
                continue
            else:
                line = line.replace("\n", "")
                items.append(line)
        for item in items:
            regex_pattern = r"\d+\.\d{2}"
            matches = re.findall(regex_pattern, item)
            if matches:
                decimal_value = matches[0]
                description = item.replace(" " + decimal_value, "")
                priceList.append(decimal_value)
                itemList.append(description)

    # create dictionary for price and item
    item_list = []
    # Iterate over the arrays
    for item, price in zip(itemList, priceList):
        # Extract the item name by splitting the string
        item_name = item.split(' ', 1)[1]
        # Remove any leading '$' from the price
        price = price.lstrip('$')
        # Create a dictionary for the item and price
        item_dict = {'item': item_name, 'price': price}
        # Add the item dictionary to the list
        item_list.append(item_dict)

    # Return the values in JSON format
    return {
        "merchant": merchant,
        "time": time,
        "date": date,
        "total": total,
        "itemList": item_list
    }
