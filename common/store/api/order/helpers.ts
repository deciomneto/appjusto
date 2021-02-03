import { Complement, ComplementGroup, Order, Product, WithId } from 'appjusto-types';
import { OrderItem } from 'appjusto-types/order/item';
import { intersection, isEmpty } from 'lodash';

// items

export const addItemToOrder = (order: Order, item: OrderItem): Order => {
  if (!order?.items) return { ...order, items: [{ ...item }] };
  // searching for items for the same product that could be merged into one item
  const index = order.items.findIndex(
    (i) =>
      i.product.id === item.product.id &&
      // items with complement or notes are always added separatedly
      isEmpty(i.complements) &&
      isEmpty(item.complements) &&
      isEmpty(i.notes) &&
      isEmpty(item.notes)
  );
  if (index === -1) return { ...order, items: [...order.items, item] };
  return {
    ...order,
    items: [
      ...order.items.slice(0, index),
      mergeItems(order.items[index], item),
      ...order.items.slice(index + 1),
    ],
  };
};

const mergeItems = (a: OrderItem, b: OrderItem): OrderItem => ({
  ...a,
  ...b,
  quantity: a.quantity + b.quantity,
});

// complements

export const totalComplementsInGroup = (
  group: ComplementGroup,
  complements: WithId<Complement>[]
) =>
  intersection(
    complements.map(
      (c) => c.id,
      (group.items ?? []).map((c) => c.id)
    )
  ).length;

export const canAddComplement = (group: ComplementGroup, complements: WithId<Complement>[]) =>
  totalComplementsInGroup(group, complements) < group.maximum;

export const hasSatisfiedGroup = (group: ComplementGroup, complements: WithId<Complement>[]) => {
  const total = totalComplementsInGroup(group, complements);
  return total >= group.minimum && total <= group.maximum;
};

export const hasSatisfiedAllGroups = (product: Product, complements: WithId<Complement>[]) =>
  product.complementsGroups?.every((group) => hasSatisfiedGroup(group, complements)) ?? true;

// total

export const getItemTotal = (item: OrderItem) => {
  const complemementsTotal = (item.complements ?? []).reduce(
    (total, complement) => total + complement.price,
    0
  );
  return item.quantity * (item.product.price + complemementsTotal);
};

export const getOrderTotal = (order: Order) =>
  (order.items ?? []).reduce((sum, item) => sum + getItemTotal(item), 0);
