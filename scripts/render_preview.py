import trimesh
import numpy as np
from PIL import Image

def render_preview():
    glb = trimesh.load('public/assets/models/character/white_mesh.glb')
    mesh = list(glb.geometry.values())[0]
    v = mesh.vertices.copy()
    n = mesh.vertex_normals
    
    img = Image.open('public/assets/images/saravanakumar-3d-avatar.png').convert('RGB')
    W, H = img.size
    img_arr = np.array(img)
    
    min_x, min_y, min_z = v.min(axis=0)
    max_x, max_y, max_z = v.max(axis=0)
    center_x = (min_x + max_x) / 2.0
    center_y = (min_y + max_y) / 2.0
    
    scale_y = H / (max_y - min_y) * 0.98
    scale_x = scale_y
    
    px = ((v[:, 0] - center_x) * scale_x + (W / 2.0)).astype(np.int32)
    py = ((max_y - v[:, 1]) * scale_y).astype(np.int32)
    
    px_clipped = np.clip(px, 0, W - 1)
    py_clipped = np.clip(py, 0, H - 1)
    
    # Base colors from front image
    colors = img_arr[py_clipped, px_clipped].astype(np.float32)
    
    # For vertices facing sideways or backwards (n_z < 0.1):
    # Hair is in upper portion (Y > 0.3)
    # Suit is in lower portion (Y <= 0.3)
    hair_color = np.array([28, 24, 30], dtype=np.float32)      # Rich dark brown/black
    suit_color = np.array([26, 36, 75], dtype=np.float32)      # Navy blue
    shirt_color = np.array([235, 235, 242], dtype=np.float32)  # Crisp white
    
    # Calculate blend weight for front projection based on normal z
    # When n_z is positive (facing camera), use image color.
    # When n_z is negative (facing away), smoothly blend to back material colors.
    blend = np.clip((n[:, 2] + 0.1) / 0.5, 0.0, 1.0)[:, None]
    
    back_colors = np.zeros_like(colors)
    is_hair = v[:, 1] > 0.38
    is_suit = v[:, 1] <= 0.38
    
    back_colors[is_hair] = hair_color
    back_colors[is_suit] = suit_color
    
    final_colors = (colors * blend + back_colors * (1.0 - blend)).astype(np.uint8)
    
    # Rasterize into an image buffer using Z-buffer
    buffer = np.full((H, W, 3), 255, dtype=np.uint8)
    z_buf = np.full((H, W), -9999.0, dtype=np.float32)
    
    # Sort vertices by depth (back to front or use z-buffer)
    for i in range(len(v)):
        x, y, z = px_clipped[i], py_clipped[i], v[i, 2]
        if z > z_buf[y, x]:
            z_buf[y, x] = z
            buffer[y, x] = final_colors[i]
            # 2x2 splat
            if x+1 < W and z > z_buf[y, x+1]:
                z_buf[y, x+1] = z
                buffer[y, x+1] = final_colors[i]
            if y+1 < H and z > z_buf[y+1, x]:
                z_buf[y+1, x] = z
                buffer[y+1, x] = final_colors[i]
    
    out_img = Image.fromarray(buffer)
    out_img.save('public/assets/models/character/test_preview.png')
    print("Rendered preview saved to test_preview.png!")

if __name__ == '__main__':
    render_preview()
