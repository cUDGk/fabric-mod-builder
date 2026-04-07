const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');

let mainWindow;

const VERSION_MAP = {
  '1.20.1': { loader: '0.18.5', fabricApi: '0.92.2+1.20.1', loom: '1.7-SNAPSHOT', java: '17', gradle: '8.10', unobfuscated: false },
  '1.20.4': { loader: '0.18.5', fabricApi: '0.97.0+1.20.4', loom: '1.7-SNAPSHOT', java: '17', gradle: '8.10', unobfuscated: false },
  '1.20.6': { loader: '0.18.5', fabricApi: '0.100.0+1.20.6', loom: '1.7-SNAPSHOT', java: '21', gradle: '8.10', unobfuscated: false },
  '1.21': { loader: '0.18.5', fabricApi: '0.102.0+1.21', loom: '1.14-SNAPSHOT', java: '21', gradle: '9.2.0', unobfuscated: false },
  '1.21.1': { loader: '0.18.5', fabricApi: '0.106.0+1.21.1', loom: '1.14-SNAPSHOT', java: '21', gradle: '9.2.0', unobfuscated: false },
  '1.21.2': { loader: '0.18.5', fabricApi: '0.108.0+1.21.2', loom: '1.14-SNAPSHOT', java: '21', gradle: '9.2.0', unobfuscated: false },
  '1.21.3': { loader: '0.18.5', fabricApi: '0.110.0+1.21.3', loom: '1.14-SNAPSHOT', java: '21', gradle: '9.2.0', unobfuscated: false },
  '1.21.4': { loader: '0.18.5', fabricApi: '0.114.0+1.21.4', loom: '1.14-SNAPSHOT', java: '21', gradle: '9.2.0', unobfuscated: false },
  '1.21.5': { loader: '0.18.5', fabricApi: '0.119.0+1.21.5', loom: '1.14-SNAPSHOT', java: '21', gradle: '9.2.0', unobfuscated: false },
  '1.21.6': { loader: '0.18.5', fabricApi: '0.125.0+1.21.6', loom: '1.14-SNAPSHOT', java: '21', gradle: '9.2.0', unobfuscated: false },
  '1.21.8': { loader: '0.18.5', fabricApi: '0.130.0+1.21.8', loom: '1.14-SNAPSHOT', java: '21', gradle: '9.2.0', unobfuscated: false },
  '1.21.11': { loader: '0.18.5', fabricApi: '0.139.4+1.21.11', loom: '1.14-SNAPSHOT', java: '21', gradle: '9.2.0', unobfuscated: false },
  '26.1': { loader: '0.18.5', fabricApi: '0.145.1+26.1', loom: '1.15-SNAPSHOT', java: '25', gradle: '9.2.0', unobfuscated: true },
  '26.1.1': { loader: '0.18.5', fabricApi: '0.145.3+26.1.1', loom: '1.15-SNAPSHOT', java: '25', gradle: '9.2.0', unobfuscated: true }
};

function createWindow() {
  const iconPath = path.join(__dirname, '..', 'renderer', 'icon.png');
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    title: 'FabricMod Visual Builder',
    ...(fs.existsSync(iconPath) ? { icon: iconPath } : {}),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
  mainWindow.setMenuBarVisibility(false);

  mainWindow.webContents.on('console-message', (event, level, message) => {
    if (level >= 2) console.error(`[Renderer] ${message}`);
  });
  mainWindow.webContents.on('did-fail-load', (event, code, desc) => {
    console.error(`[Load Failed] ${code}: ${desc}`);
  });

  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }
}

function getVersionConfig(mcVersion) {
  return VERSION_MAP[mcVersion] || VERSION_MAP['1.21.4'];
}

function getTemplateMapping(mcVersion) {
  const versionConfig = getVersionConfig(mcVersion);
  return {
    'build.gradle': versionConfig.unobfuscated ? 'build_modern.gradle' : 'build.gradle',
    'settings.gradle': 'settings.gradle',
    'gradle.properties': versionConfig.unobfuscated ? 'gradle_modern.properties' : 'gradle.properties',
    'gradlew.bat': 'gradlew.bat'
  };
}

