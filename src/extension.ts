// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as child from 'child_process';

import * as fs from 'fs';
import * as path from 'path';

//npm install yauzl --save
//npm install @types/yauzl --save
import * as yauzl from 'yauzl';

import MetaDataManager from './logic/MetaData';
import TreeViewProvider from './ui/TreeViewProvider';

// Функция вызывается самим редактором в случае возникновения события,
// которое должно активировать наше расширение,
// так как оно не активно в момент запуска
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "eskaext" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('eskaext.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from eskaext!');
	});  

  const disposableVersion = vscode.commands.registerCommand('eskaext.version', () => {
    let eskaextVersion = checkForVersionEskaext();
    
    if (eskaextVersion === undefined || eskaextVersion.startsWith('error:')) {
      vscode.window.showWarningMessage("EskaExt not found((");
    }
    else {
      vscode.window.showInformationMessage(`${eskaextVersion} successfully.`);
    }
  });

  // Созданная команда должна быть передана в подписки
	context.subscriptions.push(disposable);
  context.subscriptions.push(disposableVersion);

  //////////////////////////////////////////////////////////////////
  
  /*// Регистрация Tree View
  const treeViewProvider = new TreeViewProvider();
  vscode.window.registerTreeDataProvider('eskaexttree', treeViewProvider);

  // Команда для обновления Tree View
  let refreshTreeViewDisposable = vscode.commands.registerCommand('eskaext.refreshtv', () => {
    treeViewProvider.refresh();
  });

  context.subscriptions.push(refreshTreeViewDisposable);

  let onTreeItemClickDisposable = vscode.commands.registerCommand('eskaext.onTreeItemClick', (id: string) => {
    vscode.window.showInformationMessage(`Clicked on item with ID: ${id}`);
  });

  context.subscriptions.push(onTreeItemClickDisposable);*/

  // Инициализация списка MetaData
  const metaDataManager = MetaDataManager.initialize();

  // Создаем TreeViewProvider
  const treeViewProvider = new TreeViewProvider(metaDataManager);

  // Регистрируем TreeView
  vscode.window.registerTreeDataProvider('eskaexttree', treeViewProvider);

  // Команда для обновления TreeView
  let refreshTreeViewDisposable = vscode.commands.registerCommand('eskaext.refreshTreeView', () => {
      treeViewProvider.refresh();
  });

  // Команда нажатие по Item
  let onTreeItemClickDisposable = vscode.commands.registerCommand('eskaext.onTreeItemClick', (element) => {
    vscode.window.showInformationMessage(`Clicked on: ${element.label}`);
  });

  // Добавляем команды в контекст
  context.subscriptions.push(refreshTreeViewDisposable);  
  context.subscriptions.push(onTreeItemClickDisposable);



  //
  //let commandImportDisposable = vscode.commands.registerCommand('eskaext.cmdimport', () => {
  //  vscode.window.showInformationMessage('Command 1 executed!');
  //  importConfiguration();
  //});

  let commandImportDisposable = vscode.commands.registerCommand('eskaext.cmdimport', importConfiguration);
  context.subscriptions.push(commandImportDisposable);//, command2Disposable, command3Disposable);

}

// Будет вызвана в процессе остановки нашего расширения
export function deactivate() {

}

//////////////////////////////////////////////////////////////////
export function checkForVersionEskaext(): string | undefined {
  console.log('checkForVersionEskaext!');
  return checkVersion('eskaext -v');
}

export function checkVersion(cmd: string): string | undefined {
  try {
    let result = child.execSync(cmd);
    return result.toString('utf8').trim();
  } catch (error) {
    return "error: test" + error;
  }
}

