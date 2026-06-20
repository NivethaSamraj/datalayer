import { faker } from '@faker-js/faker';

/**
 * Collection of lightweight data faker helpers used by tests.
 *
 * These functions wrap `faker` calls and provide consistent random
 * values for names, addresses, dates and numeric fields used across the
 * test-suite.
 */

 
// ---------- BASIC ----------
export const firstName = (): string => faker.person.firstName();
 
export const lastName = (): string => faker.person.lastName();
 
export const addressLineOne = (): string => faker.location.streetAddress();
 
export const fullName = (): string => faker.person.fullName();
 
export const email = (): string =>
  faker.internet.email().toLowerCase();
 
export const fullAddress = (): string =>
  faker.location.streetAddress({ useFullAddress: true });
 
// ---------- ORGANIZATION ----------
export const organization = (): string =>
  faker.helpers.arrayElement(["Whiplash Bros. Auto Insurance"]);
 
export const producerOrganization = (): string =>
  faker.helpers.arrayElement(["Whiplash Bros. Auto Insurance"]);
 
// ---------- NUMBERS ----------
export const limit = (): string =>
  faker.number.int({ min: 1, max: 5 }).toString();
 
export const basis = (): string =>
  faker.number.int({ min: 1000, max: 9999 }).toString();
 
export const generateRandomAmount = (): string =>
  faker.finance.amount();
 
export const city = (): string => faker.location.city();
 
export const zipCode = (): string => faker.location.zipCode("#####");
 
export const state = (): string => faker.location.state({ abbreviated: true });
// ---------- DATES ----------
export const dateOfBirth = (): string => {
  const d = faker.date.between({
    from: new Date("1990-01-01"),
    to: new Date("1997-12-31")
  });
 
  return d.toLocaleDateString("en-US");
};
 
export const currentDate = (): string =>
  new Date().toLocaleDateString("en-US", {
    timeZone: "Asia/Kolkata"
  });
 
export const currentYear = (): string =>
  String(new Date().getFullYear());
 
export const randomDate = (): string =>
  faker.date.past().toLocaleDateString("en-US");
 
export const dateOneMonthAhead = (): string => {
  const today = new Date();
  const next = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  return next.toLocaleDateString("en-US");
};
export const phoneNumber = (): string =>`98422${faker.string.numeric(5)}`;
 
