import * as vscode from 'vscode';
import * as path from 'path';

import MetaDataManager from '../logic/MetaData';
import { HierarchyItem } from '../logic/MetaData';

// предоставляет данные для дерева
class TreeViewProvider implements vscode.TreeDataProvider<HierarchyItem> {  
    private _onDidChangeTreeData: vscode.EventEmitter<HierarchyItem | undefined> = new vscode.EventEmitter<HierarchyItem | undefined>();
    readonly onDidChangeTreeData: vscode.Event<HierarchyItem | undefined> = this._onDidChangeTreeData.event;

    private metaDataManager: MetaDataManager;

    constructor(metaDataManager: MetaDataManager) {
      this.metaDataManager = metaDataManager;
    }

    refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }

    getTreeItem(element: HierarchyItem): vscode.TreeItem {
      const treeItem = new vscode.TreeItem(
          element.label,          
          element.children ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
      );

      if (element.icon) {
        //treeItem.iconPath = {
        //  light: vscode.Uri.file(path.join(__dirname, '..', 'resources', 'light', element.icon)),
        //  dark: vscode.Uri.file(path.join(__dirname, '..', 'resources', 'dark', element.icon)),
        //};

        ///e:/Working/vscode/eskaext/out/resources/icons/cfg/common.png
        treeItem.iconPath = vscode.Uri.file(path.join('e:/Working/vscode/eskaext', 'resources', 'icons', 'cfg', element.icon));
      }

      // Добавляем команду для обработки кликов
      //treeItem.command = {
      //  command: 'eskaext.onTreeItemClick',
      //  title: 'Item Clicked',
      //  arguments: [element],
      //};

      return treeItem;
    }    

    getChildren(element?: HierarchyItem): Thenable<HierarchyItem[]> {
      if (element) {
          // Возвращаем дочерние элементы, если они есть
          return Promise.resolve(element.children || []);
      } else {
          // Возвращаем корневые элементы
          const hierarchy = this.metaDataManager.getHierarchyItem();
          return Promise.resolve(hierarchy);
      }
    }
}

export default TreeViewProvider;