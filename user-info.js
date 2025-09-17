#!/usr/bin/env node

/**
 * User Information Script
 * Outputs information about the user who ran this script
 */

const os = require('os');
const path = require('path');

function getUserInfo() {
    const userInfo = {
        username: os.userInfo().username,
        homeDirectory: os.userInfo().homedir,
        shell: os.userInfo().shell || 'Unknown',
        platform: os.platform(),
        architecture: os.arch(),
        hostname: os.hostname(),
        nodeVersion: process.version,
        currentWorkingDirectory: process.cwd(),
        scriptPath: __filename,
        environment: process.env.NODE_ENV || 'development',
        uptime: Math.floor(os.uptime()),
        totalMemory: Math.round(os.totalmem() / 1024 / 1024 / 1024 * 100) / 100, // GB
        freeMemory: Math.round(os.freemem() / 1024 / 1024 / 1024 * 100) / 100, // GB
        timestamp: new Date().toISOString()
    };

    return userInfo;
}

function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) {
        return `${days} days, ${hours} hours, ${minutes} minutes`;
    } else if (hours > 0) {
        return `${hours} hours, ${minutes} minutes`;
    } else {
        return `${minutes} minutes`;
    }
}

function displayUserInfo() {
    const info = getUserInfo();
    
    console.log('🔍 User Information');
    console.log('==================');
    console.log(`👤 Username: ${info.username}`);
    console.log(`🏠 Home Directory: ${info.homeDirectory}`);
    console.log(`🐚 Shell: ${info.shell}`);
    console.log(`💻 Platform: ${info.platform}`);
    console.log(`🏗️  Architecture: ${info.architecture}`);
    console.log(`🌐 Hostname: ${info.hostname}`);
    console.log(`📁 Current Directory: ${info.currentWorkingDirectory}`);
    console.log(`📄 Script Path: ${info.scriptPath}`);
    console.log('');
    console.log('🚀 System Information');
    console.log('=====================');
    console.log(`⚡ Node.js Version: ${info.nodeVersion}`);
    console.log(`🔧 Environment: ${info.environment}`);
    console.log(`⏰ System Uptime: ${formatUptime(info.uptime)}`);
    console.log(`💾 Total Memory: ${info.totalMemory} GB`);
    console.log(`🆓 Free Memory: ${info.freeMemory} GB`);
    console.log(`🕐 Timestamp: ${info.timestamp}`);
}

// Run the script if called directly
if (require.main === module) {
    displayUserInfo();
}

module.exports = { getUserInfo, displayUserInfo, formatUptime };