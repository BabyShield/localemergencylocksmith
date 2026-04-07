const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'src', 'app', 'areas', '[slug]');
const targetDir = path.join(__dirname, '..', 'src', 'app', 'locksmith', '[slug]');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursiveSync(sourceDir, targetDir);
console.log('Duplicated architecture to /locksmith/[slug]');

// 1. Refit page.tsx
const areaPagePath = path.join(targetDir, 'page.tsx');
let areaPageContent = fs.readFileSync(areaPagePath, 'utf8');

areaPageContent = areaPageContent.replace(
  /const title = `Emergency Locksmith \$\{area\.name\} \| 24\/7 \| No VAT \| Call Now`/g,
  'const title = `Locksmith ${area.name} | 24/7 Local Expert | No Call-Out Fee`'
);
areaPageContent = areaPageContent.replace(
  /canonical: `\$\{SITE_CONFIG\.domain\}\/areas\/\$\{slug\}`/g,
  'canonical: `${SITE_CONFIG.domain}/locksmith/${slug}`'
);
areaPageContent = areaPageContent.replace(
  /url: `\$\{SITE_CONFIG\.domain\}\/areas\/\$\{slug\}`/g,
  'url: `${SITE_CONFIG.domain}/locksmith/${slug}`'
);
areaPageContent = areaPageContent.replace(
  /heading={`Emergency Locksmith in \$\{area\.name\}`}/g,
  'heading={`Locksmith ${area.name}`}'
);
areaPageContent = areaPageContent.replace(
  /href={`\/areas\/\$\{n\.slug\}`}/g,
  'href={`/locksmith/${n.slug}`}'
);

fs.writeFileSync(areaPagePath, areaPageContent);
console.log('Refitted /locksmith/[slug]/page.tsx');

// 2. Refit streets page.tsx
const streetPagePath = path.join(targetDir, 'streets', '[streetSlug]', 'page.tsx');
let streetPageContent = fs.readFileSync(streetPagePath, 'utf8');

streetPageContent = streetPageContent.replace(
  /const title = `Local Locksmith \$\{street\.name\}, \$\{area\.name\} \| 24\/7 Fast Response`/g,
  'const title = `Locksmith ${street.name}, ${area.name} | Emergency 24/7 Response`'
);
streetPageContent = streetPageContent.replace(
  /canonical: `\$\{SITE_CONFIG\.domain\}\/areas\/\$\{slug\}\/streets\/\$\{streetSlug\}`/g,
  'canonical: `${SITE_CONFIG.domain}/locksmith/${slug}/streets/${streetSlug}`'
);
streetPageContent = streetPageContent.replace(
  /url: `\$\{SITE_CONFIG\.domain\}\/areas\/\$\{slug\}\/streets\/\$\{streetSlug\}`/g,
  'url: `${SITE_CONFIG.domain}/locksmith/${slug}/streets/${streetSlug}`'
);
streetPageContent = streetPageContent.replace(
  /heading={`Emergency Locksmith on \$\{street\.name\}`}/g,
  'heading={`Locksmith ${street.name}, ${area.name}`}'
);

fs.writeFileSync(streetPagePath, streetPageContent);
console.log('Refitted streets page.tsx');

// 3. Refit services page.tsx
const servicePagePath = path.join(targetDir, '[serviceSlug]', 'page.tsx');
if (fs.existsSync(servicePagePath)) {
  let servicePageContent = fs.readFileSync(servicePagePath, 'utf8');
  servicePageContent = servicePageContent.replace(
    /canonical: `\$\{SITE_CONFIG\.domain\}\/areas\/\$\{slug\}\/\$\{serviceSlug\}`/g,
    'canonical: `${SITE_CONFIG.domain}/locksmith/${slug}/${serviceSlug}`'
  );
  servicePageContent = servicePageContent.replace(
    /url: `\$\{SITE_CONFIG\.domain\}\/areas\/\$\{slug\}\/\$\{serviceSlug\}`/g,
    'url: `${SITE_CONFIG.domain}/locksmith/${slug}/${serviceSlug}`'
  );
  fs.writeFileSync(servicePagePath, servicePageContent);
  console.log('Refitted services page.tsx');
}
