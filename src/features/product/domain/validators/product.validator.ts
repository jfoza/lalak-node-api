import { EntityValidationException } from '@/common/domain/exceptions/entity.validation.exception';
import { ProductProps } from '@/features/product/domain/entities/product';
import { Validator } from '@/common/domain/validators/validator';

type TNumericItem = {
  name: string;
  key: string;
  value: number;
};

const PRODUCT_VALUE: string = 'PRODUCT_VALUE';
const PRODUCT_QUANTITY: string = 'PRODUCT_QUANTITY';
const PRODUCT_BALANCE: string = 'PRODUCT_BALANCE';

export class ProductValidator extends Validator<ProductProps> {
  validate(props: ProductProps): void {
    const errors: string[] = [];

    const items: TNumericItem[] = [
      { name: 'Product Value', key: PRODUCT_VALUE, value: props.value },
      {
        name: 'Product Quantity',
        key: PRODUCT_QUANTITY,
        value: props.quantity,
      },
      { name: 'Product Balance', key: PRODUCT_BALANCE, value: props.balance },
    ];

    items.forEach((item) => {
      if (item.value < 0) {
        errors.push(`O valor de "${item.name}" não pode ser menor que zero.`);
      }
    });

    const productQuantity = items.find(
      (item) => item.key === PRODUCT_QUANTITY,
    )?.value;
    const productBalance = items.find(
      (item) => item.key === PRODUCT_BALANCE,
    )?.value;

    if (productQuantity !== undefined && productBalance !== undefined) {
      if (productBalance > productQuantity) {
        errors.push(`O saldo não pode ser maior que a quantidade.`);
      }
    }

    if (errors.length > 0) {
      throw new EntityValidationException(errors);
    }
  }
}

export const productValidator = new ProductValidator();
