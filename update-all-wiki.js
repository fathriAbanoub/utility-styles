#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting Complete Wiki Update Process...');
console.log('');

try {
  // Run all wiki update agents
  console.log('📝 Running basic wiki updates...');
  execSync('node wiki-agent-simple.js', { stdio: 'inherit', cwd: __dirname });
  
  console.log('');
  console.log('📝 Running complete wiki updates...');
  execSync('node wiki-agent-complete.js', { stdio: 'inherit', cwd: __dirname });
  
  console.log('');
  console.log('📝 Running final wiki updates...');
  execSync('node wiki-agent-final.js', { stdio: 'inherit', cwd: __dirname });
  
  console.log('');
  console.log('✅ ALL WIKI FILES UPDATED SUCCESSFULLY!');
  console.log('');
  console.log('📚 Updated Wiki Files:');
  console.log('  ✓ Home.md - Main documentation page');
  console.log('  ✓ Installation.md - Setup and installation guide');
  console.log('  ✓ Utility-Classes.md - Complete utility reference');
  console.log('  ✓ Components.md - Component library documentation');
  console.log('  ✓ Font-System.md - Typography and font management');
  console.log('  ✓ API-Reference.md - Complete API documentation');
  console.log('  ✓ Fluid-Typography.md - NEW: Advanced typography system');
  console.log('  ✓ Performance-Optimization.md - NEW: Build optimization tools');
  console.log('  ✓ Build-System.md - NEW: Build tools and workflow');
  console.log('');
  console.log('🎉 Bob Styles 2.0 wiki is now complete and up to date!');
  console.log('');
  console.log('📖 Next steps:');
  console.log('  1. Review the updated documentation');
  console.log('  2. Commit changes to the wiki repository');
  console.log('  3. Update any remaining files as needed');
  
} catch (error) {
  console.error('❌ Error updating wiki:', error.message);
  process.exit(1);
}
