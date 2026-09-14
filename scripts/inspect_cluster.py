import os
import rhino3dm

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'client-assets', 'On the path to Rediscovery_06', '3D', 'MOBIUS_03.3dm')
model = rhino3dm.File3dm.Read(MODEL_PATH)

print("--- MOBIUS SITE & PAVILION OBJECTS CLUSTER ---")
# Focus around Pavilion center (253, 188)
pavilion_objects = []

for i, obj in enumerate(model.Objects):
    geo = obj.Geometry
    bb = geo.GetBoundingBox()
    cx = (bb.Min.X + bb.Max.X) / 2
    cy = (bb.Min.Y + bb.Max.Y) / 2
    cz = (bb.Min.Z + bb.Max.Z) / 2
    
    # Check if object is within Tullinløkka site bounds (X: 100 to 400, Y: 50 to 350)
    if 100 <= cx <= 400 and 50 <= cy <= 350:
        attr = obj.Attributes
        layer_name = model.Layers[attr.LayerIndex].Name if 0 <= attr.LayerIndex < len(model.Layers) else "Unknown"
        otype = type(geo).__name__
        dim_x = bb.Max.X - bb.Min.X
        dim_y = bb.Max.Y - bb.Min.Y
        dim_z = bb.Max.Z - bb.Min.Z
        
        # Check render mesh
        f_count = 0
        v_count = 0
        if isinstance(geo, rhino3dm.Brep):
            for f in geo.Faces:
                m = f.GetMesh(rhino3dm.MeshType.Render)
                if m:
                    f_count += len(m.Faces)
                    v_count += len(m.Vertices)
        elif isinstance(geo, rhino3dm.Mesh):
            f_count = len(geo.Faces)
            v_count = len(geo.Vertices)
            
        pavilion_objects.append({
            'index': i,
            'type': otype,
            'name': attr.Name or f"Obj_{i}",
            'layer': layer_name,
            'dims': (dim_x, dim_y, dim_z),
            'center': (cx, cy, cz),
            'faces': f_count,
            'verts': v_count
        })

print(f"Total objects in Tullinløkka site cluster: {len(pavilion_objects)}")
breps_in_cluster = [o for o in pavilion_objects if o['type'] == 'Brep']
print(f"Breps in site cluster: {len(breps_in_cluster)}")
for b in breps_in_cluster:
    print(f"  Brep [{b['index']}]: Layer '{b['layer']}', Name '{b['name']}', Dims: ({b['dims'][0]:.2f}, {b['dims'][1]:.2f}, {b['dims'][2]:.2f}), Center: ({b['center'][0]:.2f}, {b['center'][1]:.2f}, {b['center'][2]:.2f}), Faces: {b['faces']}")

curves_in_cluster = [o for o in pavilion_objects if 'Curve' in o['type']]
print(f"\nCurves in site cluster: {len(curves_in_cluster)} (curves representing building footprints, contours, runes, etc.)")
