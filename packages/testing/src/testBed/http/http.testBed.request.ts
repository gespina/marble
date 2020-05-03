import { HttpMethod, HttpHeaders } from '@marblejs/core'
import { createTestingRequestHeader } from '@marblejs/core/dist/+internal/testing';
import { HttpTestBedRequest, WithBodyApplied } from './http.testBed.request.interface';

export const createRequest = (port: number, host: string, headers?: HttpHeaders) =>
  <T extends HttpMethod>(method: T): HttpTestBedRequest<T> => ({
    protocol: 'http:',
    path: '/',
    method,
    headers: {
      ...createTestingRequestHeader(),
      ...headers,
    },
    host,
    port,
  });

export const withPath = (path: string) => <T extends HttpMethod>(req: HttpTestBedRequest<T>): HttpTestBedRequest<T> => ({
  ...req,
  path,
});

export const withHeaders = (headers: HttpHeaders) => <T extends HttpMethod>(req: HttpTestBedRequest<T>): HttpTestBedRequest<T> => ({
  ...req,
  headers: { ...req.headers, ...headers },
});

export const withBody = <T>(body: T) => <U extends 'POST' | 'PUT' | 'PATCH'>(req: HttpTestBedRequest<U>): HttpTestBedRequest<U> & WithBodyApplied<T> => ({
  ...req,
  body,
});

export const getHeader = <T extends string = string>(key: string) => (req: HttpTestBedRequest<any>): T | undefined => {
  const header = req.headers[key];
  return Array.isArray(header)
    ? header[0] as T
    : header as T;
};
