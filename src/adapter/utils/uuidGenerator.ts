import { v4 as uuidv4 } from 'uuid';
import type { IDGeneratorInterface } from '../../domain/utils/idGeneratorInterface.js';

export class UuidGenerator implements IDGeneratorInterface {
  generate(): string {
    return uuidv4();
  }
}
