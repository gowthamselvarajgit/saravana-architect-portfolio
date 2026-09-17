import trimesh
import numpy as np
from PIL import Image

def generate_textured_bust():
    input_path = 'public/assets/models/character/white_mesh.glb'
    output_path = 'public/assets/models/character/saravanakumar_bust.glb'
    avatar_img_path = 'public/assets/images/saravanakumar-3d-avatar.png'
    
    print("Loading white mesh from:", input_path)
    glb = trimesh.load(input_path)
    mesh = list(glb.geometry.values())[0]
    
    v = mesh.vertices.copy()
    n = mesh.vertex_normals
    
    print(f"Mesh has {len(v)} vertices and {len(mesh.faces)} faces")
    
    img = Image.open(avatar_img_path).convert('RGB')
    W, H = img.size
    img_arr = np.array(img, dtype=np.float32)
    
    # Camera perspective projection matching 2D render
    dist = 4.2
    focal = 1940.0
    cx = 390.0
    cy = 445.0
    
    z_cam = dist - v[:, 2]
    
    px = np.clip((cx + (v[:, 0] * focal) / z_cam).astype(np.int32), 0, W - 1)
    py = np.clip((cy - (v[:, 1] * focal) / z_cam).astype(np.int32), 0, H - 1)
    
    # Sample 2D image colors
    front_colors = img_arr[py, px]
    
    # Back and side material colors
    # Hair: Rich espresso dark brown/black with subtle warm undertone
    hair_base = np.array([22.0, 18.0, 24.0])
    
    # Suit: Elegant navy blue
    suit_base = np.array([24.0, 34.0, 68.0])
    
    # Shirt collar: Crisp dress shirt white
    shirt_base = np.array([238.0, 240.0, 246.0])
    
    # Skin tone for neck back
    neck_base = np.array([188.0, 142.0, 115.0])
    
    back_colors = np.zeros_like(front_colors)
    
    # Region classification by height Y and forwardness Z
    is_hair = v[:, 1] > 0.40
    is_neck = (v[:, 1] <= 0.40) & (v[:, 1] > 0.18) & (np.abs(v[:, 0]) < 0.22) & (v[:, 2] < 0.15)
    is_suit = ~is_hair & ~is_neck
    
    back_colors[is_hair] = hair_base
    back_colors[is_neck] = neck_base
    back_colors[is_suit] = suit_base
    
    # Normal-based blending
    # Vertices facing camera (n_z > 0) get the front projected texture
    # Vertices facing away (n_z < 0) smoothly fade into the clean back material colors
    # We use a smooth cosine/smoothstep blend
    nz = n[:, 2]
    # Blend range from -0.1 to 0.4
    t = np.clip((nz - (-0.1)) / 0.5, 0.0, 1.0)
    # Smoothstep
    blend = t * t * (3.0 - 2.0 * t)
    blend = blend[:, None]
    
    final_rgb = front_colors * blend + back_colors * (1.0 - blend)
    
    # Ensure values in [0, 255]
    final_rgb = np.clip(final_rgb, 0.0, 255.0).astype(np.uint8)
    
    # Add alpha channel
    alpha = np.full((len(v), 1), 255, dtype=np.uint8)
    vertex_colors_rgba = np.hstack([final_rgb, alpha])
    
    # Assign vertex colors
    mesh.visual.vertex_colors = vertex_colors_rgba
    
    # Export clean elevated GLB
    scene = trimesh.Scene([mesh])
    scene.export(output_path)
    print(f"Textured cartoon digital twin exported to: {output_path} successfully!")

if __name__ == '__main__':
    generate_textured_bust()
