import { ValidationError } from 'class-validator';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';

export class NestedValidationExceptionFilter extends I18nValidationExceptionFilter {
  protected normalizeValidationErrors(
    validationErrors: ValidationError[],
  ): string[] {
    const flattenErrors = (
      errors: ValidationError[],
      parentPath = '',
    ): string[] => {
      return errors.flatMap((error) => {
        const currentPath = parentPath
          ? `${parentPath}.${error.property}`
          : error.property;

        if (error.children?.length > 0) {
          return flattenErrors(error.children, currentPath);
        }

        return Object.values(error.constraints || {}).map((msg) => {
          return msg.replace(new RegExp(`^${currentPath}\\.?`), '');
        });
      });
    };

    return flattenErrors(validationErrors);
  }
}
