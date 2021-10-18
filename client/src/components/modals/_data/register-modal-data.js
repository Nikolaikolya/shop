export const modalLeftData = [
  {
    id: 0,
    name: "name",
    label: "Имя",
    type: "text",
    placeholder: "Николай",
  },
  {
    id: 1,
    name: "phone",
    label: "Телефон",
    type: "text",
    placeholder: "8000000000",
    select: [
      {
        id: 0,
        class: "form-select form-select--code",
        option: [
          {
            id: 0,
            value: "+7",
            text: "+7",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "email",
    label: "Емайл",
    type: "email",
    placeholder: "email@example.com",
  },
  {
    id: 3,
    name: "password",
    label: "Пароль",
    type: "password",
    placeholder: "******",
  },
  {
    id: 4,
    name: "confirm_password",
    label: "Повтор пароля",
    type: "password",
    placeholder: "******",
  },
];

export const modalRightData = [
  {
    id: 0,
    name: "region",
    label: "Регион",
    type: "select",
    selectDefault: { value: 0, text: "Выберите регион" },
  },
];
