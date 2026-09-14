import os
import gc
from PIL import Image

# Focused Step 3B asset derivation — strictly 3 minimal lightweight derivatives
tasks = [
    {
        'project': 'Ribbon of Life (Technopark Phase IV)',
        'src': 'client-assets/PORTFOLIO PNG_s/15_PROJECT 02_ Techno-park _PAGE 6.png',
        'dest': 'public/assets/images/projects/ribbon-of-life/ribbon-hero.webp',
        'max_w': 2560, 'max_h': 1440,
        'quality': 88,
        'crop_box': None, # We take the full presentation board showing the master aerial 3D render
        'purpose': 'Master aerial perspective of 42-storey biomimetic tower and landscape loop'
    },
    {
        'project': "Nature's Nest / Eco Resort",
        'src': 'client-assets/Eco ressort_03/PNG/PNG -PART-1 GRIHA/GR2.jpg',
        'dest': 'public/assets/images/projects/eco-resort/eco-resort-hero.webp',
        'max_w': 2560, 'max_h': 1440,
        'quality': 88,
        'crop_box': None,
        'purpose': 'Architectural 4K render of hillside timber stilt structures and rammed-earth contours'
    },
    {
        'project': 'Flow Spire (Watchtower)',
        'src': 'client-assets/WATCH TOWER_FLOW SPIRE_05/PNG/VIVA_08_05_25.png',
        'dest': 'public/assets/images/projects/flow-spire/flow-spire-hero.webp',
        'max_w': 2480, 'max_h': 1754,
        'quality': 88,
        'crop_box': None,
        'purpose': 'Presentation sheet showing aerodynamic form evolution, elevation, and 3D architectural model'
    }
]

print("=== STARTING STEP 3B ASSET PREPARATION ===")
for t in tasks:
    src_path = t['src']
    dest_path = t['dest']
    assert os.path.exists(src_path), f"Source missing: {src_path}"
    
    src_size = os.path.getsize(src_path)
    with Image.open(src_path) as img:
        src_dims = img.size
        
        # RGBA / Palette conversion to RGB
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            rgb = Image.new('RGB', img.size, (255, 255, 255))
            rgb.paste(img)
        else:
            rgb = img.convert('RGB')
            
        rgb.thumbnail((t['max_w'], t['max_h']), Image.Resampling.LANCZOS)
        out_dims = rgb.size
        
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        rgb.save(dest_path, 'WEBP', quality=t['quality'], method=6)
        
    out_size = os.path.getsize(dest_path)
    ratio = round((1.0 - (out_size / src_size)) * 100.0, 1)
    
    print(f"[OK] {t['project']}")
    print(f"     Source: {src_path} ({src_dims}, {round(src_size/1024.0, 1)} KB)")
    print(f"     Dest:   {dest_path} ({out_dims}, {round(out_size/1024.0, 1)} KB) [-{ratio}%]")
    gc.collect()

print("=== STEP 3B ASSET PREPARATION COMPLETE ===")
