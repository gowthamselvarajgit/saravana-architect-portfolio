import os
import urllib.request

DEST_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'textures', 'earth')
os.makedirs(DEST_DIR, exist_ok=True)

TEXTURES = {
    'earth_atmos_2048.jpg': 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'earth_specular_2048.jpg': 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'earth_normal_2048.jpg': 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'
}

for name, url in TEXTURES.items():
    dest_path = os.path.join(DEST_DIR, name)
    print(f"Downloading {name}...")
    urllib.request.urlretrieve(url, dest_path)
    size = os.path.getsize(dest_path)
    print(f"Saved {name} ({size} bytes)")

print("All Earth textures downloaded successfully!")
