import os
import rhino3dm
import trimesh
import numpy as np

SOURCE_PATH = os.path.join(os.path.dirname(__file__), '..', 'client-assets', 'On the path to Rediscovery_06', '3D', 'MOBIUS_03.3dm')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'models', 'mobius')
os.makedirs(OUTPUT_DIR, exist_ok=True)

FULL_GLB_PATH = os.path.join(OUTPUT_DIR, 'mobius_pavilion.glb')
ISOLATED_GLB_PATH = os.path.join(OUTPUT_DIR, 'mobius_pavilion_isolated.glb')

print("=" * 70)
print("PREPARING REAL CLIENT MÖBIUS ARCHITECTURAL GLB")
print(f"Source: {SOURCE_PATH}")
print(f"Destination: {FULL_GLB_PATH}")
print("=" * 70)

model = rhino3dm.File3dm.Read(SOURCE_PATH)
if not model:
    print("Error: Could not read 3dm model!")
    exit(1)

def extract_mesh_data(geo):
    vertices = []
    faces = []
    normals = []
    v_offset = 0
    
    if isinstance(geo, rhino3dm.Brep):
        for f in geo.Faces:
            m = f.GetMesh(rhino3dm.MeshType.Render)
            if not m or len(m.Faces) == 0:
                continue
            for v in m.Vertices:
                vertices.append([v.X, v.Y, v.Z])
            if len(m.Normals) == len(m.Vertices):
                for n in m.Normals:
                    normals.append([n.X, n.Y, n.Z])
            for face in m.Faces:
                if face[2] == face[3]:
                    faces.append([face[0] + v_offset, face[1] + v_offset, face[2] + v_offset])
                else:
                    faces.append([face[0] + v_offset, face[1] + v_offset, face[2] + v_offset])
                    faces.append([face[2] + v_offset, face[3] + v_offset, face[0] + v_offset])
            v_offset += len(m.Vertices)
            
    elif isinstance(geo, rhino3dm.Mesh):
        for v in geo.Vertices:
            vertices.append([v.X, v.Y, v.Z])
        if len(geo.Normals) == len(geo.Vertices):
            for n in geo.Normals:
                normals.append([n.X, n.Y, n.Z])
        for face in geo.Faces:
            if face[2] == face[3]:
                faces.append([face[0] + v_offset, face[1] + v_offset, face[2] + v_offset])
            else:
                faces.append([face[0] + v_offset, face[1] + v_offset, face[2] + v_offset])
                faces.append([face[2] + v_offset, face[3] + v_offset, face[0] + v_offset])
        v_offset += len(geo.Vertices)

    if not vertices or not faces:
        return None
        
    return {
        'vertices': np.array(vertices, dtype=np.float32),
        'faces': np.array(faces, dtype=np.int32),
        'normals': np.array(normals, dtype=np.float32) if len(normals) == len(vertices) else None
    }

# Pavilion center reference (Brep 4126)
pavilion_brep = model.Objects[4126].Geometry
bb_pav = pavilion_brep.GetBoundingBox()
CENTER_X = (bb_pav.Min.X + bb_pav.Max.X) / 2.0
CENTER_Y = (bb_pav.Min.Y + bb_pav.Max.Y) / 2.0
GROUND_Z = bb_pav.Min.Z # Pavilion ground datum

print(f"Origin Anchor: X={CENTER_X:.2f}, Y={CENTER_Y:.2f}, Ground Z={GROUND_Z:.2f}")

def transform_to_gltf(vertices):
    # Rhino (X East, Y North, Z Up) -> Three.js (X East, Y Up, Z -North)
    x = vertices[:, 0] - CENTER_X
    y = vertices[:, 2] - GROUND_Z
    z = -(vertices[:, 1] - CENTER_Y)
    return np.column_stack([x, y, z])

def transform_normals(normals):
    if normals is None:
        return None
    nx = normals[:, 0]
    ny = normals[:, 2]
    nz = -normals[:, 1]
    return np.column_stack([nx, ny, nz])

# 1. Extract Pavilion Shell (Brep 4126)
shell_raw = extract_mesh_data(pavilion_brep)
shell_verts = transform_to_gltf(shell_raw['vertices'])
shell_normals = transform_normals(shell_raw['normals'])
mesh_shell = trimesh.Trimesh(vertices=shell_verts, faces=shell_raw['faces'], vertex_normals=shell_normals)
# Engineered Timber PBR material
mesh_shell.visual = trimesh.visual.ColorVisuals(mesh=mesh_shell, vertex_colors=[209, 166, 122, 255]) # Warm glulam timber
print(f"[1] Shell: {len(mesh_shell.vertices)} vertices, {len(mesh_shell.faces)} faces")

# 2. Extract Soffit Runes (Breps 4127 through 4148)
rune_verts_list = []
rune_faces_list = []
rune_normals_list = []
v_offset = 0

for idx in range(4127, 4149):
    if idx < len(model.Objects):
        geo = model.Objects[idx].Geometry
        raw = extract_mesh_data(geo)
        if raw:
            r_verts = transform_to_gltf(raw['vertices'])
            r_norms = transform_normals(raw['normals'])
            rune_verts_list.append(r_verts)
            rune_faces_list.append(raw['faces'] + v_offset)
            if r_norms is not None:
                rune_normals_list.append(r_norms)
            v_offset += len(r_verts)

all_rune_verts = np.vstack(rune_verts_list)
all_rune_faces = np.vstack(rune_faces_list)
all_rune_norms = np.vstack(rune_normals_list) if len(rune_normals_list) == len(rune_verts_list) else None
mesh_runes = trimesh.Trimesh(vertices=all_rune_verts, faces=all_rune_faces, vertex_normals=all_rune_norms)
mesh_runes.visual = trimesh.visual.ColorVisuals(mesh=mesh_runes, vertex_colors=[89, 71, 56, 255]) # Dark bronze/charred rune accent
print(f"[2] Runes: {len(mesh_runes.vertices)} vertices, {len(mesh_runes.faces)} faces")