function applyTemplateVariables(content, { modId, modName, version, mcVersion }) {
  const versionConfig = getVersionConfig(mcVersion);
  return content
    .replace(/\{\{MOD_ID\}\}/g, modId)
    .replace(/\{\{MOD_NAME\}\}/g, modName)
    .replace(/\{\{MOD_VERSION\}\}/g, version)
    .replace(/\{\{MC_VERSION\}\}/g, mcVersion || '1.21.4')
    .replace(/\{\{YARN_MAPPINGS\}\}/g, versionConfig.yarn || '')
    .replace(/\{\{LOADER_VERSION\}\}/g, versionConfig.loader)
    .replace(/\{\{FABRIC_API_VERSION\}\}/g, versionConfig.fabricApi)
    .replace(/\{\{LOOM_VERSION\}\}/g, versionConfig.loom || '1.9-SNAPSHOT')
    .replace(/\{\{JAVA_VERSION\}\}/g, versionConfig.java || '21');
}

function writeGradleWrapperProperties(projectDir, mcVersion) {
  const versionConfig = getVersionConfig(mcVersion);
  const gradleVersion = versionConfig.gradle || '8.10';
  const wrapperProps = `distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-${gradleVersion}-bin.zip
networkTimeout=10000
validateDistributionUrl=true
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
`;

  fs.writeFileSync(
    path.join(projectDir, 'gradle/wrapper/gradle-wrapper.properties'),
    wrapperProps,
    'utf-8'
  );
}

