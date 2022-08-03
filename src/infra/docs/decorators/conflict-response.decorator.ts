import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiOperation,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { DefaultMessageDto } from '.';

const IS_CONFLICT_RESPONSE = 'conflictResponse';

const CONFLICT_MESSAGE =
  'The HTTP 409 Conflict response status code indicates a request conflict with the current state of the target resource.';

/**
 * The HTTP 409 Conflict response status code indicates a request conflict with the current state of the target resource.
 *
 * Conflicts are most likely to occur in response to a `PUT` request. For example, you may get a 409 response when uploading a file that is older than the existing one on the server, resulting in a version control conflict.
 *
 * @see [409 Bad Request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409)
 * @param options - These are the same types as `ApiResponse`
 */
export function ConflictResponse(options?: ApiResponseOptions) {
  return applyDecorators(
    SetMetadata(IS_CONFLICT_RESPONSE, options),
    ApiConflictResponse({
      ...options,
      type: DefaultMessageDto,
      description: options?.description ?? CONFLICT_MESSAGE,
    }),
    ApiOperation({ summary: options?.description }),
  );
}
