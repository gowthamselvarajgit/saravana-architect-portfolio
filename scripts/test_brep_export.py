import os
import rhino3dm
import trimesh
import numpy as np

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'client-assets', 'On the path to Rediscovery_06', '3D', 'MOBIUS_03.3dm')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'models', 'mobius')
os.makedirs(OUTPUT_DIR, exist_ok=True)
OUTPUT_GLB = os.path.join(OUTPUT_DIR, 'mobius_pavilion_test.glb')

model = rhino3dm.File3dm.Read(MODEL_PATH)

def extract_mesh_from_brep(brep):
    vertices = []
    faces = []
    normals = []
    v_offset = 0
    
    for f in brep.Faces:
        m = f.GetMesh(rhino3dm.MeshType.Render)
        if not m or len(m.Faces) == 0:
            continue
            
        # Vertices
        for v in m.Vertices:
            vertices.append([v.X, v.Y, v.Z])
            
        # Normals
        has_normals = len(m.Normals) == len(m.Vertices)
        if has_normals:
            for n in m.Normals:
                normals.append([n.X, n.Y, n.Z])
                
        # Faces (triangles & quads)
        for face in m.Faces:
            if face[2] == face[3]:
                # Triangle
                faces.append([face[0] + v_offset, face[1] + v_offset, face[2] + v_offset])
            else:
                # Quad -> split into 2 triangles
                faces.append([face[0] + v_offset, face[1] + v_offset, face[2] + v_offset])
                faces.append([face[2] + v_offset, face[3] + v_offset, face[0] + v_offset])
                
        v_offset += len(m.Vertices)
        
    if len(vertices) == 0:
        return None
        
    return {
        'vertices': np.array(vertices, dtype=np.float32),
        'faces': np.array(faces, dtype=np.int32),
        'normals': np.array(normals, dtype=np.float32) if len(normals) == len(vertices) else None
    }

# Test extract Brep 4126 (Pavilion Loop)
obj_4126 = model.Objects[4126].Geometry
data = extract_mesh_from_brep(obj_4126)
print(f"Extracted Brep 4126: {len(data['vertices'])} vertices, {len(data['faces'])} triangle faces")

mesh = trimesh.Trimesh(vertices=data['vertices'], faces=data['faces'], vertex_normals=data['normals'])
print(f"Trimesh bounding box: {mesh.bounds}")

# Center around pavilion center and convert Rhino Z-up to Three.js Y-up
# In Rhino: X=East, Y=North, Z=Up
# In Three.js: X=East, Y=Up, Z=-North (or Z=South)
center = (mesh.bounds[0] + mesh.bounds[1]) / 2.0
print(f"Original Center: {center}")

# Export test
scene = trimesh.Scene()
scene.add_geometry(mesh, node_name="Mobius_Loop_Shell")
scene.export(OUTPUT_GLB)

size_mb = os.path.getsize(OUTPUT_GLB) / (1024 * 1024)
print(f"Successfully exported test GLB: {OUTPUT_GLB} ({size_mb:.2f} MB)")
