import os
import rhino3dm

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'client-assets', 'On the path to Rediscovery_06', '3D', 'MOBIUS_03.3dm')
model = rhino3dm.File3dm.Read(MODEL_PATH)

print("--- LAYER 'Default' BREPS ---")
for i, obj in enumerate(model.Objects):
    geo = obj.Geometry
    if isinstance(geo, rhino3dm.Brep):
        attr = obj.Attributes
        layer_name = model.Layers[attr.LayerIndex].Name if 0 <= attr.LayerIndex < len(model.Layers) else "Unknown"
        if layer_name == 'Default':
            bb = geo.GetBoundingBox()
            dim_x = bb.Max.X - bb.Min.X
            dim_y = bb.Max.Y - bb.Min.Y
            dim_z = bb.Max.Z - bb.Min.Z
            
            # Count render mesh faces
            f_count = 0
            v_count = 0
            for f in geo.Faces:
                m = f.GetMesh(rhino3dm.MeshType.Render)
                if m:
                    f_count += len(m.Faces)
                    v_count += len(m.Vertices)
            
            name = attr.Name or f"Brep_{i}"
            mat_idx = attr.MaterialIndex
            mat_name = model.Materials[mat_idx].Name if 0 <= mat_idx < len(model.Materials) else "None"
            print(f"[{i}] Name: '{name}', Dims: ({dim_x:.2f}, {dim_y:.2f}, {dim_z:.2f}), Center: ({(bb.Min.X+bb.Max.X)/2:.2f}, {(bb.Min.Y+bb.Max.Y)/2:.2f}, {(bb.Min.Z+bb.Max.Z)/2:.2f}), Faces: {f_count}, Verts: {v_count}, Mat: '{mat_name}'")
