import os
import re
from PIL import Image

print("=== COMPONENT & ASSET INTEGRITY AUDIT ===")

src_dir = "src"
errors = []

# 1. Check all imports in src
for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith((".js", ".jsx", ".css")):
            p = os.path.join(root, f)
            with open(p, "r", encoding="utf-8") as fh:
                content = fh.read()
            # Check import paths
            import_matches = re.findall(r"from\s+['\"]([^'\"]+)['\"]", content)
            for imp in import_matches:
                if imp.startswith("."):
                    dir_of_file = os.path.dirname(p)
                    resolved = os.path.normpath(os.path.join(dir_of_file, imp))
                    exists = (
                        os.path.exists(resolved) or
                        os.path.exists(resolved + ".jsx") or
                        os.path.exists(resolved + ".js") or
                        os.path.exists(resolved + ".css")
                    )
                    if not exists:
                        errors.append(f"{p}: Broken import '{imp}'")

# 2. Check asset paths in all files in src
all_asset_paths = set()
for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith((".js", ".jsx", ".css")):
            p = os.path.join(root, f)
            with open(p, "r", encoding="utf-8") as fh:
                matches = re.findall(r"['\"](/assets/images/[^'\"]+)['\"]", fh.read())
                for m in matches:
                    all_asset_paths.add(m)

print(f"Total unique asset paths referenced in code: {len(all_asset_paths)}")
for ap in sorted(all_asset_paths):
    local_path = "public" + ap
    if not os.path.exists(local_path):
        errors.append(f"Missing asset file on disk: {local_path}")
    else:
        with Image.open(local_path) as img:
            size_kb = round(os.path.getsize(local_path) / 1024, 1)
            print(f"  [OK] {local_path:<65} {img.format} {img.size} ({size_kb} KB)")

# 3. Check 3D model paths in src
all_model_paths = set()
for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith((".js", ".jsx")):
            p = os.path.join(root, f)
            with open(p, "r", encoding="utf-8") as fh:
                matches = re.findall(r"['\"](/assets/models/[^'\"]+\.glb)['\"]", fh.read())
                for m in matches:
                    all_model_paths.add(m)

print(f"\nTotal unique 3D model paths referenced in code: {len(all_model_paths)}")
for mp in sorted(all_model_paths):
    local_path = "public" + mp
    if not os.path.exists(local_path):
        errors.append(f"Missing 3D model on disk: {local_path}")
    else:
        size_kb = round(os.path.getsize(local_path) / 1024, 1)
        print(f"  [OK] {local_path:<65} GLB ({size_kb} KB)")

print(f"\nTotal integrity errors: {len(errors)}")
for e in errors:
    print("  ERROR:", e)

assert len(errors) == 0, "Integrity audit failed!"
print("=== COMPONENT & ASSET INTEGRITY: 100% VERIFIED ===")
