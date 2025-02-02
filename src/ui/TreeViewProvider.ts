import * as vscode from 'vscode';
import * as path from 'path';

import MetaDataManager from '../logic/MetaData';
import { HierarchyItem } from '../logic/MetaData';

//class TreeViewProvider implements vscode.TreeDataProvider<TreeItem> {
class TreeViewProvider implements vscode.TreeDataProvider<HierarchyItem> {  
    //private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined | null> = new vscode.EventEmitter<TreeItem | undefined | null>();
    //readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined | null> = this._onDidChangeTreeData.event;

    private _onDidChangeTreeData: vscode.EventEmitter<HierarchyItem | undefined> = new vscode.EventEmitter<HierarchyItem | undefined>();
    readonly onDidChangeTreeData: vscode.Event<HierarchyItem | undefined> = this._onDidChangeTreeData.event;

    private metaDataManager: MetaDataManager;

    constructor(metaDataManager: MetaDataManager) {
      this.metaDataManager = metaDataManager;
    }

    refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }

    //getTreeItem(element: TreeItem): vscode.TreeItem {
    //    return element;
    //}

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
      treeItem.command = {
        command: 'eskaext.onTreeItemClick',
        title: 'Item Clicked',
        arguments: [element],
      };

      return treeItem;
    }    

    //getChildren(element?: TreeItem): Thenable<TreeItem[]> {
    //    if (element) {
            // Если элемент имеет дочерние элементы, верните их
    //        return Promise.resolve(this.getChildItems(element));
    //    } else {
            // Верните корневые элементы
    //        return Promise.resolve(this.getRootItems());
    //    }
    //}

    getChildren(element?: HierarchyItem): Thenable<HierarchyItem[]> {
      if (element) {
          // Возвращаем дочерние элементы, если они есть
          return Promise.resolve(element.children || []);
      } else {
          // Возвращаем корневые элементы
          const hierarchy = this.metaDataManager.getHierarchyItem();
          return Promise.resolve(hierarchy);
      }


      // Если вы хотите добавить обработку ошибок или логирование
      /*try {
        if (element) {
            // Возвращаем дочерние элементы, если они есть
            return Promise.resolve(element.children || []);
        } else {
            // Возвращаем корневые элементы
            const hierarchy = this.metaDataManager.getHierarchy();
            return Promise.resolve(hierarchy);
        }
      } catch (error) {
          console.error('Error in getChildren:', error);
          return Promise.resolve([]);
      } */
    }    

    /*private getRootItems(): TreeItem[] {
        return [
            new TreeItem('Root Item 1', 'folder', 'item1'),
            new TreeItem('Root Item 2', 'folder', 'item2')
        ];
    }

    private getChildItems(element: TreeItem): TreeItem[] {
        // Пример дочерних элементов
        return [
            new TreeItem('Child Item 1', 'file', 'child1'),
            new TreeItem('Child Item 2', 'file', 'child2')
        ];
    }*/
}

/*
class TreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly icon: string,
        public readonly id: string
    ) {
        super(label, vscode.TreeItemCollapsibleState.Collapsed);
        this.tooltip = `${this.label}-${this.id}`;
        //this.iconPath = new vscode.ThemeIcon(icon);

        this.command = {
          command: 'eskaext.onTreeItemClick',
          title: 'On Tree Item Click',
          arguments: [this.id] // Передаём аргументы в команду
        };

        /*this.iconPath = {
          //light: vscode.Uri.file(path.join(__dirname, '..', 'resources', 'light', 'eskaext.png')),
          //dark: vscode.Uri.file(path.join(__dirname, '..', 'resources', 'dark', 'eskaext.png'))
          light: vscode.Uri.file(path.join(__dirname, '..', 'resources', 'eskaext.png')),
          dark: vscode.Uri.file(path.join(__dirname, '..', 'resources', 'eskaext.png'))
        };
    }
}*/

export default TreeViewProvider;