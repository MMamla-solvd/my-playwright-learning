import {test, expect} from '@playwright/test';

type Credentials = {
    email: "course@test.com";
    password: "Password123";
    role?: string;
};

const validUser: Credentials = {
    email: "course@test.com",
    password: "Password123",
    role: "admin"
};
const getLoginUrl = (env: string): string => {
    return `https://${env}.example.com/login`;
};
export {validUser, getLoginUrl};