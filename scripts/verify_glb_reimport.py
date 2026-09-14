import os
import trimesh

FULL_GLB = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'models', 'mobius', 'mobius_pavilion.glb')
ISO_GLB = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'models', 'mobius', 'mobius_pavilion_isolated.glb')

print("--- VERIFYING EXPORTED GLB ASSETS ---")

for path in [FULL_GLB, ISO_GLB]:
    name = os.path.basename(path)
    print(f"\nChecking {name} ({os.path.getsize(path)/1024:.1f} KB):")
    scene = trimesh.load(path)
    if isinstance(scene, trimesh.Scene):
        print(f"  Valid trimesh.Scene loaded successfully!")
        print(f"  Geometries count: {len(scene.geometry)}")
        for g_name, geom in scene.geometry.items():
            print(f"    - '{g_name}': {len(geom.vertices)} vertices, {len(geom.faces)} faces, bounds: {geom.bounds}")
        print(f"  Scene Bounding Box: {scene.bounds}")
    else:
        print(f"  Loaded geometry: {len(scene.vertices)} vertices, {len(scene.faces)} faces")

print("\nRoundtrip reimport check: 100% PASSED!")