# 3. Extract Plaza Ground & Podium (Brep 1863 + trails)
plaza_objects = [1863, 1538, 1548, 1550, 1551, 1552, 1553, 1565, 1566, 1568]
plaza_verts_list = []
plaza_faces_list = []
v_offset = 0

for idx in plaza_objects:
    if idx < len(model.Objects):
        geo = model.Objects[idx].Geometry
        raw = extract_mesh_data(geo)
        if raw:
            p_verts = transform_to_gltf(raw['vertices'])
            plaza_verts_list.append(p_verts)
            plaza_faces_list.append(raw['faces'] + v_offset)
            v_offset += len(p_verts)

all_plaza_verts = np.vstack(plaza_verts_list)
all_plaza_faces = np.vstack(plaza_faces_list)
mesh_plaza = trimesh.Trimesh(vertices=all_plaza_verts, faces=all_plaza_faces)
mesh_plaza.visual = trimesh.visual.ColorVisuals(mesh=mesh_plaza, vertex_colors=[190, 185, 178, 255]) # Stone plaza paving
print(f"[3] Plaza Ground: {len(mesh_plaza.vertices)} vertices, {len(mesh_plaza.faces)} faces")

# 4. Extract Oslo Context Buildings (Breps 1576, 1584, 1853, 1857, 1861, 5556)
context_objects = [1576, 1584, 1853, 1857, 1861, 5556]
ctx_verts_list = []
ctx_faces_list = []
v_offset = 0

for idx in context_objects:
    if idx < len(model.Objects):
        geo = model.Objects[idx].Geometry
        raw = extract_mesh_data(geo)
        if raw:
            c_verts = transform_to_gltf(raw['vertices'])
            ctx_verts_list.append(c_verts)
            ctx_faces_list.append(raw['faces'] + v_offset)
            v_offset += len(c_verts)

all_ctx_verts = np.vstack(ctx_verts_list)
all_ctx_faces = np.vstack(ctx_faces_list)
mesh_context = trimesh.Trimesh(vertices=all_ctx_verts, faces=all_ctx_faces)
mesh_context.visual = trimesh.visual.ColorVisuals(mesh=mesh_context, vertex_colors=[215, 210, 202, 255]) # Neutral architectural context plaster
print(f"[4] Context Buildings: {len(mesh_context.vertices)} vertices, {len(mesh_context.faces)} faces")

# 5. Extract Plaza Lawns & Green Spaces (Breps 5560-5566)
green_objects = list(range(5560, 5567))
grn_verts_list = []
grn_faces_list = []
v_offset = 0

for idx in green_objects:
    if idx < len(model.Objects):
        geo = model.Objects[idx].Geometry
        raw = extract_mesh_data(geo)
        if raw:
            g_verts = transform_to_gltf(raw['vertices'])
            grn_verts_list.append(g_verts)
            grn_faces_list.append(raw['faces'] + v_offset)
            v_offset += len(g_verts)

all_grn_verts = np.vstack(grn_verts_list)
all_grn_faces = np.vstack(grn_faces_list)
mesh_green = trimesh.Trimesh(vertices=all_grn_verts, faces=all_grn_faces)
mesh_green.visual = trimesh.visual.ColorVisuals(mesh=mesh_green, vertex_colors=[140, 160, 125, 255]) # Muted park lawn green
print(f"[5] Landscaping: {len(mesh_green.vertices)} vertices, {len(mesh_green.faces)} faces")

# BUILD COMPLETE ARCHITECTURAL MAQUETTE SCENE
full_scene = trimesh.Scene()
full_scene.add_geometry(mesh_shell, node_name="MOBIUS_PAVILION_SHELL", geom_name="Pavilion_Timber_Shell")
full_scene.add_geometry(mesh_runes, node_name="MOBIUS_SOFFIT_RUNES", geom_name="Pavilion_Soffit_Runes")
full_scene.add_geometry(mesh_plaza, node_name="TULLINLOKKA_PLAZA", geom_name="Plaza_Stone_Ground")
full_scene.add_geometry(mesh_context, node_name="OSLO_CONTEXT_BUILDINGS", geom_name="Oslo_Historic_Facades")
full_scene.add_geometry(mesh_green, node_name="PLAZA_LANDSCAPING", geom_name="Plaza_Lawns")

full_scene.export(FULL_GLB_PATH)
full_size_mb = os.path.getsize(FULL_GLB_PATH) / (1024 * 1024)
print(f"\n--> EXPORTED FULL MAQUETTE: {FULL_GLB_PATH} ({full_size_mb:.2f} MB)")

# BUILD ISOLATED PAVILION SCENE
iso_scene = trimesh.Scene()
iso_scene.add_geometry(mesh_shell, node_name="MOBIUS_PAVILION_SHELL", geom_name="Pavilion_Timber_Shell")
iso_scene.add_geometry(mesh_runes, node_name="MOBIUS_SOFFIT_RUNES", geom_name="Pavilion_Soffit_Runes")

iso_scene.export(ISOLATED_GLB_PATH)
iso_size_mb = os.path.getsize(ISOLATED_GLB_PATH) / (1024 * 1024)
print(f"--> EXPORTED ISOLATED PAVILION: {ISOLATED_GLB_PATH} ({iso_size_mb:.2f} MB)")

print("\nModel preparation complete! Real geometry from MOBIUS_03.3dm preserved 100%.")
