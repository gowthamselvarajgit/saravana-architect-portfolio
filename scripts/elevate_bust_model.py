import trimesh
from PIL import Image, ImageEnhance, ImageFilter
import numpy as np
import io

glb_path = r'public/assets/models/character/saravanakumar_bust.glb'
print("Loading GLB from:", glb_path)
scene = trimesh.load(glb_path)
mesh = list(scene.geometry.values())[0]

print(f"Original mesh: {len(mesh.vertices)} vertices, {len(mesh.faces)} faces")

# 1. Taubin Mesh Smoothing to eliminate photogrammetry noise & faceting
print("Applying Taubin smoothing filter...")
smoothed_mesh = trimesh.smoothing.filter_taubin(mesh, lamb=0.45, nu=0.48, iterations=12)

# Ensure vertex normals are smooth and clean
smoothed_mesh.vertex_normals = smoothed_mesh.vertex_normals

# 2. Extract and enhance texture atlas
mat = mesh.visual.material
if hasattr(mat, 'baseColorTexture') and mat.baseColorTexture:
    tex = mat.baseColorTexture.convert('RGBA')
    print("Enhancing texture atlas:", tex.size)
    
    # Increase color saturation (rich warm skin tones and deep navy blazer)
    color_enhancer = ImageEnhance.Color(tex)
    tex_vibrant = color_enhancer.enhance(1.28)
    
    # Increase contrast for defined cartoon / anime cel clarity
    contrast_enhancer = ImageEnhance.Contrast(tex_vibrant)
    tex_contrasted = contrast_enhancer.enhance(1.18)
    
    # Sharpen hair and facial features
    sharp_enhancer = ImageEnhance.Sharpness(tex_contrasted)
    tex_sharp = sharp_enhancer.enhance(1.25)
    
    # Assign enhanced texture back to material
    smoothed_mesh.visual.material.baseColorTexture = tex_sharp
    print("Texture atlas enhanced successfully!")

# Replace geometry in scene
scene.geometry[list(scene.geometry.keys())[0]] = smoothed_mesh

# 3. Export elevated GLB
out_path = r'public/assets/models/character/saravanakumar_bust.glb'
scene.export(out_path)
print(f"Elevated 3D model saved to {out_path}!")
