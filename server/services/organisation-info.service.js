const {
  License,
  OperatingMode,
  OrganisationInfo,
} = require("../models/models");

class OrganisationInfoService {
  async createLicense() {
    const licenseNumber = "052000490";
    const licenseDate = "29.11.2017";
    const authorityLicense =
      "ГОСУДАРСТВЕННАЯ ЖИЛИЩНАЯ ИНСПЕКЦИЯ НИЖЕГОРОДСКОЙ ОБЛАСТИ";

    return await License.create({
      licenseNumber: {
        field: "Номер лицензии",
        value: licenseNumber,
      },
      licenseDate: {
        field: "Дата получения лицензии",
        value: licenseDate,
      },
      authorityLicense: {
        field: "Орган, выдавший лицензию",
        value: authorityLicense,
      },
    });
  }

  async createOperatingMode() {
    const organizationOperatingHours = "07:00 - 16:00";
    const breakHour = "11:00 - 12:00";
    const personalByDirector = "09:00-11:00";

    return await OperatingMode.create({
      organizationOperatingHours: {
        field: "Часы работы",
        value: organizationOperatingHours,
      },
      breakHour: {
        field: "Перерыв",
        value: breakHour,
      },
      personalByDirector: {
        field: "Личный прием граждан директором",
        value: personalByDirector,
      },
    });
  }

  async createInfo() {
    const nameOfCompany = 'ООО "ПАРТНЁР СЕРВИС"';
    const organizationalAndLegalForm =
      "Общества с ограниченной ответственностью (12300)";
    const OGRN = "1165275020415";
    const TIN = "5245027658";
    const placeOfStateRegistration =
      "607605, ОБЛАСТЬ НИЖЕГОРОДСКАЯ, ГОРОД БОГОРОДСК, МИКРОРАЙОН 2-Й, д. ДОМ 7А, кв. КВАРТИРА 39";
    const email = "52partner@rambler.ru";
    const contactPhoneNumber = "+7 (83170) 2-16-54";
    const fax = "+7 (83170) 2-16-54";
    const mailingAddress =
      "Нижегородская обл, р-н. Богородский, г. Богородск, мкр. 2-й, д. 7а";
    const locationOfControls =
      "Нижегородская обл, р-н. Богородский, г. Богородск, ул. Ленина, д. 101";
    const dispatcherContacts = "+7 (83170) 2-16-54";

    return await OrganisationInfo.create({
      nameOfCompany: {
        field: "Наименование организации",
        value: nameOfCompany,
      },
      organizationalAndLegalForm: {
        field: "Организационно-правовая форма",
        value: organizationalAndLegalForm,
      },
      OGRN: {
        field: "ОГРН/ОГРНИП",
        value: OGRN,
      },
      TIN: {
        field: "ИНН",
        value: TIN,
      },
      placeOfStateRegistration: {
        field:
          "Место государственной регистрации юридического лица (место нахождения юридического лица)",
        value: placeOfStateRegistration,
      },
      email: {
        field: "Адрес электронной почты",
        value: email,
      },
      contactPhoneNumber: {
        field: "Контактные телефоны",
        value: contactPhoneNumber,
      },
      fax: {
        field: "Факс",
        value: fax,
      },
      mailingAddress: {
        field: "Почтовый адрес",
        value: mailingAddress,
      },
      locationOfControls: {
        field: "Место нахождения органов управления",
        value: locationOfControls,
      },
      dispatcherContacts: {
        field: "Контактные телефоны диспетчерской службы",
        value: dispatcherContacts,
      },
    });
  }

  async createOrganisationInfo() {
    const license = await License.findAll();
    const info = await OrganisationInfo.findAll();
    const operatingMode = await OperatingMode.findAll();
    const firstCreateInfo =
      !license.length || !info.length || !operatingMode.length;
    if (firstCreateInfo) {
      await this.createInfo();
      await this.createLicense();
      await this.createOperatingMode();
    }
  }
}

module.exports = new OrganisationInfoService();
