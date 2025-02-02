interface MetaData {
  id: number;
  pid: number | null; // pid может быть null для корневых элементов
  nameEn: string;
  nameRu: string;
  image: string;
}

interface HierarchyItem {
  label: string;
  icon: string;
  children?: HierarchyItem[];
}

class MetaDataManager {
  private data: MetaData[];

  constructor(data: MetaData[]) {
      this.data = data;
  }

  public static initialize(): MetaDataManager {
      const data: MetaData[] = [
          { id: 1,  pid: null, nameEn: "Common", nameRu: "Общие", image: "common.png" },
          { id: 2,  pid: null, nameEn: "Constant", nameRu: "Константы", image: "constant.png" },
          { id: 3,  pid: null, nameEn: "Catalog", nameRu: "Справочники", image: "catalog.png" },
          { id: 4,  pid: null, nameEn: "Document", nameRu: "Документы", image: "document.png" },
          { id: 5,  pid: null, nameEn: "DocumentJournal", nameRu: "Журналы документов", image: "document_journal.png" },
          { id: 6,  pid: null, nameEn: "Enum", nameRu: "Перечисления", image: "enum.png" },
          { id: 7,  pid: null, nameEn: "Report", nameRu: "Отчеты", image: "report.png" },
          { id: 8,  pid: null, nameEn: "DataProcessor", nameRu: "Обработки", image: "data_processor.png" },
          { id: 9,  pid: null, nameEn: "ChartOfCharacteristicTypes", nameRu: "Планы видов характеристик", image: "chart_of_characteristic_types.png" },
          { id: 10, pid: null, nameEn: "ChartOfAccounts", nameRu: "Планы счетов", image: "chart_of_accounts.png" },
          { id: 11, pid: null, nameEn: "ChartOfCalculationTypes", nameRu: "Планы видов расчета", image: "chart_of_calculation_types.png" },
          { id: 12, pid: null, nameEn: "InformationRegister", nameRu: "Регистры сведений", image: "information_register.png" },
          { id: 13, pid: null, nameEn: "AccumulationRegister", nameRu: "Регистры накопления", image: "accumulation_register.png" },
          { id: 14, pid: null, nameEn: "AccountingRegister", nameRu: "Регистры бухгалтерии", image: "accounting_register.png" },
          { id: 15, pid: null, nameEn: "CalculationRegister", nameRu: "Регистры расчета", image: "calculation_register.png" },
          { id: 16, pid: null, nameEn: "BussinessProcesse", nameRu: "Бизнес-процессы", image: "business_process.png" },
          { id: 17, pid: null, nameEn: "Task", nameRu: "Задачи", image: "task.png" },
          { id: 18, pid: null, nameEn: "ExternalDataSource", nameRu: "Внешние источники данных", image: "external_data_source.png" },
      
          { id: 19, pid: 1, nameEn: "Subsystem", nameRu: "Подсистемы", image: "subsystem.png" },
          { id: 20, pid: 1, nameEn: "CommonModule", nameRu: "Общие модули", image: "common_module.png" },
          { id: 21, pid: 1, nameEn: "SessionParameter", nameRu: "Параметры сеанса", image: "session_parameter.png" },
          { id: 20, pid: 1, nameEn: "Role", nameRu: "Роли", image: "role.png" },
          { id: 23, pid: 1, nameEn: "CommonAttribute", nameRu: "Общие реквизиты", image: "common_attribute.png" },
          { id: 24, pid: 1, nameEn: "ExchangePlan", nameRu: "Планы обмена", image: "exchange_plan.png" },
          { id: 25, pid: 1, nameEn: "FilterCriterion", nameRu: "Критерии отбора", image: "filter_criterion.png" },
          { id: 26, pid: 1, nameEn: "EventSubscription", nameRu: "Подписки на события", image: "event_subscription.png" },
          { id: 27, pid: 1, nameEn: "ScheduledJob", nameRu: "Регламентные задания", image: "scheduled_job.png" },
          { id: 28, pid: 1, nameEn: "Bot", nameRu: "Боты", image: "bot.png" },
          { id: 29, pid: 1, nameEn: "FunctionalOption", nameRu: "Функциональные опции", image: "functional_option.png" },
          { id: 30, pid: 1, nameEn: "FunctionalOptionsParameter", nameRu: "Параметры функциональных опций", image: "functional_option_parameter.png" },
          { id: 31, pid: 1, nameEn: "DefinedType", nameRu: "Определяемые типы", image: "defined_types.png" },
          { id: 32, pid: 1, nameEn: "SettingsStorage", nameRu: "Хранилища настроек", image: "settings_storage.png" },
          { id: 33, pid: 1, nameEn: "CommonCommand", nameRu: "Общие команды", image: "command.png" },
          { id: 34, pid: 1, nameEn: "CommandGroup", nameRu: "Группы команд", image: "command_group.png" },
          { id: 35, pid: 1, nameEn: "CommonForm", nameRu: "Общие формы", image: "form.png" },
          { id: 36, pid: 1, nameEn: "CommonTemplate", nameRu: "Общие макеты", image: "template.png" },
          { id: 37, pid: 1, nameEn: "CommonPicture", nameRu: "Общие картинки", image: "common_picture.png" },
          { id: 38, pid: 1, nameEn: "XDTOPackage", nameRu: "XDTO-пакеты", image: "xdto_package.png" },
          { id: 39, pid: 1, nameEn: "WebService", nameRu: "Web-сервисы", image: "web_service.png" },
          { id: 40, pid: 1, nameEn: "HTTPService", nameRu: "HTTP-сервисы", image: "http.png" },
          { id: 41, pid: 1, nameEn: "WsReference", nameRu: "WS-ссылки", image: "ws_reference.png" },
          { id: 42, pid: 1, nameEn: "IntegrationService", nameRu: "Сервисы интеграции", image: "integration_service.png" },
          { id: 43, pid: 1, nameEn: "StyleItem", nameRu: "Элементы стиля", image: "style_item.png" },
          { id: 44, pid: 1, nameEn: "Style", nameRu: "Стили", image: "style.png" },
          { id: 45, pid: 1, nameEn: "Language", nameRu: "Языки", image: "language.png" },

          { id: 46, pid: 4, nameEn: "DocumentsNumerator", nameRu: "Нумераторы", image: "document_numerator.png" },
          { id: 47, pid: 4, nameEn: "DocumentsSequence", nameRu: "Последовательности", image: "sequence.png" }
      ];

      return new MetaDataManager(data);
  }

