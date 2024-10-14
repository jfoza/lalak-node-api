const ADMIN_MASTER: string = 'ADMIN_MASTER';
const EMPLOYEE: string = 'EMPLOYEE';
const CUSTOMER: string = 'CUSTOMER';

export const ProfileUniqueNameEnum = {
  ADMIN_MASTER,
  EMPLOYEE,
  CUSTOMER,

  PROFILES_BY_ADMIN_MASTER: [ADMIN_MASTER, EMPLOYEE, CUSTOMER],
  PROFILES_BY_ADMIN_MASTER_USERS: [ADMIN_MASTER, EMPLOYEE],

  PROFILES_BY_EMPLOYEE: [EMPLOYEE, CUSTOMER],
  PROFILES_BY_EMPLOYEE_USERS: [EMPLOYEE],
};