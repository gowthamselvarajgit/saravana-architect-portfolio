import trimesh
import numpy as np
from PIL import Image

def find_alignment():
    glb = trimesh.load('public/assets/models/character/white_mesh.glb')
    mesh = list(glb.geometry.values())[0]
    v = mesh.vertices.copy()
    n = mesh.vertex_normals
    
    img = Image.open('public/assets/images/saravanakumar-3d-avatar.png').convert('RGB')
    W, H = img.size
    img_arr = np.array(img)
    
    # 3D Mesh bounds
    min_x, min_y, min_z = v.min(axis=0)
    max_x, max_y, max_z = v.max(axis=0)
    center_x = (min_x + max_x) / 2.0
    center_y = (min_y + max_y) / 2.0
    
    print(f"Mesh bounds: X [{min_x:.3f}, {max_x:.3f}], Y [{min_y:.3f}, {max_y:.3f}], Z [{min_z:.3f}, {max_z:.3f}]")
    print(f"Mesh center: X={center_x:.3f}, Y={center_y:.3f}")
    
    # In Hunyuan3D-2, the normalization fits the mesh into [-1, 1]^3 with a margin
    # Let's project front-facing vertices (n_z > 0.05) to screen coords (px, py)
    # Test scale and shift
    scale_y = H / (max_y - min_y)
    scale_x = scale_y  # Keep 1:1 aspect ratio
    
    # Screen coordinates for each vertex
    # In 2D image: Y=0 is top, Y=H-1 is bottom
    # In 3D: max_y is top, min_y is bottom
    px = ((v[:, 0] - center_x) * scale_x + (W / 2.0)).astype(np.int32)
    py = ((max_y - v[:, 1]) * scale_y).astype(np.int32)
    
    # Clip to valid image range
    px_clipped = np.clip(px, 0, W - 1)
    py_clipped = np.clip(py, 0, H - 1)
    
    front_colors = img_arr[py_clipped, px_clipped]
    print("Projected front colors successfully. Sample:", front_colors[100:105])

if __name__ == '__main__':
    find_alignment()
