import { JSONSchema7 } from 'json-schema';
import { getHeaderValueHead } from '../utils/http.util';
import { createUuid } from '../utils';

export interface TestingMetadata {
  path?: string;
  body?: JSONSchema7;
  headers?: JSONSchema7;
  params?: JSONSchema7;
  query?: JSONSchema7;
}

export const TESTING_REQUEST_ID_HEADER = 'X-Testing-Request-Id';

export const isTestingMetadataOn = () => process.env.MARBLE_TESTING_METADATA_ON === 'true';

export const getTestingRequestIdHeader = getHeaderValueHead(TESTING_REQUEST_ID_HEADER);

export const createTestingRequestHeader = () => ({
  [TESTING_REQUEST_ID_HEADER]: createUuid(),
});

export const setTestingMetadata = () => process.env.MARBLE_TESTING_METADATA_ON = 'true';
