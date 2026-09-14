import os
import gc
from PIL import Image

tasks = [
    {
        'project': 'Möbius / On the path to Rediscovery',
        'src': 'client-assets/On the path to Rediscovery_06/PNG/RENDER/render-2.png',
        'dest': 'public/assets/images/projects/mobius/mobius-hero.webp',
        'max_w': 2560, 'max_h': 1440,
        'quality': 88,
        'purpose': 'Hero perspective of the continuous figure-eight timber Möbius loop'
    },
    {
        'project': 'Möbius / On the path to Rediscovery',
        'src': 'client-assets/On the path to Rediscovery_06/PNG/RENDER/render-1.png',
        'dest': 'public/assets/images/projects/mobius/mobius-detail-01.webp',
        'max_w': 2560, 'max_h': 1440,
        'quality': 88,
        'purpose': 'Ground human eye-level plaza view with Old Norse inscription'
    },
    {
        'project': 'Möbius / On the path to Rediscovery',
        'src': 'client-assets/On the path to Rediscovery_06/PNG/RENDER/render-3.png',
        'dest': 'public/assets/images/projects/mobius/mobius-detail-02.webp',
        'max_w': 2560, 'max_h': 1440,
        'quality': 88,
        'purpose': 'Axonometric aerial perspective showing urban landscape integration'
    },
    {
        'project': 'Möbius / On the path to Rediscovery',
        'src': 'client-assets/PORTFOLIO PNG_s/29_PROJECT 05_ TPOR _PAGE 2.png',
        'dest': 'public/assets/images/projects/mobius/mobius-process-01.webp',
        'max_w': 2480, 'max_h': 1754,
        'quality': 88,
        'purpose': 'Parametric Grasshopper definition, topological generation and section'
    },
    {
        'project': 'Cultural Oasis',
        'src': 'client-assets/Cultural Oasis_01/PNG/RENDER/Image21.jpg',
        'dest': 'public/assets/images/projects/cultural-oasis/cultural-oasis-hero.webp',
        'max_w': 2560, 'max_h': 1440,
        'quality': 88,
        'purpose': 'Hero daytime view of stepped central amphitheater, sacred pool and heritage pavilion'
    },
    {
        'project': 'Cultural Oasis',
        'src': 'client-assets/Cultural Oasis_01/PNG/RENDER/Image6.jpg',
        'dest': 'public/assets/images/projects/cultural-oasis/cultural-oasis-detail-01.webp',
        'max_w': 2560, 'max_h': 1440,
        'quality': 88,
        'purpose': 'Night illuminated atmosphere of water court and tensile canopy'
    },
    {
        'project': 'Cultural Oasis',
        'src': 'client-assets/Cultural Oasis_01/PNG/RENDER/Image18.png',
        'dest': 'public/assets/images/projects/cultural-oasis/cultural-oasis-detail-02.webp',
        'max_w': 2560, 'max_h': 1440,
        'quality': 88,
        'purpose': 'Circular pedestrian promenade overlooking diagrid bio-dome structures'
    },
    {
        'project': 'Cultural Oasis',
        'src': 'client-assets/Cultural Oasis_01/PNG/RENDER/Image16.jpg',
        'dest': 'public/assets/images/projects/cultural-oasis/cultural-oasis-detail-03.webp',
        'max_w': 2560, 'max_h': 1440,
        'quality': 88,
        'purpose': 'Masterplan top-down orthogonal view of site geometry and landscape'
    },
    {
        'project': 'Cultural Oasis',
        'src': 'client-assets/Cultural Oasis_01/PDF/KVN ANA/Artboard 3.png',
        'dest': 'public/assets/images/projects/cultural-oasis/cultural-oasis-process-01.webp',
        'max_w': 2483, 'max_h': 1754,
        'quality': 88,
        'purpose': 'Katra regional urban analysis diagram (Kevin Lynch methodology)'
    },
    {
        'project': 'Cultural Oasis',
        'src': 'client-assets/Cultural Oasis_01/PNG/PHYSICAL MODEL/WhatsApp Image 2026-06-17 at 23.06.18.jpeg',
        'dest': 'public/assets/images/projects/cultural-oasis/cultural-oasis-model-01.webp',
        'max_w': 2040, 'max_h': 1148,
        'quality': 88,
        'purpose': 'Studio photograph of the physical stepped foam contour model'
    }
]

print("=== STARTING ASSET PREPARATION ===")
results = []

for t in tasks:
    src_size = os.path.getsize(t['src'])
    with Image.open(t['src']) as img:
        src_dims = img.size
        
        # RGB conversion
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            rgb = Image.new('RGB', img.size, (255, 255, 255))
            rgb.paste(img)
        else:
            rgb = img.convert('RGB')
            
        rgb.thumbnail((t['max_w'], t['max_h']), Image.Resampling.LANCZOS)
        out_dims = rgb.size
        
        os.makedirs(os.path.dirname(t['dest']), exist_ok=True)
        rgb.save(t['dest'], 'WEBP', quality=t['quality'], method=6)
        
    out_size = os.path.getsize(t['dest'])
    
    # Read-back verification
    with Image.open(t['dest']) as v:
        assert v.size == out_dims
        assert v.format == 'WEBP'
        
    ratio = round((1.0 - (out_size / src_size)) * 100.0, 1)
    
    results.append({
        'project': t['project'],
        'src': t['src'],
        'src_dims': src_dims,
        'src_size_kb': round(src_size / 1024.0, 1),
        'dest': t['dest'],
        'dest_dims': out_dims,
        'dest_size_kb': round(out_size / 1024.0, 1),
        'ratio': ratio,
        'quality': t['quality'],
        'purpose': t['purpose']
    })
    print(f"Processed: {t['dest']}")
    print(f"  Source: {src_dims} ({round(src_size/1024.0, 1)} KB)")
    print(f"  Derivative: {out_dims} ({round(out_size/1024.0, 1)} KB) [-{ratio}%]")
    gc.collect()

print("\n=== COMPLETED ALL 10 DERIVATIVES ===")
