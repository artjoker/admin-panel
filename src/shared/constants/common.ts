export const BASE_API_URL = import.meta.env.VITE_PUBLIC_API_URL || '';

export const API_URL = BASE_API_URL;

export enum ResponseStatusCodes {
  SUCCESS = 200,
  ACCEPTED = 202,
  TEMPORARY_REDIRECT = 307,
  BAD_REQUEST = 400,
  NOT_AUTHORIZED = 401,
  SESSION_ENDED = 403,
  NOT_FOUND = 404,
  SOMETHING_WRONG = 418,
  SERVER_ERROR = 500,
}

export const emailRegex =
  /(?!.{38})^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const languagePathRegex = /\/(en|ru)\//;

export const slugRegex = /^[a-zA-Z-]+$/;
