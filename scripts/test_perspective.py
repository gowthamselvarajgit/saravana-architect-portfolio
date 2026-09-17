import trimesh
import numpy as np
from PIL import Image

def test_perspective():
    glb = trimesh.load('public/assets/models/character/white_mesh.glb')
    mesh = list(glb.geometry.values())[0]
    v = mesh.vertices.copy()
    n = mesh.vertex_normals
    
    img = Image.open('public/assets/images/saravanakumar-3d-avatar.png').convert('RGB')
    W, H = img.size
    img_arr = np.array(img)
    
    # Camera parameters
    # The character in the image is viewed with a camera slightly above eye level, looking down slightly
    # or centered on the chest/face
    dist = 4.2
    focal = 1940.0
    
    # Camera center in image
    cx = 390.0
    cy = 445.0
    
    # Slight rotation to match image pose if needed (in radians)
    # The head in 3D is already modeled in the exact pose
    # Depth for each vertex
    z_cam = dist - v[:, 2]
    
    px = np.clip((cx + (v[:, 0] * focal) / z_cam).astype(np.int32), 0, W - 1)
    py = np.clip((cy - (v[:, 1] * focal) / z_cam).astype(np.int32), 0, H - 1)
    
    colors = img_arr[py, px].astype(np.float32)
    
    # Blend with clean hair and suit colors on back/sides
    hair_color = np.array([24, 20, 26], dtype=np.float32)
    suit_color = np.array([22, 32, 68], dtype=np.float32)
    
    # Normal facing camera
    blend = np.clip((n[:, 2] + 0.15) / 0.5, 0.0, 1.0)[:, None]
    
    back_colors = np.zeros_like(colors)
    back_colors[v[:, 1] > 0.35] = hair_color
    back_colors[v[:, 1] <= 0.35] = suit_color
    
    final_colors = (colors * blend + back_colors * (1.0 - blend)).astype(np.uint8)
    
    buffer = np.full((H, W, 3), 255, dtype=np.uint8)
    z_buf = np.full((H, W), -9999.0, dtype=np.float32)
    
    for i in range(len(v)):
        x, y, z = px[i], py[i], v[i, 2]
        if z > z_buf[y, x]:
            z_buf[y, x] = z
            buffer[y, x] = final_colors[i]
            if x+1 < W and z > z_buf[y, x+1]:
                z_buf[y, x+1] = z
                buffer[y, x+1] = final_colors[i]
            if y+1 < H and z > z_buf[y+1, x]:
                z_buf[y+1, x] = z
                buffer[y+1, x] = final_colors[i]
            if x+1 < W and y+1 < H and z > z_buf[y+1, x+1]:
                z_buf[y+1, x+1] = z
                buffer[y+1, x+1] = final_colors[i]
                
    out = Image.fromarray(buffer)
    out.save('public/assets/models/character/test_perspective.png')
    print("Perspective test saved to test_perspective.png!")

if __name__ == '__main__':
    test_perspective()
