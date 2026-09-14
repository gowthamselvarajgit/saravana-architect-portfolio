"""
Prepare Ribbon of Life Web GLB from authentic client Rhino 3D model.
Source: client-assets/RIBBON OF LIFE_THESIS_02/3D/SITE MODEL_03_final.3dm
Output: public/assets/models/ribbon-of-life/ribbon_of_life.glb
"""
import os
import rhino3dm
import trimesh
import numpy as np

SOURCE_3DM = "client-assets/RIBBON OF LIFE_THESIS_02/3D/SITE MODEL_03_final.3dm"
OUTPUT_DIR = "public/assets/models/ribbon-of-life"
OUTPUT_GLB = os.path.join(OUTPUT_DIR, "ribbon_of_life.glb")

os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Reading Ribbon of Life 3DM: {SOURCE_3DM}...")
model = rhino3dm.File3dm.Read(SOURCE_3DM)

# 1. Primary Skyscraper Mesh: Object 41541 ('off tower_01')
tower_geo = model.Objects[41541].Geometry
t_bbox = tower_geo.GetBoundingBox()

# Centering anchor
cx = (t_bbox.Min.X + t_bbox.Max.X) / 2.0
cy = (t_bbox.Min.Y + t_bbox.Max.Y) / 2.0
cz = t_bbox.Min.Z # Align base to ground level Y=0 in glTF

print(f"Tower Center anchor: ({cx:.2f}, {cy:.2f}), Base Z: {cz:.2f}")

def rhino_mesh_to_gltf(mesh_geo, center_x, center_y, base_z):
    verts = []
    for v in mesh_geo.Vertices:
        # Rhino Z-Up to glTF Y-Up:
        # gltf_X = rhino_X - cx
        # gltf_Y = rhino_Z - base_z
        # gltf_Z = -(rhino_Y - cy)
        verts.append([v.X - center_x, v.Z - base_z, -(v.Y - center_y)])
    verts = np.array(verts, dtype=np.float32)

    faces = []
    for f in mesh_geo.Faces:
        if f[2] == f[3]: # Triangle
            faces.append([f[0], f[1], f[2]])
        else: # Quad -> 2 Triangles
            faces.append([f[0], f[1], f[2]])
            faces.append([f[0], f[2], f[3]])
    faces = np.array(faces, dtype=np.int32)

    norms = None
    if len(mesh_geo.Normals) == len(mesh_geo.Vertices) and len(mesh_geo.Normals) > 0:
        norms = []
        for n in mesh_geo.Normals:
            norms.append([n.X, n.Z, -n.Y])
        norms = np.array(norms, dtype=np.float32)

    return verts, faces, norms

t_verts, t_faces, t_norms = rhino_mesh_to_gltf(tower_geo, cx, cy, cz)
mesh_tower = trimesh.Trimesh(vertices=t_verts, faces=t_faces, vertex_normals=t_norms)
mesh_tower.visual = trimesh.visual.ColorVisuals(mesh=mesh_tower, vertex_colors=[198, 206, 214, 255]) # Technical architectural anodized aluminum & glass

print(f"Tower Mesh: {len(t_verts)} vertices, {len(t_faces)} triangles")
print(f"Tower Dimensions: X={mesh_tower.extents[0]:.2f}m, Y={mesh_tower.extents[1]:.2f}m, Z={mesh_tower.extents[2]:.2f}m")

# Assemble Scene
scene = trimesh.Scene()
scene.add_geometry(mesh_tower, node_name="RIBBON_BIOMIMETIC_TOWER", geom_name="Biomimetic_Tower_Mesh")

scene.export(OUTPUT_GLB)
size_kb = os.path.getsize(OUTPUT_GLB) / 1024
print(f"Exported Ribbon GLB to: {OUTPUT_GLB} ({size_kb:.1f} KB)")
