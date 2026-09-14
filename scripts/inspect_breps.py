import os
import rhino3dm

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'client-assets', 'On the path to Rediscovery_06', '3D', 'MOBIUS_03.3dm')
model = rhino3dm.File3dm.Read(MODEL_PATH)

print("--- BREP INSPECTION ---")
breps_info = []

for i, obj in enumerate(model.Objects):
    geo = obj.Geometry
    if isinstance(geo, rhino3dm.Brep):
        attr = obj.Attributes
        layer_name = model.Layers[attr.LayerIndex].Name if 0 <= attr.LayerIndex < len(model.Layers) else "Unknown"
        bb = geo.GetBoundingBox()
        
        # Check render meshes
        face_meshes = []
        for f_idx in range(len(geo.Faces)):
            f = geo.Faces[f_idx]
            m = f.GetMesh(rhino3dm.MeshType.Render)
            if m:
                face_meshes.append((len(m.Vertices), len(m.Faces)))
        
        name = attr.Name or f"Brep_{i}"
        dim_x = bb.Max.X - bb.Min.X
        dim_y = bb.Max.Y - bb.Min.Y
        dim_z = bb.Max.Z - bb.Min.Z
        
        breps_info.append({
            'index': i,
            'name': name,
            'layer': layer_name,
            'bbox_min': (bb.Min.X, bb.Min.Y, bb.Min.Z),
            'bbox_max': (bb.Max.X, bb.Max.Y, bb.Max.Z),
            'dims': (dim_x, dim_y, dim_z),
            'face_meshes': face_meshes,
            'total_faces': sum(fm[1] for fm in face_meshes),
            'total_verts': sum(fm[0] for fm in face_meshes)
        })

print(f"Total Breps: {len(breps_info)}")

# Group by layer
by_layer = {}
for b in breps_info:
    by_layer.setdefault(b['layer'], []).append(b)

for layer, items in by_layer.items():
    print(f"\nLayer '{layer}': {len(items)} Breps")
    total_f = sum(it['total_faces'] for it in items)
    total_v = sum(it['total_verts'] for it in items)
    print(f"  Total render mesh: {total_v} vertices, {total_f} faces")
    # Sample first few
    for it in items[:3]:
        print(f"    - [{it['index']}] '{it['name']}' dims: ({it['dims'][0]:.2f}, {it['dims'][1]:.2f}, {it['dims'][2]:.2f}), min: ({it['bbox_min'][0]:.2f}, {it['bbox_min'][1]:.2f}, {it['bbox_min'][2]:.2f})")

# Overall Brep bounding box
overall_min = [float('inf')]*3
overall_max = [float('-inf')]*3
for b in breps_info:
    for c in range(3):
        overall_min[c] = min(overall_min[c], b['bbox_min'][c])
        overall_max[c] = max(overall_max[c], b['bbox_max'][c])

print(f"\nOverall Brep Bounding Box:")
print(f"Min: ({overall_min[0]:.2f}, {overall_min[1]:.2f}, {overall_min[2]:.2f})")
print(f"Max: ({overall_max[0]:.2f}, {overall_max[1]:.2f}, {overall_max[2]:.2f})")
print(f"Dimensions: X={overall_max[0]-overall_min[0]:.2f}, Y={overall_max[1]-overall_min[1]:.2f}, Z={overall_max[2]-overall_min[2]:.2f}")
