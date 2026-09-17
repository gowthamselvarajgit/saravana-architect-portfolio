import json, struct

with open('public/assets/models/character/character.glb', 'rb') as f:
    magic, version, length = struct.unpack('<4sII', f.read(12))
    chunk_len, chunk_type = struct.unpack('<II', f.read(8))
    data = json.loads(f.read(chunk_len).decode('utf-8'))

nodes = data.get('nodes', [])
print("=== All nodes with a mesh ===")
for n in nodes:
    if 'mesh' in n:
        print(f"Name: {n.get('name')}, mesh: {n.get('mesh')}, skin: {n.get('skin')}")
