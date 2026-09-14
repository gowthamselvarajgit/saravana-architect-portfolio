import os
import rhino3dm

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'client-assets', 'On the path to Rediscovery_06', '3D', 'MOBIUS_03.3dm')

print(f"Inspecting Rhino 3D Model: {MODEL_PATH}")
if not os.path.exists(MODEL_PATH):
    print("Error: File not found!")
    exit(1)

size_mb = os.path.getsize(MODEL_PATH) / (1024 * 1024)
print(f"File Size: {size_mb:.2f} MB")

model = rhino3dm.File3dm.Read(MODEL_PATH)
if model is None:
    print("Error: Failed to parse 3dm file with rhino3dm!")
    exit(1)

print(f"Rhino Version: {model.ArchiveVersion}")
print(f"Start Section Comments: {model.StartSectionComments}")

# Layers
print("\n--- LAYERS ---")
print(f"Total Layers: {len(model.Layers)}")
for i, layer in enumerate(model.Layers):
    parent = layer.ParentLayerId
    color = f"rgba({layer.Color[0]}, {layer.Color[1]}, {layer.Color[2]}, {layer.Color[3]})"
    print(f"[{i}] Name: '{layer.Name}', Visible: {layer.Visible}, Locked: {layer.Locked}, Color: {color}, Id: {layer.Id}")

# Materials
print("\n--- MATERIALS ---")
print(f"Total Materials: {len(model.Materials)}")
for i, mat in enumerate(model.Materials):
    print(f"[{i}] Name: '{mat.Name}', Diffuse: {mat.DiffuseColor}")

# Objects
print("\n--- OBJECTS ---")
print(f"Total Objects in File3dm: {len(model.Objects)}")

obj_types = {}
layer_objects = {}
mesh_vertex_count = 0
mesh_face_count = 0
brep_count = 0
breps_with_render_mesh = 0
total_render_mesh_faces = 0

bbox_min = [float('inf')] * 3
bbox_max = [float('-inf')] * 3

for i, obj in enumerate(model.Objects):
    geo = obj.Geometry
    otype = type(geo).__name__
    obj_types[otype] = obj_types.get(otype, 0) + 1
    
    attr = obj.Attributes
    layer_idx = attr.LayerIndex
    layer_name = model.Layers[layer_idx].Name if 0 <= layer_idx < len(model.Layers) else "Unknown"
    layer_objects[layer_name] = layer_objects.get(layer_name, 0) + 1
    
    # Check bbox
    try:
        bb = geo.GetBoundingBox()
        bbox_min[0] = min(bbox_min[0], bb.Min.X)
        bbox_min[1] = min(bbox_min[1], bb.Min.Y)
        bbox_min[2] = min(bbox_min[2], bb.Min.Z)
        bbox_max[0] = max(bbox_max[0], bb.Max.X)
        bbox_max[1] = max(bbox_max[1], bb.Max.Y)
        bbox_max[2] = max(bbox_max[2], bb.Max.Z)
    except:
        pass
    
    if isinstance(geo, rhino3dm.Mesh):
        mesh_vertex_count += len(geo.Vertices)
        mesh_face_count += len(geo.Faces)
    elif isinstance(geo, rhino3dm.Brep):
        brep_count += 1
        # Check render meshes on Brep faces
        for face_idx in range(len(geo.Faces)):
            face = geo.Faces[face_idx]
            rm = face.GetMesh(rhino3dm.MeshType.Render)
            if rm:
                breps_with_render_mesh += 1
                total_render_mesh_faces += len(rm.Faces)
    elif isinstance(geo, rhino3dm.Extrusion):
        rm = geo.GetMesh(rhino3dm.MeshType.Render)
        if rm:
            total_render_mesh_faces += len(rm.Faces)

print("\nObject Types Distribution:")
for otype, count in obj_types.items():
    print(f"  - {otype}: {count}")

print("\nObjects per Layer:")
for lname, count in layer_objects.items():
    print(f"  - Layer '{lname}': {count} objects")

print(f"\nMesh geometry stats: {mesh_vertex_count} vertices, {mesh_face_count} faces across Mesh objects")
print(f"Brep count: {brep_count} Breps, total render mesh faces on Breps/Extrusions: {total_render_mesh_faces}")
print(f"Bounding Box: Min=({bbox_min[0]:.2f}, {bbox_min[1]:.2f}, {bbox_min[2]:.2f}), Max=({bbox_max[0]:.2f}, {bbox_max[1]:.2f}, {bbox_max[2]:.2f})")
print(f"Dimensions: X={bbox_max[0]-bbox_min[0]:.2f}, Y={bbox_max[1]-bbox_min[1]:.2f}, Z={bbox_max[2]-bbox_min[2]:.2f}")

# Views
print("\n--- NAMED VIEWS / CAMERAS ---")
print(f"Total Named Views: {len(model.NamedViews)}")
for i, nv in enumerate(model.NamedViews):
    vp = nv.Viewport
    print(f"[{i}] Name: '{nv.Name}', Camera Location: ({vp.CameraLocation.X:.2f}, {vp.CameraLocation.Y:.2f}, {vp.CameraLocation.Z:.2f}), Target: ({vp.TargetPoint.X:.2f}, {vp.TargetPoint.Y:.2f}, {vp.TargetPoint.Z:.2f})")