function compareVersions(a, b) {
  const left = String(a).split('.').map(n => parseInt(n, 10) || 0);
  const right = String(b).split('.').map(n => parseInt(n, 10) || 0);
  const length = Math.max(left.length, right.length);
  for (let i = 0; i < length; i++) {
    const diff = (left[i] || 0) - (right[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function findCachedGradleBat(distsDir, targetVersion, depth = 0) {
  if (depth > 6 || !fs.existsSync(distsDir)) return null;
  const entries = fs.readdirSync(distsDir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(distsDir, entry.name);
    if (entry.isFile() && entry.name === 'gradle.bat' && full.includes(`gradle-${targetVersion}`)) {
      return full;
    }
    if (entry.isDirectory()) {
      const found = findCachedGradleBat(full, targetVersion, depth + 1);
      if (found) return found;
    }
  }
  return null;
}

function findGradleCommand(mcVersion) {
  const versionConfig = getVersionConfig(mcVersion);
  const requiredGradle = versionConfig.gradle || '8.10';
  return new Promise((resolve) => {
    exec('gradle --version', { timeout: 10000 }, (err, stdout) => {
      if (!err) {
        const match = (stdout || '').match(/Gradle\s+(\d+(?:\.\d+)+)/i);
        if (match && compareVersions(match[1], requiredGradle) >= 0) {
          resolve('gradle');
          return;
        }
      }

      const userHome = process.env.USERPROFILE || process.env.HOME;
      if (!userHome) {
        resolve(null);
        return;
      }

      const cachedBat = findCachedGradleBat(path.join(userHome, '.gradle', 'wrapper', 'dists'), requiredGradle);
      resolve(cachedBat ? `cmd /c "${cachedBat}"` : null);
    });
  });
}

async function maybeGenerateGradleWrapper(projectDir, mcVersion) {
  const versionConfig = getVersionConfig(mcVersion);
  const gradleCmd = await findGradleCommand(mcVersion);
  if (!gradleCmd) {
    const note = [
      'Gradle wrapper files could not be generated automatically.',
      `Reason: Gradle ${versionConfig.gradle || '8.10'} or newer was not found locally.`,
      '',
      'Run one of the following later from this project directory:',
      '  gradle wrapper',
      '  gradlew.bat wrapper'
    ].join('\n');
    fs.writeFileSync(path.join(projectDir, 'GRADLE_SETUP.txt'), note, 'utf-8');
    return {
      ok: false,
      reason: 'gradle-not-found',
      note
    };
  }

  return new Promise((resolve) => {
    exec(`${gradleCmd} wrapper --no-daemon`, {
      cwd: projectDir,
      timeout: 120000,
      env: { ...process.env }
    }, (err, stdout, stderr) => {
      if (err) {
        const note = [
          'Gradle wrapper generation failed.',
          '',
          'Command:',
          `  ${gradleCmd} wrapper --no-daemon`,
          '',
          'Error:',
          `  ${err.message}`,
          '',
          'stderr:',
          (stderr || '').trim() || '(empty)',
          '',
          'stdout:',
          (stdout || '').trim() || '(empty)'
        ].join('\n');
        fs.writeFileSync(path.join(projectDir, 'GRADLE_SETUP.txt'), note, 'utf-8');
        resolve({
          ok: false,
          reason: 'wrapper-generation-failed',
          note
        });
        return;
      }

      resolve({ ok: true });
    });
  });
}

function writeProjectFiles(projectDir, exportData) {
  const { modId, modName, version, mcVersion, javaFiles, recipes, fabricModJson, resources } = exportData;
  const basePackage = `com/modbuilder/${modId}`;

  const dirs = [
    '',
    'src/main/java/' + basePackage,
    'src/main/resources',
    'src/main/resources/data/' + modId + '/recipes',
    'gradle/wrapper'
  ];
  for (const dir of dirs) {
    fs.mkdirSync(path.join(projectDir, dir), { recursive: true });
  }

  for (const [fileName, content] of Object.entries(javaFiles)) {
    fs.writeFileSync(path.join(projectDir, 'src/main/java', basePackage, fileName), content, 'utf-8');
  }

  if (recipes) {
    for (const [fileName, content] of Object.entries(recipes)) {
      fs.writeFileSync(path.join(projectDir, 'src/main/resources/data', modId, 'recipes', fileName), content, 'utf-8');
    }
  }

  fs.writeFileSync(path.join(projectDir, 'src/main/resources/fabric.mod.json'), fabricModJson, 'utf-8');

  if (resources) {
    for (const [resPath, content] of Object.entries(resources)) {
      const fullPath = path.join(projectDir, 'src/main/resources', resPath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      if (content && typeof content === 'object' && content.encoding === 'base64') {
        fs.writeFileSync(fullPath, Buffer.from(content.content || '', 'base64'));
      } else {
        fs.writeFileSync(fullPath, content, 'utf-8');
      }
    }
  }

  const templatesDir = path.join(__dirname, '..', 'templates');
  const templateMapping = getTemplateMapping(mcVersion);
  for (const [targetFile, templateName] of Object.entries(templateMapping)) {
    const templatePath = path.join(templatesDir, templateName);
    if (!fs.existsSync(templatePath)) continue;
    const template = fs.readFileSync(templatePath, 'utf-8');
    const rendered = applyTemplateVariables(template, { modId, modName, version, mcVersion });
    fs.writeFileSync(path.join(projectDir, targetFile), rendered, 'utf-8');
  }

  writeGradleWrapperProperties(projectDir, mcVersion);
}

function validateJavaFiles(javaFiles) {
  const javaErrors = [];
  for (const [fileName, content] of Object.entries(javaFiles)) {
    if (!content.includes('package ')) {
      javaErrors.push(`${fileName}: missing package declaration`);
    }

    const openBraces = (content.match(/\{/g) || []).length;
    const closeBraces = (content.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      javaErrors.push(`${fileName}: mismatched braces (${openBraces} vs ${closeBraces})`);
    }

    if (!content.includes('class ') && !content.includes('interface ')) {
      javaErrors.push(`${fileName}: missing class or interface declaration`);
    }

    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('import ') && !line.endsWith(';')) {
        javaErrors.push(`${fileName}:${i + 1}: import statement is missing a semicolon`);
      }
    }
  }
  return javaErrors;
}

async function detectJavaVersion() {
  return new Promise((resolve) => {
    exec('java -version', { timeout: 5000 }, (err, stdout, stderr) => {
      resolve(!err ? (stderr || stdout) : null);
    });
  });
}

async function runGradleBuild(projectDir, mcVersion) {
  const versionConfig = getVersionConfig(mcVersion);
  const gradleCmd = await findGradleCommand(mcVersion);
  if (!gradleCmd) {
    return {
      success: null,
      note: [
        `Gradle ${versionConfig.gradle || '8.10'} or newer was not found locally.`,
        'Install Gradle or generate wrapper files, then run a local build again.'
      ].join('\n')
    };
  }

  mainWindow.webContents.send('build-progress', 'Running Gradle build...');
  return new Promise((resolve) => {
    exec(`${gradleCmd} build --no-daemon`, {
      cwd: projectDir,
      timeout: 600000,
      env: { ...process.env },
      maxBuffer: 10 * 1024 * 1024
    }, (err, stdout, stderr) => {
      resolve({
        success: !err,
        stdout: (stdout || '').slice(-3000),
        stderr: (stderr || '').slice(-3000),
        error: err ? err.message : null
      });
    });
  });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());

ipcMain.handle('get-app-version', async () => app.getVersion());

ipcMain.handle('save-project', async (event, data) => {
  const { filePath } = await dialog.showSaveDialog(mainWindow, {
    title: 'Save Project',
    defaultPath: 'my-mod.fmb',
    filters: [{ name: 'FabricMod Builder Project', extensions: ['fmb'] }]
  });

  if (!filePath) return null;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  return filePath;
});

ipcMain.handle('load-project', async () => {
  const { filePaths } = await dialog.showOpenDialog(mainWindow, {
    title: 'Load Project',
    filters: [{ name: 'FabricMod Builder Project', extensions: ['fmb'] }],
    properties: ['openFile']
  });

  if (!filePaths || filePaths.length === 0) return null;
  const content = fs.readFileSync(filePaths[0], 'utf-8');
  return JSON.parse(content);
});

ipcMain.handle('export-mod', async (event, exportData) => {
  const { modId } = exportData;
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    title: 'Choose Export Folder',
    defaultPath: process.env.USERPROFILE || process.env.HOME,
    buttonLabel: 'Export Here',
    properties: ['openDirectory', 'createDirectory']
  });

  if (canceled || !filePaths || filePaths.length === 0) return null;

  const filePath = path.join(filePaths[0], modId || 'my-mod');

  writeProjectFiles(filePath, exportData);
  const wrapperResult = await maybeGenerateGradleWrapper(filePath, exportData.mcVersion);
  return {
    filePath,
    wrapper: wrapperResult
  };
});

ipcMain.handle('build-check', async (event, exportData) => {
  const tmpDir = path.join(os.tmpdir(), 'fmb-build-' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  mainWindow.webContents.send('build-progress', 'Preparing temporary project...');
  writeProjectFiles(tmpDir, exportData);

  mainWindow.webContents.send('build-progress', 'Running static Java checks...');
  const syntaxErrors = validateJavaFiles(exportData.javaFiles);

  try {
    const fabricModJson = JSON.parse(exportData.fabricModJson);
    if (!fabricModJson.id) syntaxErrors.push('fabric.mod.json: missing id');
    if (!fabricModJson.entrypoints || !fabricModJson.entrypoints.main) {
      syntaxErrors.push('fabric.mod.json: missing main entrypoint');
    }
  } catch (e) {
    syntaxErrors.push(`fabric.mod.json: JSON parse error - ${e.message}`);
  }

  if (exportData.recipes) {
    for (const [name, content] of Object.entries(exportData.recipes)) {
      try {
        JSON.parse(content);
      } catch (e) {
        syntaxErrors.push(`recipe ${name}: JSON parse error - ${e.message}`);
      }
    }
  }

  mainWindow.webContents.send('build-progress', 'Checking Java runtime...');
  let gradleResult;
  const javaCheck = await detectJavaVersion();

  if (!javaCheck) {
    gradleResult = {
      success: null,
      note: 'Java (JDK) was not found, so Gradle build verification was skipped.'
    };
  } else {
    mainWindow.webContents.send('build-progress', `Java detected: ${javaCheck.split('\n')[0]}`);
    gradleResult = await runGradleBuild(tmpDir, exportData.mcVersion);
  }

  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch (e) {
    // Best-effort cleanup only.
  }

  return {
    syntaxErrors,
    fileCount: Object.keys(exportData.javaFiles).length,
    gradle: gradleResult
  };
});
