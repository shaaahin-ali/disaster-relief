import os
files = [
    r'c:\Users\shahi\disaster-new\disaster-relief\disaster-relief2ui\app\volunteer\requests\page.tsx',
    r'c:\Users\shahi\disaster-new\disaster-relief\disaster-relief2ui\app\resources\page.tsx',
    r'c:\Users\shahi\disaster-new\disaster-relief\disaster-relief2ui\app\request-help\page.tsx',
    r'c:\Users\shahi\disaster-new\disaster-relief\disaster-relief2ui\app\dashboard\page.tsx',
    r'c:\Users\shahi\disaster-new\disaster-relief\disaster-relief2ui\app\all-requests\page.tsx'
]

import_str = 'import NeuralBackground from "@/components/ui/flow-field-background";\n'
bg_str = '      <NeuralBackground className="absolute inset-0 z-[1] pointer-events-none opacity-30" color="#2dd4bf" trailOpacity={0.15} speed={0.5} particleCount={400} />\n'

for fpath in files:
    if not os.path.exists(fpath):
        continue
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'NeuralBackground' not in content:
        if '"use client";' in content:
            content = content.replace('"use client";', '"use client";\n' + import_str, 1)
        if '{/* Ambient background glows */}' in content:
            content = content.replace('{/* Ambient background glows */}', bg_str + '      {/* Ambient background glows */}', 1)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
