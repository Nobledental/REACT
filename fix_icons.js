const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data/treatments.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Regex to find icon: ComponentName and replace with icon: "ComponentName"
// We look for icon: followed by a word starting with uppercase (component)
// and NOT starting with a quote.
content = content.replace(/icon:\s*([A-Z][a-zA-Z0-9]+)/g, (match, p1) => {
    return `icon: "${p1}"`;
});

// Also remove the imports of Lucide icons since we won't reference them directly anymore
// (Or leave them, they'll just be unused, but TS might complain)
// Let's comment out the import line to be safe, or just leave it. 
// TS "unused variable" is usually a warning, not error in some configs, but Next build might fail.
// Let's replace the import line with a comment.
content = content.replace(/import\s+{.*}\s+from\s+'lucide-react';/, "// Icons imported via string map in component");

fs.writeFileSync(filePath, content);
console.log("Converted icons to strings.");