  /**
   * Поиск по полю nameEn
   * @param nameEn - Имя на английском для поиска
   * @returns Найденный элемент или undefined
   */
  public findByNameEn(nameEn: string): MetaData | undefined {
      return this.data.find(item => item.nameEn === nameEn);
  }

  /**
   * Получить иерархический список
   * @returns Иерархический список в виде строки
   */
  public getHierarchy(): string {
      const rootItems = this.data.filter(item => item.pid === null);
      let result = "";

      const buildHierarchy = (item: MetaData, level: number) => {
          const indent = "  ".repeat(level);
          result += `${indent}- ${item.nameEn} (${item.nameRu})\n`;

          const children = this.data.filter(child => child.pid === item.id);
          children.forEach(child => buildHierarchy(child, level + 1));
      };

      rootItems.forEach(item => buildHierarchy(item, 0));
      return result;
  }

  // Переделаем метод getHierarchy, чтобы он возвращал иерархическую структуру в виде
  // массива объектов с полями label и children. Это упростит отображение в TreeView.
  public getHierarchyItem(): HierarchyItem[] {
    const rootItems = this.data.filter(item => item.pid === null);

    const buildHierarchy = (item: MetaData): HierarchyItem => {
        const children = this.data.filter(child => child.pid === item.id);
        return {
            //label: `${item.nameEn} (${item.nameRu})`,
            label: `${item.nameRu}`,
            icon: item.image,
            children: children.length > 0 ? children.map(buildHierarchy) : undefined,
        };
    };

    return rootItems.map(buildHierarchy);
  }  
}

// Экспортируем класс по умолчанию
export default MetaDataManager;

// Экспортируем интерфейсы (если они нужны)
export { MetaData, HierarchyItem };