//////////////////////////////////////////////////////////////////
async function importConfiguration() {

  const exePath = 'C:\\Program Files\\1cv8full\\8.3.25.1445\\bin\\1cv8.exe';

  const cfgNamePath = 'E:\\Database\\1c\\ruszup';
  
  //__dirname = e:\Working\vscode\eskaext\out
  const cfgPathZip = __dirname + '\\';
  const xmlFileName = 'ruszup.zip';
  const xmlZipFilePath = path.join(__dirname, xmlFileName);

/*
https://wonderland.v8.1c.ru/blog/razvitie-vygruzki-zagruzki-konfiguratsii-v-iz-xml/?sphrase_id=4562
https://wonderland.v8.1c.ru/blog/inkrementalnaya-vygruzka-konfiguratsii-v-xml/

Используем в пакетном режиме ключ /DumpConfigToFiles с первым параметром -listFile _полный путь к файлу
с описанием состава объектов для выгрузки_

Сам файл состава объектов для выгрузки, файл записанный в кодировке UTF8, содержимое файла (пример):
Configuration
Document.БольничныйЛист

Т.е. выгружается объект КореньКонфигурации (включая подчиненные объекты, такие как справка,
модуль приложения, модуль сеанса, логотип и т.п.) и Документ.БольничныйЛист (включая подчиненные объекты
такие как Формы, МодульОбъекта и т.п.) 

"C:\Program Files (x86)\1cv8\8.3.22.1709\bin\1cv8.exe" DESIGNER /DisableStartupMessages /DisableStartupDialogs /S "DEV1C:1541\dev2" /N "" /P "" /ConfigurationRepositoryS "tcp://DEV1C:1643/HrCopy" /ConfigurationRepositoryN "Пользователь" /ConfigurationRepositoryP "Пароль" /DumpConfigToFiles "\\shfile\Релизы\logs\cashe\" -listFile "\\shfile\Релизы\logs\objdump.xml" /Out "\\shfile\Релизы\logs\report_20230411.log" -NoTruncate 


чтоб не загружать всю конфигурацию целиком, а только нужные данные, используйте команду:
"C:\Program Files (x86)\1cv8\8.3.22.1709\bin\1cv8.exe" DESIGNER /DisableStartupMessages /DisableStartupDialogs /S "DEV1C:1541\dev2" /N "" /P "" /ConfigurationRepositoryS "tcp://DEV1C:1643/HrCopy" /ConfigurationRepositoryN "Пользователь" /ConfigurationRepositoryP "Пароль" /LoadConfigFromFiles "\\shfile\Релизы\logs\cashe\" -listFile "\\shfile\Релизы\logs\objload.xml" /Out "\\shfile\Релизы\logs\report_20230411.log" -NoTruncate 

*/

  const args = ['DESIGNER /DisableStartupMessages', // /DisableStartupDialogs тогда нужен пользователь и пароль
                '/F', cfgNamePath, '/DumpConfigToFiles', cfgPathZip,
                '-format Hierarchical -ignoreUnresolvedReferences -Archive', xmlFileName];

  child.exec(`"${exePath}" ${args.join(' ')}`, (error, stdout, stderr) => {
    if (error) {
        vscode.window.showErrorMessage(`Failed to run 1C: Designer: ${error.message}`);
        return false;
    }
    if (stderr) {
        vscode.window.showErrorMessage(`1C: Designer error: ${stderr}`);
        return false;
    }
    
    vscode.window.showInformationMessage('1C: Designer started successfully!');
  });
  
  return false;
  if (!fs.existsSync(xmlZipFilePath)) {
    vscode.window.showErrorMessage(`Configuration ZIP file not found: ${xmlZipFilePath}`);
    return false;
  }

  // Получение текущей папки проекта VSCode
  //const workspaceFolders = vscode.workspace.workspaceFolders;

  //if (!workspaceFolders || workspaceFolders.length === 0) {
  //    vscode.window.showErrorMessage('No workspace folder is open.');
  //    return false;
  //}

  // Получение текущей папки проекта VSCode
  //const projectFolder = workspaceFolders[0].uri.fsPath;
  const projectFolder = __dirname + '\\configuration\\';

  // Распаковка ZIP-архива с использованием yauzl
  try {
    await extractZip(xmlZipFilePath, projectFolder);
    vscode.window.showInformationMessage('ZIP archive extracted successfully!');
  } catch (err) {
    vscode.window.showErrorMessage(`Failed to extract ZIP archive: ${err}`);
  }

  return false;
}

// Функция для распаковки ZIP-архива
function extractZip(zipFilePath: string, targetPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
      yauzl.open(zipFilePath, { lazyEntries: true }, (err, zipfile) => {
          if (err) {
              reject(err);
              return;
          }

          zipfile.readEntry();
          zipfile.on('entry', (entry) => {
              if (/\/$/.test(entry.fileName)) {
                  // Это папка, создаём её
                  const dirPath = path.join(targetPath, entry.fileName);
                  fs.mkdirSync(dirPath, { recursive: true });
                  zipfile.readEntry();
              } else {
                  // Это файл, извлекаем его
                  const filePath = path.join(targetPath, entry.fileName);
                  zipfile.openReadStream(entry, (err, readStream) => {
                      if (err) {
                          reject(err);
                          return;
                      }

                      // Создаём папки, если они не существуют
                      const dirPath = path.dirname(filePath);
                      if (!fs.existsSync(dirPath)) {
                          fs.mkdirSync(dirPath, { recursive: true });
                      }

                      // Записываем файл
                      const writeStream = fs.createWriteStream(filePath);
                      readStream.pipe(writeStream);
                      writeStream.on('close', () => {
                          zipfile.readEntry();
                      });
                  });
              }
          });

          zipfile.on('end', () => {
              resolve();
          });

          zipfile.on('error', (err) => {
              reject(err);
          });
      });
  });
}