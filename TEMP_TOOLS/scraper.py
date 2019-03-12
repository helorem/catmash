import requests
import os

res = requests.get("https://latelier.co/data/cats.json")

data = res.json()

for image in data["images"]:
    _, file_extension = os.path.splitext(image["url"])
    filename = "imgs/%s%s" % (image["id"], file_extension)
    """
    img_res = requests.get(image["url"], stream=True)
    with open(filename, "wb") as fd:
        for chunk in img_res.iter_content(1024):
            fd.write(chunk)
    """
    print("INSERT INTO cat (json_id, image) VALUES ('%s', 'assets/%s');" % (image["id"], filename))
